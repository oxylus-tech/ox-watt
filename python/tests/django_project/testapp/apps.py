"""Application configuration for the test app."""

from django import apps


class AppConfig(apps.AppConfig):
    """Configure the test application."""

    name = "tests.django_project.testapp"
    label = "testapp"
