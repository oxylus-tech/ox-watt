[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ResolvedRelation

# Type Alias: ResolvedRelation\<TModel, TMany, TStored\>

> **ResolvedRelation**\<`TModel`, `TMany`, `TStored`\> = `TStored` *extends* `true` ? `TMany` *extends* `true` ? `ShallowRef`\<`TModel`\>[] : `ShallowRef`\<`TModel`\> : `TMany` *extends* `true` ? `MaybeRef`\<`TModel`\>[] : `MaybeRef`\<`TModel`\>

Defined in: [src/adm/model.types.ts:128](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L128)

A resolved relation containing one or more related models.

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

### TMany

`TMany` *extends* `boolean`

### TStored

`TStored` *extends* `boolean` = `true`
