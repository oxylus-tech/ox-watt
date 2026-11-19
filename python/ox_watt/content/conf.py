from pathlib import Path

from django.conf import settings

from ox.utils import conf


class Settings(conf.Settings):
    ALLOWED_TAGS = [
        "p",
        "br",
        "strong",
        "em",
        "ul",
        "ol",
        "li",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
        "span",
        "div",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "a",
        "pre",
        "code",
    ]
    """ Allowed tags """
    ALLOWED_ATTRIBUTES = {
        "*": ["style"],
        "a": ["href", "title", "target"],
        "td": ["colspan", "rowspan"],
        "th": ["colspan", "rowspan"],
        # Oxylus specifics
        "span": ["data-block", "data-block-variable"],
        "div": ["data-block", "data-block-variable"],
    }
    """
    Allowed tags attributes.

    Pay attention to allow `data-block*` attribute as they are used by
    Oxylus.
    """
    ALLOWED_STYLES = ["text-align", "font-weight", "font-style", "color", "background-color"]
    """ Allowed inline tags styles. """
    ALLOWED_PROTOCOLS = ["https", "mailto", "tel"]
    """ Allowed URL protocols. """

    STATIC_DIR = "ox_content/bundles"
    """ Directory in static where to store bundles. """
    TEMPLATE_DIR = "ox_content/bundles"
    """ Directory in templates where to store bundles. """

    @property
    def template_dir(self) -> Path:
        """Template directory path where to store bundle templates."""
        return Path(settings.BASE_DIR) / "templates" / self.TEMPLATE_DIR

    @property
    def static_dir(self) -> Path:
        """Static directory path where to store bundles' statics."""
        return Path(settings.STATIC_DIR) / self.STATIC_DIR


ox_content_settings: Settings = Settings("OX_CONTENT")
"""
Settings used by ``ox_content`` application, using key ``OX_CONTENT``.
"""
