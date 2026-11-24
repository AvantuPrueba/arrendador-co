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

/**
 * Botón activo de afiliado. Usa bronze-hover (#5E4525) como fondo para
 * garantizar al menos 4.5:1 de contraste con texto blanco.
 */
const BUTTON_CLASS =
  'rounded-lg bg-[#5E4525] px-6 py-3 font-semibold text-white transition-all hover:bg-[#4A3A1D]';

/**
 * Estado deshabilitado (pendiente). Fondo bronce muy sutil y texto bronce
 * oscuro para mantener legibilidad sin parecer un botón activo.
 */
const DISABLED_BUTTON_CLASS =
  'rounded-lg bg-bronze/10 px-6 py-3 font-semibold text-[#5E4525] cursor-not-allowed';

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
      <span className="ml-2 text-xs font-normal text-[#5E4525]">(enlace pendiente)</span>
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
    <div className="my-8 rounded-2xl border border-charcoal/10 bg-surface p-6">
      <h4 className="mb-2 font-semibold text-lg text-[#5E4525]">{title}</h4>
      <p className="mb-4 text-sm text-muted">{description}</p>
      {cta}
      <p className="mt-3 text-xs italic text-muted">
        {pending
          ? 'Esta sección se activará cuando tengamos partners confirmados.'
          : 'Este enlace es afiliado y puede generar una comisión.'}
      </p>
    </div>
  );
}
