'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';

import { IPC_CONFIG } from '@/lib/ipc-config';
import { RENTABILIDAD_DEFAULTS, calcularRentabilidad } from '@/lib/rentabilidad-config';

const CANON_MIN = 500_000;
const CANON_MAX = 3_000_000;
const CANON_STEP = 50_000;
const CIRCUNFERENCIA = 2 * Math.PI * 38;

function formatCOP(valor: number): string {
  return `$${Math.round(valor).toLocaleString('es-CO')}`;
}

function formatPct(valor: number, decimales = 1): string {
  return valor.toFixed(decimales).replace('.', ',');
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Sección de herramientas: canvas oscuro, tres instrumentos sobre tarjetas hueso.
 * Todo el motion se inicializa en useEffect; sin JS los valores finales ya están en el HTML.
 */
export default function ToolsLab() {
  const rootRef = useRef<HTMLElement>(null);
  const donutRef = useRef<SVGSVGElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const rafs = useRef<number[]>([]);
  const timers = useRef<number[]>([]);

  const [canon, setCanon] = useState(1_200_000);
  const delta = Math.round(canon * (IPC_CONFIG.ipc / 100));
  const nuevoCanon = canon + delta;

  const rentabilidad = calcularRentabilidad(
    120_000_000,
    1_200_000,
    0,
    {
      administracionMensual: 0,
      comisionInmobiliaria: 0,
      predialAnual: 120_000_000 * (RENTABILIDAD_DEFAULTS.predial / 100),
      seguroAnual: 0,
      mantenimientoAnual: RENTABILIDAD_DEFAULTS.mantenimiento,
    },
    RENTABILIDAD_DEFAULTS.mesesVacancia,
  );
  const escalaMax = Math.ceil(
    Math.max(rentabilidad.rentabilidadNeta, RENTABILIDAD_DEFAULTS.tasaCDT, 1),
  );
  const neta = rentabilidad.rentabilidadNeta;
  const cdt = RENTABILIDAD_DEFAULTS.tasaCDT;
  const offsetFinal = CIRCUNFERENCIA * (1 - Math.min(1, neta / escalaMax));

  const [deltaMostrado, setDeltaMostrado] = useState(delta);
  const [conteoListo, setConteoListo] = useState(true);
  const [netaMostrada, setNetaMostrada] = useState(neta);

  const deltaRef = useRef(delta);
  const netaRef = useRef(neta);
  useEffect(() => { deltaRef.current = delta; }, [delta]);
  useEffect(() => { netaRef.current = neta; }, [neta]);

  const progresoSlider = ((canon - CANON_MIN) / (CANON_MAX - CANON_MIN)) * 100;

  function contarHasta(valor: number, actualizar: (n: number) => void, decimales: number) {
    const inicio = performance.now();
    actualizar(0);
    const paso = (ahora: number) => {
      const t = Math.min(1, (ahora - inicio) / 800);
      const valorActual = valor * easeOutCubic(t);
      actualizar(decimales ? Math.round(valorActual * 10) / 10 : Math.round(valorActual));
      if (t < 1) rafs.current.push(requestAnimationFrame(paso));
    };
    rafs.current.push(requestAnimationFrame(paso));
  }

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') return;

    root.dataset.motion = 'ready';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          card.classList.add('is-in');

          const indice = Number(card.dataset.tlCard);
          timers.current.push(
            window.setTimeout(() => {
              switch (indice) {
                case 0: {
                  const objetivo = deltaRef.current;
                  setConteoListo(false);
                  contarHasta(objetivo, (n) => {
                    setDeltaMostrado(n);
                    if (n >= objetivo) setConteoListo(true);
                  }, 0);
                  break;
                }
                case 1:
                  donutRef.current?.classList.add('is-drawn');
                  contarHasta(netaRef.current, setNetaMostrada, 1);
                  break;
                case 2:
                  progressRef.current?.classList.add('is-grown');
                  break;
              }
            }, indice * 160),
          );
          observer.unobserve(card);
        });
      },
      { threshold: 0.4 },
    );

    root.querySelectorAll<HTMLElement>('[data-tl-card]').forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      rafs.current.forEach((id) => cancelAnimationFrame(id));
      timers.current.forEach((id) => window.clearTimeout(id));
      rafs.current = [];
      timers.current = [];
      delete root.dataset.motion;
    };
  }, []);

  return (
    <section ref={rootRef} aria-label="Herramientas gratuitas" className="tools-lab">
      <div className="tl-wrap">
        <div className="tl-head">
          <div>
            <p className="tl-eyebrow">Herramientas gratuitas</p>
            <h2 className="tl-title">Todo lo que necesitas, sin costo</h2>
          </div>
          <Link href="/herramientas" className="tl-all-link">
            Ver todas las herramientas
            <span className="tl-arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="tl-grid">
          {/* 01 · Reajuste de canon */}
          <article className="tl-card" data-tl-card="0" style={{ '--tl-delay': '0ms' } as CSSProperties}>
            <h3 className="tl-card__label">01 · Reajuste de canon</h3>
            <p className="tl-delta">+{formatCOP(conteoListo ? delta : deltaMostrado)}</p>
            <p className="tl-context">
              IPC DANE {IPC_CONFIG.year} · {formatPct(IPC_CONFIG.ipc, 2)} % · Canon base {formatCOP(1_200_000)}
            </p>

            <label className="tl-slider-label" htmlFor="tl-canon">
              Ajusta tu canon actual
            </label>
            <input
              id="tl-canon"
              className="tl-slider"
              type="range"
              role="slider"
              min={CANON_MIN}
              max={CANON_MAX}
              step={CANON_STEP}
              value={canon}
              onChange={(event) => setCanon(Number(event.target.value))}
              aria-valuemin={CANON_MIN}
              aria-valuemax={CANON_MAX}
              aria-valuenow={canon}
              aria-valuetext={`${formatCOP(canon)} pesos colombianos`}
              style={{ '--tl-progress': `${progresoSlider}%` } as CSSProperties}
            />

            <div className="tl-readout" aria-live="polite">
              <div className="tl-readout__row">
                <span>Canon actual</span>
                <b>{formatCOP(canon)}</b>
              </div>
              <div className="tl-readout__row">
                <span>Nuevo canon</span>
                <strong>{formatCOP(nuevoCanon)}</strong>
              </div>
            </div>

            <Link href="/herramientas/reajuste-canon" className="tl-cta">
              Calcular ahora
              <span className="tl-arrow" aria-hidden="true">→</span>
            </Link>
          </article>

          {/* 02 · Rentabilidad real */}
          <article className="tl-card" data-tl-card="1" style={{ '--tl-delay': '100ms' } as CSSProperties}>
            <h3 className="tl-card__label">02 · Rentabilidad real</h3>
            <svg
              ref={donutRef}
              className="tl-donut"
              viewBox="0 0 96 96"
              aria-hidden="true"
              style={
                {
                  '--tl-circ': String(CIRCUNFERENCIA),
                  '--tl-final': String(offsetFinal),
                } as CSSProperties
              }
            >
              <g transform="rotate(-90 48 48)">
                <circle className="tl-donut__ring" cx="48" cy="48" r="38" />
                <circle className="tl-donut__arc" cx="48" cy="48" r="38" />
              </g>
              <text className="tl-donut__value" x="48" y="50" textAnchor="middle">
                {formatPct(netaMostrada)}%
              </text>
              <text className="tl-donut__caption" x="48" y="64" textAnchor="middle">
                NETA
              </text>
            </svg>

            <div className="tl-data">
              <span><b>{formatPct(neta)} % NETA</b></span>
              <del>{formatPct(cdt)} % CDT</del>
            </div>
            <p className="tl-context" style={{ marginTop: 16 }}>
              Demo · escala 0 – {escalaMax} %
            </p>

            <Link href="/herramientas/rentabilidad" className="tl-cta">
              Calcular rentabilidad
              <span className="tl-arrow" aria-hidden="true">→</span>
            </Link>
          </article>

          {/* 03 · Checklist de entrega */}
          <article className="tl-card" data-tl-card="2" style={{ '--tl-delay': '200ms' } as CSSProperties}>
            <h3 className="tl-card__label">03 · Checklist de entrega</h3>

            <div className="tl-doc" aria-hidden="true">
              <span className="tl-card__label" style={{ fontSize: '0.55rem' }}>Acta de inventario</span>
              <div className="tl-doc__line" style={{ width: '80%' }} />
              <div className="tl-doc__line" style={{ width: '65%' }} />
              <div className="tl-doc__line" style={{ width: '75%' }} />
              <span className="tl-doc__stamp">Genera PDF</span>
            </div>

            <p className="tl-card__label">2 / 4 pasos</p>
            <div ref={progressRef} className="tl-progress" aria-hidden="true">
              <span className="tl-progress__fill" />
            </div>
            <p className="tl-copy">Acta con estado de paredes, llaves y medidores.</p>

            <Link href="/herramientas/checklist-entrega" className="tl-cta">
              Abrir checklist
              <span className="tl-arrow" aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
