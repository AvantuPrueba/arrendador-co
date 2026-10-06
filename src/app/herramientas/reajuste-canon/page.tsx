import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadora de Reajuste del Canon de Arrendamiento | ArrendadorCO',
  description:
    'Calcula cuándo puedes reajustar el canon de arrendamiento en Colombia y cuánto representa el incremento según el IPC aplicable.',
};

export default function ReajusteCanonPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <p className="text-lg text-gray-600">Calculadora en construcción</p>
    </div>
  );
}
