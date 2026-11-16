[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / useDbRepos

# Function: useDbRepos()

> **useDbRepos**\<`TRepositories`\>(`database`): [`ReactiveDbRepositories`](../type-aliases/ReactiveDbRepositories.md)\<`TRepositories`, *typeof* `database`\>

Defined in: [src/adm/composables/repos.ts:175](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/repos.ts#L175)

Creates reactive database repositories.

## Type Parameters

### TRepositories

`TRepositories` *extends* [`Repositories`](../type-aliases/Repositories.md)

## Parameters

### database

[`Database`](../classes/Database.md)\<`TRepositories`\>

Database containing the repositories.

## Returns

[`ReactiveDbRepositories`](../type-aliases/ReactiveDbRepositories.md)\<`TRepositories`, *typeof* `database`\>

Reactive repositories enriched with relation methods.
