[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / HttpRequest

# Interface: HttpRequest

Defined in: [src/adm/api.types.ts:259](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L259)

Describes an HTTP request independently of its transport implementation.

## Extends

- [`ApiRequest`](ApiRequest.md)
- `BaseHttpRequest`

## Properties

### data?

> `optional` **data?**: `Record`\<`string`, `unknown`\> \| [`Model`](../classes/Model.md)

Defined in: [src/adm/api.types.ts:31](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L31)

Request payload.

#### Inherited from

[`ApiRequest`](ApiRequest.md).[`data`](ApiRequest.md#data)

***

### dataKey?

> `optional` **dataKey?**: `string`

Defined in: [src/adm/api.types.ts:20](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L20)

Optional dot-separated path to the payload in a response envelope.

#### Inherited from

[`ApiRequest`](ApiRequest.md).[`dataKey`](ApiRequest.md#datakey)

***

### deserialize?

> `optional` **deserialize?**: [`ModelDeserializeOptions`](ModelDeserializeOptions.md)

Defined in: [src/adm/api.types.ts:26](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L26)

Model deserialization options. *

#### Inherited from

[`ApiRequest`](ApiRequest.md).[`deserialize`](ApiRequest.md#deserialize)

***

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [src/adm/api.types.ts:16](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L16)

Default headers sent with requests.

#### Inherited from

[`ApiRequest`](ApiRequest.md).[`headers`](ApiRequest.md#headers)

***

### ids\_lookup?

> `optional` **ids\_lookup?**: `string`

Defined in: [src/adm/api.types.ts:24](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L24)

Parameter name used for query with a list of ids. *

#### Inherited from

[`ApiRequest`](ApiRequest.md).[`ids_lookup`](ApiRequest.md#ids_lookup)

***

### metadata?

> `optional` **metadata?**: [`MetadataConfig`](MetadataConfig.md)

Defined in: [src/adm/api.types.ts:22](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L22)

Metadata configuration. *

#### Inherited from

[`ApiRequest`](ApiRequest.md).[`metadata`](ApiRequest.md#metadata)

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

[`ApiRequest`](ApiRequest.md).[`params`](ApiRequest.md#params)

***

### path?

> `optional` **path?**: `string`

Defined in: [src/adm/api.types.ts:14](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L14)

Resource path; `{id}` placeholders are substituted from path parameters}

#### Inherited from

[`ApiRequest`](ApiRequest.md).[`path`](ApiRequest.md#path)
