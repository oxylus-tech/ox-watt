[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / BaseFieldConfig

# Interface: BaseFieldConfig

Defined in: [src/adm/fields/field.ts:17](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L17)

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

### choices?

> `optional` **choices?**: [`Enum`](../classes/Enum.md)\<[`EnumDefinition`](../type-aliases/EnumDefinition.md)\>

Defined in: [src/adm/fields/field.ts:34](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L34)

Enum providing the available field choices.

***

### default?

> `optional` **default?**: `unknown`

Defined in: [src/adm/fields/field.ts:31](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L31)

The default value applied when a value is absent.

***

### nullable?

> `optional` **nullable?**: `boolean`

Defined in: [src/adm/fields/field.ts:22](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L22)

Whether the field accepts null values.

***

### readOnly?

> `optional` **readOnly?**: `boolean`

Defined in: [src/adm/fields/field.ts:28](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L28)

Whether the field is excluded from deserialized output.

***

### required?

> `optional` **required?**: `boolean`

Defined in: [src/adm/fields/field.ts:19](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L19)

Whether the field is required during complete validation.

***

### rules?

> `optional` **rules?**: [`ValidationRule`](../type-aliases/ValidationRule.md)[]

Defined in: [src/adm/fields/field.ts:40](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L40)

Additional validation rules applied to the field. *

***

### widget?

> `optional` **widget?**: `Widget`

Defined in: [src/adm/fields/field.ts:37](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L37)

Widget used to render the field.

***

### writeOnly?

> `optional` **writeOnly?**: `boolean`

Defined in: [src/adm/fields/field.ts:25](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L25)

Whether the field is excluded from serialized output.
