<script setup lang="ts">
import { useAttrs } from 'vue';
import OwAction from "./OwAction.vue";

import { useNamedAction } from "../composables/actions";

/**
 * Props accepted by OwNamedAction.
 */
interface OwNamedActionProps {
    /**
     * Name of the registered action.
     */
    name: string;
}


const attrs = useAttrs()
const props = defineProps<OwNamedActionProps>()
const action = useNamedAction(props.name);
</script>

<template>
    <OwAction
        v-if="action"
        :action="action"
        v-bind="attrs"
    >
        <template #default="slotProps">
            <slot v-bind="slotProps" />
        </template>
    </OwAction>
</template>
