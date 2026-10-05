import type { Metadata } from 'next';
import NewsletterCTA from '@/components/NewsletterCTA';
import CheckoutForm from '@/components/CheckoutForm';
import { PRODUCT_CONFIG, formatPrice } from '@/lib/product';

/**
 * Link de Pago de Mercado Pago. Lo lee el Server Component y se lo pasa
 * al formulario: así el estado "no configurado" se renderiza en servidor
 * y no hay desajuste de hidratación.
 *
 * Se define en el `.env.local` (ver `.env.example`). Al llevar prefijo
 * `NEXT_PUBLIC_`, Next.js lo incrusta en el bundle durante el build.
 */
const paymentLink = process.env.NEXT_PUBLIC_MERCADOPAGO_LINK || null;

export const metadata: Metadata = {
  title: 'Tienda',
  description: 'Descarga plantillas editables de contratos de arrendamiento para Colombia. Listas para personalizar.',
};

export default function Tienda() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-4 text-center">Tienda</h1>
      <p className="mb-10 text-center text-gray-600">
        Productos digitales diseñados para arrendadores colombianos.
      </p>

      {/* Producto principal */}
      <div className="mb-12 rounded-xl border-2 border-blue-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex-1">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              📄 {PRODUCT_CONFIG.name}
            </h2>
            <p className="mb-4 text-gray-600">
              Contrato editable en Word y Google Docs basado en la normativa aplicable. Incluye:
            </p>
            <ul className="mb-6 space-y-2 text-sm text-gray-700">
              {PRODUCT_CONFIG.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="mb-3 text-xs text-gray-500">
              <strong>No incluye:</strong> {PRODUCT_CONFIG.excludes.join(', ')}.
            </p>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">{formatPrice()}</span>
              <span className="text-sm text-gray-500">Pago único</span>
            </div>
          </div>
        </div>
        <CheckoutForm paymentLink={paymentLink} />
      </div>

      <NewsletterCTA source="newsletter-tienda" />
    </div>
  );
}