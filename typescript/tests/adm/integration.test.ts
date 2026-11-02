import { unref } from "vue";
import { describe, expect, it, vi } from "vitest";

import { Repository, Database } from "@/adm";
import type { ModelClass } from "@/adm/model";

import { FakeApiClient } from "./api.fixtures";
import { Article, User, dbConfig, repoConfigs } from "./fixtures";


describe("Database integration", () => {
    it("loads articles and users into their repositories", async () => {
        const users = new Repository(User, repoConfigs.users, FakeApiClient);
        const articles = new Repository(Article, repoConfigs.articles, FakeApiClient);

        const db = new Database(
            { users, articles },
            dbConfig,
            Repository,
            FakeApiClient,
        );

        const articlesApi = articles.api()! as FakeApiClient<Article>;
        const usersApi = users.api()! as FakeApiClient<User>;

        articlesApi.response = {
            status: 200,
            data: [
                {
                    id: 1,
                    title: "First article",
                    authorId: "user-1",
                    reviewerIds: [],
                },
            ],
        };

        usersApi.response = {
            status: 200,
            data: [
                {
                    uuid: "user-1",
                    name: "Alice",
                },
            ],
        };

        const articleResult = await articlesApi.list({ save: true });
        const userResult = await usersApi.list({ save: true });

        expect(articleResult?.items).toHaveLength(1);
        expect(userResult?.items).toHaveLength(1);

        expect(articles.has(1)).toBe(true);
        expect(users.has("user-1")).toBe(true);

        expect(db.get("articles")).toBe(articles);
        expect(db.get("users")).toBe(users);
    });

    it("fetches related users from articles and updates the target store", async () => {
        const users = new Repository(User, repoConfigs.users, FakeApiClient);
        const articles = new Repository(Article, repoConfigs.articles, FakeApiClient);

        const db = new Database(
            { users, articles },
            dbConfig,
            Repository,
            FakeApiClient,
        );

        const articlesApi = articles.api()! as FakeApiClient<Article>;
        const usersApi = users.api()! as FakeApiClient<User>;
        const listSpy = vi.spyOn(usersApi, "list");

        // Load articles first.
        articlesApi.response = {
            status: 200,
            data: [
                {
                    id: 1,
                    title: "First article",
                    authorId: "user-1",
                    reviewerIds: ["user-2", "user-3"],
                },
                {
                    id: 2,
                    title: "Second article",
                    authorId: "user-1",
                    reviewerIds: ["user-2"],
                },
            ],
        };

        const articleResult = await articlesApi.list({ save: true });
        const loadedArticles = articleResult!.items!;
        expect(loadedArticles).toHaveLength(2);
        expect(loadedArticles.map(article => unref(article).authorId)).toEqual([
            "user-1",
            "user-1",
        ]);

        // The related users are not loaded yet.
        expect(users.has("user-1")).toBe(false);

        const authorsBeforeFetch = users.store.getBy(loadedArticles, "authorId");

        expect(authorsBeforeFetch.size).toBe(0);

        // Fetch authors. Duplicate IDs must be deduplicated by fetchBy.
        usersApi.response = {
            status: 200,
            data: [
                { uuid: "user-1", name: "Alice" },
            ],
        };

        const authorResult = await usersApi.fetchBy(
            loadedArticles,
            "authorId",
            { save: true },
        );

        expect(listSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                ids: new Set(["user-1"]),
                save: true,
            }),
        );

        expect(usersApi.requests).toHaveLength(1);
        expect(authorResult?.items).toHaveLength(1);
        expect(users.has("user-1")).toBe(true);

        const authors = users.store.getBy(loadedArticles, "authorId");

        expect(authors.size).toBe(2);
        expect(authors.get(loadedArticles[0])).toBeDefined();
        expect(authors.get(loadedArticles[1])).toBeDefined();

        // Fetch multiple relations. Duplicate reviewer IDs are also deduplicated.
        usersApi.response = {
            status: 200,
            data: [
                { uuid: "user-2", name: "Bob" },
                { uuid: "user-3", name: "Charlie" },
            ],
        };

        const reviewerResult = await usersApi.fetchBy(
            loadedArticles,
            "reviewerIds",
            { save: true },
        );

        expect(reviewerResult?.items).toHaveLength(2);
        expect(users.has("user-2")).toBe(true);
        expect(users.has("user-3")).toBe(true);

        const reviewers = users.store.getBy(loadedArticles, "reviewerIds");

        expect(reviewers.get(loadedArticles[0])).toHaveLength(2);
        expect(reviewers.get(loadedArticles[1])).toHaveLength(1);
    });
});

