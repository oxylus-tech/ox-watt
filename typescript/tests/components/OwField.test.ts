import { defineComponent, h } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import OwField from "@/components/OwField.vue";
import { StringField } from "@/adm/fields/string";

const TestWidget = defineComponent({
    props: {
        modelValue: { type: String, default: "", },
        items: { type: Array, default: undefined, },
        errors: { type: Array, default: undefined, },
        label: { type: String, default: undefined, },
        help: { type: String, default: undefined },
        color: { type: String, default: undefined, },
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        return () => h("input", {
            value: props.modelValue,
            "data-items": JSON.stringify(props.items),
            "data-errors": JSON.stringify(props.errors),
            "data-label": props.label,
            "data-color": props.color,
            "data-help": props.help,
            onInput: (event: Event) => {
                emit("update:modelValue", (event.target as HTMLInputElement).value);
            },
        });
    },
});

describe("OwField", () => {
    const field = new StringField();

    it("renders the configured widget", () => {
        const wrapper = mount(OwField, {
            props: {
                field,
                widget: TestWidget,
            },
        });

        expect(wrapper.find("input").exists()).toBe(true);
    });

    it("binds the model value", async () => {
        const wrapper = mount(OwField, {
            props: {
                field,
                widget: TestWidget,
                modelValue: "Initial value",
            },
        });

        expect(wrapper.find("input").element.value).toBe("Initial value");

        await wrapper.find("input").setValue("Updated value");

        expect(wrapper.emitted("update:modelValue")).toEqual([
            ["Updated value"],
        ]);
    });

    it("forwards the label and help text", () => {
        const wrapper = mount(OwField, {
            props: {
                field,
                widget: TestWidget,
                label: "Title",
                help: "Enter a title",
            },
        });

        expect(wrapper.find("input").attributes("data-label")).toBe("Title")
        expect(wrapper.find("input").attributes("data-help")).toBe("Enter a title")
    });

    it("passes selection items to the widget", () => {
        const items = [
            { key: "draft", value: "draft", title: "Draft" },
            { key: "published", value: "published", title: "Published" },
        ];

        const wrapper = mount(OwField, {
            props: {
                field,
                widget: TestWidget,
                items,
            },
        });

        expect(wrapper.find("input").attributes("data-items")).toBe(JSON.stringify(items));
    });

    it("passes validation errors to the widget", () => {
        const errors = [
            { path: "title", message: "This field is required" },
            { path: "title", message: "The value is invalid" },
        ];

        const wrapper = mount(OwField, {
            props: {
                field,
                widget: TestWidget,
                errors,
            },
        });

        expect(wrapper.find("input").attributes("data-errors")).toBe(
            JSON.stringify(errors.map((error) => error.message)),
        );
    });

    it("allows external attributes to override widget configuration props", () => {
        const wrapper = mount(OwField, {
            props: {
                field,
                widget: {
                    component: TestWidget,
                    props: {
                        color: "primary",
                    },
                },
            },
            attrs: {
                color: "secondary",
            },
        });

        expect(wrapper.find("input").attributes("data-color")).toBe("secondary");
    });

    it("uses the widget defined on the field when no override is provided", () => {
        const configuredField = new StringField({
            widget: TestWidget,
        });

        const wrapper = mount(OwField, {
            props: {
                field: configuredField,
            },
        });

        expect(wrapper.find("input").exists()).toBe(true);
    });

    it("forwards named slots to the widget", () => {
        const SlotWidget = defineComponent({
            setup(_, { slots }) {
                console.log(slots)
                return () => h("div", slots.item?.());
            },
        });

        const wrapper = mount(OwField, {
            props: {
                field,
                widget: SlotWidget,
            },
            slots: {
                item: "<span class='custom-item'>Item</span>",
            },
        });

        expect(wrapper.find(".custom-item").exists()).toBe(true);
    });
});
