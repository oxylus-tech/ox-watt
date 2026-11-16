[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / useApiModelEditor

# Function: useApiModelEditor()

> **useApiModelEditor**\<`TModel`\>(`repository`, `source`, `options?`): [`ApiModelEditor`](../interfaces/ApiModelEditor.md)\<`TModel`\>

Defined in: [src/adm/composables/apiModelEditor.ts:77](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/apiModelEditor.ts#L77)

Creates an API-backed editor for a model.

The API client is obtained from the repository. Models are created or
updated according to the presence of their identifier.

A successful API response synchronizes the editor with the returned model
when available, or with the submitted data otherwise.

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

## Parameters

### repository

[`Repository`](../classes/Repository.md)\<`TModel`\>

Repository handling the edited model.

### source

`TModel` \| `null`

Initial source model, or null to create a new model.

### options?

[`ApiModelEditorOptions`](../interfaces/ApiModelEditorOptions.md)\<`TModel`\> = `{}`

Editor and API configuration.

## Returns

[`ApiModelEditor`](../interfaces/ApiModelEditor.md)\<`TModel`\>

An API-backed model editor.

## Throws

Error when the repository has no configured API client.
