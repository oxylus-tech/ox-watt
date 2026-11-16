[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / StringField

# Class: StringField

Defined in: [src/adm/fields/string.ts:24](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/string.ts#L24)

Validates and serializes string values.

## Extends

- [`Field`](Field.md)\<[`StringFieldConfig`](../interfaces/StringFieldConfig.md)\>

## Constructors

### Constructor

> **new StringField**(`config?`): `StringField`

Defined in: [src/adm/fields/string.ts:29](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/string.ts#L29)

Creates a string field.

#### Parameters

##### config?

[`StringFieldConfig`](../interfaces/StringFieldConfig.md) = `{}`

The string field options.

#### Returns

`StringField`

#### Overrides

`Field<StringFieldConfig>.constructor`

## Properties

### rules?

> `static` `optional` **rules?**: [`ValidationRule`](../type-aliases/ValidationRule.md)[]

Defined in: [src/adm/fields/field.ts:54](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L54)

Default validation rules to apply at all times. *

#### Inherited from

[`Field`](Field.md).[`rules`](Field.md#rules)

***

### widget?

> `static` `optional` **widget?**: `Widget`

Defined in: [src/adm/fields/field.ts:51](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L51)

Default widget used by fields of this class.

#### Inherited from

[`Field`](Field.md).[`widget`](Field.md#widget)

## Accessors

### defaultValue

#### Get Signature

> **get** **defaultValue**(): `unknown`

Defined in: [src/adm/fields/field.ts:91](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L91)

Returns the configured default value.

##### Returns

`unknown`

#### Inherited from

[`Field`](Field.md).[`defaultValue`](Field.md#defaultvalue)

***

### nullable

#### Get Signature

> **get** **nullable**(): `boolean`

Defined in: [src/adm/fields/field.ts:74](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L74)

Whether null is an allowed value.

##### Returns

`boolean`

#### Inherited from

[`Field`](Field.md).[`nullable`](Field.md#nullable)

***

### readOnly

#### Get Signature

> **get** **readOnly**(): `boolean`

Defined in: [src/adm/fields/field.ts:79](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L79)

Whether the field is excluded from deserialization input.

##### Returns

`boolean`

#### Inherited from

[`Field`](Field.md).[`readOnly`](Field.md#readonly)

***

### required

#### Get Signature

> **get** **required**(): `boolean`

Defined in: [src/adm/fields/field.ts:69](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L69)

Whether a value is required.

##### Returns

`boolean`

#### Inherited from

[`Field`](Field.md).[`required`](Field.md#required)

***

### widget

#### Get Signature

> **get** **widget**(): `Widget` \| `undefined`

Defined in: [src/adm/fields/field.ts:100](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L100)

Returns the widget configured for this field.

The instance configuration takes precedence over the class default.

##### Returns

`Widget` \| `undefined`

#### Inherited from

[`Field`](Field.md).[`widget`](Field.md#widget-1)

***

### writeOnly

#### Get Signature

> **get** **writeOnly**(): `boolean`

Defined in: [src/adm/fields/field.ts:84](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L84)

Whether the field is excluded from serialized output.

##### Returns

`boolean`

#### Inherited from

[`Field`](Field.md).[`writeOnly`](Field.md#writeonly)

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

#### Inherited from

[`Field`](Field.md).[`deserialize`](Field.md#deserialize)

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

#### Inherited from

[`Field`](Field.md).[`getRules`](Field.md#getrules)

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

#### Inherited from

[`Field`](Field.md).[`serialize`](Field.md#serialize)

***

### validate()

> **validate**(`value`, `path?`): [`ValidationIssue`](../interfaces/ValidationIssue.md)[]

Defined in: [src/adm/fields/string.ts:34](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/string.ts#L34)

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

***

### getRules()

> `static` **getRules**(): [`ValidationRule`](../type-aliases/ValidationRule.md)[]

Defined in: [src/adm/fields/field.ts:109](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L109)

Returns the validation rules declared by this field class and its parents.

#### Returns

[`ValidationRule`](../type-aliases/ValidationRule.md)[]

The inherited validation rules.

#### Inherited from

[`Field`](Field.md).[`getRules`](Field.md#getrules-1)
