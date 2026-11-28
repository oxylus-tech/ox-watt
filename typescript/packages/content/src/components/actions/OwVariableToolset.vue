<script setup lang="ts">
import { provideVariables, useVariableToolset } from "../../composables";

import type { VariableGroup } from "../../types/actions";

const props = defineProps<{
    variables: VariableGroup[];
}>();

provideVariables(props.variables);

const toolset = useVariableToolset(props.variables);
</script>

<template>
    <OwToolset :toolset="toolset">
        <slot :toolset="toolset" :variables="variables" />
    </OwToolset>
</template>
