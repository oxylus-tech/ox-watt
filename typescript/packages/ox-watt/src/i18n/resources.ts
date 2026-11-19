import type { AppLocaleLoaders, LocaleResource } from './types';

/**
 * Extracts the locale identifier from a resource filename.
 *
 * Only filenames ending with `.[LANG].json` are recognized.
 * The locale identifier may contain hyphens, for example `fr-BE`.
 *
 * @param path - Resource path or filename.
 * @returns The locale identifier, or null if the filename does not match.
 */
export function getLocaleFromPath(path: string): string | null {
    const filename = path.split(/[\\/]/).pop() ?? '';
    const match = filename.match(/\.([^.]+)\.json$/);

    return match?.[1] ?? null;
}

/**
 * Returns static locale resources matching the requested locale.
 *
 * @param loaders - Registered groups of static locale loaders.
 * @param locale - Locale to discover.
 * @returns Matching resources with unique identifiers.
 */
export function getStaticLocaleResources(
    loaders: AppLocaleLoaders[],
    locale: string,
): LocaleResource[] {
    const resources: LocaleResource[] = [];

    loaders.forEach((group, groupIndex) => {
        for (const [path, loader] of Object.entries(group)) {
            if (getLocaleFromPath(path) !== locale) {
                continue;
            }

            resources.push({
                key: `static:${groupIndex}:${path}`,
                load: loader,
            });
        }
    });

    return resources;
}

/**
 * Returns DOM locale resources matching the requested locale.
 *
 * Resources are declared using `script[data-locale]`.
 * They can either reference an external JSON file through `src`
 * or contain JSON directly.
 *
 * @param locale - Locale to discover.
 * @returns Matching DOM resources.
 */
export function getDomLocaleResources(locale: string): LocaleResource[] {
    if (typeof document === 'undefined') {
        return [];
    }

    const scripts = document.querySelectorAll<HTMLScriptElement>(
        'script[data-locale]',
    );

    const resources: LocaleResource[] = [];

    scripts.forEach((script, index) => {
        if (script.dataset.locale !== locale) {
            return;
        }

        const src = script.getAttribute('src');

        if (src) {
            const url = script.src;

            resources.push({
                key: `dom:url:${url}`,
                load: async () => {
                    const response = await fetch(url);

                    if (!response.ok) {
                        throw new Error(
                            `Failed to load locale resource "${url}": ` +
                            `${response.status} ${response.statusText}`,
                        );
                    }

                    return await response.json() as Record<string, any>;
                },
            });

            return;
        }

        resources.push({
            key: `dom:inline:${getInlineResourceId(script, index)}`,
            load: async () => {
                const content = script.textContent?.trim();

                if (!content) {
                    throw new Error(
                        `Empty inline locale resource for locale "${locale}".`,
                    );
                }

                return JSON.parse(content) as Record<string, any>;
            },
        });
    });

    return resources;
}

/**
 * Assigns a stable identifier to an inline script element.
 *
 * WeakMap ensures that identifiers do not keep removed DOM elements alive.
 *
 * @param script - Inline locale script element.
 * @param index - Current position in the DOM query result.
 * @returns Stable identifier for the script element.
 */
const inlineResourceIds = new WeakMap<HTMLScriptElement, number>();
let nextInlineResourceId = 0;

function getInlineResourceId(
    script: HTMLScriptElement,
    index: number,
): number {
    let id = inlineResourceIds.get(script);

    if (id === undefined) {
        id = nextInlineResourceId++;
        inlineResourceIds.set(script, id);
    }

    return id;
}
