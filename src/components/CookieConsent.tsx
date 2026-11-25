'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  CONSENT_OPEN_EVENT,
  CONSENT_VERSION,
  getConsentSnapshot,
  getServerConsentSnapshot,
  subscribeConsent,
  writeConsent,
  type ConsentChoice,
} from '@/lib/consent';

/**
 * Aviso y panel de preferencias de privacidad.
 *
 * El markup se prerenderiza en el HTML inicial (Next.js 16 prerenderiza también
 * los Client Components) y se muestra solo cuando no hay una decisión válida.
 * La elección se guarda en una cookie propia; no hay scripts de analítica ni
 * publicidad que deban cargarse condicionalmente.
 */
export default function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const bannerVisible =
    consent === null || (consent !== undefined && consent.version !== CONSENT_VERSION);
  const [panelOpen, setPanelOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOpen() {
      setPanelOpen(true);
    }
    window.addEventListener(CONSENT_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (panelOpen) closeRef.current?.focus();
  }, [panelOpen]);

  const save = useCallback((choice: ConsentChoice) => {
    writeConsent(choice);
    setPanelOpen(false);
  }, []);

  function handleDialogKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      setPanelOpen(false);
      return;
    }
    if (event.key !== 'Tab' || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>('button, a[href]'),
    ).filter((element) => !element.hasAttribute('disabled'));
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <section
        aria-label="Aviso de privacidad"
        hidden={!bannerVisible}
        className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-xl border border-[#1A1A19]/10 bg-[#FBFBFA] p-5 shadow-[0_8px_30px_rgba(26,26,25,0.14)] motion-reduce:transition-none sm:bottom-6"
      >
        <h2 className="mb-2 font-display text-xl text-[#1A1A19]">Tu privacidad</h2>
        <p className="text-sm leading-relaxed text-[#787774]">
          Este sitio no instala cookies de analítica, publicidad ni seguimiento. Solo guardamos en
          este dispositivo tu elección de privacidad y, si usas el checklist de entrega, el progreso
          de esa herramienta. Consulta la{' '}
          <Link
            href="/politica-de-datos"
            className="text-[#346538] underline underline-offset-2 hover:text-[#1A1A19]"
          >
            política de tratamiento de datos
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => save('accepted')}
            className="min-h-[44px] rounded-lg border border-[#346538] bg-[#346538] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2b5130] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#346538] motion-reduce:transition-none"
          >
            Aceptar todas
          </button>
          <button
            type="button"
            onClick={() => save('rejected')}
            className="min-h-[44px] rounded-lg border border-[#1A1A19]/25 bg-white px-4 py-2 text-sm font-semibold text-[#1A1A19] transition-colors hover:bg-[#FBFBFA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#346538] motion-reduce:transition-none"
          >
            Rechazar las no esenciales
          </button>
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className="min-h-[44px] rounded-lg px-3 py-2 text-sm text-[#346538] underline underline-offset-2 hover:text-[#1A1A19] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#346538]"
          >
            Configurar preferencias
          </button>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[#6E6E6B]">
          No hay categorías opcionales activas: aceptar y rechazar producen el mismo efecto sobre la
          carga del sitio. Puedes cambiar tu elección cuando quieras desde el footer.
        </p>
      </section>

      <div
        hidden={!panelOpen}
        className="fixed inset-0 z-50 flex items-end justify-center bg-[#1A1A19]/40 p-4 sm:items-center"
        onClick={() => setPanelOpen(false)}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-title"
          aria-describedby="consent-description"
          hidden={!panelOpen}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={handleDialogKeyDown}
          className="w-full max-w-lg rounded-xl border border-[#1A1A19]/10 bg-white p-6 shadow-[0_8px_30px_rgba(26,26,25,0.18)] motion-reduce:transition-none"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 id="consent-title" className="font-display text-2xl text-[#1A1A19]">
              Preferencias de privacidad
            </h2>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setPanelOpen(false)}
              aria-label="Cerrar preferencias de privacidad"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xl text-[#787774] hover:bg-[#FBFBFA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#346538]"
            >
              ×
            </button>
          </div>

          <p id="consent-description" className="mb-5 text-sm leading-relaxed text-[#787774]">
            Estas son las tecnologías que intervienen en tu dispositivo. No hay categorías de
            analítica ni publicidad activas, por lo que no hay nada que activarlas.
          </p>

          <div className="mb-6 space-y-3">
            <div className="rounded-lg border border-[#1A1A19]/10 bg-[#FBFBFA] p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-[#1A1A19]">Estrictamente necesarias</h3>
                <span className="rounded-full bg-[#346538]/10 px-2 py-0.5 text-xs font-medium text-[#346538]">
                  Siempre activas
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#787774]">
                No usamos cookies de sesión ni de seguimiento. Si abres el checklist de entrega, el
                progreso se guarda en <code className="font-mono">localStorage</code> de tu navegador
                para que no lo pierdas al recargar; puedes borrarlo con «Reiniciar». Nunca se envía a
                nuestros servidores ni a terceros.
              </p>
            </div>
            <p className="text-xs leading-relaxed text-[#787774]">
              Analítica y publicidad: no hay servicios integrados en este sitio, por lo que no se
              muestran opciones para activarlas.
            </p>
          </div>

          <p className="mb-5 text-xs leading-relaxed text-[#787774]">
            Tu elección se guarda en el almacenamiento local de este navegador durante 180 días, con
            un identificador aleatorio, la fecha y la versión de este aviso. Puedes revocarla
            abriendo este panel desde el footer. Consulta la{' '}
            <Link
              href="/politica-de-datos"
              className="text-[#346538] underline underline-offset-2 hover:text-[#1A1A19]"
            >
              política de tratamiento de datos
            </Link>
            .
          </p>

          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => save('rejected')}
              className="min-h-[44px] rounded-lg border border-[#1A1A19]/25 bg-white px-4 py-2 text-sm font-semibold text-[#1A1A19] hover:bg-[#FBFBFA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#346538]"
            >
              Rechazar no esenciales
            </button>
            <button
              type="button"
              onClick={() => save('custom')}
              className="min-h-[44px] rounded-lg border border-[#346538] bg-[#346538] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2b5130] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#346538]"
            >
              Guardar preferencias
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
