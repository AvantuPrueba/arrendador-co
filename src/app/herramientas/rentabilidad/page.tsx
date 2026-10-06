import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadora de Rentabilidad de Inmuebles en Colombia | ArrendadorCO',
  description:
    'Calcula la rentabilidad neta real de tu inmueble en Colombia, incluyendo gastos, vacancia y comparación con CDT.',
};

export default function RentabilidadPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <p className="text-lg text-gray-600">Calculadora en construcción</p>
    </div>
  );
}
