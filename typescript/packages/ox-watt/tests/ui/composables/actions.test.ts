
import { computed, reactive } from "vue";
import { describe, expect, it, vi } from "vitest";

import { createActionsRegistry } from "../../../src/ui/actions";
import { useActionRegistry } from "../../../src/ui/composables/actions";

import type { ActionDefinition } from "../../../src/ui/types/actions";

interface TestContext {
    enabled: boolean;
    active: boolean;
    value: number;
}

/**
 * Creates a deferred promise for controlling asynchronous tests.
 *
 * @template T - Promise result type.
 */
function createDeferred<T>() {
    let resolve!: (value: T) => void;
    let reject!: (reason?: unknown) => void;

    const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
    });

    return {
        promise,
        resolve,
        reject,
    };
}

/**
 * Creates an action definition with default test behavior.
 *
 * @param overrides - Properties overriding the default definition.
 * @returns An action definition.
 */
function createAction(
    overrides: Partial<ActionDefinition<TestContext, void, void>> = {},
): ActionDefinition<TestContext, void, void> {
    return {
        name: "test",
        run: vi.fn(),
        ...overrides,
    };
}

describe("useActionRegistry", () => {
    it("returns undefined for an unknown action", () => {
        const registry = createActionsRegistry<TestContext>();
        const actions = useActionRegistry(registry, {
            enabled: true,
            active: false,
            value: 0,
        });

        expect(actions.get("unknown")).toBeUndefined();
        expect(actions.has("unknown")).toBe(false);
    });

    it("creates and caches action instances", () => {
        const registry = createActionsRegistry<TestContext>();
        const definition = createAction();

        registry.set(definition);

        const actions = useActionRegistry(registry, {
            enabled: true,
            active: false,
            value: 0,
        });

        const first = actions.get("test");
        const second = actions.get("test");

        expect(first).toBeDefined();
        expect(first).toBe(second);
        expect(first?.definition).toBe(definition);
    });

    it("creates separate instances for separate contexts", () => {
        const registry = createActionsRegistry<TestContext>();
        registry.set(createAction());

        const firstContext: TestContext = {
            enabled: true,
            active: false,
            value: 1,
        };

        const secondContext: TestContext = {
            enabled: true,
            active: false,
            value: 2,
        };

        const first = useActionRegistry(registry, firstContext);
        const second = useActionRegistry(registry, secondContext);

        expect(first.get("test")).not.toBe(second.get("test"));
    });

    it("recreates an instance when its definition is replaced", () => {
        const registry = createActionsRegistry<TestContext>();
        const original = createAction();

        registry.set(original);

        const actions = useActionRegistry(registry, {
            enabled: true,
            active: false,
            value: 0,
        });

        const first = actions.get("test");

        const replacement = createAction({
            label: "Updated action",
        });

        registry.set(replacement);

        const second = actions.get("test");

        expect(second).not.toBe(first);
        expect(second?.definition).toBe(replacement);
    });

    it("removes cached instances when their definitions are deleted", () => {
        const registry = createActionsRegistry<TestContext>();
        registry.set(createAction());

        const actions = useActionRegistry(registry, {
            enabled: true,
            active: false,
            value: 0,
        });

        const first = actions.get("test");

        registry.delete("test");

        expect(actions.get("test")).toBeUndefined();

        registry.set(createAction());

        const second = actions.get("test");

        expect(second).toBeDefined();
        expect(second).not.toBe(first);
    });

    describe("state", () => {
        it("uses default state values when callbacks are not provided", () => {
            const registry = createActionsRegistry<TestContext>();
            registry.set(createAction());

            const actions = useActionRegistry(registry, {
                enabled: true,
                active: false,
                value: 0,
            });

            const action = actions.get("test");

            expect(action?.visible.value).toBe(true);
            expect(action?.enabled.value).toBe(true);
            expect(action?.active.value).toBe(false);
            expect(action?.running.value).toBe(false);
        });

        it("evaluates state callbacks against the execution context", () => {
            const registry = createActionsRegistry<TestContext>();

            registry.set(createAction({
                isVisible: context => context.value > 0,
                isEnabled: context => context.enabled,
                isActive: context => context.active,
            }));

            const actions = useActionRegistry(registry, {
                enabled: false,
                active: true,
                value: 1,
            });

            const action = actions.get("test");

            expect(action?.visible.value).toBe(true);
            expect(action?.enabled.value).toBe(false);
            expect(action?.active.value).toBe(true);
        });

        it("reacts to changes in the execution context", () => {
            const registry = createActionsRegistry<TestContext>();

            registry.set(createAction({
                isVisible: context => context.value > 0,
                isEnabled: context => context.enabled,
                isActive: context => context.active,
            }));

            const context = reactive<TestContext>({
                enabled: false,
                active: false,
                value: 0,
            });

            const actions = useActionRegistry(registry, context);
            const action = actions.get("test");

            expect(action?.visible.value).toBe(false);
            expect(action?.enabled.value).toBe(false);
            expect(action?.active.value).toBe(false);

            context.value = 1;
            context.enabled = true;
            context.active = true;

            expect(action?.visible.value).toBe(true);
            expect(action?.enabled.value).toBe(true);
            expect(action?.active.value).toBe(true);
        });

        it("reacts to replacement of definitions in a reactive registry", () => {
            const registry = createActionsRegistry<TestContext>({
                reactive: true,
            });

            const actions = useActionRegistry(registry, {
                enabled: true,
                active: false,
                value: 0,
            });

            const label = computed(() => actions.get("test")?.definition.label);

            expect(label.value).toBeUndefined();

            registry.set(createAction({
                label: "First",
            }));

            expect(label.value).toBe("First");

            registry.set(createAction({
                label: "Second",
            }));

            expect(label.value).toBe("Second");

            registry.delete("test");

            expect(label.value).toBeUndefined();
        });
    });

    describe("run", () => {
        it("runs an action with its execution context", async () => {
            const context: TestContext = {
                enabled: true,
                active: false,
                value: 42,
            };

            const run = vi.fn();

            const registry = createActionsRegistry<TestContext>();
            registry.set(createAction({ run }));

            const actions = useActionRegistry(registry, context);

            await actions.get("test")?.run();

            expect(run).toHaveBeenCalledOnce();
            expect(run).toHaveBeenCalledWith(context, undefined);
        });

        it("runs an action by name", async () => {
            const run = vi.fn();

            const registry = createActionsRegistry<TestContext>();
            registry.set(createAction({ run }));

            const actions = useActionRegistry(registry, {
                enabled: true,
                active: false,
                value: 42,
            });

            await actions.run("test");

            expect(run).toHaveBeenCalledOnce();
        });

        it("passes parameters to the action", async () => {
            const run = vi.fn();

            const registry = createActionsRegistry<TestContext>();

            registry.set({
                name: "update",
                run,
            });

            const actions = useActionRegistry(registry, {
                enabled: true,
                active: false,
                value: 0,
            });

            await actions.run("update", {
                value: 42,
            });

            expect(run).toHaveBeenCalledWith(
                expect.any(Object),
                { value: 42 },
            );
        });

        it("throws when running an unknown action", async () => {
            const registry = createActionsRegistry<TestContext>();

            const actions = useActionRegistry(registry, {
                enabled: true,
                active: false,
                value: 0,
            });

            await expect(actions.run("unknown")).rejects.toThrow(
                'Action "unknown" not found.',
            );
        });

        it("propagates execution errors", async () => {
            const error = new Error("Execution failed");

            const registry = createActionsRegistry<TestContext>();
            registry.set(createAction({
                run: vi.fn().mockRejectedValue(error),
            }));

            const actions = useActionRegistry(registry, {
                enabled: true,
                active: false,
                value: 0,
            });

            const action = actions.get("test");

            await expect(action?.run()).rejects.toBe(error);
            expect(action?.running.value).toBe(false);
        });

        it("resets running after synchronous execution errors", async () => {
            const registry = createActionsRegistry<TestContext>();

            registry.set(createAction({
                run: () => {
                    throw new Error("Execution failed");
                },
            }));

            const actions = useActionRegistry(registry, {
                enabled: true,
                active: false,
                value: 0,
            });

            const action = actions.get("test");

            await expect(action?.run()).rejects.toThrow("Execution failed");
            expect(action?.running.value).toBe(false);
        });
    });

    describe("concurrency", () => {
        it("prevents concurrent executions by default", async () => {
            const deferred = createDeferred<void>();
            const run = vi.fn(() => deferred.promise);

            const registry = createActionsRegistry<TestContext>();
            registry.set(createAction({ run }));

            const actions = useActionRegistry(registry, {
                enabled: true,
                active: false,
                value: 0,
            });

            const action = actions.get("test");

            const firstExecution = action?.run();

            expect(action?.running.value).toBe(true);

            await expect(action?.run()).rejects.toThrow(
                'Action "test" is already running.',
            );

            expect(run).toHaveBeenCalledOnce();

            deferred.resolve();

            await firstExecution;

            expect(action?.running.value).toBe(false);
        });

        it("allows concurrent executions when enabled", async () => {
            const first = createDeferred<void>();
            const second = createDeferred<void>();

            const run = vi.fn()
                .mockReturnValueOnce(first.promise)
                .mockReturnValueOnce(second.promise);

            const registry = createActionsRegistry<TestContext>();
            registry.set(createAction({ run }));

            const actions = useActionRegistry(
                registry,
                {
                    enabled: true,
                    active: false,
                    value: 0,
                },
                {
                    concurrent: true,
                },
            );

            const action = actions.get("test");

            const firstExecution = action?.run();
            const secondExecution = action?.run();

            expect(run).toHaveBeenCalledTimes(2);
            expect(action?.running.value).toBe(true);

            first.resolve();
            await firstExecution;

            expect(action?.running.value).toBe(true);

            second.resolve();
            await secondExecution;

            expect(action?.running.value).toBe(false);
        });

        it("keeps running true until all concurrent executions finish", async () => {
            const first = createDeferred<void>();
            const second = createDeferred<void>();

            const run = vi.fn()
                .mockReturnValueOnce(first.promise)
                .mockReturnValueOnce(second.promise);

            const registry = createActionsRegistry<TestContext>();
            registry.set(createAction({ run }));

            const actions = useActionRegistry(
                registry,
                {
                    enabled: true,
                    active: false,
                    value: 0,
                },
                {
                    concurrent: true,
                },
            );

            const action = actions.get("test");

            const firstExecution = action?.run();
            const secondExecution = action?.run();

            second.resolve();
            await secondExecution;

            expect(action?.running.value).toBe(true);

            first.resolve();
            await firstExecution;

            expect(action?.running.value).toBe(false);
        });
    });
});
