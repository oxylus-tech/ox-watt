<script setup lang="ts">
/**
 * Properties accepted by the OwToolset component.
 */
interface Props {
    /**
     * Visible toolset title.
     */
    title?: string;

    /**
     * Additional help text displayed as a tooltip.
     */
    help?: string;

    /**
     * Accessible label for the toolset group.
     */
    ariaLabel: string;

    /**
     * Accessible description of the toolset.
     */
    description?: string;

    /** Show title */
    showTitle?: boolean;
}

withDefaults(defineProps<Props>(), {
    help: undefined,
    description: undefined,
});
</script>

<template>
    <div
        class="ow-toolset"
        role="group"
        :aria-label="ariaLabel"
        :aria-description="description"
        :title="help"
    >
        <div v-if="props.showTitle" class="ow-toolset__title">
            {{ title }}
        </div>

        <div class="ow-toolset__content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.ow-toolset {
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
}

.ow-toolset__title {
    font-size: 0.75rem;
    font-weight: 500;
}

.ow-toolset__content {
    display: flex;
    align-items: center;
}
</style>
