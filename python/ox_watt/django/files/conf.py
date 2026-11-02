from pathlib import Path
from uuid import UUID

from django.conf import settings
from .. import conf


__all__ = ("FileSettings", "files_settings", "resolve")


class FileSettings(conf.Settings):
    """
    Setting class used by the files module.
    """
    MEDIA_DIR: Path = settings.MEDIA_ROOT / "ox_files"
    """ MEDIA directory """
    UPLOAD_DIR: str = "ox_files/uploads"
    """ Subdirectory in media dir where to upload files. """
    PREVIEW_DIR: str = "ox_files/previews"
    """ Directory in media dir which to save previews. """

    FILE_SIZE_LIMIT = 15 * 1024 * 1024
    """ Set maximum file size. """

    MAGIC_BUFFER: int = 2048
    """ Buffer size used by Python-Magic to read mime types. """
    THUMBNAIL_SIZE: tuple[int, int] = (600, 800)
    """ Size for thumbnails """

    PROCESSORS: list[str] = [
        "ox_watt.django.files.processors.ImageProcessor",
        "ox_watt.django.files.processors.PDFProcessor",
        "ox_watt.django.files.processors.LibreOfficeProcessor",
    ]
    """ List of file processors. """

    @property
    def upload_dir(self) -> Path:
        """Return full path to upload dir."""
        # We enforce media to be protected
        return self.MEDIA_DIR / self.UPLOAD_DIR

    @property
    def preview_dir(self) -> Path:
        """Return full path to preview dir."""
        # We enforce media to be protected
        return self.MEDIA_DIR / self.PREVIEW_DIR

    def resolve(self, path: str, relative: bool = False):
        """Resolve path under file upload directory.

        :param path: path to resolve.
        :param relative: if True, return path relative to MEDIA_ROOT.
        """
        if path.startswith("/"):
            path = path[1:]

        path = self.upload_dir / path
        if relative:
            return path.relative_to(settings.MEDIA_ROOT)
        return path


files_settings: FileSettings = FileSettings("OX_FILES")
"""
Settings used by file models by default, using key ``OX_FILES``.
"""

resolve = files_settings.resolve
""" Shortcut to ``files_settings`` 's :py:meth:`Settings.resolve`. """

