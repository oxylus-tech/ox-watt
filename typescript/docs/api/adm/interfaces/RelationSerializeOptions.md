[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / RelationSerializeOptions

# Interface: RelationSerializeOptions

Defined in: [src/adm/model.types.ts:71](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L71)

Serialization options for a relation.

## Properties

### fields?

> `optional` **fields?**: `string`[]

Defined in: [src/adm/model.types.ts:76](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L76)

Optional field selection for the related model.

***

### nested?

> `optional` **nested?**: `boolean`

Defined in: [src/adm/model.types.ts:73](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L73)

Whether to serialize the relation as a nested object.

***

### relations?

> `optional` **relations?**: `Record`\<`string`, `RelationSerializeOptions`\>

Defined in: [src/adm/model.types.ts:79](https://github.com/oxylus-tech/ox-watt/blob/2f745018fe67b9609c1f54f5072fa0fe183d5fd7/typescript/src/adm/model.types.ts#L79)

Options for relations of the related model.
