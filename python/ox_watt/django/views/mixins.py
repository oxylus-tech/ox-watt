from pathlib import Path

from django.conf import settings
from django.views.generic import View
from django.http import HttpResponse, FileResponse

from ..conf import ow_settings


__all__ = ("ServeFileMixin",)


class ServeFileMixin(View):
    """
    Serve a file view.

    It allows to provide access control to a file while using the upstream
    HTTP server to serve it.

    Supported servers:

        - Nginx: X-Accel-Redirect
        - Apache: X-Sendfile
        - otherwise, return a FileResponse.
    """

    def serve(
        self, name: str, path: Path, media_root: Path, media_url: str | None = None
    ) -> HttpResponse | FileResponse:
        match ow_settings.HTTP_BACKEND_SERVER:
            case "nginx":
                media_root = media_root or Path(settings.MEDIA_ROOT)
                media_url = media_url or settings.MEDIA_URL

                if media_root not in path.parents:
                    raise ValueError(f"Path `{path}` is not in configured media directory `{media_root}`.")

                response = HttpResponse()
                url_path = path.relative_to(media_root)
                response["X-Accel-Redirect"] = f"{media_url}{url_path}"
            case "apache":
                response = HttpResponse()
                response["X-Sendfile"] = path

            case _:
                response = FileResponse(open(path, "rb"))

        response["Content-Disposition"] = f'inline; filename="{name}"'
        return response
