import { ApiClient } from '@/adm'
import type { Model, ApiRequest, ApiOptions, ApiConfig } from '@/adm'

export interface FakeResponse extends Record<string, unknown> {
    status: number
    data: unknown
}

export class FakeApiClient<
    TModel extends Model = Model
> extends ApiClient<TModel, ApiRequest, FakeResponse> {
    readonly requests: ApiRequest[] = []
    response: FakeResponse = {
        status: 200,
        data: { id: 1, name: 'Alice' },
    }

    protected getRequest(action: string, options: ApiOptions): ApiRequest {
        const request: ApiRequest = super.getRequest(action, options)
        this.requests.push(request)
        return request
    }

    protected async execute(): Promise<FakeResponse> {
        return this.response
    }

    protected async getResultData(
        _options: ApiOptions,
        response: FakeResponse,
    ): Promise<Record<string, unknown> | Record<string, unknown>[] | null> {
        const data = response.data
        if (Array.isArray(data))
            return data as Record<string, unknown>[]
        if (data !== null && typeof data === 'object')
            return data as Record<string, unknown>
        return null
    }

    protected getIsOk(response: FakeResponse): boolean {
        return response.status >= 200 && response.status < 300
    }
}


export function jsonResponse(
    data: unknown,
    status = 200,
): Response {
    return new Response(
        data === undefined ? null : JSON.stringify(data),
        {
            status,
            headers: { 'Content-Type': 'application/json' },
        },
    )
}

export const config = {
    baseUrl: 'https://api.example.test/',
    headers: {
        Authorization: 'Bearer default',
        'X-Default': 'default',
    },
}

export const baseConfigs = {
    Article: {
        endpoints: {
            list: { path: 'articles' },
            get: { path: 'articles/{id}' },
            create: { path: 'articles' },
            update: { path: 'articles/{id}' },
            delete: { path: 'articles/{id}' },
        },
    },
    User: {
        endpoints: {
            list: { path: 'users' },
            get: { path: 'users/{id}' },
            create: { path: 'users' },
            update: { path: 'users/{id}' },
            delete: { path: 'users/{id}' },
        },
    },
}

export const configs = {
    Article: { ...config, ...baseConfigs.Article },
    User: { ...config, ...baseConfigs.User },
}

