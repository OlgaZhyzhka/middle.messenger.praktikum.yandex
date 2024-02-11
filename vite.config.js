import { defineConfig } from 'vite';
import { dirname, resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { fileURLToPath } from 'url';

import { pagesData } from './src/utils/pagesData.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const srcPath = resolve(__dirname, 'src');
const buildPath = resolve(__dirname, 'dist');
const publicPath = resolve(__dirname, 'public');
const partialsPath = resolve(__dirname, 'src/partials');

const pages = Object.keys(pagesData);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: partialsPath,
      context(pagePath) {
        return pagesData[pagePath];
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: resolve(__dirname, './static') + '/[!.]*',
          dest: './static',
        },
      ],
    }),
  ],
  root: srcPath,
  build: {
    sourceMap: false,
    outDir: buildPath,
    rollupOptions: {
      input: [...pages.map((page) => `./src${page}`)],
    },
  },
  resolve: {
    alias: {
      '@': srcPath,
      '@public': publicPath,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/scss/abstracts/variables";',
      },
    },
  },
});
