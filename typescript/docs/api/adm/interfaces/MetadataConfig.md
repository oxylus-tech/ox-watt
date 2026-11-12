[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / MetadataConfig

# Interface: MetadataConfig

Defined in: [src/adm/api.types.ts:104](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L104)

Maps internal metadata to response path.

This allows the ApiClient to extract metadata as pagination, etc.

## Indexable

> \[`key`: `string`\]: `string` \| `undefined`

## Properties

### dataKey?

> `optional` **dataKey?**: `string`

Defined in: [src/adm/api.types.ts:110](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L110)

Path to the collection of items in the response.
The path is related to the root object returned by the server.
