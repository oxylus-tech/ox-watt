import { defineComponent, h } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

import OwVariableToolset from "../../../src/components/actions/OwVariableToolset.vue";

import { TestVariableGroups } from "../../fixtures/variables";

/**
 * Creates a stub for OwToolset that exposes its props and slot bindings.
 */
const OwToolsetStub = defineComponent({
    name: "OwToolset",
    props: {
        toolset: {
            type: Object,
            required: true,
        },
    },
    setup(props, { slots }) {
        return () => h(
            "div",
            { "data-testid": "toolset" },
            slots.default?.({
                toolset: props.toolset,
                variables: TestVariableGroups,
            }),
        );
    },
});

describe("OwVariableToolset", () => {
    it("should render OwToolset", () => {
        const wrapper = mount(OwVariableToolset, {
            props: {
                variables: TestVariableGroups,
            },
            global: {
                stubs: {
                    OwToolset: OwToolsetStub,
                },
            },
        });

        expect(wrapper.find('[data-testid="toolset"]').exists())
            .toBe(true);
    });

    it("should expose variables through its default slot", () => {
        const wrapper = mount(OwVariableToolset, {
            props: {
                variables: TestVariableGroups,
            },
            slots: {
                default: `
                    <div data-testid="variables">
                        {{ variables.length }}
                    </div>
                `,
            },
            global: {
                stubs: {
                    OwToolset: OwToolsetStub,
                },
            },
        });

        expect(wrapper.get('[data-testid="variables"]').text())
            .toBe("2");
    });

    it("should expose the generated toolset through its default slot", () => {
        const wrapper = mount(OwVariableToolset, {
            props: {
                variables: TestVariableGroups,
            },
            slots: {
                default: `
                    <div data-testid="toolset-name">
                        {{ toolset.name }}
                    </div>
                `,
            },
            global: {
                stubs: {
                    OwToolset: OwToolsetStub,
                },
            },
        });

        expect(wrapper.get('[data-testid="toolset-name"]').text())
            .toBe("variables");
    });

    it("should pass the provided variables to OwToolset", () => {
        const receivedToolset = vi.fn();

        const ToolsetSpy = defineComponent({
            name: "OwToolset",
            props: {
                toolset: {
                    type: Object,
                    required: true,
                },
            },
            setup(props) {
                receivedToolset(props.toolset);

                return () => h("div");
            },
        });

        mount(OwVariableToolset, {
            props: {
                variables: TestVariableGroups,
            },
            global: {
                stubs: {
                    OwToolset: ToolsetSpy,
                },
            },
        });

        expect(receivedToolset).toHaveBeenCalledOnce();

        const toolset = receivedToolset.mock.calls[0][0];

        expect(toolset.name).toBe("variables");
        expect(toolset.items).toBeDefined();
    });
});
