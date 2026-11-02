import { shallowRef, isRef, type MaybeRef } from 'vue'
import { describe, expect, it, vi } from 'vitest';

import { Database, Repository } from '@/adm';
import type { RepositoryClass } from '@/adm';
import { FakeApiClient } from './api.fixtures';
import {
    Article,
    User,
    dbConfig,
    repoConfigs,
    useArticle,
    useDb,
} from './fixtures';

import type { ResolvedRelationType, RepositoryModel } from '@/adm'


describe('Database', () => {
    describe('constructor', () => {
        it('creates an empty database by default', () => {
            const db = new Database();

            expect(db.config).toEqual({});
            expect(db.repositoryClass).toBe(Repository);
            expect(db.apiClass).toBeDefined();
        });

        it('stores the provided configuration and classes', () => {
            const db = new Database({}, dbConfig, Repository, FakeApiClient);

            expect(db.config).toBe(dbConfig);
            expect(db.repositoryClass).toBe(Repository);
            expect(db.apiClass).toBe(FakeApiClient);
        });

        it('registers the provided repositories and assigns itself as their database', () => {
            const users = new Repository(User, repoConfigs.users, FakeApiClient);
            const articles = new Repository(Article, repoConfigs.articles, FakeApiClient);
            const repositories = { users, articles };

            const db = new Database(repositories);

            expect(db.get('users')).toBe(users);
            expect(db.get('articles')).toBe(articles);
        });
    });

    describe('get', () => {
        it('returns a repository by its registered name', () => {
            const { db, users, articles } = useDb();

            // test type inference
            const dbUsers: typeof users = db.get("users")
            expect(dbUsers).toBe(users);
            expect(db.get('articles')).toBe(articles);
        });

        it('throws when the repository does not exist', () => {
            const db = new Database();

            expect(() => db.get('missing' as never)).toThrow(
                'Repository "missing" not found.',
            );
        });
    });

    describe('clear', () => {
        it('clears the stores of all registered repositories', () => {
            const { db, users, articles } = useDb();

            users.set(User.deserialize({
                uuid: 'user-1',
                name: 'Alice',
            }));

            articles.set(useArticle());

            expect(users.has('user-1')).toBe(true);
            expect(articles.has(1)).toBe(true);

            db.clear();

            expect(users.store.size).toBe(0);
            expect(articles.store.size).toBe(0);
        });

        it('does nothing when the database has no repositories', () => {
            const db = new Database();

            expect(() => db.clear()).not.toThrow();
        });
    });

    describe("resolveMany", () => {
        it("resolves a single relation", () => {
            const { db, users } = useDb();

            const user = User.deserialize({ uuid: "user-1", name: "Alice", });

            users.store.set(user);

            const article = useArticle();
            const [result] = db.resolveMany([article], Article.relations, ["author"]);

            expect(result.item).toBe(article);
            expect(result.relations.author).toBeDefined();
            expect(result.relations.author!.value).toBe(user);
        });

        it("resolves multiple relations", () => {
            const { db, users } = useDb();

            const user1 = User.deserialize({ uuid: "user-1", name: "Alice", });
            const user2 = User.deserialize({ uuid: "user-2", name: "Bob", });

            users.store.setMany([user1, user2])

            const article = useArticle({ reviewerIds: ["user-1", "user-2"], });

            const [result] = db.resolveMany(
                [article], Article.relations,
                ["author", "reviewers"]
            );

            expect(result.relations.author!.value).toBe(user1);
            expect(result.relations.reviewers!.map(ref => ref.value)).toEqual([
                user1,
                user2,
            ]);
        });

        it("resolves relations for multiple source items", () => {
            const { db, users } = useDb();

            const user1 = User.deserialize({ uuid: "user-1", name: "Alice", });
            const user2 = User.deserialize({ uuid: "user-2", name: "Bob", });

            users.store.setMany([user1, user2])

            const article1 = useArticle({ id: 1, authorId: "user-1", });
            const article2 = useArticle({ id: 2, authorId: "user-2", });

            const results = db.resolveMany(
                [article1, article2], Article.relations, ["author"]
            );

            expect(results).toHaveLength(2);

            expect(results[0].item).toBe(article1);
            expect(results[0].relations.author!.value).toBe(user1);

            expect(results[1].item).toBe(article2);
            expect(results[1].relations.author!.value).toBe(user2);
        });

        it("returns an empty array for an empty source", () => {
            const { db } = useDb();

            expect(db.resolveMany([], Article.relations, ["author"])).toEqual([]);
        });

        it("preserves source items when a relation cannot be resolved", () => {
            const { db } = useDb();

            const article = useArticle({
                authorId: "unknown-user",
            });

            const [result] = db.resolveMany([article], Article.relations, ["author"]);

            expect(result.item).toBe(article);
            expect(result.relations.author).toBeUndefined();
        });
    });

    describe("resolve", () => {
        it("resolves relations for a single model", () => {
            const { db, users } = useDb();

            const user = User.deserialize({
                uuid: "user-1",
                name: "Alice",
            });

            users.store.setMany([user])

            const article = useArticle();
            const result = db.resolve(article, Article.relations, ["author"]);

            expect(result.item).toBe(article);
            expect(result.relations.author!.value).toBe(user);
        });
    });


    describe("fetchRelations", () => {
        it("fetches a single relation and returns shallow refs when save is enabled", async () => {
            const { db, users } = useDb();
            const article = useArticle({
                authorId: "user-1",
            });

            const api = users.api() as FakeApiClient<User>;
            api.response = {
                status: 200,
                data: [
                    { uuid: "user-1", name: "Alice" },
                ],
            };

            vi.spyOn(users, "api").mockReturnValue(api);

            const fetchBySpy = vi.spyOn(api, "fetchBy")
            const [result] = await db.fetchRelations(
                [article],
                Article.relations,
                ["author"],
                { save: true }
            );

            const author = result.relations.author;
            expect(fetchBySpy).toHaveBeenCalledWith(
                [article],
                "authorId",
                { save: true }
            );

            // ts test
            expect(author).toBeDefined();
            expect(isRef(author)).toBe(true);
            expect(author!.value).toBeInstanceOf(User);
            expect(author!.value!.uuid).toBe("user-1");

            expect(users.store.get("user-1")).toBe(author);
        });

        it("returns model instances when save is disabled", async () => {
            const { db, users } = useDb();
            const article = useArticle({
                authorId: "user-1",
            });

            const api = users.api() as FakeApiClient<User>;
            api.response = {
                status: 200,
                data: [
                    { uuid: "user-1", name: "Alice" },
                ],
            };

            vi.spyOn(users, "api").mockReturnValue(api);

            const [result] = await db.fetchRelations(
                [article],
                Article.relations,
                ["author"],
                { save: false }
            );

            const author = result.relations.author;

            expect(author).toBeInstanceOf(User);
            expect(isRef(author)).toBe(false);
            expect((author as User).uuid).toBe("user-1");

            expect(users.store.get("user-1")).toBeUndefined();
        });

        it("fetches multiple relations and associates them with their sources", async () => {
            const { db, users } = useDb();

            const article1 = useArticle({
                id: 1,
                authorId: "user-1",
                reviewerIds: ["user-2", "user-3"],
            });

            const article2 = useArticle({
                id: 2,
                authorId: "user-2",
                reviewerIds: ["user-1", "user-3"],
            });

            const api = users.api() as FakeApiClient<User>;
            api.response = {
                status: 200,
                data: [
                    { uuid: "user-1", name: "Alice" },
                    { uuid: "user-2", name: "Bob" },
                    { uuid: "user-3", name: "Charlie" },
                ],
            };

            vi.spyOn(users, "api").mockReturnValue(api);

            const fetchBySpy = vi.spyOn(api, "fetchBy")
            const results = await db.fetchRelations(
                [article1, article2],
                Article.relations,
                undefined,
                { save: true }
            );

            expect(api.requests).toHaveLength(2);
            expect(fetchBySpy).toHaveBeenNthCalledWith(1, [article1, article2], "authorId", {save: true})
            expect(fetchBySpy).toHaveBeenNthCalledWith(2, [article1, article2], "reviewerIds", {save: true})

            const [result1, result2] = results;

            expect(result1.item).toBe(article1);
            expect(result2.item).toBe(article2);

            expect(result1.relations.author?.value?.uuid).toBe("user-1");
            expect(result2.relations.author?.value?.uuid).toBe("user-2");

            expect(result1.relations.reviewers?.map(ref => ref.value.uuid)).toEqual([
                "user-2",
                "user-3",
            ]);

            expect(result2.relations.reviewers?.map(ref => ref.value.uuid)).toEqual([
                "user-1",
                "user-3",
            ]);
        });

        it("fetches only the selected relations", async () => {
            const { db, users } = useDb();
            const article = useArticle({
                authorId: "user-1",
                reviewerIds: ["user-2"],
            });

            const api = users.api() as FakeApiClient<User>;
            api.response = {
                status: 200,
                data: [
                    { uuid: "user-1", name: "Alice" },
                ],
            };

            vi.spyOn(users, "api").mockReturnValue(api);

            const [result] = await db.fetchRelations(
                [article],
                Article.relations,
                ["author"],
                { save: false }
            );

            expect(api.requests).toHaveLength(1);
            expect(result.relations.author).toBeInstanceOf(User);
            expect(result.relations.reviewers).toBeUndefined();
        });

        it("returns an empty array without making API requests when there are no items", async () => {
            const { db, users } = useDb();
            const api = users.api() as FakeApiClient<User>;
            const fetchSpy = vi.spyOn(api, "fetchBy");

            vi.spyOn(users, "api").mockReturnValue(api);

            const results = await db.fetchRelations(
                [],
                Article.relations
            );

            expect(results).toEqual([]);
            expect(fetchSpy).not.toHaveBeenCalled();
        });

        it("keeps missing relations undefined", async () => {
            const { db, users } = useDb();
            const article = useArticle({
                authorId: "unknown-user",
            });

            const api = users.api() as FakeApiClient<User>;
            api.response = {
                status: 200,
                data: [],
            };

            vi.spyOn(users, "api").mockReturnValue(api);

            const [result] = await db.fetchRelations(
                [article],
                Article.relations,
                ["author"],
                { save: false }
            );

            expect(result.relations.author).toBeUndefined();
        });
    });
});


