// @vitest-environment node
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { ResolvedConfig } from 'vite';
import { describe, expect, it, vi } from 'vitest';

import { oxWatt } from '@/vite-plugin';


/**
 * Represents a Vite plugin hook.
 */
type PluginHook<T extends (...args: any[]) => any> = T | {
    handler: T;
};

/**
 * Returns the handler of a Vite plugin hook.
 *
 * @param hook - Plugin hook or hook configuration.
 * @returns Hook handler.
 */
function getHook<T extends (...args: any[]) => any>(hook: PluginHook<T>): T {
    return typeof hook === 'function' ? hook : hook.handler;
}

/**
 * Represents a file emitted by the plugin.
 */
interface EmittedFile {
    type: 'asset' | 'chunk';
    fileName?: string;
    id?: string;
    source?: string | Uint8Array;
}

/**
 * Creates a minimal Vite configuration for plugin tests.
 *
 * @param root - Project root directory.
 * @returns Resolved Vite configuration mock.
 */
function createConfig(root: string): ResolvedConfig {
    return {
        root,
        logger: {
            warn: vi.fn(),
        },
    } as unknown as ResolvedConfig;
}

/**
 * Creates a minimal Vite plugin context for lifecycle tests.
 *
 * @returns Plugin context and captured emitted files.
 */
function createPluginContext() {
    const emittedFiles: EmittedFile[] = [];

    return {
        emittedFiles,
        context: {
            addWatchFile: vi.fn(),
            emitFile: vi.fn((file: EmittedFile) => {
                emittedFiles.push(file);
                return `reference-${emittedFiles.length}`;
            }),
        },
    };
}

/**
 * Reads the source of an emitted asset.
 *
 * @param files - Emitted files.
 * @param fileName - Output filename.
 * @returns Asset source.
 */
function getEmittedAsset(files: EmittedFile[], fileName: string): string {
    const file = files.find((item) => item.fileName === fileName);

    if (!file || file.type !== 'asset')
        throw new Error(`Emitted asset "${fileName}" was not found.`);

    return typeof file.source === 'string'
        ? file.source
        : new TextDecoder().decode(file.source);
}

/**
 * Creates and initializes the plugin against a fixture directory.
 *
 * @param fixtureName - Fixture directory name.
 * @param options - Plugin options.
 * @returns Initialized plugin and its mocked context.
 */
async function initializePlugin(
    fixtureName: string,
    options: Parameters<typeof oxWatt>[0] = {},
) {
    const root = fileURLToPath(
        new URL(`./fixtures/${fixtureName}/`, import.meta.url),
    );

    const plugin = oxWatt(options);
    const config = createConfig(root);
    const { context, emittedFiles } = createPluginContext();

    const configResolved = getHook(
        plugin.configResolved as PluginHook<(config: ResolvedConfig) => void>,
    );

    const buildStart = getHook(
        plugin.buildStart as PluginHook<() => void>,
    );

    await configResolved.call(context, config);
    await buildStart.call(context);

    return {
        plugin,
        config,
        context,
        emittedFiles,
    };
}

/**
 * Loads a generated module through the Vite plugin.
 *
 * @param plugin - Vite plugin instance.
 * @param context - Mock plugin context.
 * @param id - Module identifier.
 * @returns Generated module source.
 */
async function getLoadedModule(
    plugin: Plugin,
    context: PluginContext,
    id: string,
): Promise<string> {
    const load = getHook(plugin.load);
    const result = await load.call(context, id);

    if (typeof result !== 'string') {
        throw new Error(`Module "${id}" was not loaded.`);
    }

    return result;
}


describe('oxWatt Vite plugin', () => {
    describe('package generation', () => {
        it('should generate the package entry point and declaration', async () => {
            const { emittedFiles } = await initializePlugin('basic');

            expect(emittedFiles).toContainEqual(expect.objectContaining({
                type: 'chunk',
                id: '\0ox-watt:package',
                fileName: 'package.js',
            }));

            expect(getEmittedAsset(emittedFiles, 'package.d.ts')).toBe([
                'import type { Package } from "ox-watt";',
                'declare const pkg: Package;',
                'export default pkg;',
            ].join('\n'));
        });

        it('should generate lazy locale loaders', async () => {
            const { plugin } = await initializePlugin('basic');

            const load = getHook(
                plugin.load as PluginHook<(id: string) => string | undefined>,
            );

            const source = load('\0ox-watt:package');

            expect(source).toContain('"basic.en.json": () => import(');
            expect(source).toContain('"basic.fr.json": () => import(');
            expect(source).toContain('module => module.default');
        });

        it('should allow package-defined locales to override generated locales', async () => {
            const { plugin } = await initializePlugin('basic');

            const load = getHook(
                plugin.load as PluginHook<(id: string) => string | undefined>,
            );

            const source = load('\0ox-watt:package');

            expect(source).toContain('...locales,');
            expect(source).toContain('...(packageOptions.locales ?? {})');
        });

        it('should use import paths relative to the package root', async () => {
            const { plugin, config } = await initializePlugin('basic');

            const load = getHook(
                plugin.load as PluginHook<(id: string) => string | undefined>,
            );

            const source = load('\0ox-watt:package');

            expect(source).toContain('./src/package.ts');
            expect(source).toContain('./src/locales/basic.en.json');
            expect(source).not.toContain(config.root);
            expect(source).not.toContain(path.resolve(config.root));
        });

        it('should watch locale and package source files', async () => {
            const { context, config } = await initializePlugin('basic');

            expect(context.addWatchFile).toHaveBeenCalledWith(
                path.join(config.root, 'src/locales/basic.en.json'),
            );

            expect(context.addWatchFile).toHaveBeenCalledWith(
                path.join(config.root, 'src/locales/basic.fr.json'),
            );

            expect(context.addWatchFile).toHaveBeenCalledWith(
                path.join(config.root, 'src/package.ts'),
            );
        });
    });

    describe('SFC generation', () => {
        it('should generate the SFC entry point and component wrappers', async () => {
            const { emittedFiles } = await initializePlugin('basic', {
                sfc: true,
            });

            expect(emittedFiles).toContainEqual(expect.objectContaining({
                type: 'chunk',
                id: '\0ox-watt:sfc',
                fileName: 'sfc.js',
            }));

            expect(emittedFiles).toContainEqual(expect.objectContaining({
                type: 'chunk',
                id: 'ox-watt:sfc:MyButton',
                fileName: 'components/MyButton.js',
            }));

            expect(emittedFiles).toContainEqual(expect.objectContaining({
                type: 'chunk',
                id: 'ox-watt:sfc:Input',
                fileName: 'components/Input.js',
            }));
        });

        it('should generate named exports for catalogue components', async () => {
            const { plugin } = await initializePlugin('basic', {
                sfc: true,
            });

            const load = getHook(
                plugin.load as PluginHook<(id: string) => string | undefined>,
            );

            const source = load('\0ox-watt:sfc');

            expect(source).toContain(
                'export { default as MyButton } from "ox-watt:sfc:MyButton";',
            );

            expect(source).toContain(
                'export { default as Input } from "ox-watt:sfc:Input";',
            );
        });

        it('should initialize the package before calling the original setup', async () => {
            const { plugin } = await initializePlugin('basic', {
                sfc: true,
            });

            const load = getHook(
                plugin.load as PluginHook<(id: string) => string | undefined>,
            );

            const source = load('ox-watt:sfc:MyButton');

            expect(source).toContain('await ow.use(pkg)');
            expect(source).toContain('OriginalComponent.setup?.(props, context)');

            expect(source!.indexOf('await ow.use(pkg)')).toBeLessThan(
                source!.indexOf('OriginalComponent.setup?.(props, context)'),
            );
        });

        it('should use package-relative component import paths', async () => {
            const { plugin, config } = await initializePlugin('basic', {
                sfc: true,
            });

            const load = getHook(
                plugin.load as PluginHook<(id: string) => string | undefined>,
            );

            const source = load('ox-watt:sfc:MyButton');

            expect(source).toContain('./src/components/MyButton.vue');
            expect(source).not.toContain(config.root);
        });
    });

    describe('SFC JSON catalogue', () => {
        const catalogue = (name: string) => `components/${name}.json`;

        it('should load a custom JSON catalogue', async () => {
            const { plugin, context } = await initializePlugin('basic', {
                sfc: catalogue('sfc-custom'),
            });

            const entryModule = await getLoadedModule(
                plugin,
                context,
                '\0ox-watt:sfc',
            );

            expect(entryModule).toContain(
                'export { default as Button } from "ox-watt:sfc:Button";',
            );

            expect(entryModule).toContain(
                'export { default as Input } from "ox-watt:sfc:Input";',
            );
        });

        it('should resolve component paths relative to the catalogue', async () => {
            const { plugin, context } = await initializePlugin('basic', {
                sfc: catalogue('sfc-custom'),
            });

            const componentModule = await getLoadedModule(
                plugin,
                context,
                'ox-watt:sfc:Button',
            );

            expect(componentModule).toContain(
                'OriginalComponent from "./src/components/MyButton.vue"',
            );
        });

        it('should reject invalid JSON', async () => {
            await expect(
                initializePlugin('basic', {
                    sfc: catalogue('sfc-invalid-json'),
                }),
            ).rejects.toThrow(/Cannot parse SFC catalogue/);
        });

        it('should reject a catalogue that is not a JSON object', async () => {
            await expect(
                initializePlugin('basic', {
                    sfc: catalogue('sfc-invalid-root'),
                }),
            ).rejects.toThrow(/must contain a JSON object/);
        });

        it('should reject invalid component export names', async () => {
            await expect(
                initializePlugin('basic', {
                    sfc: catalogue('sfc-invalid-name'),
                }),
            ).rejects.toThrow(/Invalid component export name "my-button"/);
        });

        it('should reject empty component paths', async () => {
            await expect(
                initializePlugin('basic', {
                    sfc: catalogue('sfc-invalid-path'),
                }),
            ).rejects.toThrow(/must define a non-empty path/);
        });

        it('should reject component paths outside the package root', async () => {
            await expect(
                initializePlugin('basic', {
                    sfc: catalogue('sfc-external-path'),
                }),
            ).rejects.toThrow(/outside the package/);
        });
    });

    describe('module resolution', () => {
        it('should resolve public package and SFC identifiers', async () => {
            const { plugin } = await initializePlugin('basic', {
                sfc: true,
            });

            const resolveId = getHook(
                plugin.resolveId as PluginHook<(id: string) => string | undefined>,
            );

            expect(resolveId('ox-watt:package')).toBe('\0ox-watt:package');
            expect(resolveId('ox-watt:sfc')).toBe('\0ox-watt:sfc');
            expect(resolveId('ox-watt:sfc:MyButton')).toBe('ox-watt:sfc:MyButton');
        });
    });
});
