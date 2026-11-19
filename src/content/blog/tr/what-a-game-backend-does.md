---
title: "Oyun arka ucu ne iş yapar, ne zaman gerekir?"
description: "Oyun arka ucu servislerinin sade bir haritası: hesaplar, bulut kaydı, ekonomi, skor tabloları ve gerçek zamanlı servisler. Oyununun önce hangisine ihtiyacı var?"
pubDate: 2026-11-19
tags: ["Temeller", "Oyun arka ucu"]
order: 1
takeaways:
  - "Oyun arka ucu, oyuncuyu hatırlayan ve kuralları uygulayan sunucu tarafı servislerdir: hesaplar, kayıtlar, ekonomi, skor tabloları ve gerçek zamanlı mesajlaşma."
  - "Bir şeyin yeniden kurulumdan sonra da durması, oyuncular arasında paylaşılması ya da hileden korunması gerektiği anda arka uca ihtiyacın vardır."
  - "Hesaplar ve bulut kaydıyla başla; ekonomi ve sosyal özellikleri tasarımın gerektirdiğinde ekle."
faq:
  - q: "Oyun arka ucu nedir?"
    a: "Oyun arka ucu, oyuncu verisini saklayan ve oyun kurallarını oyuncunun cihazı dışında uygulayan sunucu tarafı yazılımdır. Genellikle hesapları, bulut kaydını, envanter ve para birimlerini, skor tablolarını ve sohbet gibi gerçek zamanlı özellikleri kapsar."
  - q: "Tek oyunculu bir oyunun arka uca ihtiyacı var mı?"
    a: "Yalnızca ilerlemenin cihazlar arasında taşınması gerekiyorsa ya da eşya satıyor, skor tablosu tutuyorsan. Kayıtları yerelde duran, tamamen çevrimdışı bir oyun arka uç olmadan yayınlanabilir."
  - q: "Önce neyi kurmalıyım?"
    a: "Önce misafir girişli oyuncu hesaplarını, ardından bulut kaydını. Envanterden skor tablosuna kadar geri kalan her şey sağlam bir oyuncu kimliğine bağlanır."
---

**Oyun arka ucu** (backend), oyununun oyuncunun cihazında çalışmayan kısmıdır. Oyuncunun kim olduğunu, neye sahip olduğunu ve nereye kadar geldiğini hatırlar; istemciye emanet edemeyeceğin kuralları da o uygular. Bu rehber parçaların haritasını çıkarıyor ve oyununun şu anda hangilerine ihtiyacı olduğuna karar vermene yardım ediyor.

## Oyun arka ucunun beş işi

Arka uç özelliklerinin neredeyse tamamı beş işten birine girer.

1. **Kimlik.** Bu oyuncu kim? Misafir girişi, e-posta ya da OAuth hesapları, oturumlar ve misafirin kalıcı hesaba bağlanması.
2. **Kalıcılık.** Yeniden kurulumdan sonra ne kalmalı? Karakterler, ilerleme ve bulut kaydı.
3. **Ekonomi.** Oyuncu neye sahip? Eşyalar, envanter, para birimleri, mağaza, satın almalar ve ödüller.
4. **Rekabet ve topluluk.** Oyuncular nasıl buluşur? Skor tabloları, yarışmalar, sohbet ve bildirimler.
5. **Canlı yönetim.** Yeni sürüm çıkarmadan neyi değiştirebilirsin? Oyun kuralları, içerik grupları, sunucu saati ve zamanlanmış etkinlikler.

Bu beş işin üstünde bir stüdyo paneli durur. Ekibin bir oyuncuyu bulup eşya verebilir ya da bakiyeyi düzeltebilir; sorgu yazması gerekmez.

## Ne zaman gerekir?

Şu testi uygula. Aşağıdakilerden biri doğruysa arka uca ihtiyacın var:

- **Yeniden kurulumdan sonra da durmalı.** Yalnızca cihazda duran ilerleme, cihazla birlikte kaybolur.
- **Paylaşılıyor.** Skor tablosu ya da sohbet kanalı ancak oyuncular arasında var olur.
- **Hile yapmaya değer.** Bir değer satılabiliyor, takas edilebiliyor ya da sıralanabiliyorsa, ona istemci karar veremez.

Kayıtları yerelde duran bir game jam oyunu bu üçünden hiçbirine girmez; sorun değil. Oyun içi parası olan bir mobil oyun ise ilk günden üçüne de girer.

## Önce neyi kurmalı?

Sıra önemlidir, çünkü sonraki sistemler öncekilere dayanır.

| Adım | Servis | Neden burada |
|---|---|---|
| 1 | Misafir girişi ve hesaplar | Diğer her kaydın ait olacağı bir oyuncu gerekir. |
| 2 | Bulut kaydı | Eksikliğini oyuncunun ilk fark ettiği şeydir. |
| 3 | Envanter ve para birimleri | Mağazadan ve ödülden önce gerekir. |
| 4 | Skor tabloları ve yarışmalar | Kimlik sağlamsa eklemesi kolaydır. |
| 5 | Gerçek zamanlı özellikler | İşletmesi en zahmetli olanıdır; tasarım gerektirdiğinde ekle. |

## OpenPlay bunun neresinde?

OpenPlay bu işleri tek platformda toplar: oyuncu hesapları, bulut kaydı, eşyalar ve ekonomi, skor tabloları, sohbet, bildirimler ve gerçek zamanlı servisler tek bir stüdyo panelinden yönetilir. Oyununu Unity ya da TypeScript SDK'sıyla bağlar, ilk oyuncuyu panelde görürsün. Bu blogun geri kalanı her işi bir kat daha derinden anlatıyor.
