from __future__ import annotations
from pathlib import Path


from .processor import Processor


__all__ = ("PDFProcessor",)


class PDFProcessor(Processor):
    """
    Processor for pdf and other document formats (epub, office, msword).
    """
    mime_types = {
        "application/pdf",
        "application/epub+zip",
        "application/vnd.ms-xpsdocument",
        "application/vnd.comicbook+zip",
        "application/vnd.comicbook-rar",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/msword",
        "application/vnd.ms-excel",
        "application/vnd.ms-powerpoint",
        "application/x-fictionbook+xml",
        "application/xhtml+xml",
        "text/html",
        "text/plain",
    }

    def _create_preview(self, path: Path, out: Path, size: tuple[int, int]) -> bool:
        """Create thumbnail for the input pdf file (on the first page.
        Thumbnails are saved as JPEG images.
        """
        import pymupdf
        from PIL import Image

        doc = pymupdf.open(path)
        pix = None
        for page in doc:
            if not self.is_empty(page):
                pix = page.get_pixmap(dpi=150)
                break

        # default takes the first page
        if not pix:
            pix = doc[0].get_pixmap(dpi=150)

        image = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        image.thumbnail(size)
        image.save(out)
        return True

    def is_empty(self, page) -> bool:
        return not page.get_text().strip() or not page.get_images(full=True) or not page.get_drawings()
