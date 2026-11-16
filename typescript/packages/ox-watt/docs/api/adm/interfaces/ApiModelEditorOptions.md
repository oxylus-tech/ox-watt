[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ApiModelEditorOptions

# Interface: ApiModelEditorOptions\<TModel\>

Defined in: [src/adm/composables/apiModelEditor.ts:13](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/apiModelEditor.ts#L13)

Options for an API-backed model editor.

## Extends

- `Omit`\<[`ModelEditorOptions`](ModelEditorOptions.md)\<`TModel`\>, `"save"`\>

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

## Properties

### api?

> `optional` **api?**: [`ApiOptions`](ApiOptions.md)

Defined in: [src/adm/composables/apiModelEditor.ts:18](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/apiModelEditor.ts#L18)

Options passed to API create and update operations.

***

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

### parseErrors?

> `optional` **parseErrors?**: (`error`) => [`EditorErrors`](EditorErrors.md) \| `undefined`

Defined in: [src/adm/composables/apiModelEditor.ts:28](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/apiModelEditor.ts#L28)

Converts an API or transport error into editor errors.

The callback receives the original error, which may be an ApiResult.

#### Parameters

##### error

`unknown`

Original API or transport error.

#### Returns

[`EditorErrors`](EditorErrors.md) \| `undefined`

Normalized editor errors, or undefined when no errors can be mapped.
