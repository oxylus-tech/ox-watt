[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [i18n](../index.md) / getLocaleFromPath

# Function: getLocaleFromPath()

> **getLocaleFromPath**(`path`): `string` \| `null`

Defined in: [src/i18n/resources.ts:12](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/i18n/resources.ts#L12)

Extracts the locale identifier from a resource filename.

Only filenames ending with `.[LANG].json` are recognized.
The locale identifier may contain hyphens, for example `fr-BE`.

## Parameters

### path

`string`

Resource path or filename.

## Returns

`string` \| `null`

The locale identifier, or null if the filename does not match.
