import { type ShallowRef } from 'vue'

import type { KeySource } from '@/utils'
import type { Schema } from './schema'
import type { Model, ModelClass, ModelStore, ModelDeserializeOptions } from './model'
import type { Repository } from './repository'


// ---- Request
export interface BaseApiRequest {
    /**
     * Resource path; `{id}` placeholders are substituted from path parameters}
     */
    path?: string;
    /** Default headers sent with requests. */
    headers?: Record<string, string>;
    /** Query-string parameters. */
    params?: Record<string, unknown>;
    /** Optional dot-separated path to the payload in a response envelope. */
    dataKey?: string;
    /** Metadata configuration. **/
    metadata?: MetadataConfig
    /** Parameter name used for query with a list of ids. **/
    ids_lookup?: string
    /** Model deserialization options. **/
    deserialize?: ModelDeserializeOptions
}

export interface ApiRequest extends BaseApiRequest {
    /** Request payload. */
    data?: Record<string, unknown>|Model;
}

/**
 * Describe one endpoint used for API operations.
 */
export interface RawApiEndpoint extends BaseApiRequest {
    /** Schema name used to validate the extracted response payload. */
    responseSchema?: string | typeof Schema;
}

/**
 * Describe one endpoint used for API operations, with resolved Schema
 */
export interface ApiEndpoint extends Omit<RawApiEndpoint, "responseSchema"> {
    responseSchema?: typeof Schema;
}

/**
 * Configuration of API endpoints.
 *
 * Values may be relative paths or absolute URLs.
 */
export interface ApiEndpoints {
    [key: string]: ApiEndpoint | undefined
    
    /** Endpoint used to retrieve a collection. */
    list?: ApiEndpoint

    /** Endpoint used to retrieve one resource. */
    detail?: ApiEndpoint

    /** Endpoint used to create a resource. */
    create?: ApiEndpoint

    /** Endpoint used to update a resource. */
    update?: ApiEndpoint

    /** Endpoint used to delete a resource. */
    delete?: ApiEndpoint

}

/**
 * Options shared by API operations.
 */
export interface ApiOptions extends Omit<ApiRequest, "path"> {
    // TODO: real option sub-type support on ApiClient
    [key: string]: unknown;
    
    /** Object id **/
    id?: unknown;

    /** Optional resource path, defaults to provided endpoint one. **/
    path?: string;
    
    /** Explicit endpoint path overriding configured endpoints. */
    endpoint?: string;

    /** Save changes on the store. **/
    save?: boolean;

    // shall move later on ApiOptions
    ids?: Iterable<unknown>;
}



/**
 * Maps internal metadata to response path.
 * 
 * This allows the ApiClient to extract metadata as pagination, etc.
 */
export interface MetadataConfig {
    [key: string]: string|undefined;
    /**
     * Path to the collection of items in the response.
     * The path is related to the root object returned by the server. 
     */
    dataKey?: string;
}

export type Metadata = Record<string, unknown>;


// ---- Result
/**
 * Normalized result returned by an API operation.
 */
export interface ApiResult<TModel extends Model = Model, TRequest = ApiRequest, TResponse = unknown> {
    /** Whether the request was a success. **/
    ok: boolean;

    /** Resulting items. */
    items?: TModel[] | ShallowRef<TModel>[] | null;
    
    /** Response data. */
    data: unknown;

    /** Request that produced this result, when available. */
    request?: TRequest;

    /** Raw response object **/
    response?: TResponse;

    /** Extracted metadata from the response **/
    metadata?: Metadata
}


// ---- Client
/**
 * Configuration shared by API clients or overridden by a repository.
 */
export interface ApiConfig {
    /** Base URL used to resolve relative endpoint paths. */
    baseUrl?: string;
    /** Endpoint paths indexed by conventional operation name. */
    endpoints?: ApiEndpoints;
    /** Headers sent with requests. */
    headers?: Record<string, string>;
    /** Params sent with requests. */
    params?: Record<string, unknown>;
    /** MetadataConfig **/
    metadata?: MetadataConfig;
    /** Parameter name used for query with a list of ids. **/
    ids_lookup?: string
}

/**
 * Public contract for an API client used by repositories.
 */
export interface IApiClient<
    TModel extends Model = Model,
    TRequest = ApiRequest,
    TResponse = unknown,
    TOptions extends ApiOptions = ApiOptions
>
{
    /** Retrieves one resource. */
    get( id: unknown, options?: ApiOptions): Promise<ApiResult<TModel, TRequest, TResponse> | null>;

    /** Retrieves a collection. */
    list( options?: ApiOptions): Promise<ApiResult<TModel, TRequest, TResponse> | null>;

    /** Similar to Store.getBy but to fetch items from the server. */
    fetchBy<TSource>(
        sources: Iterable<TSource>,
        key: KeySource<TSource, unknown>,
        options?: ApiOptions
    ): Promise<ApiResult<TModel, TRequest, TResponse>|null>;

    /** Creates a resource. */
    create( data: TModel | Record<string, unknown>, options?: ApiOptions): Promise<ApiResult<TModel, TRequest, TResponse> | null>;

    /** Updates a resource. */
    update( id: unknown, data: TModel | Record<string, unknown>, options?: ApiOptions): Promise<ApiResult<TModel, TRequest, TResponse> | null>;

    /** Deletes a resource. */
    delete( id: unknown, options?: ApiOptions): Promise<ApiResult<TModel, TRequest, TResponse> | null>;

    /** Make a request. **/
    request(action: string, options?: ApiOptions): Promise<ApiResult<TModel, TRequest, TResponse> | null>;
}


/**
 * API client constructor class.
 *
 * The same API client class can be instantiated for different models.
 */
export interface ApiClientClass<
    TRequest extends ApiRequest = ApiRequest,
    TResponse extends object = object,
    TOptions extends ApiOptions = ApiOptions,
> {
    new <TModel extends Model>(
        model: ModelClass<TModel>,
        config: ApiConfig,
        store: ModelStore<TModel> | null,
    ): IApiClient<TModel, TRequest, TResponse, TOptions>;
}

/**
 * Extracts the request type from an API client.
 */
export type ApiRequestOf<TApi> =
    TApi extends IApiClient<any, infer TRequest, any, any>
        ? TRequest
        : never;

/**
 * Extracts the response type from an API client.
 */
export type ApiResponseOf<TApi> =
    TApi extends IApiClient<any, any, infer TResponse, any>
        ? TResponse
        : never;

/**
 * Extracts the options type from an API client.
 */
export type ApiOptionsOf<TApi> =
    TApi extends IApiClient<any, any, any, infer TOptions>
        ? TOptions
        : never;


// ---- HTTP
/**
 * HTTP methods supported by the default API client.
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface BaseHttpRequest extends BaseApiRequest {
    /** Method used for the request. */
    method?: HttpMethod;


    /** Additional request headers. */
    headers?: Record<string, string>;
}

/**
 * Describes an HTTP request independently of its transport implementation.
 */
export interface HttpRequest extends ApiRequest, BaseHttpRequest {
}

export interface HttpEndpoint extends ApiEndpoint, BaseHttpRequest {}
export interface HttpOptions extends ApiOptions, Omit<HttpRequest, "path"> { }
