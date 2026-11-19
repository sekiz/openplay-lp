import { defineConfig } from 'astro/config';

// Yayın adresi: SITE_URL ortam değişkeniyle ya da aşağıdaki yer tutucuyu değiştirerek verin.
// canonical, hreflang, sitemap, RSS, robots.txt ve llms.txt adresleri bundan üretilir.
const site = process.env.SITE_URL || 'https://openplay.example';

export default defineConfig({
  site,
  trailingSlash: 'always',
  compressHTML: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'], // src/i18n/index.js içindeki listeyle aynı tutun
    routing: { prefixDefaultLocale: false },
  },
});
