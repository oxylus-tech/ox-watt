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

