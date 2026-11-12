/**
 * Returns the value of a browser cookie.
 *
 * @param name Cookie name.
 * @returns Decoded cookie value, or null if the cookie does not exist.
 */
export function getCookie(name: string): string | null {
    if (typeof document === 'undefined') {
        return null;
    }

    const prefix = `${name}=`;
    const cookie = document.cookie
        .split(';')
        .map(value => value.trim())
        .find(value => value.startsWith(prefix));

    if (cookie === undefined) {
        return null;
    }

    const value = cookie.slice(prefix.length);

    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}
