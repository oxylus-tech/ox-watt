<script setup lang="ts">
import { computed } from "vue";
import { t } from 'ox-watt'

import { useRichTextContext } from "../../composables/editor";
import OwToolset from "./OwToolset.vue";

import {
    createBasicToolset,
    createBasicToolsetActions,
} from "./basicToolset";


const context = useRichTextContext();
context.register(createBasicToolset());

const editor = computed(() => context.editor.value);

const actions = createBasicToolsetActions();
</script>

<template>
    <OwToolset
        :title="t('ow-content.toolsets.basic.title')"
        :help="t('ow-content.toolsets.basic.help')"
        :aria-label="t('ow-content.toolsets.basic.ariaLabel')"
        :description="t('ow-content.toolsets.basic.description')"
    >
        <v-btn-group
            v-if="editor"
            density="compact"
            variant="text"
        >
            <v-tooltip
                v-for="action in actions"
                :key="action.name"
                location="top"
            >
                <template #activator="{ props: tooltipProps }">
                    <v-btn
                        v-bind="tooltipProps"
                        :icon="action.icon"
                        :variant="action.isActive(editor) ? 'tonal' : 'text'"
                        :disabled="!action.isEnabled(editor)"
                        :aria-label="t(action.ariaLabelKey)"
                        :aria-description="t(action.descriptionKey)"
                        :title="t(action.titleKey)"
                        @click="action.execute(editor)"
                    />
                </template>

                <span>
                    {{ t(action.titleKey) }} — {{ t(action.helpKey) }}
                </span>
            </v-tooltip>
        </v-btn-group>
    </OwToolset>
</template>
