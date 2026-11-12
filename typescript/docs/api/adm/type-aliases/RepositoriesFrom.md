[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / RepositoriesFrom

# Type Alias: RepositoriesFrom\<TDefinitions\>

> **RepositoriesFrom**\<`TDefinitions`\> = `TDefinitions` *extends* `Iterable`\<infer TDefinition\> ? `Record`\<`string`, [`RepositoryFrom`](RepositoryFrom.md)\<`TDefinition`\>\> : `TDefinitions` *extends* [`RepositoryDefinitions`](RepositoryDefinitions.md) ? `{ [K in keyof TDefinitions]: RepositoryFrom<TDefinitions[K]> }` : `never`

Defined in: [src/adm/repository.ts:88](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/repository.ts#L88)

Resolves repository instances from repository definitions.

## Type Parameters

### TDefinitions

`TDefinitions` *extends* [`RepositoryDefinitionsInput`](RepositoryDefinitionsInput.md)
