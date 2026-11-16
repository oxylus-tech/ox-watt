import { inject, provide } from 'vue';
import type { InjectionKey } from 'vue';

import type { Config } from '../config';


/** Injection key for the Ox-Watt configuration. */
export const configKey: InjectionKey<Config> = Symbol('ox-watt-config');


/**
 * Loads a JSON configuration from a script element.
 *
 * @param elementId ID of the script element.
 * @returns Parsed configuration, or an empty object if the element is absent.
 * @throws SyntaxError If the script content is not valid JSON.
 * @throws TypeError If the element is not a JSON script.
 */
function loadDomConfig(elementId?: string): Partial<Config> {
    if (!elementId || typeof document === 'undefined')
        return {};

    const element = document.getElementById(elementId);

    if (!element)
        return {};

    if (element.tagName !== 'SCRIPT' || element.getAttribute('type') !== 'application/json')
        throw new TypeError(`Element "${elementId}" must be a script with type="application/json".`);

    return JSON.parse(element.textContent || '{}');
}

/**
 * Provides the Ox-Watt configuration to descendant components.
 *
 * Configuration precedence:
 * 1. Parent configuration.
 * 2. DOM JSON configuration.
 * 3. Explicit configuration.
 *
 * @param config Explicit runtime configuration.
 * @param elementId Optional ID of a JSON script element.
 * @returns The merged configuration.
 */
export function provideConfig(
    config: Config = {},
    elementId?: string,
): Config {
    const parent = inject(configKey, {});
    const domConfig = loadDomConfig(elementId);

    const result: Config = {
        ...parent,
        ...domConfig,
        ...config,
    };

    provide(configKey, result);

    return result;
}

/**
 * Retrieves the Ox-Watt configuration from the closest provider.
 *
 * @returns The injected configuration, or an empty configuration if absent.
 */
export function useConfig(): Config {
    return inject(configKey, {});
}
