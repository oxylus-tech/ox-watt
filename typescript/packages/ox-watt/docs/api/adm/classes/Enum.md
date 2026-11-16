[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / Enum

# Class: Enum\<T\>

Defined in: [src/adm/enum.ts:32](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/enum.ts#L32)

Enum class providing values and translation utilities.

## Type Parameters

### T

`T` *extends* [`EnumDefinition`](../type-aliases/EnumDefinition.md) = [`EnumDefinition`](../type-aliases/EnumDefinition.md)

Enum member definitions.

## Properties

### members

> `readonly` **members**: `Readonly`\<`T`\>

Defined in: [src/adm/enum.ts:34](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/enum.ts#L34)

Enum member definitions.

***

### prefix

> `readonly` **prefix**: `string`

Defined in: [src/adm/enum.ts:37](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/enum.ts#L37)

Translation namespace.

## Accessors

### entries

#### Get Signature

> **get** **entries**(): \[keyof `T`, `T`\[keyof `T`\]\][]

Defined in: [src/adm/enum.ts:103](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/enum.ts#L103)

Return enum member entries.

##### Returns

\[keyof `T`, `T`\[keyof `T`\]\][]

***

### items

#### Get Signature

> **get** **items**(): [`EnumItem`](../interfaces/EnumItem.md)\<`T`\[keyof `T`\]\>[]

Defined in: [src/adm/enum.ts:151](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/enum.ts#L151)

Return translated enum items suitable for selection components.

##### Returns

[`EnumItem`](../interfaces/EnumItem.md)\<`T`\[keyof `T`\]\>[]

***

### keys

#### Get Signature

> **get** **keys**(): (keyof `T`)[]

Defined in: [src/adm/enum.ts:89](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/enum.ts#L89)

Return enum member names.

##### Returns

(keyof `T`)[]

***

### values

#### Get Signature

> **get** **values**(): `T`\[keyof `T`\][]

Defined in: [src/adm/enum.ts:96](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/enum.ts#L96)

Return enum member values.

##### Returns

`T`\[keyof `T`\][]

## Methods

### clone()

> **clone**(`prefix`): `Enum`\<`T`\> & `T`

Defined in: [src/adm/enum.ts:82](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/enum.ts#L82)

Create a new instance sharing the same member definitions.

#### Parameters

##### prefix

`string`

New translation namespace.

#### Returns

`Enum`\<`T`\> & `T`

Cloned enum instance.

***

### label()

> **label**(`prop?`): `string`

Defined in: [src/adm/enum.ts:113](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/enum.ts#L113)

Translate an enum or one of its members.

#### Parameters

##### prop?

keyof `T` \| `T`\[keyof `T`\]

Optional enum member name or value.

#### Returns

`string`

Translated enum or member label.

***

### toString()

> **toString**(`prop?`): `string`

Defined in: [src/adm/enum.ts:165](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/enum.ts#L165)

Return the translated label of an enum or one of its members.

#### Parameters

##### prop?

keyof `T` \| `T`\[keyof `T`\]

Optional enum member name or value.

#### Returns

`string`

Translated enum or member label.

***

### create()

> `static` **create**\<`T`\>(`prefix`, `members`): `Enum`\<`T`\> & `T`

Defined in: [src/adm/enum.ts:69](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/enum.ts#L69)

Create an enum instance.

#### Type Parameters

##### T

`T` *extends* [`EnumDefinition`](../type-aliases/EnumDefinition.md)

#### Parameters

##### prefix

`string`

Translation namespace.

##### members

`T`

Enum member definitions.

#### Returns

`Enum`\<`T`\> & `T`

Enum instance with direct member access.
