[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ReactiveRepository

# Interface: ReactiveRepository\<TModel, TApi, TModelClass, TRepository\>

Defined in: [src/adm/composables/types.ts:21](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L21)

## Extended by

- [`ReactiveDbRepository`](ReactiveDbRepository.md)

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

### TApi

`TApi` *extends* [`IApiClient`](IApiClient.md)\<`TModel`\>

### TModelClass

`TModelClass` *extends* [`ModelClass`](ModelClass.md)\<`TModel`\> = [`ModelClass`](ModelClass.md)\<`TModel`\>

### TRepository

`TRepository` *extends* [`Repository`](../classes/Repository.md)\<`TModel`, `TApi`, `TModelClass`\> = [`Repository`](../classes/Repository.md)\<`TModel`, `TApi`, `TModelClass`\>

## Properties

### repository

> `readonly` **repository**: `TRepository`

Defined in: [src/adm/composables/types.ts:28](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L28)

Underlying repository instance

## Methods

### fetch()

> **fetch**(`id`, `apiOptions?`, `fetchOptions?`): [`BaseUseApiResult`](BaseUseApiResult.md)\<[`ApiResult`](ApiResult.md)\<`TModel`, [`ApiRequest`](ApiRequest.md), `unknown`\> \| `null`\>

Defined in: [src/adm/composables/types.ts:45](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L45)

#### Parameters

##### id

`unknown`

##### apiOptions?

`MaybeRefOrGetter`\<[`ApiOptions`](ApiOptions.md)\>

##### fetchOptions?

[`UseFetchOptions`](UseFetchOptions.md)

#### Returns

[`BaseUseApiResult`](BaseUseApiResult.md)\<[`ApiResult`](ApiResult.md)\<`TModel`, [`ApiRequest`](ApiRequest.md), `unknown`\> \| `null`\>

***

### fetchMany()

> **fetchMany**(`ids`, `apiOptions?`, `fetchOptions?`): [`BaseUseApiResult`](BaseUseApiResult.md)\<[`ApiResult`](ApiResult.md)\<`TModel`, [`ApiRequest`](ApiRequest.md), `unknown`\> \| `null`\>

Defined in: [src/adm/composables/types.ts:51](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L51)

#### Parameters

##### ids

`MaybeRefOrGetter`\<`unknown`[]\>

##### apiOptions?

`MaybeRefOrGetter`\<[`ApiOptions`](ApiOptions.md)\>

##### fetchOptions?

[`UseFetchOptions`](UseFetchOptions.md)

#### Returns

[`BaseUseApiResult`](BaseUseApiResult.md)\<[`ApiResult`](ApiResult.md)\<`TModel`, [`ApiRequest`](ApiRequest.md), `unknown`\> \| `null`\>

***

### get()

> **get**(`id`): `ComputedRef`\<`ShallowRef`\<`TModel`\> \| `undefined`\>

Defined in: [src/adm/composables/types.ts:35](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L35)

Retrieves an item reactively.

#### Parameters

##### id

`unknown`

Model identifier or reactive identifier.

#### Returns

`ComputedRef`\<`ShallowRef`\<`TModel`\> \| `undefined`\>

***

### getMany()

> **getMany**(`ids`): `ComputedRef`\<`Map`\<`unknown`, `ShallowRef`\<`TModel`\>\>\>

Defined in: [src/adm/composables/types.ts:42](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L42)

Retrieves multiple items reactively.

#### Parameters

##### ids

`MaybeRefOrGetter`\<`unknown`[]\>

Model identifiers or reactive identifiers.

#### Returns

`ComputedRef`\<`Map`\<`unknown`, `ShallowRef`\<`TModel`\>\>\>
