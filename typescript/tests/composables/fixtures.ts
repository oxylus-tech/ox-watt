import { createApp, defineComponent, h } from 'vue';
import type { App } from 'vue';

import type { Config } from '@/config';
import { configKey, provideConfig } from '@/composables';

/**
 * Runs a callback inside a Vue setup context.
 *
 * @param callback Callback executed during component setup.
 * @param config Optional configuration provided at application level.
 * @returns The callback result.
 */
export function withSetup<T>(
    callback: () => T,
    config?: Config,
): T {
    let result!: T;

    const component = defineComponent({
        setup() {
            result = callback();
            return () => h('div');
        },
    });

    const app: App = createApp(component);

    if (config) {
        // The configuration is available to all components in this application.
        app.provide(configKey, config);
    }

    app.mount(document.createElement('div'));
    app.unmount();

    return result;
}


/**
 * Runs a callback inside a child component setup context.
 *
 * @param childSetup Setup callback executed by the child component.
 * @param appSetup Setup callback executed by the parent component.
 * @returns The child setup callback result.
 */
export function withNestedSetup<T>(
    childSetup: (() => T) | null,
    appSetup?: () => any,
    appInit?: (app: App) => any,
): T | undefined {
    let result!: T | undefined;

    const child = defineComponent({
        setup() {
            result = childSetup?.();
            return () => h('div');
        },
    });

    const parent = defineComponent({
        setup() {
            appSetup?.();
            return () => h(child);
        },
    });

    const app = createApp(parent);
    if(appInit)
        appInit(app)
    
    app.mount(document.createElement('div'));
    app.unmount();

    return result;
}
