[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / Schema

# Class: Schema

Defined in: [src/adm/schema.ts:3](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/schema.ts#L3)

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

Defined in: [src/adm/spec.ts:35](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/spec.ts#L35)

#### Inherited from

[`Spec`](Spec.md).[`fields`](Spec.md#fields)

***

### schemaName

> `static` **schemaName**: `string` = `"Schema"`

Defined in: [src/adm/schema.ts:4](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/schema.ts#L4)

## Methods

### validate()

> `static` **validate**(`data`, `options?`): [`ValidationIssue`](../interfaces/ValidationIssue.md)[] \| `null`

Defined in: [src/adm/spec.ts:44](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/spec.ts#L44)

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
