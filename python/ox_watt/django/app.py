from django import apps


class AppConfig(apps.AppConfig):
    name = "ox_watt.django"
    label = "ox_watt"

    verbose_name = "Ox Watt"
