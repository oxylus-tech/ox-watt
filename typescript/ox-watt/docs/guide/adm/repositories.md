---
order: 20
---

# Repositories

A repository provides access to instances of a specific model.

It acts as the main interface between application code and the underlying data sources.

A repository can manage locally available data and optionally connect to a remote API.

## Defining a repository

A repository is associated with a model class.

```ts
class UserRepository extends Repository<User> {
    constructor() {
        super(User);
    }
}
```

A repository can also be configured directly when creating an instance.

```ts
const users = new Repository(User);
```

## Local storage

Repositories maintain a local store of model instances.

This allows applications to access already-loaded data without necessarily making another network request.

```ts
const user = users.get(42);
```

The repository may also expose methods for querying the local store:

```ts
const activeUsers = users.getBy({
    active: true,
});
```

Local queries operate on data currently available in the repository. They should not be confused with server-side queries.

## Retrieving data

Repositories can expose methods for retrieving one or more model instances.

```ts
const user = await users.fetch(42);
const allUsers = await users.fetchAll();
```

The distinction between local access and remote retrieval is important:

- `get()` accesses locally available data.
- `fetch()` retrieves data from the configured data source.

The exact method names and options depend on the repository implementation.

## Creating and updating data

Repositories provide operations for writing data.

```ts
const user = new User({
    username: 'alice',
    email: 'alice@example.com',
});

await users.create(user);

user.email = 'alice.new@example.com';

await users.update(user);
```

The repository handles the data source interaction and may update its local store when an operation succeeds.

## Deleting data

```ts
await users.delete(42);
```

Deleting an instance may also remove it from the local store.

## Repository configuration

Repositories can be configured independently.

Configuration may include:

- API configuration.
- Endpoint definitions.
- Data extraction and response handling.
- Repository-specific options.

This keeps model definitions independent from the details of the data source.

## Repository lifecycle

Repositories must be created before the database that registers them.

This is intentional: a repository owns its model-specific configuration and API client.

The database is only responsible for organizing and exposing repository instances.

See [Database](./database) and [API integration](./api).

