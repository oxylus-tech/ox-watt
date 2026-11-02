import type { ApiClientClass, ApiConfig } from './adm/api.types';
import type { RepositoryClass, RepositoryConfig } from './adm/repository';

/**
 * Global Ox-Watt configuration.
 *
 * The interface is intentionally extensible to allow additional packages
 * to introduce their own configuration properties.
 */
export interface Config {
    [key: string]: unknown;

    /** Default repository configuration. */
    repository?: RepositoryConfig;

    /** Default repository implementation. */
    repositoryClass?: RepositoryClass;

    /** Default API client implementation. */
    apiClass?: ApiClientClass;
}
