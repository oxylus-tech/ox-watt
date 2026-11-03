from functools import cached_property
from pathlib import Path
from typing import Any, Literal

import yaml
from django.conf import settings


__all__ = ("Settings", "SettingsEditor", "OWSettings", "ow_settings")


class Settings:
    """
    This class provide settings configuration with default values.

    Configuration keys are declared and document under subclass of this
    one as UPPERCASED attributes. This allows to document them.

    User can still import the class in ``settings.py`` in order to
    reuse already existing values.


    Example ``myapp.conf``

    .. code-block:: python

        from ox_watt.django import conf

        __all__ = ("MyAppSettings", "app_settings")

        class MyAppSettings(conf.Settings):
            ALLOWED_TAGS = ["a", "b", "br"]
            \""" Tags allowed for this application. \"""
            SOME_VALUE = 123
            \""" Other documented setting. \"""

        # this is the actual instance used to retrieve settings
        app_settings = MyAppSettings("MYAPP")

    In project ``settings.py``:

    .. code-block:: python

        from myapp.settings import MyAppSettings

        MYAPP = {
            "ALLOWED_TAGS": [*MyAppSettings.ALLOWED_TAGS, "p"],
        }


    Usage:

    .. code-block:: python

        from myapp.conf import app_settings

        # Just print it out...
        print(app_settings.ALLOWED_TAGS, app_settings.SOME_VALUE)

    """

    def __init__(self, key, source=settings):
        self._overrides = getattr(source, key, None)

    def __getattribute__(self, name):
        if name[0] != "_" and name.isupper():
            overrides = object.__getattribute__(self, "_overrides")
            if overrides and name in overrides:
                return overrides[name]
        return object.__getattribute__(self, name)


class SettingsEditor:
    """
    Helper class to work with dynaconf settings files, one per setting file.
    """

    name: str
    """ Settings name """
    dir: Path
    """ Path to settings directory. """

    def __init__(self, name, dir):
        self.name = name
        self.dir = Path(dir)

    @classmethod
    def from_app(cls, app, *args, **kwargs):
        """Return SettingsEditor for the provided file."""
        name = f"{app.label}.yaml"
        return cls(name, *args, **kwargs)

    @cached_property
    def path(self):
        """ """
        return self.dir / self.name

    def _ensure(self):
        """Ensure directory exists."""
        self.dir.mkdir(parents=True, exist_ok=True)

    def read(self) -> dict[str, Any] | None:
        """Read data from settings."""
        if not self.path.exists():
            return None

        with open(self.path, "r") as stream:
            return yaml.load(stream, Loader=yaml.Loader)

    def write(self, data):
        """Write data to settings file."""
        self._ensure()
        with open(self.path, "w") as stream:
            yaml.dump(data, stream)


class OWSettings(Settings):
    """Ox-Watt settings."""

    HTTP_BACKEND_SERVER: Literal["nginx", "apache"] | str | None = None
    """
    Http server used to run the backend. Usefull for classes and tools using
    specific server's capabilities (as for serving files).
    """


ow_settings = OWSettings("OW")
