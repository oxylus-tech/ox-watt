---
order: 12
---

# Serialization

Serialization converts model instances into plain data structures suitable for storage or transmission.

Deserialization performs the reverse operation by creating model instances from external data.

## Serializing a model

```ts
const user = new User({
    id: 42,
    username: 'alice',
    email: 'alice@example.com',
});

const data = user.serialize();
```

The result is a plain JavaScript object containing the serialized model data.

## Deserializing data

```ts
const user = User.deserialize({
    id: 42,
    username: 'alice',
    email: 'alice@example.com',
});
```

Deserialization creates an instance of the model and applies its field definitions.

## Read-only and write-only fields

Serialization behavior depends on field configuration.

For example:

```ts
class User extends Model {
    static fields = {
        id: new NumberField({
            readOnly: true,
        }),
        username: new StringField(),
        password: new StringField({
            writeOnly: true,
        }),
    };
}
```

When serializing data for an API request, read-only fields can be excluded.

When serializing data for an API response or another output context, write-only fields can be excluded.

The exact behavior is controlled by serialization options.

## Partial serialization

Applications often need to send only modified fields.

A partial serialization can be used to generate an update payload without requiring every field to be present.

```ts
const payload = user.serialize({
    partial: true,
});
```

Partial serialization should be distinguished from partial validation: one controls the output representation, while the other controls validation of incomplete input.

## External data

Data received from an API is not automatically trusted.

Deserialization and validation should be used to ensure that external data conforms to the expected model structure.

See [API integration](./api).

