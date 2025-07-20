import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ssr from 'vike/plugin';
import path from 'path';
import { fileURLToPath } from 'url';

// manually define __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [react(), ssr()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
    host: true,
    port: 3001,
  },
});
