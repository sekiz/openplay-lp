// Site haritası: ana sayfalar ve blog, dil alternatifleriyle (hreflang).
import { locales, defaultLocale, localePath } from '../i18n/index.js';
import { getPosts, getTranslations } from '../lib/blog.js';

export async function GET({ site }) {
  const abs = (p) => new URL(p, site).href;
  const entry = (path, langs, lastmod) => langs.map((l) => `<url><loc>${abs(localePath(l, path))}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}${langs.map((a) => `<xhtml:link rel="alternate" hreflang="${a}" href="${abs(localePath(a, path))}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${abs(localePath(defaultLocale, path))}"/></url>`).join('');
  let urls = entry('/', locales) + entry('/blog/', locales);
  for (const p of await getPosts(defaultLocale)) {
    const langs = await getTranslations(p.slug); // yalnızca gerçekten çevrilmiş sürümler listelenir
    urls += entry(`/blog/${p.slug}/`, langs, (p.data.updatedDate ?? p.data.pubDate).toISOString().slice(0, 10));
  }
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
