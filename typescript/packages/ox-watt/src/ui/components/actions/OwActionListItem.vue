<script setup lang="ts">
/**
 * @component The `ow-action-list-item` component displays an action in a `v-list`.
 */
import { useAttrs } from "vue";

import type { OwActionProps } from "./types";
import OwAction from "./OwAction.vue";

const attrs = useAttrs();
const props = defineProps<Omit<OwActionProps<any,any>, "noTitle">>();
</script>

<template>
    <OwAction v-bind="props">
        <template #default="{ action, ...bindings }">
            <v-list-item
                v-bind="attrs"
                v-show="action.visible.value"
                nav
                :href="action.href"
                :disabled="bindings.disabled"
                :title="bindings.title"
                :subtitle="props.noDescription ? '' : bindings.description"
                :prepend-icon="bindings.icon"
                @click="action.run?.()"
            />
        </template>
    </OwAction>
</template>
