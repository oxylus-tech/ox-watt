// @vitest-environment happy-dom

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getDomLocaleResources, getStaticLocaleResources, } from '@/i18n/resources';
import type { AppLocaleLoaders, } from '@/i18n';

describe('getStaticLocaleResources', () => {
    const englishMessages = {
        greeting: 'Hello',
    };

    const frenchMessages = {
        greeting: 'Bonjour',
    };

    const loaders: AppLocaleLoaders = {
        './locales/messages.en.json': vi.fn(async () => englishMessages),
        './locales/messages.fr.json': vi.fn(async () => frenchMessages),
        './locales/models.nl.json': vi.fn(async () => ({
            greeting: 'Hallo',
        })),
    };

    it('returns resources matching the requested locale', () => {
        const resources = getStaticLocaleResources([loaders], 'fr');

        expect(resources).toHaveLength(1);
    });

    it('does not return resources from other locales', () => {
        const resources = getStaticLocaleResources([loaders], 'fr');

        expect(resources).toHaveLength(1);
    });

    it('loads the matching resource', async () => {
        const resources = getStaticLocaleResources([loaders], 'en');

        await expect(resources[0].load()).resolves.toEqual(englishMessages);
    });

    it('returns resources from all registered loader groups', () => {
        const secondGroup: AppLocaleLoaders = {
            './locales/contacts.en.json': vi.fn(async () => ({
                contacts: {
                    title: 'Contacts',
                },
            })),
        };

        const resources = getStaticLocaleResources(
            [loaders, secondGroup],
            'en',
        );

        expect(resources).toHaveLength(2);
    });

    it('returns no resources when the locale is unavailable', () => {
        const resources = getStaticLocaleResources([loaders], 'es');

        expect(resources).toHaveLength(0);
    });
});

describe('getDomLocaleResources', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('returns resources matching the requested locale', () => {
        document.body.innerHTML = `
            <script type="application/json" data-locale="en">
                {"greeting": "Hello"}
            </script>
            <script type="application/json" data-locale="fr">
                {"greeting": "Bonjour"}
            </script>
        `;

        const resources = getDomLocaleResources('fr');

        expect(resources).toHaveLength(1);
    });

    it('loads inline JSON resources', async () => {
        document.body.innerHTML = `
            <script type="application/json" data-locale="fr">
                {"greeting": "Bonjour"}
            </script>
        `;

        const resources = getDomLocaleResources('fr');

        await expect(resources[0].load()).resolves.toEqual({
            greeting: 'Bonjour',
        });
    });

    it('returns all matching DOM resources', () => {
        document.body.innerHTML = `
            <script type="application/json" data-locale="fr">
                {"greeting": "Bonjour"}
            </script>
            <script type="application/json" data-locale="fr">
                {"farewell": "Au revoir"}
            </script>
            <script type="application/json" data-locale="en">
                {"greeting": "Hello"}
            </script>
        `;

        const resources = getDomLocaleResources('fr');

        expect(resources).toHaveLength(2);
    });

    it('returns no resources when no matching element exists', () => {
        document.body.innerHTML = `
            <script type="application/json" data-locale="en">
                {"greeting": "Hello"}
            </script>
        `;

        expect(getDomLocaleResources('fr')).toHaveLength(0);
    });

    it('fetches external JSON resources', async () => {
        document.body.innerHTML = `
            <script
                type="application/json"
                data-locale="fr"
                src="/locales/fr.json"
            ></script>
        `;

        const fetchMock = vi.fn(async (...args: unknown[]) => ({
            ok: true,
            json: async () => ({
                greeting: 'Bonjour',
            }),
        }));

        vi.stubGlobal('fetch', fetchMock);

        const resources = getDomLocaleResources('fr');

        await expect(resources[0].load()).resolves.toEqual({
            greeting: 'Bonjour',
        });

        const requestedUrl = new URL(fetchMock.mock.calls[0][0] as string);
        expect(requestedUrl.pathname).toBe('/locales/fr.json');
    });
});
