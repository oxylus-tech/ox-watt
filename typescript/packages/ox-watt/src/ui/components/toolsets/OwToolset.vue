<script setup lang="ts">
/**
 * @component The `ow-toolset` component displays a toolset's children.
 * It does not wrap nested actions and toolsets, but delegates their rendering.
 *
 * @slot prepend - Content displayed before the items.
 * @slot default - Overrides the default item rendering.
 * @slot append - Content displayed after the items.
 * @slot item - Wraps each item instance.
 * @slot action - Customizes action rendering.
 * @slot toolset - Customizes nested toolset rendering.
 */
import { computed, useSlots } from "vue";

import OwAction from "./OwAction.vue";
import { isActionInstance } from "@/ui/types";
import type { OwToolsetProps } from "@/ui/types";

const props = defineProps<OwToolsetProps>();
const slots = useSlots();

const items = computed(() => {
    return props.toolset.definition.items
        .map((item) => props.toolset.get(item.name))
        .filter((item) => item !== undefined);
});
</script>

<template>
    <slot name="prepend" />

    <slot :items="items">
        <template v-for="item in items" :key="item.definition.name">
            <slot name="item" :item="item">
                <template v-if="isActionInstance(item)">
                    <slot name="action" :action="item">
                        <OwAction :action="item"/>
                    </slot>
                </template>

                <template v-else>
                    <slot name="toolset" :toolset="item">
                        <OwToolset v-bind="props" :toolset="item" />
                    </slot>
                </template>
            </slot>
        </template>
    </slot>

    <slot name="append" />
</template>
