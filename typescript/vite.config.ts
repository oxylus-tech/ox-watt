import { defineConfig } from "vite";
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
    test: {
        environment: 'happy-dom',
    }
});
