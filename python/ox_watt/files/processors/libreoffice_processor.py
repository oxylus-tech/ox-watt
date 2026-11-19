import tempfile
import subprocess
from pathlib import Path

from .processor import Processor
from .pdf_processor import PDFProcessor


class LibreOfficeProcessor(Processor):
    """
    File processor using ``libreoffice`` to generate previews.

    It support open document and open office document formats.
    """
    mime_types = {
        "application/vnd.oasis.opendocument.text",
        "application/vnd.oasis.opendocument.text-template",
        "application/vnd.oasis.opendocument.text-master",
        "application/vnd.oasis.opendocument.formula",
        "application/vnd.oasis.opendocument.spreadsheet",
        "application/vnd.oasis.opendocument.spreadsheet-template",
        "application/vnd.oasis.opendocument.presentation",
        "application/vnd.oasis.opendocument.presentation-template",
        "application/vnd.oasis.opendocument.graphics",
        "application/vnd.oasis.opendocument.graphics-template",
        "application/vnd.oasis.opendocument.database",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.openxmlformats-officedocument.presentationml.template",
        "application/pdf",
        "text/plain",
        "text/csv",
        "text/html",
        "image/svg+xml",
        "image/png",
        "image/jpeg",
        "image/gif",
        "application/rtf",
        "application/x-mswrite",
        "application/x-mspublisher",
        "application/x-dbase",
        "application/xml",
    }

    def _create_preview(self, path: Path, out: Path, size: tuple[int, int]) -> bool:
        """
        Create thumbnails for input document supported by LibreOffice.
        """
        with tempfile.TemporaryDirectory() as dir:
            subprocess.run(["libreoffice", "--headless", "--convert-to", "pdf", str(path), "--outdir", dir])
            temp_out = str(Path(dir) / path.stem) + ".pdf"
            return PDFProcessor().create_preview(temp_out, out)
