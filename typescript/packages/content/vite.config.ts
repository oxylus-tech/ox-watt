import { mergeConfig } from "vite"
import { visualizer } from "rollup-plugin-visualizer"
import baseConfig from 'ox-watt/vite.config.base'

export default mergeConfig(baseConfig, {
    plugins: [
        visualizer({
            filename: "dist/stats.html",
            template: "treemap",
            gzipSize: true,
            brotliSize: true,
            open: true,
        }),
    ]
})
