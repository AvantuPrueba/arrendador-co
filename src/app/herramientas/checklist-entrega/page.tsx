import type { Metadata } from 'next';
import ChecklistEntrega from './ChecklistEntrega';

export const metadata: Metadata = {
  title: 'Checklist de Entrega y Recepción de Inmueble | ArrendadorCO',
  description:
    'Completa el estado del inmueble, medidores, llaves e inventario desde tu celular y genera un PDF para guardar o compartir.',
};

export default function ChecklistEntregaPage() {
  return <ChecklistEntrega />;
}
