[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [i18n](../index.md) / I18nOptions

# Interface: I18nOptions

Defined in: [src/i18n/types.ts:47](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/i18n/types.ts#L47)

Initialization options of the I18n manager.

## Properties

### cookieName?

> `optional` **cookieName?**: `string`

Defined in: [src/i18n/types.ts:63](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/i18n/types.ts#L63)

Name of the cookie used to detect the preferred locale.

#### Default

```ts
'language'
```

***

### fallbackLocale

> **fallbackLocale**: `string`

Defined in: [src/i18n/types.ts:51](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/i18n/types.ts#L51)

Locale used as fallback when a translation is missing.

***

### locale?

> `optional` **locale?**: `string`

Defined in: [src/i18n/types.ts:56](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/i18n/types.ts#L56)

Explicit locale override.
