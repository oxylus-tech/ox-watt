"""
Dependency groups: django, files

This module provides files utilities for Django.

It provides:

    - Files mime-type detection based on file content.
    - Reusable File and Folder abstract models and configuration.

Required dependencies (with dependency group: ``django, files``):

- PIL: used for ImageProcessor & PDFProcessor
- libreoffice: LibreOfficeProcessor
- pymupdf: used PDFProcessor

"""

from . import processors, models

__all__ = ("processors", "models")
