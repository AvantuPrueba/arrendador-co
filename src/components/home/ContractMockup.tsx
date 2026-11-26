'use client';

import { useEffect, useState } from 'react';
import { PRODUCT_CONFIG } from '@/lib/product';

export function ContractMockup() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mq.matches);
      const onChange = () => setReducedMotion(mq.matches);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="contract-mockup-placeholder h-[560px] w-full flex items-center justify-center">
        <div className="contract-layer-placeholder w-[320px] h-[420px] bg-surface border-2 border-bronze/20 rounded-lg shadow-lg" />
      </div>
    );
  }

  const perspective = reducedMotion ? '900px' : '1200px';
  const rotateX = reducedMotion ? 0 : 8;
  const rotateY = reducedMotion ? 0 : -6;
  const translateZ = reducedMotion ? 0 : 20;

  return (
    <section className="contract-mockup-section relative w-full" aria-label="Maqueta del contrato de arrendamiento">
      <div className="contract-stage" style={{ perspective }}>
        <div className="document-wrap relative mx-auto w-full max-w-[380px] aspect-[4/5]" style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
          transition: reducedMotion ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <div className="doc-layer absolute inset-0 bg-charcoal/5 border border-charcoal/10 rounded-xl shadow-2xl shadow-charcoal/20 blur-sm" style={{
            transform: 'translateZ(-60px) scale(1.02)',
            opacity: reducedMotion ? 0.4 : 0.6,
            transition: reducedMotion ? 'none' : 'all 0.5s ease',
          }} aria-hidden="true" />
          <div className="doc-layer absolute inset-0 bg-surface border border-bronze/15 rounded-xl shadow-xl shadow-green-deep/10" style={{
            transform: 'translateZ(-30px) scale(1.01)',
            opacity: reducedMotion ? 0.6 : 0.8,
            transition: reducedMotion ? 'none' : 'all 0.5s ease',
          }} aria-hidden="true" />
          <div className="doc-layer absolute inset-0 bg-ivory border border-bronze/20 rounded-xl shadow-lg shadow-bronze/10" style={{
            transform: 'translateZ(-15px) scale(1.005)',
            opacity: reducedMotion ? 0.8 : 1,
            transition: reducedMotion ? 'none' : 'all 0.5s ease',
          }} aria-hidden="true" />
          <div className="doc-main relative z-10 h-full w-full bg-white/80 border-2 border-bronze/25 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm" style={{
            transform: 'translateZ(0)',
            transition: reducedMotion ? 'none' : 'all 0.5s ease, box-shadow 0.3s ease',
          }}>
          <div className="paper-texture absolute inset-0 pointer-events-none" aria-hidden="true" />
          <div className="doc-header p-6 md:p-8">
            <div className="flex items-baseline gap-2 mb-6">
              <div className="h-px w-full bg-green-deep rounded-t-md" aria-hidden="true" />
              <div className="h-px w-1/3 bg-green-deep rounded-t-md" aria-hidden="true" />
              <div className="h-px w-1/3 bg-green-deep rounded-t-md" aria-hidden="true" />
              <div className="h-px w-1/3 bg-green-deep rounded-t-md" aria-hidden="true" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-normal text-charcoal tracking-[-0.01em] leading-tight">
              CONTRATO DE ARRENDAMIENTO
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-terracotta font-medium uppercase tracking-widest">
              Vivienda Urbana · República de Colombia
            </p>
            <div className="mt-8 flex items-center justify-center">
              <span className="h-px w-1/3 bg-green-deep" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs font-mono font-medium text-green-deep uppercase tracking-widest">
                LEY 820 · 2003
              </span>
              <span className="h-px w-1/3 bg-green-deep" aria-hidden="true" />
            </div>
          </div>
          <div className="doc-body p-6 md:p-8 space-y-5">
            <div className="clause-block">
              <div className="flex items-start gap-3">
                <div className="h-5 w-0.5 bg-bronze flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm text-charcoal leading-relaxed">
                    <span className="font-medium text-terracotta">Fecha:</span>
                    [Fecha de suscripción]
                  </p>
                  <p className="text-sm text-charcoal leading-relaxed">
                    <span className="font-medium text-terracotta">Partes:</span>
                    Arrendador / Arrendatario
                  </p>
                </div>
              </div>
            </div>
            <div className="h-px w-full bg-charcoal/5 my-1" aria-hidden="true" />
            <div className="clause-block">
              <div className="flex items-start gap-3">
                <div className="h-5 w-0.5 bg-bronze flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm text-charcoal leading-relaxed">
                    <span className="font-medium text-terracotta">Canon mensual:</span>
                    {`$${PRODUCT_CONFIG.priceCOP.toLocaleString('es-CO')} COP`}
                  </p>
                  <p className="text-sm text-charcoal leading-relaxed">
                    <span className="font-medium text-terracotta">Duración:</span>
                    12 meses
                  </p>
                </div>
              </div>
            </div>
            <div className="h-px w-full bg-charcoal/5 my-1" aria-hidden="true" />
            <div className="clause-block">
              <div className="flex items-start gap-3">
                <div className="h-5 w-0.5 bg-bronze flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm text-charcoal leading-relaxed">
                    <span className="font-medium text-terracotta">Garantía:</span>
                    [Monto a convenir]
                  </p>
                  <p className="text-sm text-charcoal leading-relaxed">
                    <span className="font-medium text-terracotta">Uso:</span>
                    Vivienda urbana
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-charcoal/10">
              <p className="text-[10px] sm:text-xs text-terracotta/70 uppercase tracking-wider leading-relaxed">
                Modelo informativo basado en la normativa aplicable. No constituye
                asesoría legal.
              </p>
            </div>
          </div>
          <div className="doc-footer p-4 md:p-6 border-t border-bronze/20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-mono font-medium text-bronze uppercase tracking-wider">
                v{PRODUCT_CONFIG.version}
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-medium text-charcoal uppercase tracking-wider">
                COLOMBIA
              </span>
            </div>
          </div>
          </div>
        </div>
        <div className="format-badges absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-2 sm:gap-3 pointer-events-none" aria-hidden="true">
          <BadgeFormat format=".docx" />
          <BadgeFormat format="Google Docs" />
        </div>
      </div>
      {!reducedMotion && (
        <div className="ambient-movement absolute inset-0 pointer-events-none" style={{
          animation: 'ambientFloat 8s ease-in-out infinite',
        }} aria-hidden="true" />
      )}
    </section>
  );
}

function BadgeFormat({ format }: { format: string }) {
  const isDocx = format === '.docx';
  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-bronze/30 bg-white px-3 py-1.5 shadow-sm">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-bronze" aria-hidden="true">
        {isDocx ? (
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        ) : (
          <path d="M5 3h14l2 9H5z" />
        )}
      </svg>
      <span className="text-[10px] sm:text-xs font-mono font-medium text-bronze uppercase tracking-wider">
        {isDocx ? 'Word .docx' : 'Google Docs'}
      </span>
    </div>
  );
}