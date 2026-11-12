/**
 * A collection of translation messages compatible with Vue I18n.
 *
 * Message objects may be nested.
 */
export type LocaleMessages = Record<string, any>;

/**
 * Asynchronously loads the messages of a locale resource.
 */
export type LocaleLoader = () => Promise<LocaleMessages>;

/**
 * Locale loaders indexed by their source file paths.
 *
 * The locale is extracted from the filename using the `.[LANG].json`
 * suffix convention.
 */
export type AppLocaleLoaders = Record<string, LocaleLoader>;

/**
 * Collection of locale loader groups.
 *
 * Each group is generally provided by a package. A package can include
 * groups exported by its dependencies.
 */
export type LocaleLoaders = AppLocaleLoaders[];

/**
 * A locale resource discovered in the DOM.
 */
export interface LocaleResource {
    /**
     * Unique identifier used for caching.
     */
    key: string;

    /**
     * Asynchronously loads the resource messages.
     */
    load: LocaleLoader;
}

/**
 * Initialization options of the I18n manager.
 */
export interface I18nOptions {
    /**
     * Locale used as fallback when a translation is missing.
     */
    fallbackLocale: string;

    /**
     * Explicit locale override.
     */
    locale?: string;

    /**
     * Name of the cookie used to detect the preferred locale.
     *
     * @default 'language'
     */
    cookieName?: string;
}
