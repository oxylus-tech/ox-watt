import { computed, toValue } from 'vue';
import type { MaybeRefOrGetter, ComputedRef } from 'vue';

import { isIterable, type KeySource } from '@/utils';

import type { IApiClient, ApiOptions } from '../api.types';
import type { Model, ModelId, ModelClass, ModelStore } from '../model';
import type { DatabaseConfig, Database } from '../database'
import type {
    Repository,
    Repositories,
    AnyRepository,
    RepositoryDefinitionsInput,
    RepositoryRelations,
    RepositoriesFrom,
    RepositoryModel
} from '../repository';

import type { BaseUseApiResult, UseFetchOptions, UseApiResult} from './api' 
import type {
    ReactiveRepository,
    ReactiveRepositories,
    ReactiveDbRepositories,
    ReactiveDbRepository,
    ReactiveDatabaseFrom
} from './types';

import { createRepos, createDb, type CreateReposOptions } from './create'
import { useFetch, useApi } from './api' 

/**
 * Creates a reactive wrapper around an existing repository.
 *
 * @param repository - Repository instance to wrap.
 * @returns Reactive repository interface.
 */
export function useRepo<
    TModel extends Model,
    TApi extends IApiClient<TModel>,
    TModelClass extends ModelClass<TModel>,
    TRepository extends Repository<TModel, TApi, TModelClass>
>(
    repository: TRepository
): ReactiveRepository<TModel, TApi, TModelClass, TRepository> {
    return {
        repository,

        get(id: MaybeRefOrGetter<ModelId>): ComputedRef<ReturnType<ModelStore<TModel>['get']>> {
            return computed(() => repository.store.get(toValue(id)));
        },

        getMany(ids: MaybeRefOrGetter<ModelId[]>): ComputedRef<ReturnType<ModelStore<TModel>['getMany']>> {
            return computed(() => repository.store.getMany(toValue(ids)));
        },

        fetch(
            id: MaybeRefOrGetter<ModelId>,
            apiOptions?: MaybeRefOrGetter<ApiOptions>,
            fetchOptions?: UseFetchOptions
        ) {
            return useFetch(
                async () => {
                    const api = repository.api();

                    if (!api)
                        throw new Error('Repository has no API client configured.');

                    return api.get(toValue(id), toValue(apiOptions));
                },
                [() => toValue(id)],
                fetchOptions
            );
        },

        fetchMany(
            ids: MaybeRefOrGetter<ModelId[]>,
            apiOptions?: MaybeRefOrGetter<ApiOptions>,
            fetchOptions?: UseFetchOptions
        ) {
            return useFetch(
                async () => {
                    const api = repository.api();

                    if (!api)
                        throw new Error('Repository has no API client configured.');

                    return api.list({...toValue(apiOptions), ids: toValue(ids)});
                },
                [() => toValue(ids)],
                fetchOptions
            );
        }
    };
}


/**
 * Creates reactive wrappers for a collection of repositories.
 *
 * @param repositories - Repository collection to wrap.
 * @returns Reactive repository collection preserving its keys and types.
 */
export function useRepos<TRepositories extends Repositories>(
    repositories: TRepositories
): ReactiveRepositories<TRepositories> {
    const result = {} as ReactiveRepositories<TRepositories>;

    for (const key of Object.keys(repositories) as (keyof TRepositories)[]) {
        result[key] = useRepo(repositories[key]) as ReactiveRepositories<TRepositories>[typeof key];
    }

    return result;
}


export interface UseDbOptions extends CreateReposOptions {
    db?: DatabaseConfig
}

/**
 * Creates a reactive database from model classes and/or repositories.
 *
 * @param input - Repository definitions or iterable model/repository entries.
 * @param config - Database configuration.
 * @returns Reactive database.
 */
export function useDb<TDefinitions extends RepositoryDefinitionsInput> (
    definitions: TDefinitions,
    options: UseDbOptions = {}
) {
    type TRepositories = RepositoriesFrom<TDefinitions>;
    const rawRepositories = createRepos(definitions, options)
    const database: Database<TRepositories> = createDb(rawRepositories, options.db);
    const repositories = useDbRepos(database)

    return {
        db: database,
        repositories,

        async fetchRelation<
            TRepository extends keyof TRepositories,
            TRelation extends keyof RepositoryRelations<TRepositories[TRepository]>,
            TOptions extends ApiOptions = ApiOptions
        >(
            repository: TRepository,
            item: RepositoryModel<TRepositories[TRepository]>,
            relation: TRelation,
            options?: TOptions
        ) {
            return repositories[repository].fetchRelation(item, relation, options);
        },

        fetchRelations<
            TRepository extends keyof TRepositories,
            TRelation extends keyof RepositoryRelations<TRepositories[TRepository]>,
            TOptions extends ApiOptions = ApiOptions
        >(
            repository: TRepository,
            items: Iterable<RepositoryModel<TRepositories[TRepository]>>,
            relations?: TRelation[],
            options?: TOptions
        ) {
            return repositories[repository].fetchRelations(items, relations, options);
        }
    };
}


/**
 * Creates reactive database repositories.
 *
 * @param database Database containing the repositories.
 * @returns Reactive repositories enriched with relation methods.
 */
export function useDbRepos<
    TRepositories extends Repositories
>(
    database: Database<TRepositories>
): ReactiveDbRepositories<TRepositories, typeof database> {
    const repositories = useRepos(database.repositories);

    for (const name of Object.keys(repositories) as (keyof TRepositories)[]) {
        useDbRepo(repositories[name], database);
    }

    return repositories as ReactiveDbRepositories<TRepositories, typeof database>;
}

/**
 * Extracts the model instance type from a repository.
 */
type RepositoryItem<TRepository extends AnyRepository> =
    TRepository extends Repository<infer TModel> ? TModel : never;

/**
 * Adds database-aware relation methods to a reactive repository.
 *
 * @param reactiveRepository Reactive repository to extend.
 * @param database Database used for relation resolution.
 * @returns The enriched reactive repository.
 */
/**
 * Adds database-aware relation methods to a reactive repository.
 *
 * @param reactiveRepository Reactive repository to extend.
 * @param database Database used for relation resolution.
 * @returns The enriched reactive repository.
 */
export function useDbRepo<
    TModel extends Model,
    TApi extends IApiClient<TModel>,
    TModelClass extends ModelClass<TModel>,
    TRepository extends Repository<TModel, TApi, TModelClass>,
    TRepositories extends Repositories
>(
    reactiveRepository: ReactiveRepository<TModel, TApi, TModelClass, TRepository>,
    database: Database<TRepositories>
): ReactiveDbRepository<TModel, TApi, Database<TRepositories>, TModelClass, TRepository> {
    const repository = reactiveRepository.repository;
    const definitions = repository.model.relations as RepositoryRelations<TRepository>;

    return Object.assign(reactiveRepository, {
        getWith(
            id: MaybeRefOrGetter<ModelId>,
            relations: (keyof RepositoryRelations<TRepository>)[]
        ) {
            return computed(() => {
                const item = repository.store.get(toValue(id));

                if (!item)
                    return undefined;

                return database.resolve(item.value, definitions, relations);
            });
        },

        getManyWith(
            ids: MaybeRefOrGetter<ModelId[]>,
            relations: (keyof RepositoryRelations<TRepository>)[]
        ) {
            return computed(() => {
                const items = repository.store.getMany(toValue(ids));

                return database.resolveMany(
                    Array.from(items.values(), item => item.value),
                    definitions,
                    relations
                );
            });
        },

        async fetchRelation<
            TRelation extends keyof RepositoryRelations<TRepository>,
            TOptions extends ApiOptions = ApiOptions
        >(
            item: TModel,
            relation: TRelation,
            options?: TOptions
        ) {
            const [result] = await database.fetchRelations([item], definitions, [relation], options);
            return result;
        },

        fetchRelations<
            TRelation extends keyof RepositoryRelations<TRepository>,
            TOptions extends ApiOptions = ApiOptions
        >(
            items: Iterable<TModel>,
            relations?: TRelation[],
            options?: TOptions
        ) {
            return database.fetchRelations(items, definitions, relations, options);
        }
    });
}
