# Espor Akademisi

Espor Akademisi, espor kültürünü, oyuncu gelişimini ve turnuva deneyimini tek bir dijital ekosistemde buluşturmak için tasarlanan 3D scroll web sitesidir.

Ana sayfa, ziyaretçiyi kaydırma hareketiyle önce parçaları ayrılmış bir espor stadyumunun montajına, ardından profesyonel oyuncu ve ekipmanlarının birleştiği etkileşimli bir loadout sahnesine taşır.

## Ana sayfa deneyimi

- Parçalı stadyum görseli scroll ilerledikçe tek bir arenaya dönüşür.
- Oyuncu, forma, kulaklık, mouse ve klavye ayrı katmanlardan birleşir.
- Oyuncu alanındaki ekipman noktaları tıklanabilir bilgi pencereleri açar.
- Responsive tasarım masaüstü ve mobil ekranlara uyarlanmıştır.
- Reduced-motion tercihi olan kullanıcılar için hareketler azaltılır.
- Site metinleri Türkçedir ve marka dili Espor Akademisi etrafında kuruludur.

## Teknoloji

- React
- Vinext
- Vite
- Node.js
- TypeScript
- Tailwind CSS ve proje içi CSS tasarım sistemi
- Lucide ikonları
- Vercel deployment

## Yerel çalıştırma

Gereksinimler:

- Node.js 22 veya üzeri
- npm

Kurulum ve geliştirme sunucusu:

~~~powershell
npm.cmd install
npm.cmd run dev
~~~

Siteyi şu adreste açın:

http://localhost:3000

Üretim derlemesini kontrol etmek için:

~~~powershell
npm.cmd run build
~~~

## Proje yapısı

- app/page.tsx — scroll sahneleri, oyuncu ekipmanı popup'ları ve ana sayfa akışı
- app/globals.css — renk token'ları, responsive düzen, animasyonlar ve erişilebilirlik kuralları
- app/layout.tsx — Türkçe metadata ve sosyal paylaşım ayarları
- public/arena-stadium.png — stadyum montaj görseli
- public/player-athlete.png — oyuncu ve loadout görseli
- CLAUDE.md — proje çalışma notları
- DESIGN_BRIEF.md — Espor Akademisi tasarım kapsamı

## Canlı adres

- https://esporakademisi.com
- https://www.esporakademisi.com

Konum: Serdivan/Sakarya

## Lisans

Bu proje www.adanzyeespor.com için özel olarak geliştirilmektedir. İçerik ve görseller izinsiz kopyalanamaz.
