[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / RepositoryClass

# Interface: RepositoryClass

Defined in: [src/adm/repository.ts:26](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/repository.ts#L26)

Repository constructor class.

## Constructors

### Constructor

> **new RepositoryClass**\<`TModel`, `TApi`\>(`model`, `config`, `apiClass?`, `store?`): [`Repository`](../classes/Repository.md)\<`TModel`, `TApi`\>

Defined in: [src/adm/repository.ts:27](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/repository.ts#L27)

#### Parameters

##### model

[`ModelClass`](ModelClass.md)\<`TModel`\>

##### config

[`RepositoryConfig`](RepositoryConfig.md)

##### apiClass?

[`ApiClientClass`](ApiClientClass.md)\<[`ApiRequest`](ApiRequest.md), `object`, [`ApiOptions`](ApiOptions.md)\>

##### store?

[`ModelStore`](../classes/ModelStore.md)\<`TModel`, [`ModelStoreGetOptions`](ModelStoreGetOptions.md)\>

#### Returns

[`Repository`](../classes/Repository.md)\<`TModel`, `TApi`\>
