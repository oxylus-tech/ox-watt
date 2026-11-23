
import { defineComponent, h, nextTick } from "vue";

import { afterEach, describe, expect, it, vi } from "vitest";

import OwNamedAction from "@/ui/components/OwNamedAction.vue";
import { useToolset } from "@/ui/composables/toolsets";
import type { ActionDefinition } from "@/ui/types/actions";
import type { ToolsetDefinition, ToolsetInstance } from "@/ui/types/toolsets";
import { createDeferred, mountComponent } from "@/tests/vue";

interface TestContext {
    enabled: boolean;
    active: boolean;
    value: number;
}

const context: TestContext = {
    enabled: true,
    active: false,
    value: 0,
};

const cleanups: Array<() => void> = [];

afterEach(() => {
    while (cleanups.length) {
        cleanups.pop()?.();
    }
});

/**
 * Creates a test action definition.
 *
 * @param overrides - Properties overriding the default definition.
 * @returns An action definition.
 */
function createAction(
    overrides: Partial<ActionDefinition<TestContext, void, void>> = {},
): ActionDefinition<TestContext, void, void> {
    return {
        name: "test",
        label: "Test action",
        help: "Run the test action",
        run: vi.fn(),
        ...overrides,
    };
}

/**
 * Creates a toolset definition containing the supplied actions.
 *
 * @param actions - Actions registered in the toolset.
 * @returns A toolset definition.
 */
function createToolsetDefinition(
    ...actions: ActionDefinition<TestContext, void, void>[]
): ToolsetDefinition<TestContext> {
    return {
        name: "test",
        items: actions,
    };
}

/**
 * Mounts a component and registers its cleanup callback.
 *
 * @param component - Component to mount.
 */
function mount(component: Parameters<typeof mountComponent>[0]): void {
    cleanups.push(mountComponent(component, true));
}

/**
 * Creates a component providing a toolset to OwNamedAction.
 *
 * @param toolset - Toolset instance used to resolve the action.
 * @param name - Name of the action to resolve.
 * @returns A Vue component.
 */
function createActionHost(
    toolset: ToolsetInstance<TestContext>,
    name = "test",
) {
    return defineComponent({
        setup() {
            return () => h(OwNamedAction, {
                toolset,
                name,
            });
        },
    });
}

/**
 * Creates a toolset instance for the supplied actions.
 *
 * @param actions - Actions registered in the toolset.
 * @param testContext - Context used to create action instances.
 * @returns A toolset instance.
 */
function createTestToolset(
    actions: ActionDefinition<TestContext, void, void>[],
    testContext: TestContext = context,
): ToolsetInstance<TestContext> {
    return useToolset(
        createToolsetDefinition(...actions),
        testContext,
        {},
    );
}

describe("OwNamedAction", () => {
    it("renders the button for a registered action", async () => {
        const toolset = createTestToolset([createAction()]);

        mount(createActionHost(toolset));

        await nextTick();

        const button = document.body.querySelector("button");

        expect(button).not.toBeNull();
        expect(button?.textContent).toContain("Test action");
        expect(button?.getAttribute("title")).toBe("Run the test action");
    });

    it("does not render anything when the action is not registered", async () => {
        const toolset = createTestToolset([]);

        mount(createActionHost(toolset, "missing"));

        await nextTick();

        expect(document.body.querySelector("button")).toBeNull();
    });

    it("does not render the button when the action is not visible", async () => {
        const toolset = createTestToolset([
            createAction({
                isVisible: () => false,
            }),
        ]);

        mount(createActionHost(toolset));

        await nextTick();

        expect(document.body.querySelector("button")).toBeNull();
    });

    it("renders a disabled button when the action is disabled", async () => {
        const disabledContext = {
            ...context,
            enabled: false,
        };

        const toolset = createTestToolset([
            createAction({
                isEnabled: (ctx) => ctx.enabled,
            }),
        ], disabledContext);

        mount(createActionHost(toolset));

        await nextTick();

        const button = document.body.querySelector("button");

        expect(button).not.toBeNull();
        expect((button as HTMLButtonElement).disabled).toBe(true);
    });

    it("runs the resolved action when the button is clicked", async () => {
        const definition = createAction();
        const toolset = createTestToolset([definition]);

        mount(createActionHost(toolset));

        await nextTick();

        document.body.querySelector("button")?.click();

        expect(definition.run).toHaveBeenCalledOnce();
        expect(definition.run).toHaveBeenCalledWith(context, undefined);
    });

    it("forwards attributes to OwAction", async () => {
        const toolset = createTestToolset([createAction()]);

        const host = defineComponent({
            setup() {
                return () => h(OwNamedAction, {
                    toolset,
                    name: "test",
                    id: "save-action",
                    class: "custom-action",
                    "data-testid": "named-action",
                });
            },
        });

        mount(host);

        await nextTick();

        const button = document.body.querySelector("button");

        expect(button?.id).toBe("save-action");
        expect(button?.classList.contains("custom-action")).toBe(true);
        expect(button?.getAttribute("data-testid")).toBe("named-action");
    });

    it("forwards action properties to the default slot", async () => {
        let slotProps: Record<string, unknown> | undefined;

        const toolset = createTestToolset([createAction()]);

        const host = defineComponent({
            setup() {
                return () => h(OwNamedAction, {
                    toolset,
                    name: "test",
                }, {
                    default: (props: Record<string, unknown>) => {
                        slotProps = props;

                        return h("button", {
                            type: "button",
                            "data-testid": "custom-action",
                        }, String(props.label));
                    },
                });
            },
        });

        mount(host);

        await nextTick();

        expect(document.body.querySelector('[data-testid="custom-action"]'))
            .not.toBeNull();

        expect(slotProps).toMatchObject({
            label: "Test action",
            help: "Run the test action",
            visible: true,
            enabled: true,
            active: false,
            running: false,
        });
    });

    it("updates the slot state while the action is running", async () => {
        const deferred = createDeferred<void>();
        let slotProps: Record<string, unknown> | undefined;
        let runPromise: Promise<unknown> | undefined;

        const definition = createAction({
            run: () => deferred.promise,
        });

        const toolset = createTestToolset([definition]);

        const host = defineComponent({
            setup() {
                return () => h(OwNamedAction, {
                    toolset,
                    name: "test",
                }, {
                    default: (props: Record<string, unknown>) => {
                        slotProps = props;

                        return h("button", {
                            type: "button",
                            disabled: !props.enabled,
                            onClick: () => {
                                runPromise = (props.run as () => Promise<unknown>)();
                            },
                        }, String(props.label));
                    },
                });
            },
        });

        mount(host);

        await nextTick();

        try {
            document.body.querySelector("button")?.click();

            await nextTick();

            expect(slotProps?.running).toBe(true);
            expect(slotProps?.enabled).toBe(false);
            expect(
                (document.body.querySelector("button") as HTMLButtonElement).disabled,
            ).toBe(true);
        } finally {
            deferred.resolve();

            if (runPromise) {
                await runPromise;
            }

            await nextTick();
        }
    });
});
