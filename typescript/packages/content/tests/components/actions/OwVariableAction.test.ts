import { defineComponent, h, provide } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

import { useAction } from "ox-watt";
import OwVariableAction from "../../../src/components/actions/OwVariableAction.vue";
import { provideVariables } from "../../../src/composables/variables";
import { variableAction } from "../../../src/actions"

import { TestVariableGroups } from "../../fixtures/variables";

const run = vi.fn();

/**
 * Stub for OwAction exposing a predictable action slot.
 */
const OwActionStub = defineComponent({
    name: "OwAction",
    inheritAttrs: false,
    setup(_, { slots }) {
        return () => h(
            "div",
            { "data-testid": "action" },
            slots.default?.({
                action: {
                    visible: true,
                    run,
                },
                title: "Variables",
                description: "Insert a variable",
                icon: "mdi-variable",
                disabled: false,
            }),
        );
    },
});

/**
 * Stub for OwActionBtn.
 */
const OwActionBtnStub = defineComponent({
    name: "OwActionBtn",
    props: {
        title: String,
        description: String,
        icon: String,
        disabled: Boolean,
    },
    setup(props) {
        return () => h(
            "button",
            {
                "data-testid": "action-button",
                title: props.title,
                disabled: props.disabled,
            },
            props.title,
        );
    },
});

/**
 * Creates a minimal Vuetify menu stub.
 */
const VMenuStub = defineComponent({
    name: "VMenu",
    setup(_, { slots }) {
        return () => h(
            "div",
            { "data-testid": "menu" },
            [
                slots.activator?.({
                    props: {},
                }),
                slots.default?.(),
            ],
        );
    },
});

/**
 * Creates a minimal Vuetify list stub.
 */
const VListStub = defineComponent({
    name: "VList",
    setup(_, { slots }) {
        return () => h("div", slots.default?.());
    },
});

/**
 * Creates a minimal Vuetify list subheader stub.
 */
const VListSubheaderStub = defineComponent({
    name: "VListSubheader",
    setup(_, { slots }) {
        return () => h(
            "div",
            { "data-testid": "group-title" },
            slots.default?.(),
        );
    },
});

/**
 * Creates a minimal Vuetify list item stub.
 */
const VListItemStub = defineComponent({
    name: "VListItem",
    props: {
        title: String,
        subtitle: String,
        prependIcon: String,
    },
    emits: ["click"],
    setup(props, { emit }) {
        return () => h(
            "button",
            {
                "data-testid": "variable-item",
                "data-icon": props.prependIcon,
                onClick: (event: MouseEvent) => emit("click", event),
            },
            [
                h("span", props.title),
                props.subtitle
                    ? h("small", props.subtitle)
                    : null,
            ],
        );
    },
});

/**
 * Creates a minimal Vuetify icon stub.
 */
const VIconStub = defineComponent({
    name: "VIcon",
    setup(_, { slots }) {
        return () => h("span", slots.default?.());
    },
});

/**
 * Mounts OwVariableAction inside a variables provider.
 *
 * @returns A mounted component wrapper.
 */
function mountVariableAction() {
    const Provider = defineComponent({
        setup() {
            provideVariables(TestVariableGroups);

            return () => h(OwVariableAction, {
                action: useAction(variableAction)
            });
        },
    });

    return mount(Provider, {
        global: {
            stubs: {
                OwAction: OwActionStub,
                OwActionBtn: OwActionBtnStub,
                VMenu: VMenuStub,
                VList: VListStub,
                VListSubheader: VListSubheaderStub,
                VListItem: VListItemStub,
                VIcon: VIconStub,
            },
        },
    });
}

describe("OwVariableAction", () => {
    it("should render the action button", () => {
        const wrapper = mountVariableAction();

        expect(wrapper.get('[data-testid="action-button"]').text())
            .toBe("Variables");
    });

    it("should render all variable groups", () => {
        const wrapper = mountVariableAction();

        const groups = wrapper.findAll('[data-testid="group-title"]');

        expect(groups).toHaveLength(2);
        expect(groups[0].text()).toBe("User");
        expect(groups[1].text()).toBe("Company");
    });

    it("should render all variables", () => {
        const wrapper = mountVariableAction();

        const variables = wrapper.findAll(
            '[data-testid="variable-item"]',
        );

        expect(variables).toHaveLength(3);
        expect(variables.map((item) => item.text())).toEqual([
            "First nameThe user's first name",
            "Last name",
            "Company name",
        ]);
    });

    it("should render variable icons when provided", () => {
        const wrapper = mountVariableAction();

        const variables = wrapper.findAll(
            '[data-testid="variable-item"]',
        );

        expect(variables[0].attributes("data-icon"))
            .toBe("mdi-account");

        expect(variables[1].attributes("data-icon"))
            .toBeUndefined();
    });

    it("should call action.run when a variable is selected", async () => {
        const wrapper = mountVariableAction();

        await wrapper.findAll('[data-testid="variable-item"]')[0].trigger(
            "click",
        );

        expect(run).toHaveBeenCalledOnce();
        expect(run).toHaveBeenCalledWith({
            group: "user",
            variable: TestVariableGroups[0].items[0],
        });
    });

    it("should pass the correct group when selecting a variable from another group", async () => {
        const wrapper = mountVariableAction();

        await wrapper.findAll('[data-testid="variable-item"]')[2].trigger(
            "click",
        );

        expect(run).toHaveBeenCalledWith({
            group: "company",
            variable: TestVariableGroups[1].items[0],
        });
    });
});
