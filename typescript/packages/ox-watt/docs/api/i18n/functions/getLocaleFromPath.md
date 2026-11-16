[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [i18n](../index.md) / getLocaleFromPath

# Function: getLocaleFromPath()

> **getLocaleFromPath**(`path`): `string` \| `null`

Defined in: [src/i18n/resources.ts:12](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/i18n/resources.ts#L12)

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
