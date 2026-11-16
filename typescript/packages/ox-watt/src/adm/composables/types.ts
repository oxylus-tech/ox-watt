import type { MaybeRefOrGetter, ComputedRef } from 'vue'

import type { KeySource } from '@/utils'
import type { IApiClient, ApiOptions, ApiResult } from '../api.types'
import type { Database } from '../database'
import type { Model, ModelId, ModelClass, ModelStore } from '../model'
import type { ResolvedRelations } from '../model.types'
import type {
    Repository,
    RepositoryRelations,
    Repositories,
    AnyRepository,
    RepositoriesFrom,
    RepositoryModel,
    RepositoryDefinitionsInput
} from '../repository'

import type { BaseUseApiResult, UseFetchOptions, UseApiResult} from './api' 


export interface ReactiveRepository<
    TModel extends Model,
    TApi extends IApiClient<TModel>,
    TModelClass extends ModelClass<TModel> = ModelClass<TModel>,
    TRepository extends Repository<TModel, TApi, TModelClass> = Repository<TModel, TApi, TModelClass>
> {
    /** Underlying repository instance */
    readonly repository: TRepository;

    /**
     * Retrieves an item reactively.
     *
     * @param id - Model identifier or reactive identifier.
     */
    get(id: MaybeRefOrGetter<ModelId>): ComputedRef<ReturnType<ModelStore<TModel>['get']>>;

    /**
     * Retrieves multiple items reactively.
     *
     * @param ids - Model identifiers or reactive identifiers.
     */
    getMany(ids: MaybeRefOrGetter<ModelId[]>): ComputedRef<ReturnType<ModelStore<TModel>['getMany']>>;


    fetch(
        id: MaybeRefOrGetter<ModelId>,
        apiOptions?: MaybeRefOrGetter<ApiOptions>,
        fetchOptions?: UseFetchOptions
    ): BaseUseApiResult<ApiResult<TModel> | null>;

    fetchMany(
        ids: MaybeRefOrGetter<ModelId[]>,
        apiOptions?: MaybeRefOrGetter<ApiOptions>,
        fetchOptions?: UseFetchOptions
    ): BaseUseApiResult<ApiResult<TModel> | null>;
}


/**
 * Maps a repository collection to its reactive equivalents.
 */
export type ReactiveRepositories<TRepositories extends Repositories> = {
    [K in keyof TRepositories]: TRepositories[K] extends Repository<
        infer TModel,
        infer TApi,
        infer TModelClass
    >
        ? ReactiveRepository<TModel, TApi, TModelClass, TRepositories[K]>
        : never;
};

/**
 * Reactive repository with database relation resolution.
 */
export interface ReactiveDbRepository<
    TModel extends Model,
    TApi extends IApiClient<TModel>,
    TDatabase extends Database,
    TModelClass extends ModelClass<TModel> = ModelClass<TModel>,
    TRepository extends Repository<TModel, TApi, TModelClass> = Repository<TModel, TApi, TModelClass>
> extends ReactiveRepository<TModel, TApi, TModelClass, TRepository>
{
    /**
     * Retrieves an item reactively and resolves its relations.
     *
     * @param id - Model identifier or reactive identifier.
     * @param relations - Relation names to resolve.
     */
    getWith(
        id: MaybeRefOrGetter<ModelId>,
        relations: (keyof RepositoryRelations<TRepository>)[]
    ): ComputedRef<ResolvedRelations<TModel, RepositoryRelations<TRepository>, TDatabase['repositories']> | undefined>;

    /**
     * Retrieves multiple items reactively and resolves their relations.
     *
     * @param ids - Model identifiers or reactive identifiers.
     * @param relations - Relation names to resolve.
     */
    getManyWith(
        ids: MaybeRefOrGetter<ModelId[]>,
        relations: (keyof RepositoryRelations<TRepository>)[]
    ): ComputedRef<ResolvedRelations<TModel, RepositoryRelations<TRepository>, TDatabase['repositories'], true>[]>;

    /**
     * Fetches one relation for a model instance.
     *
     * @param item Source model instance.
     * @param relation Name of the relation to fetch.
     * @param options API request options.
     * @returns The source item together with its resolved relation.
     */
    fetchRelation<
        TRelation extends keyof RepositoryRelations<TRepository>,
        TOptions extends ApiOptions = ApiOptions
    >(
        item: TModel,
        relation: TRelation,
        options?: TOptions
    ): Promise<
        ResolvedRelations<
            TModel,
            RepositoryRelations<TRepository>,
            TDatabase['repositories'],
            TOptions extends { save: true } ? true : false
        >
    >;

    /**
     * Fetches relations for multiple model instances.
     *
     * @param items Source model instances.
     * @param relations Names of the relations to fetch. Defaults to all relations.
     * @param options API request options.
     * @returns The source items together with their resolved relations.
     */
    fetchRelations<
        TRelation extends keyof RepositoryRelations<TRepository>,
        TOptions extends ApiOptions = ApiOptions
    >(
        items: Iterable<TModel>,
        relations?: TRelation[],
        options?: TOptions
    ): Promise<
        ResolvedRelations<
            TModel,
            RepositoryRelations<TRepository>,
            TDatabase['repositories'],
            TOptions extends { save: true } ? true : false
        >[]
    >;
}

/**
 * Maps database repositories to their reactive wrappers.
 */
export type ReactiveDbRepositories<
    TRepositories extends Repositories,
    TDatabase extends Database<TRepositories> = Database<TRepositories>
> = {
    [K in keyof TRepositories]:
        TRepositories[K] extends Repository<
            infer TModel,
            infer TApi,
            infer TModelClass
        >
            ? ReactiveDbRepository<
                TModel,
                TApi,
                TDatabase,
                TModelClass,
                TRepositories[K]
            >
            : never;
};


/**
 * Return type of useDb for a given set of repository definitions.
 */
export interface ReactiveDatabaseFrom<
    TDefinitions extends RepositoryDefinitionsInput
> {
    /** Underlying database instance. */
    db: Database<RepositoriesFrom<TDefinitions>>;

    /** Reactive database repositories. */
    repositories: ReactiveDbRepositories<
        RepositoriesFrom<TDefinitions>,
        Database<RepositoriesFrom<TDefinitions>>
    >;

    /**
     * Fetches one relation for a model instance from a repository.
     *
     * @param repository Name of the source repository.
     * @param item Source model instance.
     * @param relation Name of the relation to fetch.
     * @param options API request options.
     * @returns The source item together with its resolved relation.
     */
    fetchRelation<
        TRepository extends keyof RepositoriesFrom<TDefinitions>,
        TRelation extends keyof RepositoryRelations<RepositoriesFrom<TDefinitions>[TRepository]>,
        TOptions extends ApiOptions = ApiOptions
    >(
        repository: TRepository,
        item: RepositoryModel<RepositoriesFrom<TDefinitions>[TRepository]>,
        relation: TRelation,
        options?: TOptions
    ): Promise<
        ResolvedRelations<
            RepositoryModel<RepositoriesFrom<TDefinitions>[TRepository]>,
            RepositoryRelations<RepositoriesFrom<TDefinitions>[TRepository]>,
            RepositoriesFrom<TDefinitions>,
            TOptions extends { save: true } ? true : false
        >
    >;

    /**
     * Fetches relations for multiple model instances from a repository.
     *
     * @param repository Name of the source repository.
     * @param items Source model instances.
     * @param relations Names of the relations to fetch. Defaults to all relations.
     * @param options API request options.
     * @returns The source items together with their resolved relations.
     */
    fetchRelations<
        TRepository extends keyof RepositoriesFrom<TDefinitions>,
        TRelation extends keyof RepositoryRelations<RepositoriesFrom<TDefinitions>[TRepository]>,
        TOptions extends ApiOptions = ApiOptions
    >(
        repository: TRepository,
        items: Iterable<RepositoryModel<RepositoriesFrom<TDefinitions>[TRepository]>>,
        relations?: TRelation[],
        options?: TOptions
    ): Promise<
        ResolvedRelations<
            RepositoryModel<RepositoriesFrom<TDefinitions>[TRepository]>,
            RepositoryRelations<RepositoriesFrom<TDefinitions>[TRepository]>,
            RepositoriesFrom<TDefinitions>,
            TOptions extends { save: true } ? true : false
        >[]
    >;
}
