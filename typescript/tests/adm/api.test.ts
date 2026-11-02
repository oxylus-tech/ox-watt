
import { afterEach, describe, expect, it, vi } from 'vitest';
import { isRef, unref } from 'vue';

import {
    ApiClient,
    HttpClient,
    mergeApiConfig,
} from '@/adm';

import type {
    ApiConfig,
    ApiOptions,
    ApiRequest,
} from '@/adm';

import {
    Article,
    User,
    useArticle,
    useDb,
} from './fixtures';

import {
    FakeApiClient,
    jsonResponse,
} from './api.fixtures';


describe('mergeApiConfig', () => {
    it('merges top-level configuration', () => {
        const config = mergeApiConfig(
            {
                baseUrl: 'https://api.example.test/',
                headers: {
                    Authorization: 'Bearer default',
                    'X-Default': 'default',
                },
                params: {
                    language: 'en',
                    version: '1',
                },
            },
            {
                headers: {
                    Authorization: 'Bearer custom',
                    'X-Custom': 'custom',
                },
                params: {
                    language: 'fr',
                    page: '2',
                },
            },
        );

        expect(config.headers).toEqual({
            Authorization: 'Bearer custom',
            'X-Default': 'default',
            'X-Custom': 'custom',
        });
        expect(config.params).toEqual({
            language: 'fr',
            version: '1',
            page: '2',
        });
    });

    it('merges configuration when one side is undefined', () => {
        const config: ApiConfig = {
            headers: {
                Authorization: 'Bearer token',
            },
            params: {
                language: 'fr',
            },
        };

        expect(mergeApiConfig(undefined, config)).toMatchObject(config);
        expect(mergeApiConfig(config, undefined)).toMatchObject(config);
    });

    it('returns an empty configuration when both inputs are undefined', () => {
        expect(mergeApiConfig()).toEqual({
            baseUrl: undefined,
            params: {},
            headers: {},
        });
    });
});


describe('ApiClient', () => {
    describe('initialization', () => {
        it('exposes the configured endpoints', () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    list: { path: 'articles' },
                },
            });

            expect(client.endpoints).toEqual({
                list: { path: 'articles' },
            });
        });
    });

    describe('request construction', () => {
        it('builds a request for get()', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    get: { path: 'articles/{id}' },
                },
            });

            await client.get(42);

            expect(client.requests).toHaveLength(1);
            expect(client.requests[0]).toMatchObject({
                path: 'articles/42',
                params: {},
                headers: {},
            });
        });

        it('substitutes and encodes path parameters', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    get: { path: 'articles/{id}' },
                },
            });

            await client.get('article/42');

            expect(client.requests[0].path).toBe('articles/article%2F42');
        });

        it('uses endpoint, configuration and option parameters', async () => {
            const client = new FakeApiClient(Article, {
                params: {
                    language: 'en',
                    version: '1',
                },
                endpoints: {
                    list: {
                        path: 'articles',
                        params: {
                            language: 'nl',
                            category: 'news',
                        },
                    },
                },
            });

            await client.list({
                params: {
                    language: 'fr',
                    page: '2',
                },
            });

            expect(client.requests[0]).toMatchObject({
                path: 'articles',
                params: {
                    language: 'fr',
                    version: '1',
                    category: 'news',
                    page: '2',
                },
            });
        });

        it('merges headers from configuration, endpoint and options', async () => {
            const client = new FakeApiClient(Article, {
                headers: {
                    Authorization: 'Bearer default',
                    'X-Default': 'default',
                },
                endpoints: {
                    list: {
                        path: 'articles',
                        headers: {
                            Authorization: 'Bearer endpoint',
                            'X-Endpoint': 'endpoint',
                        },
                    },
                },
            });

            await client.list({
                headers: {
                    Authorization: 'Bearer custom',
                    'X-Option': 'option',
                },
            });

            expect(client.requests[0].headers).toEqual({
                Authorization: 'Bearer custom',
                'X-Default': 'default',
                'X-Endpoint': 'endpoint',
                'X-Option': 'option',
            });
        });

        it('throws when a path parameter is missing', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    get: { path: 'articles/{id}' },
                },
            });

            await expect(client.get(undefined)).rejects.toThrow(
                'Missing path parameter "id"',
            );
        });

        it('uses a custom endpoint', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    list: { path: 'articles' },
                    search: { path: 'articles/search' },
                },
            });

            await client.list({
                endpoint: 'search',
            });

            expect(client.requests[0].path).toBe('articles/search');
        });

        it('uses an explicit path instead of the endpoint path', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    list: { path: 'articles' },
                },
            });

            await client.list({
                path: 'custom/articles',
            });

            expect(client.requests[0].path).toBe('custom/articles');
        });

        it('uses the configured dataKey', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    list: {
                        path: 'articles',
                        dataKey: 'results',
                    },
                },
            });

            client.response = {
                status: 200,
                data: {
                    results: [{ id: 1, title: 'First article' }],
                },
            };

            const result = await client.list();

            expect(result?.items).toHaveLength(1);
            expect(unref(result?.items?.[0])).toBeInstanceOf(Article);
            expect(unref(result?.items?.[0])?.title).toBe('First article');
        });

        it('uses the ids lookup parameter', async () => {
            const client = new FakeApiClient(Article, {
                ids_lookup: 'id__in',
                endpoints: {
                    list: { path: 'articles' },
                },
            });

            await client.list({
                ids: [1, 2, 3],
            });

            expect(client.requests[0].params).toMatchObject({
                id__in: '1,2,3',
            });
        });

        it('allows overriding the ids lookup parameter', async () => {
            const client = new FakeApiClient(Article, {
                ids_lookup: 'id__in',
                endpoints: {
                    list: {
                        path: 'articles',
                        ids_lookup: 'ids',
                    },
                },
            });

            await client.list({
                ids: [1, 2],
                ids_lookup: 'pk__in',
            } as ApiOptions);

            expect(client.requests[0].params).toMatchObject({
                pk__in: '1,2',
            });
        });

        it('removes path parameters from query parameters', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    get: {
                        path: 'articles/{id}',
                    },
                },
            });

            await client.get(42, {
                params: {
                    id: 42,
                    language: 'fr',
                },
            });

            expect(client.requests[0]).toMatchObject({
                path: 'articles/42',
                params: {
                    language: 'fr',
                },
            });

            expect(client.requests[0].params).not.toHaveProperty('id');
        });
    });

    describe('get()', () => {
        it('returns a deserialized model', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    get: { path: 'articles/{id}' },
                },
            });

            client.response = {
                status: 200,
                data: {
                    id: 42,
                    title: 'Test article',
                },
            };

            const result = await client.get(42);

            expect(result?.ok).toBe(true);
            expect(result?.items).toHaveLength(1);
            expect(result?.items?.[0]).toBeInstanceOf(Article);
            expect(unref(result?.items?.[0])?.id).toBe(42);
        });

        it('returns null items when the response data is null', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    get: { path: 'articles/{id}' },
                },
            });

            client.response = {
                status: 200,
                data: null,
            };

            const result = await client.get(42);

            expect(result?.ok).toBe(true);
            expect(result?.items).toBeNull();
        });

        it('does not deserialize unsuccessful responses', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    get: { path: 'articles/{id}' },
                },
            });

            client.response = {
                status: 404,
                data: {
                    id: 42,
                    title: 'Not found',
                },
            };

            const result = await client.get(42);

            expect(result?.ok).toBe(false);
            expect(result?.items).toBeNull();
        });
    });

    describe('list()', () => {
        it('returns a collection of deserialized models', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    list: { path: 'articles' },
                },
            });

            client.response = {
                status: 200,
                data: [
                    { id: 1, title: 'First article' },
                    { id: 2, title: 'Second article' },
                ],
            };

            const result = await client.list();

            expect(result?.ok).toBe(true);
            expect(result?.items).toHaveLength(2);
            expect(unref(result?.items?.[0])).toBeInstanceOf(Article);
            expect(unref(result?.items?.[1])?.id).toBe(2);
        });
    });

    describe('fetchBy()', () => {
        it('extracts unique identifiers from source objects', async () => {
            const client = new FakeApiClient(User, {
                endpoints: {
                    list: { path: 'users' },
                },
                ids_lookup: 'id__in',
            });

            await client.fetchBy(
                [
                    { userId: 'user-1' },
                    { userId: 'user-2' },
                    { userId: 'user-1' },
                ],
                'userId',
            );

            expect(client.requests[0].params).toMatchObject({
                id__in: 'user-1,user-2',
            });
        });

        it('supports extracting multiple identifiers from each source', async () => {
            const client = new FakeApiClient(User, {
                endpoints: {
                    list: { path: 'users' },
                },
                ids_lookup: 'id__in',
            });

            await client.fetchBy(
                [
                    { userIds: ['user-1', 'user-2'] },
                    { userIds: ['user-2', 'user-3'] },
                ],
                'userIds',
            );

            expect(client.requests[0].params).toMatchObject({
                id__in: 'user-1,user-2,user-3',
            });
        });
    });

    describe('create()', () => {
        it('serializes a model instance before sending it', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    create: { path: 'articles' },
                },
            });

            const article = useArticle({
                title: 'New article',
            });

            await client.create(article);

            expect(client.requests[0].data).toEqual(article.serialize());
        });

        it('accepts plain object data', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    create: { path: 'articles' },
                },
            });

            const data = {
                title: 'New article',
            };

            await client.create(data);

            expect(client.requests[0].data).toEqual(data);
        });
    });

    describe('update()', () => {
        it('includes the identifier and serialized model data', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    update: { path: 'articles/{id}' },
                },
            });

            const article = useArticle({
                title: 'Updated article',
            });

            await client.update(42, article);

            expect(client.requests[0]).toMatchObject({
                path: 'articles/42',
                data: article.serialize(),
            });
        });

        it('accepts plain object data', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    update: { path: 'articles/{id}' },
                },
            });

            const data = {
                title: 'Updated article',
            };

            await client.update(42, data);

            expect(client.requests[0].data).toEqual(data);
        });
    });

    describe('delete()', () => {
        it('builds a delete request', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    delete: { path: 'articles/{id}' },
                },
            });

            await client.delete(42);

            expect(client.requests[0].path).toBe('articles/42');
        });
    });

    describe('store synchronization', () => {
        it('saves retrieved models when save is enabled', async () => {
            const { articles } = useDb();
            const client = new FakeApiClient(Article, {
                endpoints: {
                    get: { path: 'articles/{id}' },
                },
            }, articles.store);

            client.response = {
                status: 200,
                data: {
                    id: 42,
                    title: 'Saved article',
                },
            };

            await client.get(42, {
                save: true,
            });

            expect(articles.has(42)).toBe(true);
            expect(articles.getRaw(42)?.title).toBe('Saved article');
        });

        it('does not save retrieved models when save is disabled', async () => {
            const { articles } = useDb();
            const client = new FakeApiClient(Article, {
                endpoints: {
                    get: { path: 'articles/{id}' },
                },
            }, articles.store);

            client.response = {
                status: 200,
                data: {
                    id: 42,
                    title: 'Unsaved article',
                },
            };

            await client.get(42);

            expect(articles.has(42)).toBe(false);
        });

        it('does not save models from unsuccessful responses', async () => {
            const { articles } = useDb();
            const client = new FakeApiClient(Article, {
                endpoints: {
                    get: { path: 'articles/{id}' },
                },
            }, articles.store);

            client.response = {
                status: 404,
                data: {
                    id: 42,
                    title: 'Not found',
                },
            };

            await client.get(42, {
                save: true,
            });

            expect(articles.has(42)).toBe(false);
        });

        it('deletes a model from the store when delete succeeds and save is enabled', async () => {
            const { articles } = useDb();
            articles.set(useArticle({ id: 42 }));

            const client = new FakeApiClient(Article, {
                endpoints: {
                    delete: { path: 'articles/{id}' },
                },
            }, articles.store);

            await client.delete(42, {
                save: true,
            });

            expect(articles.has(42)).toBe(false);
        });

        it('does not delete a model from the store when save is disabled', async () => {
            const { articles } = useDb();
            articles.set(useArticle({ id: 42 }));

            const client = new FakeApiClient(Article, {
                endpoints: {
                    delete: { path: 'articles/{id}' },
                },
            }, articles.store);

            await client.delete(42);

            expect(articles.has(42)).toBe(true);
        });

        it('does not delete a model from the store when the request fails', async () => {
            const { articles } = useDb();
            articles.set(useArticle({ id: 42 }));

            const client = new FakeApiClient(Article, {
                endpoints: {
                    delete: { path: 'articles/{id}' },
                },
            }, articles.store);

            client.response = {
                status: 500,
                data: null,
            };

            await client.delete(42, {
                save: true,
            });

            expect(articles.has(42)).toBe(true);
        });
    });

    describe('metadata', () => {
        it('extracts metadata from the response data', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    list: { path: 'articles' },
                },
            });

            client.response = {
                status: 200,
                data: {
                    results: [
                        { id: 1, title: 'First article' },
                    ],
                    count: 10,
                    next: '/articles?page=2',
                },
            };

            const result = await client.list({
                metadata: {
                    count: 'count',
                    next: 'next',
                },
            });

            expect(result?.metadata).toEqual({
                count: 10,
                next: '/articles?page=2',
            });
        });

        it('supports a nested metadata dataKey', async () => {
            const client = new FakeApiClient(Article, {
                endpoints: {
                    list: { path: 'articles' },
                },
            });

            client.response = {
                status: 200,
                data: {
                    pagination: {
                        total: 10,
                        next: '/articles?page=2',
                    },
                    results: [],
                },
            };

            const result = await client.list({
                metadata: {
                    dataKey: 'pagination',
                    count: 'total',
                    next: 'next',
                },
            });

            expect(result?.metadata).toEqual({
                count: 10,
                next: '/articles?page=2',
            });
        });
    });
});


describe('HttpClient', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    function createClient(config: ApiConfig = {}) {
        return new HttpClient(Article, config);
    }

    function mockFetch(response: Response = jsonResponse({ id: 1, title: 'Test article' })) {
        const fetchMock = vi.fn().mockResolvedValue(response);
        vi.stubGlobal('fetch', fetchMock);
        return fetchMock;
    }

    describe('HTTP methods', () => {
        it.each([
            ['list', 'GET'],
            ['get', 'GET'],
            ['create', 'POST'],
            ['update', 'PATCH'],
            ['delete', 'DELETE'],
        ] as const)('uses %s with %s', async (action, method) => {
            const fetchMock = mockFetch();

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    [action]: {
                        path: action === 'list' || action === 'create'
                            ? 'articles'
                            : 'articles/{id}',
                    },
                },
            });

            switch(action) {
                case "list":
                    await client.list();
                    break;
                case "get": case "delete":
                    await client[action](42);
                    break;
                case "create":
                    await client.create(useArticle())
                    break;
                case "update":
                    await client.update(1, useArticle())
                    break
            }

            expect(fetchMock).toHaveBeenCalledOnce();

            const request = fetchMock.mock.calls[0][1] as RequestInit;
            expect(request.method).toBe(method);
        });

        it('allows overriding the HTTP method', async () => {
            const fetchMock = mockFetch();

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    create: { path: 'articles' },
                },
            });

            await client.create(
                { title: 'Test' },
                { method: 'PUT' },
            );

            const request = fetchMock.mock.calls[0][1] as RequestInit;
            expect(request.method).toBe('PUT');
        });

        /*
        it('throws for an unsupported operation', async () => {
            const client = createClient({
                baseUrl: "https://api.example.test/",
                endpoints: {
                    custom: { path: '/articles' },
                },
            });

            await expect(
                client.list({ endpoint: 'custom' }),
            ).rejects.toThrow('Unsupported API operation "list"');
        });
        */
    });

    describe('URL construction', () => {
        it('throws when an endpoint path is missing', async () => {
            const client = new FakeApiClient(Article);

            await expect(client.list()).rejects.toThrow(
                'Missing API path for operation "list"',
            );
        });

        it('joins the base URL and endpoint path', async () => {
            const fetchMock = mockFetch();

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    list: { path: 'articles' },
                },
            });

            await client.list();

            expect(fetchMock.mock.calls[0][0]).toBe(
                'https://api.example.test/articles',
            );
        });

        it('substitutes path parameters', async () => {
            const fetchMock = mockFetch();

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    get: { path: 'articles/{id}' },
                },
            });

            await client.get(42);

            expect(fetchMock.mock.calls[0][0]).toBe(
                'https://api.example.test/articles/42',
            );
        });

        it('encodes query parameters', async () => {
            const fetchMock = mockFetch();

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    list: { path: 'articles' },
                },
            });

            await client.list({
                params: {
                    search: 'hello world',
                    page: 2,
                },
            });

            expect(fetchMock.mock.calls[0][0]).toBe(
                'https://api.example.test/articles?search=hello+world&page=2',
            );
        });

        it('appends array parameters as repeated query parameters', async () => {
            const fetchMock = mockFetch();

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    list: { path: 'articles' },
                },
            });

            await client.list({
                params: {
                    ids: [1, 2, 3],
                },
            });

            const url = new URL(fetchMock.mock.calls[0][0] as string);

            expect(url.searchParams.getAll('ids')).toEqual([
                '1',
                '2',
                '3',
            ]);
        });

        it('serializes object parameters as JSON', async () => {
            const fetchMock = mockFetch();

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    list: { path: 'articles' },
                },
            });

            await client.list({
                params: {
                    filters: {
                        status: 'published',
                    },
                },
            });

            const url = new URL(fetchMock.mock.calls[0][0] as string);

            expect(url.searchParams.get('filters')).toBe(
                JSON.stringify({ status: 'published' }),
            );
        });

        it('ignores null and undefined query parameters', async () => {
            const fetchMock = mockFetch();

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    list: { path: 'articles' },
                },
            });

            await client.list({
                params: {
                    page: 1,
                    missing: null,
                    optional: undefined,
                },
            });

            const url = new URL(fetchMock.mock.calls[0][0] as string);

            expect(url.searchParams.get('page')).toBe('1');
            expect(url.searchParams.has('missing')).toBe(false);
            expect(url.searchParams.has('optional')).toBe(false);
        });

        it('supports absolute endpoint URLs', async () => {
            const fetchMock = mockFetch();

            const client = createClient({
                endpoints: {
                    list: {
                        path: 'https://other.example.test/articles',
                    },
                },
            });

            await client.list();

            expect(fetchMock.mock.calls[0][0]).toBe(
                'https://other.example.test/articles',
            );
        });

        it('supports paths without a base URL', async () => {
            const fetchMock = mockFetch();

            const client = createClient({
                endpoints: {
                    list: { path: '/articles' },
                },
            });

            await client.list();

            expect(fetchMock.mock.calls[0][0]).toBe('/articles');
        });

        it('preserves existing query parameters and hash fragments', async () => {
            const fetchMock = mockFetch();

            const client = createClient({
                endpoints: {
                    list: {
                        path: '/articles?sort=date#results',
                    },
                },
            });

            await client.list({
                params: {
                    page: 2,
                },
            });

            expect(fetchMock.mock.calls[0][0]).toBe(
                '/articles?sort=date&page=2#results',
            );
        });
    });

    describe('headers and body', () => {
        it('sends configured headers', async () => {
            const fetchMock = mockFetch();

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                headers: {
                    Authorization: 'Bearer token',
                    'X-Custom': 'value',
                },
                endpoints: {
                    list: { path: 'articles' },
                },
            });

            await client.list();

            const request = fetchMock.mock.calls[0][1] as RequestInit;

            expect(request.headers).toEqual({
                Authorization: 'Bearer token',
                "Content-Type": "application/json",
                'X-Custom': 'value',
            });
        });

        it('serializes create data as JSON', async () => {
            const fetchMock = mockFetch();

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    create: { path: 'articles' },
                },
            });

            await client.create({
                title: 'New article',
            });

            const request = fetchMock.mock.calls[0][1] as RequestInit;

            expect(request.body).toBe(
                JSON.stringify({ title: 'New article' }),
            );
            expect(request.headers).toMatchObject({
                'Content-Type': 'application/json',
            });
        });

        it('serializes model instances as JSON', async () => {
            const fetchMock = mockFetch();

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    create: { path: 'articles' },
                },
            });

            const article = useArticle({
                title: 'New article',
            });

            await client.create(article);

            const request = fetchMock.mock.calls[0][1] as RequestInit;

            expect(request.body).toBe(
                JSON.stringify(article.serialize()),
            );
        });

        it('does not send a body for GET requests', async () => {
            const fetchMock = mockFetch();

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    get: { path: 'articles/{id}' },
                },
            });

            await client.get(42, {
                data: {
                    ignored: true,
                },
            });

            const request = fetchMock.mock.calls[0][1] as RequestInit;

            expect(request.body).toBeUndefined();
        });

        it('does not override an explicit content type', async () => {
            const fetchMock = mockFetch();

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                },
                endpoints: {
                    create: { path: 'articles' },
                },
            });

            await client.create({
                title: 'New article',
            });

            const request = fetchMock.mock.calls[0][1] as RequestInit;

            expect(request.headers).toMatchObject({
                'Content-Type': 'application/vnd.api+json',
            });
        });

        it('detects content type case-insensitively', async () => {
            const fetchMock = mockFetch();

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                headers: {
                    'Content-Type': 'application/xml',
                },
                endpoints: {
                    create: { path: 'articles' },
                },
            });

            await client.create({
                title: 'New article',
            });

            const request = fetchMock.mock.calls[0][1] as RequestInit;

            expect(request.headers).toEqual({
                'Content-Type': 'application/xml',
            });
        });
    });

    describe('response handling', () => {
        it('deserializes a JSON object response', async () => {
            mockFetch(jsonResponse({
                id: 42,
                title: 'Test article',
            }));

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    get: { path: 'articles/{id}' },
                },
            });

            const result = await client.get(42);

            expect(result?.ok).toBe(true);
            expect(result?.items).toHaveLength(1);
            expect(result?.items?.[0]).toBeInstanceOf(Article);
            expect(unref(result?.items?.[0])?.title).toBe('Test article');
        });

        it('deserializes a JSON array response', async () => {
            mockFetch(jsonResponse([
                { id: 1, title: 'First article' },
                { id: 2, title: 'Second article' },
            ]));

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    list: { path: 'articles' },
                },
            });

            const result = await client.list();

            expect(result?.items).toHaveLength(2);
            expect(result?.items?.[0]).toBeInstanceOf(Article);
            expect(unref(result?.items?.[1])?.id).toBe(2);
        });

        it('returns null data for a 204 response', async () => {
            mockFetch(new Response(null, {
                status: 204,
            }));

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    delete: { path: 'articles/{id}' },
                },
            });

            const result = await client.delete(42);

            expect(result?.ok).toBe(true);
            expect(result?.data).toBeNull();
            expect(result?.items).toBeNull();
        });

        it('returns null data for a non-JSON response', async () => {
            mockFetch(new Response('Not JSON', {
                status: 200,
                headers: {
                    'Content-Type': 'text/plain',
                },
            }));

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    get: { path: 'articles/{id}' },
                },
            });

            const result = await client.get(42);

            expect(result?.ok).toBe(true);
            expect(result?.data).toBeNull();
            expect(result?.items).toBeNull();
        });

        it('marks unsuccessful HTTP responses as failed', async () => {
            mockFetch(jsonResponse({
                detail: 'Not found',
            }, 404));

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    get: { path: 'articles/{id}' },
                },
            });

            const result = await client.get(42);

            expect(result?.ok).toBe(false);
            expect(result?.items).toBeNull();
        });

        it('does not deserialize a JSON response when the status is unsuccessful', async () => {
            mockFetch(jsonResponse({
                id: 42,
                title: 'Not found',
            }, 404));

            const client = createClient({
                baseUrl: 'https://api.example.test/',
                endpoints: {
                    get: { path: 'articles/{id}' },
                },
            });

            const result = await client.get(42);

            expect(result?.ok).toBe(false);
            expect(result?.items).toBeNull();
        });
    });

    describe('store synchronization', () => {
        it('saves retrieved models when save is enabled', async () => {
            mockFetch(jsonResponse({
                id: 42,
                title: 'Saved article',
            }));

            const { articles } = useDb();
            const client = new HttpClient(
                Article,
                {
                    baseUrl: 'https://api.example.test/',
                    endpoints: {
                        get: { path: 'articles/{id}' },
                    },
                },
                articles.store,
            );

            await client.get(42, {
                save: true,
            });

            expect(articles.has(42)).toBe(true);
            expect(articles.getRaw(42)?.title).toBe('Saved article');
        });

        it('deletes models from the store after a successful delete', async () => {
            mockFetch(new Response(null, {status: 204}));

            const { articles } = useDb();
            articles.set(useArticle({ id: 42 }));

            const client = new HttpClient(
                Article,
                {
                    baseUrl: 'https://api.example.test/',
                    endpoints: {
                        delete: { path: 'articles/{id}' },
                    },
                },
                articles.store,
            );

            await client.delete(42, {
                save: true,
            });

            expect(articles.has(42)).toBe(false);
        });
    });
});

