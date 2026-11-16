[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / useEditor

# Function: useEditor()

> **useEditor**\<`TData`\>(`initialSource`, `options`): [`Editor`](../interfaces/Editor.md)\<`TData`\>

Defined in: [src/adm/composables/editor.ts:220](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L220)

Creates a generic editor for an arbitrary data object.

The editor maintains an independent reactive copy of the selected fields.
It does not require a Model, Repository or API client.

## Type Parameters

### TData

`TData` *extends* `object`

## Parameters

### initialSource

`TData`

Initial source object.

### options

[`EditorOptions`](../interfaces/EditorOptions.md)\<`TData`\>

Editor configuration.

## Returns

[`Editor`](../interfaces/Editor.md)\<`TData`\>

A reactive editor instance.
