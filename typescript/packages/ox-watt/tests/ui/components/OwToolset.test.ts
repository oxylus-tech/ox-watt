
import { defineComponent, h, nextTick } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";

import OwToolset from "@/ui/components/OwToolset";
import { useToolset } from "@/ui/composables/toolsets";
import type { ActionDefinition, ToolsetDefinition, ToolsetInstance } from "@/ui/types";
import { createDeferred, mountComponent } from "@/tests/vue";

/**
 * Creates a test action definition.
 *
 * @param name - Action name.
 * @param overrides - Additional action properties.
 * @returns The action definition.
 */
function createAction(
    name: string,
    overrides: Partial<ActionDefinition<unknown>> = {},
): ActionDefinition<unknown> {
    return {
        name,
        label: name,
        run: vi.fn(),
        ...overrides,
    };
}

/**
 * Creates a test toolset definition.
 *
 * @param name - Toolset name.
 * @param items - Child definitions.
 * @returns The toolset definition.
 */
function createToolsetDefinition(
    name: string,
    items: ToolsetDefinition<unknown>["items"],
): ToolsetDefinition<unknown> {
    return {
        name,
        items,
    };
}

/**
 * Mounts an OwToolset instance inside a Vue component.
 *
 * @param definition - Toolset definition.
 * @param context - Context passed to the toolset.
 * @param slots - Optional component slots.
 * @returns The created toolset instance.
 */
function mountToolset(
    definition: ToolsetDefinition<unknown>,
    context: unknown = {},
    slots: Record<string, (...args: any[]) => any> = {},
): ToolsetInstance<unknown> {
    let toolset: ToolsetInstance<unknown>;

    const component = defineComponent({
        setup() {
            toolset = useToolset(definition, context, {});

            return () => h(OwToolset, {
                toolset,
            }, slots);
        },
    });

    mountComponent(component, true);

    return toolset!;
}

afterEach(() => {
    document.body.innerHTML = "";
});

describe("OwToolset", () => {
    describe("rendering", () => {
        it("renders its actions", () => {
            mountToolset(createToolsetDefinition("main", [
                createAction("first"),
                createAction("second"),
            ]));

            const buttons = document.body.querySelectorAll("button");

            expect(buttons).toHaveLength(2);
            expect(buttons[0].textContent).toContain("first");
            expect(buttons[1].textContent).toContain("second");
        });

        it("preserves the definition order", () => {
            mountToolset(createToolsetDefinition("main", [
                createAction("first"),
                createAction("second"),
                createAction("third"),
            ]));

            const buttons = Array.from(
                document.body.querySelectorAll("button"),
            );

            expect(buttons.map(button => button.textContent?.trim())).toEqual([
                "first",
                "second",
                "third",
            ]);
        });

        it("renders nested toolsets recursively", () => {
            mountToolset(createToolsetDefinition("main", [
                createAction("first"),
                createToolsetDefinition("nested", [
                    createAction("nested-first"),
                    createAction("nested-second"),
                ]),
                createAction("last"),
            ]));

            const buttons = Array.from(
                document.body.querySelectorAll("button"),
            );

            expect(buttons.map(button => button.textContent?.trim())).toEqual([
                "first",
                "nested-first",
                "nested-second",
                "last",
            ]);
        });

        it("does not render undefined instances", () => {
            const definition = createToolsetDefinition("main", [
                createAction("first"),
            ]);

            const component = defineComponent({
                setup() {
                    const toolset = useToolset(definition, {}, {});

                    vi.spyOn(toolset, "get").mockReturnValue(undefined);

                    return () => h(OwToolset, { toolset });
                },
            });

            mountComponent(component, true);

            expect(document.body.querySelectorAll("button")).toHaveLength(0);
        });
    });

    describe("slots", () => {
        it("renders the prepend slot", () => {
            mountToolset(
                createToolsetDefinition("main", []),
                {},
                {
                    prepend: () => h("span", { class: "prepend" }, "Prepend"),
                },
            );

            expect(document.body.querySelector(".prepend")?.textContent).toBe(
                "Prepend",
            );
        });

        it("renders the append slot", () => {
            mountToolset(
                createToolsetDefinition("main", []),
                {},
                {
                    append: () => h("span", { class: "append" }, "Append"),
                },
            );

            expect(document.body.querySelector(".append")?.textContent).toBe(
                "Append",
            );
        });

        it("allows replacing the default content", () => {
            mountToolset(
                createToolsetDefinition("main", [
                    createAction("first"),
                ]),
                {},
                {
                    default: () => h("span", { class: "custom-content" }, "Custom"),
                },
            );

            expect(document.body.querySelector(".custom-content")).not.toBeNull();
            expect(document.body.querySelectorAll("button")).toHaveLength(0);
        });

        it("exposes each item through the item slot", () => {
            mountToolset(
                createToolsetDefinition("main", [
                    createAction("first"),
                    createAction("second"),
                ]),
                {},
                {
                    item: ({ item }) => h(
                        "span",
                        { class: "item" },
                        item.definition.name,
                    ),
                },
            );

            const items = Array.from(
                document.body.querySelectorAll(".item"),
            );

            expect(items.map(item => item.textContent)).toEqual([
                "first",
                "second",
            ]);
        });

        it("allows customizing action rendering", () => {
            mountToolset(
                createToolsetDefinition("main", [
                    createAction("first"),
                ]),
                {},
                {
                    action: ({ action }) => h(
                        "span",
                        { class: "custom-action" },
                        action.definition.name,
                    ),
                },
            );

            expect(
                document.body.querySelector(".custom-action")?.textContent,
            ).toBe("first");

            expect(document.body.querySelectorAll("button")).toHaveLength(0);
        });

        it("allows customizing nested toolset rendering", () => {
            mountToolset(
                createToolsetDefinition("main", [
                    createToolsetDefinition("nested", [
                        createAction("nested-action"),
                    ]),
                ]),
                {},
                {
                    toolset: ({ toolset }) => h(
                        "span",
                        { class: "custom-toolset" },
                        toolset.definition.name,
                    ),
                },
            );

            expect(
                document.body.querySelector(".custom-toolset")?.textContent,
            ).toBe("nested");

            expect(document.body.querySelectorAll("button")).toHaveLength(0);
        });
    });

    describe("actions", () => {
        it("runs an action when its button is clicked", async () => {
            const run = vi.fn();

            mountToolset(createToolsetDefinition("main", [
                createAction("save", { run }),
            ]));

            const button = document.body.querySelector("button");

            expect(button).not.toBeNull();

            button!.click();

            expect(run).toHaveBeenCalledOnce();
        });

        it("forwards the toolset context to actions", async () => {
            const context = { value: 42 };
            const run = vi.fn();

            mountToolset(
                createToolsetDefinition("main", [
                    createAction("save", { run }),
                ]),
                context,
            );

            document.body.querySelector("button")!.click();

            expect(run).toHaveBeenCalledWith(context, undefined);
        });

        it("renders actions according to their visibility", () => {
            mountToolset(createToolsetDefinition("main", [
                createAction("visible"),
                createAction("hidden", {
                    isVisible: () => false,
                }),
            ]));

            const buttons = document.body.querySelectorAll("button");

            expect(buttons).toHaveLength(1);
            expect(buttons[0].textContent).toContain("visible");
        });

        it("renders disabled actions as disabled buttons", () => {
            mountToolset(createToolsetDefinition("main", [
                createAction("disabled", {
                    isEnabled: () => false,
                }),
            ]));

            expect(document.body.querySelector("button").disabled).toBe(true);
        });

        it("updates the running state while an action is executing", async () => {
            const deferred = createDeferred<void>();

            mountToolset(createToolsetDefinition("main", [
                createAction("save", {
                    run: () => deferred.promise,
                }),
            ]));

            const button = document.body.querySelector("button")!;

            button.click();
            await nextTick();

            expect(button.disabled).toBe(true);

            deferred.resolve();
            await nextTick();
            await nextTick();

            expect(button.disabled).not.toBe(true);
        });
    });
});
