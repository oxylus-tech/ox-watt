[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / HttpEndpoint

# Interface: HttpEndpoint

Defined in: [src/adm/api.types.ts:262](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L262)

Describe one endpoint used for API operations, with resolved Schema

## Extends

- [`ApiEndpoint`](ApiEndpoint.md)
- `BaseHttpRequest`

## Properties

### dataKey?

> `optional` **dataKey?**: `string`

Defined in: [src/adm/api.types.ts:20](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L20)

Optional dot-separated path to the payload in a response envelope.

#### Inherited from

[`BaseApiRequest`](BaseApiRequest.md).[`dataKey`](BaseApiRequest.md#datakey)

***

### deserialize?

> `optional` **deserialize?**: [`ModelDeserializeOptions`](ModelDeserializeOptions.md)

Defined in: [src/adm/api.types.ts:26](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L26)

Model deserialization options. *

#### Inherited from

[`BaseApiRequest`](BaseApiRequest.md).[`deserialize`](BaseApiRequest.md#deserialize)

***

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [src/adm/api.types.ts:16](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L16)

Default headers sent with requests.

#### Inherited from

[`BaseApiRequest`](BaseApiRequest.md).[`headers`](BaseApiRequest.md#headers)

***

### ids\_lookup?

> `optional` **ids\_lookup?**: `string`

Defined in: [src/adm/api.types.ts:24](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L24)

Parameter name used for query with a list of ids. *

#### Inherited from

[`BaseApiRequest`](BaseApiRequest.md).[`ids_lookup`](BaseApiRequest.md#ids_lookup)

***

### metadata?

> `optional` **metadata?**: [`MetadataConfig`](MetadataConfig.md)

Defined in: [src/adm/api.types.ts:22](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L22)

Metadata configuration. *

#### Inherited from

[`BaseApiRequest`](BaseApiRequest.md).[`metadata`](BaseApiRequest.md#metadata)

***

### method?

> `optional` **method?**: [`HttpMethod`](../type-aliases/HttpMethod.md)

Defined in: [src/adm/api.types.ts:249](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L249)

Method used for the request.

#### Inherited from

`BaseHttpRequest.method`

***

### params?

> `optional` **params?**: `Record`\<`string`, `unknown`\>

Defined in: [src/adm/api.types.ts:18](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L18)

Query-string parameters.

#### Inherited from

[`BaseApiRequest`](BaseApiRequest.md).[`params`](BaseApiRequest.md#params)

***

### path?

> `optional` **path?**: `string`

Defined in: [src/adm/api.types.ts:14](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L14)

Resource path; `{id}` placeholders are substituted from path parameters}

#### Inherited from

[`BaseApiRequest`](BaseApiRequest.md).[`path`](BaseApiRequest.md#path)

***

### responseSchema?

> `optional` **responseSchema?**: *typeof* [`Schema`](../classes/Schema.md)

Defined in: [src/adm/api.types.ts:46](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L46)

#### Inherited from

[`ApiEndpoint`](ApiEndpoint.md).[`responseSchema`](ApiEndpoint.md#responseschema)
