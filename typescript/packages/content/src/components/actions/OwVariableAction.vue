<script setup lang="ts">
import { OwAction, OwActionBtn } from "ox-watt";
import { OwVariableActionProps } from "./types"

const props = defineProps<OwVariableActionProps>()
</script>
<template>
    <OwAction v-bind="props">
        <template #default="{ action, ...bindings }">
            <v-menu>
                <template #activator="{props: slotProps}">
                    <OwActionBtn
                        v-bind="slotProps"
                        :visible="bindings.visible"
                        :title="bindings.title"
                        :description="bindings.description"
                        :icon="bindings.icon"
                        :disabled="bindings.disabled"
                        />
                </template>

                <v-list>
                    <template v-for="group of props.action.definition.variables">
                        <v-list-subheader>
                            <v-icon v-if="group.icon" class="mr-2">{{ group.icon }}</v-icon>
                            {{ group.title }}
                        </v-list-subheader>

                        <v-list-item v-for="variable of group.items"
                            :prepend-icon="variable.icon"
                            :title="variable.title"
                            :subtitle="variable.description"
                            @click.stop.prevent="action.run?.({group: group.name, variable})"
                            />
                    </template>
                </v-list>
            </v-menu>
        </template>
    </OwAction>
</template>
