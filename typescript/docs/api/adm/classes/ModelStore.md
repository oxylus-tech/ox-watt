[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ModelStore

# Class: ModelStore\<TModel, TGetOptions\>

Defined in: [src/adm/model.ts:222](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L222)

In-memory storage for a single model type.

One ModelStore instance is intended to be owned by one Repository.

## Extends

- `ReactiveKeyedStore`\<[`ModelId`](../type-aliases/ModelId.md), `TModel`, `TGetOptions`\>

## Type Parameters

### TModel

`TModel` *extends* [`Model`](Model.md)

### TGetOptions

`TGetOptions` *extends* [`ModelStoreGetOptions`](../interfaces/ModelStoreGetOptions.md) = [`ModelStoreGetOptions`](../interfaces/ModelStoreGetOptions.md)

## Constructors

### Constructor

> **new ModelStore**\<`TModel`, `TGetOptions`\>(`model`, `items?`): `ModelStore`\<`TModel`, `TGetOptions`\>

Defined in: [src/adm/model.ts:230](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L230)

#### Parameters

##### model

[`ModelClass`](../interfaces/ModelClass.md)\<`TModel`\>

##### items?

`Map`\<`unknown`, `TModel`\> \| `null`

#### Returns

`ModelStore`\<`TModel`, `TGetOptions`\>

#### Overrides

`ReactiveKeyedStore<ModelId, TModel, TGetOptions>.constructor`

## Properties

### keyField?

> `optional` **keyField?**: `string`

Defined in: [src/utils/store.ts:227](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L227)

#### Inherited from

`ReactiveKeyedStore.keyField`

***

### model

> `readonly` **model**: [`ModelClass`](../interfaces/ModelClass.md)\<`TModel`\>

Defined in: [src/adm/model.ts:231](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L231)

***

### keyField

> `static` **keyField**: `string` = `"$id"`

Defined in: [src/adm/model.ts:228](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.ts#L228)

#### Overrides

`ReactiveKeyedStore.keyField`

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [src/utils/store.ts:195](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L195)

##### Returns

`number`

#### Inherited from

`ReactiveKeyedStore.size`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `IterableIterator`\<\[`unknown`, `ShallowRef`\<`TModel`\>\]\>

Defined in: [src/utils/store.ts:211](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L211)

#### Returns

`IterableIterator`\<\[`unknown`, `ShallowRef`\<`TModel`\>\]\>

#### Inherited from

`ReactiveKeyedStore.[iterator]`

***

### clear()

> **clear**(): `void`

Defined in: [src/utils/store.ts:191](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L191)

#### Returns

`void`

#### Inherited from

`ReactiveKeyedStore.clear`

***

### delete()

> **delete**(`key`): `boolean`

Defined in: [src/utils/store.ts:161](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L161)

#### Parameters

##### key

`unknown`

#### Returns

`boolean`

#### Inherited from

`ReactiveKeyedStore.delete`

***

### deleteMany()

> **deleteMany**(`keys`): `void`

Defined in: [src/utils/store.ts:186](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L186)

#### Parameters

##### keys

`Iterable`\<`unknown`\>

#### Returns

`void`

#### Inherited from

`ReactiveKeyedStore.deleteMany`

***

### entries()

> **entries**(): `IterableIterator`\<\[`unknown`, `ShallowRef`\<`TModel`\>\]\>

Defined in: [src/utils/store.ts:207](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L207)

#### Returns

`IterableIterator`\<\[`unknown`, `ShallowRef`\<`TModel`\>\]\>

#### Inherited from

`ReactiveKeyedStore.entries`

***

### get()

> **get**(`key`, `options?`): `ShallowRef`\<`TModel`\> \| `undefined`

Defined in: [src/utils/store.ts:101](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L101)

Return the raw stored object.

#### Parameters

##### key

`unknown`

##### options?

`TGetOptions`

#### Returns

`ShallowRef`\<`TModel`\> \| `undefined`

#### Inherited from

`ReactiveKeyedStore.get`

***

### getBy()

> **getBy**\<`TSource`, `TResultKey`\>(`sources`, `sourceKey`, `options?`, `resultKey?`): `Map`\<`TResultKey`, `ShallowRef`\<`TModel`\> \| `ShallowRef`\<`TModel`\>[]\>

Defined in: [src/utils/store.ts:269](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L269)

By a list of source objects, get items using a key field on them.

It can be used for example to fetch relation among objects (eg. all users of
a list of articles).

This method ensures to optimize duplication of ids among the different
sources.

#### Type Parameters

##### TSource

`TSource`

##### TResultKey

`TResultKey`

#### Parameters

##### sources

`Iterable`\<`MaybeRef`\<`TSource`\>\>

##### sourceKey

`KeySource`\<`TSource`, `unknown`\>

##### options?

`TGetOptions`

##### resultKey?

`KeySource`\<`TSource`, `TResultKey`\>

#### Returns

`Map`\<`TResultKey`, `ShallowRef`\<`TModel`\> \| `ShallowRef`\<`TModel`\>[]\>

#### Inherited from

`ReactiveKeyedStore.getBy`

***

### getKey()

> **getKey**(`value`): `unknown`

Defined in: [src/utils/store.ts:243](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L243)

#### Parameters

##### value

`TModel` \| `ShallowRef`\<`TModel`\>

#### Returns

`unknown`

#### Inherited from

`ReactiveKeyedStore.getKey`

***

### getMany()

> **getMany**(`keys`, `options?`): `Map`\<`unknown`, `ShallowRef`\<`TModel`\>\>

Defined in: [src/utils/store.ts:165](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L165)

#### Parameters

##### keys

`Iterable`\<`unknown`\>

##### options?

`TGetOptions`

#### Returns

`Map`\<`unknown`, `ShallowRef`\<`TModel`\>\>

#### Inherited from

`ReactiveKeyedStore.getMany`

***

### getRaw()

> **getRaw**(`key`, `options?`): `TModel` \| `undefined`

Defined in: [src/utils/store.ts:122](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L122)

Return the exposed object.

#### Parameters

##### key

`unknown`

##### options?

`TGetOptions`

#### Returns

`TModel` \| `undefined`

#### Inherited from

`ReactiveKeyedStore.getRaw`

***

### has()

> **has**(`key`): `boolean`

Defined in: [src/utils/store.ts:134](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L134)

#### Parameters

##### key

`unknown`

#### Returns

`boolean`

#### Inherited from

`ReactiveKeyedStore.has`

***

### keys()

> **keys**(): `IterableIterator`\<`unknown`\>

Defined in: [src/utils/store.ts:199](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L199)

#### Returns

`IterableIterator`\<`unknown`\>

#### Inherited from

`ReactiveKeyedStore.keys`

***

### set()

> **set**(`value`): `ShallowRef`

Defined in: [src/utils/store.ts:234](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L234)

#### Parameters

##### value

`TModel` \| `ShallowRef`\<`TModel`\>

#### Returns

`ShallowRef`

#### Inherited from

`ReactiveKeyedStore.set`

***

### setMany()

> **setMany**(`entries`): `ShallowRef`\<`TModel`\>[]

Defined in: [src/utils/store.ts:306](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L306)

#### Parameters

##### entries

`Iterable`\<`TModel` \| `ShallowRef`\<`TModel`\>\>

#### Returns

`ShallowRef`\<`TModel`\>[]

#### Inherited from

`ReactiveKeyedStore.setMany`

***

### values()

> **values**(): `IterableIterator`\<`ShallowRef`\<`TModel`\>\>

Defined in: [src/utils/store.ts:203](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/utils/store.ts#L203)

#### Returns

`IterableIterator`\<`ShallowRef`\<`TModel`\>\>

#### Inherited from

`ReactiveKeyedStore.values`
