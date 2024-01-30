import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
   starlight({
    title: "Kettra World",
    locales: {
      root: {
        label: 'Português do Brasil',
        lang: 'pt-br',
      },
    },
    lastUpdated: true,
    social: {
      discord: "https://discord.gg/NDzFeDp8YE",
      instagram: "https://instagram.com/kettraworld",
      github: "https://github.com/kettraworld"
    },
    sidebar: [{
      label: "About",
      items: [{ label: "Introduction", link: "/about/intro" }],
    }],
  }),
  ],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
  markdown: {
    smartypants: false, 
  },
});
