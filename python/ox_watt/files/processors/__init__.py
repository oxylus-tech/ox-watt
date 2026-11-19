from .processor import Processor
from .image_processor import ImageProcessor
from .pdf_processor import PDFProcessor
from .libreoffice_processor import LibreOfficeProcessor
from .registry import Registry


registry = Registry(Processor())
""" Default registry of file processors. """


__all__ = ("Processor", "ImageProcessor", "PDFProcessor", "LibreOfficeProcessor", "Registry", "registry")
