import type { MaybeRef } from 'vue'
import { setBaseUrl, resolvePath, getKeysBy, type KeySource } from '@/utils'

import type { Model, ModelClass, ModelDeserializeOptions, ModelStore } from './model'
import type {
    ApiEndpoint, ApiEndpoints,
    ApiRequest, ApiResult, ApiOptions,
    IApiClient, ApiConfig, Metadata,
    HttpOptions, HttpRequest, HttpMethod
} from './api.types'


export function mergeApiConfig(base?: ApiConfig, override?: ApiConfig): ApiConfig {
    return {
        ...base,
        ...override,
        baseUrl: setBaseUrl(base?.baseUrl, override?.baseUrl),
        params: {
            ...base?.params,
            ...override?.params,
        },
        headers: {
            ...base?.headers,
            ...override?.headers,
        }
    }
}


/**
 * Base class for model-aware API clients.
 *
 * Subclasses implement transport-specific request execution while this class
 * handles endpoint selection, payload serialization and model deserialization.
 */
export abstract class ApiClient<
        TModel extends Model = Model,
        TRequest extends ApiRequest = ApiRequest,
        TResponse extends object = object,
        TOptions extends ApiOptions = ApiOptions
    > implements IApiClient<TModel, TRequest, TResponse, TOptions>
{
    /**
     * Creates a model-aware API client.
     *
     * @param model Model class used to deserialize API responses.
     * @param endpoints Endpoint definitions for this model.
     */
    constructor(
        protected readonly model: ModelClass<TModel>,
        protected readonly config: ApiConfig = {},
        protected readonly store: ModelStore<TModel>|null = null,
    ) {}

    get endpoints(): ApiEndpoints|null { return this.config?.endpoints ?? null }


    /** Retrieve a single item using API. **/
    async get(id: unknown, options?: TOptions): Promise<ApiResult<TModel, TRequest, TResponse>|null> {
        options = { ...options, id } as TOptions

        const result = await this.request("get", options)
        this.applyRetrieveOptions(options, result)
        return result
    }

    /** Retrieves a collection using API. */
    async list(options?: TOptions): Promise<ApiResult<TModel, TRequest, TResponse>|null> {
        const result = await this.request("list", options)
        this.applyRetrieveOptions(options || {} as TOptions, result)
        return result
    }

    /**
     * Similar to Store.getBy, but that fetches from the server instead.
     */
    async fetchBy<TSource>(
        sources: Iterable<MaybeRef<TSource>>,
        key: KeySource<TSource, unknown>,
        options?: TOptions
    ): Promise<ApiResult<TModel, TRequest, TResponse>|null> {
        const ids = getKeysBy(sources, key) 
        // FIXME
        return await this.list({...options, ids } as unknown as TOptions)
    }

    /** Creates a model through the API. */
    async create(data: TModel | Record<string, unknown>, options?: TOptions): Promise<ApiResult<TModel, TRequest, TResponse>|null> {
        options = { ...options, data: this.serializeInput(data) } as TOptions
        
        const result = await this.request("create", options)
        this.applyRetrieveOptions(options, result)
        return result
    }

    /** Update a model on the server. **/
    async update(id: unknown, data: TModel | Record<string, unknown>, options?: TOptions): Promise<ApiResult<TModel, TRequest, TResponse>|null> {
        options = { ...options, id, data: this.serializeInput(data) } as TOptions

        const result = await this.request("update", options)
        this.applyRetrieveOptions(options, result)
        return result
    }

    protected applyRetrieveOptions(options: TOptions, result: ApiResult<TModel, TRequest, TResponse>|null) {
        if(result === null || !result.ok)
            return

        if(options.save && result.items && this.store)
            result.items = this.store.setMany(result.items as TModel[])
    }

    /**
     * Delete a model from the server
     *
     * When `options.save` is provided, delete object from the store on success.
     */
    async delete(id: unknown, options?: TOptions): Promise<ApiResult<TModel, TRequest, TResponse>|null> {
        options = {...options, id} as TOptions

        const result = await this.request("delete", options)
        if(result?.ok && options.save)
            this.store?.delete(options.id)
        return result
    }

    /**
     * Execute an operation and return the normalized result.
     */
    async request(action: string, options?: TOptions): Promise<ApiResult<TModel, TRequest, TResponse>|null> {
        options = options ?? {} as TOptions
        
        const request = this.getRequest(action, options)
        const response = await this.execute(request)
        if(!response)
            return null
        return await this.getResult(request, response)
    }

    /**
     * Return the ApiRequest object used by the `execute` method.
     * 
     * @param action: the name of the current action (list, detail, etc.)
     * @param options: user options provided by user.
     * @return the request to pass down to `execute` method.
     */
    protected getRequest(action: string, options: TOptions): TRequest {
        const endpointKey = options.endpoint || action
        const endpoint = endpointKey ? this.endpoints?.[endpointKey] : undefined

        // Substitute path parameters such as {id}.
        // Params will be removed from the request's ones.
        const params = this.mergeOption("params", options, endpoint)
        const path = (options.path ?? endpoint?.path)?.replace(
            /\{([^}]+)\}/g,
            (placeholder, key: string) => {
                const value =
                    key === 'id' && options.id !== undefined
                        ? options.id
                        : params[key];

                if (value === undefined || value === null) {
                    throw new Error(
                        `Missing path parameter "${key}" for "${options.path}".`,
                    );
                }

                delete params[key];
                return encodeURIComponent(String(value));
            },
        );

        if(!path)
            throw new Error(`Missing API path for operation "${action}"`)

        const idsLookup = this.mergeValue<string>("ids_lookup", options, endpoint);
        const ids = 'ids' in options && options.ids !== undefined
            ? Array.from(options.ids ?? [])
            : undefined;

        if (ids?.length && idsLookup)
            params[idsLookup] = [...ids].join(",");

        return {
            path,
            params,
            dataKey: options.dataKey ?? endpoint?.dataKey,
            data: options.data,
            deserialize: this.mergeValue("deserialize", options, endpoint),
            headers: this.mergeOption("headers", options, endpoint),
            metadata: this.mergeOption("metadata", options, endpoint),
        } as TRequest;
    }

    /**
     * Merge options from endpoint, config and api option.
     * 
     * Currently only for objects.
     */
    protected mergeOption( attr: string, options: TOptions, endpoint?: ApiEndpoint | null ): Record<string, string> {
        const getAttr = (source: object | null | undefined): Record<string, string> => {
            const value = (source as Record<string, unknown> | undefined)?.[attr]
            return value && typeof value === "object" && !Array.isArray(value)
                ? value as Record<string, string>
                : {}
        }

        return {
            ...getAttr(this.config),
            ...getAttr(endpoint),
            ...getAttr(options),
        }
    }

    /** Return value from either option, endpoint or config. **/
    protected mergeValue<T>(
        attr: string,
        options: TOptions,
        endpoint?: ApiEndpoint | null,
    ): T | undefined {
        const optionValue = (options as Record<string, unknown>)[attr];
        const endpointValue = (endpoint as unknown as Record<string, unknown> | undefined)?.[attr];
        const configValue = (this.config as Record<string, unknown>)[attr];

        return (optionValue ?? endpointValue ?? configValue) as T | undefined;
    }

    /**
     * From the provided request, actually call remote server and return a response. 
     */
    protected abstract execute(request: TRequest): Promise<TResponse>;

    /**
     * From the provided execute response, return its payload object.
     */
    protected abstract getResultData(request: ApiRequest, response: TResponse): 
        Promise<Record<string, unknown>|Record<string, unknown>[]|null>;

    /**
     * Return True if response is a successfull one (set on result.ok).
     */
    protected abstract getIsOk(response: TResponse): boolean;

    /**
     * From the provided response, return a normalized ApiResult
     */
    protected async getResult(request: TRequest, response: TResponse): Promise<ApiResult<TModel, TRequest, TResponse>> {
        const data = await this.getResultData(request, response)

        let payload: unknown = data
        if(data !== null && !Array.isArray(data) && request.dataKey)
            payload = resolvePath(data, request.dataKey)

        let ok = this.getIsOk(response)
        let items = null
        if(data !== null && ok) {
            if(Array.isArray(payload))
                items = payload.map(
                    (item) => this.deserialize(item, request.deserialize || {})
                )
            else if(typeof payload === "object")
                items = [this.deserialize(payload, request.deserialize || {})]
        }

        const metadata = this.getMetadata(request, data)

        return { request, response, ok, items, data, metadata }
    }

    /**
     * Extract metadata from the response's data, using config specified as options.
     */
    protected getMetadata(request: ApiRequest, data: unknown): Metadata|undefined {
        if(typeof data !== "object" || data === null || Array.isArray(data))
            return

        const {dataKey, ...config} = request.metadata ?? {}
        const entries = Object.entries(config)
        if(!entries?.length)
            return
        
        const payload = resolvePath(data, dataKey)
        const metadata: Metadata = {}
        for(const [key, path] of entries) {
            const value = resolvePath(payload, path)
            if(value !== undefined)
                metadata[key] = value
        }
        return metadata
    }

    /**
     * Serializes model input when it is an instance of the configured model class.
     *
     * @param data Input model or plain object.
     * @param fields Optional field selection.
     * @returns Data ready to send to the API.
     */
    protected serializeInput(data: Model | Record<string, unknown>): Record<string, unknown> {
        if (data instanceof this.model)
            return (data as Model).serialize();
        return data as Record<string, unknown>;
    }

    /**
     * Deserializes API data into a model instance.
     *
     * @param input Raw API data.
     * @param partial Whether partial model data is allowed.
     * @returns The deserialized model.
     */
    protected deserialize(input: unknown, options: ModelDeserializeOptions): TModel {
        return this.model.deserialize(input, options) as TModel;
    }
}


export class HttpClient<
    TModel extends Model = Model,
    TRequest extends HttpRequest = HttpRequest,
    TOptions extends HttpOptions = HttpOptions
 >
    extends ApiClient<TModel, TRequest, Response, TOptions>
{
    /**
     * Build an HTTP request from an operation and its options.
     */
    protected getRequest(action: string, options: TOptions): TRequest {
        const httpOptions = options as HttpOptions;
        const request = super.getRequest(action, options)
        if (!request.path)
            throw new Error(`Missing API path for operation "${action}".`);

        return {
            ...request,
            method: httpOptions.method ?? this.getDefaultMethod(action),
            headers: {
                // Set default content-type.
                "Content-Type": "application/json",
                ...request.headers,
            }
        }
    }

    /**
     * Execute the HTTP request using fetch().
     */
    protected async execute(request: TRequest): Promise<Response> {
        if(!request.path)
            throw new Error(`Missing request path.`)
        const url = this.buildUrl(request.path, request.params);
        const headers = { ...request.headers };
        const method = request.method!.toUpperCase();

        const hasBody =
            request.data !== undefined &&
            method !== 'GET' && method !== 'HEAD';

        let body: string | undefined;

        if (hasBody) {
            const data = request.data instanceof this.model
                ? this.serializeInput(request.data)
                : request.data;

            body = JSON.stringify(data);

            if (
                !Object.keys(headers).some(
                    (key) => key.toLowerCase() === 'content-type',
                )
            )
                headers['Content-Type'] = 'application/json';
        }

        return fetch(url, {
            method,
            headers,
            ...(body !== undefined ? { body } : {}),
        });
    }

    /**
     * Extract JSON data from the HTTP response.
     */
    protected async getResultData(_options: TOptions, response: Response ):
        Promise< Record<string, unknown> | Record<string, unknown>[] | null >
    {
        if (response.status === 204)
            return null;

        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json'))
            return null;

        const data: unknown = await response.json();
        if (Array.isArray(data))
            return data as Record<string, unknown>[];

        if (data !== null && typeof data === 'object')
            return data as Record<string, unknown>;
        return null;
    }

    /**
     * Determine whether the HTTP response indicates success.
     */
    protected getIsOk(response: Response): boolean {
        return response.ok;
    }

    /**
     * Resolve the URL and append query-string parameters.
     */
    protected buildUrl( path: string, params?: Record<string, unknown> ): string {
        const baseUrl = this.config.baseUrl;
        const isAbsolute = /^[a-z][a-z\d+\-.]*:/i.test(path);
        const query = new URLSearchParams();

        for (const [key, value] of Object.entries(params ?? {})) {
            if (value === undefined || value === null)
                continue;

            if (Array.isArray(value))
                for (const item of value)
                    query.append(key, String(item));
            else if (typeof value === 'object')
                query.set(key, JSON.stringify(value));
            else
                query.set(key, String(value));
        }

        if (baseUrl || isAbsolute) {
            const url = new URL(path, baseUrl);
            query.forEach((value, key) => {
                url.searchParams.append(key, value);
            });

            return url.toString();
        }

        if (query.size === 0)
            return path;

        const hashIndex = path.indexOf('#');
        const hash = hashIndex >= 0 ? path.slice(hashIndex) : '';
        const pathWithoutHash =
            hashIndex >= 0 ? path.slice(0, hashIndex) : path;

        const separator = pathWithoutHash.includes('?') ? '&' : '?';

        return `${pathWithoutHash}${separator}${query.toString()}${hash}`;
    }

    /**
     * Return the default HTTP method for an operation.
     */
    protected getDefaultMethod(action: string): HttpMethod {
        switch (action) {
            case 'list': case 'get': return 'GET';
            case 'create': return 'POST';
            case 'update': return 'PATCH';
            case 'delete': return 'DELETE';
            default:
                throw new Error(
                    `Unsupported API operation "${action}".`,
                );
        }
    }
}
