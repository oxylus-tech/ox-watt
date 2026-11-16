[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / BaseUseApiResult

# Interface: BaseUseApiResult\<TResult\>

Defined in: [src/adm/composables/api.ts:15](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/api.ts#L15)

Common reactive state returned by asynchronous composables.

## Extended by

- [`UseApiResult`](UseApiResult.md)

## Type Parameters

### TResult

`TResult`

Type of the operation result.

## Properties

### error

> **error**: `ShallowRef`\<`unknown`\>

Defined in: [src/adm/composables/api.ts:23](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/api.ts#L23)

Error raised by the last failed operation.

***

### execute

> **execute**: () => `Promise`\<`TResult`\>

Defined in: [src/adm/composables/api.ts:26](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/api.ts#L26)

Executes the operation manually.

#### Returns

`Promise`\<`TResult`\>

***

### loading

> **loading**: `Ref`\<`boolean`\>

Defined in: [src/adm/composables/api.ts:20](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/api.ts#L20)

Indicates whether at least one operation is pending.

***

### result

> **result**: `ShallowRef`\<`TResult` \| `undefined`\>

Defined in: [src/adm/composables/api.ts:17](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/api.ts#L17)

Last successfully returned result.
