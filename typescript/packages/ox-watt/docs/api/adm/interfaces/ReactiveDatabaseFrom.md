[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / ReactiveDatabaseFrom

# Interface: ReactiveDatabaseFrom\<TDefinitions\>

Defined in: [src/adm/composables/types.ts:181](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L181)

Return type of useDb for a given set of repository definitions.

## Type Parameters

### TDefinitions

`TDefinitions` *extends* [`RepositoryDefinitionsInput`](../type-aliases/RepositoryDefinitionsInput.md)

## Properties

### db

> **db**: [`Database`](../classes/Database.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>\>

Defined in: [src/adm/composables/types.ts:185](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L185)

Underlying database instance.

***

### repositories

> **repositories**: [`ReactiveDbRepositories`](../type-aliases/ReactiveDbRepositories.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>, [`Database`](../classes/Database.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>\>\>

Defined in: [src/adm/composables/types.ts:188](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L188)

Reactive database repositories.

## Methods

### fetchRelation()

> **fetchRelation**\<`TRepository`, `TRelation`, `TOptions`\>(`repository`, `item`, `relation`, `options?`): `Promise`\<[`ResolvedRelations`](ResolvedRelations.md)\<[`RepositoryModel`](../type-aliases/RepositoryModel.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>\[`TRepository`\]\>, [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>\[`TRepository`\]\>, [`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>, `TOptions` *extends* `object` ? `true` : `false`\>\>

Defined in: [src/adm/composables/types.ts:202](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L202)

Fetches one relation for a model instance from a repository.

#### Type Parameters

##### TRepository

`TRepository` *extends* `string` \| `number` \| `symbol`

##### TRelation

`TRelation` *extends* `string` \| `number` \| `symbol`

##### TOptions

`TOptions` *extends* [`ApiOptions`](ApiOptions.md) = [`ApiOptions`](ApiOptions.md)

#### Parameters

##### repository

`TRepository`

Name of the source repository.

##### item

[`RepositoryModel`](../type-aliases/RepositoryModel.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>\[`TRepository`\]\>

Source model instance.

##### relation

`TRelation`

Name of the relation to fetch.

##### options?

`TOptions`

API request options.

#### Returns

`Promise`\<[`ResolvedRelations`](ResolvedRelations.md)\<[`RepositoryModel`](../type-aliases/RepositoryModel.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>\[`TRepository`\]\>, [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>\[`TRepository`\]\>, [`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>, `TOptions` *extends* `object` ? `true` : `false`\>\>

The source item together with its resolved relation.

***

### fetchRelations()

> **fetchRelations**\<`TRepository`, `TRelation`, `TOptions`\>(`repository`, `items`, `relations?`, `options?`): `Promise`\<[`ResolvedRelations`](ResolvedRelations.md)\<[`RepositoryModel`](../type-aliases/RepositoryModel.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>\[`TRepository`\]\>, [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>\[`TRepository`\]\>, [`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>, `TOptions` *extends* `object` ? `true` : `false`\>[]\>

Defined in: [src/adm/composables/types.ts:229](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/types.ts#L229)

Fetches relations for multiple model instances from a repository.

#### Type Parameters

##### TRepository

`TRepository` *extends* `string` \| `number` \| `symbol`

##### TRelation

`TRelation` *extends* `string` \| `number` \| `symbol`

##### TOptions

`TOptions` *extends* [`ApiOptions`](ApiOptions.md) = [`ApiOptions`](ApiOptions.md)

#### Parameters

##### repository

`TRepository`

Name of the source repository.

##### items

`Iterable`\<[`RepositoryModel`](../type-aliases/RepositoryModel.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>\[`TRepository`\]\>\>

Source model instances.

##### relations?

`TRelation`[]

Names of the relations to fetch. Defaults to all relations.

##### options?

`TOptions`

API request options.

#### Returns

`Promise`\<[`ResolvedRelations`](ResolvedRelations.md)\<[`RepositoryModel`](../type-aliases/RepositoryModel.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>\[`TRepository`\]\>, [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>\[`TRepository`\]\>, [`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>, `TOptions` *extends* `object` ? `true` : `false`\>[]\>

The source items together with their resolved relations.
