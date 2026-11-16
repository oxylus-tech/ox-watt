import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { AppLocaleLoaders } from '@/i18n';

describe('I18nManager', () => {
    let I18nManager: typeof import('../../src/i18n/manager').I18nManager;
    let i18n: typeof import('../../src/i18n/manager').i18n;

    beforeEach(async () => {
        vi.resetModules();

        const module = await import('../../src/i18n/manager');

        I18nManager = module.I18nManager;
        i18n = module.i18n;
    });

    it('requires initialization before accessing the plugin', () => {
        const manager = new I18nManager();

        expect(() => manager.plugin).toThrow();
    });

    it('requires initialization before accessing the composer', () => {
        const manager = new I18nManager();

        expect(() => manager.composer).toThrow();
    });

    it('requires initialization before accessing the locale', () => {
        const manager = new I18nManager();

        expect(() => manager.locale).toThrow();
    });

    it('registers locale loader groups', () => {
        const manager = new I18nManager();

        const loaders: AppLocaleLoaders = {
            './locales/messages.en.json': async () => ({
                greeting: 'Hello',
            }),
        };

        expect(() => manager.register([loaders])).not.toThrow();
    });

    it('ignores duplicate loader groups', async () => {
        const manager = new I18nManager();

        const loader = vi.fn(async () => ({
            greeting: 'Hello',
        }));

        const loaders: AppLocaleLoaders = {
            './locales/messages.en.json': loader,
        };

        manager.register([loaders, loaders]);

        await manager.initialize({
            fallbackLocale: 'en',
            locale: 'en',
        });

        expect(loader).toHaveBeenCalledTimes(1);
    });

    it('initializes with the explicitly provided locale', async () => {
        const manager = new I18nManager();

        const instance = await manager.initialize({
            fallbackLocale: 'en',
            locale: 'fr',
        });

        expect(instance.global.locale.value).toBe('fr');
        expect(manager.locale).toBe('fr');
    });

    it('uses the fallback locale when no locale is provided', async () => {
        const manager = new I18nManager();

        await manager.initialize({
            fallbackLocale: 'en',
        });

        expect(manager.locale).toBe('en');
    });

    it('loads fallback and initial locale resources', async () => {
        const manager = new I18nManager();

        const englishLoader = vi.fn(async () => ({
            greeting: 'Hello',
        }));

        const frenchLoader = vi.fn(async () => ({
            greeting: 'Bonjour',
        }));

        manager.register([{
            './locales/messages.en.json': englishLoader,
            './locales/messages.fr.json': frenchLoader,
        }]);

        await manager.initialize({
            fallbackLocale: 'en',
            locale: 'fr',
        });

        expect(englishLoader).toHaveBeenCalledTimes(1);
        expect(frenchLoader).toHaveBeenCalledTimes(1);
        expect(manager.locale).toBe('fr');
    });

    it('loads fallback and initial locale concurrently', async () => {
        const manager = new I18nManager();

        let resolveEnglish!: (messages: Record<string, unknown>) => void;
        let resolveFrench!: (messages: Record<string, unknown>) => void;

        const englishLoader = vi.fn(() => new Promise<Record<string, unknown>>(resolve => {
            resolveEnglish = resolve;
        }));

        const frenchLoader = vi.fn(() => new Promise<Record<string, unknown>>(resolve => {
            resolveFrench = resolve;
        }));

        manager.register([{
            './locales/messages.en.json': englishLoader,
            './locales/messages.fr.json': frenchLoader,
        }]);

        const initialization = manager.initialize({
            fallbackLocale: 'en',
            locale: 'fr',
        });

        await vi.waitFor(() => {
            expect(englishLoader).toHaveBeenCalledTimes(1);
            expect(frenchLoader).toHaveBeenCalledTimes(1);
        });

        resolveEnglish({ greeting: 'Hello' });
        resolveFrench({ greeting: 'Bonjour' });

        await initialization;

        expect(manager.locale).toBe('fr');
    });

    it('exposes the Vue I18n plugin', async () => {
        const manager = new I18nManager();

        const instance = await manager.initialize({
            fallbackLocale: 'en',
        });

        expect(manager.plugin).toBe(instance);
    });

    it('does not allow initialization more than once', async () => {
        const manager = new I18nManager();

        await manager.initialize({
            fallbackLocale: 'en',
        });

        await expect(manager.initialize({
            fallbackLocale: 'en',
        })).rejects.toThrow();
    });

    it('does not allow registering loaders after initialization', async () => {
        const manager = new I18nManager();

        await manager.initialize({
            fallbackLocale: 'en',
        });

        expect(() => manager.register([{}])).toThrow();
    });

    it('changes the active locale', async () => {
        const manager = new I18nManager();

        manager.register([{
            './locales/messages.en.json': async () => ({
                greeting: 'Hello',
            }),
            './locales/messages.fr.json': async () => ({
                greeting: 'Bonjour',
            }),
        }]);

        await manager.initialize({
            fallbackLocale: 'en',
            locale: 'en',
        });

        await manager.setLocale('fr');

        expect(manager.locale).toBe('fr');
    });

    it('loads resources before changing the active locale', async () => {
        const manager = new I18nManager();

        let resolveFrench!: (messages: Record<string, unknown>) => void;

        const frenchLoader = vi.fn(() => new Promise<Record<string, unknown>>(resolve => {
            resolveFrench = resolve;
        }));

        manager.register([{
            './locales/messages.en.json': async () => ({
                greeting: 'Hello',
            }),
            './locales/messages.fr.json': frenchLoader,
        }]);

        await manager.initialize({
            fallbackLocale: 'en',
            locale: 'en',
        });

        const change = manager.setLocale('fr');

        await vi.waitFor(() => {
            expect(frenchLoader).toHaveBeenCalledOnce();
        });

        expect(manager.locale).toBe('en');

        resolveFrench({
            greeting: 'Bonjour',
        });

        await change;

        expect(manager.locale).toBe('fr');
    });

    it('does not change the locale when resource loading fails', async () => {
        const manager = new I18nManager();

        manager.register([{
            './locales/messages.en.json': async () => ({
                greeting: 'Hello',
            }),
            './locales/messages.fr.json': async () => {
                throw new Error('Unable to load translations');
            },
        }]);

        await manager.initialize({
            fallbackLocale: 'en',
            locale: 'en',
        });

        await expect(manager.setLocale('fr')).rejects.toThrow(
            'Unable to load translations',
        );

        expect(manager.locale).toBe('en');
    });

    it('does not change the browser cookie when changing locale', async () => {
        const manager = new I18nManager();

        manager.register([{
            './locales/messages.en.json': async () => ({
                greeting: 'Hello',
            }),
            './locales/messages.fr.json': async () => ({
                greeting: 'Bonjour',
            }),
        }]);

        await manager.initialize({
            fallbackLocale: 'en',
            locale: 'en',
        });

        const originalCookie = document.cookie;

        await manager.setLocale('fr');

        expect(document.cookie).toBe(originalCookie);
    });

    it('shares concurrent requests for the same locale', async () => {
        const manager = new I18nManager();

        const frenchLoader = vi.fn(async () => ({
            greeting: 'Bonjour',
        }));

        manager.register([{
            './locales/messages.en.json': async () => ({
                greeting: 'Hello',
            }),
            './locales/messages.fr.json': frenchLoader,
        }]);

        await manager.initialize({
            fallbackLocale: 'en',
            locale: 'en',
        });

        await Promise.all([
            manager.setLocale('fr'),
            manager.setLocale('fr'),
        ]);

        expect(frenchLoader).toHaveBeenCalledTimes(1);
        expect(manager.locale).toBe('fr');
    });

    it('exposes the t function through the singleton', async () => {
        i18n.register([{
            './locales/messages.en.json': async () => ({
                greeting: 'Hello',
            }),
        }]);

        await i18n.initialize({
            fallbackLocale: 'en',
            locale: 'en',
        });

        const { t } = await import('../../src/i18n/manager');

        expect(t('greeting')).toBe('Hello');
    });

    it('exposes the te function through the singleton', async () => {
        i18n.register([{
            './locales/messages.en.json': async () => ({
                greeting: 'Hello',
            }),
        }]);

        await i18n.initialize({
            fallbackLocale: 'en',
            locale: 'en',
        });

        const { te } = await import('../../src/i18n/manager');

        expect(te('greeting')).toBe(true);
        expect(te('unknown')).toBe(false);
    });
});
