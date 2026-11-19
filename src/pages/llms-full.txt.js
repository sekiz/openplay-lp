// Tüm blog yazılarının düz metni: yapay zekâ asistanlarının tek istekte okuyabilmesi için.
import { defaultLocale } from '../i18n/index.js';
import { getPosts } from '../lib/blog.js';

export async function GET({ site }) {
  const abs = (p) => new URL(p, site).href;
  const parts = (await getPosts(defaultLocale)).map((p) => [
    `# ${p.data.title}`, '', `Source: ${abs(p.url)}`, `Published: ${p.data.pubDate.toISOString().slice(0, 10)}`, '', p.data.description, '',
    '## Key takeaways', ...p.data.takeaways.map((k) => `- ${k}`), '', p.entry.body.trim(), '',
    ...(p.data.faq.length ? ['## Frequently asked questions', ...p.data.faq.flatMap((f) => [`### ${f.q}`, f.a, ''])] : []),
  ].join('\n'));
  return new Response(`# OpenPlay blog, full text\n\n${parts.join('\n---\n\n')}`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
