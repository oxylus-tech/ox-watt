import pytest

from django.core.exceptions import ValidationError
from django.db import models
from rest_framework import serializers

from tests.django_project.testapp.apps import AppConfig
from ox_watt.django.models.cls import ClassField, ClassPath
from ox_watt.django.models.drf import SerializerField


# --- ClassField & ClassPath
class ModelTest(models.Model):
    handler = ClassField()

    class Meta:
        app_label = "ox_test"


@pytest.fixture
def class_path():
    return ClassPath(AppConfig)


@pytest.fixture
def class_field():
    return ClassField()


@pytest.fixture
def model(class_path):
    return ModelTest(handler=class_path)


class TestClassPath:
    def test___init___with_class(self):
        cpath = ClassPath(AppConfig)
        assert cpath.path == "tests.django_project.testapp.apps.AppConfig"

    def test___init___with_class_str(self):
        cpath = ClassPath("tests.django_project.testapp.apps.AppConfig")
        assert cpath.cls == AppConfig

    def test___str__(self, class_path):
        assert str(class_path) == class_path.path

    def test___repr__(self, class_path):
        assert repr(class_path) == f"<ClassPath: {class_path.path}>"

    def test_cls(self, class_path):
        assert class_path.cls == AppConfig

    def test___eq__(self, class_path):
        assert class_path == ClassPath("tests.django_project.testapp.apps.AppConfig")
        assert class_path == "tests.django_project.testapp.apps.AppConfig"
        assert class_path == AppConfig
        assert class_path != ClassPath("ox_watt.django.models.ClassField")
        assert class_path != "ox_watt.django.models.ClassField"
        assert class_path != ClassPath


class TestClassField:
    def test_from_db_value(self, class_field, class_path):
        assert class_field.from_db_value("tests.django_project.testapp.apps.AppConfig") == class_path

    def test_to_python(self, class_field, class_path):
        assert class_field.to_python("tests.django_project.testapp.apps.AppConfig") == class_path

    def test_get_prep_value(self, class_field, class_path):
        assert class_field.get_prep_value(class_path) == "tests.django_project.testapp.apps.AppConfig"
        assert class_field.get_prep_value(AppConfig) == "tests.django_project.testapp.apps.AppConfig"

    def test_field_usage(self, model, class_path):
        assert model.handler == AppConfig
        assert model.handler.path == "tests.django_project.testapp.apps.AppConfig"
        assert model.handler.cls == AppConfig

        model.handler = "ox_watt.django.models.cls.ClassField"
        assert model.handler == ClassField
        assert model.handler.cls == ClassField
        assert str(model.handler) == "ox_watt.django.models.cls.ClassField"


# ---- SerializerField
class Serializer(serializers.Serializer):
    name = serializers.CharField()
    value = serializers.IntegerField()


@pytest.fixture
def serializer_field():
    return SerializerField(serializer_class=Serializer)


class TestSerializerField:
    def test___init__not_subclass_of_serializer_raises_type_error(self):
        with pytest.raises(TypeError):
            SerializerField(serializer_class=TestSerializerField)

    def test_clean(self, serializer_field):
        data = {"name": "Some Name", "value": 13}
        assert serializer_field.clean(data, None) == data

    def test_clean_raises_validation_error(self, serializer_field):
        with pytest.raises(ValidationError):
            serializer_field.clean({"name": 123, "value": "chile"}, None)
