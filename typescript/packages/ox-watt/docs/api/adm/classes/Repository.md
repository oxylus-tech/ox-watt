[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / Repository

# Class: Repository\<TModel, TApi, TModelClass\>

Defined in: [src/adm/repository.ts:137](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L137)

Repository responsible for the local storage and context of a model type.

An instance is normally created and managed by a Database.

## Type Parameters

### TModel

`TModel` *extends* [`Model`](Model.md)

### TApi

`TApi` *extends* [`IApiClient`](../interfaces/IApiClient.md)\<`TModel`\> = [`IApiClient`](../interfaces/IApiClient.md)\<`TModel`\>

### TModelClass

`TModelClass` *extends* [`ModelClass`](../interfaces/ModelClass.md)\<`TModel`\> = [`ModelClass`](../interfaces/ModelClass.md)\<`TModel`\>

## Constructors

### Constructor

> **new Repository**\<`TModel`, `TApi`, `TModelClass`\>(`model`, `config`, `apiClass?`, `store?`): `Repository`\<`TModel`, `TApi`, `TModelClass`\>

Defined in: [src/adm/repository.ts:153](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L153)

Initializes a repository for a model class.

#### Parameters

##### model

[`ModelClass`](../interfaces/ModelClass.md)\<`TModel`\>

The model class managed by this repository.

##### config

[`RepositoryConfig`](../interfaces/RepositoryConfig.md)

Repository-specific configuration.

##### apiClass?

[`ApiClientClass`](../interfaces/ApiClientClass.md)\<[`ApiRequest`](../interfaces/ApiRequest.md), `object`, [`ApiOptions`](../interfaces/ApiOptions.md)\>

The API client class used for remote operations.

##### store?

[`ModelStore`](ModelStore.md)\<`TModel`, [`ModelStoreGetOptions`](../interfaces/ModelStoreGetOptions.md)\>

An existing model store to use with this repository.

#### Returns

`Repository`\<`TModel`, `TApi`, `TModelClass`\>

## Properties

### apiClass?

> `readonly` `optional` **apiClass?**: [`ApiClientClass`](../interfaces/ApiClientClass.md)\<[`ApiRequest`](../interfaces/ApiRequest.md), `object`, [`ApiOptions`](../interfaces/ApiOptions.md)\>

Defined in: [src/adm/repository.ts:156](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L156)

The API client class used for remote operations.

***

### config

> `readonly` **config**: [`RepositoryConfig`](../interfaces/RepositoryConfig.md)

Defined in: [src/adm/repository.ts:155](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L155)

Repository-specific configuration.

***

### model

> `readonly` **model**: [`ModelClass`](../interfaces/ModelClass.md)\<`TModel`\>

Defined in: [src/adm/repository.ts:154](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L154)

The model class managed by this repository.

***

### store

> `readonly` **store**: [`ModelStore`](ModelStore.md)\<`TModel`\>

Defined in: [src/adm/repository.ts:143](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L143)

Local storage for instances of this model.

## Accessors

### modelName

#### Get Signature

> **get** **modelName**(): `string`

Defined in: [src/adm/repository.ts:174](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L174)

Returns the name of the model managed by this repository.

##### Returns

`string`

## Methods

### api()

> **api**(): `TApi` \| `null`

Defined in: [src/adm/repository.ts:165](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L165)

Returns a new API client instance, or null if no API client is configured.

#### Returns

`TApi` \| `null`

***

### clear()

> **clear**(): `void`

Defined in: [src/adm/repository.ts:220](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L220)

Clears the local storage associated with this repository.

#### Returns

`void`

***

### delete()

> **delete**(`id`): `boolean`

Defined in: [src/adm/repository.ts:215](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L215)

Removes a model from local storage by its identifier.

#### Parameters

##### id

`unknown`

#### Returns

`boolean`

***

### deserialize()

> **deserialize**(`input`, `options?`): `ShallowRef`\<`TModel`\>

Defined in: [src/adm/repository.ts:233](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L233)

Deserializes model data, providing the repository as context.

Note: the model view is returned on save.

#### Parameters

##### input

`unknown`

The raw model data to deserialize.

##### options?

[`ModelDeserializeOptions`](../interfaces/ModelDeserializeOptions.md)

Options controlling the deserialization process.

#### Returns

`ShallowRef`\<`TModel`\>

The deserialized model instance.

***

### get()

> **get**(`id`): `ShallowRef`\<`TModel`\> \| `undefined`

Defined in: [src/adm/repository.ts:184](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L184)

Retrieves a model from model store by its identifier.

#### Parameters

##### id

`unknown`

#### Returns

`ShallowRef`\<`TModel`\> \| `undefined`

***

### getMany()

> **getMany**(`ids`): `Map`\<`unknown`, `ShallowRef`\<`TModel`\>\>

Defined in: [src/adm/repository.ts:189](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L189)

Retrieves multiple models from model store by their identifiers.

#### Parameters

##### ids

`Iterable`\<`unknown`\>

#### Returns

`Map`\<`unknown`, `ShallowRef`\<`TModel`\>\>

***

### getRaw()

> **getRaw**(`id`): `TModel` \| `undefined`

Defined in: [src/adm/repository.ts:179](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L179)

Retrieves a model from model store by its identifier.

#### Parameters

##### id

`unknown`

#### Returns

`TModel` \| `undefined`

***

### has()

> **has**(`id`): `boolean`

Defined in: [src/adm/repository.ts:194](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L194)

Checks whether a model with the given identifier exists in local storage.

#### Parameters

##### id

`unknown`

#### Returns

`boolean`

***

### serialize()

> **serialize**(`model`, `options?`): `Record`\<`string`, `unknown`\>

Defined in: [src/adm/repository.ts:247](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L247)

Serializes a model, providing the repository as context.

#### Parameters

##### model

`TModel` \| `ShallowRef`\<`TModel`\>

The model to serialize.

##### options?

[`ModelSerializeOptions`](../interfaces/ModelSerializeOptions.md)

Options controlling the serialization process.

#### Returns

`Record`\<`string`, `unknown`\>

The serialized model data.

***

### set()

> **set**(`model`): `ShallowRef`\<`TModel`\>

Defined in: [src/adm/repository.ts:205](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L205)

Stores a model in local storage.

#### Parameters

##### model

`TModel`

The model to store.

#### Returns

`ShallowRef`\<`TModel`\>

The stored model.

#### Throws

Error if the model has no identifier.

***

### setMany()

> **setMany**(`models`): `ShallowRef`\<`TModel`\>[]

Defined in: [src/adm/repository.ts:210](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L210)

Stores multiple models in local storage.

#### Parameters

##### models

`Iterable`\<`TModel`\>

#### Returns

`ShallowRef`\<`TModel`\>[]
