[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ResolvedRelationType

# Type Alias: ResolvedRelationType\<TRepositories, TDefinition, TStored\>

> **ResolvedRelationType**\<`TRepositories`, `TDefinition`, `TStored`\> = `TDefinition`\[`"repository"`\] *extends* keyof `TRepositories` ? [`ResolvedRelation`](ResolvedRelation.md)\<[`RepositoryModel`](RepositoryModel.md)\<`TRepositories`\[`TDefinition`\[`"repository"`\]\]\>, `TDefinition`\[`"many"`\] *extends* `true` ? `true` : `false`, `TStored`\> : `never`

Defined in: [src/adm/model.types.ts:115](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L115)

Resolves the related model type associated with a relation definition.

## Type Parameters

### TRepositories

`TRepositories` *extends* [`Repositories`](Repositories.md)

### TDefinition

`TDefinition` *extends* [`RelationDefinition`](../interfaces/RelationDefinition.md)

### TStored

`TStored` *extends* `boolean` = `true`
