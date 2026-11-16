[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / createDb

# Function: createDb()

> **createDb**\<`TRepositories`\>(`repositories`, `config?`): [`Database`](../classes/Database.md)\<`TRepositories`\>

Defined in: [src/adm/composables/create.ts:132](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/create.ts#L132)

Creates a database from existing repositories.

## Type Parameters

### TRepositories

`TRepositories` *extends* [`Repositories`](../type-aliases/Repositories.md)

## Parameters

### repositories

`TRepositories`

Repository instances.

### config?

[`DatabaseConfig`](../interfaces/DatabaseConfig.md)

Database configuration.

## Returns

[`Database`](../classes/Database.md)\<`TRepositories`\>

The created database.
