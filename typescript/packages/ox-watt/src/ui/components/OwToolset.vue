<script setup lang="ts">
import { computed } from "vue"

import { mapSlots } from "ox-watt/composables"
import OwAction from "./OwAction.vue"
import { isActionInstance, type ToolsetInstance } from "../types"

interface OwToolsetProps {
    /**
     * Toolset to display
     */
    toolset: ToolsetInstance<any>;
}

const props = defineProps<OwToolsetProps>()
const items = computed(() => {
    return props.toolset.definition.items
        .map((item) => props.toolset.get(item.name))
        .filter(v => v !== undefined);
});

const Action = mapSlots(OwAction, {prefix: "action."})
const Toolset = mapSlots(undefined, {prefix: "toolset."})
</script>
<template>
    <slot name="prepend"/>
    <slot>
        <template v-for="item of items">
            <slot name="item" :item="item">
                <template v-if="isActionInstance(item)">
                    <slot name="action" :action="item">
                        <Action :action="item"/>
                    </slot>
                </template>
                <template v-else>
                    <slot name="toolset" :toolset="item">
                        <Toolset is="OwToolset" :toolset="item" />
                    </slot>
                </template>
            </slot>
        </template>
    </slot>
    <slot name="append"/>
</template>
