[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / useRepo

# Function: useRepo()

> **useRepo**\<`TModel`, `TApi`, `TModelClass`, `TRepository`\>(`repository`): [`ReactiveRepository`](../interfaces/ReactiveRepository.md)\<`TModel`, `TApi`, `TModelClass`, `TRepository`\>

Defined in: [src/adm/composables/repos.ts:37](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/repos.ts#L37)

Creates a reactive wrapper around an existing repository.

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

### TApi

`TApi` *extends* [`IApiClient`](../interfaces/IApiClient.md)\<`TModel`, [`ApiRequest`](../interfaces/ApiRequest.md), `unknown`, [`ApiOptions`](../interfaces/ApiOptions.md)\>

### TModelClass

`TModelClass` *extends* [`ModelClass`](../interfaces/ModelClass.md)\<`TModel`\>

### TRepository

`TRepository` *extends* [`Repository`](../classes/Repository.md)\<`TModel`, `TApi`, `TModelClass`\>

## Parameters

### repository

`TRepository`

Repository instance to wrap.

## Returns

[`ReactiveRepository`](../interfaces/ReactiveRepository.md)\<`TModel`, `TApi`, `TModelClass`, `TRepository`\>

Reactive repository interface.
