from unittest.mock import Mock
from uuid import uuid4

import pytest
from django.http import Http404
from rest_framework import serializers

from ox_watt.django.serializers import (
    NestedInfo,
    RelatedField,
    RelatedObjectField,
)
from tests.django_project.testapp.models import SerializerTestModel
from tests.django_project.testapp.serializers import (
    NestedConfigSerializer,
    ParentSerializer,
    RelatedSerializer,
    TestModelSerializer,
)


def test_related_field_defaults_to_uuid():
    field = RelatedField(queryset=Mock())

    assert field.slug_field == "uuid"


def test_related_field_accepts_custom_slug_field():
    field = RelatedField(queryset=Mock(), slug_field="name")

    assert field.slug_field == "name"


def test_related_field_resolves_related_object():
    instance = Mock()
    queryset = Mock()
    queryset.get.return_value = instance
    uid = uuid4()

    field = RelatedField(queryset=queryset)
    result = field.to_internal_value(str(uid))

    assert result is instance
    queryset.get.assert_called_once_with(uuid=str(uid))


def test_related_object_field_returns_none_for_empty_input():
    field = RelatedObjectField(
        queryset=Mock(),
        serializer_class=RelatedSerializer,
    )

    assert field.to_internal_value(None) is None
    assert field.to_internal_value("") is None


@pytest.mark.django_db
def test_related_object_field_resolves_uuid():
    """Resolve an existing object using its UUID."""
    instance = SerializerTestModel.objects.create(name="Related object")

    field = RelatedObjectField(
        queryset=SerializerTestModel.objects.all(),
        serializer_class=RelatedSerializer,
    )

    result = field.to_internal_value(str(instance.uuid))

    assert result == instance


@pytest.mark.django_db
def test_related_object_field_raises_404_for_missing_object():
    """Raise Http404 when the UUID does not identify an object."""
    field = RelatedObjectField(
        queryset=SerializerTestModel.objects.all(),
        serializer_class=RelatedSerializer,
    )

    with pytest.raises(Http404):
        field.to_internal_value("9a3ef252-08dc-48bd-976b-1747b0c35ee0")


@pytest.mark.django_db
def test_related_object_field_serializes_full_object():
    """Serialize the related object using the configured serializer."""
    instance = SerializerTestModel.objects.create(name="Related object")

    field = RelatedObjectField(
        queryset=SerializerTestModel.objects.all(),
        serializer_class=RelatedSerializer,
    )

    result = field.to_representation(instance)

    assert result == {
        "uuid": str(instance.uuid),
        "name": "Related object",
    }


def test_related_object_field_passes_serializer_context():
    class ContextSerializer(serializers.Serializer):
        value = serializers.SerializerMethodField()

        def get_value(self, obj):
            return self.context["marker"]

    class ParentFieldSerializer(serializers.Serializer):
        related = RelatedObjectField(
            queryset=Mock(),
            serializer_class=ContextSerializer,
        )

    serializer = ParentFieldSerializer(
        instance={"related": object()},
        context={"marker": "context value"},
    )

    assert serializer.data["related"] == {"value": "context value"}


def test_model_serializer_uses_uuid_as_read_only_id():
    serializer = TestModelSerializer()

    assert serializer.fields["id"].source == "uuid"
    assert serializer.fields["id"].read_only is True
    assert "uuid" not in serializer.fields


def test_model_serializer_represents_uuid_as_id():
    uid = uuid4()
    instance = SerializerTestModel(uuid=uid, name="Example")

    serializer = TestModelSerializer(instance=instance)

    assert serializer.data["id"] == str(uid)
    assert serializer.data["name"] == "Example"
    assert "uuid" not in serializer.data


def test_nested_info_defaults_to_delete():
    info = NestedInfo("children")

    assert info.field == "children"
    assert info.delete is True


def test_nested_info_can_disable_deletion():
    info = NestedInfo("children", delete=False)

    assert info.field == "children"
    assert info.delete is False


@pytest.mark.parametrize(
    ("field_name", "expected_delete"),
    [
        ("children", True),
        ("optional_children", False),
        ("configured_children", False),
        ("dict_children", False),
    ],
)
def test_nested_meta_normalizes_supported_formats(field_name, expected_delete):
    info = NestedConfigSerializer.Meta.nested[field_name]

    assert isinstance(info, NestedInfo)
    assert info.field == field_name
    assert info.delete is expected_delete


def test_nested_serializer_extracts_nested_data():
    serializer = ParentSerializer(
        data={
            "name": "Parent",
            "children": [{"name": "Child"}],
        }
    )

    assert serializer.is_valid(), serializer.errors

    validated_data = dict(serializer.validated_data)
    nested = serializer._pop_nested(validated_data)

    assert "children" not in validated_data
    assert len(nested) == 1

    field, values = next(iter(nested.items()))

    assert field is serializer.fields["children"]
    assert values == [{"name": "Child"}]


def test_nested_serializer_handles_missing_nested_data():
    serializer = ParentSerializer(data={"name": "Parent"})

    assert serializer.is_valid(), serializer.errors

    validated_data = dict(serializer.validated_data)

    assert serializer._pop_nested(validated_data) == {}
    assert validated_data["name"] == "Parent"


def test_nested_serializer_handles_empty_nested_list():
    serializer = ParentSerializer(
        data={"name": "Parent", "children": []}
    )

    assert serializer.is_valid(), serializer.errors

    validated_data = dict(serializer.validated_data)

    assert serializer._pop_nested(validated_data) == {}
