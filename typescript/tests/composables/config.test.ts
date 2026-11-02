// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from 'vitest';
import { createApp, defineComponent, h } from 'vue';

import { configKey, provideConfig, useConfig } from '@/composables';
import type { Config } from '@/config';
import { Repository, type Model } from '@/adm'

import { withNestedSetup } from './fixtures';

/**
 * Removes the DOM configuration fixture.
 */
function removeDomConfig(): void {
    document.getElementById('test-config')?.remove();
}


function testUseConfig(
    config?: Config,
    appConfig?: Config,
    el?: string,
) {
    return withNestedSetup(
        () => useConfig(),
        () => config && provideConfig(config, el),
        (app) => appConfig && app.provide(configKey, appConfig)
    )
}


class ParentRepository<TModel extends Model> extends Repository<TModel, any, any> {}
class LocalRepository<TModel extends Model> extends Repository<TModel, any, any> {}


afterEach(() => {
    removeDomConfig();
});

describe('provideConfig', () => {
    it('provides the explicit configuration', () => {
        const config: Config = {
            api: { baseUrl: '/api/', },
        };
        const result = testUseConfig(config)
        expect(result).toEqual(config);
    });

    it('returns an empty configuration when no configuration is provided', () => {
        const result = testUseConfig()
        expect(result).toEqual({});
    });

    it('inherits the parent configuration', () => {
        const parentConfig: Config = {
            api: { baseUrl: '/api/', },
            repositoryClass: ParentRepository,
        };

        const result = testUseConfig(parentConfig)
        expect(result).toEqual(parentConfig);
    });

    it('merges the explicit configuration over the parent configuration', () => {
        const parentConfig: Config = {
            api: { baseUrl: '/api/', },
            repositoryClass: ParentRepository,
        };
        const localRepositoryClass = LocalRepository;

        const result = testUseConfig(
            { repositoryClass: localRepositoryClass, },
            parentConfig
        );
        expect(result?.api).toEqual(parentConfig.api);
        expect(result?.repositoryClass).toBe(localRepositoryClass);
    });

    it('loads configuration from a JSON script element', () => {
        const script = document.createElement('script');
        script.id = 'test-config';
        script.type = 'application/json';
        script.textContent = JSON.stringify({
            api: { baseUrl: '/api/', },
        });

        document.body.appendChild(script);

        const result = testUseConfig( {}, undefined, 'test-config', );
        expect(result?.api).toEqual({
            baseUrl: '/api/',
        });
    });

    it('merges parent, DOM and explicit configurations in the expected order', () => {
        const script = document.createElement('script');
        script.id = 'test-config';
        script.type = 'application/json';
        script.textContent = JSON.stringify({
            api: { baseUrl: '/dom-api/', },
            repositoryClass: class DomRepository {},
        });

        document.body.appendChild(script);

        const parentRepositoryClass = ParentRepository;
        const localRepositoryClass = LocalRepository;

        const parentConfig: Config = {
            api: { baseUrl: '/parent-api/', },
            repositoryClass: parentRepositoryClass,
        };

        const result = testUseConfig(
            { repositoryClass: localRepositoryClass, },
            parentConfig,
            'test-config'
        )
        expect(result?.api).toEqual({ baseUrl: '/dom-api/', });
        expect(result?.repositoryClass).toBe(localRepositoryClass);
    });

    it('throws when the DOM element is not a JSON script', () => {
        const element = document.createElement('div');
        element.id = 'test-config';
        document.body.appendChild(element);

        expect(() => withNestedSetup(
            null,
            () => provideConfig({}, 'test-config'))
        ).toThrow(TypeError);
    });

    it('throws when the DOM configuration contains invalid JSON', () => {
        const script = document.createElement('script');
        script.id = 'test-config';
        script.type = 'application/json';
        script.textContent = '{ invalid json }';

        document.body.appendChild(script);

        expect(() => withNestedSetup(
            null,
            () => provideConfig({}, 'test-config'))
        ).toThrow(SyntaxError);
    });

    it('ignores a missing DOM element', () => {
        const result = withNestedSetup(
            useConfig,
            () => provideConfig({}, 'missing-config')
        );
        expect(result).toEqual({});
    });
});

describe('useConfig', () => {
    it('returns an empty configuration when no provider exists', () => {
        const result = testUseConfig();

        expect(result).toEqual({});
    });

    it('returns the configuration provided by an ancestor', () => {
        const config: Config = {
            api: {
                baseUrl: '/api/',
            },
        };
        const result = testUseConfig(config);
        expect(result).toEqual(config);
    });
});
