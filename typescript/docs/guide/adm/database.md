---
order: 21
---

# Database

A database groups repositories and provides a common access point to them.

It represents the data layer of an application, rather than a traditional database server or SQL connection.

## Creating repositories

Create each repository first:

```ts
const users = new Repository(User);
const articles = new Repository(Article);
```

Repositories are independent and can have their own configuration.

## Creating a database

Register the repository instances in a database:

```ts
const database = new Database({
    users,
    articles,
});
```

The database does not instantiate repositories.

This allows repositories to be configured, customized or subclassed before they become part of the database.

## Accessing repositories

Repositories can then be accessed through the database:

```ts
const user = database.users.get(42);
const article = database.articles.get(12);
```

This provides a convenient central entry point for application code.

## Custom repositories

Applications can define specialized repositories by extending the base repository class.

```ts
class UserRepository extends Repository<User> {
    /**
     * Finds a user by username.
     *
     * @param username Username to search for.
     * @returns Matching user, if available locally.
     */
    getByUsername(username: string): User | undefined {
        return this.getBy({
            username,
        });
    }
}

const users = new UserRepository(User);

const database = new Database({
    users,
    articles: new Repository(Article),
});
```

The database does not need to know about the custom repository implementation.

## Configuration

Database configuration should describe database-level behavior.

Repository and API configuration belong to the repositories themselves.

This separation makes it possible to reuse repositories in different database compositions without mixing application-level registration and transport configuration.

