[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / JSONFieldConfig

# Interface: JSONFieldConfig

Defined in: [src/adm/fields/json.ts:7](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/json.ts#L7)

Defines options specific to JSON-compatible fields.

## Extends

- [`BaseFieldConfig`](BaseFieldConfig.md)

## Properties

### default?

> `optional` **default?**: `unknown`

Defined in: [src/adm/fields/field.ts:21](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L21)

The default value applied when a value is absent.

#### Inherited from

[`BaseFieldConfig`](BaseFieldConfig.md).[`default`](BaseFieldConfig.md#default)

***

### nullable?

> `optional` **nullable?**: `boolean`

Defined in: [src/adm/fields/field.ts:12](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L12)

Whether the field accepts null values.

#### Inherited from

[`BaseFieldConfig`](BaseFieldConfig.md).[`nullable`](BaseFieldConfig.md#nullable)

***

### readOnly?

> `optional` **readOnly?**: `boolean`

Defined in: [src/adm/fields/field.ts:18](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L18)

Whether the field is excluded from deserialized output.

#### Inherited from

[`BaseFieldConfig`](BaseFieldConfig.md).[`readOnly`](BaseFieldConfig.md#readonly)

***

### required?

> `optional` **required?**: `boolean`

Defined in: [src/adm/fields/field.ts:9](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L9)

Whether the field is required during complete validation.

#### Inherited from

[`BaseFieldConfig`](BaseFieldConfig.md).[`required`](BaseFieldConfig.md#required)

***

### writeOnly?

> `optional` **writeOnly?**: `boolean`

Defined in: [src/adm/fields/field.ts:15](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/fields/field.ts#L15)

Whether the field is excluded from serialized output.

#### Inherited from

[`BaseFieldConfig`](BaseFieldConfig.md).[`writeOnly`](BaseFieldConfig.md#writeonly)
