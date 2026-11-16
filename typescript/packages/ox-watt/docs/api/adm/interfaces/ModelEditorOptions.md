[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ModelEditorOptions

# Interface: ModelEditorOptions\<TModel\>

Defined in: [src/adm/composables/modelEditor.ts:10](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/modelEditor.ts#L10)

Options for a model editor.

## Extends

- `Omit`\<[`EditorOptions`](EditorOptions.md)\<`TModel`\>, `"fields"` \| `"copy"` \| `"save"`\>

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

## Properties

### onChange?

> `optional` **onChange?**: (`data`) => `void`

Defined in: [src/adm/composables/editor.ts:110](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L110)

Called when edited data changes.

#### Parameters

##### data

`TModel`

#### Returns

`void`

#### Inherited from

`Omit.onChange`

***

### onError?

> `optional` **onError?**: (`error`, `context`) => `void`

Defined in: [src/adm/composables/editor.ts:104](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L104)

Called when an operation fails.

#### Parameters

##### error

`unknown`

##### context

[`EditorErrorContext`](EditorErrorContext.md)\<`TModel`\>

#### Returns

`void`

#### Inherited from

`Omit.onError`

***

### onReset?

> `optional` **onReset?**: (`data`) => `void`

Defined in: [src/adm/composables/editor.ts:101](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L101)

Called after resetting the editor.

#### Parameters

##### data

`TModel`

#### Returns

`void`

#### Inherited from

`Omit.onReset`

***

### onSave?

> `optional` **onSave?**: (`result`, `data`) => `void`

Defined in: [src/adm/composables/editor.ts:98](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L98)

Called after a successful save.

#### Parameters

##### result

`unknown`

##### data

`TModel`

#### Returns

`void`

#### Inherited from

`Omit.onSave`

***

### save?

> `optional` **save?**: [`EditorSave`](../type-aliases/EditorSave.md)\<`TModel`\>

Defined in: [src/adm/composables/modelEditor.ts:17](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/modelEditor.ts#L17)

Custom persistence callback.

The default model synchronization can be invoked through context.defaultSave().
