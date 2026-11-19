import inspect
import json
import logging
import re
from enum import Enum
from pathlib import Path

from django.apps import AppConfig, apps
from django.conf import settings
from django.core.management.base import BaseCommand
from django.db import models
from django.utils import translation


logger = logging.getLogger(__name__)

escape_re = re.compile(r"([@$|{}])")


def escape(value: str) -> str:
    """
    Escape special characters used by Vue I18n.

    :param value: Text to escape.
    :return: Escaped text.
    """
    return escape_re.sub(r"{'\1'}", value)


def get_enum_subclasses(cls: type) -> set[type[Enum]]:
    """
    Recursively retrieve all loaded enum subclasses.

    :param cls: Base class from which to start discovery.
    :return: Set of discovered enum classes.
    """
    result = set()
    visited = set()

    def collect(base: type) -> None:
        for subclass in base.__subclasses__():
            if subclass in visited:
                continue

            visited.add(subclass)
            result.add(subclass)
            collect(subclass)

    collect(cls)

    return result


def get_model_enums(model: type[models.Model]) -> set[type[Enum]]:
    """
    Retrieve enums declared in or assigned to a model.

    This includes nested enums, enums assigned as class attributes,
    and enums inherited from parent models.

    :param model: Django model class.
    :return: Set of enum classes associated with the model.
    """
    result = set()
    visited = set()

    def inspect_class(cls: type):
        if cls in visited:
            return

        visited.add(cls)

        for value in vars(cls).values():
            if not inspect.isclass(value):
                continue

            if issubclass(value, Enum):
                result.add(value)
            elif value.__qualname__.startswith(cls.__qualname__ + "."):
                inspect_class(value)

    for base in model.__mro__:
        if not issubclass(base, models.Model):
            continue

        inspect_class(base)

    return result


def is_model_enum(enum_class: type[Enum], model: type[models.Model]) -> bool:
    """
    Check whether an enum is nested inside a model.

    :param enum_class: Enum class to check.
    :param model: Django model class.
    :return: Whether the enum is nested inside the model.
    """
    return enum_class.__module__ == model.__module__ and enum_class.__qualname__.startswith(model.__qualname__ + ".")


def get_enum_name(
    enum_class: type[Enum],
    app_config: AppConfig,
    model: type[models.Model] | None = None,
) -> str:
    """
    Return a normalized enum name within its translation namespace.

    Model enums use their qualified name relative to the model.
    Application enums use their qualified name, regardless of their module.

    :param enum_class: Enum class.
    :param app_config: Owning application configuration.
    :param model: Optional owning model.
    :return: Qualified enum name.
    """
    if model is not None and is_model_enum(enum_class, model):
        return enum_class.__qualname__[len(model.__qualname__) + 1 :]

    return enum_class.__qualname__


class Command(BaseCommand):
    """Generate application translation files."""

    help = "Generate Ox-Watt translation files"

    def add_arguments(self, parser):
        """
        Register command arguments.

        :param parser: Django command argument parser.
        """
        parser.add_argument(
            "apps",
            metavar="APPS",
            nargs="*",
            help="Select applications by label",
        )
        parser.add_argument(
            "-l",
            "--locale",
            action="append",
            help="Specify a locale",
        )
        parser.add_argument(
            "-o",
            "--out",
            type=Path,
            help="Specify an output directory",
        )
        parser.add_argument(
            "-r",
            "--root",
            action="append",
            type=Path,
            help="Only include applications located in these directories",
        )

    def handle(self, locale=None, out=None, root=None, apps=None, **kwargs):
        """
        Generate translation files for selected applications and locales.

        :param locale: Locales to generate.
        :param out: Output directory.
        :param root: Application directory filters.
        :param apps: Application label filters.
        """
        if out is None:
            out = settings.BASE_DIR / "static" / "locales"

        out.mkdir(exist_ok=True, parents=True)

        if locale is None:
            locale = [code for code, _ in settings.LANGUAGES]

        self.apps = self.get_apps(apps, root)

        for code in locale:
            translation.activate(code)
            self.make_i18n(code, out)

    def get_apps(self, app_labels=None, roots=None) -> list[AppConfig]:
        """
        Retrieve and filter installed applications.

        :param app_labels: Optional application labels.
        :param roots: Optional application directory filters.
        :return: Matching application configurations.
        """
        result = list(apps.get_app_configs())

        if app_labels:
            result = [app for app in result if app.label in app_labels]

        if roots:
            roots = [path.resolve() for path in roots]
            result = [
                app
                for app in result
                if any(path == Path(app.path).resolve() or path in Path(app.path).resolve().parents for path in roots)
            ]

        return result

    def make_i18n(self, locale: str, out: Path):
        """
        Generate a translation file for a locale.

        :param locale: Locale code.
        :param out: Output directory.
        """
        labels = self.get_labels(locale)
        path = out / f"django.{locale}.json"

        path.parent.mkdir(exist_ok=True, parents=True)
        path.write_text(json.dumps(labels, ensure_ascii=False), encoding="utf-8")

        logger.info("%d translations written to `%s`", len(labels), path)

    def get_labels(self, locale: str) -> dict[str, str]:
        """
        Collect translations for all selected applications.

        :param locale: Locale code.
        :return: Translation dictionary.
        """
        output = {}

        with translation.override(locale):
            logger.info("Getting translations for `%s`...", locale)

            for app_config in self.apps:
                logger.info("Getting labels for `%s`", app_config.name)
                self.get_app_labels(app_config, output)

        return output

    def get_app_labels(self, app_config: AppConfig, output: dict[str, str]):
        """
        Collect translations for an application.

        :param app_config: Application configuration.
        :param output: Translation dictionary to populate.
        """
        if app_config.verbose_name:
            output[f"apps.{app_config.label}"] = escape(str(app_config.verbose_name).replace("_", " "))

        # Collect all loaded enums belonging to this application.
        app_enums = {
            enum_class
            for enum_class in get_enum_subclasses(Enum)
            if apps.get_containing_app_config(enum_class.__module__) == app_config
        }

        # Global enums use the application namespace.
        for enum_class in app_enums:
            if any(is_model_enum(enum_class, model) for model in app_config.get_models()):
                continue

            enum_name = get_enum_name(enum_class, app_config)

            self.get_enum_labels(
                f"{app_config.label}.enums.{enum_name}",
                enum_class,
                output,
            )

        # Collect model translations.
        for model in app_config.get_models():
            model_name = model._meta.object_name
            prefix = f"{app_config.label}.models.{model_name}"

            output[prefix] = (
                f"{escape(str(model._meta.verbose_name).capitalize())} | "
                f"{escape(str(model._meta.verbose_name_plural).capitalize())}"
            )

            self.get_fields_labels(
                model,
                f"{prefix}.fields.",
                output,
            )

            # Model enums are deliberately not deduplicated across models.
            for enum_class in get_model_enums(model):
                enum_name = get_enum_name(enum_class, app_config, model)

                self.get_enum_labels(
                    f"{prefix}.enums.{enum_name}",
                    enum_class,
                    output,
                )

    def get_fields_labels(
        self,
        model: type[models.Model],
        prefix: str,
        output: dict[str, str],
    ):
        """
        Collect translations for model fields.

        :param model: Django model class.
        :param prefix: Translation namespace prefix.
        :param output: Translation dictionary to populate.
        """
        meta = model._meta

        for field in meta.fields + meta.many_to_many:
            if isinstance(field, models.ManyToOneRel):
                continue

            output[prefix + field.name] = escape(str(field.verbose_name).capitalize())

            if field.help_text:
                output[f"{prefix}{field.name}.help"] = escape(str(field.help_text).capitalize())

    def get_enum_labels(
        self,
        name: str,
        enum_class: type[Enum],
        output: dict[str, str],
    ):
        """
        Collect translations for an enum.

        Supports Django Choices as well as standard Python enums.

        :param name: Enum translation namespace.
        :param enum_class: Enum class.
        :param output: Translation dictionary to populate.
        """
        for member in enum_class:
            label = getattr(
                member,
                "label",
                member.name.replace("_", " ").capitalize(),
            )
            label = escape(str(label).capitalize())

            output[f"{name}.{member.name}"] = label
            output[f"{name}._.{member.name}"] = label
            output[f"{name}.{member.value}"] = label
            output[f"{name}._.{member.value}"] = label
