[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / BaseFieldConfig

# Interface: BaseFieldConfig

Defined in: [src/adm/fields/field.ts:7](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L7)

Defines common options supported by all fields.

## Extended by

- [`StringFieldConfig`](StringFieldConfig.md)
- [`NumberFieldConfig`](NumberFieldConfig.md)
- [`BooleanFieldConfig`](BooleanFieldConfig.md)
- [`DateFieldConfig`](DateFieldConfig.md)
- [`JSONFieldConfig`](JSONFieldConfig.md)
- [`ListFieldConfig`](ListFieldConfig.md)
- [`ModelFieldConfig`](ModelFieldConfig.md)

## Properties

### default?

> `optional` **default?**: `unknown`

Defined in: [src/adm/fields/field.ts:21](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L21)

The default value applied when a value is absent.

***

### nullable?

> `optional` **nullable?**: `boolean`

Defined in: [src/adm/fields/field.ts:12](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L12)

Whether the field accepts null values.

***

### readOnly?

> `optional` **readOnly?**: `boolean`

Defined in: [src/adm/fields/field.ts:18](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L18)

Whether the field is excluded from deserialized output.

***

### required?

> `optional` **required?**: `boolean`

Defined in: [src/adm/fields/field.ts:9](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L9)

Whether the field is required during complete validation.

***

### writeOnly?

> `optional` **writeOnly?**: `boolean`

Defined in: [src/adm/fields/field.ts:15](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L15)

Whether the field is excluded from serialized output.
