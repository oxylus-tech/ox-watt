[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / mergeRepositoryConfig

# Function: mergeRepositoryConfig()

> **mergeRepositoryConfig**(`base?`, `override?`): [`RepositoryConfig`](../interfaces/RepositoryConfig.md)

Defined in: [src/adm/repository.ts:120](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/repository.ts#L120)

Merges repository configurations.

The API configuration is merged separately using mergeApiConfig.
Repository-level options from the specific configuration take precedence.

## Parameters

### base?

[`RepositoryConfig`](../interfaces/RepositoryConfig.md) = `{}`

Base repository configuration.

### override?

[`RepositoryConfig`](../interfaces/RepositoryConfig.md) = `{}`

Repository-specific configuration.

## Returns

[`RepositoryConfig`](../interfaces/RepositoryConfig.md)

Merged repository configuration.
