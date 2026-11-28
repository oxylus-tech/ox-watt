<script setup lang="ts">
/**
 * @component The `ow-action` component displays an action.
 * It renders a button by default and exposes action information through its slot.
 *
 * @slot default - Custom action rendering.
 */
import { computed, useAttrs, watchEffect } from "vue";

import OwActionBtn from "./OwActionBtn.vue"
import type { OwActionProps } from "./types";

const props = defineProps<OwActionProps<any,any>>();
const attrs = useAttrs();

/**
 * Button bindings derived from the resolved action.
 *
 * @returns Presentation properties, or undefined when no action is provided.
 */
const bindings = computed(() => {
    const action = props.action;

    if (!action) {
        return undefined;
    }

    return {
        disabled: Boolean(attrs.disabled) || !action.enabled.value,
        title: props.noTitle
            ? ''
            : (props.title ?? action.definition.title ?? ""),
        description: props.noDescription
            ? ''
            : props.description ?? action.definition.description,
        icon: action.definition.icon,
    };
});

watchEffect(() => {
    console.log("OwAction title:", props.title);
    console.log("OwAction description:", props.description);
});

/**
 * Exposes the resolved action and its presentation bindings.
 */
defineExpose({
    action: props.action,
    bindings,
});
</script>
<template>
    <slot
        v-if="props.action && bindings"
        :action="props.action"
        v-bind="bindings"
    >
        <OwActionBtn
            v-bind="attrs"
            v-show="props.action.visible"
            :title="bindings.title"
            :description="bindings.description"
            :icon="bindings.icon"
            :disabled="bindings.disabled"
            @click="props.action.run?.(props.params)"
            />
    </slot>
</template>
