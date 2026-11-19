import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { glob } from 'glob';
import type { Plugin, ResolvedConfig } from 'vite';


/**
 * Configuration options for the Ox-Watt Vite plugin.
 */
export interface OxWattPluginOptions {
    /**
     * Package source directory.
     *
     * @default 'src'
     */
    sourceDir?: string;

    /**
     * Directory containing JSON locale files, relative to sourceDir.
     *
     * @default 'locales'
     */
    localesDir?: string;

    /**
     * Package options source file, relative to sourceDir.
     *
     * Set to false to disable the source package configuration.
     *
     * @default 'package'
     */
    package?: string | false;

    /**
     * Enable SFC metadata generation.
     *
     * A string can be used to specify the SFC catalogue path,
     * relative to sourceDir.
     *
     * When true, it will look for `componentsDir/sfc.json`.
     *
     * @default false
     */
    sfc?: boolean | string;

    /**
     * Components source directory.
     *
     * @default 'components'
     */
    componentsDir?: string;
}


/**
 * Resolved Ox-Watt plugin configuration.
 */
interface ResolvedOxWattPluginOptions {
    sourceDir: string;
    localesDir: string;
    package: string | false;
    sfc: boolean | string;
    componentsDir: string;
}


/**
 * Describes a component exported by the SFC catalogue.
 */
interface SfcComponent {
    /**
     * Public name used for the component export.
     */
    name: string;

    /**
     * Absolute path to the original Vue component.
     */
    source: string;
}


/**
 * Virtual module used as the generated package entry point.
 */
const PACKAGE_MODULE_ID = '\0ox-watt:package';

/**
 * Public identifier resolved to the generated package module.
 */
const PACKAGE_PUBLIC_ID = 'ox-watt:package'

/**
 * Virtual module used as the generated SFC entry point.
 */
const SFC_MODULE_ID = '\0ox-watt:sfc'

/**
 * Public identifier resolved to the generated SFC entry point.
 */
const SFC_PUBLIC_ID = 'ox-watt:sfc'

/**
 * TypeScript declaration generated for the package entry point.
 */
const PACKAGE_DECLARATION = [
    'import type { Package } from "ox-watt";',
    'declare const pkg: Package;',
    'export default pkg;',
].join('\n')


/**
 * Create the Ox-Watt Vite plugin.
 *
 * @param options - Plugin configuration options.
 * @returns Vite plugin instance.
 */
export function oxWatt(options: OxWattPluginOptions = {}): Plugin {
    const resolved: ResolvedOxWattPluginOptions = {
        sourceDir: options.sourceDir ?? 'src',
        localesDir: options.localesDir ?? 'locales',
        package: options.package === undefined ? 'package' : options.package,
        sfc: options.sfc ?? false,
        componentsDir: options.componentsDir ?? 'components',
    };

    let config: ResolvedConfig;
    let packageName: string;
    let packageSource: string | undefined;
    let localeSource: string;
    let packageModule: string;
    const sfcModules = new Map<string, string>()
    let sfcComponents: SfcComponent[] = [];

    return {
        name: 'ox-watt',
        apply: 'build',

        /**
         * Resolve project configuration and package metadata.
         */
        async configResolved(resolvedConfig) {
            config = resolvedConfig;

            const rootPackageFile = path.resolve(config.root, 'package.json');
            const rootPackage = JSON.parse(
                await fs.readFile(rootPackageFile, 'utf-8'),
            );

            if (!rootPackage.name) {
                throw new Error(
                    'Ox-Watt: package.json must define a package name.',
                );
            }

            packageName = rootPackage.name;

            const sourceDir = path.resolve(config.root, resolved.sourceDir);

            localeSource = path.resolve(
                sourceDir,
                resolved.localesDir,
            );

            if (resolved.package !== false) {
                const packageBase = path.resolve(
                    sourceDir,
                    resolved.package,
                );

                for (const extension of ['.ts', '.js']) {
                    const candidate = packageBase.endsWith(extension)
                        ? packageBase
                        : `${packageBase}${extension}`;

                    try {
                        await fs.access(candidate);
                        packageSource = candidate;
                        break;
                    } catch {
                        // Try the next extension.
                    }
                }
            }

            const packageExport = rootPackage.exports?.['./package'];

            if (!packageExport) {
                config.logger.warn(
                    'Ox-Watt: package.json does not define the "./package" export.',
                );
            }
        },

        /**
         * Generate package metadata and watch source files.
         */
        async buildStart() {
            const locales = await discoverLocales(localeSource);

            for (const file of locales)
                this.addWatchFile(path.resolve(localeSource, file));

            if (packageSource)
                this.addWatchFile(packageSource);

            packageModule = createPackageModule(
                packageName,
                packageSource,
                locales.map((file) => path.resolve(localeSource, file)),
                config.root
            );

            this.emitFile({
                type: 'chunk',
                id: PACKAGE_PUBLIC_ID,
                fileName: 'package.js',
            });

            this.emitFile({
                type: 'asset',
                fileName: 'package.d.ts',
                source: PACKAGE_DECLARATION,
            });

            if (resolved.sfc) {
                const catalogueFile = path.resolve(
                    config.root,
                    resolved.sourceDir,
                    typeof resolved.sfc === 'string'
                        ? resolved.sfc
                        : path.join(resolved.componentsDir, 'sfc.json'),
                );

                sfcComponents = await discoverSfcComponents(catalogueFile);

                this.addWatchFile(catalogueFile);

                if(sfcComponents) {

                    sfcModules.clear();

                    for (const component of sfcComponents) {
                        const moduleId = `${SFC_PUBLIC_ID}:${component.name}`;

                        sfcModules.set(
                            moduleId,
                            createSfcModule(component, config.root),
                        );

                        this.addWatchFile(component.source);

                        this.emitFile({
                            type: 'chunk',
                            id: moduleId,
                            fileName: `${resolved.componentsDir}/${component.name}.js`,
                        });
                    }

                    this.emitFile({
                        type: 'chunk',
                        id: SFC_PUBLIC_ID,
                        fileName: 'sfc.js',
                    });
                }
            }
        },

        /**
         * Resolve the virtual package module.
         *
         * @param id - Requested module identifier.
         * @returns Resolved virtual module identifier.
         */
        resolveId(id, importer) {
            if (id === PACKAGE_PUBLIC_ID)
                return PACKAGE_MODULE_ID;

            if (id === SFC_PUBLIC_ID)
                return SFC_MODULE_ID;

            if (sfcModules.has(id))
                return id;

            if (
                importer &&
                (importer === PACKAGE_MODULE_ID || sfcModules.has(importer)) &&
                id.startsWith('.')
            )
                return path.resolve(config.root, id);
        },

        /**
         * Load the generated package module.
         *
         * @param id - Resolved module identifier.
         * @returns Generated package module source.
         */
        load(id) {
            if (id === PACKAGE_MODULE_ID)
                return packageModule;

            if (id === SFC_MODULE_ID)
                return createSfcEntryModule(sfcComponents);

            return sfcModules.get(id);
        },
    };
}

export default oxWatt;


// -----------------------------------------------------------------------------
//  Packages
// -----------------------------------------------------------------------------

/**
 * Returns an import path relative to the package root.
 *
 * @param packageRoot Absolute path to the package root.
 * @param file Absolute path to the imported file.
 * @returns A package-relative import path using POSIX separators.
 * @throws If the file is outside the package root.
 */
function getPackageImportPath(packageRoot: string, file: string): string {
    const relativePath = path.relative(packageRoot, file);

    if (
        relativePath === '..' ||
        relativePath.startsWith(`..${path.sep}`) ||
        path.isAbsolute(relativePath)
    ) {
        throw new Error(`Cannot generate an import for a file outside the package: ${file}`);
    }

    return `./${relativePath.split(path.sep).join('/')}`;
}


/**
 * Discover JSON locale files in a source directory.
 *
 * Returned paths are relative to the supplied directory and retain
 * their complete filenames, including extensions.
 *
 * @param sourceDir - Absolute locale source directory.
 * @returns Relative paths of discovered JSON files.
 */
async function discoverLocales(sourceDir: string): Promise<string[]> {
    return glob('*.json', { cwd: sourceDir, absolute: false });
}

/**
 * Serialize a value as JavaScript source code.
 *
 * @param value - Value to serialize.
 * @returns JavaScript representation.
 */
function serialize(value: unknown): string {
    return JSON.stringify(value);
}

/**
 * Generate the package initialization module.
 *
 * Generated locale loaders are merged with manually defined locale
 * loaders. Manually defined entries take precedence.
 *
 * @param packageName - Package name.
 * @param packageSource - Absolute path to the package options module.
 * @param localeFiles - Absolute paths of discovered locale files.
 * @param packageRoot - Path to the package's root directory
 * @returns Generated JavaScript source.
 */
function createPackageModule(
    packageName: string,
    packageSource: string | undefined,
    localeFiles: string[],
    packageRoot: string,
): string {
    const packageImport = packageSource
        ? `import packageOptions from ${serialize(getPackageImportPath(packageRoot, packageSource))};`
        : 'const packageOptions = {};';

    const locales = localeFiles.map((file) => {
        const importPath = getPackageImportPath(packageRoot, file);

        return `    ${serialize(path.basename(file))}: () => import(${serialize(importPath)}).then(module => module.default),`;
    });

    return [
        packageImport,
        '',
        'const locales = {',
        ...locales,
        '};',
        '',
        'const pkg = {',
        '    ...packageOptions,',
        `    name: ${serialize(packageName)},`,
        '    locales: {',
        '        ...locales,',
        '        ...(packageOptions.locales ?? {}),',
        '    },',
        '};',
        '',
        'export default pkg;',
    ].join('\n');
}

// -----------------------------------------------------------------------------
//  SFC
// -----------------------------------------------------------------------------

/**
 * Discovers components declared in an SFC JSON catalogue.
 *
 * The catalogue maps public component export names to paths relative
 * to the catalogue file.
 *
 * @param filename - Absolute path to the SFC catalogue.
 * @returns Discovered components.
 * @throws If the catalogue is invalid or a component declaration is malformed.
 */
async function discoverSfcComponents(filename: string): Promise<SfcComponent[]|null> {
    let source: string;
    let catalogue: unknown;

    try {
        source = await fs.readFile(filename, 'utf-8');
        catalogue = JSON.parse(source);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT')
            return null;

        throw new Error(
            `Cannot parse SFC catalogue "${filename}": ${
                error instanceof Error ? error.message : String(error)
            }`,
        );
    }

    if (
        catalogue === null ||
        typeof catalogue !== 'object' ||
        Array.isArray(catalogue)
    ) {
        throw new Error(
            `The SFC catalogue "${filename}" must contain a JSON object.`,
        );
    }

    const components: SfcComponent[] = [];

    for (const [name, componentPath] of Object.entries(catalogue)) {
        if (!/^[A-Za-z_$][\w$]*$/.test(name)) {
            throw new Error(
                `Invalid component export name "${name}" in SFC catalogue "${filename}".`,
            );
        }

        if (typeof componentPath !== 'string' || !componentPath.trim()) {
            throw new Error(
                `Component "${name}" in SFC catalogue "${filename}" must define a non-empty path.`,
            );
        }

        components.push({
            name,
            source: path.resolve(dirname(filename), componentPath),
        });
    }

    return components;
}

/**
 * Creates a component wrapper module.
 *
 * @param component Component to wrap.
 * @param packageRoot - Path to the package's root directory
 * @returns Generated JavaScript module.
 */
function createSfcModule(component: SfcComponent, packageRoot: string): string {
    const importPath = getPackageImportPath(packageRoot, component.source);
    return `
import { ow } from 'ox-watt';
import pkg from '${PACKAGE_PUBLIC_ID}';
import OriginalComponent from ${serialize(importPath)};

/**
 * Component wrapper that initializes its package before setup.
 */
const component = {
    ...OriginalComponent,

    async setup(props, context) {
        await ow.use(pkg);

        return OriginalComponent.setup?.(props, context);
    },
};

export default component;
`
}


/**
 * Creates the generated SFC entry module.
 *
 * @param components Discovered SFC components.
 * @returns Generated JavaScript module.
 */
function createSfcEntryModule(components: SfcComponent[]): string {
    return components.map((component) => {
        const moduleId = `${SFC_PUBLIC_ID}:${component.name}`

        return `export { default as ${component.name} } from ${JSON.stringify(moduleId)};`
    }).join('\n')
}
