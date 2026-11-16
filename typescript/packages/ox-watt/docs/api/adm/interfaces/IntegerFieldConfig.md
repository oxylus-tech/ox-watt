[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / IntegerFieldConfig

# Interface: IntegerFieldConfig

Defined in: [src/adm/fields/number.ts:18](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/number.ts#L18)

Defines options specific to integer fields.

## Extends

- [`NumberFieldConfig`](NumberFieldConfig.md)

## Properties

### choices?

> `optional` **choices?**: [`Enum`](../classes/Enum.md)\<[`EnumDefinition`](../type-aliases/EnumDefinition.md)\>

Defined in: [src/adm/fields/field.ts:34](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L34)

Enum providing the available field choices.

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`choices`](NumberFieldConfig.md#choices)

***

### default?

> `optional` **default?**: `unknown`

Defined in: [src/adm/fields/field.ts:31](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L31)

The default value applied when a value is absent.

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`default`](NumberFieldConfig.md#default)

***

### max?

> `optional` **max?**: `number`

Defined in: [src/adm/fields/number.ts:12](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/number.ts#L12)

The maximum accepted numeric value.

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`max`](NumberFieldConfig.md#max)

***

### min?

> `optional` **min?**: `number`

Defined in: [src/adm/fields/number.ts:9](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/number.ts#L9)

The minimum accepted numeric value.

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`min`](NumberFieldConfig.md#min)

***

### nullable?

> `optional` **nullable?**: `boolean`

Defined in: [src/adm/fields/field.ts:22](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L22)

Whether the field accepts null values.

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`nullable`](NumberFieldConfig.md#nullable)

***

### readOnly?

> `optional` **readOnly?**: `boolean`

Defined in: [src/adm/fields/field.ts:28](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L28)

Whether the field is excluded from deserialized output.

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`readOnly`](NumberFieldConfig.md#readonly)

***

### required?

> `optional` **required?**: `boolean`

Defined in: [src/adm/fields/field.ts:19](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L19)

Whether the field is required during complete validation.

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`required`](NumberFieldConfig.md#required)

***

### rules?

> `optional` **rules?**: [`ValidationRule`](../type-aliases/ValidationRule.md)[]

Defined in: [src/adm/fields/field.ts:40](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L40)

Additional validation rules applied to the field. *

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`rules`](NumberFieldConfig.md#rules)

***

### widget?

> `optional` **widget?**: `Widget`

Defined in: [src/adm/fields/field.ts:37](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L37)

Widget used to render the field.

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`widget`](NumberFieldConfig.md#widget)

***

### writeOnly?

> `optional` **writeOnly?**: `boolean`

Defined in: [src/adm/fields/field.ts:25](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L25)

Whether the field is excluded from serialized output.

#### Inherited from

[`NumberFieldConfig`](NumberFieldConfig.md).[`writeOnly`](NumberFieldConfig.md#writeonly)
