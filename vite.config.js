import { defineConfig } from 'vite';
import { dirname, resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { fileURLToPath } from 'url';

import { pagesData } from './src/utils/pagesData.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const srcPath = resolve(__dirname, 'src');
const buildPath = resolve(__dirname, 'dist');
const publicPath = resolve(__dirname, 'public');
const assetsPath = resolve(__dirname, 'static');
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
  ],
  root: srcPath,
  publicDir: assetsPath,
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
