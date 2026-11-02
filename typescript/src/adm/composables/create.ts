import { isIterable } from '@/utils'
import { useConfig } from '@/composables/config'

import type { ApiClientClass, ApiConfig } from '../api.types'
import type { Model, ModelClass } from '../model'
import type {
    RepositoryConfig,
    RepositoryClass,
    RepositoriesFrom,
    Repositories,
    AnyRepository,
    RepositoryDefinition,
    RepositoryDefinitionsInput,
    RepositoryRelations
} from '../repository'

import { Database, type DatabaseConfig } from '../database'
import { mergeApiConfig, HttpClient } from '../api'
import { Repository, mergeRepositoryConfig } from '../repository'


export interface CreateRepoOptions {
    /** Repository class **/
    repositoryClass?: RepositoryClass;
    /** ApiClient class to use */
    apiClass?: ApiClientClass;
    /** Don't use provided global config. */
    noGlobal?: boolean
}

export interface CreateReposOptions extends CreateRepoOptions {
    /** Configuration of repositories by name. */
    config?: Record<string, RepositoryConfig>;
    /** Common API config overriding  */
    api?: ApiConfig
}


/**
 * Creates a repository for a model class.
 *
 * @param model Model class managed by the repository.
 * @param config Repository-specific configuration.
 * @param options Repository and API client constructors.
 * @returns The created repository.
 */
export function createRepo<
    TModel extends Model,
    TRepository extends Repository<TModel> = Repository<TModel>
>(
    model: ModelClass<TModel>,
    config: RepositoryConfig = {},
    options: CreateRepoOptions = {}
): Repository<TModel> {
    const globalConfig = options.noGlobal ? undefined : useConfig()
    const RepositoryType = options.repositoryClass ??
                           globalConfig?.repositoryClass ??
                           Repository;
    const apiClass = options.apiClass ?? globalConfig?.apiClass ?? HttpClient
    const mergedConfig = mergeRepositoryConfig(globalConfig?.repository, config)
    return new RepositoryType(model, mergedConfig, apiClass);
}


/**
 * Creates a collection of repositories from model classes and existing instances.
 *
 * @param definitions Model classes or existing repository instances.
 * @param options Default repository configuration and constructors.
 * @returns The created repository collection.
 */
export function createRepos<
    TDefinitions extends RepositoryDefinitionsInput
>(
    definitions: TDefinitions,
    options: CreateReposOptions = {}
): RepositoriesFrom<TDefinitions> {
    const repositories: Record<string, AnyRepository> = {};
    const globalConfig = options.noGlobal ? undefined : useConfig();
    const repositoryClass = options.repositoryClass ?? globalConfig?.repositoryClass;
    const apiClass = options.apiClass ?? globalConfig?.apiClass;

    const entries: [string, RepositoryDefinition][] = isIterable(definitions)
        ? Array.from(definitions, (definition) => [
            definition instanceof Repository
                ? definition.model.modelName
                : definition.modelName,
            definition
        ])
        : Object.entries(definitions);

    for (const [name, definition] of entries) {
        if (definition instanceof Repository) {
            repositories[name] = definition;
            continue;
        }

        const config = mergeRepositoryConfig(
            {
                ...globalConfig?.repository,
                api: options.api ?? globalConfig?.repository?.api
            },
            options.config?.[name] ?? {}
        );
        repositories[name] = createRepo(
            definition,
            config,
            {
                ...options,
                repositoryClass, apiClass,
                noGlobal: true
            }
        );
    }

    return repositories as RepositoriesFrom<TDefinitions>;
}


/**
 * Creates a database from existing repositories.
 *
 * @param repositories Repository instances.
 * @param config Database configuration.
 * @returns The created database.
 */
export function createDb<TRepositories extends Repositories>(
    repositories: TRepositories,
    config?: DatabaseConfig
): Database<TRepositories> {
    return new Database(repositories, config);
}

