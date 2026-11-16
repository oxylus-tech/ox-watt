[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / Field

# Abstract Class: Field\<TConfig\>

Defined in: [src/adm/fields/field.ts:47](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L47)

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

## Properties

### rules?

> `static` `optional` **rules?**: [`ValidationRule`](../type-aliases/ValidationRule.md)[]

Defined in: [src/adm/fields/field.ts:54](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L54)

Default validation rules to apply at all times. *

***

### widget?

> `static` `optional` **widget?**: `Widget`

Defined in: [src/adm/fields/field.ts:51](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L51)

Default widget used by fields of this class.

## Accessors

### defaultValue

#### Get Signature

> **get** **defaultValue**(): `unknown`

Defined in: [src/adm/fields/field.ts:91](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L91)

Returns the configured default value.

##### Returns

`unknown`

#### Implementation of

[`SerializerField`](../interfaces/SerializerField.md).[`defaultValue`](../interfaces/SerializerField.md#defaultvalue)

***

### nullable

#### Get Signature

> **get** **nullable**(): `boolean`

Defined in: [src/adm/fields/field.ts:74](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L74)

Whether null is an allowed value.

##### Returns

`boolean`

#### Implementation of

[`SerializerField`](../interfaces/SerializerField.md).[`nullable`](../interfaces/SerializerField.md#nullable)

***

### readOnly

#### Get Signature

> **get** **readOnly**(): `boolean`

Defined in: [src/adm/fields/field.ts:79](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L79)

Whether the field is excluded from deserialization input.

##### Returns

`boolean`

#### Implementation of

[`SerializerField`](../interfaces/SerializerField.md).[`readOnly`](../interfaces/SerializerField.md#readonly)

***

### required

#### Get Signature

> **get** **required**(): `boolean`

Defined in: [src/adm/fields/field.ts:69](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L69)

Whether a value is required.

##### Returns

`boolean`

#### Implementation of

[`SerializerField`](../interfaces/SerializerField.md).[`required`](../interfaces/SerializerField.md#required)

***

### widget

#### Get Signature

> **get** **widget**(): `Widget` \| `undefined`

Defined in: [src/adm/fields/field.ts:100](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L100)

Returns the widget configured for this field.

The instance configuration takes precedence over the class default.

##### Returns

`Widget` \| `undefined`

***

### writeOnly

#### Get Signature

> **get** **writeOnly**(): `boolean`

Defined in: [src/adm/fields/field.ts:84](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L84)

Whether the field is excluded from serialized output.

##### Returns

`boolean`

#### Implementation of

[`SerializerField`](../interfaces/SerializerField.md).[`writeOnly`](../interfaces/SerializerField.md#writeonly)

## Methods

### deserialize()

> **deserialize**(`value`, `_context?`): `unknown`

Defined in: [src/adm/fields/field.ts:154](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L154)

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

### getRules()

> **getRules**(): [`ValidationRule`](../type-aliases/ValidationRule.md)[]

Defined in: [src/adm/fields/field.ts:128](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L128)

Returns all form validation rules applicable to this field instance.

Static rules are inherited from the field class hierarchy. Instance rules
are appended afterwards.

#### Returns

[`ValidationRule`](../type-aliases/ValidationRule.md)[]

The validation rules for this field instance.

***

### serialize()

> **serialize**(`value`, `_context?`): `unknown`

Defined in: [src/adm/fields/field.ts:140](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L140)

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

Defined in: [src/adm/fields/field.ts:210](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L210)

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

***

### getRules()

> `static` **getRules**(): [`ValidationRule`](../type-aliases/ValidationRule.md)[]

Defined in: [src/adm/fields/field.ts:109](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L109)

Returns the validation rules declared by this field class and its parents.

#### Returns

[`ValidationRule`](../type-aliases/ValidationRule.md)[]

The inherited validation rules.
