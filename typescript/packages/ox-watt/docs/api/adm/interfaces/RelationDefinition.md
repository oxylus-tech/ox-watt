[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / RelationDefinition

# Interface: RelationDefinition\<TModel\>

Defined in: [src/adm/model.types.ts:111](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L111)

Definition of a relation on the model.

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md) = [`Model`](../classes/Model.md)

## Properties

### many?

> `optional` **many?**: `boolean`

Defined in: [src/adm/model.types.ts:119](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L119)

Whether the relation resolves to multiple models.

***

### repository

> **repository**: `string`

Defined in: [src/adm/model.types.ts:113](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L113)

Related model name.

***

### source

> **source**: `string`

Defined in: [src/adm/model.types.ts:116](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L116)

Field on the current model containing the related identifier.
