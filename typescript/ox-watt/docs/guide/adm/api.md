---
order: 22
---

# API integration

ADM repositories can connect to remote APIs.

The API layer translates repository operations into HTTP requests and converts responses into model instances.

Models remain independent from API endpoints and transport configuration.

## API configuration

API configuration defines the base URL, request defaults and endpoint definitions.

A global API configuration can provide defaults for all repositories:

```ts
const config = {
    api: {
        baseUrl: '/api/',
        headers: {
            Accept: 'application/json',
        },
    },
};
```

A repository can override this configuration with its own API settings.

For example, a user repository can use `/users/` as its resource path:

```ts
const users = new Repository(User, {
    api: {
        baseUrl: '/users/',
        endpoints: {
            list: {
                path: '/',
            },
            detail: {
                path: '/{id}/',
            },
            create: {
                path: '/',
            },
            update: {
                path: '/{id}/',
            },
            delete: {
                path: '/{id}/',
            },
        },
    },
});
```

The repository-specific API configuration overrides the global API configuration as a whole rather than merging individual API properties.

## Base URL and path

The API configuration distinguishes between:

- `baseUrl`: the root URL of the API.
- `path`: a path appended to the base URL.

For example:

```ts
const apiConfig = {
    baseUrl: '/api/',
    path: '/users/',
};
```

An endpoint path is then resolved relative to the repository API path.

This allows an application to configure a common API root while repositories define their own resource paths.

## Endpoints

Endpoints describe how repository operations map to HTTP requests.

Typical operations include:

| Operation | Purpose |
| --- | --- |
| `list` | Retrieve a collection |
| `detail` | Retrieve one instance |
| `create` | Create an instance |
| `update` | Update an instance |
| `delete` | Delete an instance |

Endpoints can define paths and additional request configuration.

## Retrieving data

Once a repository is configured, application code can retrieve data without manually constructing HTTP requests.

```ts
const users = new Repository(User, userConfig);

const user = await users.fetch(42);
const allUsers = await users.fetchAll();
```

The API client handles request construction, response processing and deserialization.

## Writing data

```ts
const user = new User({
    username: 'alice',
    email: 'alice@example.com',
});

await users.create(user);

user.email = 'alice.new@example.com';

await users.update(user);
await users.delete(user.id);
```

## Response handling

API responses may contain more than the model data itself.

For example, a paginated response may look like:

```json
{
    "count": 42,
    "next": "/api/users/?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "username": "alice"
        }
    ]
}
```

The API configuration can describe where to find the actual model data and associated metadata.

This allows ADM to work with different response formats without coupling models to a particular backend framework.

## Custom API clients

Applications can customize API client behavior when needed, for example to integrate authentication, custom transport logic or additional request options.

Such customization belongs to the repository/API layer, not to the model definition.

