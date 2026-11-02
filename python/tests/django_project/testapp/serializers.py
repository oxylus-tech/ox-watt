from rest_framework import serializers

from ox_watt.django.serializers import ModelSerializer, NestedSerializer, NestedModelSerializer


from .models import Child, Parent, SerializerTestModel


class RelatedSerializer(serializers.ModelSerializer):
    """Serializer used to test RelatedObjectField."""

    class Meta:
        model = SerializerTestModel
        fields = ("uuid", "name")


class TestModelSerializer(ModelSerializer):
    """Serializer used to test UUID handling."""

    class Meta:
        model = SerializerTestModel
        fields = ("id", "name")


class ChildSerializer(NestedSerializer):
    """Serializer for nested child objects."""

    class Meta:
        model = Child
        fields = ("id", "name")


class ParentSerializer(NestedModelSerializer):
    """Serializer that manages related children."""

    children = ChildSerializer(many=True, required=False)

    class Meta:
        model = Parent
        fields = ("id", "name", "children")
        nested = ("children",)


class NestedConfigSerializer(NestedModelSerializer):
    """Serializer covering supported Meta.nested configuration formats."""

    children = ChildSerializer(many=True, required=False)
    optional_children = ChildSerializer(many=True, required=False)
    configured_children = ChildSerializer(many=True, required=False)
    dict_children = ChildSerializer(many=True, required=False)

    class Meta:
        model = Parent
        fields = (
            "id",
            "name",
            "children",
            "optional_children",
            "configured_children",
            "dict_children",
        )
        nested = (
            "children",
            ("optional_children", False),
            {"field": "configured_children", "delete": False},
            {"field": "dict_children", "delete": False},
        )
