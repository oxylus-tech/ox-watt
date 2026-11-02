import { computed, ref, shallowRef, toValue, unref, watch, isRef } from 'vue'
import type { ComputedRef, MaybeRefOrGetter, Ref, ShallowRef, WatchSource } from 'vue';

import type { ApiOptions, ApiResult } from '../api.types';
import type { Database } from '../database';
import type { RelationDefinitions, ResolvedRelations } from '../model.types';
import type { Model } from '../model';
import type { Repositories } from '../repository'

/**
 * Common reactive state returned by asynchronous composables.
 *
 * @template TResult Type of the operation result.
 */
export interface BaseUseApiResult<TResult> {
    /** Last successfully returned result. */
    result: ShallowRef<TResult | undefined>;

    /** Indicates whether at least one operation is pending. */
    loading: Ref<boolean>;

    /** Error raised by the last failed operation. */
    error: ShallowRef<unknown | undefined>;

    /** Executes the operation manually. */
    execute: () => Promise<TResult>;
}

/**
 * Reactive state returned by useApi().
 *
 * @template TModel Model returned by the API operation.
 */
export interface UseApiResult<TModel extends Model>
    extends BaseUseApiResult<ApiResult<TModel>> {
    /** Reactive list of models extracted from the API result. */
    items: ComputedRef<TModel[]>;
}

/**
 * Options controlling automatic execution in useFetch().
 */
export interface UseFetchOptions {
    /** Execute the operation immediately when the watcher is created. */
    immediate?: boolean;

    /** Watch nested changes in the sources. */
    deep?: boolean;

    /** Enable automatic execution when watched sources change. */
    watch?: boolean;
}

/**
 * Internal options for useAsync().
 *
 * @template TResult Type of the operation result.
 */
interface UseAsyncOptions<TResult> {
    /** Returns a key used to deduplicate concurrent operations. */
    getKey?: () => unknown;
}

/**
 * Creates reactive state for an asynchronous operation.
 *
 * Concurrent executions with the same key share the same Promise.
 * When no key is provided, executions are independent.
 *
 * @template TResult Type of the operation result.
 * @param request Asynchronous operation to execute.
 * @param options Operation configuration.
 * @returns Reactive operation state.
 */
export function useAsync<TResult>(
    request: () => Promise<TResult>,
    options: UseAsyncOptions<TResult> = {}
): BaseUseApiResult<TResult> {
    const result = shallowRef<TResult>();
    const loading = ref(false);
    const error = shallowRef<unknown>();

    const pending = new Set<Promise<TResult>>();
    const pendingByKey = new Map<unknown, Promise<TResult>>();

    /**
     * Executes the operation, reusing an existing Promise when its key is pending.
     *
     * @returns The operation result.
     */
    async function execute(): Promise<TResult> {
        const key = options.getKey?.();
        const existing = options.getKey ? pendingByKey.get(key) : undefined;

        if (existing)
            return existing;

        const promise = Promise.resolve().then(request);

        pending.add(promise);

        if (options.getKey)
            pendingByKey.set(key, promise);

        loading.value = true;
        error.value = undefined;

        try {
            const response = await promise;
            result.value = response;
            return response;
        } catch (err) {
            error.value = err;
            throw err;
        } finally {
            pending.delete(promise);

            if (options.getKey && pendingByKey.get(key) === promise)
                pendingByKey.delete(key);

            loading.value = pending.size > 0;
        }
    }

    return {
        result,
        loading,
        error,
        execute
    };
}

/**
 * Creates reactive state for an API operation.
 *
 * @template TModel Model returned by the API operation.
 * @param request API operation to execute.
 * @param options Reactive or static API options.
 * @returns Reactive API state.
 */
export function useApi<TModel extends Model>(
    request: (options: ApiOptions) => Promise<ApiResult<TModel>>,
    options: MaybeRefOrGetter<ApiOptions>
): UseApiResult<TModel> {
    const api = useAsync(
        () => request(toValue(options)),
        {
            getKey: () => toValue(options)
        }
    );

    const items = computed<TModel[]>(() => {
        const values = api.result.value?.items ?? [];
        return values.map((item) => unref(item));
    });

    return {
        ...api,
        items
    };
}

/**
 * Creates reactive state for an asynchronous operation with optional automatic execution.
 *
 * The operation is executed manually through execute() unless automatic watching
 * is explicitly enabled.
 *
 * @template TResult Type of the operation result.
 * @param request Asynchronous operation to execute.
 * @param sources Reactive sources that can trigger the operation.
 * @param options Automatic execution configuration.
 * @returns Reactive operation state.
 */
export function useFetch<TResult>(
    request: () => Promise<TResult>,
    sources: WatchSource[] = [],
    options: UseFetchOptions = {}
): BaseUseApiResult<TResult> {
    const result = useAsync(request);

    if (options.watch) {
        watch(
            sources,
            () => {
                void result.execute().catch(() => undefined);
            },
            {
                immediate: options.immediate ?? false,
                deep: options.deep ?? false
            }
        );
    }

    return result;
}

/**
 * Fetches relations for one or more model instances.
 *
 * The result preserves the ResolvedRelations structure, keeping each source
 * item associated with its resolved relations.
 *
 * @template TModel Source model type.
 * @template TDefinitions Relation definitions.
 * @template TRepositories Database repository collection type.
 * @template TOptions API options type.
 * @param database Database used to resolve the relations.
 * @param items Reactive or static source items.
 * @param definitions Relation definitions associated with the source model.
 * @param relations Relations to resolve. Defaults to all defined relations.
 * @param options Reactive or static API options.
 * @param fetchOptions Automatic execution configuration.
 * @returns Reactive relation-fetching state.
 */
export function useFetchRelations<
    TModel extends Model,
    TDefinitions extends RelationDefinitions,
    TRepositories extends Repositories,
    TOptions extends ApiOptions = ApiOptions
>(
    database: Database<TRepositories>,
    items: MaybeRefOrGetter<Iterable<TModel>>,
    definitions: TDefinitions,
    relations?: (keyof TDefinitions)[],
    options?: MaybeRefOrGetter<TOptions>,
    fetchOptions: UseFetchOptions = {}
): BaseUseApiResult<
    ResolvedRelations<
        TModel,
        TDefinitions,
        TRepositories,
        TOptions extends { save: true } ? true : false
    >[]
> {
    return useFetch(
        () => database.fetchRelations(
            toValue(items),
            definitions,
            relations,
            options === undefined ? undefined : toValue(options)
        ),
        [
            () => toValue(items),
            () => options === undefined ? undefined : toValue(options)
        ],
        fetchOptions
    );
}

/**
 * Fetches one relation for one or more model instances.
 *
 * This is a convenience wrapper around useFetchRelations().
 *
 * @template TModel Source model type.
 * @template TDefinitions Relation definitions.
 * @template TRelation Relation name to resolve.
 * @template TRepositories Database repository collection type.
 * @template TOptions API options type.
 * @param database Database used to resolve the relation.
 * @param items Reactive or static source items.
 * @param definitions Relation definitions associated with the source model.
 * @param relation Relation to resolve.
 * @param options Reactive or static API options.
 * @param fetchOptions Automatic execution configuration.
 * @returns Reactive relation-fetching state.
 */
export function useFetchRelation<
    TModel extends Model,
    TDefinitions extends RelationDefinitions,
    TRelation extends keyof TDefinitions,
    TRepositories extends Repositories,
    TOptions extends ApiOptions = ApiOptions
>(
    database: Database<TRepositories>,
    items: MaybeRefOrGetter<Iterable<TModel>>,
    definitions: TDefinitions,
    relation: TRelation,
    options?: MaybeRefOrGetter<TOptions>,
    fetchOptions: UseFetchOptions = {}
): BaseUseApiResult<
    ResolvedRelations<
        TModel,
        TDefinitions,
        TRepositories,
        TOptions extends { save: true } ? true : false
    >[]
> {
    return useFetchRelations(
        database,
        items,
        definitions,
        [relation],
        options,
        fetchOptions
    );
}
