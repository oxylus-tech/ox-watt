import { defineComponent, h, nextTick } from "vue";

import { afterEach, describe, expect, it, vi } from "vitest";

import OwNamedAction from "@/ui/components/OwNamedAction.vue";
import { createActionsRegistry } from "@/ui/actions";
import { useActionRegistry } from "@/ui/composables/actions";
import type { ActionDefinition } from "@/ui/types/actions";
import { mountComponent } from "@/tests/vue";

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
 * Creates a component providing an action registry to OwNamedAction.
 *
 * @param definition - Action definition to register.
 * @param actionName - Name of the action rendered by OwNamedAction.
 * @returns A Vue component.
 */
function createRegistryHost(
    definition: ActionDefinition<TestContext, void, void>,
    actionName = definition.name,
) {
    return defineComponent({
        setup() {
            const registry = createActionsRegistry<TestContext>();
            registry.set(definition);

            useActionRegistry(registry, context, {
                provide: true,
            });

            return () => h(OwNamedAction, {
                name: actionName,
            });
        },
    });
}

describe("OwNamedAction", () => {
    it("renders the button for a registered action", async () => {
        mount(createRegistryHost(createAction()));

        await nextTick();

        const button = document.body.querySelector("button");

        expect(button).not.toBeNull();
        expect(button?.textContent).toContain("Test action");
        expect(button?.getAttribute("title")).toBe("Run the test action");
    });

    it("does not render the button when the action is not registered", async () => {
        const host = defineComponent({
            setup() {
                const registry = createActionsRegistry<TestContext>();

                useActionRegistry(registry, context, {
                    provide: true,
                });

                return () => h(OwNamedAction, {
                    name: "missing",
                });
            },
        });

        mount(host);

        await nextTick();

        expect(document.body.querySelector("button")).toBeNull();
    });

    it("does not render the button when the action is not visible", async () => {
        mount(createRegistryHost(createAction({
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
                const registry = createActionsRegistry<TestContext>();
                registry.set(createAction({
                    isEnabled: (ctx) => ctx.enabled,
                }));

                useActionRegistry(registry, disabledContext, {
                    provide: true,
                });

                return () => h(OwNamedAction, {
                    name: "test",
                });
            },
        });

        mount(host);

        await nextTick();

        const button = document.body.querySelector("button");

        expect(button).not.toBeNull();
        expect((button as HTMLButtonElement).disabled).toBe(true);
    });

    it("runs the registered action when the button is clicked", async () => {
        const definition = createAction();

        mount(createRegistryHost(definition));

        await nextTick();

        document.body.querySelector("button")?.click();

        expect(definition.run).toHaveBeenCalledOnce();
        expect(definition.run).toHaveBeenCalledWith(context, undefined);
    });

    it("supports overriding the label and help text", async () => {
        const host = defineComponent({
            setup() {
                const registry = createActionsRegistry<TestContext>();
                registry.set(createAction());

                useActionRegistry(registry, context, {
                    provide: true,
                });

                return () => h(OwNamedAction, {
                    name: "test",
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
                const registry = createActionsRegistry<TestContext>();
                registry.set(createAction());

                useActionRegistry(registry, context, {
                    provide: true,
                });

                return () => h(OwNamedAction, {
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
});
