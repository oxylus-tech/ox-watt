[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / EditorOptions

# Interface: EditorOptions\<TData\>

Defined in: [src/adm/composables/editor.ts:67](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L67)

Configuration options for a generic editor.

## Type Parameters

### TData

`TData` *extends* `object`

## Properties

### copy?

> `optional` **copy?**: (`source`, `fields`) => `TData`

Defined in: [src/adm/composables/editor.ts:80](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L80)

Custom function used to copy the source data.

The default implementation deep-copies the managed fields.

#### Parameters

##### source

`TData`

Object to copy.

##### fields

readonly (keyof `TData`)[]

Fields to copy.

#### Returns

`TData`

An independent copy of the source.

***

### fields

> **fields**: readonly (keyof `TData`)[]

Defined in: [src/adm/composables/editor.ts:69](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L69)

Fields managed by the editor.

***

### onChange?

> `optional` **onChange?**: (`data`) => `void`

Defined in: [src/adm/composables/editor.ts:110](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L110)

Called when edited data changes.

#### Parameters

##### data

`TData`

#### Returns

`void`

***

### onError?

> `optional` **onError?**: (`error`, `context`) => `void`

Defined in: [src/adm/composables/editor.ts:104](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L104)

Called when an operation fails.

#### Parameters

##### error

`unknown`

##### context

[`EditorErrorContext`](EditorErrorContext.md)\<`TData`\>

#### Returns

`void`

***

### onReset?

> `optional` **onReset?**: (`data`) => `void`

Defined in: [src/adm/composables/editor.ts:101](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L101)

Called after resetting the editor.

#### Parameters

##### data

`TData`

#### Returns

`void`

***

### onSave?

> `optional` **onSave?**: (`result`, `data`) => `void`

Defined in: [src/adm/composables/editor.ts:98](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L98)

Called after a successful save.

#### Parameters

##### result

`unknown`

##### data

`TData`

#### Returns

`void`

***

### save?

> `optional` **save?**: [`EditorSave`](../type-aliases/EditorSave.md)\<`TData`\>

Defined in: [src/adm/composables/editor.ts:95](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L95)

Custom persistence function.

When provided, this function is responsible for synchronizing
the source object with the persisted data.

#### Param

**data**

Snapshot of the edited data.

#### Param

**source**

Original source object.

#### Returns

The persistence operation result.
