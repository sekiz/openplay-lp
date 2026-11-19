---
title: "Çıkış gününde ayakta kalan skor tabloları"
description: "Skor tablosunu adil ve hızlı tutan tasarım kararları: skor gönderimi, zaman pencereleri, eşitlik kuralları ve şüpheli skorların ele alınması."
pubDate: 2026-11-19
tags: ["Skor tabloları", "Yarışmalar"]
order: 7
takeaways:
  - "İstemciden gelen nihai skoru denetlemeden kabul etme; koşunun verilerini gönder, skoru sunucu hesaplasın ya da doğrulasın."
  - "Süreli tablolar ve yarışmalar yeni oyunculara ulaşılabilir bir hedef verir."
  - "Her oyuncuya yalnızca ilk onu değil, kendi sırasını ve çevresindeki sıraları göster."
faq:
  - q: "Skor tablosunda hile nasıl engellenir?"
    a: "Skorları sunucuda, oyunda mümkün olana göre doğrula, her skoru kimliği doğrulanmış bir oyuncuya bağla ve aykırı değerleri herkese görünmeden önce incele."
  - q: "Skor tablosu ile yarışma arasındaki fark nedir?"
    a: "Skor tablosu oyuncuları bir skora göre sıralar. Yarışma, başlangıcı ve bitişi olan, genellikle son sıralamaya göre ödül veren bir skor tablosudur."
  - q: "Eşit skorlar nasıl sıralanmalı?"
    a: "Tek bir kural seç ve yaz. Yaygın tercih, skora önce ulaşan oyuncunun üstte yer almasıdır."
---

Skor tablosu, tarif etmesi en kolay sosyal özelliktir ve yanlış kurması en kolay olanlardan biridir. Oyuncular çıkıştan dakikalar sonra ona bakar; tepesinde imkânsız skorlar duran bir tablo onlara bu oyunda yarışmaya değmeyeceğini söyler.

## Gönderilen skora güvenme

İstemci "skorum 17.105" deyip bunun olduğu gibi kaydedilmesini bekleyememeli. Daha güvenli iki yöntem var:

- **Sunucu hesaplar.** Oyun, koşunun verilerini gönderir; skoru sunucu çıkarır.
- **Sunucu doğrular.** Oyun bir skor gönderir; sunucu onu sınırlarla karşılaştırır: saniye başına en yüksek puan, etap uzunluğu, eldeki eşyalar.

İki durumda da skor, kimliği doğrulanmış bir oyuncuya ve bir oturuma bağlanır.

## Zaman pencereleri kullan

Tüm zamanların tablosu ilk haftada belli olur. Sıfırlanan tablolar ekle:

| Tablo | Amacı |
|---|---|
| Günlük ya da haftalık | Her oyuncuya yeni bir şans verir. |
| Sabit tarihli yarışma | Bir etkinlik yaratır, son sıralamaya göre ödül verir. |
| Tüm zamanlar | Uzun süreli oyuncuları onurlandırır. |

Yarışma; başlangıcı, bitişi ve ödülleri olan bir skor tablosudur. Başlangıç ve bitiş için sunucu saatini kullan.

## Oyuncuların soracağı kurallara karar ver

1. **Eşitlik.** Genellikle önce yapılan skor üstte yer alır.
2. **En iyi mi, en son mu?** Tabloların çoğu her oyuncunun en iyi skorunu tutar.
3. **Oyuncu başına tek kayıt.** Yoksa ilk on tek kişiden oluşur.

Kuralları oyunun içinde yaz. Kural görünür olduğunda itirazlar kısa sürer.

## Oyuncuya nerede durduğunu göster

İlk on, on kişiyi ilgilendirir. Geri kalan herkes kendi sırasını, hemen üstündeki oyuncuları ve bir sonraki sıraya ne kadar kaldığını görmek ister. "5. sıradan 3. sıraya yükseldin" bildirimi, "Skor tablosu güncellendi" bildiriminden iyidir.

## Şüpheli skorları sessizce ele al

Aykırı değerleri görür görmez silme, incelemeye al. İşaretlenen skoru biri bakana kadar herkese açık tablodan uzak tut. Kanıtı sakla, çünkü oyuncu sana yazabilir.

## OpenPlay bunun neresinde?

OpenPlay skor tabloları ve yarışmalar sunar; sohbet ve bildirimler aynı oyuncu kaydını kullanır, böylece bir sıra değişikliği oyuncunun telefonuna ulaşabilir. Stüdyo paneli bir yarışmanın sıralamasını değiştikçe gösterir; gerçek zamanlı servis rehberleri bağlantıyı, yeniden bağlanmayı ve sınırları anlatır.
