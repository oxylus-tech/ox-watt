import { createI18n, type Composer } from 'vue-i18n';

import { detectLocale } from './locale';
import { getStaticLocaleResources, getDomLocaleResources, } from './resources';

import type { AppLocaleLoaders, LocaleMessages, LocaleResource, } from './types';

/**
 * I18n initialization options.
 */
export interface I18nOptions {
    /**
     * Locale used when a translation is missing.
     */
    fallbackLocale: string;

    /**
     * Explicit initial locale.
     *
     * When omitted, the locale is detected from the browser environment.
     */
    locale?: string;

    /**
     * Name of the cookie used to detect the initial locale.
     *
     * @default 'language'
     */
    cookieName?: string;
}

/**
 * Creates the Vue I18n instance in Composition API mode.
 *
 * Keeping this factory separate allows TypeScript to infer the Composer
 * instance type from the `legacy: false` option.
 *
 * @param locale Initial active locale.
 * @param fallbackLocale Fallback locale.
 * @returns Configured Vue I18n instance.
 */
function createVueI18n(locale: string, fallbackLocale: string) {
    return createI18n({
        legacy: false,
        locale,
        fallbackLocale,
        messages: {},
    });
}

/**
 * Vue I18n instance type.
 */
type VueI18nInstance = ReturnType<typeof createVueI18n>;

/**
 * Manages locale resources and the active Vue I18n locale.
 *
 * The manager does not persist locale preferences or modify browser state.
 */
export class I18nManager {
    /**
     * Registered locale loader groups.
     */
    private loaders: AppLocaleLoaders[] = [];

    /**
     * Currently active Vue I18n instance.
     */
    private instance?: VueI18nInstance;

    /**
     * Configured fallback locale.
     */
    private fallbackLocale?: string;

    /**
     * Sequence used to prevent outdated locale changes from being applied.
     */
    private localeRequestId = 0;

    /**
     * Loaded locale resources.
     */
    private localeLoads = new Map<string, Promise<void>>(); 

    /**
     * Returns the Vue I18n instance to install as a Vue plugin.
     *
     * @throws Error if the manager has not been initialized.
     */
    get plugin(): VueI18nInstance {
        return this.getInstance();
    }

    /**
     * Returns the currently active locale.
     *
     * @throws Error if the manager has not been initialized.
     */
    get locale(): string {
        return this.getInstance().global.locale.value;
    }

    /**
     * Returns the Vue I18n Composer.
     *
     * @throws Error if the manager has not been initialized.
     */
    get composer(): VueI18nInstance['global'] {
        return this.getInstance().global;
    }

    /**
     * Registers locale loader groups.
     *
     * Duplicate groups are ignored by reference.
     *
     * Registration must happen before initialization.
     *
     * @param loaders Locale loader groups to register.
     */
    register(loaders: AppLocaleLoaders[]): void {
        if (this.instance) {
            throw new Error('Locale loaders must be registered before initialization.');
        }

        for (const group of loaders) {
            if (!this.loaders.includes(group)) {
                this.loaders.push(group);
            }
        }
    }

    /**
     * Initializes Vue I18n and loads the initial locale resources.
     *
     * The fallback locale is loaded first, followed by the detected locale.
     * This ensures that the initial translations are available before the
     * application is mounted.
     *
     * @param options Initialization options.
     * @returns The initialized Vue I18n instance.
     */
    async initialize(options: I18nOptions): Promise<VueI18nInstance> {
        if (this.instance) {
            throw new Error('I18nManager has already been initialized.');
        }

        const fallbackLocale = normalizeLocale(options.fallbackLocale);
        const initialLocale = normalizeLocale(detectLocale({
            ...options,
            fallbackLocale,
        }));

        this.fallbackLocale = fallbackLocale;

        this.instance = createVueI18n(fallbackLocale, fallbackLocale);

        const fallbackLoad = this.loadLocale(fallbackLocale);

        if (initialLocale !== fallbackLocale)
            await Promise.all([
                this.loadLocale(initialLocale),
                fallbackLoad
            ])
        else
            await fallbackLoad

        this.instance.global.locale.value = initialLocale;

        return this.instance;
    }

    /**
     * Changes the active locale.
     *
     * The fallback and requested locale resources are loaded before changing
     * the active locale. This method does not modify cookies, browser storage,
     * or the document language attribute.
     *
     * @param locale Locale to activate.
     */
    async setLocale(locale: string): Promise<void> {
        const instance = this.getInstance();
        const normalizedLocale = normalizeLocale(locale);
        const requestId = ++this.localeRequestId;

        await this.loadLocale(this.fallbackLocale!);

        if (normalizedLocale !== this.fallbackLocale) {
            await this.loadLocale(normalizedLocale);
        }

        // Ignore outdated requests when multiple locale changes overlap.
        if (requestId !== this.localeRequestId) {
            return;
        }

        instance.global.locale.value = normalizedLocale;
    }

    /**
     * Loads and merges the resources for a locale.
     *
     * Concurrent requests for the same locale share the same loading promise.
     *
     * @param locale Locale whose resources should be loaded.
     */
    private loadLocale(locale: string): Promise<void> {
        const existingLoad = this.localeLoads.get(locale);
        if (existingLoad)
            return existingLoad;

        const load = this.loadLocaleResources(locale);
        this.localeLoads.set(locale, load);

        load.catch(() => {
            this.localeLoads.delete(locale);
        });

        return load;
    }

    /**
     * Loads and merges the resources for a locale.
     *
     * @param locale Locale whose resources should be loaded.
     */
    private async loadLocaleResources(locale: string): Promise<void> {
        const instance = this.getInstance();

        const resources: LocaleResource[] = [
            ...getStaticLocaleResources(this.loaders, locale),
            ...getDomLocaleResources(locale),
        ];

        const messages = await Promise.all(
            resources.map(resource => resource.load()),
        );

        for (const message of messages) {
            instance.global.mergeLocaleMessage(locale, message);
        }
    }

    /**
     * Returns the initialized Vue I18n instance.
     *
     * @throws Error if the manager has not been initialized.
     */
    private getInstance(): VueI18nInstance {
        if (!this.instance) {
            throw new Error('I18nManager has not been initialized.');
        }

        return this.instance;
    }
}

/**
 * Normalizes a locale to its primary language code.
 *
 * Regional variants are not supported for now.
 *
 * @param locale Locale code to normalize.
 * @returns Normalized language code.
 */
function normalizeLocale(locale: string): string {
    return locale.trim().split('-')[0].toLowerCase();
}


/**
 * Main I18n manager instance.
 */
export const i18n: I18nManager = new I18nManager()

/**
 * Translates a message.
 *
 * @param key Translation key.
 * @param args Additional arguments accepted by Vue I18n.
 * @returns Translated message.
 */
export function t(key: string, ...args: unknown[]): string {
    return Reflect.apply(i18n.composer.t, i18n.composer, [key, ...args]) as string;
}

/**
 * Checks whether a translation exists.
 *
 * @param key Translation key.
 * @param args Additional arguments accepted by Vue I18n.
 * @returns Whether the translation exists.
 */
export function te(key: string, ...args: unknown[]): boolean {
    return Reflect.apply(i18n.composer.te, i18n.composer, [key, ...args]) as boolean;
}
