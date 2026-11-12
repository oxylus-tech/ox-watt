[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ApiResult

# Interface: ApiResult\<TModel, TRequest, TResponse\>

Defined in: [src/adm/api.types.ts:120](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L120)

Normalized result returned by an API operation.

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md) = [`Model`](../classes/Model.md)

### TRequest

`TRequest` = [`ApiRequest`](ApiRequest.md)

### TResponse

`TResponse` = `unknown`

## Properties

### data

> **data**: `unknown`

Defined in: [src/adm/api.types.ts:128](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L128)

Response data.

***

### items?

> `optional` **items?**: `TModel`[] \| `ShallowRef`\<`TModel`\>[] \| `null`

Defined in: [src/adm/api.types.ts:125](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L125)

Resulting items.

***

### metadata?

> `optional` **metadata?**: [`Metadata`](../type-aliases/Metadata.md)

Defined in: [src/adm/api.types.ts:137](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L137)

Extracted metadata from the response *

***

### ok

> **ok**: `boolean`

Defined in: [src/adm/api.types.ts:122](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L122)

Whether the request was a success. *

***

### request?

> `optional` **request?**: `TRequest`

Defined in: [src/adm/api.types.ts:131](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L131)

Request that produced this result, when available.

***

### response?

> `optional` **response?**: `TResponse`

Defined in: [src/adm/api.types.ts:134](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L134)

Raw response object *
