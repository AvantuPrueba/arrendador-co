import Link from 'next/link';
import { PRODUCT_CONFIG, formatPrice } from '@/lib/product';

export default function ProductCTA() {
  return (
    <div className="my-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center text-white">
      <h4 className="mb-2 text-xl font-bold">📄 {PRODUCT_CONFIG.name}</h4>
      <p className="mb-4 text-blue-100">
        Descarga nuestra plantilla editable para Colombia. Lista para
        personalizar en Word o Google Docs.
      </p>
      <Link
        href="/tienda"
        className="inline-block rounded-md bg-white px-8 py-3 font-semibold text-blue-700 hover:bg-blue-50"
      >
        Comprar plantilla — {formatPrice()}
      </Link>
      <p className="mt-2 text-xs text-blue-100/80">
        Modelo informativo basado en normativa aplicable. No es asesoría legal.
      </p>
    </div>
  );
}