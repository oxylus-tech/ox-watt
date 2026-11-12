[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ApiRequestOf

# Type Alias: ApiRequestOf\<TApi\>

> **ApiRequestOf**\<`TApi`\> = `TApi` *extends* [`IApiClient`](../interfaces/IApiClient.md)\<`any`, infer TRequest, `any`, `any`\> ? `TRequest` : `never`

Defined in: [src/adm/api.types.ts:219](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/api.types.ts#L219)

Extracts the request type from an API client.

## Type Parameters

### TApi

`TApi`
