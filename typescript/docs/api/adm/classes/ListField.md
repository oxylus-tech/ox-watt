[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ListField

# Class: ListField

Defined in: [src/adm/fields/list.ts:19](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/list.ts#L19)

Validates and transforms arrays using a dedicated child field.

## Extends

- [`Field`](Field.md)\<[`ListFieldConfig`](../interfaces/ListFieldConfig.md)\>

## Constructors

### Constructor

> **new ListField**(`child`, `config?`): `ListField`

Defined in: [src/adm/fields/list.ts:25](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/list.ts#L25)

Creates a list field.

#### Parameters

##### child

[`SerializerField`](../interfaces/SerializerField.md)

The field used to process each element.

##### config?

[`ListFieldConfig`](../interfaces/ListFieldConfig.md) = `{}`

The list-specific options.

#### Returns

`ListField`

#### Overrides

`Field<ListFieldConfig>.constructor`

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

Defined in: [src/adm/fields/list.ts:60](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/list.ts#L60)

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

#### Overrides

[`Field`](Field.md).[`serialize`](Field.md#serialize)

***

### validate()

> **validate**(`value`, `path?`): [`ValidationIssue`](../interfaces/ValidationIssue.md)[]

Defined in: [src/adm/fields/list.ts:33](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/list.ts#L33)

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
