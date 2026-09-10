import type { Metadata } from 'next';
import { Outfit, Space_Mono } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ variable: '--font-outfit', subsets: ['latin', 'latin-ext'] });
const spaceMono = Space_Mono({ variable: '--font-space-mono', subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://esporakademisi.com'),
  title: 'Espor Akademisi | Oyunun Ötesine Geç',
  description: 'Stadyumu kaydırarak kur, profesyonel oyuncu ekipmanlarını keşfet ve Espor Akademisi deneyimine katıl.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Espor Akademisi | Oyunun Ötesine Geç',
    description: 'Stadyumu kur, profesyonel oyuncu sistemini keşfet ve oyunun ötesine geç.',
    type: 'website',
    locale: 'tr_TR',
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: 'Espor Akademisi arenası' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Espor Akademisi | Oyunun Ötesine Geç',
    description: 'Stadyumu kur, profesyonel oyuncu sistemini keşfet ve oyunun ötesine geç.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body className={outfit.variable + ' ' + spaceMono.variable}>{children}</body></html>;
}
