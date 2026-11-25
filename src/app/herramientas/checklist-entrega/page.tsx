import type { Metadata } from 'next';
import ChecklistEntrega from './ChecklistEntrega';

export const metadata: Metadata = {
  title: 'Checklist de Entrega y Devolución de Inmueble',
  description:
    'Completa gratis un checklist de entrega o devolución de inmueble, registra zonas, medidores, llaves e inventario y genera un PDF.',
};

export default function ChecklistEntregaPage() {
  return <ChecklistEntrega />;
}
