[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / RawApiEndpoint

# Interface: RawApiEndpoint

Defined in: [src/adm/api.types.ts:37](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L37)

Describe one endpoint used for API operations.

## Extends

- [`BaseApiRequest`](BaseApiRequest.md)

## Properties

### dataKey?

> `optional` **dataKey?**: `string`

Defined in: [src/adm/api.types.ts:20](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L20)

Optional dot-separated path to the payload in a response envelope.

#### Inherited from

[`BaseApiRequest`](BaseApiRequest.md).[`dataKey`](BaseApiRequest.md#datakey)

***

### deserialize?

> `optional` **deserialize?**: [`ModelDeserializeOptions`](ModelDeserializeOptions.md)

Defined in: [src/adm/api.types.ts:26](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L26)

Model deserialization options. *

#### Inherited from

[`BaseApiRequest`](BaseApiRequest.md).[`deserialize`](BaseApiRequest.md#deserialize)

***

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [src/adm/api.types.ts:16](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L16)

Default headers sent with requests.

#### Inherited from

[`BaseApiRequest`](BaseApiRequest.md).[`headers`](BaseApiRequest.md#headers)

***

### ids\_lookup?

> `optional` **ids\_lookup?**: `string`

Defined in: [src/adm/api.types.ts:24](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L24)

Parameter name used for query with a list of ids. *

#### Inherited from

[`BaseApiRequest`](BaseApiRequest.md).[`ids_lookup`](BaseApiRequest.md#ids_lookup)

***

### metadata?

> `optional` **metadata?**: [`MetadataConfig`](MetadataConfig.md)

Defined in: [src/adm/api.types.ts:22](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L22)

Metadata configuration. *

#### Inherited from

[`BaseApiRequest`](BaseApiRequest.md).[`metadata`](BaseApiRequest.md#metadata)

***

### params?

> `optional` **params?**: `Record`\<`string`, `unknown`\>

Defined in: [src/adm/api.types.ts:18](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L18)

Query-string parameters.

#### Inherited from

[`BaseApiRequest`](BaseApiRequest.md).[`params`](BaseApiRequest.md#params)

***

### path?

> `optional` **path?**: `string`

Defined in: [src/adm/api.types.ts:14](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L14)

Resource path; `{id}` placeholders are substituted from path parameters}

#### Inherited from

[`BaseApiRequest`](BaseApiRequest.md).[`path`](BaseApiRequest.md#path)

***

### responseSchema?

> `optional` **responseSchema?**: `string` \| *typeof* [`Schema`](../classes/Schema.md)

Defined in: [src/adm/api.types.ts:39](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L39)

Schema name used to validate the extracted response payload.
