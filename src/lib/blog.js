import { getCollection } from 'astro:content';
import { defaultLocale, localePath } from '../i18n/index.js';

const split = (id) => { const [lang, ...rest] = id.split('/'); return { lang, slug: rest.join('/') }; };
const words = (s) => (s || '').trim().split(/\s+/).length;

/** Bir dilin yazı listesi. Çevirisi olmayan yazılar kaynak dilden (İngilizce) tamamlanır ve `fallback` işaretlenir. */
export async function getPosts(lang = defaultLocale) {
  const all = (await getCollection('blog', ({ data }) => !data.draft)).map((e) => ({ ...split(e.id), entry: e }));
  const own = all.filter((p) => p.lang === lang);
  const have = new Set(own.map((p) => p.slug));
  const extra = lang === defaultLocale ? [] : all.filter((p) => p.lang === defaultLocale && !have.has(p.slug)).map((p) => ({ ...p, fallback: true }));
  return [...own, ...extra]
    .map((p) => ({
      slug: p.slug, contentLang: p.lang, fallback: !!p.fallback, entry: p.entry, data: p.entry.data,
      minutes: Math.max(2, Math.round(words(p.entry.body) / 220)),
      url: localePath(lang, `/blog/${p.slug}/`),
      // çevirisi olmayan yazının asıl adresi kaynak dildedir (yinelenen içerik olmaması için canonical oraya gider)
      canonicalPath: localePath(p.fallback ? defaultLocale : lang, `/blog/${p.slug}/`),
    }))
    .sort((a, b) => a.data.order - b.data.order || b.data.pubDate - a.data.pubDate);
}

/** Bir yazının hangi dillerde gerçekten var olduğu (hreflang için). */
export async function getTranslations(slug) {
  const all = await getCollection('blog', ({ data }) => !data.draft);
  return all.map((e) => split(e.id)).filter((p) => p.slug === slug).map((p) => p.lang);
}
