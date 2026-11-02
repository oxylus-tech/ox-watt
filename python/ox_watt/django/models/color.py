from django import forms
from django.db import models
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _


__all__ = ("HexColorValidator", "ColorField", "Colored")


HexColorValidator = RegexValidator(
    regex=r"^#(?:[0-9a-fA-F]{3}){1,2}$", message=_("Enter a valid hex color code (e.g. #FFF or #FFFFFF).")
)
""" Validator for hex formatted colors. """


class ColorField(models.CharField):
    """CharField taking a color as input."""

    default_validators = [HexColorValidator]

    def __init__(self, *args, **kwargs):
        kwargs.setdefault("max_length", 7)
        super().__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        defaults = {
            "form_class": forms.CharField,
            "widget": forms.TextInput(attrs={"type": "color"}),
            "validators": self.default_validators,
        }
        defaults.update(kwargs)
        return super().formfield(**defaults)


class Colored(models.Model):
    """Provide a :py:class:`ColorField` named ``color``."""

    color = ColorField(_("Color"), null=True, blank=True)

    class Meta:
        abstract = True
