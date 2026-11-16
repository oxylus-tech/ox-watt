[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / CreateReposOptions

# Interface: CreateReposOptions

Defined in: [src/adm/composables/create.ts:31](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/create.ts#L31)

## Extends

- [`CreateRepoOptions`](CreateRepoOptions.md)

## Extended by

- [`UseDbOptions`](UseDbOptions.md)

## Properties

### api?

> `optional` **api?**: [`ApiConfig`](ApiConfig.md)

Defined in: [src/adm/composables/create.ts:35](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/create.ts#L35)

Common API config overriding

***

### apiClass?

> `optional` **apiClass?**: [`ApiClientClass`](ApiClientClass.md)\<[`ApiRequest`](ApiRequest.md), `object`, [`ApiOptions`](ApiOptions.md)\>

Defined in: [src/adm/composables/create.ts:26](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/create.ts#L26)

ApiClient class to use

#### Inherited from

[`CreateRepoOptions`](CreateRepoOptions.md).[`apiClass`](CreateRepoOptions.md#apiclass)

***

### config?

> `optional` **config?**: `Record`\<`string`, [`RepositoryConfig`](RepositoryConfig.md)\>

Defined in: [src/adm/composables/create.ts:33](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/create.ts#L33)

Configuration of repositories by name.

***

### noGlobal?

> `optional` **noGlobal?**: `boolean`

Defined in: [src/adm/composables/create.ts:28](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/create.ts#L28)

Don't use provided global config.

#### Inherited from

[`CreateRepoOptions`](CreateRepoOptions.md).[`noGlobal`](CreateRepoOptions.md#noglobal)

***

### repositoryClass?

> `optional` **repositoryClass?**: [`RepositoryClass`](RepositoryClass.md)

Defined in: [src/adm/composables/create.ts:24](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/create.ts#L24)

Repository class *

#### Inherited from

[`CreateRepoOptions`](CreateRepoOptions.md).[`repositoryClass`](CreateRepoOptions.md#repositoryclass)
