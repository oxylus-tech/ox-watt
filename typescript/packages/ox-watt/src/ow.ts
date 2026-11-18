import { type Package, PackageManager } from './packages'
import { type I18nOptions, i18n } from './i18n'


/**
 * Options used to initialize the Ox-Watt runtime.
 */
export interface OwInitializeOptions {
    /** Options used to initialize the i18n manager. */
    i18n?: I18nOptions;

    /** Packages to register during initialization. */
    packages?: Package[];
}


/**
 * Public Ox-Watt runtime API.
 */
export const ow = {
    /**
     * Initializes one or more Ox-Watt packages.
     *
     * @param packages Packages to initialize.
     */
    use(...packages: Package[]): Promise<void> {
        return packageManager.use(...packages)
    },

    /**
     * Initialize the Ox-Watt runtime.
     *
     * @param options Runtime initialization options.
     */
    async initialize(options: OwInitializeOptions): Promise<void> {
        await i18n.initialize(options.i18n);
        await this.use(...options.packages);
    }
}

const packageManager = new PackageManager()

