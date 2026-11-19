from __future__ import annotations
from pathlib import Path
from typing import IO

import magic
from django.utils.module_loading import import_string


from ..conf import files_settings
from .processor import Processor


__all__ = ("Registry",)


class Registry:
    """
    Registry of all file processor classes.

    This is used to determine file type and provide a processor based on it.
    """

    processors: list[Processor] = None
    """ List of processors """
    default_processor = None
    """ Default processor to use when file type is not supported by any other processor.  """
    mime_types: dict[str, Processor] = None
    """ Processors by mime type """

    def __init__(self, default_processor, processors: list[Processor] = []):
        self.default_processor = default_processor
        self.mime_types = {}
        self.processors = []
        for processor in processors:
            self.register(processor)

    def populate(self, paths: list[str] = files_settings.PROCESSORS):
        """Fullfill registry using provided list of processors class path.
        :param paths: class paths (defaults to :py:attr:`~..conf.Settings.PROCESSORS`)
        """
        for path in paths:
            cls = import_string(path)
            self.register(cls())

    def register(self, processor: Processor):
        """Register a new processor"""
        if not isinstance(processor, Processor):
            raise TypeError(f"{processor} is not a subclass `Processor`.")

        self.processors.append(processor)
        self.mime_types.update((mt, processor) for mt in processor.mime_types if mt not in self.mime_types)

    def read_mime_type(self, file_or_stream: Path | str | IO) -> str:
        """Return mime type for the provided file or stream."""
        if isinstance(file_or_stream, (str, Path)):
            return magic.from_file(file_or_stream, mime=True)

        buffer = file_or_stream.read(ox_files_settings.MAGIC_BUFFER)
        return magic.from_buffer(buffer, mime=True)

    def get(self, mime_type: str) -> Processor | None:
        """Return processor for the provided mime type."""
        return self.mime_types.get(mime_type, self.default_processor)
