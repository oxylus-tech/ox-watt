[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [i18n](../index.md) / I18nManager

# Class: I18nManager

Defined in: [src/i18n/manager.ts:61](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/i18n/manager.ts#L61)

Manages locale resources and the active Vue I18n locale.

The manager does not persist locale preferences or modify browser state.

## Constructors

### Constructor

> **new I18nManager**(): `I18nManager`

#### Returns

`I18nManager`

## Accessors

### composer

#### Get Signature

> **get** **composer**(): `Composer`\<\{ \}, \{ \}, \{ \}, `string`, `never`, `string`\>

Defined in: [src/i18n/manager.ts:110](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/i18n/manager.ts#L110)

Returns the Vue I18n Composer.

##### Throws

Error if the manager has not been initialized.

##### Returns

`Composer`\<\{ \}, \{ \}, \{ \}, `string`, `never`, `string`\>

***

### locale

#### Get Signature

> **get** **locale**(): `string`

Defined in: [src/i18n/manager.ts:101](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/i18n/manager.ts#L101)

Returns the currently active locale.

##### Throws

Error if the manager has not been initialized.

##### Returns

`string`

***

### plugin

#### Get Signature

> **get** **plugin**(): `I18n`

Defined in: [src/i18n/manager.ts:92](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/i18n/manager.ts#L92)

Returns the Vue I18n instance to install as a Vue plugin.

##### Throws

Error if the manager has not been initialized.

##### Returns

`I18n`

## Methods

### initialize()

> **initialize**(`options`): `Promise`\<`I18n`\<\{ \}, \{ \}, \{ \}, `string`, `false`\>\>

Defined in: [src/i18n/manager.ts:145](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/i18n/manager.ts#L145)

Initializes Vue I18n and loads the initial locale resources.

The fallback locale is loaded first, followed by the detected locale.
This ensures that the initial translations are available before the
application is mounted.

#### Parameters

##### options

`I18nOptions`

Initialization options.

#### Returns

`Promise`\<`I18n`\<\{ \}, \{ \}, \{ \}, `string`, `false`\>\>

The initialized Vue I18n instance.

***

### register()

> **register**(`loaders`): `void`

Defined in: [src/i18n/manager.ts:123](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/i18n/manager.ts#L123)

Registers locale loader groups.

Duplicate groups are ignored by reference.

Registration must happen before initialization.

#### Parameters

##### loaders

[`AppLocaleLoaders`](../type-aliases/AppLocaleLoaders.md)[]

Locale loader groups to register.

#### Returns

`void`

***

### setLocale()

> **setLocale**(`locale`): `Promise`\<`void`\>

Defined in: [src/i18n/manager.ts:184](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/i18n/manager.ts#L184)

Changes the active locale.

The fallback and requested locale resources are loaded before changing
the active locale. This method does not modify cookies, browser storage,
or the document language attribute.

#### Parameters

##### locale

`string`

Locale to activate.

#### Returns

`Promise`\<`void`\>
