import type { Metadata } from 'next';
import CalculadoraCanon from './calculadora';

export const metadata: Metadata = {
  title: 'Calculadora de Reajuste del Canon de Arrendamiento',
  description:
    'Calcula cuándo puedes reajustar el canon de arrendamiento en Colombia y cuánto representa el incremento según el IPC aplicable.',
};

export default function ReajusteCanonPage() {
  return <CalculadoraCanon />;
}
