import { describe, expect, it, vi } from "vitest";

import { Model } from "@/adm/model";
import { ValidationError } from "@/adm/fields/field";
import type { ValidationIssue, SerializerField } from "@/adm/model.types";

/**
 * Creates a mock serializer field with configurable validation behavior.
 *
 * @param issues - Validation issues returned for invalid values.
 * @returns A serializer field with observable serialization methods.
 */
function createField(issues: ValidationIssue[] = []): SerializerField {
    return {
        readOnly: false,
        writeOnly: false,
        validate: vi.fn(() => issues),
        deserialize: vi.fn((value: unknown) => value),
        serialize: vi.fn((value: unknown) => value),
    } as unknown as SerializerField;
}

/**
 * Creates an isolated model class for testing model-level behavior.
 *
 * @param fields - Fields declared by the test model.
 * @returns A concrete model class.
 */
function createModel(fields: Record<string, SerializerField>) {
    return class TestModel extends Model {
        static override modelName = "TestModel";
        static override fields = fields;
    };
}

describe("Model.validate", () => {
    it("accepts a valid object", () => {
        const field = createField();
        const TestModel = createModel({ name: field });

        expect(TestModel.validate({ name: "Alice" })).toBe(null);
        expect(field.validate).toHaveBeenCalledWith("Alice", "name");
    });

    it("throws ValidationError by default", () => {
        const field = createField([
            { path: "name", message: "Invalid value." },
        ]);
        const TestModel = createModel({ name: field });

        expect(() => TestModel.validate({ name: "Alice" }))
            .toThrow(ValidationError);
    });

    it("returns false when noExc is enabled", () => {
        const field = createField([
            { path: "name", message: "Invalid value." },
        ]);
        const TestModel = createModel({ name: field });

        expect(TestModel.validate({ name: "Alice" }, { noExc: true }))
            .toEqual([{message: "Invalid value.", path: "name"}]);
    });

    it("collects validation issues from multiple fields", () => {
        const nameField = createField([
            { path: "name", message: "Invalid name." },
        ]);
        const ageField = createField([
            { path: "age", message: "Invalid age." },
        ]);
        const TestModel = createModel({
            name: nameField,
            age: ageField,
        });

        let error: unknown;

        try {
            TestModel.validate({ name: "Alice", age: -1 });
        } catch (caught) {
            error = caught;
        }

        expect(error).toBeInstanceOf(ValidationError);
        expect(nameField.validate).toHaveBeenCalledOnce();
        expect(ageField.validate).toHaveBeenCalledOnce();
    });

    it.each([
        null,
        undefined,
        [],
        "invalid",
        42,
    ])("rejects non-object input: %s", (input) => {
        const TestModel = createModel({});

        expect(TestModel.validate(input, { noExc: true })).toEqual([
            {"message": "Expected an object.", "path": ""}
        ]);
    });

    it("skips missing fields during partial validation", () => {
        const nameField = createField();
        const ageField = createField();
        const TestModel = createModel({
            name: nameField,
            age: ageField,
        });

        expect(TestModel.validate({ name: "Alice" }, { partial: true }))
            .toBe(null);

        expect(nameField.validate).toHaveBeenCalledOnce();
        expect(ageField.validate).not.toHaveBeenCalled();
    });

    it("skips read-only fields during validation", () => {
        const field = {
            ...createField(),
            readOnly: true,
        } as SerializerField;
        const TestModel = createModel({ id: field });

        expect(TestModel.validate({ id: undefined })).toBe(null);
        expect(field.validate).not.toHaveBeenCalled();
    });
});

describe("Model.deserialize", () => {
    it("deserializes declared fields into a model instance", () => {
        const nameField = createField();
        const TestModel = createModel({ name: nameField });

        const instance = TestModel.deserialize({ name: "Alice" });

        expect(instance).toBeInstanceOf(TestModel);
        expect(instance).toMatchObject({ name: "Alice" });
        expect(nameField.deserialize).toHaveBeenCalledWith(
            "Alice",
            { repository: undefined, modelOptions: {} },
        );
    });

    it("ignores unknown input fields", () => {
        const TestModel = createModel({ name: createField() });

        const instance = TestModel.deserialize({
            name: "Alice",
            unknown: "ignored",
        });

        expect(instance).toMatchObject({ name: "Alice" });
        expect("unknown" in instance).toBe(false);
    });

    it("ignores read-only fields in the input", () => {
        const field = {
            ...createField(),
            readOnly: true,
        } as SerializerField;
        const TestModel = createModel({ id: field });

        const instance = TestModel.deserialize({ id: 123 });

        expect("id" in instance).toBe(false);
        expect(field.deserialize).not.toHaveBeenCalled();
    });

    it.each([
        null,
        undefined,
        [],
        "invalid",
        42,
    ])("rejects non-object input: %s", (input) => {
        const TestModel = createModel({});

        expect(() => TestModel.deserialize(input)).toThrow(TypeError);
    });

    it("passes partial validation options to the model validator", () => {
        const field = createField();
        const TestModel = createModel({ name: field });

        expect(() => TestModel.deserialize({}, { partial: true })).not.toThrow();
        expect(field.validate).not.toHaveBeenCalled();
    });
});


describe("Model.serialize", () => {
    it("serializes all declared fields present on the instance", () => {
        const nameField = createField();
        const ageField = createField();
        const TestModel = createModel({
            name: nameField,
            age: ageField,
        });

        const instance = new TestModel({
            name: "Alice",
            age: 30,
            unknown: "ignored",
        });

        expect(instance.serialize()).toEqual({
            name: "Alice",
            age: 30,
        });
        expect(nameField.serialize).toHaveBeenCalledWith("Alice", {
            relation: undefined, modelOptions: {}, repository: undefined
        });
        expect(ageField.serialize).toHaveBeenCalledWith(30, {
            relation: undefined, modelOptions: {}, repository: undefined
        });
    });

    it("skips write-only fields", () => {
        const passwordField = {
            ...createField(),
            writeOnly: true,
        } as SerializerField;
        const nameField = createField();
        const TestModel = createModel({
            name: nameField,
            password: passwordField,
        });

        const instance = new TestModel({
            name: "Alice",
            password: "secret",
        });

        expect(instance.serialize()).toEqual({ name: "Alice" });
        expect(passwordField.serialize).not.toHaveBeenCalled();
    });

    it("skips declared fields missing from the instance", () => {
        const nameField = createField();
        const ageField = createField();
        const TestModel = createModel({
            name: nameField,
            age: ageField,
        });

        const instance = new TestModel({ name: "Alice" });

        expect(instance.serialize()).toEqual({ name: "Alice" });
        expect(ageField.serialize).not.toHaveBeenCalled();
    });

    it("supports selecting fields with an array of names", () => {
        const nameField = createField();
        const ageField = createField();
        const TestModel = createModel({
            name: nameField,
            age: ageField,
        });

        const instance = new TestModel({
            name: "Alice",
            age: 30,
        });

        expect(instance.serialize(["age"])).toEqual({ age: 30 });
        expect(nameField.serialize).not.toHaveBeenCalled();
        expect(ageField.serialize).toHaveBeenCalledOnce();
    });

    it("supports selecting fields with options.fields", () => {
        const nameField = createField();
        const ageField = createField();
        const TestModel = createModel({
            name: nameField,
            age: ageField,
        });

        const instance = new TestModel({
            name: "Alice",
            age: 30,
        });

        expect(instance.serialize({ fields: ["name"] })).toEqual({
            name: "Alice",
        });
        expect(nameField.serialize).toHaveBeenCalledOnce();
        expect(ageField.serialize).not.toHaveBeenCalled();
    });

    it("passes model serializable options to fields", () => {
        const field = createField();
        const TestModel = createModel({ owner: field });
        const store = { models: new Map() };
        const instance = new TestModel({ owner: 42 });

        instance.serialize({
            fields: ["owner"]
        });

        expect(field.serialize).toHaveBeenCalledWith(42, {
            modelOptions: {fields: ["owner"]},
        });
    });

    it("serializes an explicitly present undefined value", () => {
        const field = createField();
        const TestModel = createModel({ name: field });
        const instance = new TestModel({ name: undefined });

        expect(instance.serialize()).toEqual({ name: undefined });
        expect(field.serialize).toHaveBeenCalledOnce();
    });

    it("ignores unknown field names in the explicit selection", () => {
        const nameField = createField();
        const TestModel = createModel({ name: nameField });
        const instance = new TestModel({ name: "Alice" });

        expect(instance.serialize(["unknown"])).toEqual({});
        expect(nameField.serialize).not.toHaveBeenCalled();
    });
});


describe("Model edge cases", () => {
    it("validates missing fields by default", () => {
        const field = {
            ...createField([
                { path: "name", message: "This field is required." },
            ]),
        } as SerializerField;
        const TestModel = createModel({ name: field });

        expect(() => TestModel.validate({})).toThrow(ValidationError);
        expect(field.validate).toHaveBeenCalledWith(undefined, "name");
    });

    it("includes issues from all invalid fields in ValidationError", () => {
        const nameIssue = {
            path: "name",
            message: "Invalid name.",
        };
        const ageIssue = {
            path: "age",
            message: "Invalid age.",
        };

        const nameField = createField([nameIssue]);
        const ageField = createField([ageIssue]);
        const TestModel = createModel({
            name: nameField,
            age: ageField,
        });

        let error: unknown;

        try {
            TestModel.validate({ name: "", age: -1 });
        } catch (caught) {
            error = caught;
        }

        expect(error).toBeInstanceOf(ValidationError);

        // Adapt this assertion to the public error property exposed by ValidationError.
        expect((error as ValidationError).issues).toEqual([
            nameIssue,
            ageIssue,
        ]);
    });

    it("throws ValidationError when deserialized data is invalid", () => {
        const field = createField([
            { path: "name", message: "Invalid name." },
        ]);
        const TestModel = createModel({ name: field });

        expect(() => TestModel.deserialize({ name: "invalid" }))
            .toThrow(ValidationError);
    });

    it("passes the modelOptions to fields during deserialization", () => {
        const field = createField();
        const TestModel = createModel({ owner: field });

        TestModel.deserialize(
            { owner: 42 },
        );

        expect(field.deserialize).toHaveBeenCalledWith(42, {
            modelOptions: {},
            repository: undefined,
        });
    });
});
