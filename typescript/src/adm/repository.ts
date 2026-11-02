import { reactive, shallowRef, isRef, type ShallowRef } from 'vue'

import type { Database } from './database'
import type { IApiClient, ApiConfig, ApiClientClass, ApiRequest } from './api.types'
import type {
    Model,
    ModelDeserializeOptions,
    ModelSerializeOptions,
    ModelStoreGetOptions,
    ModelClass
} from './model';
import type { RelationDefinitions } from './model.types'

import { mergeApiConfig } from './api'
import { ModelStore, } from './model';


/** Repository configuration */
export interface RepositoryConfig {
    /** API configuration. */
    api?: ApiConfig
}


/** Repository constructor class. */
export interface RepositoryClass {
    new <
        TModel extends Model,
        TApi extends IApiClient<TModel> = IApiClient<TModel>,
    >(
        model: ModelClass<TModel>,
        config: RepositoryConfig,
        apiClass?: ApiClientClass,
        store?: ModelStore<TModel>
    ): Repository<TModel, TApi>;
}

/**
 * Any repository instance accepted by a database.
 */
export type AnyRepository = Repository<any, IApiClient<any>>;

/**
 * Defines the repositories available in a database.
 */
export type Repositories = Record<string, AnyRepository>;

/**
 * Extracts the model type handled by a repository.
 */
export type RepositoryModel<TRepository> =
    TRepository extends Repository<infer TModel> ? TModel : never;

/** 
 * Extracts the api type handled by a repository.
 */
export type RepositoryApi<TRepository> =
    TRepository extends Repository<any, infer TApi> ? TApi : never;

/**
 * Gets the relation definitions from a repository's model class.
 */
export type RepositoryRelations<TRepository extends Repository<any, any, any>> =
    TRepository['model'] extends { relations: infer TDefinitions extends RelationDefinitions }
        ? TDefinitions
        : never;

/**
 * A repository definition is either a model class or an existing repository.
 */
export type RepositoryDefinition = ModelClass | AnyRepository;

/**
 * Named repository definitions.
 */
export type RepositoryDefinitions = Record<string, RepositoryDefinition>;

/**
 * Accepted inputs for repository creation.
 */
export type RepositoryDefinitionsInput =
    | RepositoryDefinitions
    | Iterable<RepositoryDefinition>;

/**
 * Resolves repository instances from repository definitions.
 */
export type RepositoriesFrom<
    TDefinitions extends RepositoryDefinitionsInput
> =
    TDefinitions extends Iterable<infer TDefinition extends RepositoryDefinition>
        ? Record<string, RepositoryFrom<TDefinition>>
        : TDefinitions extends RepositoryDefinitions
            ? {
                [K in keyof TDefinitions]: RepositoryFrom<TDefinitions[K]>
            }
            : never;

/**
 * Resolves a repository instance from a single definition.
 */
export type RepositoryFrom<TDefinition extends RepositoryDefinition> =
    TDefinition extends AnyRepository
        ? TDefinition
        : TDefinition extends ModelClass<infer TModel>
            ? Repository<TModel>
            : never;


/**
 * Merges repository configurations.
 *
 * The API configuration is merged separately using mergeApiConfig.
 * Repository-level options from the specific configuration take precedence.
 *
 * @param base Base repository configuration.
 * @param override Repository-specific configuration.
 * @returns Merged repository configuration.
 */
export function mergeRepositoryConfig(
    base: RepositoryConfig = {},
    override: RepositoryConfig = {},
): RepositoryConfig {
    return {
        ...base,
        ...override,
        api: mergeApiConfig(base.api, override.api),
    };
}


/**
 * Repository responsible for the local storage and context of a model type.
 *
 * An instance is normally created and managed by a Database.
 */
export class Repository<
    TModel extends Model,
    TApi extends IApiClient<TModel> = IApiClient<TModel>,
    TModelClass extends ModelClass<TModel> = ModelClass<TModel>,
> {
    /** Local storage for instances of this model. */
    readonly store: ModelStore<TModel>;

    /**
     * Initializes a repository for a model class.
     *
     * @param model The model class managed by this repository.
     * @param config Repository-specific configuration.
     * @param apiClass The API client class used for remote operations.
     * @param store An existing model store to use with this repository.
     */
    constructor(
        readonly model: ModelClass<TModel>,
        readonly config: RepositoryConfig,
        readonly apiClass?: ApiClientClass,
        store?: ModelStore<TModel>,
    ) {
        this.store = store ?? new ModelStore<TModel>(model)
    }

    /**
     * Returns a new API client instance, or null if no API client is configured.
     */
    api(): TApi | null {
        const apiClass = this.apiClass
        if(!apiClass)
            return null

        return new apiClass(this.model, this.config?.api ?? {}, this.store) as TApi
    }

    /** Returns the name of the model managed by this repository. */
    get modelName(): string {
        return this.model.modelName;
    }

    /** Retrieves a model from model store by its identifier. */
    getRaw(id: unknown): TModel | undefined {
        return this.store.getRaw(id);
    }

    /** Retrieves a model from model store by its identifier. */
    get(id: unknown): ShallowRef<TModel> | undefined {
        return this.store.get(id);
    }

    /** Retrieves multiple models from model store by their identifiers. */
    getMany(ids: Iterable<unknown>): Map<unknown, ShallowRef<TModel>> {
        return this.store.getMany(ids);
    }

    /** Checks whether a model with the given identifier exists in local storage. */
    has(id: unknown): boolean {
        return this.store.has(id);
    }

    /**
     * Stores a model in local storage.
     *
     * @param model The model to store.
     * @returns The stored model.
     * @throws Error if the model has no identifier.
     */
    set(model: TModel): ShallowRef<TModel> {
        return this.store.set(model);
    }

    /** Stores multiple models in local storage. */
    setMany(models: Iterable<TModel>): ShallowRef<TModel>[] {
        return this.store.setMany(models);
    }

    /** Removes a model from local storage by its identifier. */
    delete(id: unknown): boolean {
        return this.store.delete(id);
    }

    /** Clears the local storage associated with this repository. */
    clear(): void {
        this.store.clear();
    }

    /**
     * Deserializes model data, providing the repository as context.
     *
     * Note: the model view is returned on save.
     * 
     * @param input The raw model data to deserialize.
     * @param options Options controlling the deserialization process.
     * @returns The deserialized model instance.
     */
    deserialize(input: unknown, options?: ModelDeserializeOptions): ShallowRef<TModel> {
        const item = this.model.deserialize(input, options) as TModel;
        if(options?.save)
            return this.store.set(item)
        return shallowRef(item)
    }

    /**
     * Serializes a model, providing the repository as context.
     *
     * @param model The model to serialize.
     * @param options Options controlling the serialization process.
     * @returns The serialized model data.
     */
    serialize(model: TModel|ShallowRef<TModel>, options?: ModelSerializeOptions): Record<string, unknown> {
        if(isRef(model))
            return (model as ShallowRef<TModel>).value.serialize(options)
        return (model as TModel).serialize(options);
    }
}
