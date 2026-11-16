[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ApiClient

# Abstract Class: ApiClient\<TModel, TRequest, TResponse, TOptions\>

Defined in: [src/adm/api.ts:36](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.ts#L36)

Base class for model-aware API clients.

Subclasses implement transport-specific request execution while this class
handles endpoint selection, payload serialization and model deserialization.

## Extended by

- [`HttpClient`](HttpClient.md)

## Type Parameters

### TModel

`TModel` *extends* [`Model`](Model.md) = [`Model`](Model.md)

### TRequest

`TRequest` *extends* [`ApiRequest`](../interfaces/ApiRequest.md) = [`ApiRequest`](../interfaces/ApiRequest.md)

### TResponse

`TResponse` *extends* `object` = `object`

### TOptions

`TOptions` *extends* [`ApiOptions`](../interfaces/ApiOptions.md) = [`ApiOptions`](../interfaces/ApiOptions.md)

## Implements

- [`IApiClient`](../interfaces/IApiClient.md)\<`TModel`, `TRequest`, `TResponse`, `TOptions`\>

## Constructors

### Constructor

> **new ApiClient**\<`TModel`, `TRequest`, `TResponse`, `TOptions`\>(`model`, `config?`, `store?`): `ApiClient`\<`TModel`, `TRequest`, `TResponse`, `TOptions`\>

Defined in: [src/adm/api.ts:49](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.ts#L49)

Creates a model-aware API client.

#### Parameters

##### model

[`ModelClass`](../interfaces/ModelClass.md)\<`TModel`\>

Model class used to deserialize API responses.

##### config?

[`ApiConfig`](../interfaces/ApiConfig.md) = `{}`

##### store?

[`ModelStore`](ModelStore.md)\<`TModel`, [`ModelStoreGetOptions`](../interfaces/ModelStoreGetOptions.md)\> \| `null` = `null`

#### Returns

`ApiClient`\<`TModel`, `TRequest`, `TResponse`, `TOptions`\>

## Accessors

### endpoints

#### Get Signature

> **get** **endpoints**(): [`ApiEndpoints`](../interfaces/ApiEndpoints.md) \| `null`

Defined in: [src/adm/api.ts:55](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.ts#L55)

##### Returns

[`ApiEndpoints`](../interfaces/ApiEndpoints.md) \| `null`

## Methods

### create()

> **create**(`data`, `options?`): `Promise`\<[`ApiResult`](../interfaces/ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

Defined in: [src/adm/api.ts:88](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.ts#L88)

Creates a model through the API.

#### Parameters

##### data

`Record`\<`string`, `unknown`\> \| `TModel`

##### options?

`TOptions`

#### Returns

`Promise`\<[`ApiResult`](../interfaces/ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

#### Implementation of

[`IApiClient`](../interfaces/IApiClient.md).[`create`](../interfaces/IApiClient.md#create)

***

### delete()

> **delete**(`id`, `options?`): `Promise`\<[`ApiResult`](../interfaces/ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

Defined in: [src/adm/api.ts:118](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.ts#L118)

Delete a model from the server

When `options.save` is provided, delete object from the store on success.

#### Parameters

##### id

`unknown`

##### options?

`TOptions`

#### Returns

`Promise`\<[`ApiResult`](../interfaces/ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

#### Implementation of

[`IApiClient`](../interfaces/IApiClient.md).[`delete`](../interfaces/IApiClient.md#delete)

***

### fetchBy()

> **fetchBy**\<`TSource`\>(`sources`, `key`, `options?`): `Promise`\<[`ApiResult`](../interfaces/ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

Defined in: [src/adm/api.ts:77](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.ts#L77)

Similar to Store.getBy, but that fetches from the server instead.

#### Type Parameters

##### TSource

`TSource`

#### Parameters

##### sources

`Iterable`\<`MaybeRef`\<`TSource`\>\>

##### key

`KeySource`\<`TSource`, `unknown`\>

##### options?

`TOptions`

#### Returns

`Promise`\<[`ApiResult`](../interfaces/ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

#### Implementation of

[`IApiClient`](../interfaces/IApiClient.md).[`fetchBy`](../interfaces/IApiClient.md#fetchby)

***

### get()

> **get**(`id`, `options?`): `Promise`\<[`ApiResult`](../interfaces/ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

Defined in: [src/adm/api.ts:59](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.ts#L59)

Retrieve a single item using API. *

#### Parameters

##### id

`unknown`

##### options?

`TOptions`

#### Returns

`Promise`\<[`ApiResult`](../interfaces/ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

#### Implementation of

[`IApiClient`](../interfaces/IApiClient.md).[`get`](../interfaces/IApiClient.md#get)

***

### list()

> **list**(`options?`): `Promise`\<[`ApiResult`](../interfaces/ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

Defined in: [src/adm/api.ts:68](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.ts#L68)

Retrieves a collection using API.

#### Parameters

##### options?

`TOptions`

#### Returns

`Promise`\<[`ApiResult`](../interfaces/ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

#### Implementation of

[`IApiClient`](../interfaces/IApiClient.md).[`list`](../interfaces/IApiClient.md#list)

***

### request()

> **request**(`action`, `options?`): `Promise`\<[`ApiResult`](../interfaces/ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

Defined in: [src/adm/api.ts:130](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.ts#L130)

Execute an operation and return the normalized result.

#### Parameters

##### action

`string`

##### options?

`TOptions`

#### Returns

`Promise`\<[`ApiResult`](../interfaces/ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

#### Implementation of

[`IApiClient`](../interfaces/IApiClient.md).[`request`](../interfaces/IApiClient.md#request)

***

### update()

> **update**(`id`, `data`, `options?`): `Promise`\<[`ApiResult`](../interfaces/ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

Defined in: [src/adm/api.ts:97](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.ts#L97)

Update a model on the server. *

#### Parameters

##### id

`unknown`

##### data

`Record`\<`string`, `unknown`\> \| `TModel`

##### options?

`TOptions`

#### Returns

`Promise`\<[`ApiResult`](../interfaces/ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

#### Implementation of

[`IApiClient`](../interfaces/IApiClient.md).[`update`](../interfaces/IApiClient.md#update)
