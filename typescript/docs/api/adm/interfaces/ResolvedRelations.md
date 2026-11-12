[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ResolvedRelations

# Interface: ResolvedRelations\<TModel, TDefinitions, TRepositories, TStored\>

Defined in: [src/adm/model.types.ts:134](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L134)

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

Defined in: [src/adm/model.types.ts:141](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L141)

Original model instance.

***

### relations

> **relations**: `Partial`\<`{ [K in keyof TDefinitions]: ResolvedRelationType<TRepositories, TDefinitions[K], TStored> }`\>

Defined in: [src/adm/model.types.ts:144](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L144)

Resolved relations indexed by their model relation names.
