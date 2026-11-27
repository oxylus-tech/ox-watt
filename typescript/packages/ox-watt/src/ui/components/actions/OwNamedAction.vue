<script setup lang="ts">
import { useAttrs } from 'vue';
import OwAction from "./OwAction.vue";

import { useNamedAction } from "../../composables/actions";
import type { ToolsetInstance } from "./types";

/**
 * Props accepted by OwNamedAction.
 */
interface OwNamedActionProps {
    /**
     * Name of the registered action.
     */
    name: string;

    /**
     * Toolset used to resolve the action.
     */
    toolset: ToolsetInstance<any>
}

const attrs = useAttrs()
const props = defineProps<OwNamedActionProps>()
const action = useNamedAction(props.toolset, props.name);
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
