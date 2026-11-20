<script setup lang="ts">
import { computed } from 'vue';

import { useAction } from '../composables/actions';
import type { ActionInstance } from '../types/actions';

/**
 * Props accepted by OwAction.
 */
interface OwActionProps {
    /**
     * Name of the action to resolve from the injected registry.
     */
    name?: string;

    /**
     * Existing action instance.
     *
     * Takes precedence over the action resolved through the registry.
     */
    action?: ActionInstance<any, any, any>;

    /**
     * Overrides the action definition label.
     */
    label?: string;

    /**
     * Overrides the action definition help text.
     */
    help?: string;

    /**
     * HTML button type.
     *
     * @default "button"
     */
    type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<OwActionProps>(), {
    type: 'button',
});

/**
 * Resolve the action from the registry when no instance is provided.
 */
const registeredAction = useAction(props.name ?? '', {
    required: false,
});

/**
 * Resolved action instance.
 */
const action = computed(() => {
    return props.action ?? registeredAction.value;
});

/**
 * Button bindings derived from the resolved action.
 *
 * This object is shared by the default button and the custom slot.
 */
const bindings = computed(() => {
    const currentAction = action.value;

    if (!currentAction) {
        return undefined;
    }

    return {
        ...currentAction,
        type: props.type,
        disabled: !currentAction.enabled.value,
        title: props.help ?? currentAction.definition.help ?? undefined,
        label: props.label ?? currentAction.definition.label ?? '',
        icon: currentAction.definition.icon,
    };
});

/**
 * Expose the resolved action instance and button bindings.
 */
defineExpose({ action, bindings, });
</script>

<template>
    <slot
        v-if="bindings"
        :action="action"
        v-bind="bindings"
    >
        <button
            v-if="bindings.visible"
            v-bind="bindings"
            @click="bindings.run()"
        >
            {{ bindings.label }}
        </button>
    </slot>
</template>
