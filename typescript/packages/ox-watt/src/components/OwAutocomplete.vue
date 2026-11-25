<script setup lang="ts" generic="TResult">
import { onBeforeUnmount, onMounted, ref, shallowRef, useAttrs, useSlots, watch } from 'vue';
import { VAutocomplete } from 'vuetify/components';
import debounce from 'lodash-es/debounce';

import type { OwAutocompleteProps } from "./types";

const props = withDefaults(defineProps<OwAutocompleteProps<TResult>>(), {
    minSearchLength: 3,
    debounce: 300,
    maxWait: 1500,
    searchOnMount: false,
    search: ''
});

const emit = defineEmits<{
    (event: 'update:modelValue', value: unknown): void;
    (event: 'update:search', value: string): void;
    (event: 'error', error: unknown): void;
}>();

const attrs = useAttrs();
const slots = useSlots();

/** Current search results displayed by Vuetify. */
const items = shallowRef<TResult[]>([]);

/** Internal search text. */
const searchText = ref(props.search ?? '');

/** Indicates whether the current search request is pending. */
const internalLoading = ref(false);

/** Identifies the most recent search intent or request. */
let requestId = 0;

/**
 * Executes a search and ignores responses from outdated requests.
 *
 * @param query Search query.
 */
async function executeSearch(query: string): Promise<void> {
    const currentRequestId = ++requestId;

    internalLoading.value = true;

    try {
        const response = await props.searchItems(query);

        if (currentRequestId === requestId) {
            items.value = response;
        }
    } catch (error) {
        if (currentRequestId === requestId) {
            emit('error', error);
        }
    } finally {
        if (currentRequestId === requestId) {
            internalLoading.value = false;
        }
    }
}

/** Debounced search function with a maximum waiting time. */
const debouncedSearch = debounce(
    (query: string) => {
        void executeSearch(query);
    },
    props.debounce,
    {
        maxWait: props.maxWait
    }
);

/**
 * Schedules a search when the query satisfies the minimum length.
 *
 * @param query Current search query.
 */
function scheduleSearch(query: string): void {
    // Invalidate any request already in progress as soon as the query changes.
    requestId++;

    const normalizedQuery = query.trim();

    if (normalizedQuery.length < props.minSearchLength) {
        debouncedSearch.cancel();
        items.value = [];
        internalLoading.value = false;
        return;
    }

    debouncedSearch(query);
}

/**
 * Updates the internal search text and emits the corresponding model event.
 *
 * @param value New search text.
 */
function updateSearch(value: string | null): void {
    const query = value ?? '';

    searchText.value = query;
    emit('update:search', query);
}

watch(
    () => props.search,
    value => {
        const query = value ?? '';

        if (query !== searchText.value) {
            searchText.value = query;
        }
    }
);

watch(searchText, scheduleSearch);

onMounted(() => {
    const initialQuery = props.search ?? '';

    if (
        props.searchOnMount
        && initialQuery.trim().length >= props.minSearchLength
    ) {
        void executeSearch(initialQuery);
    }
});

onBeforeUnmount(() => {
    debouncedSearch.cancel();
    requestId++;
});
</script>

<template>
    <VAutocomplete
        v-bind="attrs"
        :model-value="props.modelValue"
        :search="searchText"
        :items="items"
        :loading="props.loading || internalLoading"
        no-filter
        @update:model-value="emit('update:modelValue', $event)"
        @update:search="updateSearch"
    >
        <template
            v-for="(_, name) in slots"
            v-slot:[name]="slotProps"
        >
            <slot :name="name" v-bind="slotProps ?? {}" />
        </template>
    </VAutocomplete>
</template>
