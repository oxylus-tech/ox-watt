// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import { createApp, defineComponent, h } from 'vue';

import { configKey, provideConfig } from '@/composables';
import { createRepo, createRepos } from '@/adm/composables';

import { User, Article, useDb } from '../fixtures';
import { FakeApiClient } from '../api.fixtures';
import { withSetup, withNestedSetup } from '../../composables/fixtures';

import { Repository, Model } from '@/adm';
import type { RepositoryClass } from '@/adm';
import type { Config } from '@/config';


/**
 * Custom repository used to verify repository class overrides.
 */
class CustomRepository<TModel extends Model>
    extends Repository<TModel> {}


class GlobalApiClient<TModel extends Model> extends FakeApiClient<TModel> {
}


/**
 * Runs the repository creation tests.
 */
describe('createRepo', () => {
    it('creates a repository for a model', () => {
        const repository = withSetup(() => createRepo(User));

        expect(repository).toBeInstanceOf(Repository);
        expect(repository.store).toBeDefined();
    });

    it('uses the provided repository class', () => {
        const repository = withSetup(() => createRepo(
            User,
            {},
            { repositoryClass: CustomRepository as RepositoryClass },
        ));

        expect(repository).toBeInstanceOf(CustomRepository);
    });

    it('uses the global repository class', () => {
        const repository = withSetup(
            () => createRepo(User),
            {
                repositoryClass: CustomRepository as RepositoryClass,
            },
        );

        expect(repository).toBeInstanceOf(CustomRepository);
    });

    it('uses the provided API client class', () => {
        const repository = withSetup(() => createRepo(
            User,
            {},
            { apiClass: FakeApiClient },
        ));

        expect(repository.api()).toBeInstanceOf(FakeApiClient);
    });

    it('uses the global API client class', () => {
        const repository = withSetup(
            () => createRepo(User),
            {
                apiClass: FakeApiClient,
            },
        );

        expect(repository.api()).toBeInstanceOf(FakeApiClient);
    });

    it('merges the global repository configuration with the local configuration', () => {
        const repository = withSetup(
            () => createRepo(User, {
                api: { headers: { 'X-Local': 'local', }, },
            }),
            {
                repository: {
                    api: { headers: { 'X-Global': 'global', }, },
                },
            },
        );

        expect(repository.config.api?.headers).toMatchObject({
            'X-Global': 'global',
            'X-Local': 'local',
        });
    });

    it('ignores the global configuration when noGlobal is true', () => {
        const repository = withSetup(
            () => createRepo(User, {}, { noGlobal: true }),
            {
                repository: {
                    api: {
                        headers: {
                            'X-Global': 'global',
                        },
                    },
                },
                apiClass: FakeApiClient,
                repositoryClass: CustomRepository as RepositoryClass,
            },
        );

        expect(repository).toBeInstanceOf(Repository);
        expect(repository).not.toBeInstanceOf(CustomRepository);
        expect(repository.config.api?.headers).toEqual({});
    });

    it('uses explicit options when noGlobal is true', () => {
        const repository = withSetup(
            () => createRepo(
                User,
                {},
                {
                    noGlobal: true,
                    apiClass: FakeApiClient,
                    repositoryClass: CustomRepository as RepositoryClass,
                },
            ),
            {
                apiClass: GlobalApiClient,
                repositoryClass: Repository,
            },
        );

        expect(repository).toBeInstanceOf(CustomRepository);
        expect(repository.api()).toBeInstanceOf(FakeApiClient);
    });
});

describe('createRepos', () => {
    it('creates repositories from model classes', () => {
        const repositories = withSetup(() => createRepos({
            users: User,
            articles: Article,
        }));

        expect(repositories.users).toBeInstanceOf(Repository);
        expect(repositories.articles).toBeInstanceOf(Repository);
    });

    it('preserves existing repository instances', () => {
        const existing = withSetup(() => createRepo(User));

        const repositories = withSetup(() => createRepos({
            users: existing,
            articles: Article,
        }));

        expect(repositories.users).toBe(existing);
        expect(repositories.articles).toBeInstanceOf(Repository);
    });

    it('uses the provided repository class', () => {
        const repositories = withSetup(() => createRepos(
            {
                users: User,
                articles: Article,
            },
            {
                repositoryClass: CustomRepository as RepositoryClass,
            },
        ));

        expect(repositories.users).toBeInstanceOf(CustomRepository);
        expect(repositories.articles).toBeInstanceOf(CustomRepository);
    });

    it('uses the global repository class', () => {
        const repositories = withSetup(
            () => createRepos({
                users: User,
                articles: Article,
            }),
            {
                repositoryClass: CustomRepository as RepositoryClass,
            },
        );

        expect(repositories.users).toBeInstanceOf(CustomRepository);
        expect(repositories.articles).toBeInstanceOf(CustomRepository);
    });

    it('uses the provided API client class', () => {
        const repositories = withSetup(() => createRepos(
            {
                users: User,
                articles: Article,
            },
            {
                apiClass: FakeApiClient,
            },
        ));

        expect(repositories.users.api()).toBeInstanceOf(FakeApiClient);
        expect(repositories.articles.api()).toBeInstanceOf(FakeApiClient);
    });

    it('uses the global API client class', () => {
        const repositories = withSetup(
            () => createRepos({
                users: User,
                articles: Article,
            }),
            {
                apiClass: FakeApiClient,
            },
        );

        expect(repositories.users.api()).toBeInstanceOf(FakeApiClient);
        expect(repositories.articles.api()).toBeInstanceOf(FakeApiClient);
    });

    it('uses the explicit API configuration instead of the global API configuration', () => {
        const repositories = withSetup(
            () => createRepos(
                {
                    users: User,
                },
                {
                    api: {
                        headers: {
                            'X-Explicit': 'explicit',
                        },
                    },
                },
            ),
            {
                api: {
                    headers: {
                        'X-Global': 'global',
                    },
                },
            },
        );

        expect(repositories.users.config.api?.headers).toEqual({
            'X-Explicit': 'explicit',
        });
    });

    it('merges the common API configuration with the repository-specific configuration', () => {
        const repositories = withSetup(
            () => createRepos(
                {
                    users: User,
                },
                {
                    api: {
                        headers: {
                            'X-Common': 'common',
                        },
                    },
                    config: {
                        users: {
                            api: {
                                headers: {
                                    'X-Local': 'local',
                                },
                            },
                        },
                    },
                },
            ),
        );

        expect(repositories.users.config.api?.headers).toMatchObject({
            'X-Common': 'common',
            'X-Local': 'local',
        });
    });

    it('uses the global API configuration when no explicit API configuration is provided', () => {
        const repositories = withSetup(
            () => createRepos({
                users: User,
            }),
            {
                repository: {
                    api: {
                        headers: { 'X-Global': 'global', },
                    },
                }
            },
        );

        expect(repositories.users.config.api?.headers).toMatchObject({
            'X-Global': 'global',
        });
    });

    it('does not use global configuration when noGlobal is true', () => {
        const repositories = withSetup(
            () => createRepos(
                {
                    users: User,
                    articles: Article,
                },
                { noGlobal: true, },
            ),
            {
                api: {
                    headers: {
                        'X-Global': 'global',
                    },
                },
                repositoryClass: CustomRepository as RepositoryClass,
                apiClass: FakeApiClient,
            },
        );

        expect(repositories.users).toBeInstanceOf(Repository);
        expect(repositories.users).not.toBeInstanceOf(CustomRepository);
        expect(repositories.users.config.api?.headers).toEqual({});
    });

    it('does not modify existing repository instances', () => {
        const existing = withSetup(() => createRepo(User, {
            api: {
                headers: {
                    'X-Existing': 'existing',
                },
            },
        }));

        const originalConfig = existing.config;

        const repositories = withSetup(
            () => createRepos(
                {
                    users: existing,
                },
                {
                    api: {
                        headers: {
                            'X-Common': 'common',
                        },
                    },
                },
            ),
        );

        expect(repositories.users).toBe(existing);
        expect(existing.config).toBe(originalConfig);
        expect(existing.config.api?.headers).toEqual({
            'X-Existing': 'existing',
        });
    });
});
