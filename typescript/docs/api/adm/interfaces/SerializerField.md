[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / SerializerField

# Interface: SerializerField

Defined in: [src/adm/model.types.ts:25](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L25)

Defines the serialization, deserialization, and validation contract.

## Properties

### nullable

> `readonly` **nullable**: `boolean`

Defined in: [src/adm/model.types.ts:27](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L27)

***

### readOnly

> `readonly` **readOnly**: `boolean`

Defined in: [src/adm/model.types.ts:28](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L28)

***

### required

> `readonly` **required**: `boolean`

Defined in: [src/adm/model.types.ts:26](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L26)

***

### writeOnly

> `readonly` **writeOnly**: `boolean`

Defined in: [src/adm/model.types.ts:29](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L29)

## Methods

### deserialize()

> **deserialize**(`value`, `context?`): `unknown`

Defined in: [src/adm/model.types.ts:43](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L43)

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

Defined in: [src/adm/model.types.ts:36](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L36)

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

Defined in: [src/adm/model.types.ts:51](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L51)

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
