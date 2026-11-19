---
title: "Kendin yaz, satın al ya da açık kaynak: oyun arka ucu nasıl seçilir?"
description: "Oyun arka ucuna sahip olmanın üç yolu, her birinin zaman ve kontrol açısından bedeli ve stüdyona hangisinin uyduğunu belirleyen sorular."
pubDate: 2026-11-19
tags: ["Açık kaynak", "Oyun arka ucu"]
order: 3
takeaways:
  - "Kendin yazmak tam kontrol verir, bakım faturasının tamamını da getirir."
  - "Barındırılan servis en hızlı başlangıçtır; fiyat ve yol haritası başkasının elindedir."
  - "Açık kaynak arka uç ikisinin arasındadır: hazır servisler, okunabilir kod ve kendin barındırma seçeneği."
faq:
  - q: "Açık kaynak oyun arka ucu nedir?"
    a: "Kaynak kodu herkese açık olan oyun arka ucudur. Kapalı bir servise bağımlı kalmak yerine nasıl çalıştığını okuyabilir, kendin barındırabilir ve genişletebilirsin."
  - q: "Oyun arka ucunu kendin barındırmak zor mu?"
    a: "İşletme yükü getirir: dağıtım, yedekleme, izleme ve güncellemeler. Biraz sunucu deneyimi olan bir ekip için yönetilebilir; veri ya da maliyet üzerinde kontrol önemliyse buna değer."
  - q: "Sonradan başka bir arka uca geçebilir miyim?"
    a: "Yalnızca oyuncu verini dışa aktarabiliyorsan ve istemci kodun bir SDK'nın ya da kendi sarmalayıcının arkasında yalıtılmışsa. Karar vermeden önce ikisini de kontrol et."
---

Arka uca ihtiyaç duyan her stüdyo sonunda üç yoldan birini seçer. Hiçbiri yanlış değildir. Her biri zaman ile kontrolü farklı bir oranda takas eder.

## Seçenek 1: kendin yaz

Sunucuları sen yazarsın, veritabanını sen seçersin, her satır senindir.

- **Kazancın:** oyununun tam ihtiyacı olan sistem; kullanmayacağın özellik yok.
- **Bedeli:** ilk özellik çalışana kadar aylar, ardından oyun yaşadığı sürece güvenlik yamaları, veri taşımaları ve nöbet.

Arka ucun kendisi oyunsa, örneğin özel bir simülasyon sunucusuysa, bu yol mantıklıdır.

## Seçenek 2: barındırılan servis satın al

Barındırılan bir oyun arka ucu hesapları, kayıtları, ekonomiyi ve skor tablolarını bir API'nin arkasında verir.

- **Kazancın:** günler içinde çalışan bir arka uç; ekibinde kimse nöbet tutmaz.
- **Bedeli:** kullanıma göre fiyat, senin seçmediğin sınırlar ve servis yön değiştirirse bir taşıma projesi.

## Seçenek 3: açık kaynak bir arka uç kullan

Açık kaynak arka uç aynı hazır servisleri sunar; kodu açıktır.

- **Kazancın:** hızlı başlangıç, kodu okuyup değiştirebilme ve istediğin yerde barındırma seçeneği.
- **Bedeli:** kendin barındırırsan işletmesi sende. Dağıtım, yedekleme ve güncelleme için zaman ayır.

## Kararı veren beş soru

1. **Nöbeti kim tutacak?** Cevap "hiç kimse" ise kendin yazma.
2. **Oyuncu verisi nerede durmak zorunda?** Kendin barındırmak, katı veri konumu koşullarını karşılar.
3. **Oyunun ne kadar alışılmadık?** Standart ihtiyaçlar hazır servislere uyar. Alışılmadık sunucu mantığı, eklenti gibi genişletme noktaları ister.
4. **Oyuncu sayısı on katına çıkınca ne olur?** O ölçekteki fiyatı ya da donanımı şimdiden sor.
5. **Nasıl ayrılırsın?** Veri dışa aktarımına ve ince bir SDK sınırına bak.

## Yan yana özet

| | Kendin yaz | Barındırılan | Açık kaynak |
|---|---|---|---|
| İlk özelliğe kadar süre | Aylar | Günler | Günler |
| Kod üzerinde kontrol | Tam | Yok | Tam |
| İşletme yükü | Tamamı sende | Yok | Kendin barındırırsan sende |
| Ayrılma maliyeti | Düşük | Yüksek | Düşük |

## OpenPlay bunun neresinde?

OpenPlay üçüncü yolu seçer. Oyuncu hesapları, bulut kaydı, ekonomi, skor tabloları ve gerçek zamanlı servisleri, bir stüdyo paneli, Unity ve TypeScript SDK'ları olan açık kaynak bir oyun arka ucudur. Kendi sunucu mantığına ihtiyaç duyduğunda bir eklenti yazar, panelden yükler ve oyundan çağırırsın. Nasıl çalıştırılacağını dokümantasyondaki barındırma ve mimari rehberleri anlatır.
