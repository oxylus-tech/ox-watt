import { describe, expect, it } from "vitest";
import {
    Field,
    ValidationError,
    type BaseFieldConfig,
} from "@/adm/fields/field";

class TestField extends Field<BaseFieldConfig> {
    constructor(config: BaseFieldConfig = {}) {
        super(config);
    }

    transform(value: unknown): unknown {
        return this.deserializeValue(value);
    }
}

describe("Field", () => {
    it("uses the default configuration", () => {
        const field = new TestField();

        expect(field.required).toBe(false);
        expect(field.nullable).toBe(false);
        expect(field.readOnly).toBe(false);
        expect(field.writeOnly).toBe(false);
    });

    it("validates required values", () => {
        const field = new TestField({ required: true });

        expect(field.validate(undefined)).toEqual([
            { path: "", message: "This field is required." },
        ]);
        expect(field.validate("value")).toEqual([]);
    });

    it("validates nullability", () => {
        const field = new TestField();

        expect(field.validate(null)).toEqual([
            { path: "", message: "This field may not be null." },
        ]);
        expect(new TestField({ nullable: true }).validate(null)).toEqual([]);
    });

    it("includes the path in validation errors", () => {
        const field = new TestField();

        expect(field.validate(null, "profile.name")).toEqual([
            { path: "profile.name", message: "This field may not be null." },
        ]);
    });

    it("throws ValidationError when serialization receives an invalid value", () => {
        const field = new TestField();

        expect(() => field.serialize(null)).toThrow(ValidationError);
    });

    it("preserves null when the field is nullable", () => {
        const field = new TestField({ nullable: true });

        expect(field.serialize(null)).toBeNull();
        expect(field.deserialize(null)).toBeNull();
    });

    it("preserves undefined during serialization and deserialization", () => {
        const field = new TestField({ required: true });

        // Current behavior: undefined bypasses validation in these methods.
        expect(field.serialize(undefined)).toBeUndefined();
        expect(field.deserialize(undefined)).toBeUndefined();
    });

    it("uses identity transformations by default", () => {
        const field = new TestField();

        expect(field.serialize("value")).toBe("value");
        expect(field.deserialize("value")).toBe("value");
    });

    it("stores validation issues on ValidationError", () => {
        const issues = [{ path: "name", message: "Invalid value." }];
        const error = new ValidationError(issues);

        expect(error.issues).toEqual(issues);
        expect(error.name).toBe("ValidationError");
        expect(error.message).toContain("name: Invalid value.");
    });
});

