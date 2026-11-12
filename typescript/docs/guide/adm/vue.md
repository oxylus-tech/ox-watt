---
order: 30
---

# Vue integration

ADM can be integrated into Vue applications to provide reactive access to model data.

The data layer remains independent from Vue. Vue integration is responsible for exposing model instances and repository data in a way that works naturally with the Composition API.

## Setup

Create your repositories and database outside individual components.

```ts
// database.ts

import {
    Database,
    Repository,
} from 'ox-watt/adm';

import { User } from './models/User';
import { Article } from './models/Article';

export const users = new Repository(User);
export const articles = new Repository(Article);

export const database = new Database({
    users,
    articles,
});
```

This ensures that repositories and their local stores are shared across components.

## Using a repository

A component can retrieve data through its repository:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { users } from '@/database';

const loading = ref(false);
const user = ref();

onMounted(async () => {
    loading.value = true;

    try {
        user.value = await users.fetch(42);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div v-if="loading">
        Loading user...
    </div>

    <div v-else-if="user">
        <h1>{{ user.username }}</h1>
        <p>{{ user.email }}</p>
    </div>

    <div v-else>
        User not found.
    </div>
</template>
```

The example uses Vue's standard `ref` for illustration. In an actual application, use the reactive wrappers or composables provided by the ADM Vue integration where appropriate.

## Reactive model access

When model instances are exposed through Vue integration, changes to their properties can be reflected automatically in the UI.

```vue
<script setup lang="ts">
import { users } from '@/database';

const user = users.use(42);
</script>

<template>
    <div v-if="user">
        {{ user.username }}
    </div>
</template>
```

The exact API for reactive access depends on the Vue integration exposed by the installed ADM version.

## Lists and queries

Repositories can provide reactive access to collections and query results.

```vue
<script setup lang="ts">
import { articles } from '@/database';

const items = articles.useList();
</script>

<template>
    <ul>
        <li v-for="article in items" :key="article.id">
            {{ article.title }}
        </li>
    </ul>
</template>
```

A query result represents the result of a particular query. It should not be assumed to contain every instance known to the repository.

An instance retrieved separately may exist in the repository without automatically appearing in a list query.

## Relations in components

Related models can be accessed through their repositories.

```vue
<script setup lang="ts">
import { articles, users } from '@/database';

const article = articles.use(12);
const author = users.use(() => article.value?.authorId);
</script>

<template>
    <article v-if="article">
        <h1>{{ article.title }}</h1>

        <p v-if="author">
            Written by {{ author.username }}
        </p>
    </article>
</template>
```

This example illustrates the desired reactive relationship between an article and its author. Use the relation helpers available in the actual Vue integration when resolving related data.

## Keeping components focused

Components should focus on presentation and user interaction.

Prefer keeping:

- Model definitions in model modules.
- Repository configuration in the data layer.
- Database registration in a central module.
- API configuration outside components.
- Data presentation in Vue components.

This makes the application easier to test and maintain.

