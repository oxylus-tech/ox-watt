import { defineComponent, h } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi, beforeAll } from "vitest";

import OWModelFields from "@/adm/components/OwModelFields.vue";
import { Model } from "@/adm/model";
import { StringField } from "@/adm/fields/string";

import type { FieldConfig, FieldSet } from "@/adm/components/OwModelFields.types";

/**
 * Test model used by the component tests.
 */
class TestModel extends Model {
    static modelName = "TestModel";

    static fields = {
        firstName: new StringField(),
        lastName: new StringField(),
        email: new StringField()
    };
}

/**
 * Stub for OW-Field.
 *
 * Exposes the received props and attributes through a simple input.
 */
const FieldStub = defineComponent({
    inheritAttrs: false,

    props: {
        field: {
            type: Object,
            required: true
        },
        name: String,
        modelValue: null,
        label: String,
        help: String,
        errors: {
            type: Array,
            default: () => []
        },
        disabled: Boolean,
        readonly: Boolean
    },

    emits: ["update:modelValue"],

    setup(props, { attrs, emit }) {
        return () => h("input", {
            ...attrs,
            "data-field": props.name,
            value: props.modelValue as string,
            disabled: props.disabled,
            readonly: props.readonly,
            onInput: (event: Event) => {
                emit("update:modelValue", (event.target as HTMLInputElement).value);
            }
        });
    }
});

/**
 * Creates a model instance for the tests.
 *
 * @param values Initial model values.
 */
function createModel(values: Record<string, unknown> = {}): TestModel {
    return new TestModel(values);
}

/**
 * Mounts OW-ModelFields with the OW-Field stub.
 *
 * @param model Model instance.
 * @param fields Model fields layout.
 * @param props Additional component props.
 */
function mountComponent(
    model: TestModel,
    fields: Array<string | FieldConfig | FieldSet>,
    props: Record<string, unknown> = {}
) {
    return mount(OWModelFields, {
        props: {
            model,
            fields,
            ...props
        },
        global: {
            stubs: {
                OwField: FieldStub
            }
        }
    });
}

describe("OWModelFields", () => {

    beforeAll(() => {
        vi.spyOn(TestModel, "label").mockImplementation((field) => {
            return String(field ?? "Test model");
        });

        vi.spyOn(TestModel, "i18n").mockImplementation((key) => {
            return String(key);
        });
    });

    it("renders the fields in the declared order", () => {
        const wrapper = mountComponent(
            createModel(),
            ["email", "firstName", "lastName"]
        );

        expect(
            wrapper.findAll("[data-field]").map((field) => field.attributes("data-field"))
        ).toEqual(["email", "firstName", "lastName"]);
    });

    it("renders fields inside fieldsets", () => {
        const wrapper = mountComponent(
            createModel(),
            [
                {
                    title: "Personal information",
                    fields: ["firstName", "lastName"]
                },
                {
                    title: "Contact",
                    fields: ["email"]
                }
            ]
        );

        expect(wrapper.findAll("legend").map((legend) => legend.text())).toEqual([
            "Personal information",
            "Contact"
        ]);

        expect(
            wrapper.findAll("[data-field]").map((field) => field.attributes("data-field"))
        ).toEqual(["firstName", "lastName", "email"]);
    });

    it("renders a mix of fields and fieldsets", () => {
        const wrapper = mountComponent(
            createModel(),
            [
                "firstName",
                {
                    title: "Contact",
                    fields: ["email", "lastName"]
                }
            ]
        );

        expect(
            wrapper.findAll("[data-field]").map((field) => field.attributes("data-field"))
        ).toEqual(["firstName", "email", "lastName"]);

        expect(wrapper.findAll("legend")).toHaveLength(1);
    });

    it("forwards field properties", () => {
        const wrapper = mountComponent(
            createModel(),
            [
                {
                    name: "email",
                    props: {
                        readonly: true,
                        disabled: true,
                        density: "compact",
                        "data-testid": "email-input"
                    }
                }
            ]
        );

        const input = wrapper.find("[data-field='email']");

        expect(input.attributes("readonly")).toBeDefined();
        expect(input.attributes("disabled")).toBeDefined();
        expect(input.attributes("density")).toBe("compact");
        expect(input.attributes("data-testid")).toBe("email-input");
    });

    it("uses component-wide disabled and readonly properties", () => {
        const wrapper = mountComponent(
            createModel(),
            ["firstName", "lastName"],
            {
                disabled: true,
                readonly: true
            }
        );

        for (const input of wrapper.findAll("input")) {
            expect(input.attributes("disabled")).toBeDefined();
            expect(input.attributes("readonly")).toBeDefined();
        }
    });

    it("allows field properties to override component-wide properties", () => {
        const wrapper = mountComponent(
            createModel(),
            [
                {
                    name: "email",
                    props: {
                        disabled: false,
                        readonly: true
                    }
                }
            ],
            {
                disabled: true,
                readonly: false
            }
        );

        const input = wrapper.find("input");

        expect(input.attributes("disabled")).toBeUndefined();
        expect(input.attributes("readonly")).toBeDefined();
    });

    it("forwards field errors", () => {
        const errors = {
            email: ["Invalid email address"],
            firstName: ["Required"]
        };

        const wrapper = mountComponent(
            createModel(),
            ["email", "firstName"],
            { errors }
        );

        const fields = wrapper.findAllComponents(FieldStub);

        expect(fields[0].props("errors")).toEqual(errors.email);
        expect(fields[1].props("errors")).toEqual(errors.firstName);
    });

    it("uses an empty error list when a field has no errors", () => {
        const wrapper = mountComponent(
            createModel(),
            ["email"]
        );

        expect(wrapper.findComponent(FieldStub).props("errors")).toEqual([]);
    });

    it("forwards the model field and its current value", () => {
        const model = createModel({
            email: "test@example.com"
        });

        const wrapper = mountComponent(model, ["email"]);
        const field = wrapper.findComponent(FieldStub);

        expect(field.props("field")).toBe(TestModel.getField("email"));
        expect(field.props("modelValue")).toBe("test@example.com");
    });

    it("updates the model when a field value changes", async () => {
        const model = createModel({
            email: "old@example.com"
        });

        const wrapper = mountComponent(model, ["email"]);

        await wrapper.find("input").setValue("new@example.com");

        expect(model.email).toBe("new@example.com");
    });

    it("throws when the layout references an unknown field", () => {
        expect(() => {
            mountComponent(createModel(), ["unknown"]);
        }).toThrow(/Unknown field "unknown"/);
    });

    it("renders an empty layout", () => {
        const wrapper = mountComponent(createModel(), []);

        expect(wrapper.findAll("[data-field]")).toHaveLength(0);
        expect(wrapper.findAll("legend")).toHaveLength(0);
    });
});

