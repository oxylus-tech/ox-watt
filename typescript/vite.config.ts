import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from 'node:url'

/** Build the package as a framework-independent ES module library. */
export default defineConfig({
    build: {
        lib: {
            entry: "src/index.ts",
            formats: ["es"],
            fileName: "ox-data",
        },
    },
    resolve: {
        extensions: ['.js', '.ts', '.json', '.vue', '.scss'],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    },
    plugins: [
        vue()
    ],
    test: {
        environment: 'happy-dom',
        server: {
            deps: {
                inline: ['vuetify']
            }
        }
    }
});
