[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / RelationDefinition

# Interface: RelationDefinition\<TModel\>

Defined in: [src/adm/model.types.ts:86](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L86)

Definition of a relation on the model.

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md) = [`Model`](../classes/Model.md)

## Properties

### many?

> `optional` **many?**: `boolean`

Defined in: [src/adm/model.types.ts:94](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L94)

Whether the relation resolves to multiple models.

***

### repository

> **repository**: `string`

Defined in: [src/adm/model.types.ts:88](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L88)

Related model name.

***

### source

> **source**: `string`

Defined in: [src/adm/model.types.ts:91](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L91)

Field on the current model containing the related identifier.
