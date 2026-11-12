[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ApiEndpoints

# Interface: ApiEndpoints

Defined in: [src/adm/api.types.ts:54](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L54)

Configuration of API endpoints.

Values may be relative paths or absolute URLs.

## Indexable

> \[`key`: `string`\]: [`ApiEndpoint`](ApiEndpoint.md) \| `undefined`

## Properties

### create?

> `optional` **create?**: [`ApiEndpoint`](ApiEndpoint.md)

Defined in: [src/adm/api.types.ts:64](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L64)

Endpoint used to create a resource.

***

### delete?

> `optional` **delete?**: [`ApiEndpoint`](ApiEndpoint.md)

Defined in: [src/adm/api.types.ts:70](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L70)

Endpoint used to delete a resource.

***

### detail?

> `optional` **detail?**: [`ApiEndpoint`](ApiEndpoint.md)

Defined in: [src/adm/api.types.ts:61](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L61)

Endpoint used to retrieve one resource.

***

### list?

> `optional` **list?**: [`ApiEndpoint`](ApiEndpoint.md)

Defined in: [src/adm/api.types.ts:58](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L58)

Endpoint used to retrieve a collection.

***

### update?

> `optional` **update?**: [`ApiEndpoint`](ApiEndpoint.md)

Defined in: [src/adm/api.types.ts:67](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L67)

Endpoint used to update a resource.
