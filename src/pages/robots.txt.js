// Arama motorlarına ve yapay zekâ tarayıcılarına açık; prototip sayfaları kapalı.
const AI = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot'];
export function GET({ site }) {
  const lines = ['User-agent: *', 'Allow: /', 'Disallow: /lab/', 'Disallow: /tr/lab/', '', ...AI.flatMap((a) => [`User-agent: ${a}`, 'Allow: /', 'Disallow: /lab/', 'Disallow: /tr/lab/', '']), `Sitemap: ${new URL('/sitemap.xml', site).href}`, ''];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
