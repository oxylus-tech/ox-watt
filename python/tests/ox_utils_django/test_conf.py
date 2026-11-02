import pytest

from ox_watt.django import conf


class MySettings(conf.Settings):
    ALLOWED_VALUES = [1, 2, 3]
    OTHER_VALUE = 5

    def get_value(self):
        return self.OTHER_VALUE


class Source:
    SETTINGS = {"ALLOWED_VALUES": [4, 5, 6]}


@pytest.fixture
def settings():
    return MySettings("SETTINGS", Source)


class TestSettings:
    def test_get_overriden_value(self, settings):
        assert settings.ALLOWED_VALUES == Source.SETTINGS["ALLOWED_VALUES"]

    def test_get_not_overriden_value(self, settings):
        assert settings.OTHER_VALUE == MySettings.OTHER_VALUE
