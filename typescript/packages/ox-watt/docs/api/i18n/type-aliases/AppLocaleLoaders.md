[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [i18n](../index.md) / AppLocaleLoaders

# Type Alias: AppLocaleLoaders

> **AppLocaleLoaders** = `Record`\<`string`, [`LocaleLoader`](LocaleLoader.md)\>

Defined in: [src/i18n/types.ts:19](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/i18n/types.ts#L19)

Locale loaders indexed by their source file paths.

The locale is extracted from the filename using the `.[LANG].json`
suffix convention.
