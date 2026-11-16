[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ApiRequestOf

# Type Alias: ApiRequestOf\<TApi\>

> **ApiRequestOf**\<`TApi`\> = `TApi` *extends* [`IApiClient`](../interfaces/IApiClient.md)\<`any`, infer TRequest, `any`, `any`\> ? `TRequest` : `never`

Defined in: [src/adm/api.types.ts:219](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/api.types.ts#L219)

Extracts the request type from an API client.

## Type Parameters

### TApi

`TApi`
