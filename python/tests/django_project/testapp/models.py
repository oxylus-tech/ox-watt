"""Models used exclusively for tests."""

from django.db import models
from django.utils.translation import gettext_lazy as _

from ox_watt.django.models import UUID
from ox_watt.django.models.tree import TreeNode as _TreeNode
from ox_watt.files.models import BaseFile, BaseFolder


__all__ = ("Value", "TreeNode", "File", "Folder", "SerializerTestModel", "Child", "Parent")


class SharedStatus(models.TextChoices):
    """Enum shared by multiple models."""

    ENABLED = "enabled", "Enabled"
    DISABLED = "disabled", "Disabled"


class Value(models.Model):
    class Status(models.TextChoices):
        ACTIVE = "active", "Active"
        INACTIVE = "inactive", "Inactive"

    SharedStatus = SharedStatus

    name = models.CharField(_("Name"), max_length=32, default="", help_text=_("Name of the value."))
    value = models.IntegerField(_("Value"), default=0)
    status = models.CharField(
        _("Status"),
        max_length=16,
        choices=Status.choices,
        default=Status.ACTIVE,
    )


class TreeNode(_TreeNode):
    name = models.CharField(_("Name"), max_length=32, default="")


class Folder(BaseFolder):
    pass


class File(BaseFile):
    folder = models.ForeignKey(Folder, models.CASCADE, related_name="files", verbose_name=_("Folder"))


class SerializerTestModel(UUID):
    """Minimal model used to test ModelSerializer."""

    SharedStatus = SharedStatus

    name = models.CharField(_("Name"), max_length=100)


class Parent(UUID):
    """Model with reverse related objects for nested serializer tests."""

    name = models.CharField(_("Name"), max_length=100)


class Child(UUID):
    """Child model linked to Parent."""

    name = models.CharField(_("Name"), max_length=100)
    parent = models.ForeignKey(Parent, models.CASCADE, related_name="children", verbose_name=_("Parent"))
