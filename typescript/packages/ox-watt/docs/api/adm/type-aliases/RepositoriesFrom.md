[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / RepositoriesFrom

# Type Alias: RepositoriesFrom\<TDefinitions\>

> **RepositoriesFrom**\<`TDefinitions`\> = `TDefinitions` *extends* `Iterable`\<infer TDefinition\> ? `Record`\<`string`, [`RepositoryFrom`](RepositoryFrom.md)\<`TDefinition`\>\> : `TDefinitions` *extends* [`RepositoryDefinitions`](RepositoryDefinitions.md) ? `{ [K in keyof TDefinitions]: RepositoryFrom<TDefinitions[K]> }` : `never`

Defined in: [src/adm/repository.ts:88](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L88)

Resolves repository instances from repository definitions.

## Type Parameters

### TDefinitions

`TDefinitions` *extends* [`RepositoryDefinitionsInput`](RepositoryDefinitionsInput.md)
