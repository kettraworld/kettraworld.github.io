import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte'
import map from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'http://0.0.0.0:8080',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  server: { host: '0.0.0.0', port: 8080 },
  integrations: [svelte(), map()]
});