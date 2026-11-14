---
order: 32
---

# API requests

ADM repositories expose API operations through their reactive interfaces.
For more specific operations, the Vue integration also provides composables
for API requests and relation fetching.

## Repository API operations

The repository methods `fetch()` and `fetchMany()` are generally the simplest
way to retrieve models.

```ts
const request = repositories.articles.fetch(articleId);

await request.execute();
```

Both methods return an object containing:

| Property | Description |
| --- | --- |
| `result` | Last successful API result |
| `loading` | Whether an operation is pending |
| `error` | Error raised by the last failed operation |
| `execute` | Function that executes the request |

See [Database and repositories](./database.md#fetching-data-from-the-api)
for automatic execution and watching options.

## Custom API operations with `useApi()`

Use `useApi()` when an API operation does not fit the repository's standard
`fetch()` or `fetchMany()` methods.

It accepts:

- A request function receiving API options.
- Static or reactive API options.

```ts
import { computed, ref } from 'vue';
import { useApi } from '@oxylus/ox-watt';

const searchTerm = ref('');

const api = repositories.articles.repository.api();

if (!api) {
    throw new Error('The articles repository has no API client.');
}

const search = useApi(
    (options) => api.list(options),
    computed(() => ({
        search: searchTerm.value,
    })),
);

await search.execute();
```

The returned object exposes the standard request state and an additional
`items` computed reference containing the models returned by the API.

`useApi()` does not execute the request automatically when its options change.
Call `execute()` when the request should run.

## Fetching relations with composables

For relation fetching outside the repository convenience methods, use
`useFetchRelation()` or `useFetchRelations()`.

Both composables receive:

1. The database.
2. The source model instances, as an iterable or reactive getter.
3. The source model's relation definitions.
4. The relation name or names to fetch.
5. Optional API options.
6. Optional automatic execution options.

### Fetch one relation

```ts
import { computed } from 'vue';
import { useFetchRelation } from '@oxylus/ox-watt';

const selectedArticles = computed(() => {
    const article = currentArticle.value;

    return article ? [article] : [];
});

const authorRequest = useFetchRelation(
    db,
    selectedArticles,
    Article.relations,
    'author',
    undefined,
    {
        watch: true,
        immediate: true,
    },
);
```

The request is executed immediately and whenever the source items change.

### Fetch several relations

```ts
import { computed } from 'vue';
import { useFetchRelations } from '@oxylus/ox-watt';

const selectedArticles = computed(() => {
    return articles.value;
});

const relationsRequest = useFetchRelations(
    db,
    selectedArticles,
    Article.relations,
    ['author', 'comments'],
    undefined,
    {
        watch: true,
        immediate: true,
    },
);
```

If the relation list is omitted, all relations declared by the source model
are fetched.

### Request state

Both composables return the same request state structure:

```ts
const {
    result,
    loading,
    error,
    execute,
} = authorRequest;
```

The `result` contains the resolved relation structures associated with the
source models. The request can also be triggered manually through `execute()`.

## Automatic execution options

The relation composables accept the following options as their last argument:

| Option | Default | Description |
| --- | --- | --- |
| `watch` | `false` | Watch the supplied reactive sources |
| `immediate` | `false` | Execute immediately when watching is enabled |
| `deep` | `false` | Watch nested changes in the sources |

Without `watch: true`, the operation is only executed when calling `execute()`.


