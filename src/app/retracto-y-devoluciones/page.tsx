import type { Metadata } from 'next';
import RetractoClient from './retracto-client';

export const metadata: Metadata = {
  title: 'Política de Retracto y Devoluciones',
  description:
    'Condiciones sobre derecho de retracto, devoluciones y reversiones en la compra de productos digitales de ArrendadorCO.',
};

export default function RetractoYDevoluciones() {
  return <RetractoClient />;
}
