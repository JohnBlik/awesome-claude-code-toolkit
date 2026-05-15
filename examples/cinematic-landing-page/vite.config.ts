import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // 0.0.0.0 — required for the dev server to be reachable from outside the
    // container (Codespaces, Docker, WSL, etc.). On localhost only, it stays
    // accessible at http://127.0.0.1:5173 as before.
    host: true,
    port: 5173,
    // Fall through to the next free port if 5173 is busy (true auto-detect).
    strictPort: false,
    // Don’t try to spawn a browser in headless / remote environments.
    open: false,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: false,
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          three: ['three'],
        },
      },
    },
  },
});
