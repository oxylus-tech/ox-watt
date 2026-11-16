<script setup lang="ts">
import { computed, useAttrs, useId, useSlots } from "vue";

import type { Field } from "@/adm/fields/field";
import type { ValidationIssue } from "@/adm/model.types";
import type { Widget } from "@/adm/fields/widget";

import { getWidgetProps, resolveWidget } from "./widgets";

defineOptions({
    inheritAttrs: false,
});

/**
 * Defines the component properties.
 */
const props = defineProps<{
    /** Field definition. */
    field: Field;

    /** Current field value. */
    modelValue?: unknown;

    /** Optional field name. */
    name?: string;

    /** Optional input identifier. */
    id?: string;

    /** Label displayed above the widget. */
    label?: string;

    /** Help text displayed below the widget. */
    help?: string;

    /** Validation issues associated with the field. */
    errors?: (ValidationIssue|string)[];

    /** Extra form field validation rules **/
    rules?: ValidationRule[];

    /** Items passed to selection widgets. */
    items?: unknown[];

    /** Widget overriding the field default. */
    widget?: Widget;

    /** Whether the field is required. */
    required?: boolean;

    /** Whether the field is disabled. */
    disabled?: boolean;

    /** Whether the field is read-only. */
    readonly?: boolean;
}>();

const emit = defineEmits<{
    /** Emitted when the widget value changes. */
    "update:modelValue": [value: unknown];
}>();

const attrs = useAttrs();
const slots = useSlots();
const uid = useId();

/** Widget definition, with the component prop taking precedence. */
const widget = computed(() => props.widget ?? props.field.widget);

/** Widget resolved based on definition and widget store values. */
const resolvedWidget = computed(() => resolveWidget(widget.value))

/** Identifier used to associate the label and help text with the input. */
const inputId = computed(() => props.id ?? `ow-field-${uid}`);

/**
 * Builds the complete set of widget properties.
 *
 * Precedence, from lowest to highest:
 * 1. Widget configuration props.
 * 2. OW-Field generated attributes and data.
 * 3. Attributes provided by the caller.
 * 4. If provided, map thoses values using WidgetConfig.bind
 */
const widgetBindings = computed<Record<string, unknown>>(() => {
    const errors = (props.errors ?? []).map(
        (error) => typeof error == "string" ? error : error.message
    )
    const rules = [
        ...(props.field.constructor as typeof Field).getRules(),
        ...(props.rules ?? [])
    ]
    
    const initialProps = {
        ...(resolvedWidget?.props),
        id: inputId.value,
        name: props.name,
        label: props.label,
        help: props.help,
        required: props.required ?? props.field.required,
        disabled: props.disabled ?? false,
        readonly: props.readonly ?? props.field.readOnly,
        "aria-invalid": errors.length ? "true" : undefined,
        ...(props.items !== undefined ? { items: props.items } : {}),
        ...attrs,

        errors, rules,
    }

    if(resolvedWidget.value?.bind)
        return resolvedWidget.value.bind(props.field, initialProps)
    return initialProps
});

/** Whether the field currently has validation errors. */
const hasErrors = computed(() => widgetBindings.value.errors?.length);

/**
 * Emits a new value received from the widget.
 *
 * @param value New widget value.
 */
function updateValue(value: unknown): void {
    emit("update:modelValue", value);
}
</script>

<template>
    <component
        :is="resolvedWidget.component"
        v-if="resolvedWidget?.component"
        v-bind="widgetBindings"
        :model-value="modelValue"
        @update:model-value="updateValue"
    >
        <template
            v-for="(_, name) in slots"
            v-slot:[name]="slotProps"
        >
            <slot
                :name="name"
                v-bind="slotProps ?? {}"
            />
        </template>
    </component>
</template>
