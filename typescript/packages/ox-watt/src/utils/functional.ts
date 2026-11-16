
/** Return true if input object is an iterable (exclude strings). **/
export function isIterable<TValue>(value: TValue): value is Extract<TValue, Iterable<unknown>> {
    return (
        typeof value !== "string"
        && typeof (value as {[Symbol.iterator]?: unknown})[Symbol.iterator] === "function"
    )
}

/**
 * Resolves and caches inherited static values.
 *
 * Object values are merged from parent to child, with child properties
 * overriding parent properties. Array values are concatenated from parent
 * to child.
 *
 * @typeParam T The type of the resolved values.
 * @param target Class constructor whose values are being resolved.
 * @param cacheKey Static property used to cache the resolved values.
 * @param parentGetter Method used to retrieve the parent's resolved values.
 * @param ownValues Values declared directly on the current class.
 * @returns The cached, resolved values.
 */
export function resolveStaticValues<T>(
    target: Record<string, any>,
    cacheKey: string,
    parentGetter: string | ((parent: any) => T[]),
    ownValues: T[] | undefined,
): T[];

/**
 * Resolves and caches inherited static values.
 *
 * Object values are merged from parent to child, with child properties
 * overriding parent properties.
 *
 * @typeParam T The type of the resolved values.
 * @param target Class constructor whose values are being resolved.
 * @param cacheKey Static property used to cache the resolved values.
 * @param parentGetter Method used to retrieve the parent's resolved values.
 * @param ownValues Values declared directly on the current class.
 * @returns The cached, resolved values.
 */
export function resolveStaticValues<T extends Record<string, unknown>>(
    target: Record<string, any>,
    cacheKey: string,
    parentGetter: string | ((parent: any) => T),
    ownValues: T | undefined,
): T;
/**
 * Resolves and caches inherited static values.
 *
 * Object values are merged from parent to child, with child properties
 * overriding parent properties. Array values are concatenated from parent
 * to child.
 *
 * @typeParam T The type of the resolved values.
 * @param target Class constructor whose values are being resolved.
 * @param cacheKey Static property used to cache the resolved values.
 * @param parentGetter Method used to retrieve the parent's resolved values.
 * @param ownValues Values declared directly on the current class.
 * @returns The cached, resolved values.
 */
export function resolveStaticValues<T extends Record<string, unknown> | unknown[]>(
    target: Record<string, any>,
    cacheKey: string,
    parentGetter: string | ((parent: any) => T),
    ownValues: T,
): T {
    if (!Object.prototype.hasOwnProperty.call(target, cacheKey)) {
        const parent = Object.getPrototypeOf(target);

        const inheritedValues = parent === Function.prototype
            ? (Array.isArray(ownValues) ? [] : {})
            : typeof parentGetter === "string"
                ? parent[parentGetter]()
                : parentGetter(parent);

        const resolvedValues = Array.isArray(ownValues)
            ? [...(inheritedValues ?? []), ...(ownValues ?? [])]
            : { ...(inheritedValues ?? {}), ...(ownValues  ?? {})};

        Object.defineProperty(target, cacheKey, {
            value: resolvedValues,
            writable: false,
            configurable: true,
        });
    }

    return target[cacheKey] as T;
}
