import { describe, expect, it, vi } from 'vitest';

import { useApiModelEditor } from '@/adm/composables/apiModelEditor';

import { Article, useArticle, useDb } from '../fixtures';
import { FakeApiClient } from '../api.fixtures';

describe('useApiModelEditor', () => {
    describe('initialization', () => {
        it('exposes the repository API client', () => {
            const { articles } = useDb();

            const editor = useApiModelEditor(
                articles,
                useArticle(),
            );

            expect(editor.api).toBeInstanceOf(FakeApiClient);
        });
    });

    describe('save', () => {
        it('creates a model when it has no identifier', async () => {
            const { articles } = useDb();
            const article = useArticle({ id: null });

            const editor = useApiModelEditor(articles, article);
            const api = editor.api as FakeApiClient<Article>;

            const create = vi.spyOn(api, 'create');

            api.response = {
                status: 201,
                data: {
                    id: 42,
                    title: 'Created article',
                    authorId: 'user-1',
                    reviewerIds: [],
                },
            };

            editor.data.title = 'New article';

            await editor.save();

            expect(create).toHaveBeenCalledOnce();
            expect(api.requests[0].data).toMatchObject({
                title: 'New article',
            });
        });

        it('updates a model when it already has an identifier', async () => {
            const { articles } = useDb();
            const article = useArticle({ id: 12 });

            const editor = useApiModelEditor(articles, article);
            const api = editor.api as FakeApiClient<Article>;

            const update = vi.spyOn(api, 'update');

            api.response = {
                status: 200,
                data: {
                    id: 12,
                    title: 'Updated article',
                    authorId: 'user-1',
                    reviewerIds: [],
                },
            };

            editor.data.title = 'New title';

            await editor.save();

            expect(update).toHaveBeenCalledOnce();
            expect(update).toHaveBeenCalledWith(
                12,
                expect.any(Article),
                undefined,
            );
            expect(api.requests[0].data).toMatchObject({
                title: 'New title',
            });
        });

        it('uses the model returned by the API to synchronize the editor', async () => {
            const { articles } = useDb();
            const article = useArticle({
                title: 'Original article',
            });

            const editor = useApiModelEditor(articles, article);
            const api = editor.api as FakeApiClient<Article>;

            api.response = {
                status: 200,
                data: {
                    id: 1,
                    title: 'Server-side title',
                    authorId: 'user-2',
                    reviewerIds: ['user-3'],
                },
            };

            editor.data.title = 'Submitted title';

            await editor.save();

            expect(article.title).toBe('Server-side title');
            expect(editor.data.title).toBe('Server-side title');
            expect(editor.data.authorId).toBe('user-2');
            expect(editor.data.reviewerIds).toEqual(['user-3']);
            expect(editor.isDirty.value).toBe(false);
        });

        it('uses the submitted model when the API does not return a model', async () => {
            const { articles } = useDb();
            const article = useArticle({
                title: 'Original article',
            });

            const editor = useApiModelEditor(articles, article);
            const api = editor.api as FakeApiClient<Article>;

            api.response = {
                status: 204,
                data: null,
            };

            editor.data.title = 'Submitted title';

            await editor.save();

            expect(article.title).toBe('Submitted title');
            expect(editor.data.title).toBe('Submitted title');
            expect(editor.isDirty.value).toBe(false);
        });

        it('uses the submitted model when the API returns null', async () => {
            const { articles } = useDb();
            const article = useArticle();

            const editor = useApiModelEditor(articles, article);
            const api = editor.api as FakeApiClient<Article>;

            vi.spyOn(api, 'update').mockResolvedValue(null);

            editor.data.title = 'Submitted title';

            const result = await editor.save();

            expect(result).toBeNull();
            expect(article.title).toBe('Submitted title');
            expect(editor.isDirty.value).toBe(false);
        });

        it('supports API responses containing shallow references', async () => {
            const { articles } = useDb();
            const article = useArticle();

            const editor = useApiModelEditor(articles, article, {
                api: {
                    save: true,
                },
            });

            const api = editor.api as FakeApiClient<Article>;

            api.response = {
                status: 200,
                data: {
                    id: 1,
                    title: 'Stored article',
                    authorId: 'user-1',
                    reviewerIds: [],
                },
            };

            editor.data.title = 'Submitted title';

            await editor.save();

            expect(article.title).toBe('Stored article');
            expect(editor.data.title).toBe('Stored article');
            expect(editor.isDirty.value).toBe(false);
        });

        it('forwards API options to the API client', async () => {
            const { articles } = useDb();

            const apiOptions = {
                headers: {
                    Authorization: 'Bearer custom',
                },
            };

            const editor = useApiModelEditor(
                articles,
                useArticle(),
                { api: apiOptions },
            );

            const api = editor.api as FakeApiClient<Article>;
            const update = vi.spyOn(api, 'update');

            editor.data.title = 'Updated title';

            await editor.save();

            expect(update).toHaveBeenCalledWith(
                1,
                expect.any(Article),
                apiOptions,
            );
        });
    });

    describe('errors', () => {
        it('throws when the API request fails', async () => {
            const { articles } = useDb();
            const article = useArticle();

            const editor = useApiModelEditor(articles, article);
            const api = editor.api as FakeApiClient<Article>;

            api.response = {
                status: 500,
                data: {
                    detail: 'Internal server error',
                },
            };

            editor.data.title = 'Submitted title';

            await expect(editor.save()).rejects.toMatchObject({
                ok: false,
            });

            expect(article.title).toBe('Test article');
            expect(editor.data.title).toBe('Submitted title');
            expect(editor.isDirty.value).toBe(true);
        });

        it('maps API field errors to editor errors', async () => {
            const { articles } = useDb();

            const parseErrors = vi.fn((error: unknown) => {
                const result = error as {
                    data?: Record<string, string[]>;
                };

                return {
                    fields: result.data,
                };
            });

            const onError = vi.fn();

            const editor = useApiModelEditor(
                articles,
                useArticle(),
                {
                    parseErrors,
                    onError,
                },
            );

            const api = editor.api as FakeApiClient<Article>;

            api.response = {
                status: 422,
                data: {
                    title: ['This field is required.'],
                },
            };

            editor.data.title = '';

            await expect(editor.save()).rejects.toMatchObject({
                ok: false,
            });

            expect(parseErrors).toHaveBeenCalled();
            expect(onError).toHaveBeenCalledOnce();

            expect(editor.errors.value.fields).toEqual({
                title: ['This field is required.'],
            });
        });

        it('preserves the original onError callback', async () => {
            const { articles } = useDb();
            const onError = vi.fn();

            const editor = useApiModelEditor(
                articles,
                useArticle(),
                { onError },
            );

            const api = editor.api as FakeApiClient<Article>;

            api.response = {
                status: 500,
                data: {
                    detail: 'Server error',
                },
            };

            await expect(editor.save()).rejects.toBeDefined();

            expect(onError).toHaveBeenCalledOnce();
        });

        it('handles network errors', async () => {
            const { articles } = useDb();
            const onError = vi.fn();

            const editor = useApiModelEditor(
                articles,
                useArticle(),
                { onError },
            );

            const api = editor.api as FakeApiClient<Article>;
            const error = new Error('Network error');

            vi.spyOn(api, 'update').mockRejectedValue(error);

            await expect(editor.save()).rejects.toBe(error);

            expect(onError).toHaveBeenCalledWith(
                error,
                expect.objectContaining({
                    data: expect.any(Article),
                }),
            );
        });
    });
});
