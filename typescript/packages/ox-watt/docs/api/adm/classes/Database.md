[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / Database

# Class: Database\<TRepositories\>

Defined in: [src/adm/database.ts:21](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/database.ts#L21)

Central entrypoint owning multiple repositories.

## Type Parameters

### TRepositories

`TRepositories` *extends* [`Repositories`](../type-aliases/Repositories.md) = [`Repositories`](../type-aliases/Repositories.md)

## Constructors

### Constructor

> **new Database**\<`TRepositories`\>(`repositories?`, `config?`): `Database`\<`TRepositories`\>

Defined in: [src/adm/database.ts:26](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/database.ts#L26)

#### Parameters

##### repositories?

`TRepositories` = `...`

##### config?

[`DatabaseConfig`](../interfaces/DatabaseConfig.md) = `{}`

#### Returns

`Database`\<`TRepositories`\>

## Properties

### config

> `readonly` **config**: [`DatabaseConfig`](../interfaces/DatabaseConfig.md) = `{}`

Defined in: [src/adm/database.ts:28](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/database.ts#L28)

***

### repositories

> `readonly` **repositories**: `TRepositories`

Defined in: [src/adm/database.ts:24](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/database.ts#L24)

## Methods

### clear()

> **clear**(): `void`

Defined in: [src/adm/database.ts:48](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/database.ts#L48)

Clear all repositories data.

#### Returns

`void`

***

### fetchRelations()

> **fetchRelations**\<`TModel`, `TDefinitions`, `TOptions`\>(`items`, `definitions`, `relations?`, `options?`): `Promise`\<[`ResolvedRelations`](../interfaces/ResolvedRelations.md)\<`TModel`, `TDefinitions`, `TRepositories`, `TOptions` *extends* `object` ? `true` : `false`\>[]\>

Defined in: [src/adm/database.ts:135](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/database.ts#L135)

Fetches selected relations for multiple model instances.

#### Type Parameters

##### TModel

`TModel` *extends* [`Model`](Model.md)

##### TDefinitions

`TDefinitions` *extends* [`RelationDefinitions`](../type-aliases/RelationDefinitions.md)

##### TOptions

`TOptions` *extends* [`ApiOptions`](../interfaces/ApiOptions.md)

#### Parameters

##### items

`Iterable`\<`TModel`\>

Source model instances.

##### definitions

`TDefinitions`

Relation definitions available for fetching.

##### relations?

(keyof `TDefinitions`)[] = `...`

Names of the relations to fetch. Defaults to all relations.

##### options?

`TOptions`

Options forwarded to the repository API.

#### Returns

`Promise`\<[`ResolvedRelations`](../interfaces/ResolvedRelations.md)\<`TModel`, `TDefinitions`, `TRepositories`, `TOptions` *extends* `object` ? `true` : `false`\>[]\>

Source items together with their fetched relations.

***

### get()

> **get**\<`TKey`\>(`name`): `TRepositories`\[`TKey`\]

Defined in: [src/adm/database.ts:38](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/database.ts#L38)

Returns a repository by its registered name.

#### Type Parameters

##### TKey

`TKey` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### name

`TKey`

Repository identifier.

#### Returns

`TRepositories`\[`TKey`\]

***

### resolve()

> **resolve**\<`TModel`, `TDefinitions`\>(`item`, `definitions`, `relations?`): [`ResolvedRelations`](../interfaces/ResolvedRelations.md)\<`TModel`, `TDefinitions`, `TRepositories`\>

Defined in: [src/adm/database.ts:115](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/database.ts#L115)

Resolves selected relations for a single model instance.

#### Type Parameters

##### TModel

`TModel` *extends* [`Model`](Model.md)

##### TDefinitions

`TDefinitions` *extends* [`RelationDefinitions`](../type-aliases/RelationDefinitions.md)

#### Parameters

##### item

`TModel`

Source model instance.

##### definitions

`TDefinitions`

Relation definitions available for resolution.

##### relations?

(keyof `TDefinitions`)[]

Names of the relations to resolve. Defaults to all relations.

#### Returns

[`ResolvedRelations`](../interfaces/ResolvedRelations.md)\<`TModel`, `TDefinitions`, `TRepositories`\>

The source item together with its resolved relations.

***

### resolveMany()

> **resolveMany**\<`TModel`, `TDefinitions`\>(`items`, `definitions`, `relations?`): [`ResolvedRelations`](../interfaces/ResolvedRelations.md)\<`TModel`, `TDefinitions`, `TRepositories`, `true`\>[]

Defined in: [src/adm/database.ts:61](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/database.ts#L61)

Resolves selected relations for multiple model instances.

#### Type Parameters

##### TModel

`TModel` *extends* [`Model`](Model.md)

##### TDefinitions

`TDefinitions` *extends* [`RelationDefinitions`](../type-aliases/RelationDefinitions.md)

#### Parameters

##### items

`Iterable`\<`TModel`\>

Source model instances.

##### definitions

`TDefinitions`

Relation definitions available for resolution.

##### relations?

(keyof `TDefinitions`)[] = `...`

Names of the relations to resolve. Defaults to all relations.

#### Returns

[`ResolvedRelations`](../interfaces/ResolvedRelations.md)\<`TModel`, `TDefinitions`, `TRepositories`, `true`\>[]

Source items together with their resolved relations.
