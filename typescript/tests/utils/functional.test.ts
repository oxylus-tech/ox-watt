import { describe, expect, it } from "vitest";

import { resolveStaticValues } from "@/utils/functional";

/**
 * Base class used to test object inheritance.
 */
class ObjectBase {
    static values: Record<string, unknown> = {
        first: 1,
        shared: "parent",
    };

    static getValues() {
        return resolveStaticValues(
            this,
            "_resolvedValues",
            "getValues",
            this.values,
        );
    }
}

/**
 * Base class used to test array inheritance.
 */
class ArrayBase {
    static values: string[] = ["first"];

    static getValues() {
        return resolveStaticValues(
            this,
            "_resolvedValues",
            "getValues",
            this.values,
        );
    }
}

describe("resolveStaticValues", () => {
    describe("object values", () => {
        it("returns values declared by the base class", () => {
            expect(ObjectBase.getValues()).toEqual({
                first: 1,
                shared: "parent",
            });
        });

        it("merges values inherited from the parent class", () => {
            class Child extends ObjectBase {
                static values: Record<string, unknown> = {
                    second: 2,
                };
            }

            expect(Child.getValues()).toEqual({
                first: 1,
                shared: "parent",
                second: 2,
            });
        });

        it("overrides parent values with child values", () => {
            class Child extends ObjectBase {
                static values: Record<string, unknown> = {
                    shared: "child",
                    second: 2,
                };
            }

            expect(Child.getValues()).toEqual({
                first: 1,
                shared: "child",
                second: 2,
            });
        });

        it("merges values across multiple inheritance levels", () => {
            class Child extends ObjectBase {
                static values: Record<string, unknown> = {
                    second: 2,
                };
            }

            class GrandChild extends Child {
                static values: Record<string, unknown> = {
                    third: 3,
                };
            }

            expect(GrandChild.getValues()).toEqual({
                first: 1,
                shared: "parent",
                second: 2,
                third: 3,
            });
        });
    });

    describe("array values", () => {
        it("returns values declared by the base class", () => {
            expect(ArrayBase.getValues()).toEqual(["first"]);
        });

        it("concatenates values inherited from the parent class", () => {
            class Child extends ArrayBase {
                static values: string[] = ["second"];
            }

            expect(Child.getValues()).toEqual(["first", "second"]);
        });

        it("preserves inheritance order across multiple levels", () => {
            class Child extends ArrayBase {
                static values: string[] = ["second"];
            }

            class GrandChild extends Child {
                static values: string[] = ["third"];
            }

            expect(GrandChild.getValues()).toEqual([
                "first",
                "second",
                "third",
            ]);
        });
    });

    describe("parent getter callback", () => {
        it("resolves inherited values using a callback", () => {
            class Child extends ObjectBase {
                static values: Record<string, unknown> = {
                    second: 2,
                };

                static getValues() {
                    return resolveStaticValues(
                        this,
                        "_resolvedValues",
                        (parent) => parent.getValues(),
                        this.values,
                    );
                }
            }

            expect(Child.getValues()).toEqual({
                first: 1,
                shared: "parent",
                second: 2,
            });
        });
    });

    describe("caching", () => {
        it("returns the same object on subsequent calls", () => {
            const first = ObjectBase.getValues();
            const second = ObjectBase.getValues();

            expect(second).toBe(first);
        });

        it("does not recompute values after the first call", () => {
            const first = ObjectBase.getValues();

            ObjectBase.values = {
                changed: true,
            };

            const second = ObjectBase.getValues();

            expect(second).toBe(first);
            expect(second).toEqual({
                first: 1,
                shared: "parent",
            });
        });

        it("creates a cache property on the target class", () => {
            ObjectBase.getValues();

            expect(
                Object.prototype.hasOwnProperty.call(
                    ObjectBase,
                    "_resolvedValues",
                ),
            ).toBe(true);
        });

        it("creates an independent cache for each child class", () => {
            class Child extends ObjectBase {
                static values: Record<string, unknown> = {
                    second: 2,
                };
            }

            const baseValues = ObjectBase.getValues();
            const childValues = Child.getValues();

            expect(childValues).not.toBe(baseValues);
            expect(childValues).toEqual({
                first: 1,
                shared: "parent",
                second: 2,
            });
        });
    });
});
