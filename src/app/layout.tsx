import type { Metadata } from 'next';
import { DM_Serif_Display, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { baseOpenGraph, baseTwitter } from '@/lib/metadata';

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arrendador.co'),
  title: {
    default: 'ArrendadorCO - Guía para Arrendadores en Colombia',
    template: '%s | ArrendadorCO',
  },
  description:
    'Información práctica sobre contratos de arriendo, actas de entrega y manejo de inquilinos morosos en Colombia.',
  openGraph: {
    ...baseOpenGraph(),
    title: 'ArrendadorCO - Guía para Arrendadores en Colombia',
    description:
      'Información práctica sobre contratos de arriendo, actas de entrega y manejo de inquilinos morosos en Colombia.',
  },
  twitter: {
    ...baseTwitter(),
    title: 'ArrendadorCO - Guía para Arrendadores en Colombia',
    description:
      'Información práctica sobre contratos de arriendo, actas de entrega y manejo de inquilinos morosos en Colombia.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSerif.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-ivory text-charcoal antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
