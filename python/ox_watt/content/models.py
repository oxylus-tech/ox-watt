from pathlib import Path

from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

from ox.core.models import Model
from ox.utils.models import PackageInfo, Timestamped

from . import mixins
from .conf import ox_content_settings


__all__ = ("RichTextField", "TemplatePack")


class RichTextField(mixins.RichTextFieldMixin, models.TextField):
    """
    Provide rich text value, ensuring input text is cleaned based on
    :py:attr:`~.conf.ox_content_settings`.

    It uses bleach, and provided attributes reflects bleach's ``clean()`` settings.

    Note though that strings are not marked as safe. This is up to the
    user to do so.
    """

    def to_python(self, value):
        return self._clean(super().to_python(value))

    def validate(self, value, model_instance):
        value = super().validate(value, model_instance)
        return self._clean(value)


class Message(Timestamped, Model):
    """A generic abstract Message model.

    This can be extended for different use cases. We also provide a
    serializer :py:class:`~.serializers.MessageSerializer`.
    """

    class Type(models.IntegerChoices):
        MESSAGE = 0x00, _("Message")
        """ User message. """
        AGENT = 0x01, _("Agent Message")
        """ Message from an agent eg AI """
        SYSTEM = 0x10, _("System")
        """ Message from the system """
        NOTIFICATION = 0x11, _("Notification")
        """ A notification as an update. """

    author = models.ForeignKey(User, models.CASCADE, verbose_name=_("Author"))
    content = RichTextField(_("Content"))
    source = models.ForeignKey("self", models.SET_NULL, null=True, blank=True, verbose_name=_("Related Message"))
    type = models.PositiveSmallIntegerField(_("Type"), choices=Type.choices, default=Type.MESSAGE, blank=True)

    class Meta:
        abstract = True


# Note: feature to be implemented
class TemplatePack(PackageInfo):
    """
    Base abstract model used to provide content templates.

    A bundle consist of different elements:

        - templates: used to render the content;
        - statics: assets;
        - user_fields: user specific fields;

    Templates and static directories are provided at class level, in order to allow users to
    create a new template inheriting from another one.
    """

    slug = models.SlugField(_("Slug"), max_length=64, unique=True)
    is_active = models.BooleanField(_("Is active"), default=True)

    source_dir = ""
    """
    [class attribute] Directory name in which to store packs.

    If not provided, use model's ``label_lower``.
    """
    template_files = [
        ("index.html", _("Index")),
    ]
    """
    [class attribute] Allowed template files that user can select.

    It is set as choices of related content's `template`.
    """

    @property
    def template_dir(self) -> Path:
        """Template directory for this template."""
        return self.get_template_dir() / self.slug

    @property
    def static_dir(self) -> Path:
        """Static directory for this template."""
        return self.get_static_dir() / self.slug

    class Meta:
        abstract = True
        verbose_name = _("Template Pack")
        verbose_name_plural = _("Template Packs")

    @classmethod
    def get_template_dir(cls) -> Path:
        """Return template directory used for this model class."""
        return ox_content_settings.template_dir / cls.get_source_dirname()

    @classmethod
    def get_static_dir(cls) -> Path:
        """Return static directory used for this model class."""
        return ox_content_settings.static_dir / cls.get_source_dirname()

    @classmethod
    def get_source_dirname(cls) -> str:
        """
        Return directory name in which templates and statics are put.
        This typically takes the format of ``app_label.model_name`` (lower cased).
        """
        return cls.source_dir or cls._meta.label_lower
