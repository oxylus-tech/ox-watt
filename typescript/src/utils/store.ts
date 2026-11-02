import { shallowReactive, shallowRef, unref, isRef } from 'vue';
import type {MaybeRef, ShallowRef, ShallowReactive} from 'vue'
import { isIterable } from './functional'


export type KeyExtractor<TSource, TKey> =
    (source: TSource) => (TKey | Iterable<TKey> | null | undefined);

export type KeySource<TSource, TKey> =
    keyof TSource | KeyExtractor<TSource, TKey>;

/**
 * Return a set of keys gathered from provided sources and using key.
 */
export function getKeysBy<TSource, TKey>(sources: Iterable<MaybeRef<TSource>>, key: KeySource<TSource, TKey>): Set<TKey> {
    const ids = new Set<TKey>()
    for(const source of sources) {
        const value = getKeysFrom(source, key)
        if (value == null)
            continue;

        if (
            typeof value !== "string"
            && typeof (value as {[Symbol.iterator]?: unknown})[Symbol.iterator] === "function"
        ) {
            for (const id of value as Iterable<TKey>)
                if (id != null)
                    ids.add(id);
        } else
            ids.add(value as TKey);
    }
    return ids
}


/**
 * Return a single or multiple keys retrieved from the provided source object and key
 */
export function getKeysFrom<TSource, TKey>(source: MaybeRef<TSource>, key: KeySource<TSource, TKey>): TKey|Iterable<TKey>|null|undefined {
    const raw = unref(source)
    return typeof key === "function" ? key(raw) :
           typeof key === "string" ? raw[key] as TKey : undefined
}


/** Get options passed to store's getters. */
export interface StoreGetOptions {
    /** Raise exception when object is missing. */
    exc?: boolean;
}

/**
 * A store referencing items by key.
 */
export class Store<
    TKey,
    TItem,
    TGetOptions extends StoreGetOptions = StoreGetOptions,
    TStoredItem = TItem,
> {
    protected static readonly noOverwrite: boolean = false;
    protected readonly items: Map<TKey, TStoredItem>;

    constructor(items?: Map<TKey, TItem> | null) {
        this.items = new Map<TKey, TStoredItem>();

        if (items) {
            for (const [key, value] of items)
                this.items.set(key, this.toStoredItem(value));
        }
    }

    /**
     * Convert an exposed item into its stored representation.
     */
    protected toStoredItem(item: TItem|TStoredItem): TStoredItem {
        return item as unknown as TStoredItem;
    }

    /**
     * Convert a stored item into its exposed representation.
     */
    protected fromStoredItem(item: TStoredItem|TItem|TItem|TItem): TItem {
        return item as unknown as TItem;
    }

    /**
     * Override the existing item from the store.
     * 
     * Default implementation just replace the stored item itself.
     */
    protected overrideStoredItem(key: TKey, storedItem: TStoredItem, item: TItem|TStoredItem): TStoredItem {
        const newItem = this.toStoredItem(item)
        this.items.set(key, newItem)
        return newItem
    }

    /**
     * Return the raw stored object.
     */
    get(key: TKey, options?: TGetOptions): TStoredItem | undefined {
        let item = this.items.get(key);

        if (item === undefined) {
            if (options?.exc)
                throw new Error(`Item "${key}" not found in repository.`);

            const defaultItem = this.getDefault(key);

            if (defaultItem !== undefined) {
                item = this.toStoredItem(defaultItem);
                this.items.set(key, item);
            }
        }

        return item;
    }

    /**
     * Return the exposed object.
     */
    getRaw(key: TKey, options?: TGetOptions): TItem | undefined {
        const item = this.get(key, options);
        return item === undefined ? undefined : this.fromStoredItem(item);
    }

    /**
     * Provide a default value when item is missing on the store (on getters).
     */
    protected getDefault(key: TKey): TItem | undefined {
        return undefined;
    }

    has(key: TKey): boolean {
        return this.items.has(key);
    }

    /**
     * Store an item by key.
     * Existing items are updated in place.
     */
    protected setItem(key: TKey, value: TItem|TStoredItem): TStoredItem {
        const noOverwrite = (this.constructor as typeof Store).noOverwrite;
        const storedItem = this.items.get(key);

        if (noOverwrite && storedItem !== undefined)
            throw new Error(`Attempting to unallowed overwrite with key "${key}"`);

        if (storedItem !== undefined)
            return this.overrideStoredItem(key, storedItem, value)

        const newItem = this.toStoredItem(value);
        this.items.set(key, newItem);
        return newItem;
    }

    protected setItems(entries: Iterable<[TKey, TItem|TStoredItem]>): TStoredItem[] {
        return Array.from(entries, ([key, value]) => this.setItem(key, value));
    }

    delete(key: TKey): boolean {
        return this.items.delete(key);
    }

    getMany(keys: Iterable<TKey>, options?: TGetOptions): Map<TKey, TStoredItem> {
        const items = new Map<TKey, TStoredItem>();
        const missing: TKey[] = [];

        const { exc, ...opts } = options ?? {};

        for (const key of keys) {
            const item = this.get(key, opts as TGetOptions);

            if (item !== undefined)
                items.set(key, item);
            else if (exc)
                missing.push(key);
        }

        if (missing.length)
            throw new Error(`Missing items for keys: ${missing.join(', ')}`);

        return items;
    }

    deleteMany(keys: Iterable<TKey>): void {
        for (const key of keys)
            this.items.delete(key);
    }

    clear(): void {
        this.items.clear();
    }

    get size(): number {
        return this.items.size;
    }

    keys(): IterableIterator<TKey> {
        return this.items.keys();
    }

    values(): IterableIterator<TStoredItem> {
        return this.items.values();
    }

    entries(): IterableIterator<[TKey, TStoredItem]> {
        return this.items.entries();
    }

    [Symbol.iterator](): IterableIterator<[TKey, TStoredItem]> {
        return this.items[Symbol.iterator]();
    }
}


/**
 * A store referencing items by a key field.
 */
export class KeyedStore<
    TKey,
    TItem,
    TGetOptions extends StoreGetOptions = StoreGetOptions,
    TStoredItem = TItem,
> extends Store<TKey, TItem, TGetOptions, TStoredItem> {
    protected static keyField?: string;
    keyField?: string;

    constructor(items?: Map<TKey, TItem> | null, keyField?: string) {
        super(items);
        this.keyField = keyField;
    }

    set(value: TItem|TStoredItem): TStoredItem {
        const key = this.getKey(value);

        if (key === undefined || key === null)
            throw new Error('Cannot store object without key.');

        return this.setItem(key, value);
    }

    getKey(value: TItem|TStoredItem): TKey {
        const constructor = this.constructor as typeof KeyedStore;
        const keyField = this.keyField ?? constructor.keyField;
        const value_ = this.fromStoredItem(value)

        if (!keyField)
            throw new Error(`Missing key field on ${constructor.name}`);

        if (
            (typeof value_ !== 'object' && typeof value_ !== 'function') ||
            value_ === null
        )
            throw new Error('Expected an object when setting a value.');

        return (value_ as Record<string, unknown>)[keyField] as TKey;
    }

    /**
     * By a list of source objects, get items using a key field on them.
     *
     * It can be used for example to fetch relation among objects (eg. all users of
     * a list of articles).
     *
     * This method ensures to optimize duplication of ids among the different
     * sources.
     */
    getBy<TSource, TResultKey>(
        sources: Iterable<MaybeRef<TSource>>,
        sourceKey: KeySource<TSource, TKey>,
        options?: TGetOptions,
        resultKey?: KeySource<TSource, TResultKey>
    ): Map<TResultKey, TStoredItem | TStoredItem[]> {
        const sourceList = Array.isArray(sources) ? sources : [...sources];

        const ids = getKeysBy(sourceList, sourceKey);
        const items = this.getMany(ids, options);
        const results = new Map<TResultKey, TStoredItem | TStoredItem[]>();

        for (const source of sourceList) {
            const rIds = getKeysFrom(source, sourceKey);

            if (!rIds)
                continue;

            const rKey = resultKey ? getKeysFrom(source, resultKey) : source
            if (isIterable(rIds)) {
                results.set(
                    rKey,
                    (Array.isArray(rIds) ? rIds : [...rIds as Iterable<TKey>])
                        .map(key => items.get(key))
                        .filter((item): item is TStoredItem => item !== undefined),
                );
            } else {
                const item = items.get(rIds as TKey);
                if (item !== undefined)
                    results.set(rKey, item);

            }
        }

        return results;
    }

    setMany(entries: Iterable<TItem|TStoredItem>): TStoredItem[] {
        const items: TStoredItem[] = [];

        for (const entry of entries)
            items.push(this.set(entry));

        return items;
    }
}


/**
 * A keyed store with a reactive collection.
 */
export class ReactiveKeyedStore<
    TKey,
    TItem,
    TGetOptions extends StoreGetOptions = StoreGetOptions,
> extends KeyedStore<TKey, TItem, TGetOptions, ShallowRef<TItem>> {

    protected override readonly items: ShallowReactive<Map<TKey, ShallowRef<TItem>>> =
        shallowReactive(new Map<TKey, ShallowRef<TItem>>());

    constructor(items?: Map<TKey, TItem> | null, keyField?: string) {
        super(null, keyField);

        if (items) {
            for (const [key, value] of items)
                this.items.set(key, shallowRef(value));
        }
    }

    protected override toStoredItem(item: TItem): ShallowRef<TItem> {
        if(isRef(item))
            return shallowRef((item as ShallowRef<TItem>).value)
        return shallowRef(item);
    }

    protected override fromStoredItem(item: ShallowRef<TItem>|TItem): TItem {
        return unref(item);
    }

    protected override overrideStoredItem(key: TKey, storedItem: ShallowRef<TItem>, item: TItem|ShallowRef<TItem>): ShallowRef<TItem> {
        storedItem.value = unref(item)
        return storedItem
    }
}
