import inspect
from functools import cached_property
from importlib import import_module
from typing import Type

from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from rest_framework import serializers


__all__ = ("SerializerField",)


class SerializerField(models.JSONField):
    """
    This field is a JSONField validated using Django Rest Framework
    serializer.

    Though serializers already do the work, this ensures that data stays
    correct when users uses django admin interface or forms.

    .. note::

        Validation is made at field clean, so whenever you actually want
        to validate data, you must call model's ``full_clean()`` (which
        is by Django forms).

    """

    serializer_class: Type[serializers.Serializer] = None
    """ Django Rest Framework serializer class. """
    many: bool = False

    def __init__(self, *args, serializer_class: Type[serializers.Serializer], many: bool = False, **kwargs):
        """
        :param *args: JSONField positional arguments;
        :param serializer_class: serializer class;
        :param many: whether expecting many values or none;
        :param **kwargs: JSONField named arguments;
        """

        if not issubclass(serializer_class, serializers.Serializer):
            raise TypeError("`serializer_class` must be a subclass of Serializer serializer")

        self.serializer_class = serializer_class
        self.many = many
        super().__init__(*args, **kwargs)

    def clean(self, value, model_instance):
        value = super().clean(value, model_instance)

        serializer = self.serializer_class(data=value, many=self.many)
        if not serializer.is_valid():
            raise ValidationError(serializer.errors)
        return serializer.validated_data
