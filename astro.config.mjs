import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: process.env.SITE_URL || 'https://know-it-break-it.llll-ll.com',
  trailingSlash: 'ignore',
  integrations: [sitemap(), tailwind()],
  build: {
    assets: '_assets',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
  },
});
