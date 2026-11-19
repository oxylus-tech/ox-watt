from __future__ import annotations
from pathlib import Path

from django.utils.translation import gettext_lazy as _


from ..exceptions import FileTypeError
from .processor import Processor


__all__ = ("ImageProcessor",)


class ImageProcessor(Processor):
    mime_types = {
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/webp",
        "image/tiff",
        "image/x-ms-bmp",
        "image/x-pcx",
        "image/x-tga",
        "image/x-xbitmap",
        "image/x-xpixmap",
        "image/x-portable-pixmap",
        "image/x-portable-bitmap",
        "image/x-portable-graymap",
        "image/x-portable-anymap",
        "image/x-rgb",
        "image/x-icns",
        "image/vnd.microsoft.icon",
        "image/avif",
        "image/heif",
        "image/x-exr",
    }
    type = "image"
    display_type = _("Image")

    def _create_preview(self, path: Path, out: Path, size: tuple[int, int]) -> bool:
        """
        Create thumbnail for the input image.
        :yield: :py:class:`.exceptions.FileTypeError` when file type is not supported.
        :yield: ``FileNotFound`` if file cannot be found
        """
        import PIL
        from PIL import Image

        try:
            with Image.open(path) as im:
                im.thumbnail(size)
                im.save(out)
                return True
        except (PIL.UnidentifiedImageError, ValueError, TypeError):
            raise FileTypeError(f"File format invalid for {path}.")
