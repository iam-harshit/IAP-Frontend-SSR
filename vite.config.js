import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';
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
  plugins: [react(), vike()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
    host: true,
    port: 3001,
  },
  ssr: {
    noExternal: [
      '@reduxjs/toolkit',
      'react-redux',
      'redux-persist',
      '@heroui/react',
      '@mui/material',
      'rsuite',
      'react-slick',
      'slick-carousel',
      'react-simple-typewriter',
      'class-variance-authority', // Added for safety
      'clsx', // Added for safety
    ],
  },
});
