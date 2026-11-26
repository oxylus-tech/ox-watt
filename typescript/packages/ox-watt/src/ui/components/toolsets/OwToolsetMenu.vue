<script setup lang="ts">
/**
 * @component The `ow-toolset-menu` component displays a toolset inside a menu.
 *
 * @slot activator - Customizes the menu activator.
 * @slot prepend - Content displayed before the items.
 * @slot default - Overrides the default item rendering.
 * @slot append - Content displayed after the items.
 * @slot item - Wraps each item instance.
 * @slot action - Customizes action rendering.
 * @slot toolset - Customizes nested toolset rendering.
 */
import { computed, useAttrs, useSlots } from "vue";

import type { OwToolsetMenuProps } from "../../types";
import OwToolsetList from "./OwToolsetList.vue";

const attrs = useAttrs();
const props = defineProps<OwToolsetMenuProps>();
const slots = useSlots();
const forwardedSlotNames = computed(() =>
    Object.keys(slots).filter((name) => name !== 'activator'),
);
</script>

<template>
    <v-menu
        :activator="props.nested ? 'parent' : undefined"
        :open-on-focus="!props.nested"
        :open-on-hover="props.nested"
        :submenu="props.nested"
    >
        <template #activator="{ props: activatorProps }" v-if="!props.nested">
            <slot name="activator" v-bind="activatorProps">
                <v-btn
                    v-bind="{ ...attrs, ...activatorProps }"
                    :prepend-icon="props.toolset.definition.icon"
                >
                    {{ props.toolset.definition.title }}
                </v-btn>
            </slot>
        </template>

        <OwToolsetList :toolset="props.toolset">
            <template
                v-for="name in forwardedSlotNames"
                :key="name"
                #[name]="slotProps"
            >
                <slot :name="name" v-bind="slotProps" />
            </template>

            <template v-if="!slots.toolset" #toolset="{ toolset }">
                <slot name="toolset" :toolset="toolset">
                    <v-list-item
                        :title="toolset.definition.title"
                        :prepend-icon="toolset.definition.icon"
                    >
                        <template #append>
                            <v-icon icon="mdi-menu-right" size="xsmall" />
                        </template>

                        <OwToolsetMenu
                            v-bind="{ ...props, nested: true }"
                            :toolset="toolset"
                        />
                    </v-list-item>
                </slot>
            </template>
        </OwToolsetList>
    </v-menu>
</template>
