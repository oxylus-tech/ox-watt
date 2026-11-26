<script setup lang="ts">
/**
 * @component The `ow-toolset-btn-group` component displays a toolset as a `v-btn-group`.
 *
 * @slot prepend - Content displayed before the items.
 * @slot default - Overrides the default item rendering.
 * @slot append - Content displayed after the items.
 * @slot item - Wraps each item instance.
 * @slot action - Customizes action rendering.
 * @slot toolset - Customizes nested toolset rendering.
 */
import { useAttrs, useSlots } from "vue";


import type { OwToolsetProps } from "../../types/toolsets";
import OwToolset from "./OwToolset.vue";
import OwActionListItem from "./OwActionListItem.vue";

defineOptions({
    inheritAttrs: false,
});

const attrs = useAttrs();
const props = defineProps<OwToolsetProps>();
const slots = useSlots();
const slotNames = Object.keys(slots);
</script>

<template>
    <v-btn-group v-bind="attrs">
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
                <OwToolsetList :toolset="toolset" v-props="props"/>
            </template>
        </OwToolset>
    </v-btn-group>
</template>
