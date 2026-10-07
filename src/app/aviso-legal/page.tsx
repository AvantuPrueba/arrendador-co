import type { Metadata } from 'next';
import AvisoClient from './aviso-client';

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description:
    'Aviso legal, exención de responsabilidad y divulgación de afiliados de ArrendadorCO.',
};

export default function AvisoLegal() {
  return <AvisoClient />;
}
