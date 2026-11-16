[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / SerializerField

# Interface: SerializerField

Defined in: [src/adm/model.types.ts:49](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L49)

Defines the serialization, deserialization, and validation contract.

## Properties

### defaultValue

> `readonly` **defaultValue**: `unknown`

Defined in: [src/adm/model.types.ts:54](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L54)

***

### nullable

> `readonly` **nullable**: `boolean`

Defined in: [src/adm/model.types.ts:51](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L51)

***

### readOnly

> `readonly` **readOnly**: `boolean`

Defined in: [src/adm/model.types.ts:52](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L52)

***

### required

> `readonly` **required**: `boolean`

Defined in: [src/adm/model.types.ts:50](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L50)

***

### writeOnly

> `readonly` **writeOnly**: `boolean`

Defined in: [src/adm/model.types.ts:53](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L53)

## Methods

### deserialize()

> **deserialize**(`value`, `context?`): `unknown`

Defined in: [src/adm/model.types.ts:68](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L68)

Converts an external value into its internal representation.

#### Parameters

##### value

`unknown`

The value to deserialize.

##### context?

[`FieldDeserializeContext`](FieldDeserializeContext.md)

#### Returns

`unknown`

The deserialized value.

***

### serialize()

> **serialize**(`value`, `context?`): `unknown`

Defined in: [src/adm/model.types.ts:61](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L61)

Converts an internal value into its external representation.

#### Parameters

##### value

`unknown`

The value to serialize.

##### context?

[`FieldSerializeContext`](FieldSerializeContext.md)

#### Returns

`unknown`

The serialized value.

***

### validate()

> **validate**(`value`, `path?`): [`ValidationIssue`](ValidationIssue.md)[]

Defined in: [src/adm/model.types.ts:76](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L76)

Validates a value without transforming it.

#### Parameters

##### value

`unknown`

The value to validate.

##### path?

`string`

The path used in validation issues.

#### Returns

[`ValidationIssue`](ValidationIssue.md)[]

The validation issues found.
