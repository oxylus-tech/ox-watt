[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / EditorErrorContext

# Interface: EditorErrorContext\<TData\>

Defined in: [src/adm/composables/editor.ts:28](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L28)

Context provided when an editor operation fails.

## Type Parameters

### TData

`TData` *extends* `object`

## Properties

### data

> **data**: `TData`

Defined in: [src/adm/composables/editor.ts:33](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L33)

Snapshot of the data involved in the failed operation.

***

### setErrors

> **setErrors**: (`errors`) => `void`

Defined in: [src/adm/composables/editor.ts:40](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L40)

Associates errors with the submitted data snapshot.

#### Parameters

##### errors

[`EditorErrors`](EditorErrors.md)

Normalized errors to apply.

#### Returns

`void`

***

### source

> **source**: `TData`

Defined in: [src/adm/composables/editor.ts:30](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L30)

Source object involved in the failed operation.
