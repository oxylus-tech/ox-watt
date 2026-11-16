import { describe, expect, it } from "vitest";
import { BooleanField } from "@/adm/fields/boolean";

describe("BooleanField", () => {
    it.each([true, false])("accepts boolean value %s", (value) => {
        expect(new BooleanField().validate(value)).toEqual([]);
    });

    it.each(["true", "false", 1, 0])("rejects non-boolean value %s", (value) => {
        expect(new BooleanField().validate(value)).toEqual([
            { path: "", message: "Expected a boolean." },
        ]);
    });

    it("preserves the validation path", () => {
        expect(new BooleanField().validate("yes", "active")).toEqual([
            { path: "active", message: "Expected a boolean." },
        ]);
    });
});

