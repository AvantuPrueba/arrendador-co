import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Resultado de tu compra | ArrendadorCO',
  description: 'Estado del pago de tu compra en ArrendadorCO.',
};

/**
 * Página de redirección tras el pago en Mercado Pago.
 * IMPORTANTE: los parámetros de la URL no constituyen prueba definitiva de
 * pago; la verificación real se hará en backend cuando esté disponible.
 */
export default async function CompraResultado({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const paymentId = typeof params.payment_id === 'string' ? params.payment_id : null;
  const status = typeof params.status === 'string' ? params.status : null;
  const externalReference =
    typeof params.external_reference === 'string' ? params.external_reference : null;
  const merchantOrderId =
    typeof params.merchant_order_id === 'string' ? params.merchant_order_id : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="mb-4 text-3xl font-bold text-slate-900">Estamos comprobando tu compra</h1>
      <p className="mb-8 text-slate-600">
        Recibimos la notificación de tu pago. En cuanto confirmamos la transacción, te enviamos la
        plantilla por correo.
      </p>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-left text-sm text-slate-600">
        <dl className="space-y-2">
          <div className="flex justify-between"><dt>payment_id</dt><dd className="font-mono">{paymentId ?? '—'}</dd></div>
          <div className="flex justify-between"><dt>status</dt><dd className="font-mono">{status ?? '—'}</dd></div>
          <div className="flex justify-between"><dt>external_reference</dt><dd className="font-mono">{externalReference ?? '—'}</dd></div>
          <div className="flex justify-between"><dt>merchant_order_id</dt><dd className="font-mono">{merchantOrderId ?? '—'}</dd></div>
        </dl>
        <p className="mt-4 text-xs text-slate-500">
          Estos datos son informativos y no constituyen confirmación oficial del pago.
        </p>
      </div>
      <Link href="/" className="mt-8 inline-block text-sm font-semibold text-teal-600 hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}
