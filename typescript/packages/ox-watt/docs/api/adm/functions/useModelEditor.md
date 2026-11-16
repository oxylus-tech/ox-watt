[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / useModelEditor

# Function: useModelEditor()

> **useModelEditor**\<`TModel`\>(`repository`, `source`, `options?`): [`ModelEditor`](../interfaces/ModelEditor.md)\<`TModel`\>

Defined in: [src/adm/composables/modelEditor.ts:46](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/modelEditor.ts#L46)

Creates an editor adapted to an Ox-Watt model.

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

## Parameters

### repository

[`Repository`](../classes/Repository.md)\<`TModel`\>

Repository managing the model type.

### source

`TModel` \| `null`

Initial model instance, or null to create a new model.

### options?

[`ModelEditorOptions`](../interfaces/ModelEditorOptions.md)\<`TModel`\> = `{}`

Additional editor options.

## Returns

[`ModelEditor`](../interfaces/ModelEditor.md)\<`TModel`\>

A model editor.
