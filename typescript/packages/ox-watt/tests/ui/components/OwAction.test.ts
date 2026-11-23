import { defineComponent, h, nextTick } from "vue";

import { afterEach, describe, expect, it, vi } from "vitest";

import { createDeferred, mountComponent } from "@/tests/vue";

import OwAction from "@/ui/components/OwAction.vue";
import type { ActionDefinition } from "@/ui/types/actions";
import { useToolset } from "@/ui/composables/toolsets";
import type { ToolsetDefinition } from "@/ui/types/toolsets";

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
 * Mounts a component and registers its cleanup callback.
 *
 * @param component - Component to mount.
 */
function mount(component: Parameters<typeof mountComponent>[0]): void {
    cleanups.push(mountComponent(component, true));
}

/**
 * Creates a test toolset definition containing one action.
 *
 * @param definition - Action definition registered in the toolset.
 * @returns A toolset definition.
 */
function createToolset(
    definition: ActionDefinition<TestContext, void, void>,
): ToolsetDefinition<TestContext> {
    return {
        name: "test",
        items: [definition],
    };
}

/**
 * Creates a component providing an action instance to OwAction.
 *
 * @param definition - Action definition used to create the instance.
 * @returns A Vue component.
 */
function createActionHost(
    definition: ActionDefinition<TestContext, void, void>,
) {
    return defineComponent({
        setup() {
            const toolset = useToolset(
                createToolset(definition),
                context,
                {},
            );

            return () => h(OwAction, {
                action: toolset.get("test"),
            });
        },
    });
}

describe("OwAction", () => {
    it("renders the default button for an action instance", async () => {
        mount(createActionHost(createAction()));

        await nextTick();

        const button = document.body.querySelector("button");

        expect(button).not.toBeNull();
        expect(button?.textContent).toContain("Test action");
        expect(button?.getAttribute("title")).toBe("Run the test action");
    });

    it("does not render the button when the action is not visible", async () => {
        mount(createActionHost(createAction({
            isVisible: () => false,
        })));

        await nextTick();

        expect(document.body.querySelector("button")).toBeNull();
    });

    it("renders a disabled button when the action is disabled", async () => {
        const disabledContext = {
            ...context,
            enabled: false,
        };

        const host = defineComponent({
            setup() {
                const toolset = useToolset(
                    createToolset(createAction({
                        isEnabled: (ctx) => ctx.enabled
                    })),
                    disabledContext,
                    {}
                )

                return () => h(OwAction, {
                    action: toolset.get("test"),
                });
            },
        });

        mount(host);

        await nextTick();

        const button = document.body.querySelector("button");

        expect(button).not.toBeNull();
        expect((button as HTMLButtonElement).disabled).toBe(true);
    });

    it("runs the action when the button is clicked", async () => {
        const definition = createAction();

        mount(createActionHost(definition));

        await nextTick();

        document.body.querySelector("button")?.click();

        expect(definition.run).toHaveBeenCalledOnce();
        expect(definition.run).toHaveBeenCalledWith(context, undefined);
    });

    it("supports overriding the label and help text", async () => {
        const host = defineComponent({
            setup() {
                const toolset = useToolset(
                    createToolset(createAction()),
                    context,
                    {}
                )

                return () => h(OwAction, {
                    action: toolset.get("test"),
                    label: "Save",
                    help: "Save changes",
                });
            },
        });

        mount(host);

        await nextTick();

        const button = document.body.querySelector("button");

        expect(button?.textContent).toContain("Save");
        expect(button?.getAttribute("title")).toBe("Save changes");
    });

    it("provides action properties to the default slot", async () => {
        let slotProps: Record<string, unknown> | undefined;

        const host = defineComponent({
            setup() {
                const toolset = useToolset(
                    createToolset(createAction()),
                    context,
                    {}
                )
                return () => h(OwAction, {
                    action: toolset.get("test"),
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

        const host = defineComponent({
            setup() {
                const toolset = useToolset(
                    createToolset(createAction()),
                    context,
                    {}
                )
                return () => h(OwAction, {
                    action: toolset.get("test"),
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
