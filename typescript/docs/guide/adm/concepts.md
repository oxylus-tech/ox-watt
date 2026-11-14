---
order: 1
---

# Core concepts

ADM separates the definition of application data from the mechanisms used to access and store it.

This separation makes it possible to use the same models with different data sources, while keeping application code independent from API details.

## Architecture overview

The main components are organized as follows:

```text
                    Application
                         |
                         v
                       Model
                         |
                         v
                     Repository
                         |
              +----------+----------+
              |                     |
              v                     v
          Model Store            API Client
              |                     |
              v                     v
          Local data            Remote API
                         |
                         v
                      Database
```

The database provides a registry of repositories. It does not directly perform HTTP requests or define model structures.

## Model

A model describes an application entity.

It defines:

- Its fields.
- Its identifier.
- Its validation and serialization behavior.
- Its relationship to other model types.

Models are independent from repositories and APIs.

See [Models](./models).

## Field

A field describes one property of a model.

It defines the property's type, constraints, default value and serialization behavior.

Fields are reusable and can be composed to describe complex structures.

See [Fields](./fields).

## Repository

A repository provides access to instances of a particular model.

It is responsible for:

- Managing locally available instances.
- Retrieving and storing data.
- Exposing model-specific operations.
- Connecting to an API when configured.

A repository is associated with one model class.

See [Repositories](./repositories).

## Database

A database groups repositories and provides a common access point to them.

It does not create repositories. Repositories are configured and instantiated before being registered in a database.

See [Database](./database).

## API

The API layer handles communication with remote services.

It translates repository operations into HTTP requests and transforms responses into model instances.

API configuration is kept separate from model definitions.

See [API integration](./api).

## Model Store

A model store holds locally available instances of a model.

It allows repositories to retrieve already-loaded data without necessarily making another network request.

The store is an implementation detail of the repository's local data management; application code should generally access it through the repository.

## Relations

Relations connect models through their identifiers.

For example, an article stores an author's identifier rather than embedding an entire user object.

The target repository can then resolve that identifier into a model instance.

See [Relations](./relations).

## Vue integration

ADM can be used in Vue applications through its reactive integration.

The model and repository concepts remain independent from Vue, while the integration provides reactive access to data in components.

See [Vue integration](./vue/index).

