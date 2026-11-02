
import { describe, expect, it } from "vitest";
import { IntegerField, NumberField } from "@/adm/fields/number";

describe("NumberField", () => {
    it("accepts finite numbers", () => {
        expect(new NumberField().validate(12.5)).toEqual([]);
    });

    it.each([NaN, Infinity, -Infinity, "12", null])(
        "rejects invalid numeric values: %s",
        (value) => {
            expect(new NumberField().validate(value)).not.toEqual([]);
        },
    );

    it("enforces minimum value", () => {
        expect(new NumberField({ min: 5 }).validate(4)).toContainEqual({
            path: "",
            message: "Must be greater than or equal to 5.",
        });
    });

    it("enforces maximum value", () => {
        expect(new NumberField({ max: 10 }).validate(11)).toContainEqual({
            path: "",
            message: "Must be less than or equal to 10.",
        });
    });

    it("accepts values at the configured boundaries", () => {
        const field = new NumberField({ min: 1, max: 10 });

        expect(field.validate(1)).toEqual([]);
        expect(field.validate(10)).toEqual([]);
    });
});

describe("IntegerField", () => {
    it("accepts integers", () => {
        expect(new IntegerField().validate(12)).toEqual([]);
    });

    it("rejects fractional numbers", () => {
        expect(new IntegerField().validate(12.5)).toEqual([
            { path: "", message: "Expected an integer." },
        ]);
    });

    it("rejects non-finite values", () => {
        expect(new IntegerField().validate(Infinity)).toEqual([
            { path: "", message: "Expected an integer." },
        ]);
    });

    it("enforces minimum and maximum values", () => {
        const field = new IntegerField({ min: 1, max: 10 });

        expect(field.validate(0)).toContainEqual({
            path: "",
            message: "Must be greater than or equal to 1.",
        });
        expect(field.validate(11)).toContainEqual({
            path: "",
            message: "Must be less than or equal to 10.",
        });
    });
});

