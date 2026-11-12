---
order: 10
---

# Models

Models describe the structure and identity of application entities.

A model is defined by extending the base `Model` class and declaring its fields.

## Defining a model

Consider a user entity:

```ts
import { Model, NumberField, StringField } from 'ox-watt/adm';

export class User extends Model {
    static fields = {
        id: new NumberField(),
        username: new StringField(),
        email: new StringField(),
    };
}
```

The `fields` declaration describes the data structure of the model.

Each field is associated with a property name. These names are used when validating, serializing and deserializing data.

## Model identity

Every model has an identifier field.

By default, ADM can use the model's configured identifier field to determine the identity of an instance.

For example:

```ts
const user = new User({
    id: 42,
    username: 'alice',
    email: 'alice@example.com',
});
```

The identifier is used by repositories and relations to locate instances.

A model can explicitly configure its identifier field when the default convention is not appropriate:

```ts
class User extends Model {
    static idField = 'uuid';

    static fields = {
        uuid: new StringField(),
        username: new StringField(),
    };
}
```

## Creating instances

Model instances can be created from ordinary JavaScript objects:

```ts
const user = new User({
    id: 42,
    username: 'alice',
    email: 'alice@example.com',
});
```

This creates a model instance with the declared properties.

The constructor does not necessarily imply that the object is valid. Validation should be performed explicitly when required by the application.

## Validation

Models provide validation based on their field definitions.

```ts
const user = new User({
    id: 42,
    username: 'alice',
    email: 'alice@example.com',
});

user.validate();
```

Validation checks the values against the field definitions.

Invalid values can cause validation errors. Validation options may allow callers to collect or handle errors without throwing exceptions.

## Partial data

Applications frequently work with incomplete data, particularly when updating existing records.

A partial validation allows an object to omit fields that would normally be required.

```ts
const changes = {
    username: 'alice-updated',
};

user.validate(changes, {
    partial: true,
});
```

Partial validation does not mean that supplied values are exempt from validation. It only changes how missing fields are treated.

## Model metadata

Models can expose metadata describing their identity and origin.

This is useful when models are generated, translated or associated with external systems.

Metadata should describe the model itself rather than contain API endpoint configuration.

## Model inheritance

Models can extend other models to reuse common fields and behavior.

```ts
class BaseEntity extends Model {
    static fields = {
        id: new NumberField(),
        createdAt: new DateField(),
    };
}

class Article extends BaseEntity {
    static fields = {
        title: new StringField(),
        content: new StringField(),
    };
}
```

The exact inheritance behavior depends on how the model field definitions are composed.

## Next steps

- [Fields](./fields)
- [Serialization](./serialization)
- [Repositories](./repositories)

