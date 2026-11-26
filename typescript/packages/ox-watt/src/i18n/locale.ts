import {getCookie} from '../utils'
import type { I18nOptions } from './types'

/**
 * Detects the initial application locale.
 *
 * The detection order is:
 * 1. Explicit locale.
 * 2. Language cookie.
 * 3. HTML lang attribute.
 * 4. Browser language.
 * 5. Fallback locale.
 *
 * @param fallbackLocale - Default fallback locale.
 * @param cookieName - Cookie containing the selected locale.
 * @param locale - Explicit locale override.
 * @returns Detected locale.
 */
export function detectLocale(options: I18nOptions): string {
    if (options.locale)
        return options.locale;

    const cookieLocale = options.cookieName && getCookie(options.cookieName);
    if (cookieLocale)
        return cookieLocale;

    const htmlLocale = document.documentElement.lang;
    if (htmlLocale)
        return htmlLocale;

    const browserLocale = navigator.language;
    if (browserLocale)
        return browserLocale;

    return options.fallbackLocale;
}
