[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / BaseApiRequest

# Interface: BaseApiRequest

Defined in: [src/adm/api.types.ts:10](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L10)

## Extended by

- [`ApiRequest`](ApiRequest.md)
- [`RawApiEndpoint`](RawApiEndpoint.md)

## Properties

### dataKey?

> `optional` **dataKey?**: `string`

Defined in: [src/adm/api.types.ts:20](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L20)

Optional dot-separated path to the payload in a response envelope.

***

### deserialize?

> `optional` **deserialize?**: [`ModelDeserializeOptions`](ModelDeserializeOptions.md)

Defined in: [src/adm/api.types.ts:26](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L26)

Model deserialization options. *

***

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [src/adm/api.types.ts:16](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L16)

Default headers sent with requests.

***

### ids\_lookup?

> `optional` **ids\_lookup?**: `string`

Defined in: [src/adm/api.types.ts:24](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L24)

Parameter name used for query with a list of ids. *

***

### metadata?

> `optional` **metadata?**: [`MetadataConfig`](MetadataConfig.md)

Defined in: [src/adm/api.types.ts:22](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L22)

Metadata configuration. *

***

### params?

> `optional` **params?**: `Record`\<`string`, `unknown`\>

Defined in: [src/adm/api.types.ts:18](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L18)

Query-string parameters.

***

### path?

> `optional` **path?**: `string`

Defined in: [src/adm/api.types.ts:14](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L14)

Resource path; `{id}` placeholders are substituted from path parameters}
