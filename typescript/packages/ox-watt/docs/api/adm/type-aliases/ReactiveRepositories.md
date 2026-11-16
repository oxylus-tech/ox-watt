[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ReactiveRepositories

# Type Alias: ReactiveRepositories\<TRepositories\>

> **ReactiveRepositories**\<`TRepositories`\> = `{ [K in keyof TRepositories]: TRepositories[K] extends Repository<infer TModel, infer TApi, infer TModelClass> ? ReactiveRepository<TModel, TApi, TModelClass, TRepositories[K]> : never }`

Defined in: [src/adm/composables/types.ts:62](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L62)

Maps a repository collection to its reactive equivalents.

## Type Parameters

### TRepositories

`TRepositories` *extends* [`Repositories`](Repositories.md)
