[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ApiModelEditor

# Interface: ApiModelEditor\<TModel\>

Defined in: [src/adm/composables/apiModelEditor.ts:34](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/apiModelEditor.ts#L34)

Editor backed by an API client.

## Extends

- [`ModelEditor`](ModelEditor.md)\<`TModel`\>

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

## Properties

### api

> `readonly` **api**: [`IApiClient`](IApiClient.md)\<`TModel`\>

Defined in: [src/adm/composables/apiModelEditor.ts:39](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/apiModelEditor.ts#L39)

API client used for persistence.

***

### data

> `readonly` **data**: `TModel`

Defined in: [src/adm/composables/editor.ts:118](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L118)

Current editable data.

#### Inherited from

[`ModelEditor`](ModelEditor.md).[`data`](ModelEditor.md#data)

***

### errors

> `readonly` **errors**: `Readonly`\<`Ref`\<[`EditorErrors`](EditorErrors.md)\>\>

Defined in: [src/adm/composables/editor.ts:130](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L130)

Current validation errors.

#### Inherited from

[`ModelEditor`](ModelEditor.md).[`errors`](ModelEditor.md#errors)

***

### isDirty

> `readonly` **isDirty**: `ComputedRef`\<`boolean`\>

Defined in: [src/adm/composables/editor.ts:124](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L124)

Whether editable data differs from the initial snapshot.

#### Inherited from

[`ModelEditor`](ModelEditor.md).[`isDirty`](ModelEditor.md#isdirty)

***

### isSaving

> `readonly` **isSaving**: `Readonly`\<`Ref`\<`boolean`\>\>

Defined in: [src/adm/composables/editor.ts:127](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L127)

Whether a save operation is running.

#### Inherited from

[`ModelEditor`](ModelEditor.md).[`isSaving`](ModelEditor.md#issaving)

***

### original

> `readonly` **original**: `Readonly`\<`ShallowRef`\<`TData`\>\>

Defined in: [src/adm/composables/editor.ts:121](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L121)

Initial data snapshot.

#### Inherited from

[`ModelEditor`](ModelEditor.md).[`original`](ModelEditor.md#original)

***

### repository

> `readonly` **repository**: [`Repository`](../classes/Repository.md)\<`TModel`\>

Defined in: [src/adm/composables/modelEditor.ts:26](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/modelEditor.ts#L26)

Repository managing the edited model.

#### Inherited from

[`ModelEditor`](ModelEditor.md).[`repository`](ModelEditor.md#repository)

## Methods

### clearErrors()

> **clearErrors**(`field?`): `void`

Defined in: [src/adm/composables/editor.ts:162](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L162)

Clears all errors or errors associated with one field.

#### Parameters

##### field?

keyof `TModel`

Optional field name.

#### Returns

`void`

#### Inherited from

[`ModelEditor`](ModelEditor.md).[`clearErrors`](ModelEditor.md#clearerrors)

***

### reset()

> **reset**(): `void`

Defined in: [src/adm/composables/editor.ts:140](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L140)

Restores the initial values and clears errors.

#### Returns

`void`

#### Inherited from

[`ModelEditor`](ModelEditor.md).[`reset`](ModelEditor.md#reset)

***

### save()

> **save**(): `Promise`\<`unknown`\>

Defined in: [src/adm/composables/editor.ts:147](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/editor.ts#L147)

Saves the current data.

#### Returns

`Promise`\<`unknown`\>

The result of the persistence function.

#### Inherited from

[`ModelEditor`](ModelEditor.md).[`save`](ModelEditor.md#save)

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

`TModel`

Data snapshot associated with the errors.

#### Returns

`void`

#### Inherited from

[`ModelEditor`](ModelEditor.md).[`setErrors`](ModelEditor.md#seterrors)

***

### setSource()

> **setSource**(`source`): `void`

Defined in: [src/adm/composables/modelEditor.ts:35](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/modelEditor.ts#L35)

Changes the edited model.

Passing null creates a new model initialized with its default values.

#### Parameters

##### source

`TModel` \| `null`

New model instance, or null.

#### Returns

`void`

#### Inherited from

[`ModelEditor`](ModelEditor.md).[`setSource`](ModelEditor.md#setsource)
