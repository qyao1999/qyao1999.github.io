import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
    plugins: [
        vue(),
        Components(),
        {
            name: 'generate-404',
            apply: 'build',
            closeBundle() {
                const distDir = path.resolve(__dirname, 'dist');
                const indexFile = path.join(distDir, 'index.html');
                const notFoundFile = path.join(distDir, '404.html');

                if (fs.existsSync(indexFile)) {
                    fs.copyFileSync(indexFile, notFoundFile);
                    console.log('404.html has been generated.');
                } else {
                    console.error('index.html not found.');
                }
            }
        }
    ],
    build: {
        outDir: 'dist'
    }
})