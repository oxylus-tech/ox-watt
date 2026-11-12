[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [i18n](../index.md) / I18nOptions

# Interface: I18nOptions

Defined in: [src/i18n/types.ts:47](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/i18n/types.ts#L47)

Initialization options of the I18n manager.

## Properties

### cookieName?

> `optional` **cookieName?**: `string`

Defined in: [src/i18n/types.ts:63](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/i18n/types.ts#L63)

Name of the cookie used to detect the preferred locale.

#### Default

```ts
'language'
```

***

### fallbackLocale

> **fallbackLocale**: `string`

Defined in: [src/i18n/types.ts:51](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/i18n/types.ts#L51)

Locale used as fallback when a translation is missing.

***

### locale?

> `optional` **locale?**: `string`

Defined in: [src/i18n/types.ts:56](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/i18n/types.ts#L56)

Explicit locale override.
