[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / useAsync

# Function: useAsync()

> **useAsync**\<`TResult`\>(`request`, `options?`): [`BaseUseApiResult`](../interfaces/BaseUseApiResult.md)\<`TResult`\>

Defined in: [src/adm/composables/api.ts:77](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/api.ts#L77)

Creates reactive state for an asynchronous operation.

Concurrent executions with the same key share the same Promise.
When no key is provided, executions are independent.
Only the latest distinct execution can update the result or error state.

## Type Parameters

### TResult

`TResult`

Type of the operation result.

## Parameters

### request

() => `Promise`\<`TResult`\>

Asynchronous operation to execute.

### options?

`UseAsyncOptions`\<`TResult`\> = `{}`

Operation configuration.

## Returns

[`BaseUseApiResult`](../interfaces/BaseUseApiResult.md)\<`TResult`\>

Reactive operation state.
