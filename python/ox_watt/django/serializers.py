from dataclasses import dataclass

from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied


__all__ = ("RelatedField", "RelatedObjectField", "ModelSerializer", "NestedInfo", "NestedSerializer", "NestedModelSerializer")


class RelatedField(serializers.SlugRelatedField):
    """Provide related field based on uuid."""

    def __init__(self, **kwargs):
        kwargs.setdefault("slug_field", "uuid")
        super().__init__(**kwargs)


class RelatedObjectField(RelatedField):
    """
    A DRF field that:
    - On input (deserialization): takes a UUID and returns the related instance.
    - On output (serialization): returns the serialized object as a dict.
    """

    def __init__(self, queryset, serializer_class, **kwargs):
        """
        :param queryset: Queryset for the related model (like RelatedField)
        :param serializer_class: Serializer to use when returning the full object
        """
        self.serializer_class = serializer_class
        super().__init__(queryset=queryset, **kwargs)

    def to_internal_value(self, data):
        """
        Convert UUID to model instance.
        """
        if not data:
            return None
        # assume data is UUID
        return get_object_or_404(self.queryset, uuid=data)

    def to_representation(self, value):
        """
        Return the full serialized object.
        """
        serializer = self.serializer_class(value, context=self.context)
        return serializer.data


class ModelSerializer(serializers.ModelSerializer):
    """
    This ModelSerializer provides ``id`` field defaulted to model's uuid.
    """

    id = serializers.UUIDField(source="uuid", read_only=True, required=False)

    class Meta:
        fields = ("id",)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if "uuid" in self.fields:
            del self.fields["uuid"]


@dataclass
class NestedInfo:
    """Informations about a field nested in :py:class:`ModelSerializer`"""

    field: str
    """ Serializer field. """
    delete: bool = True
    """ Delete related items not present in the user's list. """


class NestedSerializerMetaclass(serializers.SerializerMetaclass):
    """Ensure serializer's meta ``nested`` initialization."""

    def __new__(mcls, name, bases, attrs):
        cls = super().__new__(mcls, name, bases, attrs)

        if meta := cls.__dict__.get("Meta"):
            if nested := getattr(meta, "nested", None):
                meta.nested = {
                    info.field: info
                    for info in (mcls.get_nested_info(val) for val in nested)
                }
        return cls

    @classmethod
    def get_nested_info(cls, value):
        if isinstance(value, str):
            return NestedInfo(value)
        if isinstance(value, tuple | list):
            return NestedInfo(*value)
        if isinstance(value, dict):
            return NestedInfo(**value)
        if isinstance(value, NestedInfo):
            return value
        raise TypeError(f"Unsupported type {type(value)}. Must be a string, a tuple or a dict")


class NestedSerializer(ModelSerializer):
    id = serializers.UUIDField(source="uuid", read_only=False, required=False)

    class Meta:
        fields = ("id",)


class NestedModelSerializer(ModelSerializer, metaclass=NestedSerializerMetaclass):
    """
    This serializer class allows to specify and save relations using nested
    serializer values.

    Default behavior implies that existing values will be updated, new ones created and removed one deleted. You can customize by provided argument for the :py:class:`NestedInfo` specific to a field.

    The attribute ``Meta.nested`` is used to specify which fields are actually
    related models. Its value is a list of:

        - a string that is :py:class:`NestedInfo.field` (serializer field name);
        - tuple with positional argument, dict with positional arguments;
        - a :py:class:`NestedInfo` instance;

    Limitations:
    - It only works with models having a ``uuid`` field used as reference.
    - It assumes a FK reverse relations.


    Example: two models, A and B. B has ForeignKey to A, and on A's serializer
    you want to update B objects related to A. You don't want uuid as handled by :py:class:`RelatedField`).

    .. code-block:: python

            class BSerializer(NestedSerializer):
                # ...

            class ASerializer(NestedModelSerializer):
                b_items = BSerializer(source="b_set", many=True, required=False)

                class Meta:
                    # Declaring fields as nested allows them to be automatically
                    # create/updated.
                    nested = ("b_items",)
                    # ...
                    #
                    # If you dont want deletion of missing items, you can use this:
                    # nested = (("b_items", False),)

    At the serializer class creation, ``Meta.nested`` is transformed into a dict of
    :py:class:`NestedInfo` by serializer field name.
    """

    def create(self, validated_data):
        nested = self._pop_nested(validated_data)
        instance = super().create(validated_data)
        self._save_nested(instance, nested)
        return instance

    def update(self, instance, validated_data):
        nested = self._pop_nested(validated_data)
        instance = super().update(instance, validated_data)
        self._save_nested(instance, nested)
        return instance

    def _pop_nested(self, validated_data) -> dict[str, list[dict] | dict]:
        """
        From validated_data, return a dict of items values for each nested
        field.
        """
        if nested := getattr(self.Meta, "nested", None):
            result = {}
            for info in nested.values():
                field = self.fields[info.field]
                source = field.source
                value = validated_data.pop(source, None)
                if value:
                    result[field] = value
            return result
        return {}

    # TODO: update existing ones instead of delete
    # TODO: permission check here
    def _save_nested(self, obj, nested):
        """
        Save nested values for this object.
        """
        for field, values in nested.items():
            self._save_nested_field(obj, field, values)

    def _save_nested_field(self, obj, field, values):
        manager = getattr(obj, field.source)
        model = manager.model

        existing = manager.all()
        existing = {str(o.uuid): o for o in existing}

        seen = set()

        with transaction.atomic():
            for data in values:
                # pop id and replace it to nested's foreignkey value
                # targeting obj.
                id = data.pop("uuid", None) 
                data[manager.field.name] = obj

                # get serializer depending on update/create
                instance = id and existing.get(str(id))
                kw = {"data": data, "context": self.context}
                if isinstance(field, serializers.ListSerializer):
                    ser_cls = field.child.__class__
                else:
                    ser_cls = field.__class__

                if id:
                    if instance is None:
                        raise PermissionDenied(
                            "The related object does not belong to this parent."
                        )
                    ser = ser_cls(instance, partial=True, **kw)
                else:
                    ser = ser_cls(**kw)

                ser.is_valid(raise_exception=True)
                ser.save(**{manager.field.name: obj})
                instance and seen.add(str(id))

        info = self.Meta.nested[field.source]
        to_delete = info.delete and [obj.pk for uid, obj in existing.items() if uid not in seen]
        if to_delete:
            model.objects.filter(id__in=to_delete).delete()

