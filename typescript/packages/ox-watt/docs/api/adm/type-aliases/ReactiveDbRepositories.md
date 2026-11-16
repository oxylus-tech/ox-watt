[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ReactiveDbRepositories

# Type Alias: ReactiveDbRepositories\<TRepositories, TDatabase\>

> **ReactiveDbRepositories**\<`TRepositories`, `TDatabase`\> = `{ [K in keyof TRepositories]: TRepositories[K] extends Repository<infer TModel, infer TApi, infer TModelClass> ? ReactiveDbRepository<TModel, TApi, TDatabase, TModelClass, TRepositories[K]> : never }`

Defined in: [src/adm/composables/types.ts:157](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L157)

Maps database repositories to their reactive wrappers.

## Type Parameters

### TRepositories

`TRepositories` *extends* [`Repositories`](Repositories.md)

### TDatabase

`TDatabase` *extends* [`Database`](../classes/Database.md)\<`TRepositories`\> = [`Database`](../classes/Database.md)\<`TRepositories`\>
