/**
 * Base Vite configuration shared by Ox-Watt packages.
 */
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

import oxWatt from './vite-plugin.js';

/**
 * Absolute path to the Ox-Watt package root.
 */
const packageRoot = fileURLToPath(new URL('../', import.meta.url));

/**
 * Absolute path to the Oxylus static assets directory.
 */
export const staticRoot = fileURLToPath(
    new URL('../ox-watt/static/', import.meta.url),
);

/**
 * Shared Vite configuration.
 */
export default defineConfig({
    plugins: [
        vue(),
        vuetify({ autoImport: true }),
        oxWatt({ sfc: true }),
    ],

    optimizeDeps: {
        include: ['vuetify'],
    },

    build: {
        lib: {
            entry: 'src/index.ts',
            formats: ['es'],
            fileName: 'lib.js',
        },

        sourcemap: true,
        emptyOutDir: true,

        rollupOptions: {
            external: [
                /^vue($|\/)/,
                /^vuetify($|\/)/,
                /^@tiptap\//,
                'ox-watt',
            ],
        },
    },

    assetsInclude: ['**/*.png'],

    css: {
        devSourcemap: true,
    },

    test: {
        environment: 'happy-dom',
        server: {
            deps: {
                inline: ['vuetify'],
            },
        },
    },

    resolve: {
        extensions: ['.js', '.ts', '.json', '.vue', '.scss'],
        alias: {
            '@': fileURLToPath(new URL('.', import.meta.url)),
            'ox-watt': fileURLToPath(new URL('../../ox-watt/src', import.meta.url)),
            '@ox-watt/content': fileURLToPath(new URL('../../content/src', import.meta.url)),
        },
    },
});
