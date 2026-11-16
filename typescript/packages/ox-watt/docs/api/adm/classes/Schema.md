[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / Schema

# Class: Schema

Defined in: [src/adm/schema.ts:3](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/schema.ts#L3)

This is the base class used as specification.

A specification allows to:
- define and use fields
- validate input value as fields ones.

## Extends

- [`Spec`](Spec.md)

## Constructors

### Constructor

> **new Schema**(): `Schema`

#### Returns

`Schema`

#### Inherited from

[`Spec`](Spec.md).[`constructor`](Spec.md#constructor)

## Properties

### fields

> `static` **fields**: `Record`\<`string`, [`SerializerField`](../interfaces/SerializerField.md)\> = `{}`

Defined in: [src/adm/spec.ts:42](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L42)

The fields declared by this spec.

#### Inherited from

[`Spec`](Spec.md).[`fields`](Spec.md#fields)

***

### rules?

> `static` `optional` **rules?**: [`ValidationRule`](../type-aliases/ValidationRule.md)[]

Defined in: [src/adm/spec.ts:45](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L45)

Form validation rules.

#### Inherited from

[`Spec`](Spec.md).[`rules`](Spec.md#rules)

***

### schemaName

> `static` **schemaName**: `string` = `"Schema"`

Defined in: [src/adm/schema.ts:4](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/schema.ts#L4)

## Methods

### getDefaults()

> `static` **getDefaults**(): `Record`\<`string`, `unknown`\>

Defined in: [src/adm/spec.ts:58](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L58)

Returns the default values for all declared fields.

#### Returns

`Record`\<`string`, `unknown`\>

An object containing the configured default values.

#### Inherited from

[`Spec`](Spec.md).[`getDefaults`](Spec.md#getdefaults)

***

### getField()

> `static` **getField**(`name`): [`SerializerField`](../interfaces/SerializerField.md) \| `undefined`

Defined in: [src/adm/spec.ts:92](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L92)

Returns a field declared by this model or one of its ancestors.

#### Parameters

##### name

`string`

Field name.

#### Returns

[`SerializerField`](../interfaces/SerializerField.md) \| `undefined`

The field definition, or undefined if it does not exist.

#### Inherited from

[`Spec`](Spec.md).[`getField`](Spec.md#getfield)

***

### getFields()

> `static` **getFields**(): `Record`\<`string`, [`SerializerField`](../interfaces/SerializerField.md)\>

Defined in: [src/adm/spec.ts:77](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L77)

Returns all fields declared by this model and its ancestors.

Child declarations override inherited fields with the same name.
The result is cached independently for each model class.

#### Returns

`Record`\<`string`, [`SerializerField`](../interfaces/SerializerField.md)\>

The resolved field definitions.

#### Inherited from

[`Spec`](Spec.md).[`getFields`](Spec.md#getfields)

***

### getRules()

> `static` **getRules**(): [`ValidationRule`](../type-aliases/ValidationRule.md)[]

Defined in: [src/adm/spec.ts:103](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L103)

Return all rules declared by this model and its ancestors.

Child declarations are appended to parent's ones.

#### Returns

[`ValidationRule`](../type-aliases/ValidationRule.md)[]

The resolved validation rules.

#### Inherited from

[`Spec`](Spec.md).[`getRules`](Spec.md#getrules)

***

### runRules()

> `static` **runRules**(`data`, `options?`): `string`[]

Defined in: [src/adm/spec.ts:134](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L134)

Run rules and return errors message

#### Parameters

##### data

`unknown`

##### options?

[`SpecValidationOptions`](../interfaces/SpecValidationOptions.md)

#### Returns

`string`[]

#### Inherited from

[`Spec`](Spec.md).[`runRules`](Spec.md#runrules)

***

### validate()

> `static` **validate**(`data`, `options?`): [`ValidationIssue`](../interfaces/ValidationIssue.md)[] \| `null`

Defined in: [src/adm/spec.ts:119](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L119)

Validates data against the fields declared by the concrete model class.

#### Parameters

##### data

`unknown`

The data to validate.

##### options?

[`SpecValidationOptions`](../interfaces/SpecValidationOptions.md)

#### Returns

[`ValidationIssue`](../interfaces/ValidationIssue.md)[] \| `null`

True when valid, or false when invalid and noExc is true.

#### Throws

ValidationError If validation fails and noExc is false.

#### Inherited from

[`Spec`](Spec.md).[`validate`](Spec.md#validate)
