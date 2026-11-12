[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / BooleanField

# Class: BooleanField

Defined in: [src/adm/fields/boolean.ts:12](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/boolean.ts#L12)

Validates boolean values.

## Extends

- [`Field`](Field.md)\<[`BooleanFieldConfig`](../interfaces/BooleanFieldConfig.md)\>

## Constructors

### Constructor

> **new BooleanField**(`config?`): `BooleanField`

Defined in: [src/adm/fields/boolean.ts:17](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/boolean.ts#L17)

Creates a boolean field.

#### Parameters

##### config?

[`BooleanFieldConfig`](../interfaces/BooleanFieldConfig.md) = `{}`

The boolean field options.

#### Returns

`BooleanField`

#### Overrides

`Field<BooleanFieldConfig>.constructor`

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

Defined in: [src/adm/fields/boolean.ts:22](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/boolean.ts#L22)

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
