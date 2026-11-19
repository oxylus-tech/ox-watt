---
order: 30
---

# Vue integration

The Vue integration is built around a few high-level composables:

- `useDb()` creates a database and its reactive repositories.
- Repository composables expose local data and API fetching operations.
- Relation composables resolve model relations.
- Editor composables provide reactive editing and persistence workflows.

## Installation and imports

The examples use the public package entry point:

```ts
import {
    useDb,
    useModelEditor,
    useApiModelEditor,
} from '@oxylus/ox-watt';
```

## Creating a database

The main entry point is `useDb()`. It accepts a collection of model classes
and creates the repositories and database that will be used by the application.

```ts
import { useDb } from '@oxylus/ox-watt';

import { Article } from './models/article';
import { User } from './models/user';

export const { db, repositories } = useDb({
    articles: Article,
    users: User,
});
```

The keys in the definition become the repository names:

```ts
repositories.articles;
repositories.users;
```

Each repository is associated with its model class. The returned repositories
are reactive interfaces that expose local access, API fetching and relation
operations.

`useDb()` also returns the underlying `db` instance. It can be used for
operations that involve several repositories, such as resolving relations.

Create the database once at the appropriate application level and reuse it
where needed. Calling `useDb()` again creates another database and another
set of repositories.

## Using the repositories in a component

Repositories expose computed accessors to the local model store.

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { repositories } from '@/database';

const props = defineProps<{
    articleId: number;
}>();

const articleRef = repositories.articles.get(() => props.articleId);

const article = computed(() => articleRef.value?.value);
</script>

<template>
    <article v-if="article">
        <h1>{{ article.title }}</h1>
        <p>{{ article.content }}</p>
    </article>
</template>
```

The value returned by `get()` is a computed reference to the store entry.
The store entry itself is a shallow reference to the model, hence the
additional `.value` when accessing the model from script code.

See [Database and repositories](./database.md) for local access, fetching
and relation handling.

## Editing models

ADM provides three editor composables:

- `useEditor()` edits an arbitrary object.
- `useModelEditor()` edits an ADM model.
- `useApiModelEditor()` edits an ADM model and persists it through its
  repository API client.

See [Editors](./editors.md) for details and examples.
