[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / IApiClient

# Interface: IApiClient\<TModel, TRequest, TResponse, TOptions\>

Defined in: [src/adm/api.types.ts:165](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L165)

Public contract for an API client used by repositories.

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md) = [`Model`](../classes/Model.md)

### TRequest

`TRequest` = [`ApiRequest`](ApiRequest.md)

### TResponse

`TResponse` = `unknown`

### TOptions

`TOptions` *extends* [`ApiOptions`](ApiOptions.md) = [`ApiOptions`](ApiOptions.md)

## Methods

### create()

> **create**(`data`, `options?`): `Promise`\<[`ApiResult`](ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

Defined in: [src/adm/api.types.ts:186](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L186)

Creates a resource.

#### Parameters

##### data

`Record`\<`string`, `unknown`\> \| `TModel`

##### options?

[`ApiOptions`](ApiOptions.md)

#### Returns

`Promise`\<[`ApiResult`](ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

***

### delete()

> **delete**(`id`, `options?`): `Promise`\<[`ApiResult`](ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

Defined in: [src/adm/api.types.ts:192](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L192)

Deletes a resource.

#### Parameters

##### id

`unknown`

##### options?

[`ApiOptions`](ApiOptions.md)

#### Returns

`Promise`\<[`ApiResult`](ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

***

### fetchBy()

> **fetchBy**\<`TSource`\>(`sources`, `key`, `options?`): `Promise`\<[`ApiResult`](ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

Defined in: [src/adm/api.types.ts:179](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L179)

Similar to Store.getBy but to fetch items from the server.

#### Type Parameters

##### TSource

`TSource`

#### Parameters

##### sources

`Iterable`\<`TSource`\>

##### key

`KeySource`\<`TSource`, `unknown`\>

##### options?

[`ApiOptions`](ApiOptions.md)

#### Returns

`Promise`\<[`ApiResult`](ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

***

### get()

> **get**(`id`, `options?`): `Promise`\<[`ApiResult`](ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

Defined in: [src/adm/api.types.ts:173](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L173)

Retrieves one resource.

#### Parameters

##### id

`unknown`

##### options?

[`ApiOptions`](ApiOptions.md)

#### Returns

`Promise`\<[`ApiResult`](ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

***

### list()

> **list**(`options?`): `Promise`\<[`ApiResult`](ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

Defined in: [src/adm/api.types.ts:176](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L176)

Retrieves a collection.

#### Parameters

##### options?

[`ApiOptions`](ApiOptions.md)

#### Returns

`Promise`\<[`ApiResult`](ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

***

### request()

> **request**(`action`, `options?`): `Promise`\<[`ApiResult`](ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

Defined in: [src/adm/api.types.ts:195](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L195)

Make a request. *

#### Parameters

##### action

`string`

##### options?

[`ApiOptions`](ApiOptions.md)

#### Returns

`Promise`\<[`ApiResult`](ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

***

### update()

> **update**(`id`, `data`, `options?`): `Promise`\<[`ApiResult`](ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>

Defined in: [src/adm/api.types.ts:189](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L189)

Updates a resource.

#### Parameters

##### id

`unknown`

##### data

`Record`\<`string`, `unknown`\> \| `TModel`

##### options?

[`ApiOptions`](ApiOptions.md)

#### Returns

`Promise`\<[`ApiResult`](ApiResult.md)\<`TModel`, `TRequest`, `TResponse`\> \| `null`\>
