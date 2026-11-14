
import pytest
from django.db import IntegrityError
from rest_framework.exceptions import PermissionDenied

from tests.django_project.testapp.models import Child, Parent
from tests.django_project.testapp.serializers import ChildSerializer, ParentSerializer
from ox_watt.django.serializers import NestedSerializer, NestedModelSerializer


class ParentKeepChildrenSerializer(NestedModelSerializer):
    """Parent serializer that preserves omitted children."""

    children = ChildSerializer(many=True, required=False)

    class Meta:
        model = Parent
        fields = ("id", "name", "children")
        nested = (("children", False),)


@pytest.mark.django_db
def test_create_parent_with_nested_children():
    serializer = ParentSerializer(
        data={
            "name": "Parent",
            "children": [
                {"name": "Child A"},
                {"name": "Child B"},
            ],
        }
    )

    assert serializer.is_valid(), serializer.errors
    parent = serializer.save()

    assert parent.name == "Parent"
    assert parent.children.count() == 2
    assert set(parent.children.values_list("name", flat=True)) == {
        "Child A",
        "Child B",
    }


@pytest.mark.django_db
def test_create_parent_without_children():
    serializer = ParentSerializer(data={"name": "Parent"})

    assert serializer.is_valid(), serializer.errors
    parent = serializer.save()

    assert parent.children.count() == 0


@pytest.mark.django_db
def test_update_parent_without_nested_data_preserves_children():
    parent = Parent.objects.create(name="Parent")
    child = Child.objects.create(name="Child", parent=parent)

    serializer = ParentSerializer(
        parent,
        data={"name": "Updated parent"},
        partial=True,
    )

    assert serializer.is_valid(), serializer.errors
    updated = serializer.save()

    assert updated.name == "Updated parent"
    assert list(updated.children.values_list("pk", flat=True)) == [child.pk]


@pytest.mark.django_db
def test_update_existing_child_by_id():
    parent = Parent.objects.create(name="Parent")
    child = Child.objects.create(name="Original", parent=parent)

    serializer = ParentSerializer(
        parent,
        data={
            "children": [
                {"id": str(child.uuid), "name": "Updated"},
            ],
        },
        partial=True,
    )

    assert serializer.is_valid(), serializer.errors
    serializer.save()

    child.refresh_from_db()

    assert child.name == "Updated"
    assert child.parent_id == parent.pk
    assert parent.children.count() == 1


@pytest.mark.django_db
def test_add_child_while_updating_existing_child():
    parent = Parent.objects.create(name="Parent")
    child = Child.objects.create(name="Existing", parent=parent)

    serializer = ParentSerializer(
        parent,
        data={
            "children": [
                {"id": str(child.uuid), "name": "Updated"},
                {"name": "New child"},
            ],
        },
        partial=True,
    )

    assert serializer.is_valid(), serializer.errors
    serializer.save()

    assert parent.children.count() == 2
    child.refresh_from_db()
    assert child.name == "Updated"
    assert set(parent.children.values_list("name", flat=True)) == {
        "Updated",
        "New child",
    }


@pytest.mark.django_db
def test_delete_children_omitted_from_nested_list():
    parent = Parent.objects.create(name="Parent")
    keep = Child.objects.create(name="Keep", parent=parent)
    remove = Child.objects.create(name="Remove", parent=parent)

    serializer = ParentSerializer(
        parent,
        data={
            "children": [
                {"id": str(keep.uuid), "name": "Keep"},
            ],
        },
        partial=True,
    )

    assert serializer.is_valid(), serializer.errors
    serializer.save()

    assert list(parent.children.all().values_list("pk", flat=True)) == [keep.pk]
    assert not Child.objects.filter(pk=remove.pk).exists()


@pytest.mark.django_db
def test_keep_children_omitted_from_nested_list():
    parent = Parent.objects.create(name="Parent")
    keep = Child.objects.create(name="Keep", parent=parent)
    omit = Child.objects.create(name="Omit", parent=parent)

    serializer = ParentKeepChildrenSerializer(
        parent,
        data={
            "children": [
                {"id": str(keep.uuid), "name": "Updated"},
            ],
        },
        partial=True,
    )

    assert serializer.is_valid(), serializer.errors
    serializer.save()

    assert set(parent.children.values_list("pk", flat=True)) == {
        keep.pk,
        omit.pk,
    }
    keep.refresh_from_db()
    assert keep.name == "Updated"


@pytest.mark.django_db
def test_nested_children_are_scoped_to_their_parent():
    parent_a = Parent.objects.create(name="Parent A")
    parent_b = Parent.objects.create(name="Parent B")
    child = Child.objects.create(name="Child B", parent=parent_b)

    serializer = ParentSerializer(
        parent_a,
        data={
            "children": [
                {"id": str(child.uuid), "name": "Attempted update"},
            ],
        },
        partial=True,
    )

    assert serializer.is_valid(), serializer.errors

    # The current implementation may fail this assertion: it does not
    # correctly reject an ID that belongs to another parent's relation.
    with pytest.raises((PermissionDenied, IntegrityError)):
        serializer.save()

    child.refresh_from_db()
    assert child.parent_id == parent_b.pk
    assert child.name == "Child B"

