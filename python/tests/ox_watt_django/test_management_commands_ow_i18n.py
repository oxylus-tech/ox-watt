
"""Tests for the Django translation generator."""

import json
from enum import Enum
from pathlib import Path

import pytest

from django.apps import apps
from django.core.management import call_command
from django.test import override_settings

from ox_watt.django.management.commands.ow_i18n import (
    Command,
    escape,
    get_enum_name,
    get_enum_subclasses,
    get_model_enums,
    is_model_enum,
)


@pytest.fixture
def testapp():
    """Return the test application configuration."""
    return apps.get_app_config("testapp")


@pytest.fixture
def command(testapp):
    """Return a command configured for the test application."""
    instance = Command()
    instance.apps = [testapp]
    return instance


@pytest.fixture
def output_directory(tmp_path):
    """Return a temporary output directory."""
    return tmp_path


@pytest.fixture
def generated_translations(command, output_directory):
    """Generate translations for the test application."""
    command.make_i18n("en", output_directory)

    path = output_directory / "django.en.json"

    with path.open(encoding="utf-8") as file:
        return json.load(file)


class TestEscape:
    """Test Vue I18n string escaping."""

    @pytest.mark.parametrize(
        ("value", "expected"),
        [
            ("Hello", "Hello"),
            ("Hello world", "Hello world"),
            ("$value", "{'$'}value"),
            ("@value", "{'@'}value"),
            ("a|b", "a{'|'}b"),
            ("{value}", "{'{'}value{'}'}"),
            ("$@|{}", "{'$'}{'@'}{'|'}{'{'}{'}'}"),
            ("", ""),
        ],
    )
    def test_escape(self, value, expected):
        assert escape(value) == expected


class TestEnumDiscovery:
    """Test enum discovery helpers."""

    def test_get_enum_subclasses_discovers_nested_enums(self, testapp):
        from tests.django_project.testapp.models import Value

        enums = get_enum_subclasses(Enum)

        assert Value.Status in enums

    def test_get_model_enums_discovers_nested_enums(self, testapp):
        from tests.django_project.testapp.models import Value

        enums = get_model_enums(Value)

        assert Value.Status in enums

    def test_get_model_enums_discovers_assigned_enums(self, testapp):
        from tests.django_project.testapp.models import (
            SerializerTestModel,
            SharedStatus,
            Value,
        )

        assert SharedStatus in get_model_enums(Value)
        assert SharedStatus in get_model_enums(SerializerTestModel)

    def test_get_model_enums_discovers_inherited_enums(self, testapp):
        from tests.django_project.testapp.models import TreeNode

        enums = get_model_enums(TreeNode)

        assert isinstance(enums, set)

    def test_is_model_enum(self, testapp):
        from tests.django_project.testapp.models import Value

        assert is_model_enum(Value.Status, Value)

    def test_is_not_model_enum(self, testapp):
        from tests.django_project.testapp.models import SharedStatus, Value

        assert not is_model_enum(SharedStatus, Value)

    def test_get_enum_name_for_nested_enum(self, testapp):
        from tests.django_project.testapp.models import Value

        assert get_enum_name(Value.Status, testapp, Value) == "Status"

    def test_get_enum_name_for_global_enum(self, testapp):
        from tests.django_project.testapp.models import SharedStatus

        assert get_enum_name(SharedStatus, testapp) == "SharedStatus"


class TestGetApps:
    """Test application discovery and filtering."""

    def test_returns_installed_applications(self):
        command = Command()

        result = command.get_apps()

        assert isinstance(result, list)
        assert all(hasattr(app, "label") for app in result)

    def test_filters_by_application_label(self, testapp):
        command = Command()

        result = command.get_apps(["testapp"])

        assert result == [testapp]

    def test_returns_empty_list_for_unknown_application(self):
        command = Command()

        result = command.get_apps(["unknown_application"])

        assert result == []

    def test_filters_by_application_root(self, testapp):
        command = Command()

        result = command.get_apps(roots=[Path(testapp.path)])

        assert testapp in result

    def test_excludes_applications_outside_root(self, testapp):
        command = Command()

        root = Path(testapp.path) / "nonexistent"

        result = command.get_apps(roots=[root])

        assert testapp not in result


class TestGetLabels:
    """Test translation collection."""

    def test_generates_application_label(self, generated_translations):
        from tests.django_project.testapp.apps import AppConfig

        assert "apps.testapp" in generated_translations

    def test_generates_model_labels(self, generated_translations):
        labels = generated_translations

        assert labels["testapp.models.Value"] == "Value | Values"
        assert "testapp.models.TreeNode" in labels

    def test_generates_field_labels(self, generated_translations):
        labels = generated_translations

        assert labels["testapp.models.Value.fields.name"] == "Name"
        assert labels["testapp.models.Value.fields.value"] == "Value"
        assert labels["testapp.models.Value.fields.status"] == "Status"

    def test_generates_field_help_texts(self, generated_translations):
        labels = generated_translations

        assert (
            labels["testapp.models.Value.fields.name.help"]
            == "Name of the value."
        )

    def test_does_not_generate_empty_help_texts(self, generated_translations):
        labels = generated_translations

        assert "testapp.models.Value.fields.value.help" not in labels

    def test_generates_nested_model_enum(self, generated_translations):
        labels = generated_translations

        prefix = "testapp.models.Value.enums.Status"

        assert labels[f"{prefix}.ACTIVE"] == "Active"
        assert labels[f"{prefix}.INACTIVE"] == "Inactive"

    def test_generates_enum_member_values(self, generated_translations):
        labels = generated_translations

        prefix = "testapp.models.Value.enums.Status"

        assert labels[f"{prefix}.active"] == "Active"
        assert labels[f"{prefix}.inactive"] == "Inactive"

    def test_generates_enum_fallback_keys(self, generated_translations):
        labels = generated_translations

        prefix = "testapp.models.Value.enums.Status"

        assert labels[f"{prefix}._.ACTIVE"] == "Active"
        assert labels[f"{prefix}._.INACTIVE"] == "Inactive"
        assert labels[f"{prefix}._.active"] == "Active"

    def test_generates_global_enum(self, generated_translations):
        labels = generated_translations

        prefix = "testapp.enums.SharedStatus"

        assert labels[f"{prefix}.ENABLED"] == "Enabled"
        assert labels[f"{prefix}.DISABLED"] == "Disabled"

    def test_generates_shared_enum_for_each_model(self, generated_translations):
        labels = generated_translations

        prefixes = [
            "testapp.models.Value.enums.SharedStatus",
            "testapp.models.SerializerTestModel.enums.SharedStatus",
        ]
        for prefix in prefixes:
            assert labels[f"{prefix}.ENABLED"] == "Enabled"
            assert labels[f"{prefix}.DISABLED"] == "Disabled"

    def test_does_not_duplicate_nested_enum_in_app_namespace(
        self,
        generated_translations,
    ):
        labels = generated_translations

        assert "testapp.enums.Status.ACTIVE" not in labels

    def test_generates_model_fields_inherited_from_parent(
        self,
        generated_translations,
    ):
        labels = generated_translations

        assert "testapp.models.TreeNode" in labels


class TestMakeI18n:
    """Test translation file generation."""

    def test_creates_output_directory(self, command, tmp_path):
        output = tmp_path / "locales"

        command.make_i18n("en", output)

        assert output.is_dir()

    def test_creates_locale_file(self, command, output_directory):
        command.make_i18n("en", output_directory)

        assert (output_directory / "django.en.json").is_file()

    def test_writes_valid_json(self, command, output_directory):
        command.make_i18n("en", output_directory)

        path = output_directory / "django.en.json"

        with path.open(encoding="utf-8") as file:
            result = json.load(file)

        assert isinstance(result, dict)

    def test_preserves_unicode(self, command, output_directory):
        command.make_i18n("en", output_directory)

        path = output_directory / "django.en.json"
        content = path.read_text(encoding="utf-8")

        assert "Value" in content


class TestCommand:
    """Test the management command interface."""

    @override_settings(
        LANGUAGES=(
            ("en", "English"),
            ("fr", "French"),
        ),
    )
    def test_generates_all_configured_locales(self, output_directory):
        call_command(
            "ow_i18n",
            "testapp",
            out=output_directory,
            verbosity=0,
        )

        assert (output_directory / "django.en.json").is_file()
        assert (output_directory / "django.fr.json").is_file()

    def test_generates_only_requested_locale(self, output_directory):
        call_command(
            "ow_i18n",
            "testapp",
            locale=["en"],
            out=output_directory,
            verbosity=0,
        )

        assert (output_directory / "django.en.json").is_file()
        assert not (output_directory / "django.fr.json").exists()

    def test_filters_applications(self, output_directory):
        call_command(
            "ow_i18n",
            "testapp",
            locale=["en"],
            out=output_directory,
            verbosity=0,
        )

        path = output_directory / "django.en.json"

        with path.open(encoding="utf-8") as file:
            labels = json.load(file)

        assert "testapp.models.Value" in labels

