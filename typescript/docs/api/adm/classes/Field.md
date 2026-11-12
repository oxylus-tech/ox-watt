[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / Field

# Abstract Class: Field\<TConfig\>

Defined in: [src/adm/fields/field.ts:46](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L46)

Provides common behavior for typed fields.

## Extended by

- [`StringField`](StringField.md)
- [`NumberField`](NumberField.md)
- [`IntegerField`](IntegerField.md)
- [`BooleanField`](BooleanField.md)
- [`DateField`](DateField.md)
- [`JSONField`](JSONField.md)
- [`ListField`](ListField.md)
- [`ModelField`](ModelField.md)

## Type Parameters

### TConfig

`TConfig` *extends* [`BaseFieldConfig`](../interfaces/BaseFieldConfig.md) = [`BaseFieldConfig`](../interfaces/BaseFieldConfig.md)

The configuration type accepted by the field.

## Implements

- [`SerializerField`](../interfaces/SerializerField.md)

## Accessors

### nullable

#### Get Signature

> **get** **nullable**(): `boolean`

Defined in: [src/adm/fields/field.ts:66](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L66)

Whether null is an allowed value.

##### Returns

`boolean`

#### Implementation of

[`SerializerField`](../interfaces/SerializerField.md).[`nullable`](../interfaces/SerializerField.md#nullable)

***

### readOnly

#### Get Signature

> **get** **readOnly**(): `boolean`

Defined in: [src/adm/fields/field.ts:71](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L71)

Whether the field is excluded from deserialization input.

##### Returns

`boolean`

#### Implementation of

[`SerializerField`](../interfaces/SerializerField.md).[`readOnly`](../interfaces/SerializerField.md#readonly)

***

### required

#### Get Signature

> **get** **required**(): `boolean`

Defined in: [src/adm/fields/field.ts:61](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L61)

Whether a value is required.

##### Returns

`boolean`

#### Implementation of

[`SerializerField`](../interfaces/SerializerField.md).[`required`](../interfaces/SerializerField.md#required)

***

### writeOnly

#### Get Signature

> **get** **writeOnly**(): `boolean`

Defined in: [src/adm/fields/field.ts:76](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L76)

Whether the field is excluded from serialized output.

##### Returns

`boolean`

#### Implementation of

[`SerializerField`](../interfaces/SerializerField.md).[`writeOnly`](../interfaces/SerializerField.md#writeonly)

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

#### Implementation of

[`SerializerField`](../interfaces/SerializerField.md).[`deserialize`](../interfaces/SerializerField.md#deserialize)

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

#### Implementation of

[`SerializerField`](../interfaces/SerializerField.md).[`serialize`](../interfaces/SerializerField.md#serialize)

***

### validate()

> **validate**(`value`, `path?`): [`ValidationIssue`](../interfaces/ValidationIssue.md)[]

Defined in: [src/adm/fields/field.ts:155](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L155)

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

#### Implementation of

[`SerializerField`](../interfaces/SerializerField.md).[`validate`](../interfaces/SerializerField.md#validate)
