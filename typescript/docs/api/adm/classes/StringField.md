[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / StringField

# Class: StringField

Defined in: [src/adm/fields/string.ts:24](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/string.ts#L24)

Validates and serializes string values.

## Extends

- [`Field`](Field.md)\<[`StringFieldConfig`](../interfaces/StringFieldConfig.md)\>

## Constructors

### Constructor

> **new StringField**(`config?`): `StringField`

Defined in: [src/adm/fields/string.ts:29](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/string.ts#L29)

Creates a string field.

#### Parameters

##### config?

[`StringFieldConfig`](../interfaces/StringFieldConfig.md) = `{}`

The string field options.

#### Returns

`StringField`

#### Overrides

`Field<StringFieldConfig>.constructor`

## Accessors

### nullable

#### Get Signature

> **get** **nullable**(): `boolean`

Defined in: [src/adm/fields/field.ts:66](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L66)

Whether null is an allowed value.

##### Returns

`boolean`

#### Inherited from

[`Field`](Field.md).[`nullable`](Field.md#nullable)

***

### readOnly

#### Get Signature

> **get** **readOnly**(): `boolean`

Defined in: [src/adm/fields/field.ts:71](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L71)

Whether the field is excluded from deserialization input.

##### Returns

`boolean`

#### Inherited from

[`Field`](Field.md).[`readOnly`](Field.md#readonly)

***

### required

#### Get Signature

> **get** **required**(): `boolean`

Defined in: [src/adm/fields/field.ts:61](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L61)

Whether a value is required.

##### Returns

`boolean`

#### Inherited from

[`Field`](Field.md).[`required`](Field.md#required)

***

### writeOnly

#### Get Signature

> **get** **writeOnly**(): `boolean`

Defined in: [src/adm/fields/field.ts:76](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L76)

Whether the field is excluded from serialized output.

##### Returns

`boolean`

#### Inherited from

[`Field`](Field.md).[`writeOnly`](Field.md#writeonly)

## Methods

### deserialize()

> **deserialize**(`value`, `_context?`): `unknown`

Defined in: [src/adm/fields/field.ts:99](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L99)

Deserializes a value and validates the resulting representation.

#### Parameters

##### value

`unknown`

The external value to deserialize.

##### \_context?

[`FieldDeserializeContext`](../interfaces/FieldDeserializeContext.md)

#### Returns

`unknown`

The deserialized value.

#### Inherited from

[`Field`](Field.md).[`deserialize`](Field.md#deserialize)

***

### serialize()

> **serialize**(`value`, `_context?`): `unknown`

Defined in: [src/adm/fields/field.ts:85](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L85)

Serializes a value after validating it.

#### Parameters

##### value

`unknown`

The internal value to serialize.

##### \_context?

[`FieldSerializeContext`](../interfaces/FieldSerializeContext.md)

#### Returns

`unknown`

The serialized value.

#### Inherited from

[`Field`](Field.md).[`serialize`](Field.md#serialize)

***

### validate()

> **validate**(`value`, `path?`): [`ValidationIssue`](../interfaces/ValidationIssue.md)[]

Defined in: [src/adm/fields/string.ts:34](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/string.ts#L34)

Validates a value against this field's constraints.

#### Parameters

##### value

`unknown`

The value to validate.

##### path?

`string` = `""`

The path used in validation issues.

#### Returns

[`ValidationIssue`](../interfaces/ValidationIssue.md)[]

The validation issues found.

#### Overrides

[`Field`](Field.md).[`validate`](Field.md#validate)
