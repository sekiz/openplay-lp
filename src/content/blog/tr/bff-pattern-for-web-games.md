---
title: "İstemci mi, sunucu mu? Web oyunları için BFF deseni"
description: "Backend-for-frontend nedir, hangi oyun işlemleri tarayıcıda, hangileri kendi sunucunda yapılır ve API anahtarları istemci kodundan nasıl uzak tutulur?"
pubDate: 2026-11-19
tags: ["TypeScript", "Web oyunları", "Güvenlik"]
order: 8
takeaways:
  - "Tarayıcıya giden her şeyi oyuncu okuyabilir ve değiştirebilir; API anahtarları da buna dahildir."
  - "BFF (backend-for-frontend), gizli anahtarları tutan ve yetkili işlemleri yapan, senin kontrolündeki küçük bir sunucudur."
  - "Girişi ve okumaları istemcide tut; ödül verme, satın alma ve değer değiştiren her şeyi BFF'in arkasına koy."
faq:
  - q: "BFF deseni nedir?"
    a: "BFF, backend-for-frontend'in kısaltmasıdır. Tek bir istemci uygulaması için yazılmış ince bir sunucu katmanıdır. İstemci BFF'i çağırır; BFF de diğer servisleri istemcinin hiç görmediği kimlik bilgileriyle çağırır."
  - q: "Oyun arka ucunun API anahtarını web oyununa koyabilir miyim?"
    a: "Hayır. Tarayıcı kodundaki her anahtar çıkarılabilir. Yetkili anahtarları sunucuda tut, tarayıcıya yalnızca oyuncu oturumu ver."
  - q: "Tek oyunculu bir web oyununa BFF gerekir mi?"
    a: "Oyuncu oturumuyla yapılan giriş, okuma ve bulut kaydı için gerekmez. Ödül ya da satın alma gibi değer veren bir işlem olduğu anda gerekir."
---

Web oyunu, var olan en güvenilmez ortamda çalışır: oyuncunun tamamen kontrol ettiği bir tarayıcıda. **BFF deseni** (backend-for-frontend), önemli kararları oyuncunun ulaşamayacağı bir yerde tutmanın yoludur.

## Her şeyi istemcide yapmanın sorunu

Tarayıcıya gönderilen JavaScript herkese açıktır. Oyuncu onu okuyabilir, durdurabilir ve fonksiyonlarını kendi argümanlarıyla çağırabilir. Bunun iki sonucu var.

- **Gizli bilgiler sızar.** İstemci kodundaki API anahtarı, internetteki API anahtarıdır.
- **Kurallar isteğe bağlı olur.** "Ödül ver" çağrısını istemci yapabiliyorsa, oyuncu da yapabilir; istediği kadar.

## BFF nedir?

BFF, oyununa ait küçük bir sunucudur. Tarayıcı onunla konuşur; o da oyun arka ucuyla, sunucudan hiç çıkmayan kimlik bilgileriyle konuşur.

1. Oyuncu giriş yapar, tarayıcı bir **oyuncu oturumu** tutar.
2. Yetkili bir işlem için tarayıcı o oturumla BFF'ini çağırır.
3. BFF oturumu doğrular ve oyun kuralını denetler.
4. BFF arka ucu kendi **API anahtarıyla** çağırır ve sonucu döndürür.

## Hangi taraf ne yapar?

| İşlem | Nerede çalışır | Neden |
|---|---|---|
| Misafir girişi, hesap bağlama | İstemci | Yalnızca oyuncunun kendi oturumunu kullanır. |
| Profili, envanteri, skor tablosunu okuma | İstemci | Giriş yapmış oyuncu için salt okunurdur. |
| Bulut kaydı yazma | İstemci | Oyuncunun kendi ilerlemesidir. |
| Ödül ya da eşya verme | BFF | Değer üretir. |
| Satın alma doğrulama | BFF | Platform ve API gizli anahtarları gerekir. |
| Yarışma skoru gönderme | BFF | Doğrulama gerekir. |

İşe yarar bir test: hilecinin bin kez çağırmaktan keyif alacağı şey BFF'in arkasında olmalıdır.

## Uygulama notları

- **Her BFF isteğinde oturumu doğrula.** İstek gövdesinde gelen oyuncu kimliğine güvenme.
- Çerez kullanıyorsan **durumu değiştiren rotaları CSRF'ye karşı koru.**
- **Verme rotalarını idempotent yap;** yeniden denenen istek iki kez ödemesin.
- **BFF'e oyuncu başına hız sınırı koy.**

BFF birkaç sunucusuz fonksiyondan oluşabilir. İkinci bir arka uç olması gerekmez.

## OpenPlay bunun neresinde?

OpenPlay'in TypeScript SDK'sı bu ayrım için tasarlandı: giriş ve okumalar istemcide, yetkili işlemler senin sunucunda. Geliştirici dokümantasyonunda bir BFF rehberi ile API anahtarları, oturum doğrulama, CSRF, idempotentlik ve hız sınırları üzerine notlar bulunur.
