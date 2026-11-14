import pytest

from tests.django_project.testapp.models import Value
from ox_watt.django import models


class SaveHookQuerySet(models.SaveHookQuerySet):
    pass


class SaveHook(models.SaveHook, Value):
    on_save_call = None
    on_asave_call = None

    objects = SaveHookQuerySet.as_manager()

    class Meta:
        proxy = True
        app_label = "ox_test"

    def on_save(self, fields):
        self.on_save_call = fields or []

    async def on_asave(self, fields):
        self.on_asave_call = fields or []


@pytest.fixture
def save_hook(db):
    return SaveHook(name="name", value=0)


@pytest.fixture
def save_hooks(db):
    return [SaveHook(name=f"name-{i}", value=i) for i in range(0, 3)]


class TestSaveHookQuerySet:
    def test_bulk_create(self, save_hooks):
        SaveHook.objects.bulk_create(save_hooks)
        assert all(obj.on_save_call == [] for obj in save_hooks)

    @pytest.mark.asyncio
    async def test_abulk_create(self, save_hooks):
        await SaveHook.objects.abulk_create(save_hooks)
        assert all(obj.on_asave_call == [] for obj in save_hooks)

    def test_bulk_update(self, save_hooks):
        SaveHook.objects.bulk_create(save_hooks)
        for obj in save_hooks:
            obj.on_save_call = None

        SaveHook.objects.bulk_update(save_hooks, ["name"])
        assert all(obj.on_save_call == ["name"] for obj in save_hooks)

    @pytest.mark.asyncio
    async def test_abulk_update(self, save_hooks):
        await SaveHook.objects.abulk_create(save_hooks)
        for obj in save_hooks:
            obj.on_asave_call = None

        await SaveHook.objects.abulk_update(save_hooks, ["name"])
        assert all(obj.on_asave_call == ["name"] for obj in save_hooks)


class TestSaveHook:
    def test_save(self, save_hook):
        save_hook.save()
        assert save_hook.on_save_call == []

    @pytest.mark.asyncio
    async def test_asave(self, save_hook):
        await save_hook.asave()
        assert save_hook.on_save_call == []
