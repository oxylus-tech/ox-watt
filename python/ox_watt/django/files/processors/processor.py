from __future__ import annotations
import logging
from pathlib import Path

from django.utils.translation import gettext_lazy as _

logger = logging.getLogger()


__all__ = ("Processor",)


class Processor:
    """
    A Processor handles reading file metadata, providing preview among other things.
    """

    mime_types: set[str] = set()
    type = "file"
    display_type = _("File")

    def create_preview(
        self,
        path: Path,
        out: Path,
        size: tuple[int, int],
        force: bool = False,
        **kwargs,
    ) -> bool:
        """
        Create a preview for the file at provided path.

        :param path: path of the file to create a preview of
        :param out: output path to save preview
        :param thumbnail size: defaults to configured settings.
        :param force: create file even if it exists
        :return boolean indicating wether file has been created
        """
        if not force and out.exists():
            return False
        logger.info(f"ox.files: create preview for {path} using {self.__class__.__name__}")
        return self._create_preview(path, out, size, **kwargs)

    def _create_preview(self, path: Path, out: Path, size: tuple[int, int], **kwargs) -> bool:
        """
        To be implemented by processors: this is where the preview is actually
        created. Default implementation does not create preview.

        Same arguments and return than :py:meth:`create_preview`.
        """
        return False

    def get_metadata(self, path: Path) -> dict[str, str]:
        """Return file metadata.

        :param path: file path
        """
        return {}
