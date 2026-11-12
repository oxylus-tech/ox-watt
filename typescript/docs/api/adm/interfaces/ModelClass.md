[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ModelClass

# Interface: ModelClass\<TModel\>

Defined in: [src/adm/model.ts:16](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L16)

Defines the static contract shared by all model classes.

## Extends

- [`SpecClass`](SpecClass.md)\<[`ModelValidationOptions`](ModelValidationOptions.md)\>

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md) = [`Model`](../classes/Model.md)

## Constructors

### Constructor

> **new ModelClass**(`data?`): `TModel`

Defined in: [src/adm/model.ts:33](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L33)

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

### fields

> **fields**: `Record`\<`string`, [`SerializerField`](SerializerField.md)\>

Defined in: [src/adm/model.ts:18](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L18)

The fields declared by this model class.

***

### idField

> **idField**: `string`

Defined in: [src/adm/model.ts:24](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L24)

The attribute name used as model id.

***

### modelName

> **modelName**: `string`

Defined in: [src/adm/model.ts:21](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L21)

The unique name used to register this model.

***

### relations

> **relations**: `TModel`\[`"relations"`\]

Defined in: [src/adm/model.ts:27](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L27)

The relations definitions.

## Methods

### deserialize()

> **deserialize**\<`T`\>(`input`, `options?`): `InstanceType`\<`T`\>

Defined in: [src/adm/model.ts:35](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L35)

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

### validate()

> **validate**(`value`, `options?`): [`ValidationIssue`](ValidationIssue.md)[] \| `null`

Defined in: [src/adm/spec.ts:16](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/spec.ts#L16)

Validates a value without transforming it.

#### Parameters

##### value

`unknown`

The value to validate.

##### options?

[`ModelValidationOptions`](ModelValidationOptions.md)

#### Returns

[`ValidationIssue`](ValidationIssue.md)[] \| `null`

The validation issues found.

#### Inherited from

[`SpecClass`](SpecClass.md).[`validate`](SpecClass.md#validate)
