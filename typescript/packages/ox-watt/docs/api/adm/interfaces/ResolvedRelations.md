[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ResolvedRelations

# Interface: ResolvedRelations\<TModel, TDefinitions, TRepositories, TStored\>

Defined in: [src/adm/model.types.ts:159](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L159)

Resolved relations for a model instance and its model class.

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

### TDefinitions

`TDefinitions` *extends* [`RelationDefinitions`](../type-aliases/RelationDefinitions.md)

### TRepositories

`TRepositories` *extends* [`Repositories`](../type-aliases/Repositories.md)

### TStored

`TStored` *extends* `boolean` = `true`

## Properties

### item

> **item**: `TModel`

Defined in: [src/adm/model.types.ts:166](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L166)

Original model instance.

***

### relations

> **relations**: `Partial`\<`{ [K in keyof TDefinitions]: ResolvedRelationType<TRepositories, TDefinitions[K], TStored> }`\>

Defined in: [src/adm/model.types.ts:169](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L169)

Resolved relations indexed by their model relation names.
