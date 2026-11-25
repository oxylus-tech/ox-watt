<script setup lang="ts">
/**
 * @component The `ow-action` component displays an action.
 * It renders a button by default and exposes action information through its slot.
 *
 * @slot default - Custom action rendering.
 */
import { computed, useAttrs, watchEffect } from "vue";

import type { OwActionProps } from "@/ui/types/actions";

const props = defineProps<OwActionProps>();
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

    console.log(">>>>", props, props.title)
    return {
        disabled: Boolean(attrs.disabled) || !action.enabled.value,
        title: props.title ?? action.definition.title ?? "",
        help: props.help ?? action.definition.help,
        icon: action.definition.icon,
    };
});

watchEffect(() => {
    console.log("OwAction title:", props.title);
    console.log("OwAction help:", props.help);
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
        <v-btn
            v-show="props.action.visible"
            v-bind="attrs"
            :href="props.action.href"
            :prepend-icon="bindings.title ? bindings.icon : ''"
            :icon="!bindings.title ? bindings.icon : ''"
            :title="props.noHelp ? '' : bindings.help"
            :aria-label="bindings.title || ''"
            :aria-description="bindings.help"
            :disabled="bindings.disabled"
            @click="props.action.run?.()"
        >
            {{ bindings.title || '' }}
        </v-btn>
    </slot>
</template>
