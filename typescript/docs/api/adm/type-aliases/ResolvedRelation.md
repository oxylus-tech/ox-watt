[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ResolvedRelation

# Type Alias: ResolvedRelation\<TModel, TMany, TStored\>

> **ResolvedRelation**\<`TModel`, `TMany`, `TStored`\> = `TStored` *extends* `true` ? `TMany` *extends* `true` ? `ShallowRef`\<`TModel`\>[] : `ShallowRef`\<`TModel`\> : `TMany` *extends* `true` ? `MaybeRef`\<`TModel`\>[] : `MaybeRef`\<`TModel`\>

Defined in: [src/adm/model.types.ts:103](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L103)

A resolved relation containing one or more related models.

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

### TMany

`TMany` *extends* `boolean`

### TStored

`TStored` *extends* `boolean` = `true`
