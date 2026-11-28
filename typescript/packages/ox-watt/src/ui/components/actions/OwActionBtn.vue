<script setup lang="ts">
import { useAttrs } from "vue"

const attrs = useAttrs()
const props = defineProps<{
    title: string;
    description: string;
    icon: string;
}>()

</script>
<template>
    <v-btn
        :prepend-icon="props.title ? props.icon : ''"
        :icon="props.title ? '' : props.icon"
        :title="props.description"
        :aria-label="props.title || ''"
        :aria-description="props.description"
        v-bind="attrs"
    >
        <slot>{{ props.title || '' }}</slot>
    </v-btn>
</template>
