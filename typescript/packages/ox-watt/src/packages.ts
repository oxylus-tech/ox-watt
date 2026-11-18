import { i18n, type AppLocaleLoaders } from './i18n'

/**
 * Defines the initialization metadata of an Ox-Watt package.
 */
export interface Package {
    /**
     * Unique package name, normally matching its npm package name.
     */
    name: string

    /**
     * Locale resource loaders provided by the package.
     */
    locales?: AppLocaleLoaders

    /**
     * Custom package initialization callback.
     *
     * Called after the standard package initialization.
     *
     * @param pkg The package being initialized.
     */
    install?: (pkg: Package) => void | Promise<void>
}

/**
 * Manages Ox-Watt package registration and initialization.
 */
export class PackageManager {
    /**
     * Initialization promises indexed by package name.
     */
    private packages = new Map<string, Promise<void>>()

    /**
     * Initializes one or more Ox-Watt packages.
     *
     * @param packages Packages to initialize.
     */
    async use(...packages: Package[]): Promise<void> {
        for (const pkg of packages) {
            await this.useOne(pkg)
        }
    }

    /**
     * Initializes a package if it has not already been initialized.
     *
     * Concurrent calls share the same initialization promise.
     *
     * @param pkg Package to initialize.
     */
    private async useOne(pkg: Package): Promise<void> {
        if (!pkg.name) {
            throw new Error('A package must have a name.')
        }

        const existing = this.packages.get(pkg.name)

        if (existing) {
            await existing
            return
        }

        const promise = this.initialize(pkg)
        this.packages.set(pkg.name, promise)

        try {
            await promise
        } catch (error) {
            this.packages.delete(pkg.name)
            throw error
        }
    }

    /**
     * Initializes a package and its associated resources.
     *
     * @param pkg Package to initialize.
     */
    private async initialize(pkg: Package): Promise<void> {
        if (pkg.locales) {
            await i18n.register([pkg.locales])
        }

        await pkg.install?.(pkg)
    }
}

/**
 * Global Ox-Watt package manager.
 */
export const packages = new PackageManager()
