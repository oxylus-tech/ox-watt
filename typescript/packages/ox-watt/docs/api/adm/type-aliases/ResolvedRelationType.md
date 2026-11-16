[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ResolvedRelationType

# Type Alias: ResolvedRelationType\<TRepositories, TDefinition, TStored\>

> **ResolvedRelationType**\<`TRepositories`, `TDefinition`, `TStored`\> = `TDefinition`\[`"repository"`\] *extends* keyof `TRepositories` ? [`ResolvedRelation`](ResolvedRelation.md)\<[`RepositoryModel`](RepositoryModel.md)\<`TRepositories`\[`TDefinition`\[`"repository"`\]\]\>, `TDefinition`\[`"many"`\] *extends* `true` ? `true` : `false`, `TStored`\> : `never`

Defined in: [src/adm/model.types.ts:140](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L140)

Resolves the related model type associated with a relation definition.

## Type Parameters

### TRepositories

`TRepositories` *extends* [`Repositories`](Repositories.md)

### TDefinition

`TDefinition` *extends* [`RelationDefinition`](../interfaces/RelationDefinition.md)

### TStored

`TStored` *extends* `boolean` = `true`
