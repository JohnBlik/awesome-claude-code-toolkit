import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { viteSingleFile } from 'vite-plugin-singlefile';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Build the entire app into a single self-contained HTML file you can
 * double-click and open in any modern browser — no server, no node_modules,
 * no relative asset paths. Output goes to `dist-single/index.html`.
 */
export default defineConfig({
  plugins: [react(), viteSingleFile({ removeViteModuleLoader: true })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    outDir: 'dist-single',
    emptyOutDir: true,
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
    chunkSizeWarningLimit: 10_000,
    rollupOptions: {
      output: {
        // Flatten dynamic imports — React.lazy + Three.js chunk all collapse
        // into one bundle so the resulting HTML truly has zero dependencies.
        inlineDynamicImports: true,
      },
    },
  },
});
