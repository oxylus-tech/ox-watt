
/** Return true if input object is an iterable (exclude strings). **/
export function isIterable<TValue>(value: TValue): value is Extract<TValue, Iterable<unknown>> {
    return (
        typeof value !== "string"
        && typeof (value as {[Symbol.iterator]?: unknown})[Symbol.iterator] === "function"
    )
}
