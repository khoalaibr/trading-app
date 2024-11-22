import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/market-app/', 
  build: {
    outDir: 'docs', // Asegúrate de que sea "docs"
  },
});
