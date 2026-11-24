<script setup lang="ts">
import {useAttrs} from "vue";
import { mapSlots } from "ox-watt/composables";

const attrs = useAttrs();
const Toolset = mapSlots(OwToolset, {
    filter: (name) => !name.startsWith("action.")
})

</script>
<template>
    <v-btn-group
        v-if="context.editor"
        density="compact"
        variant="text"
    >
        <OwToolset v-bind="attrs">
            <template v-for="slot of slots">
                <template #[name]="slotProps">
                    <slot :name="name" v-bind="props"/>
                </template>
            </template>
        </OwToolset>
    </v-btn-group>
</template>
