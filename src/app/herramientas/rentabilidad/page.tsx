import type { Metadata } from 'next';
import CalculadoraRentabilidad from './calculadora';

export const metadata: Metadata = {
  title: 'Calculadora de Rentabilidad de Inmuebles en Colombia',
  alternates: { canonical: '/herramientas/rentabilidad' },
  description:
    'Calcula la rentabilidad neta real de tu inmueble en Colombia, incluyendo gastos, vacancia y comparación con CDT.',
};

export default function RentabilidadPage() {
  return <CalculadoraRentabilidad />;
}
