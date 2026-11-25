import type { Metadata } from 'next';
import PoliticaClient from './politica-client';

export const metadata: Metadata = {
  title: 'Política de Tratamiento de Datos Personales',
  alternates: { canonical: '/politica-de-datos' },
  description:
    'Política de tratamiento y protección de datos personales de ArrendadorCO de conformidad con la Ley 1581 de 2012.',
};

export default function PoliticaDeDatos() {
  return <PoliticaClient />;
}
