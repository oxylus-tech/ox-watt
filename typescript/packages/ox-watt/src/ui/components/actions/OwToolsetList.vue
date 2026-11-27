<script setup lang="ts">
/**
 * @component The `ow-toolset-list` component displays a toolset as a `v-list`.
 *
 * @slot prepend - Content displayed before the items.
 * @slot default - Overrides the default item rendering.
 * @slot append - Content displayed after the items.
 * @slot item - Wraps each item instance.
 * @slot action - Customizes action rendering.
 * @slot toolset - Customizes nested toolset rendering.
 */
import { useAttrs, useSlots } from "vue";


import type { OwToolsetListProps } from "./types";
import OwToolset from "./OwToolset.vue";
import OwActionListItem from "./OwActionListItem.vue";

defineOptions({
    inheritAttrs: false,
});

const attrs = useAttrs();
const props = defineProps<OwToolsetListProps>();
const slots = useSlots();
const slotNames = Object.keys(slots);
</script>

<template>
    <v-list v-bind="attrs">
        <v-list-subheader
            v-if="props.showTitle && props.toolset.definition.title"
        >
            {{ props.toolset.definition.title }}
        </v-list-subheader>

        <OwToolset :toolset="props.toolset" >
            <template
                v-for="name in slotNames"
                :key="name"
                #[name]="slotProps"
            >
                <slot :name="name" v-bind="slotProps" />
            </template>

            <template v-if="!slots.action" #action="{action}">
                <OwActionListItem :action="action"/>
            </template>

            <template v-if="!slots.toolset" #toolset="{toolset}">
                <OwToolsetList v-bind="props" :toolset="toolset" />
            </template>
        </OwToolset>
    </v-list>
</template>
