import type { ReactNode } from 'react';

interface AffiliateBoxProps {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

/**
 * Placeholder pendiente de una URL real de afiliado.
 */
const PENDING_PREFIX = '[PENDIENTE';

function isPendingHref(href: string): boolean {
  return href.trim().startsWith(PENDING_PREFIX);
}

const BUTTON_CLASS =
  'inline-block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700';

const DISABLED_BUTTON_CLASS =
  'inline-block rounded-md bg-gray-300 px-5 py-2.5 text-sm font-medium text-gray-500 cursor-not-allowed';

/**
 * Caja de promoción de un partner afiliado.
 *
 * Si el href es un placeholder `[PENDIENTE: ...]`, el CTA se muestra
 * deshabilitado y no es clicable. Esto evita enlaces rotos y promesas
 * vacías mientras no haya URLs reales de afiliados.
 */
export default function AffiliateBox({ title, description, ctaText, ctaHref }: AffiliateBoxProps) {
  const pending = isPendingHref(ctaHref);

  const cta: ReactNode = pending ? (
    <span className={DISABLED_BUTTON_CLASS}>
      {ctaText}
      <span className="ml-2 text-xs font-normal">(enlace pendiente)</span>
    </span>
  ) : (
    <a
      href={ctaHref}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={BUTTON_CLASS}
    >
      {ctaText}
    </a>
  );

  return (
    <div className="my-8 rounded-lg border-2 border-blue-100 bg-blue-50/50 p-6">
      <h4 className="mb-2 text-lg font-semibold text-blue-800">{title}</h4>
      <p className="mb-4 text-sm text-gray-700">{description}</p>
      {cta}
      <p className="mt-3 text-xs italic text-gray-500">
        {pending
          ? 'Esta sección se activará cuando tengamos partners confirmados.'
          : 'Este enlace es afiliado y puede generar una comisión.'}
      </p>
    </div>
  );
}