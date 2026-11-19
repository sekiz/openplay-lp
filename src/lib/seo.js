// Yapılandırılmış veri (JSON-LD) üreticileri. Arama motorları ve yapay zekâ yanıt motorları için.
import { localeTags } from '../i18n/index.js';

export const SITE_NAME = 'OpenPlay';
export const abs = (site, path) => new URL(path, site).href;

export const organization = (site) => ({
  '@context': 'https://schema.org', '@type': 'Organization', '@id': abs(site, '/#organization'),
  name: SITE_NAME, url: abs(site, '/'), logo: abs(site, '/favicon.svg'),
});
export const website = (site, lang, description) => ({
  '@context': 'https://schema.org', '@type': 'WebSite', '@id': abs(site, '/#website'),
  name: SITE_NAME, url: abs(site, '/'), description, inLanguage: localeTags[lang], publisher: { '@id': abs(site, '/#organization') },
});
// Fiyat, puan ve sürüm bilgisi doğrulanmadan eklenmemelidir.
export const software = (site, lang, description) => ({
  '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: SITE_NAME, url: abs(site, '/'),
  applicationCategory: 'DeveloperApplication', applicationSubCategory: 'Game backend', operatingSystem: 'Any',
  description, inLanguage: localeTags[lang], publisher: { '@id': abs(site, '/#organization') },
});
export const breadcrumbs = (site, items) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(site, path) })),
});
export const article = (site, post, lang, image) => ({
  '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.data.title, description: post.data.description,
  datePublished: post.data.pubDate.toISOString(), dateModified: (post.data.updatedDate ?? post.data.pubDate).toISOString(),
  inLanguage: localeTags[post.contentLang] ?? post.contentLang, keywords: post.data.tags.join(', '), image: abs(site, image),
  mainEntityOfPage: abs(site, post.canonicalPath),
  author: { '@type': 'Organization', name: post.data.author, url: abs(site, '/') }, publisher: { '@id': abs(site, '/#organization') },
});
export const faqPage = (faq) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
export const blogList = (site, lang, name, description, posts) => ({
  '@context': 'https://schema.org', '@type': 'Blog', name, description, url: abs(site, posts.length ? posts[0].url.replace(/[^/]+\/$/, '') : '/blog/'), inLanguage: localeTags[lang],
  blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.data.title, url: abs(site, p.canonicalPath), datePublished: p.data.pubDate.toISOString() })),
});
