[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / HttpOptions

# Interface: HttpOptions

Defined in: [src/adm/api.types.ts:263](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L263)

Options shared by API operations.

## Extends

- [`ApiOptions`](ApiOptions.md)
- `Omit`\<[`HttpRequest`](HttpRequest.md), `"path"`\>

## Indexable

> \[`key`: `string`\]: `unknown`

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

[`BaseApiRequest`](BaseApiRequest.md).[`dataKey`](BaseApiRequest.md#datakey)

***

### deserialize?

> `optional` **deserialize?**: [`ModelDeserializeOptions`](ModelDeserializeOptions.md)

Defined in: [src/adm/api.types.ts:26](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L26)

Model deserialization options. *

#### Inherited from

[`BaseApiRequest`](BaseApiRequest.md).[`deserialize`](BaseApiRequest.md#deserialize)

***

### endpoint?

> `optional` **endpoint?**: `string`

Defined in: [src/adm/api.types.ts:88](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L88)

Explicit endpoint path overriding configured endpoints.

#### Inherited from

[`ApiOptions`](ApiOptions.md).[`endpoint`](ApiOptions.md#endpoint)

***

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [src/adm/api.types.ts:16](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L16)

Default headers sent with requests.

#### Inherited from

[`BaseApiRequest`](BaseApiRequest.md).[`headers`](BaseApiRequest.md#headers)

***

### id?

> `optional` **id?**: `unknown`

Defined in: [src/adm/api.types.ts:82](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L82)

Object id *

#### Inherited from

[`ApiOptions`](ApiOptions.md).[`id`](ApiOptions.md#id)

***

### ids?

> `optional` **ids?**: `Iterable`\<`unknown`, `any`, `any`\>

Defined in: [src/adm/api.types.ts:94](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L94)

#### Inherited from

[`ApiOptions`](ApiOptions.md).[`ids`](ApiOptions.md#ids)

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

[`HttpRequest`](HttpRequest.md).[`method`](HttpRequest.md#method)

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

Defined in: [src/adm/api.types.ts:85](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L85)

Optional resource path, defaults to provided endpoint one. *

#### Inherited from

[`ApiOptions`](ApiOptions.md).[`path`](ApiOptions.md#path)

***

### save?

> `optional` **save?**: `boolean`

Defined in: [src/adm/api.types.ts:91](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L91)

Save changes on the store. *

#### Inherited from

[`ApiOptions`](ApiOptions.md).[`save`](ApiOptions.md#save)
