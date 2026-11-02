import { vi } from "vitest";

import { Model, Database, Repository, type RepositoryConfig, type Repositories } from "@/adm";
import { type SerializerField, defineRelations } from "@/adm/model.types";

import {
    FakeApiClient,
    config as apiConfig,
    baseConfigs as apiConfigs
} from './api.fixtures'


function createField(): SerializerField {
    return {
        readOnly: false,
        writeOnly: false,
        validate: vi.fn(() => []),
        deserialize: vi.fn((value: unknown) => value),
        serialize: vi.fn((value: unknown) => value),
    } as unknown as SerializerField;
}

export class User extends Model {
    static override modelName = "User";
    static override idField = "uuid";

    static override fields = {
        uuid: createField(),
        name: createField(),
    };
}

export class Article extends Model {
    static override modelName = "Article";

    static override fields = {
        id: createField(),
        title: createField(),
        authorId: createField(),
        reviewerIds: createField(),
    };

    static override relations = defineRelations({
        author: {
            repository: "users",
            source: "authorId",
        },
        reviewers: {
            repository: "users",
            source: "reviewerIds",
            many: true,
        },
    });
}


export const dbConfig = {
    api: apiConfig,
}

export const repoConfigs: Record<string, RepositoryConfig> = {
    articles: {
        api: apiConfigs.Article
    },
    users: {
        api: apiConfigs.User
    }
}


export function useDb(repos?: Repositories) {
    const users = new Repository(User, repoConfigs.users, FakeApiClient);
    const articles = new Repository(Article, repoConfigs.articles, FakeApiClient);
    const db = new Database(
        { ...repos, users, articles },
        dbConfig, Repository, FakeApiClient
    );
    return { db, users, articles, ...repos };
}

export function useArticle(data: Partial<Article> = {}): Article {
    return Article.deserialize({
        id: 1,
        title: "Test article",
        authorId: "user-1",
        reviewerIds: [],
        ...data,
    });
}

