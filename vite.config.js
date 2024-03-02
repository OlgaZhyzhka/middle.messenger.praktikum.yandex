import { defineConfig } from 'vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));

const srcPath = resolve(__dirname, 'src');
const buildPath = resolve(__dirname, 'dist');
const publicPath = resolve(__dirname, 'public');
const assetsPath = resolve(__dirname, 'static');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  root: srcPath,
  publicDir: assetsPath,
  build: {
    sourceMap: false,
    outDir: buildPath,
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
