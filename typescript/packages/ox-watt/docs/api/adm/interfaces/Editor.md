[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / Editor

# Interface: Editor\<TData\>

Defined in: [src/adm/composables/editor.ts:116](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L116)

Generic editor interface.

## Extended by

- [`ModelEditor`](ModelEditor.md)

## Type Parameters

### TData

`TData` *extends* `object`

## Properties

### data

> `readonly` **data**: `TData`

Defined in: [src/adm/composables/editor.ts:118](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L118)

Current editable data.

***

### errors

> `readonly` **errors**: `Readonly`\<`Ref`\<[`EditorErrors`](EditorErrors.md)\>\>

Defined in: [src/adm/composables/editor.ts:130](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L130)

Current validation errors.

***

### isDirty

> `readonly` **isDirty**: `ComputedRef`\<`boolean`\>

Defined in: [src/adm/composables/editor.ts:124](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L124)

Whether editable data differs from the initial snapshot.

***

### isSaving

> `readonly` **isSaving**: `Readonly`\<`Ref`\<`boolean`\>\>

Defined in: [src/adm/composables/editor.ts:127](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L127)

Whether a save operation is running.

***

### original

> `readonly` **original**: `Readonly`\<`ShallowRef`\<`TData`\>\>

Defined in: [src/adm/composables/editor.ts:121](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L121)

Initial data snapshot.

## Methods

### clearErrors()

> **clearErrors**(`field?`): `void`

Defined in: [src/adm/composables/editor.ts:162](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L162)

Clears all errors or errors associated with one field.

#### Parameters

##### field?

keyof `TData`

Optional field name.

#### Returns

`void`

***

### reset()

> **reset**(): `void`

Defined in: [src/adm/composables/editor.ts:140](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L140)

Restores the initial values and clears errors.

#### Returns

`void`

***

### save()

> **save**(): `Promise`\<`unknown`\>

Defined in: [src/adm/composables/editor.ts:147](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L147)

Saves the current data.

#### Returns

`Promise`\<`unknown`\>

The result of the persistence function.

***

### setErrors()

> **setErrors**(`errors`, `data?`): `void`

Defined in: [src/adm/composables/editor.ts:155](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L155)

Replaces the current validation errors.

#### Parameters

##### errors

[`EditorErrors`](EditorErrors.md)

Normalized errors.

##### data?

`TData`

Data snapshot associated with the errors.

#### Returns

`void`

***

### setSource()

> **setSource**(`source`): `void`

Defined in: [src/adm/composables/editor.ts:137](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L137)

Replaces the source object and resets the editor.

#### Parameters

##### source

`TData`

New source object.

#### Returns

`void`
