[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ApiResponseOf

# Type Alias: ApiResponseOf\<TApi\>

> **ApiResponseOf**\<`TApi`\> = `TApi` *extends* [`IApiClient`](../interfaces/IApiClient.md)\<`any`, `any`, infer TResponse, `any`\> ? `TResponse` : `never`

Defined in: [src/adm/api.types.ts:227](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L227)

Extracts the response type from an API client.

## Type Parameters

### TApi

`TApi`
