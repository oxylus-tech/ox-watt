import { mergeConfig } from 'vite';
import baseConfig from './src/vite.config.base';

export default mergeConfig(baseConfig, {
    build: {
        lib: {
            entry: {
                index: 'src/index.ts',
            },
            formats: ['es'],
            fileName: (_format, entryName) => {
                return entryName === 'index' ? 'lib.js' : entryName;
            },
        },
    },
});
