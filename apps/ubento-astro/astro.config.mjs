import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import { fileURLToPath } from 'url';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [react()],
  vite: {
    define: {
      'process.env.NEXT_PUBLIC_WORKSPACE_RUNTIME_URL': JSON.stringify(process.env.NEXT_PUBLIC_WORKSPACE_RUNTIME_URL || 'http://localhost:4020'),
      'process.env.NEXT_PUBLIC_COMPONENT_RUNTIME_URL': JSON.stringify(process.env.NEXT_PUBLIC_COMPONENT_RUNTIME_URL || 'http://localhost:4030'),
    },
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
