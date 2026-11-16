[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / RelationSerializeOptions

# Interface: RelationSerializeOptions

Defined in: [src/adm/model.types.ts:96](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L96)

Serialization options for a relation.

## Properties

### fields?

> `optional` **fields?**: `string`[]

Defined in: [src/adm/model.types.ts:101](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L101)

Optional field selection for the related model.

***

### nested?

> `optional` **nested?**: `boolean`

Defined in: [src/adm/model.types.ts:98](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L98)

Whether to serialize the relation as a nested object.

***

### relations?

> `optional` **relations?**: `Record`\<`string`, `RelationSerializeOptions`\>

Defined in: [src/adm/model.types.ts:104](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.types.ts#L104)

Options for relations of the related model.
