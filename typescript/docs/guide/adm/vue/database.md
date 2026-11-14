---
order: 31
---

# Database and repositories

The Vue integration exposes repositories through `useDb()`. Each repository
provides reactive access to its local store and methods to fetch data through
its configured API client.

## Creating the database

Pass model classes to `useDb()`:

```ts
import { useDb } from '@oxylus/ox-watt';

import { Article } from './models/article';
import { User } from './models/user';

export const { db, repositories } = useDb({
    articles: Article,
    users: User,
});
```

The definition keys are used to access the corresponding repositories:

```ts
const articles = repositories.articles;
const users = repositories.users;
```

`useDb()` can also receive existing repository instances. These instances
are reused rather than recreated.

The options accepted by `useDb()` allow repository and API configuration
to be supplied when the database is initialized. Database-specific options
are passed through the `db` property.

## Local data access

### Retrieve one model

Use `get()` to access a model by its identifier:

```ts
const articleRef = repositories.articles.get(articleId);
```

The returned value is a computed reference to the store entry. The store
entry is itself a shallow reference to the model.

In script code, a convenient way to expose the model is:

```ts
import { computed } from 'vue';

const article = computed(() => articleRef.value?.value);
```

The result updates when the corresponding store entry changes.

The identifier can be a plain value, a Vue ref or a getter:

```ts
const articleRef = repositories.articles.get(() => route.params.id);
```

### Retrieve several models

Use `getMany()` to retrieve several entries from the local store:

```ts
const selectedArticles = repositories.articles.getMany(articleIds);
```

It returns a computed value based on the result of the repository store's
`getMany()` method. Its result follows the store's collection type.

As with `get()`, the identifiers can be reactive:

```ts
const selectedArticles = repositories.articles.getMany(
    () => selectedIds.value,
);
```

### Retrieve models with relations

Repositories created by `useDb()` also expose `getWith()` and `getManyWith()`.

```ts
const articleWithAuthor = repositories.articles.getWith(
    articleId,
    ['author'],
);
```

These methods resolve the requested relations from the local database.
They do not fetch missing related data from the API.

The relation names are inferred from the model's relation definitions.

## Fetching data from the API

Repositories expose `fetch()` and `fetchMany()` for API requests.

These methods return reactive request state:

- `result`: result of the last successful request.
- `loading`: whether a request is pending.
- `error`: error raised by the last failed request.
- `execute()`: manually executes the request.

### Fetch one model

```ts
const articleRequest = repositories.articles.fetch(articleId);

await articleRequest.execute();
```

The request is manual by default. To execute it automatically when its
identifier changes, enable watching:

```ts
const articleRequest = repositories.articles.fetch(
    () => route.params.id,
    undefined,
    {
        watch: true,
        immediate: true,
    },
);
```

The request is then executed when the watched identifier changes, and once
immediately when the watcher is created.

### Fetch several models

`fetchMany()` accepts a list of identifiers and sends them through the
repository API client's list operation.

```ts
const articlesRequest = repositories.articles.fetchMany(
    () => selectedIds.value,
    undefined,
    {
        watch: true,
        immediate: true,
    },
);
```

The API options can be supplied as the second argument. The identifiers
are added to those options by the repository composable.

### Handling request state

Request state can be used directly in a Vue component:

```vue
<script setup lang="ts">
import { repositories } from '@/database';

const request = repositories.articles.fetch(
    42,
    undefined,
    {
        watch: true,
        immediate: true,
    },
);
</script>

<template>
    <p v-if="request.loading">Loading...</p>
    <p v-else-if="request.error">Unable to load the article.</p>
    <pre v-else>{{ request.result }}</pre>
</template>
```

Errors are stored in `error`. When using `execute()` manually, the returned
promise also rejects if the request fails.

## Resolving relations

A repository created through `useDb()` exposes methods to fetch its relations.

### Fetch one relation

```ts
const article = /* an Article instance */;

const resolved = await repositories.articles.fetchRelation(
    article,
    'author',
);
```

### Fetch several relations

```ts
const resolved = await repositories.articles.fetchRelations(
    articles,
    ['author', 'comments'],
);
```

When the relation list is omitted, all relations defined by the model are
considered.

The database returned by `useDb()` also exposes these operations. Its methods
take the repository name as their first argument:

```ts
const resolved = await db.fetchRelation(
    'articles',
    article,
    'author',
);

const allResolved = await db.fetchRelations(
    'articles',
    articles,
    ['author', 'comments'],
);
```

These methods perform the API-backed relation fetching and return the
resolved relation structures.

See [API requests](./api.md) for the composables dedicated to relation
fetching and custom API operations.

