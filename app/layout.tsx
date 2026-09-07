import type { Metadata } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const spaceMono = Space_Mono({ variable: '--font-space-mono', subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://esporakademisi.com'),
  title: 'Espor Akademisi — Oyunun Ötesine Geç',
  description: 'Espor Akademisi: stadyumu ve profesyonel oyuncu ekipmanlarını kaydırma deneyimiyle keşfet.',
  openGraph: {
    title: 'Espor Akademisi — Oyunun Ötesine Geç',
    description: 'Stadyumu kur, oyuncu ekipmanlarını keşfet ve oyunun ötesine geç.',
    type: 'website',
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: 'Espor Akademisi esports arena' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Espor Akademisi — Oyunun Ötesine Geç',
    description: 'Stadyumu kur, oyuncu ekipmanlarını keşfet ve oyunun ötesine geç.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body className={`${inter.variable} ${spaceMono.variable}`}>{children}</body></html>;
}
