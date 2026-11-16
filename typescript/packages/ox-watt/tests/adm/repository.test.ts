import { isRef } from 'vue';
import { describe, expect, it, vi } from 'vitest';

import { Repository } from '@/adm';
import { ModelStore } from '@/adm';

import { FakeApiClient } from './api.fixtures';
import {
    Article,
    User,
    useArticle,
    useDb,
} from './fixtures';


describe('Repository', () => {
    describe('constructor', () => {
        it('creates a ModelStore for its model', () => {
            const repository = new Repository(Article, {});

            expect(repository.store).toBeInstanceOf(ModelStore);
            expect(repository.store.model).toBe(Article);
        });

        it('uses the provided store', () => {
            const store = new ModelStore(Article);
            const repository = new Repository(Article, {}, undefined, store);

            expect(repository.store).toBe(store);
        });

        it('exposes its configuration and dependencies', () => {
            const config = { api: { baseUrl: 'https://custom.example.test/' } };
            const repository = new Repository(Article, config, FakeApiClient);
            const { db } = useDb({
                repository
            });

            expect(repository.model).toBe(Article);
            expect(repository.config).toBe(config);
            expect(repository.apiClass).toBe(FakeApiClient);
        });
    });

    describe('api', () => {
        it('returns null when no API client class is configured', () => {
            const repository = new Repository(Article, {});

            expect(repository.api()).toBeNull();
        });

        it('creates an API client using the configured class', () => {
            const { articles } = useDb();

            const api = articles.api();

            expect(api).toBeInstanceOf(FakeApiClient);
        });

        it('creates a new API client on each call', () => {
            const { articles } = useDb();

            const first = articles.api();
            const second = articles.api();

            expect(first).not.toBe(second);
            expect(first).toBeInstanceOf(FakeApiClient);
            expect(second).toBeInstanceOf(FakeApiClient);
        });
    });

    describe('modelName', () => {
        it('returns the model name', () => {
            const { articles, users } = useDb();

            expect(articles.modelName).toBe('Article');
            expect(users.modelName).toBe('User');
        });
    });

    describe('local storage', () => {
        it('gets a model by its identifier', () => {
            const { articles } = useDb();
            const article = useArticle();

            articles.set(article);

            expect(articles.getRaw(1)).toBe(article);
        });

        it('returns undefined when a model does not exist', () => {
            const { articles } = useDb();

            expect(articles.getRaw(999)).toBeUndefined();
        });

        it('gets multiple models as refs', () => {
            const { articles } = useDb();
            const first = useArticle({ id: 1 });
            const second = useArticle({ id: 2 });

            articles.setMany([first, second]);

            const result = articles.getMany([1, 2]);

            expect(result).toBeInstanceOf(Map);
            expect(result.size).toBe(2);
            expect(result.get(1)?.value).toBe(first);
            expect(result.get(2)?.value).toBe(second);
            expect(isRef(result.get(1))).toBe(true);
        });

        it('checks whether a model exists', () => {
            const { articles } = useDb();

            expect(articles.has(1)).toBe(false);

            articles.set(useArticle());

            expect(articles.has(1)).toBe(true);
        });

        it('stores a model and returns its ref', () => {
            const { articles } = useDb();
            const article = useArticle();
            const result = articles.set(article);

            expect(isRef(result)).toBe(true);
            expect(result.value).toBe(article);
            expect(articles.getRaw(1)).toBe(article);
        });

        it('stores multiple models and returns their refs', () => {
            const { articles } = useDb();
            const first = useArticle({ id: 1 });
            const second = useArticle({ id: 2 });

            const result = articles.setMany([first, second]);

            expect(result).toHaveLength(2);
            expect(result[0].value).toBe(first);
            expect(result[1].value).toBe(second);
            expect(articles.getRaw(1)).toBe(first);
            expect(articles.getRaw(2)).toBe(second);
        });

        it('replaces an existing model', () => {
            const { articles } = useDb();
            const first = useArticle({ id: 1, title: 'First' });
            const second = useArticle({ id: 1, title: 'Second' });

            articles.set(first);
            const result = articles.set(second);

            expect(result.value).toBe(second);
            expect(articles.getRaw(1)).toBe(second);
            expect(articles.getRaw(1)?.title).toBe('Second');
        });

        it('deletes a model by its identifier', () => {
            const { articles } = useDb();
            const article = useArticle()
            articles.set(article);

            expect(articles.delete(1)).toBe(true);
            expect(articles.has(1)).toBe(false);
            expect(articles.delete(1)).toBe(false);
        });

        it('clears the local storage', () => {
            const { articles } = useDb();

            articles.setMany([
                useArticle({ id: 1 }),
                useArticle({ id: 2 }),
            ]);

            articles.clear();

            expect(articles.store.size).toBe(0);
            expect(articles.getRaw(1)).toBeUndefined();
            expect(articles.getRaw(2)).toBeUndefined();
        });
    });

    describe('deserialize', () => {
        it('deserializes data and returns a ref without saving by default', () => {
            const { articles } = useDb();
            const data = {
                id: 10,
                title: 'Deserialized article',
                authorId: 'user-1',
                reviewerIds: [],
            };

            const result = articles.deserialize(data);

            expect(isRef(result)).toBe(true);
            expect(result.value).toBeInstanceOf(Article);
            expect(result.value.id).toBe(10);
            expect(result.value.title).toBe('Deserialized article');
            expect(articles.has(10)).toBe(false);
        });

        it('saves the deserialized model when save is enabled', () => {
            const { articles } = useDb();
            const data = {
                id: 10,
                title: 'Saved article',
                authorId: 'user-1',
                reviewerIds: [],
            };

            const result = articles.deserialize(data, { save: true });

            expect(isRef(result)).toBe(true);
            expect(result.value).toBeInstanceOf(Article);
            expect(articles.getRaw(10)).toBe(result.value);
            expect(articles.has(10)).toBe(true);
        });

        it('returns the existing store ref when saving an existing identifier', () => {
            const { articles } = useDb();
            const existing = useArticle({ id: 10, title: 'Existing article' });
            const existingRef = articles.set(existing);

            const result = articles.deserialize({
                id: 10,
                title: 'Updated article',
                authorId: 'user-1',
                reviewerIds: [],
            }, { save: true });

            expect(result).toBe(existingRef);
            expect(result.value.title).toBe('Updated article');
            expect(articles.getRaw(10)).toBe(result.value);
        });
    });

    describe('serialize', () => {
        it('serializes a model instance', () => {
            const { articles } = useDb();
            const article = useArticle();

            const result = articles.serialize(article);

            expect(result).toEqual(article.serialize());
        });

        it('serializes a model ref', () => {
            const { articles } = useDb();
            const article = useArticle();
            const articleRef = articles.set(article);

            const result = articles.serialize(articleRef);

            expect(result).toEqual(article.serialize());
        });

        it('passes serialization options to the model', () => {
            const { articles } = useDb();
            const article = useArticle();
            const serialize = vi.spyOn(article, 'serialize');

            articles.serialize(article, {});

            expect(serialize).toHaveBeenCalledWith({});
        });
    });
});

