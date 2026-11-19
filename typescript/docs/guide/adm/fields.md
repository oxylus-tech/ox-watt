---
order: 11
---

# Fields

Fields describe the properties of a model.

Each field defines a value type and may specify constraints, defaults and serialization behavior.

## Built-in fields

ADM provides field types for common JavaScript values.

Typical examples include:

| Field | Value |
| --- | --- |
| StringField | `string` |
| NumberField | `number` |
| BooleanField | `boolean` |
| DateField | `Date` |
| ListField | Array of values |
| RelationField | Relationship to another model |

The available field types are documented in the [API reference](/api/).

## Declaring fields

Fields are declared in the model's static `fields` property.

```ts
class User extends Model {
    static fields = {
        id: new NumberField(),
        username: new StringField(),
        active: new BooleanField(),
    };
}
```

## Required and nullable fields

A field can be required, nullable or both depending on its configuration.

```ts
class User extends Model {
    static fields = {
        id: new NumberField({
            required: true,
        }),
        username: new StringField({
            required: true,
        }),
        description: new StringField({
            required: false,
            nullable: true,
        }),
    };
}
```

These options describe different constraints:

- `required` determines whether a value must be provided.
- `nullable` determines whether `null` is an acceptable value.

A field can therefore be optional without accepting `null`, or required while accepting `null`.

## Default values

Fields can define default values.

```ts
class Article extends Model {
    static fields = {
        title: new StringField({
            default: 'Untitled article',
        }),
        published: new BooleanField({
            default: false,
        }),
    };
}
```

Defaults are useful when creating new instances or when initializing missing values.

For mutable values such as arrays and objects, prefer a factory if the field implementation supports one, so that instances do not share the same mutable default.

## Read-only and write-only fields

Fields can control whether values are included in serialized input or output.

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

A read-only field is generally returned by the server but should not be sent as writable input.

A write-only field can be sent to the server but should not be exposed in serialized output.

These options are particularly useful when working with REST APIs.

## Validation

Each field validates values according to its type and configuration.

```ts
const username = new StringField({
    required: true,
});

username.validate('alice');
```

Invalid values cause validation errors unless validation is configured to return errors instead of throwing.

## Lists

List fields contain values validated by another field.

```ts
class Article extends Model {
    static fields = {
        reviewerIds: new ListField(
            new NumberField(),
        ),
    };
}
```

The inner field validates every element of the list.

## Nested fields and models

Fields can be composed to represent more complex structures.

When a field accepts another field or model definition, it can validate nested data according to that definition.

This is useful for structured values that are not necessarily independent application entities.

## Custom fields

Applications can extend the field base class to implement their own value types and validation rules.

A custom field should define:

- The expected value type.
- Its validation behavior.
- Its serialization behavior, when it differs from the default.

See the API reference for the field extension points.
