# Autocomplete

`OWAutocomplete` is an asynchronous autocomplete component built on top of Vuetify's `VAutocomplete`.

It delegates the rendering and interaction to Vuetify while providing a debounced remote-search mechanism. It is intentionally independent of the Ox-Watt database and model layers: the parent component supplies the search function and decides how results are retrieved.

## Basic usage

```vue
<script setup lang="ts">
import { ref } from 'vue';

import OWAutocomplete from '@/components/OwAutocomplete.vue';

interface City {
    id: number;
    name: string;
}

const city = ref<City | null>(null);

/**
 * Search cities using the remote API.
 *
 * @param query Search text.
 * @returns Matching cities.
 */
async function searchCities(query: string): Promise<City[]> {
    const response = await fetch(
        `/api/cities/?search=${encodeURIComponent(query)}`
    );

    if (!response.ok)
        throw new Error('Unable to search cities.');

    return response.json();
}
</script>

<template>
    <OWAutocomplete
        v-model="city"
        :search-items="searchCities"
        item-title="name"
        item-value="id"
        label="City"
    />
</template>
```

## Search configuration

`OWAutocomplete` adds the following properties to the Vuetify `VAutocomplete` API.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `searchItems` | `(query: string) => Promise<TResult[]>` | Required | Asynchronous function used to retrieve matching items. |
| `minSearchLength` | `number` | `3` | Minimum number of non-whitespace characters required to start a search. |
| `debounce` | `number` | `300` | Delay in milliseconds before executing a search after the last input change. |
| `maxWait` | `number` | `1500` | Maximum delay in milliseconds before executing a search, even if the input keeps changing. |
| `searchOnMount` | `boolean` | `false` | Whether to search the initial `search` value when the component is mounted. |

The component uses the generic type parameter `TResult` for its search results. This allows it to work with plain objects, Ox-Watt models, or other result structures.

## Search behavior

### Minimum search length

Searches are only executed when the trimmed query reaches `minSearchLength`.

When the query becomes shorter than this threshold:

- Any pending debounced search is cancelled.
- The displayed search results are cleared.
- Any ongoing request is considered outdated.

### Debouncing and maximum wait

Searches are debounced to avoid issuing a request for every keystroke.

The `maxWait` option ensures that a request is eventually executed even when the user continuously changes the query.

For example, with the default configuration:

- A search is normally executed 300 ms after the last input change.
- If the input keeps changing, a search is still triggered after at most 1500 ms.

### Concurrent requests

When the query changes, previous requests are immediately invalidated.

If an outdated request completes after a more recent query has been entered, its results are ignored. This prevents stale responses from replacing the results of a newer search.

### Preserving results

Existing results remain displayed while a new search is pending.

They are replaced only when the new search succeeds. If the search fails, the previous results are kept.

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | `unknown` | Emitted when the selected value changes. |
| `update:search` | `string` | Emitted when the search text changes. |
| `error` | `unknown` | Emitted when the search function rejects. |

The selected value is independent of the current search results. Consequently, a selected item does not need to be present in the latest result list.

## Vuetify compatibility

`OWAutocomplete` forwards attributes, Vuetify properties and slots to the underlying `VAutocomplete`.

This means that Vuetify features such as the following remain available:

- `multiple`
- `return-object`
- `item-title`
- `item-value`
- `clearable`
- `chips`
- Custom item and selection slots

The component forces Vuetify's `no-filter` property. Filtering is expected to be performed by the supplied search function, typically by the remote API.

Refer to the [Vuetify VAutocomplete documentation](https://vuetifyjs.com/en/api/v-autocomplete/) for the complete list of inherited properties, events and slots.

## Handling search errors

Search errors are emitted through the `error` event. The component does not impose an error-display strategy, leaving the parent responsible for handling failures.

```vue
<script setup lang="ts">
/**
 * Handle an autocomplete search failure.
 *
 * @param error Error raised by the search function.
 */
function handleSearchError(error: unknown): void {
    console.error('Autocomplete search failed:', error);
}
</script>

<template>
    <OWAutocomplete
        :search-items="searchItems"
        @error="handleSearchError"
    />
</template>
```

## Integration with Ox-Watt

The component does not depend directly on repositories, databases or models.

The parent can therefore provide any asynchronous search implementation, including one that uses an Ox-Watt repository or fetches related data before returning the results.

```ts
/**
 * Search records and resolve their related data.
 *
 * @param query Search text.
 * @returns Matching records with their resolved relations.
 */
async function searchItems(query: string) {
    const result = await repository.fetch({
        params: { search: query }
    });

    if (!result?.ok)
        throw new Error('Unable to retrieve records.');

    return database.fetchRelations(
        result.items,
        ['author']
    );
}
```

This keeps the autocomplete reusable while allowing each application to define its own search and data-loading strategy.
