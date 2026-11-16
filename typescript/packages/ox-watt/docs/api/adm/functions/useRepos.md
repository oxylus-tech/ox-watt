[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / useRepos

# Function: useRepos()

> **useRepos**\<`TRepositories`\>(`repositories`): [`ReactiveRepositories`](../type-aliases/ReactiveRepositories.md)\<`TRepositories`\>

Defined in: [src/adm/composables/repos.ts:103](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/repos.ts#L103)

Creates reactive wrappers for a collection of repositories.

## Type Parameters

### TRepositories

`TRepositories` *extends* [`Repositories`](../type-aliases/Repositories.md)

## Parameters

### repositories

`TRepositories`

Repository collection to wrap.

## Returns

[`ReactiveRepositories`](../type-aliases/ReactiveRepositories.md)\<`TRepositories`\>

Reactive repository collection preserving its keys and types.
