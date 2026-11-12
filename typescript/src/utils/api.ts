/** Assign a baseUrl to the path **/
export function setBaseUrl(baseUrl?: string, path?: string): string|undefined {
    if(!baseUrl || path?.startsWith('http://') || path?.startsWith('https://'))
        return path
    if(!path)
        return baseUrl
    return joinUrl(baseUrl, path)
}

export function joinUrl(path: string, baseUrl: string): string {
    return `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

/**
 * Joins multiple URL path segments into a single normalized path.
 *
 * Leading slashes are preserved from the first non-empty path,
 * and a trailing slash is preserved from the last non-empty path.
 *
 * @param paths - Path segments to join. Undefined and empty segments are ignored.
 * @returns The joined path.
 */
export function joinPaths(...paths: (string | undefined)[]): string {
    const firstPath = paths.find(path => !!path);
    const lastPath = paths.filter(Boolean).at(-1);

    if (!firstPath) {
        return '';
    }

    const joinedPath = paths
        .filter(Boolean)
        .map(path => path!.replace(/^\/+|\/+$/g, ''))
        .filter(Boolean)
        .join('/');

    const prefix = firstPath.startsWith('/') ? '/' : '';
    const suffix = lastPath!.endsWith('/') ? '/' : '';

    return `${prefix}${joinedPath}${suffix}`;
}

/** Resolves a dotted path in an object. */
export function resolvePath(data: unknown, path?: string): unknown {
    if(!path)
        return data

    let value = data;

    for (const segment of path.split('.')) {
        if (value === null || typeof value !== 'object') {
            return undefined;
        }

        value = (value as Record<string, unknown>)[segment];
    }

    return value;
}
