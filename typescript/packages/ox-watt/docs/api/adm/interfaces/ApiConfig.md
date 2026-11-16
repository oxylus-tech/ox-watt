[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ApiConfig

# Interface: ApiConfig

Defined in: [src/adm/api.types.ts:145](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L145)

Configuration shared by API clients or overridden by a repository.

## Properties

### baseUrl?

> `optional` **baseUrl?**: `string`

Defined in: [src/adm/api.types.ts:147](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L147)

Base URL used to resolve relative endpoint paths.

***

### endpoints?

> `optional` **endpoints?**: [`ApiEndpoints`](ApiEndpoints.md)

Defined in: [src/adm/api.types.ts:151](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L151)

Endpoint paths indexed by conventional operation name.

***

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [src/adm/api.types.ts:153](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L153)

Headers sent with requests.

***

### ids\_lookup?

> `optional` **ids\_lookup?**: `string`

Defined in: [src/adm/api.types.ts:159](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L159)

Parameter name used for query with a list of ids. *

***

### metadata?

> `optional` **metadata?**: [`MetadataConfig`](MetadataConfig.md)

Defined in: [src/adm/api.types.ts:157](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L157)

MetadataConfig *

***

### params?

> `optional` **params?**: `Record`\<`string`, `unknown`\>

Defined in: [src/adm/api.types.ts:155](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L155)

Params sent with requests.

***

### path?

> `optional` **path?**: `string`

Defined in: [src/adm/api.types.ts:149](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L149)

URL base path to the endpoints and any request.
