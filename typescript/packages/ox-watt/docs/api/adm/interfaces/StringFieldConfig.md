[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / StringFieldConfig

# Interface: StringFieldConfig

Defined in: [src/adm/fields/string.ts:7](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/string.ts#L7)

Defines options specific to string fields.

## Extends

- [`BaseFieldConfig`](BaseFieldConfig.md)

## Properties

### allowBlank?

> `optional` **allowBlank?**: `boolean`

Defined in: [src/adm/fields/string.ts:18](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/string.ts#L18)

Whether empty strings are accepted.

***

### choices?

> `optional` **choices?**: [`Enum`](../classes/Enum.md)\<[`EnumDefinition`](../type-aliases/EnumDefinition.md)\>

Defined in: [src/adm/fields/field.ts:34](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L34)

Enum providing the available field choices.

#### Inherited from

[`BaseFieldConfig`](BaseFieldConfig.md).[`choices`](BaseFieldConfig.md#choices)

***

### default?

> `optional` **default?**: `unknown`

Defined in: [src/adm/fields/field.ts:31](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L31)

The default value applied when a value is absent.

#### Inherited from

[`BaseFieldConfig`](BaseFieldConfig.md).[`default`](BaseFieldConfig.md#default)

***

### maxLength?

> `optional` **maxLength?**: `number`

Defined in: [src/adm/fields/string.ts:12](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/string.ts#L12)

The maximum accepted string length.

***

### minLength?

> `optional` **minLength?**: `number`

Defined in: [src/adm/fields/string.ts:9](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/string.ts#L9)

The minimum accepted string length.

***

### nullable?

> `optional` **nullable?**: `boolean`

Defined in: [src/adm/fields/field.ts:22](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L22)

Whether the field accepts null values.

#### Inherited from

[`BaseFieldConfig`](BaseFieldConfig.md).[`nullable`](BaseFieldConfig.md#nullable)

***

### pattern?

> `optional` **pattern?**: `string`

Defined in: [src/adm/fields/string.ts:15](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/string.ts#L15)

A regular expression the value must match.

***

### readOnly?

> `optional` **readOnly?**: `boolean`

Defined in: [src/adm/fields/field.ts:28](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L28)

Whether the field is excluded from deserialized output.

#### Inherited from

[`BaseFieldConfig`](BaseFieldConfig.md).[`readOnly`](BaseFieldConfig.md#readonly)

***

### required?

> `optional` **required?**: `boolean`

Defined in: [src/adm/fields/field.ts:19](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L19)

Whether the field is required during complete validation.

#### Inherited from

[`BaseFieldConfig`](BaseFieldConfig.md).[`required`](BaseFieldConfig.md#required)

***

### rules?

> `optional` **rules?**: [`ValidationRule`](../type-aliases/ValidationRule.md)[]

Defined in: [src/adm/fields/field.ts:40](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L40)

Additional validation rules applied to the field. *

#### Inherited from

[`BaseFieldConfig`](BaseFieldConfig.md).[`rules`](BaseFieldConfig.md#rules)

***

### widget?

> `optional` **widget?**: `Widget`

Defined in: [src/adm/fields/field.ts:37](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L37)

Widget used to render the field.

#### Inherited from

[`BaseFieldConfig`](BaseFieldConfig.md).[`widget`](BaseFieldConfig.md#widget)

***

### writeOnly?

> `optional` **writeOnly?**: `boolean`

Defined in: [src/adm/fields/field.ts:25](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/fields/field.ts#L25)

Whether the field is excluded from serialized output.

#### Inherited from

[`BaseFieldConfig`](BaseFieldConfig.md).[`writeOnly`](BaseFieldConfig.md#writeonly)
