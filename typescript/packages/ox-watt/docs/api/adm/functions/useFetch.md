[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / useFetch

# Function: useFetch()

> **useFetch**\<`TResult`\>(`request`, `sources?`, `options?`): [`BaseUseApiResult`](../interfaces/BaseUseApiResult.md)\<`TResult`\>

Defined in: [src/adm/composables/api.ts:186](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/api.ts#L186)

Creates reactive state for an asynchronous operation with optional automatic execution.

The operation is executed manually through execute() unless automatic watching
is explicitly enabled.

## Type Parameters

### TResult

`TResult`

Type of the operation result.

## Parameters

### request

() => `Promise`\<`TResult`\>

Asynchronous operation to execute.

### sources?

`WatchSource`[] = `[]`

Reactive sources that can trigger the operation.

### options?

[`UseFetchOptions`](../interfaces/UseFetchOptions.md) = `{}`

Automatic execution configuration.

## Returns

[`BaseUseApiResult`](../interfaces/BaseUseApiResult.md)\<`TResult`\>

Reactive operation state.
