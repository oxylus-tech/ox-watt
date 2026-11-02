import { describe, expect, it, vi } from "vitest";

import { Model, type ModelClass } from "@/adm/model";
import { ModelField } from "@/adm/fields/model";
import { StringField } from "@/adm/fields/string";
import { IntegerField } from "@/adm/fields/number";
import { ValidationError } from "@/adm/fields/field";
import type { ModelResolver } from "@/adm/model.types";

class Author extends Model {
    static override modelName = "Author";

    static override fields = {
        id: new IntegerField(),
        name: new StringField(),
    };
}

class Article extends Model {
    static override modelName = "Article";

    static override fields = {
        id: new IntegerField(),
        title: new StringField(),
        author: new ModelField({ model: Author }, () => Author),
    };
}

describe("ModelField", () => {
    const resolveModel: ModelResolver = (name) => {
        if (name === "Author") {
            return Author;
        }

        throw new Error(`Unknown model: "${name}".`);
    };

    it("deserializes a nested object into a model instance", () => {
        const field = new ModelField({ model: Author }, resolveModel);

        const result = field.deserialize({
            id: 1,
            name: "Ada",
        });

        expect(result).toBeInstanceOf(Author);
        expect(result).toMatchObject({
            id: 1,
            name: "Ada",
        });
    });

    it("serializes a model instance into a plain object", () => {
        const field = new ModelField({ model: Author }, resolveModel);
        const author = new Author({ id: 1, name: "Ada" });

        expect(field.serialize(author)).toEqual({
            id: 1,
            name: "Ada",
        });
    });

    it("validates a valid nested model", () => {
        const field = new ModelField({ model: Author }, resolveModel);

        expect(field.validate({ id: 1, name: "Ada" })).toEqual([]);
    });

    it("returns validation issues for an invalid nested model", () => {
        const field = new ModelField({ model: Author }, resolveModel);

        expect(field.validate({ id: "invalid", name: "Ada" })).not.toEqual([]);
    });

    it("rejects a non-instance during serialization", () => {
        const field = new ModelField({ model: Author }, resolveModel);

        expect(() => field.serialize({ id: 1, name: "Ada" })).toThrow(
            /Expected an instance of model "Author"/,
        );
    });

    it("respects required and nullable options", () => {
        const requiredField = new ModelField(
            { model: Author, required: true },
            resolveModel,
        );
        const nullableField = new ModelField(
            { model: Author, nullable: true },
            resolveModel,
        );

        expect(requiredField.validate(undefined)).toHaveLength(1);
        expect(nullableField.validate(null)).toEqual([]);
        expect(() => nullableField.deserialize(null)).not.toThrow();
    });

    it("resolves a model by its registered name", () => {
        const field = new ModelField({ model: "Author" }, resolveModel);

        const result = field.deserialize({ id: 1, name: "Ada" });

        expect(result).toBeInstanceOf(Author);
    });

    it("throws when a model name cannot be resolved", () => {
        const field = new ModelField(
            { model: "Unknown" },
            resolveModel,
        );

        expect(() => field.deserialize({ id: 1, name: "Ada" })).toThrow(
            'Unknown model: "Unknown".',
        );
    });

    it("passes the store to the nested model during deserialization", () => {
        const store = {
            get: vi.fn(),
            set: vi.fn(),
            getMany: vi.fn(),
            setMany: vi.fn(),
        };

        const deserialize = vi.spyOn(Author, "deserialize");
        const field = new ModelField({ model: Author }, resolveModel);

        field.deserialize(
            { id: 1, name: "Ada" },
            { modelOptions: {} },
        );

        expect(deserialize).toHaveBeenCalledWith(
            { id: 1, name: "Ada" },
            { repository: undefined, partial: false },
        );
    });

    it("passes the store and field selection to nested serialization", () => {
        const author = new Author({ id: 1, name: "Ada" });
        const serialize = vi.spyOn(author, "serialize");
        const field = new ModelField({ model: Author, fields: ["name"] }, resolveModel);

        field.serialize(author, {
            modelOptions: {
            }
        });

        expect(serialize).toHaveBeenCalledWith({
            fields: ["name"],
        });
    });

    it("passes deserialization options except partial to the nested model", () => {
        const deserialize = vi.spyOn(Author, "deserialize");
        const field = new ModelField({ model: Author }, resolveModel);
        const input = { id: 1, name: "Ada" };

        field.deserialize(input, {
            modelOptions: { noExc: true },
        });

        expect(deserialize).toHaveBeenCalledWith(input, {
            noExc: true,
            store: undefined,
            partial: false,
        });
    });

    it("does not propagate partial implicitly", () => {
        const deserialize = vi.spyOn(Author, "deserialize");
        const field = new ModelField({ model: Author }, resolveModel);

        field.deserialize(
            { id: 1, name: "Ada" },
            { modelOptions: { noExc: true } },
        );

        const options = deserialize.mock.calls.at(-1)?.[1];

        expect(options).toHaveProperty("partial");
    });

    it("returns null when nullable is enabled", () => {
        const field = new ModelField(
            { model: Author, nullable: true },
            resolveModel,
        );

        expect(field.deserialize(null)).toBeNull();
        expect(field.serialize(null)).toBeNull();
    });
});

