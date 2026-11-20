
import { describe, expect, it } from "vitest";

import { createActionsRegistry } from "../../src/ui/actions";

interface TestContext {
    value: string;
}

/**
 * Creates a minimal action definition for registry tests.
 *
 * @param name - Unique action name.
 * @returns An action definition.
 */
function createAction(name: string) {
    return {
        name,
        label: name,
        run: () => undefined,
    };
}

describe("createActionsRegistry", () => {
    it("creates an empty non-reactive registry by default", () => {
        const registry = createActionsRegistry<TestContext>();

        expect(registry.size).toBe(0);
    });

    it("stores and retrieves action definitions", () => {
        const registry = createActionsRegistry<TestContext>();
        const action = createAction("save");

        registry.set(action);

        expect(registry.has("save")).toBe(true);
        expect(registry.getRaw("save")).toBe(action);
        expect(registry.size).toBe(1);
    });

    it("stores multiple action definitions", () => {
        const registry = createActionsRegistry<TestContext>();

        const actions = [
            createAction("save"),
            createAction("delete"),
            createAction("cancel"),
        ];

        registry.setMany(actions);

        expect(registry.size).toBe(3);

        for (const action of actions) {
            expect(registry.getRaw(action.name)).toBe(action);
        }
    });

    it("replaces an existing action definition", () => {
        const registry = createActionsRegistry<TestContext>();

        const original = createAction("save");
        const replacement = {
            ...createAction("save"),
            label: "Save changes",
        };

        registry.set(original);
        registry.set(replacement);

        expect(registry.size).toBe(1);
        expect(registry.getRaw("save")).toBe(replacement);
    });

    it("supports deleting and clearing definitions", () => {
        const registry = createActionsRegistry<TestContext>();

        registry.setMany([
            createAction("save"),
            createAction("delete"),
        ]);

        expect(registry.delete("save")).toBe(true);
        expect(registry.has("save")).toBe(false);

        registry.clear();

        expect(registry.size).toBe(0);
    });

    it("creates a reactive registry when requested", () => {
        const registry = createActionsRegistry<TestContext>({
            reactive: true,
        });

        expect(registry.size).toBe(0);

        registry.set(createAction("save"));

        expect(registry.getRaw("save")?.name).toBe("save");
    });
});
