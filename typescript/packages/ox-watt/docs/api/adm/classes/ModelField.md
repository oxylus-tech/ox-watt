[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ModelField

# Class: ModelField

Defined in: [src/adm/fields/model.ts:20](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/model.ts#L20)

Serializes and deserializes nested model objects.

Note: it does not link to the database: the model stores are not used here.

## Extends

- [`Field`](Field.md)\<[`ModelFieldConfig`](../interfaces/ModelFieldConfig.md)\>

## Constructors

### Constructor

> **new ModelField**(`config`, `resolveModel`): `ModelField`

Defined in: [src/adm/fields/model.ts:28](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/model.ts#L28)

Creates a nested model field.

#### Parameters

##### config

[`ModelFieldConfig`](../interfaces/ModelFieldConfig.md)

The field configuration.

##### resolveModel

[`ModelResolver`](../type-aliases/ModelResolver.md)

Resolves model names to registered model classes.

#### Returns

`ModelField`

#### Overrides

`Field<ModelFieldConfig>.constructor`

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

> **deserialize**(`value`, `context?`): `unknown`

Defined in: [src/adm/fields/model.ts:83](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/model.ts#L83)

Deserializes a nested model object.

#### Parameters

##### value

`unknown`

##### context?

[`FieldDeserializeContext`](../interfaces/FieldDeserializeContext.md)

#### Returns

`unknown`

#### Overrides

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

> **serialize**(`value`, `context?`): `unknown`

Defined in: [src/adm/fields/model.ts:58](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/model.ts#L58)

Serializes a nested model instance.

#### Parameters

##### value

`unknown`

##### context?

[`FieldSerializeContext`](../interfaces/FieldSerializeContext.md)

#### Returns

`unknown`

#### Overrides

[`Field`](Field.md).[`serialize`](Field.md#serialize)

***

### validate()

> **validate**(`value`, `path?`): [`ValidationIssue`](../interfaces/ValidationIssue.md)[]

Defined in: [src/adm/fields/model.ts:36](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/model.ts#L36)

Validates a nested model object.

#### Parameters

##### value

`unknown`

##### path?

`string` = `""`

#### Returns

[`ValidationIssue`](../interfaces/ValidationIssue.md)[]

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
