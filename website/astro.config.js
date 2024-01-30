import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';;
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'http://0.0.0.0:8080',
  output: 'static',
  adapter: vercel(),
  server: { host: '0.0.0.0', port: 8080 },
  integrations: [mdx(), sitemap()],
});