[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / createRepo

# Function: createRepo()

> **createRepo**\<`TModel`, `TRepository`\>(`model`, `config?`, `options?`): [`Repository`](../classes/Repository.md)\<`TModel`\>

Defined in: [src/adm/composables/create.ts:47](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/create.ts#L47)

Creates a repository for a model class.

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

### TRepository

`TRepository` *extends* [`Repository`](../classes/Repository.md)\<`TModel`, [`IApiClient`](../interfaces/IApiClient.md)\<`TModel`, [`ApiRequest`](../interfaces/ApiRequest.md), `unknown`, [`ApiOptions`](../interfaces/ApiOptions.md)\>, [`ModelClass`](../interfaces/ModelClass.md)\<`TModel`\>\> = [`Repository`](../classes/Repository.md)\<`TModel`, [`IApiClient`](../interfaces/IApiClient.md)\<`TModel`, [`ApiRequest`](../interfaces/ApiRequest.md), `unknown`, [`ApiOptions`](../interfaces/ApiOptions.md)\>, [`ModelClass`](../interfaces/ModelClass.md)\<`TModel`\>\>

## Parameters

### model

[`ModelClass`](../interfaces/ModelClass.md)\<`TModel`\>

Model class managed by the repository.

### config?

[`RepositoryConfig`](../interfaces/RepositoryConfig.md) = `{}`

Repository-specific configuration.

### options?

[`CreateRepoOptions`](../interfaces/CreateRepoOptions.md) = `{}`

Repository and API client constructors.

## Returns

[`Repository`](../classes/Repository.md)\<`TModel`\>

The created repository.
