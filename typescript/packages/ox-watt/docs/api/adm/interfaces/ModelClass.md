[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ModelClass

# Interface: ModelClass\<TModel\>

Defined in: [src/adm/model.ts:17](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L17)

Defines the static contract shared by all model classes.

## Extends

- [`SpecClass`](SpecClass.md)\<[`ModelValidationOptions`](ModelValidationOptions.md)\>

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md) = [`Model`](../classes/Model.md)

## Constructors

### Constructor

> **new ModelClass**(`data?`): `TModel`

Defined in: [src/adm/model.ts:36](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L36)

Constructs an instance from already processed data.

#### Parameters

##### data?

`Record`\<`string`, `unknown`\>

The values assigned to the instance.

#### Returns

`TModel`

#### Inherited from

`SpecClass<ModelValidationOptions>.constructor`

## Properties

### entity

> **entity**: `string`

Defined in: [src/adm/model.ts:30](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L30)

***

### fields

> **fields**: `Record`\<`string`, [`SerializerField`](SerializerField.md)\>

Defined in: [src/adm/model.ts:19](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L19)

The fields declared by this model class.

***

### idField

> **idField**: `string`

Defined in: [src/adm/model.ts:25](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L25)

The attribute name used as model id.

***

### modelName

> **modelName**: `string`

Defined in: [src/adm/model.ts:22](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L22)

The unique name used to register this model.

***

### relations

> **relations**: `TModel`\[`"relations"`\]

Defined in: [src/adm/model.ts:28](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L28)

The relations definitions.

***

### rules?

> `optional` **rules?**: [`ValidationRule`](../type-aliases/ValidationRule.md)[]

Defined in: [src/adm/spec.ts:11](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L11)

#### Inherited from

[`SpecClass`](SpecClass.md).[`rules`](SpecClass.md#rules)

## Methods

### deserialize()

> **deserialize**\<`T`\>(`input`, `options?`): `InstanceType`\<`T`\>

Defined in: [src/adm/model.ts:38](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L38)

#### Type Parameters

##### T

`T` *extends* *typeof* [`Model`](../classes/Model.md)

#### Parameters

##### input

`unknown`

##### options?

[`ModelDeserializeOptions`](ModelDeserializeOptions.md)

#### Returns

`InstanceType`\<`T`\>

***

### getDefaults()

> **getDefaults**(): `Record`\<`string`, `unknown`\>

Defined in: [src/adm/spec.ts:14](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L14)

#### Returns

`Record`\<`string`, `unknown`\>

#### Inherited from

[`SpecClass`](SpecClass.md).[`getDefaults`](SpecClass.md#getdefaults)

***

### getField()

> **getField**(`name`): [`SerializerField`](SerializerField.md) \| `undefined`

Defined in: [src/adm/spec.ts:16](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L16)

#### Parameters

##### name

`string`

#### Returns

[`SerializerField`](SerializerField.md) \| `undefined`

#### Inherited from

[`SpecClass`](SpecClass.md).[`getField`](SpecClass.md#getfield)

***

### getFields()

> **getFields**(): `Record`\<`string`, [`SerializerField`](SerializerField.md)\>

Defined in: [src/adm/spec.ts:15](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L15)

#### Returns

`Record`\<`string`, [`SerializerField`](SerializerField.md)\>

#### Inherited from

[`SpecClass`](SpecClass.md).[`getFields`](SpecClass.md#getfields)

***

### getRelation()

> **getRelation**(`name`): [`RelationDefinition`](RelationDefinition.md)\<[`Model`](../classes/Model.md)\> \| `undefined`

Defined in: [src/adm/model.ts:45](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L45)

#### Parameters

##### name

`string`

#### Returns

[`RelationDefinition`](RelationDefinition.md)\<[`Model`](../classes/Model.md)\> \| `undefined`

***

### getRelations()

> **getRelations**(): [`RelationDefinitions`](../type-aliases/RelationDefinitions.md)

Defined in: [src/adm/model.ts:44](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L44)

#### Returns

[`RelationDefinitions`](../type-aliases/RelationDefinitions.md)

***

### i18n()

> **i18n**(`key`, ...`args`): `string`

Defined in: [src/adm/model.ts:41](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L41)

#### Parameters

##### key

`string`

##### args

...`unknown`[]

#### Returns

`string`

***

### i18nKey()

> **i18nKey**(`key?`): `string`

Defined in: [src/adm/model.ts:40](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L40)

#### Parameters

##### key?

`string`

#### Returns

`string`

***

### label()

> **label**(`field?`): `string`

Defined in: [src/adm/model.ts:42](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L42)

#### Parameters

##### field?

`string`

#### Returns

`string`

***

### labelPlural()

> **labelPlural**(`field?`): `string`

Defined in: [src/adm/model.ts:43](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L43)

#### Parameters

##### field?

`string`

#### Returns

`string`

***

### runRules()

> **runRules**(`data`, `options?`): `string`[]

Defined in: [src/adm/spec.ts:17](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L17)

#### Parameters

##### data

`unknown`

##### options?

[`SpecValidationOptions`](SpecValidationOptions.md)

#### Returns

`string`[]

#### Inherited from

[`SpecClass`](SpecClass.md).[`runRules`](SpecClass.md#runrules)

***

### validate()

> **validate**(`value`, `options?`): [`ValidationIssue`](ValidationIssue.md)[] \| `null`

Defined in: [src/adm/spec.ts:13](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L13)

#### Parameters

##### value

`unknown`

##### options?

[`ModelValidationOptions`](ModelValidationOptions.md)

#### Returns

[`ValidationIssue`](ValidationIssue.md)[] \| `null`

#### Inherited from

[`SpecClass`](SpecClass.md).[`validate`](SpecClass.md#validate)
