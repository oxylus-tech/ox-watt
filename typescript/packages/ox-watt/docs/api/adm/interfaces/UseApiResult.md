[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / UseApiResult

# Interface: UseApiResult\<TModel\>

Defined in: [src/adm/composables/api.ts:34](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/api.ts#L34)

Reactive state returned by useApi().

## Extends

- [`BaseUseApiResult`](BaseUseApiResult.md)\<[`ApiResult`](ApiResult.md)\<`TModel`\>\>

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

Model returned by the API operation.

## Properties

### error

> **error**: `ShallowRef`\<`unknown`\>

Defined in: [src/adm/composables/api.ts:23](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/api.ts#L23)

Error raised by the last failed operation.

#### Inherited from

[`BaseUseApiResult`](BaseUseApiResult.md).[`error`](BaseUseApiResult.md#error)

***

### execute

> **execute**: () => `Promise`\<[`ApiResult`](ApiResult.md)\<`TModel`, [`ApiRequest`](ApiRequest.md), `unknown`\>\>

Defined in: [src/adm/composables/api.ts:26](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/api.ts#L26)

Executes the operation manually.

#### Returns

`Promise`\<[`ApiResult`](ApiResult.md)\<`TModel`, [`ApiRequest`](ApiRequest.md), `unknown`\>\>

#### Inherited from

[`BaseUseApiResult`](BaseUseApiResult.md).[`execute`](BaseUseApiResult.md#execute)

***

### items

> **items**: `ComputedRef`\<`TModel`[]\>

Defined in: [src/adm/composables/api.ts:37](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/api.ts#L37)

Reactive list of models extracted from the API result.

***

### loading

> **loading**: `Ref`\<`boolean`\>

Defined in: [src/adm/composables/api.ts:20](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/api.ts#L20)

Indicates whether at least one operation is pending.

#### Inherited from

[`BaseUseApiResult`](BaseUseApiResult.md).[`loading`](BaseUseApiResult.md#loading)

***

### result

> **result**: `ShallowRef`\<[`ApiResult`](ApiResult.md)\<`TModel`, [`ApiRequest`](ApiRequest.md), `unknown`\> \| `undefined`\>

Defined in: [src/adm/composables/api.ts:17](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/api.ts#L17)

Last successfully returned result.

#### Inherited from

[`BaseUseApiResult`](BaseUseApiResult.md).[`result`](BaseUseApiResult.md#result)
