"""
This module provides files utilities for Django.

It provides:

    - Files mime-type detection based on file content.
    - Reusable File and Folder abstract models and configuration.

Required dependencies (with dependency group: ``files``):

- PIL: used for ImageProcessor & PDFProcessor
- libreoffice: LibreOfficeProcessor
- pymupdf: used PDFProcessor

"""
from . import processors, models

__all__ = (
    "processors", "models"
)

