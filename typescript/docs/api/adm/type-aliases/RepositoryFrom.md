[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / RepositoryFrom

# Type Alias: RepositoryFrom\<TDefinition\>

> **RepositoryFrom**\<`TDefinition`\> = `TDefinition` *extends* [`AnyRepository`](AnyRepository.md) ? `TDefinition` : `TDefinition` *extends* [`ModelClass`](../interfaces/ModelClass.md)\<infer TModel\> ? [`Repository`](../classes/Repository.md)\<`TModel`\> : `never`

Defined in: [src/adm/repository.ts:102](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/repository.ts#L102)

Resolves a repository instance from a single definition.

## Type Parameters

### TDefinition

`TDefinition` *extends* [`RepositoryDefinition`](RepositoryDefinition.md)
