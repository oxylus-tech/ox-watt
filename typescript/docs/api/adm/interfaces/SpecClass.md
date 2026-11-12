[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / SpecClass

# Interface: SpecClass\<TValidationOptions\>

Defined in: [src/adm/spec.ts:9](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/spec.ts#L9)

A class of Spec.

## Extended by

- [`ModelClass`](ModelClass.md)

## Type Parameters

### TValidationOptions

`TValidationOptions` = [`SpecValidationOptions`](SpecValidationOptions.md)

## Methods

### validate()

> **validate**(`value`, `options?`): [`ValidationIssue`](ValidationIssue.md)[] \| `null`

Defined in: [src/adm/spec.ts:16](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/spec.ts#L16)

Validates a value without transforming it.

#### Parameters

##### value

`unknown`

The value to validate.

##### options?

`TValidationOptions`

#### Returns

[`ValidationIssue`](ValidationIssue.md)[] \| `null`

The validation issues found.
