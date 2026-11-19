---
order: 25
---

# Relations

Relations describe connections between model instances.

ADM uses model identifiers to represent relationships, allowing models to remain independent from one another.

## Declaring relationships

Consider an application with users and articles.

An article stores the identifier of its author and the identifiers of its reviewers:

```ts
class User extends Model {
    static fields = {
        id: new NumberField(),
        username: new StringField(),
    };
}

class Article extends Model {
    static fields = {
        id: new NumberField(),
        title: new StringField(),
        authorId: new NumberField(),
        reviewerIds: new ListField(
            new NumberField(),
        ),
    };
}
```

The article does not need to embed complete user objects.

## Resolving a relation

Given an article instance:

```ts
const article = new Article({
    id: 12,
    title: 'Introduction to ADM',
    authorId: 42,
    reviewerIds: [43, 44],
});
```

The related user can be retrieved through the user repository:

```ts
const author = users.get(article.authorId);
```

Multiple related users can be retrieved using a query on the target repository:

```ts
const reviewers = users.getBy(
    articles,
    'reviewerIds',
);
```

The exact query helpers depend on the repository implementation.

## Local and remote resolution

Relations can be resolved using locally available data.

If the related instance is not available locally, the target repository can retrieve it from its API.

This separates relationship declaration from data retrieval.

The source model only needs to expose the relevant identifier fields.

## Why identifiers?

Using identifiers instead of embedded objects has several advantages:

- Models remain independent.
- Data structures avoid unnecessary duplication.
- Relationships can be resolved lazily.
- API payloads can remain compact.
- Different repositories can manage their own data.

## Missing related objects

A relation identifier does not guarantee that its target instance is currently available.

Applications should account for unresolved relations, for example while data is loading or when the referenced object no longer exists.
