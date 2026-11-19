---
title: "Bulut kaydını doğru kurmak: ne saklanır, kayıtlar çakışınca ne yapılır?"
description: "Bulut kaydı için pratik rehber: kayıt verisinin tasarımı, sürümleme, cihazlar arası çakışma kuralları ve oyuncu ilerlemesini bozan hatalar."
pubDate: 2026-11-19
tags: ["Bulut kaydı", "Oyuncu ilerlemesi"]
order: 5
takeaways:
  - "Bellekteki her şeyi değil, oyuncunun kararlarını ve ilerlemesini kaydet; küçük kayıt hızlı eşitlenir, daha az bozulur."
  - "İlk sürümden itibaren her kayda bir sürüm numarası koy."
  - "Çakışma kuralını bilerek seç: en yenisi geçerli, en ileri ilerleme geçerli ya da oyuncuya sor."
faq:
  - q: "Bulut kaydı nedir?"
    a: "Bulut kaydı, oyuncunun ilerlemesini hesabına bağlı olarak sunucuda saklar; ilerleme başka bir cihazda ya da yeniden kurulumdan sonra geri yüklenebilir."
  - q: "Bulut kaydı çakışmaları nasıl çözülür?"
    a: "Oyun açılırken cihazdaki kaydı sunucudakiyle karşılaştır. Tek bir kuralı tutarlı uygula: en yenisini tut, ilerlemesi fazla olanı tut ya da fark büyükse seçimi oyuncuya bırak."
  - q: "Oyun buluta ne sıklıkla kaydetmeli?"
    a: "Etap bitirmek ya da bir menüyü kapatmak gibi anlamlı anlarda, bir de duraklatma ve çıkışta kaydet. Kısa aralıklı zamanlayıcıyla kaydetmek istekleri boşa harcar ve çakışmaları artırır."
---

**Bulut kaydı**, oyuncunun ilerlemesinin sunucuda duran ve hesabına bağlı olan kopyasıdır. Kulağa dosya yüklemek gibi gelir. Uygulamada küçük bir eşitleme problemidir ve kayıt hatalarının çoğu bunu görmezden gelmekten çıkar.

## Kayda ne gireceğine karar ver

Oyuncunun kaybettiğinde üzüleceği şeyleri sakla; yeniden üretebileceğin hiçbir şeyi saklama.

- **Sakla:** tamamlanan etaplar, açılan içerik, ayarlar, karakter durumu, seçimler.
- **Saklama:** önbelleğe alınmış varlıklar, türetilmiş değerler, sunucunun zaten sahibi olduğu veriler.

Para birimleri ve envanter özel bir durumdur. Gerçek değerleri varsa doğrusu sunucunun ekonomi kayıtlarıdır; kayıt dosyası onların üzerine yazamamalıdır.

## Her kaydı sürümle

İlk sürümünde bir `version` alanı ekle. Biçim değiştiğinde her eski sürümden bir sonrakine geçiş kodu yaz. Bu alan yoksa dosyanın hangi biçimde olduğunu tahmin edersin; yanlış tahmin oyuncunun ilerlemesini bozar.

## Bir çakışma kuralı seç

Çakışma, aynı oyuncu iki cihaz kullandığında ya da çevrimdışı oynayıp yeniden bağlandığında ortaya çıkar.

| Kural | Ne zaman iyi çalışır | Risk |
|---|---|---|
| En yenisi geçerli | Oturumlar kısa ve çevrimiçiyse | Saati yanlış eski bir cihaz ilerlemenin üzerine yazabilir. |
| En ileri ilerleme geçerli | İlerleme net bir sayıysa | Kaybeden kayıttaki yan seçimler düşer. |
| Oyuncuya sor | Kayıtlar çok farklıysa | Tasarlanacak bir ekran daha. |

Hangi kaydın daha yeni olduğuna karar verirken cihaz saatini değil, **sunucu saatini** kullan.

## Doğru anlarda kaydet

Anlam taşıyan olaylarda yaz: etap bitti, satın alma tamamlandı, ayarlar kapandı, uygulama duraklatıldı. Otomatik kayıtlar için ayrı bir yuva aç ve elle yapılan kayıtları ayrı tut; otomatik kayıt, bilerek yapılmış bir kaydın yerini asla almasın.

## Kötü senaryoları dene

1. A cihazında oyna, A'yı kapatmadan B cihazını aç.
2. Bir saat çevrimdışı oyna, sonra yeniden bağlan.
3. Önceki sürümün oluşturduğu bir kaydı yükle.
4. Kaydın ortasında uygulamayı kapat.

Dördünün sonunda da oyuncunun elinde makul bir ilerleme kalıyorsa kayıtların iyi durumda.

## OpenPlay bunun neresinde?

OpenPlay bulut kayıtlarını oyuncu bazında, karakterlerle birlikte saklar ve her kaydı stüdyo panelinde boyutuyla, zamanıyla ve onu yazan platformlarla gösterir. Sunucu saatini de sunar; çakışma kuralların cihaz saatine bağlı kalmaz.
