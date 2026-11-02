"""
This module provide fields and models that can be reused among all
applications.
"""

from django.db import models
from django.apps import apps as runtime_apps
from django.apps.registry import Apps


from .color import HexColorValidator, ColorField, Colored
from .common import UUID, Named, LongNamed, OnlyDescribed, Described, Created, Updated, Timestamped, Versioned, PackageInfo
from .cls import ClassField, ClassPath
from .save_hook import SaveHook, SaveHookQuerySet
from .tree import TreeNodeQuerySet, TreeNode


def get_model(model: str, apps: Apps | None = None) -> models.Model:
    """Return a model provided by ``model`` name, using provided registry if any."""
    if apps is None:
        apps = runtime_apps
    return apps.get_model(*model.split("."))


def get_models(models: list[str], apps: Apps | None = None) -> list[models.Model]:
    """
    Return a list of model provided by ``models`` names.

    When apps registry is provided use this specific registry, otherwise use default application registry.

    This method is usefull to provide function that can be run both in migrations (using ``RunPython``) and as is.

    :param models_refs: list of ``app_name.model_name``
    :param apps: apps registry to use
    :return a list of models (ordered by input ones)
    """
    if apps is None:
        apps = runtime_apps
    return [apps.get_model(*name.split(".")) for name in models]


__all__ = (
    "get_model",
    "get_models",
    # color
    "HexColorValidator",
    "ColorField",
    "Colored",
    # common
    "UUID",
    "Named",
    "LongNamed",
    "OnlyDescribed",
    "Described",
    "Created",
    "Updated",
    "Timestamped",
    "Versioned",
    "PackageInfo",
    # fields
    "ClassField",
    "ClassPath",
    # save_hook
    "SaveHookQuerySet",
    "SaveHook",
    # tree
    "TreeNodeQuerySet",
    "TreeNode",
)
