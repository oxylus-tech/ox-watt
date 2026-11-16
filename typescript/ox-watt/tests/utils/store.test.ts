
import { isReactive, isRef, type ShallowRef } from 'vue';
import { describe, expect, it } from 'vitest';

import {
    Store,
    KeyedStore,
    ReactiveKeyedStore,
    type StoreGetOptions,
} from '@/utils/store';


interface Item {
    id: number;
    name: string;
}

interface Source {
    id: number;
    relatedId?: number;
    relatedIds?: number[];
    group?: string;
}

/**
 * Exposes protected Store methods for testing.
 */
class TestStore extends Store<number, Item> {
    set(key: number, value: Item) {
        return this.setItem(key, value);
    }

    setMany(entries: Iterable<[number, Item]>) {
        return this.setItems(entries);
    }
}

/**
 * Provides a default item for missing keys.
 */
class DefaultStore extends TestStore {
    protected override getDefault(key: number): Item {
        return { id: key, name: `Default ${key}` };
    }
}

/**
 * Prevents overwriting existing items.
 */
class NoOverwriteStore extends TestStore {
    protected static override readonly noOverwrite = true;
}

/**
 * Keyed store used for testing.
 */
class TestKeyedStore extends KeyedStore<number, Item> {
    protected static override keyField = 'id';
}

/**
 * Keyed store that prevents overwriting existing items.
 */
class NoOverwriteKeyedStore extends KeyedStore<number, Item> {
    protected static override keyField = 'id';
    protected static override readonly noOverwrite = true;
}

/**
 * Reactive keyed store used for testing.
 */
class TestReactiveKeyedStore extends ReactiveKeyedStore<number, Item> {
    protected static override keyField = 'id';
}


describe('Store', () => {
    it('initializes from a map', () => {
        const first: Item = { id: 1, name: 'First' };
        const second: Item = { id: 2, name: 'Second' };

        const store = new TestStore(new Map([
            [1, first],
            [2, second],
        ]));

        expect(store.size).toBe(2);
        expect(store.getRaw(1)).toBe(first);
        expect(store.getRaw(2)).toBe(second);
    });

    it('initializes an empty store when no items are provided', () => {
        expect(new TestStore().size).toBe(0);
        expect(new TestStore(null).size).toBe(0);
    });

    it('returns an item by key', () => {
        const item: Item = { id: 1, name: 'First' };
        const store = new TestStore(new Map([[1, item]]));

        expect(store.getRaw(1)).toBe(item);
    });

    it('returns undefined for a missing item', () => {
        const store = new TestStore();

        expect(store.getRaw(1)).toBeUndefined();
        expect(store.get(1)).toBeUndefined();
    });

    it('throws when an item is missing and exc is enabled', () => {
        const store = new TestStore();

        expect(() => store.getRaw(1, { exc: true }))
            .toThrow('Item "1" not found in repository.');

        expect(() => store.get(1, { exc: true }))
            .toThrow('Item "1" not found in repository.');
    });

    it('returns the default item for a missing key', () => {
        const store = new DefaultStore();

        const item = store.getRaw(42);

        expect(item).toEqual({ id: 42, name: 'Default 42' });
        expect(store.has(42)).toBe(true);
        expect(store.size).toBe(1);
    });

    it('returns the stored representation through getRef', () => {
        const item: Item = { id: 1, name: 'First' };
        const store = new TestStore(new Map([[1, item]]));

        expect(store.get(1)).toBe(item);
    });

    it('checks whether an item exists', () => {
        const store = new TestStore();

        store.set(1, { id: 1, name: 'First' });

        expect(store.has(1)).toBe(true);
        expect(store.has(2)).toBe(false);
    });

    it('inserts an item', () => {
        const item: Item = { id: 1, name: 'First' };
        const store = new TestStore();

        expect(store.set(1, item)).toBe(item);
        expect(store.getRaw(1)).toBe(item);
        expect(store.size).toBe(1);
    });

    it('replaces an existing item', () => {
        const first: Item = { id: 1, name: 'First' };
        const second: Item = { id: 1, name: 'Second' };
        const store = new TestStore(new Map([[1, first]]));

        const result = store.set(1, second);

        expect(result).toBe(second);
        expect(store.getRaw(1)).toBe(second);
        expect(store.getRaw(1)).not.toBe(first);
    });

    it('returns stored items when setting multiple entries', () => {
        const first: Item = { id: 1, name: 'First' };
        const second: Item = { id: 2, name: 'Second' };
        const store = new TestStore();

        expect(store.setMany([
            [1, first],
            [2, second],
        ])).toEqual([first, second]);

        expect(store.size).toBe(2);
    });

    it('prevents overwriting when noOverwrite is enabled', () => {
        const store = new NoOverwriteStore();

        store.set(1, { id: 1, name: 'First' });

        expect(() => store.set(1, { id: 1, name: 'Second' }))
            .toThrow('Attempting to unallowed overwrite with key "1"');

        expect(store.getRaw(1)?.name).toBe('First');
    });

    it('returns multiple stored items through getMany', () => {
        const first: Item = { id: 1, name: 'First' };
        const second: Item = { id: 2, name: 'Second' };
        const store = new TestStore(new Map([
            [1, first],
            [2, second],
        ]));

        const result = store.getMany([1, 2]);

        expect(result).toEqual(new Map([
            [1, first],
            [2, second],
        ]));
    });

    it('ignores missing items in getMany by default', () => {
        const first: Item = { id: 1, name: 'First' };
        const store = new TestStore(new Map([[1, first]]));

        expect(store.getMany([1, 2])).toEqual(new Map([[1, first]]));
    });

    it('throws when getMany encounters missing items with exc enabled', () => {
        const store = new TestStore();

        expect(() => store.getMany([1, 2, 3], { exc: true }))
            .toThrow('Missing items for keys: 1, 2, 3');
    });

    it('deletes an item', () => {
        const store = new TestStore(new Map([
            [1, { id: 1, name: 'First' }],
        ]));

        expect(store.delete(1)).toBe(true);
        expect(store.delete(1)).toBe(false);
        expect(store.has(1)).toBe(false);
    });

    it('deletes multiple items', () => {
        const store = new TestStore(new Map([
            [1, { id: 1, name: 'First' }],
            [2, { id: 2, name: 'Second' }],
            [3, { id: 3, name: 'Third' }],
        ]));

        store.deleteMany([1, 3]);

        expect(store.size).toBe(1);
        expect(store.has(1)).toBe(false);
        expect(store.has(2)).toBe(true);
        expect(store.has(3)).toBe(false);
    });

    it('clears all items', () => {
        const store = new TestStore(new Map([
            [1, { id: 1, name: 'First' }],
            [2, { id: 2, name: 'Second' }],
        ]));

        store.clear();

        expect(store.size).toBe(0);
        expect([...store.keys()]).toEqual([]);
    });

    it('exposes keys, values and entries', () => {
        const first: Item = { id: 1, name: 'First' };
        const second: Item = { id: 2, name: 'Second' };
        const store = new TestStore(new Map([
            [1, first],
            [2, second],
        ]));

        expect([...store.keys()]).toEqual([1, 2]);
        expect([...store.values()]).toEqual([first, second]);
        expect([...store.entries()]).toEqual([
            [1, first],
            [2, second],
        ]);
    });

    it('supports iteration', () => {
        const first: Item = { id: 1, name: 'First' };
        const second: Item = { id: 2, name: 'Second' };
        const store = new TestStore(new Map([
            [1, first],
            [2, second],
        ]));

        expect([...store]).toEqual([
            [1, first],
            [2, second],
        ]);
    });
});


describe('KeyedStore', () => {
    it('uses the configured key field', () => {
        const store = new TestKeyedStore();
        const item: Item = { id: 1, name: 'First' };

        expect(store.getKey(item)).toBe(1);
        expect(store.set(item)).toBe(item);
        expect(store.getRaw(1)).toBe(item);
    });

    it('supports a key field provided to the constructor', () => {
        const store = new KeyedStore<string, { code: string; name: string }>(
            null,
            'code',
        );

        const item = { code: 'A', name: 'First' };

        expect(store.getKey(item)).toBe('A');
        expect(store.set(item)).toBe(item);
        expect(store.getRaw('A')).toBe(item);
    });

    it('throws when no key field is configured', () => {
        const store = new KeyedStore<number, Item>();

        expect(() => store.getKey({ id: 1, name: 'First' }))
            .toThrow(/Missing key field/);
    });

    it('throws when setting an item without a key', () => {
        const store = new TestKeyedStore();

        expect(() => store.set({ id: null as unknown as number, name: 'Invalid' }))
            .toThrow('Cannot store object without key.');
    });

    it('throws when setting a non-object value', () => {
        const store = new TestKeyedStore();

        expect(() => store.getKey(null as unknown as Item))
            .toThrow('Expected an object when setting a value.');
    });

    it('replaces an existing item with the same key', () => {
        const store = new TestKeyedStore();
        const first: Item = { id: 1, name: 'First' };
        const second: Item = { id: 1, name: 'Second' };

        store.set(first);
        const result = store.set(second);

        expect(result).toBe(second);
        expect(store.getRaw(1)).toBe(second);
        expect(store.getRaw(1)).not.toBe(first);
    });

    it('prevents overwriting when noOverwrite is enabled', () => {
        const store = new NoOverwriteKeyedStore();

        store.set({ id: 1, name: 'First' });

        expect(() => store.set({ id: 1, name: 'Second' }))
            .toThrow('Attempting to unallowed overwrite with key "1"');
    });

    it('stores multiple items', () => {
        const store = new TestKeyedStore();

        const result = store.setMany([
            { id: 1, name: 'First' },
            { id: 2, name: 'Second' },
        ]);

        expect(result).toEqual([
            { id: 1, name: 'First' },
            { id: 2, name: 'Second' },
        ]);

        expect(store.size).toBe(2);
    });

    it('resolves items from source objects using a scalar key', () => {
        const first: Item = { id: 1, name: 'First' };
        const second: Item = { id: 2, name: 'Second' };
        const store = new TestKeyedStore(new Map([
            [1, first],
            [2, second],
        ]));

        const sources: Source[] = [
            { id: 10, relatedId: 1 },
            { id: 11, relatedId: 2 },
            { id: 12, relatedId: 99 },
            { id: 13 },
        ];

        const result = store.getBy(sources, 'relatedId');

        expect(result.size).toBe(2);
        expect(result.get(sources[0])).toBe(first);
        expect(result.get(sources[1])).toBe(second);
        expect(result.has(sources[2])).toBe(false);
        expect(result.has(sources[3])).toBe(false);
    });

    it('resolves multiple items from source objects', () => {
        const first: Item = { id: 1, name: 'First' };
        const second: Item = { id: 2, name: 'Second' };
        const store = new TestKeyedStore(new Map([
            [1, first],
            [2, second],
        ]));

        const sources: Source[] = [
            { id: 10, relatedIds: [1, 2, 1] },
            { id: 11, relatedIds: [2, 99] },
            { id: 12, relatedIds: [] },
        ];

        const result = store.getBy(sources, 'relatedIds');

        expect(result.size).toBe(3);
        expect(result.get(sources[0])).toEqual([first, second, first]);
        expect(result.get(sources[1])).toEqual([second]);
        expect(result.get(sources[2])).toEqual([]);
    });

    it('deduplicates keys when resolving multiple sources', () => {
        const entries: [number, Item][] = [
            [1, { id: 1, name: 'First' }],
            [2, { id: 2, name: 'Second' }]
        ]
        const store = new TestKeyedStore(entries.reduce((map, [key, item]) => map.set(key, item), new Map<number, Item>()));

        const sources: Source[] = [
            { id: 10, relatedIds: [1, 2] },
            { id: 11, relatedIds: [1] },
            { id: 12, relatedIds: [2, 1] },
        ];

        const result = store.getBy(sources, 'relatedIds');

        expect(result.size).toBe(3);
        expect(result.get(sources[0])).toEqual([
            store.getRaw(1),
            store.getRaw(2),
        ]);
        expect(result.get(sources[1])).toEqual([store.getRaw(1)]);
        expect(result.get(sources[2])).toEqual([
            store.getRaw(2),
            store.getRaw(1),
        ]);
    });

    it('uses resultKey for sources with multiple related keys', () => {
        const entries: [number, Item][] = [
            [1, { id: 1, name: 'First' }],
            [2, { id: 2, name: 'Second' }],
        ]
        const store = new TestKeyedStore(entries.reduce((map, [key, item]) => map.set(key, item), new Map<number, Item>()));

        const sources: Source[] = [
            { id: 10, group: 'A', relatedIds: [1, 2] },
            { id: 11, group: 'B', relatedIds: [2] },
        ];

        const result = store.getBy(sources, 'relatedIds', undefined, 'group');

        expect(result.get('A')).toEqual([
            store.getRaw(1),
            store.getRaw(2),
        ]);
        expect(result.get('B')).toEqual([store.getRaw(2)]);
    });

    it('throws when a related key is missing and exc is enabled', () => {
        const entries: [number, Item][] = [
            [1, { id: 1, name: 'First' }],
        ]
        const store = new TestKeyedStore(entries.reduce((map, [key, item]) => map.set(key, item), new Map<number, Item>()));

        const sources: Source[] = [
            { id: 10, relatedId: 1 },
            { id: 11, relatedId: 99 },
        ];

        expect(() => store.getBy(sources, 'relatedId', { exc: true }))
            .toThrow('Missing items for keys: 99');
    });
});


describe('ReactiveKeyedStore', () => {
    it('stores items in a reactive map', () => {
        const store = new TestReactiveKeyedStore();

        expect(isReactive(store['items'])).toBe(true);
    });

    it('wraps initial items in shallow refs', () => {
        const item: Item = { id: 1, name: 'First' };
        const store = new TestReactiveKeyedStore(new Map([[1, item]]));

        const ref = store.get(1);

        expect(ref).toBeDefined();
        expect(isRef(ref)).toBe(true);
        expect(ref?.value).toBe(item);
        expect(store.getRaw(1)).toBe(item);
    });

    it('returns the exposed item through get', () => {
        const item: Item = { id: 1, name: 'First' };
        const store = new TestReactiveKeyedStore();

        store.set(item);

        expect(store.getRaw(1)).toBe(item);
        expect(isRef(store.getRaw(1))).toBe(false);
    });

    it('returns the stored ref through getRef', () => {
        const item: Item = { id: 1, name: 'First' };
        const store = new TestReactiveKeyedStore();

        store.set(item);

        const ref = store.get(1);

        expect(isRef(ref)).toBe(true);
        expect(ref?.value).toBe(item);
    });

    it('returns the stored ref when setting an item', () => {
        const item: Item = { id: 1, name: 'First' };
        const store = new TestReactiveKeyedStore();

        const ref = store.set(item);

        expect(isRef(ref)).toBe(true);
        expect(ref.value).toBe(item);
    });

    it('replaces the value of an existing ref without replacing the ref', () => {
        const first: Item = { id: 1, name: 'First' };
        const second: Item = { id: 1, name: 'Second' };
        const store = new TestReactiveKeyedStore();

        const originalRef = store.set(first);
        const result = store.set(second);

        expect(result).toBe(originalRef);
        expect(store.get(1)).toBe(originalRef);
        expect(originalRef.value).toBe(second);
        expect(store.getRaw(1)).toBe(second);
        expect(store.getRaw(1)).not.toBe(first);
    });

    it('returns refs through getMany', () => {
        const first: Item = { id: 1, name: 'First' };
        const second: Item = { id: 2, name: 'Second' };
        const store = new TestReactiveKeyedStore();

        store.setMany([first, second]);

        const result = store.getMany([1, 2]);

        expect(isRef(result.get(1))).toBe(true);
        expect(isRef(result.get(2))).toBe(true);
        expect(result.get(1)?.value).toBe(first);
        expect(result.get(2)?.value).toBe(second);
    });

    it('returns refs through getBy', () => {
        const first: Item = { id: 1, name: 'First' };
        const second: Item = { id: 2, name: 'Second' };
        const store = new TestReactiveKeyedStore();

        store.setMany([first, second]);

        const sources: Source[] = [
            { id: 10, relatedId: 1 },
            { id: 11, relatedIds: [1, 2] },
        ];

        const result = store.getBy(sources, source => source.relatedId ?? source.relatedIds);

        expect(result.get(sources[0])).toBe(store.get(1));
        expect(result.get(sources[1])).toEqual([
            store.get(1),
            store.get(2),
        ]);
    });

    it('returns refs through values, entries and iteration', () => {
        const first: Item = { id: 1, name: 'First' };
        const second: Item = { id: 2, name: 'Second' };
        const store = new TestReactiveKeyedStore();

        store.setMany([first, second]);

        const values = [...store.values()];
        const entries = [...store.entries()];
        const iterable = [...store];

        expect(values.every(isRef)).toBe(true);
        expect(entries.every(([, value]) => isRef(value))).toBe(true);
        expect(iterable.every(([, value]) => isRef(value))).toBe(true);

        expect((values[0] as ShallowRef<Item>).value).toBe(first);
        expect((values[1] as ShallowRef<Item>).value).toBe(second);
    });

    it('creates and stores a ref for a default item', () => {
        class ReactiveDefaultStore extends TestReactiveKeyedStore {
            protected override getDefault(key: number): Item {
                return { id: key, name: `Default ${key}` };
            }
        }

        const store = new ReactiveDefaultStore();

        const ref = store.get(42);

        expect(isRef(ref)).toBe(true);
        expect(ref?.value).toEqual({ id: 42, name: 'Default 42' });
        expect(store.getRaw(42)).toBe(ref?.value);
        expect(store.has(42)).toBe(true);
    });

    it('throws when an item is missing and exc is enabled', () => {
        const store = new TestReactiveKeyedStore();

        expect(() => store.get(42, { exc: true }))
            .toThrow('Item "42" not found in repository.');
    });
});

