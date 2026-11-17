/**
 * This is the base module that provide common configuration to compile with
 * Vite.
 */
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'


export const staticRoot = fileURLToPath(new URL('../ox-watt/static', import.meta.url))


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vuetify({ autoImport: true }),
    ],
    optimizeDeps: {
        include: ['vuetify'],
    },
    build: {
        lib: {
            entry: "src/index.ts",
            formats: ["es"],
            fileName: "ox-watt",
        },
        
        sourcemap: true,
        emptyOutDir: true,

        rollupOptions: {
            external: [
                /^vue($|\/)/,
                /^vuetify($|\/)/,
                /^@tiptap\//,
                "ox-watt",
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
                inline: ['vuetify']
            }
        }
    },
    resolve: {
        extensions: ['.js', '.ts', '.json', '.vue', '.scss'],
        alias: {
            '@': fileURLToPath(new URL('.', import.meta.url)),
            'ox-watt': fileURLToPath(new URL('../../ox-watt/src', import.meta.url)),
            '@ox-watt/content': fileURLToPath(new URL('../../content/src', import.meta.url)),
        }
    }
})
