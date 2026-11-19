---
title: "Önce misafir girişi: oyuncu kaybettirmeyen hesap akışı"
description: "Açılışta üyelik formu neden oyuncu kaybettirir, misafir girişi ve hesap bağlama nasıl çalışır, yayından önce hangi uç durumlar çözülmeli?"
pubDate: 2026-11-19
tags: ["Oyuncu hesapları", "Kimlik doğrulama"]
order: 4
takeaways:
  - "Oyuncu misafir olarak başlasın; hesabı ancak korumaya değer bir şeyi olduğunda iste."
  - "Hesap bağlama, kalıcı kimliği mevcut misafir kaydına ekler; ilerleme kopyalanmaz ve kaybolmaz."
  - "Çakışma kuralına yayından önce karar ver: bağlanan hesabın zaten bir kaydı varsa ne olacak?"
faq:
  - q: "Oyunda misafir girişi nedir?"
    a: "Misafir girişi, ilk açılışta form doldurtmadan otomatik olarak bir oyuncu kaydı oluşturur. Oyuncu cihaza bağlı bir kimlik alır ve hemen oynamaya başlar."
  - q: "Hesap bağlama nedir?"
    a: "Hesap bağlama, misafir oyuncuyu e-posta, OAuth ya da Google gibi kalıcı bir giriş yöntemine bağlar. Oyuncu kimliği aynı kalır; envanter, karakterler ve kayıtlar da ona bağlı kalır."
  - q: "Misafir oyuncu oyunu silerse ne olur?"
    a: "Hesabını bağlamamış misafir genellikle erişimini kaybeder, çünkü kimlik cihazda duruyordu. Bağlama teklifini anlamlı bir anda yapmanın asıl nedeni budur."
---

Yeni bir oyuncuyu kaybetmenin en hızlı yolu, oyunun ilk dakikasından önce üyelik formu göstermektir. **Misafir girişi** o formu kaldırır. **Hesap bağlama** ise oyuncunun kazandıklarını koruyabilmesini sağlar. İkisi birlikte, günümüz oyunlarının varsayılan kimlik akışıdır.

## Akış nasıl işler?

1. **İlk açılış.** Oyun arka uçtan bir misafir oyuncu ister. Arka uç bir kayıt oluşturur, oyuncu kimliğini ve oturumu döndürür.
2. **Oyun.** Karakterler, ilerleme ve envanter o oyuncu kimliğine bağlanır.
3. **Kalmak için bir neden.** Bir dönüm noktasından sonra oyun, ilerlemeyi korumayı teklif eder.
4. **Bağlama.** Oyuncu e-posta, OAuth ya da Google ile giriş yapar. Arka uç bu girişi *aynı* oyuncu kaydına ekler.
5. **Geri dönüş.** Oyuncu yeni cihazında giriş yapar, aynı kimliği ve dolayısıyla aynı veriyi alır.

Önemli ayrıntı dördüncü adımdadır. Bağlama ikinci bir hesap açıp veriyi oraya kopyalamaz; var olan kayda bir giriş bilgisi ekler.

## Ne zaman sormalı?

Oyuncunun kaybedecek bir şeyi olduğu anda sor:

- eğitim bölümünü ya da ilk etabı bitirdikten sonra,
- nadir bir eşya kazandıktan sonra,
- bir satın almadan önce.

İlerlemeye bağlı bir teklif hizmet gibi görünür. Açılış ekranındaki teklif geçiş ücreti gibi görünür.

## Yayından önce çözülmesi gereken uç durumlar

| Durum | Karar verilecek şey |
|---|---|
| Bağlanan hesabın zaten bir kaydı var | Hangisi geçerli olacak, yoksa oyuncu mu seçecek? |
| Oyuncu çıkış yapıyor | Cihazda misafir kimliği kalacak mı, yoksa temiz bir başlangıca mı dönülecek? |
| Hesap silme | Neler silinecek, oyuncu bunu nasıl talep edecek? |
| Birden çok cihaz | Oturumlar nasıl listelenecek ve iptal edilecek? |

## Doğrulamayı sunucuda tut

Oturum belirteci, oyuncunun kim olduğunu ancak sunucun onu denetliyorsa kanıtlar. Web oyunları oturumu sunucu tarafında doğrulamalı ve durumu değiştiren istekleri CSRF'ye karşı korumalıdır. İstemciyi tanık değil, ekran olarak gör.

## OpenPlay bunun neresinde?

OpenPlay misafir girişini, e-posta ve parolayı, OAuth ve Google ile girişi, hesap bağlamayı ve silmeyi, oturum yönetimini destekler. Stüdyo panelinde her oyuncunun hesap geçmişi, karakterleri ve bulut kayıtları tek profilde görünür; destek ekibi oyuncunun neyi ne zaman bağladığını görebilir.
