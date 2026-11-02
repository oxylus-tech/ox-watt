"""Models used exclusively for tests."""

from django.db import models

from ox_watt.django.models import UUID
from ox_watt.django.models.tree import TreeNode as _TreeNode
from ox_watt.django.files.models import BaseFile, BaseFolder


__all__ = ("Value", "TreeNode", "OwnedTreeNode", "File", "Folder", "SerializerTestModel", "Child", "Parent")


class Value(models.Model):
    """Base model class to use in ox applications.

    It provides:
        - segregation between storage id and public uuid;
        - urls based on router declaration;
    """

    name = models.CharField(max_length=32, default="")
    value = models.IntegerField(default=0)


class TreeNode(_TreeNode):
    name = models.CharField(max_length=32, default="")


class Folder(BaseFolder):
    pass


class File(BaseFile):
    folder = models.ForeignKey(Folder, models.CASCADE, related_name="files")


class SerializerTestModel(UUID):
    """Minimal model used to test ModelSerializer."""

    name = models.CharField(max_length=100)


class Parent(UUID):
    """Model with reverse related objects for nested serializer tests."""

    name = models.CharField(max_length=100)


class Child(UUID):
    """Child model linked to Parent."""

    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        Parent,
        related_name="children",
        on_delete=models.CASCADE,
    )
