[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ModelField

# Class: ModelField

Defined in: [src/adm/fields/model.ts:20](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/model.ts#L20)

Serializes and deserializes nested model objects.

Note: it does not link to the database: the model stores are not used here.

## Extends

- [`Field`](Field.md)\<[`ModelFieldConfig`](../interfaces/ModelFieldConfig.md)\>

## Constructors

### Constructor

> **new ModelField**(`config`, `resolveModel`): `ModelField`

Defined in: [src/adm/fields/model.ts:28](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/model.ts#L28)

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

> **deserialize**(`value`, `context?`): `unknown`

Defined in: [src/adm/fields/model.ts:83](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/model.ts#L83)

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

### serialize()

> **serialize**(`value`, `context?`): `unknown`

Defined in: [src/adm/fields/model.ts:58](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/model.ts#L58)

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

Defined in: [src/adm/fields/model.ts:36](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/model.ts#L36)

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
