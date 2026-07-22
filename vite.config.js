import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        donutsStoreIndex: resolve(__dirname, 'projects/donuts-store/index.html'),
        donutsStoreContact: resolve(__dirname, 'projects/donuts-store/contact.html'),
        portfolioLegado: resolve(__dirname, 'projects/portfolio-legado/index.html'),
      },
    },
  },
});
