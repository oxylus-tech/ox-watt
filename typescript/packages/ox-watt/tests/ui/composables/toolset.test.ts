import { describe, expect, it, vi } from "vitest";

import { useToolset } from "@/ui/composables/toolsets";

import type { Action } from "@/ui/types/actions";
import type { Toolset } from "@/ui/types/toolsets";


interface TestContext {
    enabled: boolean;
    active: boolean;
    value: number;
}

/**
 * Creates an action definition for tests.
 *
 * @param name - Action identifier.
 * @param overrides - Properties overriding the default action definition.
 * @returns A test action definition.
 */
function createAction(
    name: string,
    overrides: Partial<Action<TestContext, void, unknown>> = {},
): Action<TestContext, void, unknown> {
    return {
        name,
        run: vi.fn(),
        ...overrides,
    };
}

/**
 * Creates a toolset definition for tests.
 *
 * @param name - Toolset identifier.
 * @param items - Actions and nested toolsets belonging to the toolset.
 * @returns A toolset definition.
 */
function createToolset(
    name: string,
    items: Toolset<TestContext>["items"],
): Toolset<TestContext> {
    return {
        name,
        items,
    };
}

/**
 * Creates a contextualized root toolset for tests.
 *
 * @param items - Actions and nested toolsets belonging to the root.
 * @returns A toolset instance.
 */
function createTestToolset(
    items: Toolset<TestContext>["items"],
) {
    return useToolset(
        createToolset("root", items),
        {
            enabled: true,
            active: false,
            value: 42,
        },
        {},
    );
}


describe("useToolset", () => {
    it("creates a toolset instance from a definition", () => {
        const definition = createToolset("root", []);
        const toolset = useToolset(
            definition,
            { enabled: true, active: false, value: 42 },
            {},
        );

        expect(toolset.definition).toBe(definition);
    });

    it("creates instances for its direct actions", () => {
        const action = createAction("create");
        const toolset = createTestToolset([action]);

        const instance = toolset.get("create");

        expect(instance).toBeDefined();
        expect(instance).toHaveProperty("definition", action);
    });

    it("resolves nested toolsets using dotted paths", () => {
        const action = createAction("create");
        const nested = createToolset("users", [action]);
        const toolset = createTestToolset([nested]);

        const instance = toolset.get("users.create");

        expect(instance).toBeDefined();
        expect(instance).toHaveProperty("definition", action);
    });

    it("returns undefined for an unknown path", () => {
        const toolset = createTestToolset([
            createToolset("users", []),
        ]);

        expect(toolset.get("unknown")).toBeUndefined();
        expect(toolset.get("users.unknown")).toBeUndefined();
        expect(toolset.get("unknown.create")).toBeUndefined();
    });

    it("returns a toolset instance when resolving a toolset name", () => {
        const nested = createToolset("users", []);
        const toolset = createTestToolset([nested]);

        const instance = toolset.get("users");

        expect(instance).toBeDefined();
        expect(instance?.definition).toBe(nested);
    });

    it("does not resolve a dotted path through an action", () => {
        const toolset = createTestToolset([
            createAction("create"),
        ]);

        expect(() => toolset.get("create.child")).toThrow();
    });

    it("runs a direct action by name", async () => {
        const run = vi.fn().mockResolvedValue("result");
        const action = createAction("create", { run });
        const toolset = createTestToolset([action]);

        await expect(toolset.run("create")).resolves.toBe("result");

        expect(run).toHaveBeenCalledOnce();
    });

    it("runs a nested action using a dotted path", async () => {
        const run = vi.fn().mockResolvedValue("result");
        const action = createAction("create", { run });

        const toolset = createTestToolset([
            createToolset("users", [action]),
        ]);

        await expect(toolset.run("users.create")).resolves.toBe("result");

        expect(run).toHaveBeenCalledOnce();
    });

    it("throws when running an unknown action", async () => {
        const toolset = createTestToolset([]);

        expect(() => toolset.run("unknown")).toThrow(
            'Action "unknown" not found.',
        );
    });

    it("throws when attempting to run a toolset", async () => {
        const toolset = createTestToolset([
            createToolset("users", []),
        ]);

        expect(() => toolset.run("users")).toThrow(
            'The item "users" is not an action (but a toolset)',
        );
    });
});
