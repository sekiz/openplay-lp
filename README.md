# OpenPlay ürün sitesi

Astro ile kurulmuş, çok dilli tek sayfalık ürün sitesi. Hero, ajansın katmanlı sahnelerini kullanır; hareketlerin tamamı bu projededir.

Kaynak dil İngilizcedir ve kökte (`/`) yayınlanır. Türkçe `/tr/` altındadır.

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:4321
npm run i18n:check  # dil dosyalarını denetle
npm run build    # önce i18n denetimi, sonra dist/ klasörüne statik çıktı
npm run preview  # derlenmiş çıktıyı yerelde aç
```

Node 20.3 veya üstü gerekir. Çıktı tamamen statiktir; herhangi bir statik barındırmaya (Vercel, Netlify, Cloudflare Pages, kendi sunucunuz) yüklenebilir.

## Yapı

```
src/
  pages/index.astro        Kök sayfa (İngilizce)
  pages/[lang]/index.astro Diğer diller (/tr/ …)
  i18n/index.js            Dil listesi, sözlük yükleme, yol üretme
  i18n/locales/en.js       İngilizce sözlük (kaynak)
  i18n/locales/tr.js       Türkçe sözlük
  layouts/Base.astro       <head>, yazı tipleri, genel stiller, ikon sembolleri
  components/
    Home.astro             Sayfanın tamamı: bölümleri dizer, seçilen dilin sözlüğünü dağıtır
    LangSwitch.astro       Dil değiştirici
    Hero.astro             Üç sekmeli hero; sahneleri data/scenes.js'ten üretir
    StickyNav.astro        Hero'dan sonra beliren gezinme çubuğu
    SdkBar.astro           SDK girişleri ve seçili sekmenin panel kaydı
    Showcase.astro         Ürün penceresi: ödülün oyundan panele izi
    HowItWorks.astro       Üç adım
    Player.astro           Oyuncu ve ilerleme
    Economy.astro          Eşyanın katalogdan envantere izi; mağaza, satın alma, bakiye
    Social.astro           Skor tablosu, sohbet, bildirim
    Directory.astro        Özellik dizini
    Developers.astro       Unity ve TypeScript girişleri, MCP, ikincil rehberler
    Closing.astro          Kapanış çağrısı ve altbilgi
    Sprite.astro           <use href="#..."> ile kullanılan ikon sembolleri
  data/scenes.js           Hero sahnelerinin yerleşimi: katman konumları, gölge, iğne noktası (metinler sözlükte)
  scripts/
    hero.js                Sahne ölçekleme, sekme geçişi, bildirim kartı, paralaks, ışık zerreleri
    threads.js             Noktalı iz çizgileri
    sections.js            Ürün penceresi animasyonu ve kaydırmayla tetiklenen hareketler
    util.js                Ortak yardımcılar
  styles/
    tokens.css             Renkler, yazı tipleri, gölgeler (ajansın tokenları dahil)
    base.css               Bileşenler ve masaüstü düzeni
    hero.css               Hero ve mobil hero düzeni
    motion.css             Bölüm hareketleri
    responsive.css         Tablet ve mobil kırılımları
public/
  assets/                  Sahne katmanları (WebP): <sahne>-bg, -sub, -fg
  icons/                   Ajansın SVG ikonları
  fonts/                   Inter (SIL OFL 1.1, lisans metni yanında) ve Geist Mono
```

## Diller ve yerelleştirme

Sayfadaki görünür metinlerin tamamı `src/i18n/locales/` altındaki sözlüklerden gelir; bileşenlerde sabit metin yoktur. Sözlük bölümleri bileşenlere karşılık gelir (`showcase` → `Showcase.astro`).

Bu bir kelime çevirisi değil, yerelleştirmedir. Dile göre değişenler:

| | İngilizce (`/`) | Türkçe (`/tr/`) |
|---|---|---|
| Para birimi adları | Coins, Gems | Akçe, Sedef |
| Sayı biçimi | 1,370 | 1.370 |
| Saat | 2:32 PM | 14:32 |
| Tarih | Nov 5, November 19 | 5 Kas, 19 Kasım |
| Oyun adları | Coast Rally, Mountain Trail, Orbit Pinball | Kıyı Rallisi, Dağ Rotası, Yörünge Pinball |
| Kullanıcı adları | galeforce, northwind, sirocco | meltemruzgar, karayel, lodoscu |
| Kimlikler ve kod örnekleri | item_sprint_badge, "coast-rally" | item_sprint_rozeti, "kiyi-rallisi" |

Animasyonla sayılan değerler (bakiye, skor) sayfanın `<html lang>` değerine göre biçimlenir. Her sayfa `hreflang` ve `canonical` etiketlerini üretir; adreslerin tam olması için `astro.config.mjs` içinde `site` tanımlanmalıdır.

**Yeni dil eklemek:**

1. `src/i18n/locales/en.js` dosyasını `<kod>.js` olarak kopyalayıp yerelleştirin.
2. `src/i18n/index.js` içinde `locales`, `dictionaries` ve `localeTags` alanlarına ekleyin.
3. `astro.config.mjs` içindeki `i18n.locales` listesine ekleyin.
4. `npm run i18n:check` çalıştırın.

**Denetim (`npm run i18n:check`)** şunları doğrular ve hata varsa derlemeyi durdurur: her dilde aynı anahtarlar, boş değer olmaması, bileşenlerde kullanılan her anahtarın sözlükte bulunması, kullanılmayan anahtar olmaması ve sayıların diller arasında aynı olması (yalnızca binlik ayracı ve saat biçimi değişebilir).

## Blog

Yazılar `src/content/blog/<dil>/<slug>.md` altında Markdown olarak durur. Aynı slug farklı dil klasöründe aynı yazının yerelleştirilmiş sürümüdür.

```
src/content/blog/en/cloud-saves-done-right.md   →  /blog/cloud-saves-done-right/
src/content/blog/tr/cloud-saves-done-right.md   →  /tr/blog/cloud-saves-done-right/
```

Bir yazının Türkçesi yoksa `/tr/blog/` dizininde İngilizcesi "şimdilik yalnızca İngilizce" notuyla listelenir ve o sayfanın `canonical` adresi İngilizce yazıya gider; böylece yinelenen içerik oluşmaz.

**Yeni yazı eklemek:** klasöre bir `.md` dosyası koyun. Zorunlu alanlar (`src/content.config.ts` şemasıyla derlemede doğrulanır):

| Alan | Açıklama |
|---|---|
| `title` | En çok 90 karakter. |
| `description` | 70–170 karakter; arama sonucu ve paylaşım kartı metni. |
| `pubDate`, `updatedDate` | Yayın ve güncelleme tarihi. |
| `tags`, `order` | Etiketler ve dizindeki sıra (1 öne çıkan yazıdır). |
| `takeaways` | 2–5 maddelik özet; yazının başında görünür. |
| `faq` | Soru-cevap listesi; sayfada ve FAQPage şemasında yer alır. |
| `author` | Varsayılan "OpenPlay Team". Gerçek bir yazar adı verilebilir. |
| `draft` | `true` ise yayınlanmaz. |

Bileşenler `src/components/blog/`, stil `src/styles/blog.css`, liste mantığı `src/lib/blog.js`.

## SEO ve GEO

Arama motorları ve yapay zekâ yanıt motorları için derlemede üretilenler:

| Adres | İçerik |
|---|---|
| `/sitemap.xml` | Ana sayfalar ve blog, `hreflang` alternatifleriyle. Yalnızca gerçekten çevrilmiş yazı sürümleri listelenir. |
| `/robots.txt` | Herkese açık; GPTBot, ClaudeBot, PerplexityBot, Google-Extended gibi yapay zekâ tarayıcılarına açık izin. `/lab/` kapalı. |
| `/rss.xml` | Blog akışı. |
| `/llms.txt` | Yapay zekâ asistanları için sitenin kısa haritası: ürün özeti, yetenekler, yazı listesi. |
| `/llms-full.txt` | Tüm yazıların düz metni, tek dosyada. |

Her sayfada: `canonical`, `hreflang`, Open Graph ve Twitter kartı etiketleri, `robots` etiketi. Yapılandırılmış veri (`src/lib/seo.js`): ana sayfada `Organization`, `WebSite`, `SoftwareApplication`; blog dizininde `Blog` ve `BreadcrumbList`; yazılarda `BlogPosting`, `BreadcrumbList` ve `FAQPage`.

Yazılar yanıt motorlarında alıntılanmaya uygun kurulur: başta tanım cümlesi ve "Key takeaways" özeti, soru biçiminde başlıklar, karşılaştırma tabloları, sonda kısa ve kendi başına anlaşılır SSS yanıtları.

**Yayından önce:** `astro.config.mjs` içindeki `site` yer tutucusunu (`https://openplay.example`) gerçek alan adıyla değiştirin ya da `SITE_URL` ortam değişkenini verin; yukarıdaki tüm adresler bundan üretilir. `public/og.jpg` paylaşım görselidir. `SoftwareApplication` şemasına fiyat, puan ya da sürüm bilgisi doğrulanmadan eklenmemelidir.

## Yaratıcı yön prototipleri

Yaratıcı ajans briefindeki iki yön, aynı demo verisiyle çalışan prototip olarak `/lab/` altında durur (arama motorlarına kapalı):

| Adres | Yön | Ne gösterir |
|---|---|---|
| `/lab/a/` | A: oyundan panele tek kesintisiz sahne | Açılışta oyun ve panelin başlangıç durumu. "Play the demo" finiş → ödül → panel sırasını oynatır; rozet oyundan envanter satırına uçar, bakiye 1.250'den 1.370'e sayar. `R` tuşu yeniden oynatır. |
| `/lab/b/` | B: oyun ve stüdyo yan yana | Üç oyun arasında seçim (tıklama, ok tuşları, dokunmatik kaydırma). Her seçimde sahne ve paneldeki sonuç birlikte değişir: ödül ve bakiye, bulut kaydı, skor tablosu. |

Türkçe sürümleri `/tr/lab/a/` ve `/tr/lab/b/` altındadır. Kaynaklar: `src/components/lab/`, `src/scripts/lab-a.js`, `lab-b.js`, `src/styles/lab.css`. Azaltılmış hareket açıkken iki prototip de sonucu doğrudan gösterir.

## Hero nasıl çalışır

Her sahne 1440×810 tasarım uzayında durur: arka plan, ana nesne (kendi temas gölgesiyle) ve ön plan. `hero.js` her sahneyi ekrana göre ölçekler:

- 900 px ve üstü: sahne sağa yaslı olarak alanı kaplar, metin solda kalır.
- 900 px altı: metin üstte, sahne ana nesne ekranın alt-orta bölümüne gelecek şekilde çerçevelenir.

Bildirim kartının iğnesi her karede nesnenin kendisinden hesaplanır (`scenes.js` içindeki `focus`), bu yüzden nesne hareket etse de ucu yerinde kalır.

Yeni bir sahne eklemek için `public/assets/` altına üç katmanı koyun, `scenes.js` dosyasına yerleşim kaydını, her dil sözlüğünde `hero.scenes` dizisine de metinleri ekleyin.

## Hareket ve erişilebilirlik

- Sekmeler 6,5 saniyede bir kendiliğinden ilerler; ilk tıklama ya da klavye kullanımında durur. Sol/sağ ok, Home ve End desteklenir.
- `prefers-reduced-motion` açıkken tüm animasyonlar ve otomatik geçiş kapanır, içerik son hâliyle görünür.
- JavaScript kapalıyken sayfa statik olarak okunur.

## Yayından önce

- **Bağlantılar:** Düğmeler ve rehber bağlantıları sayfa içi çapalara gidiyor. Dokümantasyon ve hızlı başlangıç adresleri kesinleşince güncellenmeli.
- **Kod örnekleri temsili:** `@openplay/sdk` paket adı ve API çağrıları gerçek SDK ile değiştirilmeli.
- **Panel ekranları temsili:** Gerçek panel görüntüleri geldiğinde `Showcase.astro` ve ilgili bölümler güncellenmeli.
- **Görseller:** Sahneler yapay zekâ ile üretilmiştir (bkz. ajansın `legal/Uretim-ve-haklar.md` dosyası). Nesnelerin altındaki temas gölgeleri bu projede çizilmiştir; ajans gölgeleri resmin içinde düzelttiğinde `scenes.js` içindeki `shadow` alanları kaldırılabilir.
- **`astro.config.mjs`:** Yayın adresi belli olunca `site` alanı eklenmeli.

## Hero sahneleri (altı oyun)

`src/data/scenes.js` içinde altı sahne var. İlk üçü ajansın katmanlı dosyalarıdır (`-bg`, `-sub`, `-fg`). Son üçü (`town`, `gate`, `run`) tek parça görseldir ve `flat: true` ile işaretlidir:

- `public/assets/<id>-bg.webp`: görselin kendisi (1440×810).
- `public/assets/<id>-occ.webp`: dev başlığın önünden geçen kısmın maskeli kopyası (y 170–470). Görsel değişirse bu dosya yeniden üretilmelidir; ajans katmanlı dosya gönderirse gerek kalmaz.
- `sub` yalnızca mobil çerçeveleme ve bildirim iğnesi için sanal bir kutudur, `focus` iğnenin kutu içindeki yeridir.
- `tint` sahnenin sol tarafındaki karartmanın rengidir (görselin kendi koyu tonu).

Yeni sahne eklemek için: görseller + `scenes.js` satırı + iki sözlükte `hero.scenes` girdisi + `public/icons/<icon>.svg` ve `Hero.astro` içindeki sekme ikonu.

## Renkler

Arayüz zemini nötr mürekkep (`--petrol: #171512`, ad geriye dönük uyum için duruyor), kâğıt `#FAF8F2`, fildişi `#FFF4DB`, tek vurgu rengi amber `#FFB14D`. Yeşil yalnızca "başarılı" durum etiketlerinde (`--ok`) kullanılır.
