[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / SpecClass

# Interface: SpecClass\<TValidationOptions\>

Defined in: [src/adm/spec.ts:10](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L10)

A class of Spec.

## Extended by

- [`ModelClass`](ModelClass.md)

## Type Parameters

### TValidationOptions

`TValidationOptions` = [`SpecValidationOptions`](SpecValidationOptions.md)

## Properties

### rules?

> `optional` **rules?**: [`ValidationRule`](../type-aliases/ValidationRule.md)[]

Defined in: [src/adm/spec.ts:11](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L11)

## Methods

### getDefaults()

> **getDefaults**(): `Record`\<`string`, `unknown`\>

Defined in: [src/adm/spec.ts:14](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L14)

#### Returns

`Record`\<`string`, `unknown`\>

***

### getField()

> **getField**(`name`): [`SerializerField`](SerializerField.md) \| `undefined`

Defined in: [src/adm/spec.ts:16](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L16)

#### Parameters

##### name

`string`

#### Returns

[`SerializerField`](SerializerField.md) \| `undefined`

***

### getFields()

> **getFields**(): `Record`\<`string`, [`SerializerField`](SerializerField.md)\>

Defined in: [src/adm/spec.ts:15](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L15)

#### Returns

`Record`\<`string`, [`SerializerField`](SerializerField.md)\>

***

### runRules()

> **runRules**(`data`, `options?`): `string`[]

Defined in: [src/adm/spec.ts:17](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L17)

#### Parameters

##### data

`unknown`

##### options?

[`SpecValidationOptions`](SpecValidationOptions.md)

#### Returns

`string`[]

***

### validate()

> **validate**(`value`, `options?`): [`ValidationIssue`](ValidationIssue.md)[] \| `null`

Defined in: [src/adm/spec.ts:13](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L13)

#### Parameters

##### value

`unknown`

##### options?

`TValidationOptions`

#### Returns

[`ValidationIssue`](ValidationIssue.md)[] \| `null`
