// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';

import { getCookie } from '../../src/utils/browser';

/**
 * Removes all cookies visible from the current document.
 */
function clearCookies(): void {
    document.cookie.split(';').forEach(cookie => {
        const name = cookie.trim().split('=')[0];

        if (name) {
            document.cookie = `${name}=; Max-Age=0; path=/`;
        }
    });
}

describe('getCookie', () => {
    // Note: a bug in happy-dom empeach to reuse the same name for cookies

    it('returns null when the cookie does not exist', () => {
        expect(getCookie('language')).toBeNull();
    });

    it('returns the cookie value', () => {
        document.cookie = 'language1=fr';

        expect(getCookie('language1')).toBe('fr');
    });

    it('decodes the cookie value', () => {
        document.cookie = 'language2=fr-BE';

        expect(getCookie('language2')).toBe('fr-BE');
    });

    it('supports cookie names containing special characters', () => {
        document.cookie = 'preferred-language=fr';

        expect(getCookie('preferred-language')).toBe('fr');
    });

    it('does not match a cookie with a similar name', () => {
        document.cookie = 'my_language=fr';

        expect(getCookie('language')).toBeNull();
    });

    it('returns an empty value for an existing empty cookie', () => {
        document.cookie = 'language-5=';

        expect(getCookie('language-5')).toBe('');
    });
});
