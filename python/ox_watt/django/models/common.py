"""
This module provide fields and models that can be reused among all
applications.
"""

from uuid import uuid4

from django.db import models
from django.utils.translation import gettext_lazy as _


__all__ = (
    "UUID",
    "Named",
    "LongNamed",
    "OnlyDescribed",
    "Described",
    "Created",
    "Updated",
    "Timestamped",
    "Versioned",
    "PackageInfo",
)


class UUID(models.Model):
    """Provide uuid field."""
    uuid = models.UUIDField(_("UUID"), default=uuid4, db_index=True, editable=False, unique=True)

    class Meta:
        abstract = True


class Named(models.Model):
    """Provide mandatory name field."""

    name = models.CharField(_("Name"), max_length=64)

    class Meta:
        abstract = True

    def __str__(self):
        return f"{self.name}"


class LongNamed(models.Model):
    """Provide mandatory name field (long name: 128)."""

    name = models.CharField(_("Name"), max_length=128)

    class Meta:
        abstract = True


class OnlyDescribed(models.Model):
    """Provide description field."""

    description = models.CharField(_("Description"), max_length=256, blank=True, null=True, default="")

    class Meta:
        abstract = True


class Described(Named, OnlyDescribed):
    """Provide name (mandatory) and description field."""

    description = models.CharField(_("Description"), max_length=256, blank=True, null=True, default="")

    class Meta:
        abstract = True


class Authored(models.Model):
    """Provide `author` field, which specifies an author."""

    author = models.CharField(_("Author"), max_length=128)

    class Meta:
        abstract = True


class Versioned(models.Model):
    """Provide `version` field, which specifies a version."""

    version = models.CharField(_("Version"), max_length=32, default="0.0.1")

    class Meta:
        abstract = True


class Created(models.Model):
    """Provide `updated` field, which specifies the last model update datetime."""

    created = models.DateTimeField(_("Created"), auto_now_add=True)

    class Meta:
        abstract = True


class Updated(models.Model):
    """Provide `updated` field, which specifies the last model update datetime."""

    updated = models.DateTimeField(_("Updated"), auto_now=True)

    class Meta:
        abstract = True


class Timestamped(Created, Updated):
    """Provide both `created` and `updated` fields."""

    class Meta:
        abstract = True


class PackageInfo(Updated, Versioned, Authored, Described):
    source = models.URLField(_("Source Code URL"))
    homepage = models.URLField(_("Homepage"))

    class Meta:
        abstract = True
