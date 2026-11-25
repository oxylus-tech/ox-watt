<script setup lang="ts">
/**
 * @component The `ow-action-icon-btn` component displays an action as an icon button.
 * Action information is displayed in a tooltip.
 */
import { useAttrs } from "vue";

import type { OwActionProps } from "@/ui/types/actions";
import OwAction from "./OwAction.vue";

const attrs = useAttrs();
const props = defineProps<OwActionProps>();
</script>

<template>
    <OwAction v-bind="props">
        <template #default="{ action, ...bindings }">
            <v-tooltip location="bottom">
                <template #activator="{ props: tooltipProps }">
                    <v-icon-btn
                        v-bind="{ ...attrs, ...tooltipProps }"
                        v-show="action.visible.value"
                        :href="action.href"
                        :icon="bindings.icon"
                        :aria-label="bindings.title"
                        :aria-description="bindings.help"
                        :disabled="bindings.disabled"
                        @click="action.run?.()"
                    />
                </template>

                <div>{{ bindings.title }}</div>
                <div v-if="bindings.help">
                    <small>{{ bindings.help }}</small>
                </div>
            </v-tooltip>
        </template>
    </OwAction>
</template>
