import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://arrendador.co'),
  title: {
    default: 'ArrendadorCO - Guía para Arrendadores en Colombia',
    template: '%s | ArrendadorCO',
  },
  description:
    'Información práctica sobre contratos de arriendo, actas de entrega y manejo de inquilinos morosos en Colombia.',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://arrendador.co',
    siteName: 'ArrendadorCO',
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
    <html lang="es">
      <body className={`${inter.className} bg-white text-gray-800 antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
