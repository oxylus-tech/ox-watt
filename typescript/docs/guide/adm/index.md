---
order: 0
---

# ADM — API Data Models

ADM provides a set of tools for defining, validating, storing and accessing application data.

It is designed to provide a consistent data layer between an application and its data sources, while remaining independent from any particular backend or user interface framework.

ADM can be used to:

- Define structured data models and their fields.
- Validate and serialize model instances.
- Organize data access through repositories.
- Store and retrieve model instances locally.
- Connect repositories to remote APIs.
- Resolve relationships between models.
- Integrate model data with Vue applications.

## Installation

Install Ox-Watt in your project:

```bash
pnpm add ox-watt
```

Import ADM from its public entry point:

```ts
import {
    Model,
    Field,
    Repository,
    Database,
} from 'ox-watt/adm';
```

## Concepts

ADM is organized around a few complementary concepts:

| Concept | Responsibility |
| --- | --- |
| Model | Defines the structure and identity of an entity. |
| Field | Describes a model property and its validation rules. |
| Repository | Provides access to instances of a model. |
| Database | Organizes repositories within an application. |
| API | Connects repositories to remote data sources. |
| Model Store | Holds locally available model instances. |
| Relations | Describe and resolve relationships between models. |

The following sections explain these concepts and how they work together.

## Getting started

The best way to understand ADM is to follow a small application example.

Throughout this guide, we will use an application managing users and articles.

A user can write several articles, and an article can have several reviewers.

```ts
class User extends Model {
    static fields = {
        id: new NumberField(),
        username: new StringField(),
        email: new StringField(),
    };
}

class Article extends Model {
    static fields = {
        id: new NumberField(),
        title: new StringField(),
        content: new StringField(),
        authorId: new NumberField(),
        reviewerIds: new ListField(new NumberField()),
    };
}
```

We will progressively build on these models to demonstrate validation, repositories, API access and Vue integration.



## Guide

- [Core concepts](./concepts)
- [Models](./models)
- [Fields](./fields)
- [Serialization](./serialization)
- [Repositories](./repositories)
- [Database](./database)
- [API integration](./api)
- [Relations](./relations)
- [Vue integration](./vue/index)

## API reference

For detailed information about exported classes, interfaces, functions and types, see the [ADM API reference](/api/).
