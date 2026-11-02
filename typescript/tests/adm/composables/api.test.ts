
import { effectScope, nextTick, ref, reactive, isRef } from 'vue';
import type { Ref } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { ApiOptions, ApiResult, Database, Repositories, Model } from '@/adm';

import {
    useAsync,
    useApi,
    useFetch,
    useFetchRelation,
    useFetchRelations
} from '@/adm/composables/api';
import { useDb } from '@/adm/composables/repos'

import { Article, User, useArticle } from '../fixtures';


/**
 * Creates a deferred Promise for controlling asynchronous test operations.
 *
 * @template T Promise result type.
 * @returns Promise and its resolve/reject functions.
 */
function deferred<T>() {
    let resolve!: (value: T) => void;
    let reject!: (reason?: unknown) => void;

    const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
    });

    return { promise, resolve, reject };
}

/**
 * Waits for Vue's queued watchers and the resulting Promise callbacks.
 *
 * @returns Promise resolved after the current reactive update cycle.
 */
async function flushPromises(): Promise<void> {
    await nextTick();
    await Promise.resolve();
    await nextTick();
}

/**
 * Creates a minimal API result for composable tests.
 *
 * @param items Models returned by the API.
 * @returns API result cast to the public API result type.
 */
function createApiResult<TModel extends Model>(
    items: (TModel | Ref<TModel>)[]
): ApiResult<TModel> {
    return { items } as ApiResult<TModel>;
}


describe('useAsync', () => {
    it('initializes its state', () => {
        const state = useAsync(async () => 42);

        expect(state.result.value).toBeUndefined();
        expect(state.loading.value).toBe(false);
        expect(state.error.value).toBeUndefined();
        expect(typeof state.execute).toBe('function');
    });

    it('executes the request and stores its result', async () => {
        const request = vi.fn().mockResolvedValue(42);
        const state = useAsync(request);

        await expect(state.execute()).resolves.toBe(42);

        expect(request).toHaveBeenCalledOnce();
        expect(state.result.value).toBe(42);
        expect(state.loading.value).toBe(false);
        expect(state.error.value).toBeUndefined();
    });

    it('sets loading while the request is pending', async () => {
        const operation = deferred<number>();
        const state = useAsync(() => operation.promise);

        const execution = state.execute();

        await Promise.resolve();

        expect(state.loading.value).toBe(true);

        operation.resolve(42);

        await expect(execution).resolves.toBe(42);

        expect(state.loading.value).toBe(false);
    });

    it('stores and rethrows request errors', async () => {
        const error = new Error('Request failed');
        const state = useAsync(async () => {
            throw error;
        });

        await expect(state.execute()).rejects.toBe(error);

        expect(state.error.value).toBe(error);
        expect(state.result.value).toBeUndefined();
        expect(state.loading.value).toBe(false);
    });

    it('clears the previous error when executing again', async () => {
        const request = vi.fn()
            .mockRejectedValueOnce(new Error('First failure'))
            .mockResolvedValueOnce(42);

        const state = useAsync(request);

        await expect(state.execute()).rejects.toThrow('First failure');
        await expect(state.execute()).resolves.toBe(42);

        expect(state.error.value).toBeUndefined();
        expect(state.result.value).toBe(42);
    });

    it('tracks multiple concurrent operations', async () => {
        const first = deferred<number>();
        const second = deferred<number>();
        const request = vi.fn()
            .mockImplementationOnce(() => first.promise)
            .mockImplementationOnce(() => second.promise);

        const state = useAsync(request);

        const firstExecution = state.execute();
        const secondExecution = state.execute();

        await Promise.resolve();

        expect(state.loading.value).toBe(true);
        expect(request).toHaveBeenCalledTimes(2);

        first.resolve(1);
        await expect(firstExecution).resolves.toBe(1);

        expect(state.loading.value).toBe(true);

        second.resolve(2);
        await expect(secondExecution).resolves.toBe(2);

        expect(state.loading.value).toBe(false);
        expect(state.result.value).toBe(2);
    });

    it('deduplicates concurrent operations with the same key', async () => {
        const operation = deferred<number>();
        const request = vi.fn(() => operation.promise);
        const key = ref('same-key');

        const state = useAsync(request, {
            getKey: () => key.value
        });

        const first = state.execute();
        const second = state.execute();

        expect(request).not.toHaveBeenCalled();

        await Promise.resolve();

        expect(request).toHaveBeenCalledOnce();

        operation.resolve(42);

        await expect(first).resolves.toBe(42);
        await expect(second).resolves.toBe(42);
    });

    it('does not deduplicate operations with different keys', async () => {
        const first = deferred<number>();
        const second = deferred<number>();
        const request = vi.fn()
            .mockImplementationOnce(() => first.promise)
            .mockImplementationOnce(() => second.promise);
        const key = ref('first');

        const state = useAsync(request, {
            getKey: () => key.value
        });

        const firstExecution = state.execute();

        key.value = 'second';

        const secondExecution = state.execute();

        await Promise.resolve();

        expect(request).toHaveBeenCalledTimes(2);

        first.resolve(1);
        second.resolve(2);

        await expect(firstExecution).resolves.toBe(1);
        await expect(secondExecution).resolves.toBe(2);
    });
});


describe('useApi', () => {
    it('executes the request with the current options', async () => {
        const options: ApiOptions = { save: true };
        const result = createApiResult([useArticle()]);
        const request = vi.fn().mockResolvedValue(result);

        const state = useApi(request, options);

        await expect(state.execute()).resolves.toBe(result);

        expect(request).toHaveBeenCalledOnce();
        expect(request).toHaveBeenCalledWith(options);
        expect(state.result.value).toBe(result);
    });

    it('supports reactive options', async () => {
        const options = ref<ApiOptions>({ save: false });
        const request = vi.fn().mockResolvedValue(createApiResult([]));

        const state = useApi(request, options);

        await state.execute();

        options.value = { save: true };

        await state.execute();

        expect(request).toHaveBeenNthCalledWith(1, { save: false });
        expect(request).toHaveBeenNthCalledWith(2, { save: true });
    });

    it('extracts models from the API result', async () => {
        const first = useArticle({ id: 1 });
        const second = useArticle({ id: 2 });
        const request = vi.fn().mockResolvedValue(
            createApiResult([first, second])
        );

        const state = useApi(request, {});

        expect(state.items.value).toEqual([]);

        await state.execute();

        expect(state.items.value).toEqual([first, second]);
    });

    it('unwraps refs in the API result items', async () => {
        const first = useArticle({ id: 1 });
        const second = useArticle({ id: 2 });
        const request = vi.fn().mockResolvedValue(
            createApiResult([ref(first), ref(second)])
        );

        const state = useApi(request, {});

        await state.execute();

        expect(state.items.value).toEqual([first, second]);
        expect(state.items.value.every(item => !isRef(item))).toBe(true);
    });

    it('updates items when the result changes', async () => {
        const first = useArticle({ id: 1 });
        const second = useArticle({ id: 2 });
        const request = vi.fn()
            .mockResolvedValueOnce(createApiResult([first]))
            .mockResolvedValueOnce(createApiResult([second]));

        const state = useApi(request, {});

        await state.execute();

        expect(state.items.value).toEqual([first]);

        await state.execute();

        expect(state.items.value).toEqual([second]);
    });

    it('returns an empty list when no result is available', () => {
        const state = useApi(
            vi.fn().mockResolvedValue(createApiResult([])),
            {}
        );

        expect(state.items.value).toEqual([]);
    });
});


describe('useFetch', () => {
    it('does not execute automatically by default', () => {
        const request = vi.fn().mockResolvedValue(42);

        useFetch(request);

        expect(request).not.toHaveBeenCalled();
    });

    it('executes manually', async () => {
        const request = vi.fn().mockResolvedValue(42);
        const state = useFetch(request);

        await expect(state.execute()).resolves.toBe(42);

        expect(request).toHaveBeenCalledOnce();
        expect(state.result.value).toBe(42);
    });

    it('does not watch sources unless watch is enabled', async () => {
        const source = ref(1);
        const request = vi.fn().mockResolvedValue(42);

        const state = useFetch(
            request,
            [source],
            { watch: false }
        );

        source.value = 2;
        await flushPromises();

        expect(request).not.toHaveBeenCalled();
        expect(state.result.value).toBeUndefined();
    });

    it('executes when a watched source changes', async () => {
        const scope = effectScope();
        const source = ref(1);
        const request = vi.fn().mockResolvedValue(42);

        const state = scope.run(() => useFetch(
            request,
            [source],
            { watch: true }
        ))!;

        expect(request).not.toHaveBeenCalled();

        source.value = 2;
        await flushPromises();

        expect(request).toHaveBeenCalledOnce();
        expect(state.result.value).toBe(42);

        scope.stop();
    });

    it('executes immediately when immediate and watch are enabled', async () => {
        const scope = effectScope();
        const source = ref(1);
        const request = vi.fn().mockResolvedValue(42);

        const state = scope.run(() => useFetch(
            request,
            [source],
            { watch: true, immediate: true }
        ))!;

        await flushPromises();

        expect(request).toHaveBeenCalledOnce();
        expect(state.result.value).toBe(42);

        scope.stop();
    });

    it('does not execute immediately when watch is disabled', async () => {
        const source = ref(1);
        const request = vi.fn().mockResolvedValue(42);

        useFetch(
            request,
            [source],
            { watch: false, immediate: true }
        );

        await flushPromises();

        expect(request).not.toHaveBeenCalled();
    });

    it('does not react to nested changes unless deep is enabled', async () => {
        const scope = effectScope();
        const source = reactive({ nested: { value: 1 } });
        const request = vi.fn().mockResolvedValue(42);

        scope.run(() => useFetch(
            request,
            [() => source.nested],
            { watch: true }
        ));

        source.nested.value = 2;
        await flushPromises();

        expect(request).not.toHaveBeenCalled();

        scope.stop();
    });

    it('reacts to nested changes when deep is enabled', async () => {
        const scope = effectScope();
        const source = reactive({ nested: { value: 1 } });
        const request = vi.fn().mockResolvedValue(42);

        scope.run(() => useFetch(
            request,
            [() => source.nested],
            { watch: true, deep: true }
        ));

        source.nested.value = 2;
        await flushPromises();

        expect(request).toHaveBeenCalledOnce();

        scope.stop();
    });

    it('stores watcher-triggered request errors without rejecting the watcher', async () => {
        const scope = effectScope();
        const source = ref(1);
        const error = new Error('Request failed');
        const request = vi.fn().mockRejectedValue(error);

        const state = scope.run(() => useFetch(
            request,
            [source],
            { watch: true, immediate: true }
        ))!;

        await flushPromises();

        expect(request).toHaveBeenCalledOnce();
        expect(state.error.value).toBe(error);

        scope.stop();
    });
});


describe('useFetchRelations', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('fetches the requested relations', async () => {
        const { db } = useDb([Article, User]);
        const item = useArticle();
        const definitions = Article.relations;
        const result = [{
            item,
            relations: {}
        }];

        const fetchRelations = vi.spyOn(db, 'fetchRelations')
            .mockResolvedValue(result as never);

        const state = useFetchRelations(
            db,
            [item],
            definitions,
            ['author']
        );

        await expect(state.execute()).resolves.toBe(result);

        expect(fetchRelations).toHaveBeenCalledWith(
            [item],
            definitions,
            ['author'],
            undefined
        );
        expect(state.result.value).toBe(result);
    });

    it('forwards API options', async () => {
        const { db } = useDb([Article, User]);
        const item = useArticle();
        const definitions = Article.relations;
        const options: ApiOptions = { save: true };

        const fetchRelations = vi.spyOn(db, 'fetchRelations')
            .mockResolvedValue([] as never);

        const state = useFetchRelations(
            db,
            [item],
            definitions,
            ['author'],
            options
        );

        await state.execute();

        expect(fetchRelations).toHaveBeenCalledWith(
            [item],
            definitions,
            ['author'],
            options
        );
    });

    it('uses the current items and options when executing', async () => {
        const { db } = useDb([Article, User]);
        const first = useArticle({ id: 1 });
        const second = useArticle({ id: 2 });
        const items = ref([first]);
        const options = ref<ApiOptions>({ save: false });

        const fetchRelations = vi.spyOn(db, 'fetchRelations')
            .mockResolvedValue([] as never);

        const state = useFetchRelations(
            db,
            items,
            Article.relations,
            ['author'],
            options
        );

        await state.execute();

        items.value = [second];
        options.value = { save: true };

        await state.execute();

        expect(fetchRelations).toHaveBeenNthCalledWith(
            1,
            [first],
            Article.relations,
            ['author'],
            { save: false }
        );
        expect(fetchRelations).toHaveBeenNthCalledWith(
            2,
            [second],
            Article.relations,
            ['author'],
            { save: true }
        );
    });

    it('watches reactive items when watch is enabled', async () => {
        const scope = effectScope();
        const { db } = useDb([Article, User]);
        const first = useArticle({ id: 1 });
        const second = useArticle({ id: 2 });
        const items = ref([first]);

        const fetchRelations = vi.spyOn(db, 'fetchRelations')
            .mockResolvedValue([] as never);

        scope.run(() => useFetchRelations(
            db,
            items,
            Article.relations,
            ['author'],
            undefined,
            { watch: true }
        ));

        items.value = [second];
        await flushPromises();

        expect(fetchRelations).toHaveBeenCalledOnce();
        expect(fetchRelations).toHaveBeenCalledWith(
            [second],
            Article.relations,
            ['author'],
            undefined
        );

        scope.stop();
    });

    it('preserves the ResolvedRelations result structure', async () => {
        const { db } = useDb([Article, User]);
        const item = useArticle();
        const resolved = {
            item,
            relations: {
                author: ref(undefined)
            }
        };

        vi.spyOn(db, 'fetchRelations')
            .mockResolvedValue([resolved] as never);

        const state = useFetchRelations(
            db,
            [item],
            Article.relations,
            ['author']
        );

        await state.execute();

        expect(state.result.value).toEqual([resolved]);
        expect(state.result.value?.[0]).toHaveProperty('item', item);
        expect(state.result.value?.[0]).toHaveProperty('relations');
    });
});


describe('useFetchRelation', () => {
    it('delegates to useFetchRelations with a single relation', async () => {
        const { db } = useDb([Article, User]);
        const item = useArticle();
        const resolved = {
            item,
            relations: {}
        };

        const fetchRelations = vi.spyOn(db, 'fetchRelations')
            .mockResolvedValue([resolved] as never);

        const state = useFetchRelation(
            db,
            [item],
            Article.relations,
            'author'
        );

        await state.execute();

        expect(fetchRelations).toHaveBeenCalledWith(
            [item],
            Article.relations,
            ['author'],
            undefined
        );
        expect(state.result.value).toEqual([resolved]);
    });

    it('forwards API and fetch options', async () => {
        const scope = effectScope();
        const { db } = useDb([Article, User]);
        const item = useArticle();
        const options: ApiOptions = { save: true };

        const fetchRelations = vi.spyOn(db, 'fetchRelations')
            .mockResolvedValue([] as never);

        const state = scope.run(() => useFetchRelation(
            db,
            [item],
            Article.relations,
            'author',
            options,
            { watch: true, immediate: true }
        ))!;

        await flushPromises();

        expect(fetchRelations).toHaveBeenCalledOnce();
        expect(fetchRelations).toHaveBeenCalledWith(
            [item],
            Article.relations,
            ['author'],
            options
        );

        scope.stop();
    });
});

