[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / Model

# Class: Model

Defined in: [src/adm/model.ts:77](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L77)

Defines the structure and behavior of model instances.

## Extends

- [`Spec`](Spec.md)

## Indexable

> \[`key`: `string`\]: `unknown`

## Constructors

### Constructor

> **new Model**(`data?`): `Model`

Defined in: [src/adm/model.ts:102](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L102)

Creates an instance by assigning its supplied data without validation.

#### Parameters

##### data?

`Record`\<`string`, `unknown`\> = `{}`

The values to assign to the instance.

#### Returns

`Model`

#### Overrides

[`Spec`](Spec.md).[`constructor`](Spec.md#constructor)

## Properties

### app?

> `static` `optional` **app?**: `string`

Defined in: [src/adm/model.ts:93](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L93)

Application name owning the model class.

***

### fields

> `static` **fields**: `Record`\<`string`, [`SerializerField`](../interfaces/SerializerField.md)\> = `{}`

Defined in: [src/adm/model.ts:81](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L81)

The fields declared by this model class.

#### Overrides

[`Spec`](Spec.md).[`fields`](Spec.md#fields)

***

### idField

> `static` **idField**: `string` = `'id'`

Defined in: [src/adm/model.ts:96](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L96)

Attribute name used as model id.

***

### modelName

> `static` **modelName**: `string` = `'model'`

Defined in: [src/adm/model.ts:90](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L90)

The name used to register this model class.
It should match to corresponding backend's model if any.

***

### relations

> `static` **relations**: [`RelationDefinitions`](../type-aliases/RelationDefinitions.md) = `{}`

Defined in: [src/adm/model.ts:84](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L84)

The relations on this model class.

## Accessors

### $id

#### Get Signature

> **get** **$id**(): `unknown`

Defined in: [src/adm/model.ts:133](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L133)

##### Returns

`unknown`

***

### $entity

#### Get Signature

> **get** `static` **$entity**(): `string`

Defined in: [src/adm/model.ts:112](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L112)

Complete model name prefixed with the app's one if any.

It follows the same convention as Django's models for interoperability.

##### Returns

`string`

## Methods

### serialize()

> **serialize**(`options?`): `Record`\<`string`, `unknown`\>

Defined in: [src/adm/model.ts:178](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L178)

Serializes this model instance.

#### Parameters

##### options?

`string`[] \| [`ModelSerializeOptions`](../interfaces/ModelSerializeOptions.md) = `{}`

Serialization options or a list of field names.

#### Returns

`Record`\<`string`, `unknown`\>

The serialized model data.

***

### $i18n()

> `static` **$i18n**(`field?`): `string`

Defined in: [src/adm/model.ts:126](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L126)

#### Parameters

##### field?

`string`

#### Returns

`string`

***

### $i18nKey()

> `static` **$i18nKey**(`field?`): `string`

Defined in: [src/adm/model.ts:119](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L119)

Return the key used as i18n.

#### Parameters

##### field?

`string`

#### Returns

`string`

***

### deserialize()

> `static` **deserialize**\<`T`\>(`input`, `options?`): `InstanceType`\<`T`\>

Defined in: [src/adm/model.ts:144](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L144)

Deserializes and validates model data.

#### Type Parameters

##### T

`T` *extends* *typeof* `Model`

#### Parameters

##### input

`unknown`

Raw model data.

##### options?

[`ModelDeserializeOptions`](../interfaces/ModelDeserializeOptions.md)

Deserialization options.

#### Returns

`InstanceType`\<`T`\>

A new model instance.

***

### label()

> `static` **label**(): `string`

Defined in: [src/adm/model.ts:130](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L130)

#### Returns

`string`

***

### labelPlural()

> `static` **labelPlural**(): `string`

Defined in: [src/adm/model.ts:131](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L131)

#### Returns

`string`

***

### validate()

> `static` **validate**(`data`, `options?`): [`ValidationIssue`](../interfaces/ValidationIssue.md)[] \| `null`

Defined in: [src/adm/spec.ts:44](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/spec.ts#L44)

Validates data against the fields declared by the concrete model class.

#### Parameters

##### data

`unknown`

The data to validate.

##### options?

[`SpecValidationOptions`](../interfaces/SpecValidationOptions.md)

#### Returns

[`ValidationIssue`](../interfaces/ValidationIssue.md)[] \| `null`

True when valid, or false when invalid and noExc is true.

#### Throws

ValidationError If validation fails and noExc is false.

#### Inherited from

[`Spec`](Spec.md).[`validate`](Spec.md#validate)
