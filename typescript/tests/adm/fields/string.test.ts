
import { describe, expect, it } from "vitest";
import { StringField } from "@/adm/fields/string";

describe("StringField", () => {
    it("accepts non-empty strings", () => {
        expect(new StringField().validate("hello")).toEqual([]);
    });

    it("rejects non-string values", () => {
        expect(new StringField().validate(123)).toEqual([
            { path: "", message: "Expected a string." },
        ]);
    });

    it("rejects blank strings by default", () => {
        expect(new StringField().validate("")).toContainEqual({
            path: "",
            message: "Blank strings are not allowed.",
        });
    });

    it("accepts blank strings when allowBlank is enabled", () => {
        expect(new StringField({ allowBlank: true }).validate("")).toEqual([]);
    });

    it("enforces minimum length", () => {
        expect(new StringField({ minLength: 3 }).validate("ab")).toContainEqual({
            path: "",
            message: "Must contain at least 3 characters.",
        });
    });

    it("enforces maximum length", () => {
        expect(new StringField({ maxLength: 3 }).validate("abcd")).toContainEqual({
            path: "",
            message: "Must contain at most 3 characters.",
        });
    });

    it("enforces a regular expression", () => {
        expect(new StringField({ pattern: "^[A-Z]+$" }).validate("Hello")).toContainEqual({
            path: "",
            message: "The value does not match the required pattern.",
        });
    });

    it("preserves the validation path", () => {
        expect(new StringField().validate(123, "name")).toEqual([
            { path: "name", message: "Expected a string." },
        ]);
    });
});

