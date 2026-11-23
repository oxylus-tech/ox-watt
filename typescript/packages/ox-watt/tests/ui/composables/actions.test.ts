import { reactive } from "vue";
import { describe, expect, it, vi } from "vitest";

import {
    useAction,
    useNamedAction,
} from "@/ui/composables/actions";
import { useToolset } from "@/ui/composables/toolsets";

import type { ActionDefinition } from "@/ui/types/actions";
import type { ToolsetDefinition } from "@/ui/types/toolsets";


interface TestContext {
    enabled: boolean;
    active: boolean;
    value: number;
}

/**
 * Creates an action definition for tests.
 *
 * @param overrides - Properties overriding the default action definition.
 * @returns A test action definition.
 */
function createAction(
    overrides: Partial<ActionDefinition<TestContext, void, unknown>> = {},
): ActionDefinition<TestContext, void, unknown> {
    return {
        name: "test",
        run: vi.fn(),
        ...overrides,
    };
}

/**
 * Creates a root toolset containing the supplied action definitions.
 *
 * @param items - Actions registered in the toolset.
 * @returns A toolset instance.
 */
function createTestToolset(
    items: ActionDefinition<TestContext, any, any>[],
) {
    const definition: ToolsetDefinition<TestContext> = {
        name: "root",
        items,
    };

    return useToolset(definition, {
        enabled: true,
        active: false,
        value: 42,
    }, {});
}


describe("useAction", () => {
    it("creates an action instance from a definition", () => {
        const definition = createAction();
        const context: TestContext = {
            enabled: true,
            active: false,
            value: 0,
        };

        const action = useAction(definition, context);

        expect(action.definition).toBe(definition);
        expect(action.visible.value).toBe(true);
        expect(action.enabled.value).toBe(true);
        expect(action.active.value).toBe(false);
        expect(action.running.value).toBe(false);
    });

    it("evaluates state callbacks against its context", () => {
        const definition = createAction({
            isVisible: context => context.value > 0,
            isEnabled: context => context.enabled,
            isActive: context => context.active,
        });

        const context: TestContext = {
            enabled: false,
            active: true,
            value: 1,
        };

        const action = useAction(definition, context);

        expect(action.visible.value).toBe(true);
        expect(action.enabled.value).toBe(false);
        expect(action.active.value).toBe(true);
    });

    it("reacts to changes in a reactive context", () => {
        const context = reactive<TestContext>({
            enabled: false,
            active: false,
            value: 0,
        });

        const action = useAction(
            createAction({
                isVisible: context => context.value > 0,
                isEnabled: context => context.enabled,
                isActive: context => context.active,
            }),
            context,
        );

        expect(action.visible.value).toBe(false);
        expect(action.enabled.value).toBe(false);
        expect(action.active.value).toBe(false);

        context.value = 1;
        context.enabled = true;
        context.active = true;

        expect(action.visible.value).toBe(true);
        expect(action.enabled.value).toBe(true);
        expect(action.active.value).toBe(true);
    });

    it("runs the action with its execution context", async () => {
        const context: TestContext = {
            enabled: true,
            active: false,
            value: 42,
        };

        const run = vi.fn().mockResolvedValue("result");
        const action = useAction(createAction({ run }), context);

        await expect(action.run()).resolves.toBe("result");

        expect(run).toHaveBeenCalledOnce();
        expect(run).toHaveBeenCalledWith(context, undefined);
    });

    it("prevents concurrent executions by default", async () => {
        let resolve!: () => void;

        const run = vi.fn(() => new Promise<void>(r => {
            resolve = r;
        }));

        const action = useAction(
            createAction({ run }),
            { enabled: true, active: false, value: 0 },
        );

        const execution = action.run();

        expect(action.running.value).toBe(true);
        expect(action.enabled.value).toBe(false);

        await expect(action.run()).rejects.toThrow(
            'Action "test" is already running.',
        );

        resolve();
        await execution;

        expect(action.running.value).toBe(false);
        expect(action.enabled.value).toBe(true);
    });

    it("allows concurrent executions when enabled", async () => {
        const resolvers: Array<() => void> = [];

        const run = vi.fn(() => new Promise<void>(resolve => {
            resolvers.push(resolve);
        }));

        const action = useAction(
            createAction({ run }),
            { enabled: true, active: false, value: 0 },
            { concurrent: true },
        );

        const first = action.run();
        const second = action.run();

        expect(run).toHaveBeenCalledTimes(2);
        expect(action.running.value).toBe(true);

        resolvers[0]();
        await first;

        expect(action.running.value).toBe(true);

        resolvers[1]();
        await second;

        expect(action.running.value).toBe(false);
    });

    it("resets running after execution errors", async () => {
        const error = new Error("Execution failed");

        const action = useAction(
            createAction({
                run: vi.fn().mockRejectedValue(error),
            }),
            { enabled: true, active: false, value: 0 },
        );

        await expect(action.run()).rejects.toBe(error);
        expect(action.running.value).toBe(false);
    });
});


describe("useNamedAction", () => {
    it("resolves an action from a toolset", () => {
        const definition = createAction();
        const toolset = createTestToolset([definition]);

        const action = useNamedAction(toolset, "test");

        expect(action.value).toBeDefined();
        expect(action.value?.definition).toBe(definition);
    });

    it("returns undefined for an unknown action", () => {
        const toolset = createTestToolset([]);

        const action = useNamedAction(toolset, "unknown");

        expect(action.value).toBeUndefined();
    });

    it("throws when the action is not found and required is true", () => {
        const toolset = createTestToolset([]);

        expect(() =>
            useNamedAction(toolset, "unknown", { required: true }),
        ).toThrow('Action "unknown" not found.');
    });

    /*
    it("reacts when the registered action changes", () => {
        const first = createAction({ title: "First" });
        const second = createAction({ title: "Second" });
        const toolset = createTestToolset([first]);

        const action = useNamedAction(toolset, "test");

        expect(action.value?.definition).toBe(first);

        // Replace the definition through the underlying registry.
        toolset.registry.set(second);

        expect(action.value?.definition).toBe(second);
    });
    */
});
