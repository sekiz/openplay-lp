---
title: "Yapay zekâ ile oyun mu yapıyorsun? Arka ucu yine doğru kurman gerek"
description: "Yapay zekâ kod asistanları bir öğleden sonrada oynanabilir oyun çıkarabiliyor. Güvenle uyduramadıkları kısım hangisi ve asistana gerçek bir arka uç nasıl verilir?"
pubDate: 2026-11-19
tags: ["Yapay zekâ ile oyun geliştirme", "MCP"]
order: 2
takeaways:
  - "Yapay zekâ asistanları istemci kodunda hızlıdır; paylaşılan, kalıcı ve güvenilir olması gereken durumda zayıftır."
  - "Asistanın oyununun içinde bir veritabanı uydurmasına izin verme; ona belgelenmiş API'si olan bir arka uç ver."
  - "MCP ve oyuna özel AGENTS.md sayesinde asistan kataloğunu ve kurallarını tahmin etmez, okur."
faq:
  - q: "Yapay zekâ asistanı benim için oyun arka ucu yazabilir mi?"
    a: "Üretebilir, ama güvenliği, ölçeklenmesi ve veri taşımaları o andan sonra senin sorumluluğundadır. Küçük ekiplerin çoğu için asistanın hazır bir arka ucu SDK üzerinden bağlaması daha güvenlidir."
  - q: "Oyun geliştirmede MCP nedir?"
    a: "MCP (Model Context Protocol), yapay zekâ asistanının araç çağırması ve veri okuması için standart bir yoldur. MCP sunan bir oyun arka ucu, asistanın eşyaları, kuralları ve oyuncuları doğrudan incelemesini sağlar."
  - q: "AGENTS.md nedir?"
    a: "AGENTS.md, kod asistanlarına projenin nasıl çalıştığını anlatan düz bir metin dosyasıdır: kurallar, komutlar ve kısıtlar. Oyuna özel olanı oyununun sistemlerini tarif eder, asistan da tahmin yürütmeyi bırakır."
---

Yapay zekâ kod asistanları küçük oyunların yapılış biçimini değiştirdi. Bir mekaniği tarif ediyorsun, oynanabilir bir prototip çıkıyor. Değişmeyen şey, gerçek oyuncuların ilerlemesini koruyabilmek için prototipin ihtiyaç duyduğu şeylerin listesi; o liste de sunucuda duruyor.

## Asistanın iyi yaptığı işler

Asistanlar geri bildirimin anında geldiği yerde güçlüdür. Hareket, arayüz, shader, bölüm mantığı ve araçlar senin makinende çalışır; yanlış cevap hemen görünür ve bir sonraki istem onu düzeltir.

## Uydurma kodun can yaktığı yer

Sorun, **paylaşılan, kalıcı ve güvenilir** olması gereken durumda başlar.

- **Paylaşılan.** Yerel bir dosyaya yazılan skor tablosu, skor tablosu değildir.
- **Kalıcı.** Asistanın salı günü uydurduğu kayıt biçimi, pazartesi yazdığı dosyayı açamayabilir.
- **Güvenilir.** Parayı istemci ekliyorsa, hata ayıklayıcısı olan oyuncu daha fazlasını ekler.

Bu hatalar sessizdir. Oyun senin editöründe çalışır, ellinci oyuncuda bozulur.

## Asistana boş sayfa değil, arka uç ver

Güvenilir yöntem, asistandan altyapı uydurmasını istemeyi bırakıp hazır bir altyapıyı bağlamasını istemektir.

1. **Önce arka ucu seç.** İhtiyacın olan servisleri belirle: hesaplar, bulut kaydı, envanter, skor tabloları.
2. **Asistana SDK'yı göster.** Unity ve TypeScript SDK'ları ona serbest ağ kodu yerine tipli çağrılar verir.
3. **Oyunu AGENTS.md'de tarif et.** Eşyalarını, para birimlerini, kurallarını ve yalnızca sunucuda olması gerekenleri yaz.
4. **MCP ile bağlan.** MCP bağlantısıyla asistan gerçek kataloğu okur ve kendi işini denetleyebilir.

"Kataloğa Sprint rozeti ekle, nadirliği nadir olsun" gibi bir istem o zaman bir betiğe gömülü sabit değil, stüdyo panelinde görebildiğin gerçek bir eşya oluşturur.

## Sürümü paylaşmadan önce kısa bir kontrol listesi

- Oyuncu oyunu silip yeniden kurduğunda ilerlemesi duruyor mu?
- Her para değişikliğini sunucu mu yapıyor?
- Tek bir oyuncuyu bulup neye sahip olduğunu görebiliyor musun?
- Asistan hangi işlemlerin yalnızca sunucuda yapılacağını biliyor mu?

## OpenPlay bunun neresinde?

OpenPlay bu iş akışı için tasarlandı. Arka uç servislerini, Unity ve TypeScript SDK'larını, kod asistanları için MCP erişimini ve oyuna özel AGENTS.md'yi sunar; asistan gerçek oyun verinle çalışır. Yapay zekâ destekli geliştirmenin hızını korursun, elinde de oyuncularını hatırlayan bir oyun olur.
