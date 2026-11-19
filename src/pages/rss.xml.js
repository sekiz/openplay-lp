import { defaultLocale, useTranslations } from '../i18n/index.js';
import { getPosts } from '../lib/blog.js';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET({ site }) {
  const b = useTranslations(defaultLocale).blog, abs = (p) => new URL(p, site).href;
  const items = (await getPosts(defaultLocale)).map((p) => `<item><title>${esc(p.data.title)}</title><link>${abs(p.url)}</link><guid isPermaLink="true">${abs(p.url)}</guid><description>${esc(p.data.description)}</description><pubDate>${p.data.pubDate.toUTCString()}</pubDate>${p.data.tags.map((t) => `<category>${esc(t)}</category>`).join('')}</item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(b.title)}</title><link>${abs('/blog/')}</link><description>${esc(b.description)}</description><language>en</language><atom:link href="${abs('/rss.xml')}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
