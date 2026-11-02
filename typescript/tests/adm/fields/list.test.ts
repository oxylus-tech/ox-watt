import { describe, expect, it } from "vitest";
import { ListField } from "@/adm/fields/list";
import { StringField } from "@/adm/fields/string";
import { ValidationError } from "@/adm/fields/field";

describe("ListField", () => {
    it("accepts an array of valid values", () => {
        const field = new ListField(new StringField());

        expect(field.validate(["alpha", "beta"])).toEqual([]);
    });

    it("rejects non-array values", () => {
        const field = new ListField(new StringField());

        expect(field.validate("alpha")).toEqual([
            { path: "", message: "Expected an array." },
        ]);
    });

    it("validates each element and includes its index in the path", () => {
        const field = new ListField(new StringField());

        expect(field.validate(["valid", ""])).toEqual([
            {
                path: "[1]",
                message: "Blank strings are not allowed.",
            },
        ]);
    });

    it("validates minimum and maximum lengths", () => {
        const field = new ListField(new StringField(), {
            minLength: 2,
            maxLength: 3,
        });

        expect(field.validate(["one"])).toContainEqual({
            path: "",
            message: "Must contain at least 2 elements.",
        });

        expect(field.validate(["one", "two", "three", "four"])).toContainEqual({
            path: "",
            message: "Must contain at most 3 elements.",
        });
    });

    it("accepts null only when nullable", () => {
        expect(new ListField(new StringField()).validate(null)).toHaveLength(1);
        expect(
            new ListField(new StringField(), { nullable: true }).validate(null),
        ).toEqual([]);
    });

    it("serializes each element using the child field", () => {
        const field = new ListField(new StringField());

        expect(field.serialize(["alpha", "beta"])).toEqual(["alpha", "beta"]);
    });

    it("deserializes each element using the child field", () => {
        const field = new ListField(new StringField());

        expect(field.deserialize(["alpha", "beta"])).toEqual(["alpha", "beta"]);
    });

    it("throws when serialization receives an invalid element", () => {
        const field = new ListField(new StringField());

        expect(() => field.serialize(["valid", ""])).toThrow(ValidationError);
    });

    it("preserves nullable arrays", () => {
        const field = new ListField(new StringField(), { nullable: true });

        expect(field.serialize(null)).toBeNull();
        expect(field.deserialize(null)).toBeNull();
    });
});

