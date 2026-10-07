import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resultado de tu compra | ArrendadorCO',
  description: 'Estado del pago de tu compra en ArrendadorCO.',
};

export default function ResultadoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
