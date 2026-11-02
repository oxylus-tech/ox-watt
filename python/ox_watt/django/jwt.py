"""
Provide utilities to work with json token.

It assumes that you provide settings:

    - Setting ``JWT_KEY``: json token key
    - Setting ``JWT_KEY_FALLBACKS``: older json token key (used for key rotation)
    - You install ox_watt with the ``jwt`` dependency group.

"""
from datetime import datetime
from typing import Any, Type

import jwt
from pydantic import BaseModel, field_validator

from django.core.exceptions import PermissionDenied
from django.conf import settings
from django.utils.translation import gettext_lazy as _


__all__ = ("JWToken", "JWTokenViewMixin", "encode", "decode")


def get_jwt_key():
    try:
        return settings.JWT_KEY
    except:
        raise RuntimeError("Missing `JWT_KEY` setting. Please add one in your django settings.")

def get_jwt_fallbacks():
    return getattr(settings, "JWT_KEY_FALLBACKS", [])


class JWToken(BaseModel):
    """
    A JSON Web Token to encode or decode.

    It is a pydantic model whose values are decoded from raw string / is
    used to serialize the token.

    When :py:attr:`expiration` is provided, model validation checks that
    it is not expired.
    """

    expiration: datetime | None = None

    def encode(self, **kwargs):
        return encode(self.model_dump(mode="json"), **kwargs)

    @classmethod
    def decode(cls, jwt: str, **kwargs):
        data = decode(jwt, **kwargs)
        return cls.model_validate(data)

    @field_validator("expiration", mode="after")
    @classmethod
    def validate_expiration(cls, value):
        # We assume that datetime is local to server
        if value is not None and value < datetime.now():
            raise ValueError("This token is expired")
        return value


class JWTokenViewMixin:
    """View mixin that validate input jwt.

    The JWT is provided as url argument (string) or GET parameter, and is read
    at dispatch. PermissionDenied is raised if an error occurs. Otherwise,
    sets :py:attr:`jwt` to the decoded token.
    """

    jwt: JWToken = None
    """ The JWT read from url if any. """
    jwt_str: str = None
    """ The provided JWT string. """
    jwtoken_class: Type[JWToken] = None
    """ JWToken class to invoke """

    def dispatch(self, *args, jwt: str = None, **kwargs):
        if jwt := (jwt or self.request.GET.get("jwt")):
            if not self.jwtoken_class:
                raise ValueError("Missing `jwtoken_class` attribute")
            self.jwt = self.get_jwt(jwt)
            self.jwt_str = jwt
        return super().dispatch(*args, **kwargs)

    def get_jwt(self, value: str):
        """Get JWT from the provided string.

        :yield PermissionDenied: an error occurred decoding the token.
        """
        try:
            return self.jwtoken_class.decode(value)
        except Exception:
            raise PermissionDenied(_("This token is not valid"))


def encode(payload: dict[str, Any], headers=None, json_encoder=None, algorithm="HS256"):
    """
    Simple wrapper around pyjwt's encode, using configured key and HS256
    algorithm.
    """
    return jwt.encode(payload, get_jwt_key(), headers=headers, json_encoder=json_encoder, algorithm=algorithm)


def decode(value: str, algorithms=["HS256"], **kwargs) -> dict[str, Any] | JWToken:
    """
    Simple wrapper around pyjwt's decode, using configured key (and fallback keys).

    It will try to run over all keys provided by ``JWT_KEY`` and ``JWT_KEY_FALLBACKS``
    settings. If none succeed, will re-raise error that happened on the decoding using ``JWT_KEY``.

    :param jwt: the token to be decoded.
    :param \*\*kwargs: extra parameters to pass to ``jwt.decode``.
    """
    keys = [get_jwt_key(), *get_jwt_fallbacks()]
    error = None

    for key in keys:
        try:
            return jwt.decode(value, key, algorithms=algorithms, **kwargs)
        except Exception as err:
            if error is None:
                error = err
    raise error
