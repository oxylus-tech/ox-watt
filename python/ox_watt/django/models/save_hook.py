from asgiref.sync import sync_to_async
from django.db import models

__all__ = ("SaveHookQuerySet", "SaveHook")


class SaveHookQuerySet(models.QuerySet):
    """
    This is the QuerySet used for :py:class:`SaveHook` model
    and sub-models.
    """

    # create/acreate are actually calling obj's save() method

    def bulk_create(self, objs, *a, **kw):
        if issubclass(self.model, SaveHook) and self.model.on_save is not SaveHook.on_save:
            objs = self._save_hook_iter(objs)
        return super().bulk_create(objs, *a, **kw)

    async def abulk_create(self, objs, *a, **kw):
        if issubclass(self.model, SaveHook) and self.model.on_asave is not SaveHook.on_asave:
            objs = [obj async for obj in self._asave_hook_iter(objs)]
        return await super().abulk_create(objs, *a, **kw)

    def bulk_update(self, objs, fields, *a, **kw):
        if issubclass(self.model, SaveHook) and self.model.on_save is not SaveHook.on_save:
            objs = self._save_hook_iter(objs, fields)
        return super().bulk_update(objs, fields, *a, **kw)

    async def abulk_update(self, objs, fields, *a, **kw):
        if issubclass(self.model, SaveHook) and self.model.on_asave is not SaveHook.on_asave:
            objs = [obj async for obj in self._asave_hook_iter(objs, fields)]
        return await super().abulk_update(objs, fields, *a, **kw)

    def _save_hook_iter(self, objs, fields: list[str] | None = None):
        for obj in objs:
            obj.on_save(fields)
            yield obj

    async def _asave_hook_iter(self, objs, fields: list[str] | None = None):
        for obj in objs:
            await obj.on_asave(fields)
            yield obj


class SaveHook(models.Model):
    """
    Provide `on_save` hook called at model saving (before commit to the
    database). The hook is called on related queryset methods too.

    When using this class, if you need to have custom queryset,
    you'll have to subclass it from :py:class:`SaveHookQuerySet`.
    """

    objects = SaveHookQuerySet.as_manager()

    class Meta:
        abstract = True

    def on_save(self, fields: list[str] | None = None):
        """Hook called when model is saved."""
        pass

    async def on_asave(self, fields: list[str] | None = None):
        """Hook called when model is saved (async)."""
        sync_to_async(self.on_save)(fields)

    def save(self, *args, **kwargs):
        if self.on_save is not SaveHook.on_save:
            self.on_save(kwargs.get("update_fields"))
        super().save(*args, **kwargs)

    async def asave(self, *args, **kwargs):
        if self.on_asave is not SaveHook.on_asave:
            await self.on_asave(kwargs.get("update_fields"))
        await super().asave(*args, **kwargs)
