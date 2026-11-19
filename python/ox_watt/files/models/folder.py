from __future__ import annotations

from pathlib import Path
import shutil

from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from ox_watt.django.models import Described, Timestamped
from ox_watt.django.models.tree import TreeNode, TreeNodeQuerySet
from ..conf import FileSettings, files_settings


__all__ = (
    "FolderQuerySet",
    "BaseFolder",
    "validate_name",
)


def validate_name(value):
    """Validate folder or file name."""
    if "/" in value:
        raise ValidationError(_("The character `/` is forbidden in name."))


class FolderQuerySet(TreeNodeQuerySet):
    pass


class BaseFolder(Described, Timestamped, TreeNode):
    """
    Represent a folder in which files are stored.

    .. important::

        Updating :py:attr:`parent`, :py:attr:`name` and :py:attr:`path` should not be done manually. Instead use
        :py:meth:`rename` and :py:meth:`move_to` methods to ensure that these values are correctly set.

        When thoses values raise a ValidationError, user should assume that new values of the model are invalid.

    """

    name = models.CharField(_("Name"), max_length=64, validators=[validate_name])

    objects = FolderQuerySet.as_manager()

    class Meta:
        abstract = True
        verbose_name = _("Folder")
        verbose_name_plural = _("Folders")
        constraints = [models.UniqueConstraint("parent", "name", name="unique_folder_name")]

    @classmethod
    def file_model(cls):
        """ Return the file model related to this folder (assuming the reverse name is ``files``). """
        return cls.get_field("files").related_model

    def abs_path(self) -> Path:
        """File system path of the folder."""
        return self.file_model()._settings.resolve(self.path)

    def rename(self, name: str, save: bool = True):
        """Rename folder."""
        if name != self.name:
            self.name = name
            if save:
                self.save()
            else:
                self.on_save()

    def move_to(self, parent: BaseFolder | None = None, name: str | None = None, save: bool = True):
        """Move folder into provided parent folder or root.

        :param parent: parent folder
        :param name: if provided rename folder
        :param save: save node
        """
        if (name and name != self.name) or parent.id != self.parent_id:
            if name:
                self.name = name
            super().move_to(parent, save)

    def validate_node(self):
        """
        Validate node for name collision (folder & file).

        :yield ValidationError: a file or folder already exists with this name in parent.
        """
        super().validate_node()

        if self.file_model().objects.filter(folder=self.parent, name=self.name):
            raise ValidationError({"name": f"A file `{self.name}` already exists in {self.parent.name}."})

    def sync_node(self, source_path: str | None = None, target_path: str | None = None):
        """Synchronize folder with filesystem (move or create it)."""
        source_p = source_path and self.file_model()._settings.resolve(source_path)
        target_p = self.file_model()._settings.resolve(target_path)

        if target_p.exists():
            raise ValueError(f"A file or directory already exists at `{target_p}`.")

        if source_p and source_p.exists():
            shutil.move(source_p, target_p)
        else:
            target_p.mkdir(parents=True, exist_ok=True)

        super().sync_node(source_path, target_path)

    def delete(self):
        path = self.file_model()._settings.resolve(self.path, self.owner.uuid)
        if path.exists():
            path.rmdir()
        super().delete()

