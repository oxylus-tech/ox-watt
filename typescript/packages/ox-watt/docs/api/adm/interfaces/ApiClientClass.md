[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ApiClientClass

# Interface: ApiClientClass\<TRequest, TResponse, TOptions\>

Defined in: [src/adm/api.types.ts:204](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L204)

API client constructor class.

The same API client class can be instantiated for different models.

## Type Parameters

### TRequest

`TRequest` *extends* [`ApiRequest`](ApiRequest.md) = [`ApiRequest`](ApiRequest.md)

### TResponse

`TResponse` *extends* `object` = `object`

### TOptions

`TOptions` *extends* [`ApiOptions`](ApiOptions.md) = [`ApiOptions`](ApiOptions.md)

## Constructors

### Constructor

> **new ApiClientClass**\<`TModel`\>(`model`, `config`, `store`): [`IApiClient`](IApiClient.md)\<`TModel`, `TRequest`, `TResponse`, `TOptions`\>

Defined in: [src/adm/api.types.ts:209](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L209)

#### Parameters

##### model

[`ModelClass`](ModelClass.md)\<`TModel`\>

##### config

[`ApiConfig`](ApiConfig.md)

##### store

[`ModelStore`](../classes/ModelStore.md)\<`TModel`, [`ModelStoreGetOptions`](ModelStoreGetOptions.md)\> \| `null`

#### Returns

[`IApiClient`](IApiClient.md)\<`TModel`, `TRequest`, `TResponse`, `TOptions`\>
