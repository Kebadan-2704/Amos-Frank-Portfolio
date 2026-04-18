import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('react-router-dom/')) {
              return 'vendor';
            }
            if (id.includes('framer-motion') || id.includes('react-type-animation')) {
              return 'animations';
            }
            if (id.includes('@tsparticles') || id.includes('tsparticles')) {
              return 'particles';
            }
            return 'modules';
          }
        }
      }
    }
  }
});
