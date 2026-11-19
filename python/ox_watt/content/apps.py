from ox.core import apps

from django.utils.translation import gettext_lazy as _


__all__ = ("AppConfig",)


class AppConfig(apps.AppConfig):
    name = "ox.apps.content"
    label = "ox_content"
    verbose_name = _("Content")
    icon = "mdi-flag"

    root_url = "ox/content"
    npm_package = "@oxylus/content"
