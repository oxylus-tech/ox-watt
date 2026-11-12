[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [i18n](../index.md) / AppLocaleLoaders

# Type Alias: AppLocaleLoaders

> **AppLocaleLoaders** = `Record`\<`string`, [`LocaleLoader`](LocaleLoader.md)\>

Defined in: [src/i18n/types.ts:19](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/i18n/types.ts#L19)

Locale loaders indexed by their source file paths.

The locale is extracted from the filename using the `.[LANG].json`
suffix convention.
