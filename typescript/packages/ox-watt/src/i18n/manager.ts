import { createI18n, type Composer } from 'vue-i18n';

import type { NamedDefinitionBase } from "../utils/types"
import { detectLocale } from './locale';
import { getStaticLocaleResources, getDomLocaleResources, } from './resources';

import type { AppLocaleLoaders, LocaleMessages, LocaleResource, I18nOptions } from './types';

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
     * Tracks locale resources that are currently loading or have been loaded.
     *
     * The key combines the locale and the resource key.
     */
    private resourceLoads = new Map<string, Promise<void>>();

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
     * When the manager is already initialized, newly registered resources
     * are immediately loaded for the fallback and current locales.
     *
     * @param loaders - Locale loader groups to register.
     * @returns A promise resolved when the relevant resources are loaded.
     */
    async register(loaders: AppLocaleLoaders[]): Promise<void> {
        const knownLoaders = new Set(this.loaders);
        const newLoaders = loaders.filter(loader => {
            if (knownLoaders.has(loader))
                return false;

            knownLoaders.add(loader);
            return true;
        });

        if (newLoaders.length === 0)
            return;

        this.loaders.push(...newLoaders);

        if (!this.instance)
            return;

        const locales = new Set([ this.fallbackLocale!, this.locale, ]);
        await Promise.all(
            [...locales].map(locale => this.loadLocaleResources(locale)),
        );
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
     * Loads all resources registered for a locale.
     *
     * @param locale - The locale whose resources must be loaded.
     * @returns A promise resolving when all resources have been loaded.
     */
    private async loadLocaleResources(locale: string): Promise<void> {
        const resources = [
            ...getStaticLocaleResources(this.loaders, locale),
            ...getDomLocaleResources(locale),
        ];

        const uniqueResources = new Map(
            resources.map(resource => [resource.key, resource])
        );

        await Promise.all(
            [...uniqueResources.values()].map(resource => this.loadLocaleResource(locale, resource))
        );
    }

    /**
     * Loads and merges a locale resource if it has not already been loaded.
     *
     * @param locale - Target locale.
     * @param resource - Resource to load.
     */
    private async loadLocaleResource(locale: string, resource: LocaleResource): Promise<void> {
        const key = `${locale}:${resource.key}`;
        const existingLoad = this.resourceLoads.get(key);

        if (existingLoad)
            return existingLoad;

        const load = resource.load()
            .then(messages => {
                this.getInstance().global.mergeLocaleMessage(locale, messages);
            })
            .catch(error => {
                this.resourceLoads.delete(key);
                throw error;
            });

        this.resourceLoads.set(key, load);
        return load;
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


/**
 * Creates a translation object from a namespace and a list of keys.
 *
 * @param prefix - Translation namespace.
 * @param keys - Keys to translate.
 * @returns An object whose keys match the provided keys.
 */
export function tobj<const TKeys extends string[]>(
    prefix: string,
    keys: TKeys
): Record<TKeys[number], string> {
    return Object.fromEntries(
        keys.map(k => [k, t(`${prefix}.${k}`)])
    ) as Record<TKeys[number], string>;
}


export function tNamedI18n(prefix: string): Omit<NamedDefinitionBase, "name"> {
    return tobj(prefix, ["title", "description"])
}


/**
 * Defines a lazily translated property on an object.
 *
 * The property is replaced by its resolved value on first access.
 *
 * @param target - Object receiving the property.
 * @param property - Property name.
 * @param translationKey - Translation key.
 */
export function defineLazyTranslation(
    target: object,
    property: "title" | "description",
    translationKey: string,
): void {
    Object.defineProperty(target, property, {
        enumerable: true,
        configurable: true,

        get() {
            const value = t(translationKey);

            Object.defineProperty(target, property, {
                value,
                enumerable: true,
                configurable: true,
                writable: true,
            });

            return value;
        },
    });
}
