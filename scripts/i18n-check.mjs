// Dil dosyalarını denetler: anahtar eşleşmesi, boş değer, dizi uzunluğu ve bileşenlerde kullanılan anahtarlar.
// Hata varsa 1 koduyla çıkar; `npm run build` öncesinde otomatik çalışır.
import { readdirSync, readFileSync } from 'node:fs';
import { locales, defaultLocale } from '../src/i18n/index.js';

const dict = Object.fromEntries(await Promise.all(locales.map(async (l) => [l, (await import(`../src/i18n/locales/${l}.js`)).default])));
const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, `${p}${k}.`) : [[`${p}${k}`, v]]));
const base = new Map(flat(dict[defaultLocale]));
const errors = [];

for (const l of locales) {
  const m = new Map(flat(dict[l]));
  for (const k of base.keys()) if (!m.has(k)) errors.push(`${l}: eksik anahtar ${k}`);
  for (const k of m.keys()) if (!base.has(k)) errors.push(`${l}: kaynakta olmayan anahtar ${k}`);
  for (const [k, v] of m) {
    if (typeof v !== 'string' || !v.trim()) errors.push(`${l}: boş değer ${k}`);
    else if (v !== v.trim()) errors.push(`${l}: baştaki/sondaki boşluk ${k}`);
    // sayılar iki dilde de aynı olmalı (yalnızca binlik ayracı ve saat biçimi değişebilir)
    const digits = (s) => String(s).replace(/\d{1,2}:\d{2}(:\d{2})?( [AP]M)?/g, '').replace(/[^\d]/g, '');
    if (l !== defaultLocale && base.has(k) && digits(v) !== digits(base.get(k))) errors.push(`${l}: sayılar kaynakla uyuşmuyor ${k} → "${base.get(k)}" / "${v}"`);
  }
}
// bileşenlerde kullanılan {t.anahtar} ifadeleri sözlükte var mı
const NS = { Showcase: 'showcase', HowItWorks: 'how', Player: 'player', Economy: 'economy', Social: 'social', Directory: 'directory', Developers: 'developers', Closing: 'closing', StickyNav: 'nav', SdkBar: 'sdkBar' };
for (const f of readdirSync('src/components')) {
  const ns = NS[f.replace('.astro', '')]; if (!ns) continue;
  const used = new Set([...readFileSync(`src/components/${f}`, 'utf8').matchAll(/\{t\.(\w+)\}/g)].map((m) => m[1]));
  for (const k of used) if (!base.has(`${ns}.${k}`)) errors.push(`${f}: sözlükte olmayan anahtar ${ns}.${k}`);
  for (const k of Object.keys(dict[defaultLocale][ns])) if (!used.has(k)) errors.push(`${f}: kullanılmayan anahtar ${ns}.${k}`);
}
if (errors.length) { console.error(`i18n denetimi: ${errors.length} sorun\n` + errors.map((e) => '  - ' + e).join('\n')); process.exit(1); }
console.log(`i18n denetimi tamam: ${locales.length} dil, ${base.size} anahtar, sorun yok.`);
