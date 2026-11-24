import Link from 'next/link';
import { PRODUCT_CONFIG, formatPrice } from '@/lib/product';

export default function ProductCTA() {
  return (
    <div className="my-8 rounded-2xl border border-charcoal/10 bg-ivory p-6 md:p-8">
      <h4 className="mb-2 font-display text-2xl font-bold text-charcoal">
        📄 {PRODUCT_CONFIG.name}
      </h4>
      <p className="mb-4 text-base text-muted">
        Descarga nuestra plantilla editable para Colombia. Lista para
        personalizar en Word o Google Docs.
      </p>
      <Link
        href="/tienda"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-deep px-8 py-3.5 font-semibold text-white transition-all hover:bg-green-mid hover:scale-[1.01] active:scale-[0.99]"
      >
        Comprar plantilla — {formatPrice()}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-arrow-right h-5 w-5 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Link>
      <p className="mt-2 text-xs text-muted/80">
        Modelo informativo basado en normativa aplicable. No es asesoría legal.
      </p>
    </div>
  );
}
