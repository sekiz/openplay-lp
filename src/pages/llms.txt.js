// llms.txt: yapay zekâ asistanları için sitenin kısa, okunabilir haritası (GEO).
import { defaultLocale, useTranslations } from '../i18n/index.js';
import { getPosts } from '../lib/blog.js';

export async function GET({ site }) {
  const t = useTranslations(defaultLocale), abs = (p) => new URL(p, site).href;
  const posts = await getPosts(defaultLocale);
  const body = [
    '# OpenPlay', '', `> ${t.meta.description}`, '',
    'OpenPlay is a game backend for studios and solo developers. Games connect through the Unity SDK or the TypeScript SDK, and teams manage players, items, currencies, rewards, leaderboards and content from a studio panel. Coding assistants can work with a game through MCP and a game-specific AGENTS.md.', '',
    '## Product', `- [OpenPlay home](${abs('/')}): product overview, a worked example of a reward traced from game to studio panel, and SDK entry points`, `- [OpenPlay, Turkish](${abs('/tr/')}): the same page localized for Turkish readers`, '',
    '## Capabilities', '- Player: guest sign-in, email and password, OAuth and Google sign-in, account linking and deletion, sessions, characters, cloud save',
    '- Economy: items and inventory, currencies and balances, store, in-app purchases, rewards', '- Social and real-time: leaderboards, contests, chat, notifications, real-time connection and reconnection',
    '- Content and rules: scenes, assets and models, content groups, game rules, server time, several games in one studio',
    '- Developer tools: Unity SDK, TypeScript SDK, MCP, AGENTS.md, plugins, webhook events, BFF pattern, API keys, rate limits and versioning', '',
    '## Blog', ...posts.map((p) => `- [${p.data.title}](${abs(p.url)}): ${p.data.description}`), '',
    '## Optional', `- [Full text of all articles](${abs('/llms-full.txt')})`, `- [RSS feed](${abs('/rss.xml')})`, `- [Sitemap](${abs('/sitemap.xml')})`, '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
