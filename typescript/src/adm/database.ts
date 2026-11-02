import { unref } from 'vue'

import { getKeysBy } from '@/utils';

import type { Model, ModelClass, ModelStore } from './model';
import type { ResolvedRelations, RelationDefinitions } from './model.types'
import type {
    RepositoryConfig,
    RepositoryClass,
    Repositories,
    AnyRepository,
    RepositoryModel
} from './repository'
import type { ApiConfig, ApiClientClass, ApiOptions } from './api.types'

import { Repository } from './repository';
import { HttpClient } from './api';


/** Database configuration. */
export interface DatabaseConfig {
    api?: ApiConfig;
    repositories?: Record<string, RepositoryConfig>
}

/**
 * Central entrypoint owning multiple repositories.
 */
export class Database<
    TRepositories extends Repositories = Repositories
> {
    readonly repositories: TRepositories;

    constructor(
        repositories: TRepositories = {} as TRepositories,
        readonly config: DatabaseConfig = {},
        readonly repositoryClass: RepositoryClass = Repository,
        readonly apiClass: ApiClientClass = HttpClient,
    ) {
        this.repositories = { ...repositories };
    }

    /**
     * Returns a repository by its registered name.
     *
     * @param name Repository identifier.
     */
    get<TKey extends keyof TRepositories>(name: TKey): TRepositories[TKey] {
        const repository = this.repositories[name as string];

        if (!repository)
            throw new Error(`Repository "${String(name)}" not found.`);

        return repository as TRepositories[TKey];
    }

    /** Clear all repositories data. */
    clear(): void {
        for (const repository of Object.values(this.repositories))
            repository.clear();
    }

    /**
     * Resolves selected relations for multiple model instances.
     *
     * @param items Source model instances.
     * @param definitions Relation definitions available for resolution.
     * @param relations Names of the relations to resolve. Defaults to all relations.
     * @returns Source items together with their resolved relations.
     */
    resolveMany<
        TModel extends Model,
        TDefinitions extends RelationDefinitions
    >(
        items: Iterable<TModel>,
        definitions: TDefinitions,
        relations: (keyof TDefinitions)[] = Object.keys(definitions) as (keyof TDefinitions)[]
    ): ResolvedRelations<TModel, TDefinitions, TRepositories>[] {
        const sources = Array.isArray(items) ? items : [...items];
        if (sources.length === 0)
            return [];

        const results = new Map<
            unknown,
            ResolvedRelations<TModel, TDefinitions, TRepositories, true>
        >();

        for (const item of sources)
            results.set(item.$id, { item, relations: {} });

        for (const relationName of relations) {
            const definition = definitions[relationName];
            const repository = this.repositories[definition.repository];

            if (!repository)
                throw new Error(
                    `Repository "${definition.repository}" not found for relation "${String(relationName)}".`
                );

            const resolved = repository.store.getBy(
                sources,
                definition.source,
                undefined,
                (item: TModel) => item.$id
            );

            for (const [id, value] of resolved) {
                const result = results.get(id);
                if (result)
                    (result.relations as Record<string, unknown>)[String(relationName)] = value;
            }
        }

        return Array.from(results.values());
    }

    /**
     * Resolves selected relations for a single model instance.
     *
     * @param item Source model instance.
     * @param definitions Relation definitions available for resolution.
     * @param relations Names of the relations to resolve. Defaults to all relations.
     * @returns The source item together with its resolved relations.
     */
    resolve<
        TModel extends Model,
        TDefinitions extends RelationDefinitions
    >(
        item: TModel,
        definitions: TDefinitions,
        relations?: (keyof TDefinitions)[]
    ): ResolvedRelations<TModel, TDefinitions, TRepositories> {
        return this.resolveMany([item], definitions, relations)[0];
    }

    /**
     * Fetches selected relations for multiple model instances.
     *
     * @param items Source model instances.
     * @param definitions Relation definitions available for fetching.
     * @param relations Names of the relations to fetch. Defaults to all relations.
     * @param options Options forwarded to the repository API.
     * @returns Source items together with their fetched relations.
     */
    async fetchRelations<
        TModel extends Model,
        TDefinitions extends RelationDefinitions,
        TOptions extends ApiOptions
    >(
        items: Iterable<TModel>,
        definitions: TDefinitions,
        relations: (keyof TDefinitions)[] = Object.keys(definitions) as (keyof TDefinitions)[],
        options?: TOptions
    ): Promise<
        ResolvedRelations<
            TModel,
            TDefinitions,
            TRepositories,
            TOptions extends { save: true } ? true : false
            >[]
        >
    {
        const sources = Array.isArray(items) ? items : [...items];
        if (sources.length === 0)
            return [];

        const results = new Map<unknown, ResolvedRelations<TModel, TDefinitions, TRepositories, false>>();

        for (const item of sources)
            results.set(item.$id, {item, relations: {} });

        await Promise.all(
            relations.map(async relationName => {
                // TODO: move out
                const definition = definitions[relationName];
                const repository = this.repositories[definition.repository];

                if (!repository) {
                    throw new Error(
                        `Repository "${definition.repository}" not found for relation "${String(relationName)}".`
                    );
                }
                const api = repository.api();

                if (!api) {
                    throw new Error(
                        `API unavailable for repository "${definition.repository}" (relation "${String(relationName)}").`
                    );
                }

                const result = await api.fetchBy(sources, definition.source, options);
                const relatedItems = result?.items ?? [];
                const idField = repository.model.idField;

                const relatedById = new Map(
                    relatedItems.map(item => {
                        const model = unref(item);
                        return [model[idField], item];
                    })
                );

                for (const source of sources) {
                    const ids = getKeysBy([source], definition.source);
                    const values = Array.from(ids).flatMap(id => {
                        const item = relatedById.get(id);
                        return item === undefined ? [] : item
                    })
                    const target = results.get(source.$id);

                    if (target) {
                        (target.relations as Record<string, unknown>)[String(relationName)] =
                            definition.many ? values : values[0];
                    }
                }

            })
        );

        return Array.from(results.values());
    }
}
