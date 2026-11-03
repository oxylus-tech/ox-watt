from pathlib import Path
from uuid import UUID

from django.core.exceptions import PermissionDenied
from django.views.generic import View
from django.views.generic.detail import SingleObjectMixin
from django.http import HttpResponse, Http404, FileResponse

from caps.views import OwnedViewSet, AccessViewSet
from caps.views.mixins import SingleOwnedMixin, OwnedPermissionMixin

from ox.core.conf import ox_settings
from ox.apps.content.views import MessageViewSet
from . import filters, serializers, tasks
from .models import Folder, File, FolderComment, FileComment


__all__ = ("FolderViewSet", "FolderAccessViewSet", "FileViewSet", "FileAccessViewSet")


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

    def serve(self, name: str, path: Path):
        match ox_settings.HTTP_SERVER_BACKEND:
            case "nginx":
                response = HttpResponse()
                response["X-Accel-Redirect"] = ox_settings.protected_media_url(field.name)
            case "apache":
                response = HttpResponse()
                response["X-Sendfile"] = field.path

            case _:
                response = FileResponse(open(field.path, "rb"))

        response["Content-Disposition"] = f'inline; filename="{self.object.name}"'
        return response

