[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / useFetchRelations

# Function: useFetchRelations()

> **useFetchRelations**\<`TModel`, `TDefinitions`, `TRepositories`, `TOptions`\>(`database`, `items`, `definitions`, `relations?`, `options?`, `fetchOptions?`): [`BaseUseApiResult`](../interfaces/BaseUseApiResult.md)\<[`ResolvedRelations`](../interfaces/ResolvedRelations.md)\<`TModel`, `TDefinitions`, `TRepositories`, `TOptions` *extends* `object` ? `true` : `false`\>[]\>

Defined in: [src/adm/composables/api.ts:227](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/api.ts#L227)

Fetches relations for one or more model instances.

The result preserves the ResolvedRelations structure, keeping each source
item associated with its resolved relations.

## Type Parameters

### TModel

`TModel` *extends* [`Model`](../classes/Model.md)

Source model type.

### TDefinitions

`TDefinitions` *extends* [`RelationDefinitions`](../type-aliases/RelationDefinitions.md)

Relation definitions.

### TRepositories

`TRepositories` *extends* [`Repositories`](../type-aliases/Repositories.md)

Database repository collection type.

### TOptions

`TOptions` *extends* [`ApiOptions`](../interfaces/ApiOptions.md) = [`ApiOptions`](../interfaces/ApiOptions.md)

API options type.

## Parameters

### database

[`Database`](../classes/Database.md)\<`TRepositories`\>

Database used to resolve the relations.

### items

`MaybeRefOrGetter`\<`Iterable`\<`TModel`, `any`, `any`\>\>

Reactive or static source items.

### definitions

`TDefinitions`

Relation definitions associated with the source model.

### relations?

(keyof `TDefinitions`)[]

Relations to resolve. Defaults to all defined relations.

### options?

`MaybeRefOrGetter`\<`TOptions`\>

Reactive or static API options.

### fetchOptions?

[`UseFetchOptions`](../interfaces/UseFetchOptions.md) = `{}`

Automatic execution configuration.

## Returns

[`BaseUseApiResult`](../interfaces/BaseUseApiResult.md)\<[`ResolvedRelations`](../interfaces/ResolvedRelations.md)\<`TModel`, `TDefinitions`, `TRepositories`, `TOptions` *extends* `object` ? `true` : `false`\>[]\>

Reactive relation-fetching state.
