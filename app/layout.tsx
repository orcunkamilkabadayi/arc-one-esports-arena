import type { Metadata } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const spaceMono = Space_Mono({ variable: '--font-space-mono', subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://arc-one-esports-arena.sakarya-ula-8935.chatgpt.site'),
  title: 'ARC//ONE — Enter the Next Dimension of Play',
  description: 'Step inside ARC//ONE: the esports arena and pro-grade performance system built for the world final.',
  openGraph: {
    title: 'ARC//ONE — Enter the Next Dimension of Play',
    description: 'The arena awakens. Explore the stadium, the loadout, and the world final.',
    type: 'website',
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: 'ARC//ONE esports arena' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARC//ONE — Enter the Next Dimension of Play',
    description: 'The arena awakens. Explore the stadium, the loadout, and the world final.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${spaceMono.variable}`}>{children}</body></html>;
}
