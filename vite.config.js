import { defineConfig } from 'vite';
import { dirname, resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const srcPath = resolve(__dirname, 'src');
const buildPath = resolve(__dirname, 'dist');
const publicPath = resolve(__dirname, 'public');
const partialsPath = resolve(__dirname, 'src/partials');

const pageData = {
  '/index.html': {
    title: 'Chateo - simple messenger',
  },
  '/login.html': {
    title: 'Chateo - simple messenger - welcome',
  },
  '/registration.html': {
    title: 'Chateo - simple messenger - crate account',
  },
  '/chat-list.html': {
    title: 'Chateo - simple messenger - start chatting',
  },
};

const pages = Object.keys(pageData);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: partialsPath,
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ],
  root: srcPath,
  build: {
    sourceMap: false,
    outDir: buildPath,
    rollupOptions: {
      input: [...pages.map((page) => `./src/${page}`)],
    },
  },
  optimizeDeps: {
    include: ['dependency-name'],
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
