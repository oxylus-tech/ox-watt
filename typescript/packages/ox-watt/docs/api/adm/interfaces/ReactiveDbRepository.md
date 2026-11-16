[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ReactiveDbRepository

# Interface: ReactiveDbRepository\<TModel, TApi, TDatabase, TModelClass, TRepository\>

Defined in: [src/adm/composables/types.ts:75](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L75)

Reactive repository with database relation resolution.

## Extends

- [`ReactiveRepository`](ReactiveRepository.md)\<`TModel`, `TApi`, `TModelClass`, `TRepository`\>

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

### TApi

`TApi` *extends* [`IApiClient`](IApiClient.md)\<`TModel`\>

### TDatabase

`TDatabase` *extends* [`Database`](../classes/Database.md)

### TModelClass

`TModelClass` *extends* [`ModelClass`](ModelClass.md)\<`TModel`\> = [`ModelClass`](ModelClass.md)\<`TModel`\>

### TRepository

`TRepository` *extends* [`Repository`](../classes/Repository.md)\<`TModel`, `TApi`, `TModelClass`\> = [`Repository`](../classes/Repository.md)\<`TModel`, `TApi`, `TModelClass`\>

## Properties

### repository

> `readonly` **repository**: `TRepository`

Defined in: [src/adm/composables/types.ts:28](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L28)

Underlying repository instance

#### Inherited from

[`ReactiveRepository`](ReactiveRepository.md).[`repository`](ReactiveRepository.md#repository)

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

#### Inherited from

[`ReactiveRepository`](ReactiveRepository.md).[`fetch`](ReactiveRepository.md#fetch)

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

#### Inherited from

[`ReactiveRepository`](ReactiveRepository.md).[`fetchMany`](ReactiveRepository.md#fetchmany)

***

### fetchRelation()

> **fetchRelation**\<`TRelation`, `TOptions`\>(`item`, `relation`, `options?`): `Promise`\<[`ResolvedRelations`](ResolvedRelations.md)\<`TModel`, [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<`TRepository`\>, `TDatabase`\[`"repositories"`\], `TOptions` *extends* `object` ? `true` : `false`\>\>

Defined in: [src/adm/composables/types.ts:113](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L113)

Fetches one relation for a model instance.

#### Type Parameters

##### TRelation

`TRelation` *extends* `string` \| `number` \| `symbol`

##### TOptions

`TOptions` *extends* [`ApiOptions`](ApiOptions.md) = [`ApiOptions`](ApiOptions.md)

#### Parameters

##### item

`TModel`

Source model instance.

##### relation

`TRelation`

Name of the relation to fetch.

##### options?

`TOptions`

API request options.

#### Returns

`Promise`\<[`ResolvedRelations`](ResolvedRelations.md)\<`TModel`, [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<`TRepository`\>, `TDatabase`\[`"repositories"`\], `TOptions` *extends* `object` ? `true` : `false`\>\>

The source item together with its resolved relation.

***

### fetchRelations()

> **fetchRelations**\<`TRelation`, `TOptions`\>(`items`, `relations?`, `options?`): `Promise`\<[`ResolvedRelations`](ResolvedRelations.md)\<`TModel`, [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<`TRepository`\>, `TDatabase`\[`"repositories"`\], `TOptions` *extends* `object` ? `true` : `false`\>[]\>

Defined in: [src/adm/composables/types.ts:137](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L137)

Fetches relations for multiple model instances.

#### Type Parameters

##### TRelation

`TRelation` *extends* `string` \| `number` \| `symbol`

##### TOptions

`TOptions` *extends* [`ApiOptions`](ApiOptions.md) = [`ApiOptions`](ApiOptions.md)

#### Parameters

##### items

`Iterable`\<`TModel`\>

Source model instances.

##### relations?

`TRelation`[]

Names of the relations to fetch. Defaults to all relations.

##### options?

`TOptions`

API request options.

#### Returns

`Promise`\<[`ResolvedRelations`](ResolvedRelations.md)\<`TModel`, [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<`TRepository`\>, `TDatabase`\[`"repositories"`\], `TOptions` *extends* `object` ? `true` : `false`\>[]\>

The source items together with their resolved relations.

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

#### Inherited from

[`ReactiveRepository`](ReactiveRepository.md).[`get`](ReactiveRepository.md#get)

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

#### Inherited from

[`ReactiveRepository`](ReactiveRepository.md).[`getMany`](ReactiveRepository.md#getmany)

***

### getManyWith()

> **getManyWith**(`ids`, `relations`): `ComputedRef`\<[`ResolvedRelations`](ResolvedRelations.md)\<`TModel`, [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<`TRepository`\>, `TDatabase`\[`"repositories"`\], `true`\>[]\>

Defined in: [src/adm/composables/types.ts:100](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L100)

Retrieves multiple items reactively and resolves their relations.

#### Parameters

##### ids

`MaybeRefOrGetter`\<`unknown`[]\>

Model identifiers or reactive identifiers.

##### relations

(keyof [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<`TRepository`\>)[]

Relation names to resolve.

#### Returns

`ComputedRef`\<[`ResolvedRelations`](ResolvedRelations.md)\<`TModel`, [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<`TRepository`\>, `TDatabase`\[`"repositories"`\], `true`\>[]\>

***

### getWith()

> **getWith**(`id`, `relations`): `ComputedRef`\<[`ResolvedRelations`](ResolvedRelations.md)\<`TModel`, [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<`TRepository`\>, `TDatabase`\[`"repositories"`\], `true`\> \| `undefined`\>

Defined in: [src/adm/composables/types.ts:89](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L89)

Retrieves an item reactively and resolves its relations.

#### Parameters

##### id

`unknown`

Model identifier or reactive identifier.

##### relations

(keyof [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<`TRepository`\>)[]

Relation names to resolve.

#### Returns

`ComputedRef`\<[`ResolvedRelations`](ResolvedRelations.md)\<`TModel`, [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<`TRepository`\>, `TDatabase`\[`"repositories"`\], `true`\> \| `undefined`\>
