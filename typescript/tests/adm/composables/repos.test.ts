import { nextTick, ref, computed } from 'vue';
import { describe, expect, it, vi } from 'vitest';

import type { ApiOptions } from '@/adm';
import {
    useRepo,
    useRepos,
    useDbRepo,
    useDbRepos,
    useDb as useReactiveDb
} from '@/adm/composables/repos';

import {
    User,
    Article,
    useDb as createTestDb,
    useArticle,
    repoConfigs,
    dbConfig
} from '../fixtures';

import { FakeApiClient, config as apiConfig } from '../api.fixtures';
import { withSetup } from '../../composables/fixtures';


describe('useRepo', () => {
    it('wraps an existing repository', () => {
        const { users } = createTestDb();
        const repository = useRepo(users);

        expect(repository.repository).toBe(users);
        expect(repository.get).toBeInstanceOf(Function);
        expect(repository.getMany).toBeInstanceOf(Function);
        expect(repository.fetch).toBeInstanceOf(Function);
        expect(repository.fetchMany).toBeInstanceOf(Function);
    });

    it('returns a computed value from get()', () => {
        const { users } = createTestDb();
        const id = ref('user-1');
        const expected = ref(new User());

        const get = vi.spyOn(users.store, 'get')
            .mockReturnValue(expected as never);

        const repository = useRepo(users);
        const result = repository.get(id);

        expect(result.value).toBe(expected);
        expect(get).toHaveBeenCalledWith('user-1');

        id.value = 'user-2';

        expect(result.value).toBe(expected);
        expect(get).toHaveBeenLastCalledWith('user-2');
    });

    it('returns a computed value from getMany()', () => {
        const { users } = createTestDb();
        const ids = ref(['user-1', 'user-2']);
        const expected = new Map();

        const getMany = vi.spyOn(users.store, 'getMany')
            .mockReturnValue(expected as never);

        const repository = useRepo(users);
        const result = repository.getMany(ids);

        expect(result.value).toBe(expected);
        expect(getMany).toHaveBeenCalledWith(['user-1', 'user-2']);

        ids.value = ['user-3'];

        expect(result.value).toBe(expected);
        expect(getMany).toHaveBeenLastCalledWith(['user-3']);
    });

    it('fetches one item through the repository API', async () => {
        const { users } = createTestDb();
        const response = { items: [] };

        const api = {
            get: vi.fn().mockResolvedValue(response)
        };

        vi.spyOn(users, 'api').mockReturnValue(api as never);

        const repository = useRepo(users);
        const result = repository.fetch('user-1');

        await expect(result.execute()).resolves.toBe(response);

        expect(users.api).toHaveBeenCalledOnce();
        expect(api.get).toHaveBeenCalledWith('user-1', undefined);
    });

    it('passes API options to fetch()', async () => {
        const { users } = createTestDb();
        const options: ApiOptions = { save: false };

        const api = {
            get: vi.fn().mockResolvedValue({ items: [] })
        };

        vi.spyOn(users, 'api').mockReturnValue(api as never);

        const repository = useRepo(users);
        const result = repository.fetch('user-1', options);

        await result.execute();

        expect(api.get).toHaveBeenCalledWith('user-1', options);
    });

    it('uses reactive identifiers when fetching an item', async () => {
        const { users } = createTestDb();
        const id = ref('user-1');

        const api = {
            get: vi.fn().mockResolvedValue({ items: [] })
        };

        vi.spyOn(users, 'api').mockReturnValue(api as never);

        const repository = useRepo(users);
        const result = repository.fetch(id);

        await result.execute();

        expect(api.get).toHaveBeenLastCalledWith('user-1', undefined);

        id.value = 'user-2';

        await result.execute();

        expect(api.get).toHaveBeenLastCalledWith('user-2', undefined);
    });

    it('fetches multiple items through the repository API', async () => {
        const { users } = createTestDb();
        const ids = ref(['user-1', 'user-2']);

        const api = {
            list: vi.fn().mockResolvedValue({ items: [] })
        };

        vi.spyOn(users, 'api').mockReturnValue(api as never);

        const repository = useRepo(users);
        const result = repository.fetchMany(ids);

        await result.execute();

        expect(api.list).toHaveBeenCalledWith({
            ids: ['user-1', 'user-2']
        });
    });

    it('passes API options to fetchMany()', async () => {
        const { users } = createTestDb();
        const options: ApiOptions = { save: false };

        const api = {
            list: vi.fn().mockResolvedValue({ items: [] })
        };

        vi.spyOn(users, 'api').mockReturnValue(api as never);

        const repository = useRepo(users);
        const result = repository.fetchMany(['user-1'], options);

        await result.execute();

        expect(api.list).toHaveBeenCalledWith({
            ...options,
            ids: ['user-1']
        });
    });

    it('throws when fetching without an API client', async () => {
        const { users } = createTestDb();

        vi.spyOn(users, 'api').mockReturnValue(undefined as never);

        const repository = useRepo(users);
        const result = repository.fetch('user-1');

        await expect(result.execute()).rejects.toThrow(
            'Repository has no API client configured.'
        );

        expect(result.error.value).toBeInstanceOf(Error);
    });

    it('throws when fetching multiple items without an API client', async () => {
        const { users } = createTestDb();

        vi.spyOn(users, 'api').mockReturnValue(undefined as never);

        const repository = useRepo(users);
        const result = repository.fetchMany(['user-1']);

        await expect(result.execute()).rejects.toThrow(
            'Repository has no API client configured.'
        );

        expect(result.error.value).toBeInstanceOf(Error);
    });
});


describe('useRepos', () => {
    it('wraps every repository while preserving its keys', () => {
        const { users, articles } = createTestDb();

        const repositories = useRepos({
            users,
            articles
        });

        expect(Object.keys(repositories)).toEqual(['users', 'articles']);
        expect(repositories.users.repository).toBe(users);
        expect(repositories.articles.repository).toBe(articles);
    });

    it('creates independent reactive wrappers', () => {
        const { users, articles } = createTestDb();

        const repositories = useRepos({
            users,
            articles
        });

        expect(repositories.users).not.toBe(repositories.articles);
        expect(repositories.users.repository).toBe(users);
        expect(repositories.articles.repository).toBe(articles);
    });
});


describe('useDbRepo', () => {
    it('adds relation methods to a reactive repository', () => {
        const { db, articles } = createTestDb();
        const repository = useRepo(articles);

        const result = useDbRepo(repository, db);

        expect(result).toBe(repository);
        expect(result.getWith).toBeInstanceOf(Function);
        expect(result.getManyWith).toBeInstanceOf(Function);
        expect(result.fetchRelation).toBeInstanceOf(Function);
        expect(result.fetchRelations).toBeInstanceOf(Function);
    });

    it('resolves one item with the requested relations', () => {
        const { db, articles } = createTestDb();
        const item = useArticle();
        const id = ref(item.id);
        const expected = {
            item,
            relations: {}
        };

        vi.spyOn(articles.store, 'get')
            .mockReturnValue(ref(item) as never);

        const resolve = vi.spyOn(db, 'resolve')
            .mockReturnValue(expected as never);

        const repository = useDbRepo(useRepo(articles), db);
        const result = repository.getWith(id, ['author']);

        expect(result.value).toBe(expected);
        expect(resolve).toHaveBeenCalledWith(
            item,
            Article.relations,
            ['author']
        );
    });

    it('returns undefined when the requested item does not exist', () => {
        const { db, articles } = createTestDb();

        vi.spyOn(articles.store, 'get')
            .mockReturnValue(undefined as never);

        const resolve = vi.spyOn(db, 'resolve');

        const repository = useDbRepo(useRepo(articles), db);
        const result = repository.getWith(123, ['author']);

        expect(result.value).toBeUndefined();
        expect(resolve).not.toHaveBeenCalled();
    });

    it('resolves multiple items with the requested relations', () => {
        const { db, articles } = createTestDb();
        const first = useArticle({ id: 1 });
        const second = useArticle({ id: 2 });
        const ids = ref([1, 2]);
        const expected = [{ item: first }, { item: second }];

        vi.spyOn(articles.store, 'getMany')
            .mockReturnValue(new Map([
                [1, ref(first)],
                [2, ref(second)]
            ]) as never);

        const resolveMany = vi.spyOn(db, 'resolveMany')
            .mockReturnValue(expected as never);

        const repository = useDbRepo(useRepo(articles), db);
        const result = repository.getManyWith(ids, ['author']);

        expect(result.value).toBe(expected);
        expect(resolveMany).toHaveBeenCalledWith(
            [first, second],
            Article.relations,
            ['author']
        );
    });

    it('fetches one relation through the database', async () => {
        const { db, articles } = createTestDb();
        const item = useArticle();
        const expected = {
            item,
            relations: {}
        };

        const fetchRelations = vi.spyOn(db, 'fetchRelations')
            .mockResolvedValue([expected] as never);

        const repository = useDbRepo(useRepo(articles), db);
        const result = await repository.fetchRelation(item, 'author');

        expect(result).toBe(expected);
        expect(fetchRelations).toHaveBeenCalledWith(
            [item],
            Article.relations,
            ['author'],
            undefined
        );
    });

    it('fetches multiple relations through the database', async () => {
        const { db, articles } = createTestDb();
        const items = [
            useArticle({ id: 1 }),
            useArticle({ id: 2 })
        ];
        const options: ApiOptions = {
            save: false
        };
        const expected = [{}, {}];

        const fetchRelations = vi.spyOn(db, 'fetchRelations')
            .mockResolvedValue(expected as never);

        const repository = useDbRepo(useRepo(articles), db);
        const result = await repository.fetchRelations(
            items,
            ['author', 'reviewers'],
            options
        );

        expect(result).toBe(expected);
        expect(fetchRelations).toHaveBeenCalledWith(
            items,
            Article.relations,
            ['author', 'reviewers'],
            options
        );
    });

    it('uses all relations when fetchRelations() receives no relation list', async () => {
        const { db, articles } = createTestDb();
        const items = [useArticle()];

        const fetchRelations = vi.spyOn(db, 'fetchRelations')
            .mockResolvedValue([] as never);

        const repository = useDbRepo(useRepo(articles), db);
        await repository.fetchRelations(items);

        expect(fetchRelations).toHaveBeenCalledWith(
            items,
            Article.relations,
            undefined,
            undefined
        );
    });
});


describe('useDbRepos', () => {
    it('adds database-aware methods to every repository', () => {
        const { db } = createTestDb();

        const repositories = useDbRepos(db);

        expect(repositories.users.fetchRelation).toBeInstanceOf(Function);
        expect(repositories.users.fetchRelations).toBeInstanceOf(Function);
        expect(repositories.articles.fetchRelation).toBeInstanceOf(Function);
        expect(repositories.articles.fetchRelations).toBeInstanceOf(Function);
    });

    it('preserves the original repository instances', () => {
        const { db, users, articles } = createTestDb();

        const repositories = useDbRepos(db);

        expect(repositories.users.repository).toBe(users);
        expect(repositories.articles.repository).toBe(articles);
    });
});


describe('useDb', () => {
    const definitions = {
        users: User,
        articles: Article
    };

    it('creates a reactive database from named definitions', () => {
        const result = withSetup(
            () => useReactiveDb(definitions, {
                config: repoConfigs,
                api: apiConfig,
                apiClass: FakeApiClient
            }),
            dbConfig
        );

        expect(result.db).toBeDefined();
        expect(result.repositories.users.repository.model).toBe(User);
        expect(result.repositories.articles.repository.model).toBe(Article);
    });

    it('exposes relation methods on its repositories', () => {
        const result = withSetup(
            () => useReactiveDb(definitions, {
                config: repoConfigs,
                api: apiConfig,
                apiClass: FakeApiClient
            }),
            dbConfig
        );

        expect(result.repositories.articles.fetchRelation).toBeInstanceOf(Function);
        expect(result.repositories.articles.fetchRelations).toBeInstanceOf(Function);
    });

    it('exposes fetchRelation as a database-level convenience method', () => {
        const result = withSetup(
            () => useReactiveDb(definitions, {
                config: repoConfigs,
                api: apiConfig,
                apiClass: FakeApiClient
            }),
            dbConfig
        );

        const item = useArticle();

        const fetchRelation = vi.spyOn(
            result.repositories.articles,
            'fetchRelation'
        ).mockResolvedValue({} as never);

        return expect(
            result.fetchRelation('articles', item, 'author')
        ).resolves.toBeDefined().then(() => {
            expect(fetchRelation).toHaveBeenCalledWith(
                item,
                'author',
                undefined
            );
        });
    });

    it('exposes fetchRelations as a database-level convenience method', async () => {
        const result = withSetup(
            () => useReactiveDb(definitions, {
                config: repoConfigs,
                api: apiConfig,
                apiClass: FakeApiClient
            }),
            dbConfig
        );

        const items = [useArticle()];
        const expected = [{}];

        const fetchRelations = vi.spyOn(
            result.repositories.articles,
            'fetchRelations'
        ).mockResolvedValue(expected as never);

        const response = await result.fetchRelations(
            'articles',
            items,
            ['author']
        );

        expect(response).toBe(expected);
        expect(fetchRelations).toHaveBeenCalledWith(
            items,
            ['author'],
            undefined
        );
    });

    it('accepts iterable model definitions', () => {
        const result = withSetup(
            () => useReactiveDb([User, Article], {
                api: apiConfig,
                apiClass: FakeApiClient
            }),
            dbConfig
        );

        expect(result.db).toBeDefined();
        expect(Object.keys(result.repositories)).toHaveLength(2);
    });
});
