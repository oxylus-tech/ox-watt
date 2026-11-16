[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / useDbRepo

# Function: useDbRepo()

> **useDbRepo**\<`TModel`, `TApi`, `TModelClass`, `TRepository`, `TRepositories`\>(`reactiveRepository`, `database`): [`ReactiveDbRepository`](../interfaces/ReactiveDbRepository.md)\<`TModel`, `TApi`, [`Database`](../classes/Database.md)\<`TRepositories`\>, `TModelClass`, `TRepository`\>

Defined in: [src/adm/composables/repos.ts:209](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/repos.ts#L209)

Adds database-aware relation methods to a reactive repository.

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

### TApi

`TApi` *extends* [`IApiClient`](../interfaces/IApiClient.md)\<`TModel`, [`ApiRequest`](../interfaces/ApiRequest.md), `unknown`, [`ApiOptions`](../interfaces/ApiOptions.md)\>

### TModelClass

`TModelClass` *extends* [`ModelClass`](../interfaces/ModelClass.md)\<`TModel`\>

### TRepository

`TRepository` *extends* [`Repository`](../classes/Repository.md)\<`TModel`, `TApi`, `TModelClass`\>

### TRepositories

`TRepositories` *extends* [`Repositories`](../type-aliases/Repositories.md)

## Parameters

### reactiveRepository

[`ReactiveRepository`](../interfaces/ReactiveRepository.md)\<`TModel`, `TApi`, `TModelClass`, `TRepository`\>

Reactive repository to extend.

### database

[`Database`](../classes/Database.md)\<`TRepositories`\>

Database used for relation resolution.

## Returns

[`ReactiveDbRepository`](../interfaces/ReactiveDbRepository.md)\<`TModel`, `TApi`, [`Database`](../classes/Database.md)\<`TRepositories`\>, `TModelClass`, `TRepository`\>

The enriched reactive repository.
