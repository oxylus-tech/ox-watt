[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / useDb

# Function: useDb()

> **useDb**\<`TDefinitions`\>(`definitions`, `options?`): `object`

Defined in: [src/adm/composables/repos.ts:127](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/composables/repos.ts#L127)

Creates a reactive database from model classes and/or repositories.

## Type Parameters

### TDefinitions

`TDefinitions` *extends* [`RepositoryDefinitionsInput`](../type-aliases/RepositoryDefinitionsInput.md)

## Parameters

### definitions

`TDefinitions`

### options?

[`UseDbOptions`](../interfaces/UseDbOptions.md) = `{}`

## Returns

`object`

Reactive database.

### db

> **db**: [`Database`](../classes/Database.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>\> = `database`

### repositories

> **repositories**: [`ReactiveDbRepositories`](../type-aliases/ReactiveDbRepositories.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>, [`Database`](../classes/Database.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>\>\>

### fetchRelation()

> **fetchRelation**\<`TRepository`, `TRelation`, `TOptions`\>(`repository`, `item`, `relation`, `options?`): `Promise`\<[`ResolvedRelations`](../interfaces/ResolvedRelations.md)\<[`Model`](../classes/Model.md), [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<`any`\[`any`\]\>, [`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>, `TOptions` *extends* `object` ? `true` : `false`\>\>

#### Type Parameters

##### TRepository

`TRepository` *extends* `string` \| `number` \| `symbol`

##### TRelation

`TRelation` *extends* `string` \| `number` \| `symbol`

##### TOptions

`TOptions` *extends* [`ApiOptions`](../interfaces/ApiOptions.md) = [`ApiOptions`](../interfaces/ApiOptions.md)

#### Parameters

##### repository

`TRepository`

##### item

[`RepositoryModel`](../type-aliases/RepositoryModel.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>\[`TRepository`\]\>

##### relation

`TRelation`

##### options?

`TOptions`

#### Returns

`Promise`\<[`ResolvedRelations`](../interfaces/ResolvedRelations.md)\<[`Model`](../classes/Model.md), [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<`any`\[`any`\]\>, [`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>, `TOptions` *extends* `object` ? `true` : `false`\>\>

### fetchRelations()

> **fetchRelations**\<`TRepository`, `TRelation`, `TOptions`\>(`repository`, `items`, `relations?`, `options?`): `Promise`\<[`ResolvedRelations`](../interfaces/ResolvedRelations.md)\<[`Model`](../classes/Model.md), [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<`any`\[`any`\]\>, [`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>, `TOptions` *extends* `object` ? `true` : `false`\>[]\>

#### Type Parameters

##### TRepository

`TRepository` *extends* `string` \| `number` \| `symbol`

##### TRelation

`TRelation` *extends* `string` \| `number` \| `symbol`

##### TOptions

`TOptions` *extends* [`ApiOptions`](../interfaces/ApiOptions.md) = [`ApiOptions`](../interfaces/ApiOptions.md)

#### Parameters

##### repository

`TRepository`

##### items

`Iterable`\<[`RepositoryModel`](../type-aliases/RepositoryModel.md)\<[`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>\[`TRepository`\]\>\>

##### relations?

`TRelation`[]

##### options?

`TOptions`

#### Returns

`Promise`\<[`ResolvedRelations`](../interfaces/ResolvedRelations.md)\<[`Model`](../classes/Model.md), [`RepositoryRelations`](../type-aliases/RepositoryRelations.md)\<`any`\[`any`\]\>, [`RepositoriesFrom`](../type-aliases/RepositoriesFrom.md)\<`TDefinitions`\>, `TOptions` *extends* `object` ? `true` : `false`\>[]\>
