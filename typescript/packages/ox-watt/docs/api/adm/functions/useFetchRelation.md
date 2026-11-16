[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / useFetchRelation

# Function: useFetchRelation()

> **useFetchRelation**\<`TModel`, `TDefinitions`, `TRelation`, `TRepositories`, `TOptions`\>(`database`, `items`, `definitions`, `relation`, `options?`, `fetchOptions?`): [`BaseUseApiResult`](../interfaces/BaseUseApiResult.md)\<[`ResolvedRelations`](../interfaces/ResolvedRelations.md)\<`TModel`, `TDefinitions`, `TRepositories`, `TOptions` *extends* `object` ? `true` : `false`\>[]\>

Defined in: [src/adm/composables/api.ts:280](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/api.ts#L280)

Fetches one relation for one or more model instances.

This is a convenience wrapper around useFetchRelations().

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

Source model type.

### TDefinitions

`TDefinitions` *extends* [`RelationDefinitions`](../type-aliases/RelationDefinitions.md)

Relation definitions.

### TRelation

`TRelation` *extends* `string` \| `number` \| `symbol`

Relation name to resolve.

### TRepositories

`TRepositories` *extends* [`Repositories`](../type-aliases/Repositories.md)

Database repository collection type.

### TOptions

`TOptions` *extends* [`ApiOptions`](../interfaces/ApiOptions.md) = [`ApiOptions`](../interfaces/ApiOptions.md)

API options type.

## Parameters

### database

[`Database`](../classes/Database.md)\<`TRepositories`\>

Database used to resolve the relation.

### items

`MaybeRefOrGetter`\<`Iterable`\<`TModel`, `any`, `any`\>\>

Reactive or static source items.

### definitions

`TDefinitions`

Relation definitions associated with the source model.

### relation

`TRelation`

Relation to resolve.

### options?

`MaybeRefOrGetter`\<`TOptions`\>

Reactive or static API options.

### fetchOptions?

[`UseFetchOptions`](../interfaces/UseFetchOptions.md) = `{}`

Automatic execution configuration.

## Returns

[`BaseUseApiResult`](../interfaces/BaseUseApiResult.md)\<[`ResolvedRelations`](../interfaces/ResolvedRelations.md)\<`TModel`, `TDefinitions`, `TRepositories`, `TOptions` *extends* `object` ? `true` : `false`\>[]\>

Reactive relation-fetching state.
