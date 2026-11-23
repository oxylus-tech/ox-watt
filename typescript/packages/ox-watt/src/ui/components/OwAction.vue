<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useAction } from '../composables/actions';
import type { ActionInstance } from '../types/actions';


/**
 * Props accepted by OwAction.
 */
interface OwActionProps {
    /**
     * Existing action instance.
     *
     * Takes precedence over the action resolved through the registry.
     */
    action: ActionInstance<any, any, any>;

    /**
     * Overrides the action definition label.
     */
    label?: string;

    /**
     * Overrides the action definition help text.
     */
    help?: string;
}

const props = defineProps<OwActionProps>();
const attrs = useAttrs()


/**
 * Button bindings derived from the resolved action.
 *
 * This object is shared by the default button and the custom slot.
 */
const bindings = computed(() => {
    const action = props.action;

    if (!action) {
        return undefined;
    }

    return {
        ...attrs,
        action,
        run: action.run,
        visible: action.visible.value,
        enabled: action.enabled.value,
        active: action.active.value,
        running: action.running.value,
        disabled: !action.enabled.value,
        title: props.help ?? action.definition.help ?? undefined,
        label: props.label ?? action.definition.label ?? '',
        help: props.help ?? action.definition.help ?? undefined,
        icon: action.definition.icon,
    };
});

/**
 * Expose the resolved action instance and button bindings.
 */
defineExpose({ action: props.action, bindings, });
</script>

<template>
    <slot
        v-if="bindings"
        :action="action"
        v-bind="bindings"
    >
        <v-btn
            v-if="bindings.visible"
            v-bind="bindings"
            @click="bindings.run()"
        >
            {{ bindings.label }}
        </v-btn>
    </slot>
</template>
