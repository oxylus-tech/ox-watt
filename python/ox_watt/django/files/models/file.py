from __future__ import annotations

from functools import cached_property
from pathlib import Path
import os
import shutil
from typing import Type

from django.db import models, transaction
from django.conf import settings
from django.core.exceptions import ValidationError, PermissionDenied, FieldDoesNotExist
from django.utils.translation import gettext_lazy as _
from django.urls import reverse

from ox_watt.django.models import Described, Timestamped, UUID

from ..conf import files_settings, FileSettings
from .. import processors
from .folder import BaseFolder, validate_name


__all__ = ("FileQuerySet", "BaseFile", "file_upload_to")


class FileQuerySet(models.QuerySet):
    def delete(self, clear_files: bool | None = None):
        if clear_files is None:
            clear_files = self.model._settings.CLEAR_FILES_ON_DELETE

        if clear_files:
            self.clear_files(update=False)
        return super().delete()

    def clear_files(self, update: bool = True):
        """
        Delete files from filesystem and optionally update fields.

        :param update: if True (default), update queryset fields.
        """
        for file, preview in self.values_list("file", "preview"):
            (settings.MEDIA_ROOT / file).unlink(missing_ok=True)
            preview and (settings.MEDIA_ROOT / preview).unlink(missing_ok=True)

        if update:
            self.update(file=None, preview=None)


def file_upload_to(instance, filename) -> str:
    """Return target upload file depending on whether the folder is synchronized or not."""
    if instance.folder_model() and instance.folder:
        path = f"{instance.folder.path}/{filename}"
    else:
        path = f"/{filename}"
    return instance._settings.resolve(path, relative=True)


class BaseFile(Described, Timestamped, UUID):
    """
    This class represent a file.

    Files are looked up for a matching :py:class:`~.processors.FileProcessor` (reading mime-type). A processors
    handles different tasks such as creating preview (thumbnails) or getting metadata. In order to do so, it uses
    :py:data:`~.processors.registry` that provides helpers to read mime types and register file processors.

    Folders
    -------

    A file can be nested under a :py:attr:`parent` folder. If ``None`` is provided, then it will be
    at the root of the filesystem.

    If you want to add folder, you must add the ``folder`` foreign key:

        - Reverse name as ``files``.
        - One Folder concrete subclass per File subclass.

    Settings
    --------

    The model uses by default the :py:attr:`~ox_watt.django.files.conf.files_settings`. However
    you might want to integrate your own FileSettings instance by assigning :py:attr:`_settings`.

    At deletion, related files and previews are deleted based on ``.conf.files_settings`` (``CLEAR_FILES_ON_DELETE=True`` option).
    """

    _settings = files_settings
    """ Specify settings to use for files. """

    # When folder is null, it is at root
    # folder = models.ForeignKey(Folder, models.CASCADE, related_name="files", verbose_name=_("Folder"))

    name = models.CharField(_("Name"), max_length=128, validators=[validate_name])
    file = models.FileField(_("File"), upload_to=file_upload_to, null=True)
    preview = models.FileField(_("Preview"), null=True, blank=True)
    mime_type = models.CharField(_("Mime Type"), max_length=127, blank=True)
    file_size = models.PositiveIntegerField(_("File Size"), blank=True, default=0)
    preview_size = models.PositiveIntegerField(_("Preview Size"), blank=True, default=0)

    caption = models.TextField(
        _("Caption"),
        default="",
        help_text=_("Displayed below object when rendered in page or documents."),
        blank=True,
        null=True,
    )
    alternate = models.TextField(
        _("Alternate text"),
        default="",
        help_text=_("Displayed as replacement text when object is not displayed."),
        blank=True,
        null=True,
    )
    ariaDescription = models.TextField(
        _("ARIA Description"),
        default="",
        blank=True,
        null=True,
        help_text=_("Provide a description of the content for visually impaired people."),
    )
    metadata = models.JSONField(_("Metadata"), default=dict, blank=True)

    objects = FileQuerySet.as_manager()

    class Meta:
        abstract = True
        verbose_name = _("File")
        verbose_name_plural = _("Files")
        # FIXME: add unique constraint

    @cached_property
    def file_url(self):
        """Return file url."""
        uuid = self.access and self.access.uuid or self.uuid
        return reverse("serve-file", kwargs={"uuid": uuid})

    @cached_property
    def preview_url(self):
        """Return file preview url."""
        if not self.preview:
            return None
        uuid = self.access and self.access.uuid or self.uuid
        return reverse("serve-file-preview", kwargs={"uuid": uuid})

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._initial_path = self.file and self.file.path

    @classmethod
    def folder_model(cls) -> Type[BaseFolder]:
        """
        Return folder class used by this model.

        It assumes that either it is a foreignkey to "folder" or not declared.
        """
        try:
            return cls.get_field("folder").target.remote_field.model
        except FieldDoesNotExist:
            return None

    def abs_path(self):
        return self.folder.abs_path() / self.name

    def on_save(self, fields=None):
        """Ensure mime type and file validation."""
        super().on_save(fields)
        self.validate_node()

    def validate_node(self):
        """
        Ensure file name is unique within folder.

        :yield ValidationError: if file name is already present in folder (file or folder).
        """
        if Folder := self.folder_model():
            # TODO: handle file move
            kw = self._get_validation_lookup()

            query = type(self).objects.filter(folder_id=self.folder_id, **kw)
            if self.pk:
                query = query.exclude(pk=self.pk)

            if query.exists():
                raise ValidationError({"name": "Another file exists for this path."})

            if Folder.objects.filter(parent_id=self.folder_id, **kw):
                raise ValidationError({"name": "A folder exists for this path."})


    def _get_validation_lookup(self):
        return {"name": self.name}

    def read_mime_type(self, save: bool = True) -> str:
        """Read mime-type from file and update corresponding field.

        :param save: save object instance
        :return the mime type
        """
        self.file_size = Path(self.file.path).stat().st_size
        self.mime_type = processors.registry.read_mime_type(self.file.path)
        save and self.save()
        return self.mime_type

    def get_processor(
        self, save: bool = True, registry: processors.FileProcessors = processors.registry
    ) -> processors.Processor:
        """Return processor to use for this file type.

        Read mime-type from file if not already set.

        :param save: save model if mime type is updated (default is True)
        :param registry: use this processors instead of :py:data:`.processors.processors`
        """
        if not self.mime_type:
            self.read_mime_type(save)
        return registry.get(self.mime_type)

    def create_preview(self, force: bool = True) -> tuple[bool,Path]:
        """
        Generate and assign a preview to this file instance.

        :param force: if True (default), create preview even if already present.
        :return a tuple of ``created, preview_path``.
        """
        if self.preview:
            if not force:
                return (False, self.preview.path)
            self.preview.delete()
            self.preview = None
            self.save(update_fields=["preview"])

        with transaction.atomic():
            size = self._settings.THUMBNAIL_SIZE
            path = self._settings.preview_dir / f"{self.uuid}-{size}.jpg"

            path.parent.mkdir(parents=True, exist_ok=True)
            created = processor.create_preview(Path(self.file.path), path, size, force=True)

            if created:
                self.preview.name = str(path.relative_to(settings.MEDIA_ROOT))
                self.save()
        return (created, path)

    def delete(self, *args, clear_files: bool | None = None, **kwargs):
        """
        Ensure file deletion.

        :param *args: forward to super's ``delete()``
        :param clear_files: if True or False, overrides default settings.
        :param **kwargs: forward to super's ``delete()``
        """
        if clear_files is None:
            clear_files = self._settings.CLEAR_FILES_ON_DELETE

        if clear_files:
            if self.preview:
                self.preview.delete(False)
            if self.file:
                self.file.delete(False)

            self.preview = None
            self.file = None
        return super().delete(*args, **kwargs)

