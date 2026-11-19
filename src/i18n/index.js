/* Çok dilli altyapı.
   Yeni dil eklemek için:
   1. src/i18n/locales/<kod>.js dosyasını oluşturun (en.js ile aynı anahtarlar; eksik anahtar İngilizceye düşer).
   2. Aşağıdaki `locales` listesine ve `dictionaries` nesnesine ekleyin.
   3. astro.config.mjs içindeki i18n.locales listesine ve localeTags'e ekleyin.
   4. `npm run i18n:check` ile anahtarların eksiksiz olduğunu doğrulayın.
   Kaynak dil İngilizce kökte (/), diğerleri /<kod>/ altında yayınlanır (Türkçe: /tr/). */
import tr from './locales/tr.js';
import en from './locales/en.js';

export const defaultLocale = 'en';
export const locales = ['en', 'tr'];
const dictionaries = { tr, en };

/** BCP 47 etiketi: <html lang>, hreflang ve sayı biçimi için. */
export const localeTags = { en: 'en-US', tr: 'tr-TR' };

const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
function merge(base, over) {
  if (Array.isArray(base)) return base.map((b, i) => (over && over[i] !== undefined ? merge(b, over[i]) : b));
  if (!isObj(base)) return over === undefined ? base : over;
  const out = { ...base };
  for (const k of Object.keys(over || {})) out[k] = merge(base[k], over[k]);
  return out;
}

/** Dilin sözlüğü; eksik anahtarlar varsayılan dilden tamamlanır. */
export function useTranslations(lang = defaultLocale) {
  return lang === defaultLocale ? en : merge(en, dictionaries[lang] || {});
}

/** Sayfa yolunu dile göre üretir: localePath('en', '/') → '/en/'. */
export function localePath(lang, path = '/') {
  const p = path.startsWith('/') ? path : '/' + path;
  return lang === defaultLocale ? p : `/${lang}${p}`;
}

/** Bir dilde eksik kalan anahtarları listeler (derlemede uyarı için). */
export function missingKeys(lang, base = en, over = dictionaries[lang] || {}, prefix = '') {
  let out = [];
  for (const k of Object.keys(base)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (over[k] === undefined) out.push(key);
    else if (isObj(base[k]) || Array.isArray(base[k])) out = out.concat(missingKeys(lang, base[k], over[k], key));
  }
  return out;
}
