[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / IntegerFieldConfig

# Interface: IntegerFieldConfig

Defined in: [src/adm/fields/number.ts:18](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/number.ts#L18)

Defines options specific to integer fields.

## Extends

- [`NumberFieldConfig`](NumberFieldConfig.md)

## Properties

### default?

> `optional` **default?**: `unknown`

Defined in: [src/adm/fields/field.ts:21](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L21)

The default value applied when a value is absent.

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`default`](NumberFieldConfig.md#default)

***

### max?

> `optional` **max?**: `number`

Defined in: [src/adm/fields/number.ts:12](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/number.ts#L12)

The maximum accepted numeric value.

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`max`](NumberFieldConfig.md#max)

***

### min?

> `optional` **min?**: `number`

Defined in: [src/adm/fields/number.ts:9](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/number.ts#L9)

The minimum accepted numeric value.

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`min`](NumberFieldConfig.md#min)

***

### nullable?

> `optional` **nullable?**: `boolean`

Defined in: [src/adm/fields/field.ts:12](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L12)

Whether the field accepts null values.

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`nullable`](NumberFieldConfig.md#nullable)

***

### readOnly?

> `optional` **readOnly?**: `boolean`

Defined in: [src/adm/fields/field.ts:18](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L18)

Whether the field is excluded from deserialized output.

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`readOnly`](NumberFieldConfig.md#readonly)

***

### required?

> `optional` **required?**: `boolean`

Defined in: [src/adm/fields/field.ts:9](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L9)

Whether the field is required during complete validation.

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`required`](NumberFieldConfig.md#required)

***

### writeOnly?

> `optional` **writeOnly?**: `boolean`

Defined in: [src/adm/fields/field.ts:15](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L15)

Whether the field is excluded from serialized output.

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`writeOnly`](NumberFieldConfig.md#writeonly)
