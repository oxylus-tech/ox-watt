// @vitest-environment happy-dom

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { detectLocale } from '../../src/i18n/locale';

describe('detectLocale', () => {
    beforeEach(() => {
        document.documentElement.lang = '';
    });

    it('uses the explicitly provided locale', () => {
        document.cookie = 'lang-0=nl';
        document.documentElement.lang = 'de';

        expect(detectLocale({
            locale: 'fr',
            fallbackLocale: 'en',
            cookieName: 'lang-0',
        })).toBe('fr');
    });

    it('uses the locale stored in the default cookie', () => {
        document.cookie = 'lang-1=nl';

        expect(detectLocale({
            fallbackLocale: 'en',
            cookieName: 'lang-1',
        })).toBe('nl');
    });

    it('uses a custom cookie name', () => {
        document.cookie = 'preferred_language=de';

        expect(detectLocale({
            fallbackLocale: 'en',
            cookieName: 'preferred_language',
        })).toBe('de');
    });

    it('uses the HTML lang attribute when no cookie exists', () => {
        document.documentElement.lang = 'nl';

        expect(detectLocale({
            fallbackLocale: 'en',
        })).toBe('nl');
    });

    it('uses the browser language when no other locale is available', () => {
        vi.stubGlobal('navigator', {
            language: 'de',
        });

        expect(detectLocale({
            fallbackLocale: 'en',
        })).toBe('de');
    });

    it('uses the fallback locale when no locale can be detected', () => {
        vi.stubGlobal('navigator', {
            language: '',
        });

        expect(detectLocale({
            fallbackLocale: 'en',
        })).toBe('en');
    });
});
