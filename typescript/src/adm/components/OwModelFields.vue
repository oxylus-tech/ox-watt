<script setup lang="ts">
import { computed } from "vue";

import { Model } from "../model";
import type { Field } from "../fields/field";

import OwField from "./OwField.vue";

import type {
    FieldConfig,
    FieldSet,
    ModelFieldsLayout
} from "./OwModelFields.types";

/**
 * Props accepted by OwModelFields.
 */
interface Props {
    /**
     * Model instance whose fields are rendered.
     */
    model: Model;

    /**
     * Ordered layout describing the fields to render.
     */
    fields: ModelFieldsLayout;

    /**
     * Validation errors indexed by field name.
     */
    errors?: Record<string, string[]>;

    /**
     * Whether all fields are disabled by default.
     */
    disabled?: boolean;

    /**
     * Whether all fields are readonly by default.
     */
    readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    errors: () => ({}),
    disabled: false,
    readonly: false
});

/**
 * Resolved field configuration.
 */
interface ResolvedField {
    name: string;
    field: Field;
    props: Record<string, unknown>;
}

/**
 * Resolved fieldset configuration.
 */
interface ResolvedFieldSet {
    title: string;
    fields: ResolvedField[];
}

/**
 * Normalized layout item.
 */
type ResolvedLayoutItem =
    | { type: "field"; field: ResolvedField }
    | { type: "fieldset"; fieldset: ResolvedFieldSet };

/**
 * Returns whether a layout item is a fieldset.
 *
 * @param item Layout item to inspect.
 */
function isFieldSet(item: string | FieldConfig | FieldSet): item is FieldSet {
    return typeof item === "object" && "fields" in item;
}

/**
 * Resolves a field configuration against the model class.
 *
 * @param config Field name or field configuration.
 */
function resolveField(config: string | FieldConfig): ResolvedField {
    const name = typeof config === "string" ? config : config.name;
    const modelClass = props.model.constructor as typeof Model;
    const field = modelClass.getField(name);

    if (!field) {
        throw new Error(`Unknown field "${name}" in model "${modelClass.modelName}".`);
    }

    return {
        name,
        field,
        props: typeof config === "string" ? {} : (config.props ?? {})
    };
}

/**
 * Resolves the declared layout into renderable items.
 */
const resolvedLayout = computed<ResolvedLayoutItem[]>(() => {
    return props.fields.map((item) => {
        if (isFieldSet(item)) {
            return {
                type: "fieldset",
                fieldset: {
                    title: item.title,
                    fields: item.fields.map(resolveField)
                }
            };
        }

        return {
            type: "field",
            field: resolveField(item)
        };
    });
});

/**
 * Builds the props forwarded to OwField.
 *
 * Custom props override the defaults, while the model field and
 * its current value remain controlled by OwModelFields.
 *
 * @param resolved Resolved field configuration.
 */
function getFieldBindings(resolved: ResolvedField): Record<string, unknown> {
    const modelClass = props.model.constructor as typeof Model;

    return {
        label: modelClass.label(resolved.name),
        help: modelClass.label(`${resolved.name}.help`),
        errors: props.errors[resolved.name] ?? [],
        disabled: props.disabled,
        readonly: props.readonly,
        ...resolved.props,
        field: resolved.field,
        name: resolved.name,
        modelValue: (props.model as unknown as Record<string, unknown>)[resolved.name]
    };
}

/**
 * Updates a model field from an OwField event.
 *
 * @param name Name of the model field.
 * @param value New field value.
 */
function updateField(name: string, value: unknown): void {
    (props.model as unknown as Record<string, unknown>)[name] = value;
}
</script>

<template>
    <div class="ow-model-fields">
        <template
            v-for="(item, index) in resolvedLayout"
            :key="index"
        >
            <fieldset
                v-if="item.type === 'fieldset'"
                class="ow-model-fields__fieldset"
            >
                <legend>{{ item.fieldset.title }}</legend>

                <OwField
                    v-for="field in item.fieldset.fields"
                    :key="field.name"
                    v-bind="getFieldBindings(field)"
                    @update:model-value="updateField(field.name, $event)"
                />
            </fieldset>

            <OwField
                v-else
                :key="item.field.name"
                v-bind="getFieldBindings(item.field)"
                @update:model-value="updateField(item.field.name, $event)"
            />
        </template>
    </div>
</template>
