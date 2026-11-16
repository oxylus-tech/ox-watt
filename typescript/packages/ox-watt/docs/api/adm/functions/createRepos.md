[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / createRepos

# Function: createRepos()

> **createRepos**\<`TDefinitions`\>(`definitions`, `options?`): [`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>

Defined in: [src/adm/composables/create.ts:77](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/create.ts#L77)

Creates a collection of repositories from model classes and existing instances.

## Type Parameters

### TDefinitions

`TDefinitions` *extends* [`RepositoryDefinitionsInput`](../type-aliases/RepositoryDefinitionsInput.md)

## Parameters

### definitions

`TDefinitions`

Model classes or existing repository instances.

### options?

[`CreateReposOptions`](../interfaces/CreateReposOptions.md) = `{}`

Default repository configuration and constructors.

## Returns

[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>

The created repository collection.
