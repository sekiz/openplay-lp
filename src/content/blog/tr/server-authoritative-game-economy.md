---
title: "Sunucunun güvenebileceği bir oyun ekonomisi"
description: "Eşyalar, para birimleri, ödüller ve satın almalar nasıl tasarlanır ki oyuncu değer üretemesin ve her bakiye değişikliği açıklanabilsin?"
pubDate: 2026-11-19
tags: ["Oyun ekonomisi", "Envanter"]
order: 6
takeaways:
  - "İstemci değişiklik isteyebilir; değişikliği yalnızca sunucu uygular."
  - "Her eşyayı bir kez tanımla ve her yerde ona başvur; ödül, mağaza teklifi ve envanter satırı aynı kaydı göstersin."
  - "Her bakiye değişikliğini nedeniyle kaydet; verme isteklerini idempotent yap ki yeniden deneme iki kez ödemesin."
faq:
  - q: "Sunucu otoriteli ekonomi ne demek?"
    a: "Para birimlerindeki ve envanterdeki her değişikliğe oyun istemcisinin değil, sunucunun karar vermesi demektir. İstemci bir işlem ister ve sonucu gösterir."
  - q: "İdempotentlik nedir, ödüllerde neden önemlidir?"
    a: "İdempotent bir istek, bir kez de gönderilse birkaç kez de gönderilse aynı etkiyi yaratır. Bu özellik yoksa ağdaki bir yeniden deneme aynı ödülü iki kez verebilir."
  - q: "Uygulama içi satın almalar nasıl ele alınmalı?"
    a: "Oyuncunun bakiyesine bir şey eklemeden önce satın alma makbuzunu kendi sunucunda platformla doğrula. Bir satın almayı asla istemcinin sözüne dayanarak işleme."
---

Oyun ekonomisi bir hesap defteridir. Oyuncular kazanır, harcar ve bir şeylere sahip olur; sayıların tutması gerekir. Onları tutturan tasarım kuralı kısadır: **istemci ister, sunucu karar verir.**

## Parçaları ayrı modelle

İlk prototiplerde dört kavram birbirine karışır. Onları ayrı tut.

- **Katalog.** Her eşyanın tanımı: adı, türü, nadirliği, istiflenip istiflenmediği.
- **Envanter.** Belirli bir oyuncunun hangi eşyalardan kaç tane tuttuğu.
- **Para birimleri ve bakiye.** Oyuncunun kazanıp harcadığı sayılar ve geçmişleri.
- **Mağaza ve satın almalar.** Oyun içi parayı ya da gerçek parayı eşyayla değiştiren teklifler.

Bir eşyayı katalogda bir kez tanımla. Ödül, mağaza teklifi ve envanter satırı o kayda başvursun. O zaman eşyanın adını değiştirmek ya da nadirliğini düzeltmek tek yerde yapılır.

## Bir eşyayı baştan sona izle

Bir ralli oyunu düşün. Oyuncu kıyı etabını bitiriyor.

1. Oyun, sunucuya etabın tamamlandığını bildirir.
2. Sunucu ödül kuralına bakar: bir Sprint rozeti ve 120 Akçe, oyuncu başına bir kez.
3. Sunucu rozeti envantere ekler ve bakiyeyi 1.250'den 1.370'e çıkarır.
4. Sunucu nedenini kaydeder: *ödül, kıyı etabı finişi*.
5. İstemci sonucu gösterir.

İstemci hiçbir noktada "120 Akçe ekle" demez. Bir olayı bildirir; kural sunucuda durur.

## Her verme işlemini yeniden denemeye dayanıklı yap

Mobil ağlar yanıtları düşürür. İstemci yeniden dener ve saf bir sunucu iki kez öder. Her verme isteğine benzersiz bir anahtar ver; sunucu daha önce işlediği anahtarı yok saysın. Bu özelliğin adı **idempotentliktir** (idempotency) ve ekleyebileceğin en ucuz dolandırıcılık önlemidir.

## Satın almaları sunucuda doğrula

Uygulama içi satın almalarda makbuzu sunucuna gönder, platformla doğrula, bakiyeyi ancak ondan sonra artır. Doğrulamayı bakiye değişikliğinin yanına kaydet.

## Okunabilir bir defter tut

Her değişiklik üç soruyu yanıtlamalı: ne değişti, ne kadar değişti ve neden? Bir oyuncu desteğe yazdığında geçmişini yeniden kurmak değil, okumak istersin.

## OpenPlay bunun neresinde?

OpenPlay eşya kataloğu, oyuncu envanteri, para birimleri ve bakiyeler, mağaza, uygulama içi satın alma ve ödüller sunar. Stüdyo paneli aynı eşyayı katalogda, onu veren ödülde ve oyuncunun envanterinde, her bakiye değişikliğinin nedeniyle birlikte gösterir. Yetkili işlemler senin sunucunda yapılmalıdır; geliştirici rehberlerindeki BFF deseni bunu anlatır.
