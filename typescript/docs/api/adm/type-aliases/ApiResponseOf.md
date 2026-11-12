[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ApiResponseOf

# Type Alias: ApiResponseOf\<TApi\>

> **ApiResponseOf**\<`TApi`\> = `TApi` *extends* [`IApiClient`](../interfaces/IApiClient.md)\<`any`, `any`, infer TResponse, `any`\> ? `TResponse` : `never`

Defined in: [src/adm/api.types.ts:227](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L227)

Extracts the response type from an API client.

## Type Parameters

### TApi

`TApi`
