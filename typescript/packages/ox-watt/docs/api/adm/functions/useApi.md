[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / useApi

# Function: useApi()

> **useApi**\<`TModel`\>(`request`, `options`): [`UseApiResult`](../interfaces/UseApiResult.md)\<`TModel`\>

Defined in: [src/adm/composables/api.ts:152](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/api.ts#L152)

Creates reactive state for an API operation.

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

Model returned by the API operation.

## Parameters

### request

(`options`) => `Promise`\<[`ApiResult`](../interfaces/ApiResult.md)\<`TModel`, [`ApiRequest`](../interfaces/ApiRequest.md), `unknown`\>\>

API operation to execute.

### options

`MaybeRefOrGetter`\<[`ApiOptions`](../interfaces/ApiOptions.md)\>

Reactive or static API options.

## Returns

[`UseApiResult`](../interfaces/UseApiResult.md)\<`TModel`\>

Reactive API state.
