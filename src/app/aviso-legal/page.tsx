import type { Metadata } from 'next';
import AvisoClient from './aviso-client';

export const metadata: Metadata = {
  title: 'Aviso Legal',
  alternates: { canonical: '/aviso-legal' },
  description:
    'Aviso legal, exención de responsabilidad y divulgación de afiliados de ArrendadorCO.',
};

export default function AvisoLegal() {
  return <AvisoClient />;
}
