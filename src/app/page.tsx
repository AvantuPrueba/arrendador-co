import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';

import NewsletterCTA from '@/components/NewsletterCTA';
import JsonLd from '@/components/JsonLd';
import { PRODUCT_CONFIG, formatPrice } from '@/lib/product';
import { absoluteUrl, homeJsonLd } from '@/lib/seo';
import { baseOpenGraph, baseTwitter } from '@/lib/metadata';
import EditorialMotion from '@/components/home/EditorialMotion';
import ToolsLab from '@/components/home/ToolsLab';
import './home-editorial.css';
import './tools-lab.css';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  title: 'ArrendadorCO - Guía para Arrendadores en Colombia',
  description:
    'Información práctica sobre contratos de arriendo, actas de entrega y manejo de inquilinos morosos en Colombia.',
  openGraph: {
    ...baseOpenGraph(),
    title: 'ArrendadorCO - Guía para Arrendadores en Colombia',
    description:
      'Información práctica sobre contratos de arriendo, actas de entrega y manejo de inquilinos morosos en Colombia.',
    type: 'website',
    locale: 'es_CO',
    url: absoluteUrl('/'),
    siteName: 'ArrendadorCO',
  },
  twitter: {
    ...baseTwitter(),
    title: 'ArrendadorCO - Guía para Arrendadores en Colombia',
    description:
      'Información práctica sobre contratos de arriendo, actas de entrega y manejo de inquilinos morosos en Colombia.',
  },
};

const delay = (ms: number): CSSProperties => ({ transitionDelay: `${ms}ms` });

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <EditorialMotion />

      <div className="editorial-home">
        {/* ── 01 · HERO ── */}
        <section
          aria-label="Introducción"
          className="relative overflow-hidden bg-ed-surface-ink py-20 text-ed-ink-on-dark md:py-28"
        >
          <svg className="ed-grain" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <filter id="ed-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#ed-noise)" />
          </svg>

          <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12">
              <div>
                <p className="ed-eyebrow ed-eyebrow--on-dark" data-ed-reveal>
                  Dossier 01 · Gestión inmobiliaria · Colombia · 2026
                </p>

                <h1 className="ed-h1 mt-6 max-w-[13ch] text-ed-ink-on-dark" data-ed-reveal style={delay(80)}>
                  Arrendar con <em className="italic text-ed-accent-on-dark">confianza</em>.
                  <br />
                  Administrar con claridad.
                </h1>

                <p
                  className="ed-body mt-6 max-w-[52ch] text-ed-ink-on-dark/70"
                  data-ed-reveal
                  style={delay(160)}
                >
                  Guías, herramientas financieras y plantillas jurídicas para propietarios urbanos en
                  Colombia.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-2" data-ed-reveal style={delay(240)}>
                  <span className="ed-pill ed-pill--dark">Ley 820 de 2003</span>
                  <span className="ed-pill ed-pill--dark">Vivienda urbana</span>
                  <span className="ed-pill ed-pill--dark">Actualizado 2026</span>
                </div>

                <div className="mt-10 flex flex-wrap gap-3" data-ed-reveal style={delay(320)}>
                  <Link href="/herramientas" className="ed-btn ed-btn--light">
                    Explorar herramientas
                    <span className="ed-arrow ml-3" aria-hidden="true">→</span>
                  </Link>
                  <Link href="/tienda" className="ed-btn ed-btn--outline-dark">
                    Ver plantilla de contrato
                    <span className="ed-arrow ml-3" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div
                className="ed-hero-frame flex items-center justify-center rounded-[2px] p-8"
                data-ed-reveal
                style={delay(240)}
                aria-hidden="true"
              >
                <svg viewBox="0 0 200 260">
                  <path d="M20 240h160M40 240V82h120v158M40 82l60-40 60 40" />
                  <path d="M70 112h22v30H70zM108 112h22v30h-22zM70 162h22v30H70zM108 162h22v30h-22z" />
                  <path d="M92 240v-32h16v32" stroke="var(--color-ed-accent-on-dark)" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 · PROBLEMAS ── */}
        <section aria-label="Problemas que resolver" className="bg-ed-canvas py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="mb-12 max-w-2xl" data-ed-reveal>
              <p className="ed-eyebrow">Cuatro problemas reales</p>
              <h2 className="ed-h2 mt-5">¿Qué necesitas resolver hoy?</h2>
              <p className="ed-body mt-4 text-ed-ink-muted">
                Cuatro frentes esenciales para administrar una propiedad urbana.
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              <Link
                href="/guias/contratos"
                className="ed-feature group flex min-h-[340px] flex-col justify-between rounded-[2px] p-8 md:p-10"
                data-ed-reveal
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="ed-feature__number">01</span>
                    <span className="ed-feature__label">Recomendado</span>
                  </div>
                  <h3 className="ed-h3 mt-10">Crear un contrato sólido y seguro</h3>
                  <p className="ed-feature__copy mt-4 max-w-md">
                    Cláusulas obligatorias de la Ley 820 de 2003, garantías exigibles y errores que
                    anulan tu contrato en un proceso judicial.
                  </p>
                </div>
                <span className="ed-feature__cta ed-mono mt-10 inline-flex min-h-6 items-center gap-2">
                  Explorar guías de contratos
                  <span className="ed-arrow" aria-hidden="true">→</span>
                </span>
              </Link>

              <div>
                {[
                  {
                    n: '02',
                    title: 'Entregar o recibir un inmueble',
                    copy: 'Actas de entrega, inventario fotográfico y medidores de servicios.',
                    cta: 'Explorar herramienta',
                    href: '/herramientas/checklist-entrega',
                  },
                  {
                    n: '03',
                    title: 'Gestionar morosidad a tiempo',
                    copy: 'Rutas de conciliación, cartas de cobro preventivo y causales de terminación.',
                    cta: 'Leer procedimiento',
                    href: '/guias/morosos',
                  },
                  {
                    n: '04',
                    title: 'Calcular finanzas y reajuste',
                    copy: 'Rentabilidad real neta vs CDT, vacancia, impuestos y reajuste de canon IPC.',
                    cta: 'Usar calculadora',
                    href: '/herramientas/rentabilidad',
                  },
                ].map((item, i) => (
                  <Link
                    key={item.n}
                    href={item.href}
                    className="ed-secondary group block py-6"
                    data-ed-reveal
                    style={delay(80 * (i + 1))}
                  >
                    <span className="ed-mono text-ed-ink-muted">{item.n}</span>
                    <h3 className="ed-secondary__title mt-2 text-lg">{item.title}</h3>
                    <p className="ed-body mt-1 text-sm text-ed-ink-muted">{item.copy}</p>
                    <span className="ed-secondary__cta ed-mono mt-4 inline-flex min-h-6 items-center gap-2">
                      {item.cta}
                      <span className="ed-arrow" aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 03 · MÉTODO ── */}
        <section aria-label="Método de gestión" className="bg-ed-canvas py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="mb-12 max-w-2xl" data-ed-reveal>
              <p className="ed-eyebrow">Método de gestión</p>
              <h2 className="ed-h2 mt-5">La forma ArrendadorCO</h2>
              <p className="ed-body mt-4 max-w-[55ch] text-ed-ink-muted">
                Un proceso ordenado en cuatro etapas para proteger tu patrimonio en cada ciclo.
              </p>
            </div>

            <div className="ed-timeline" data-ed-timeline>
              <span className="ed-timeline__line" aria-hidden="true" />
              <span className="ed-timeline__line ed-timeline__line--accent" aria-hidden="true" />

              <ol className="list-none">
                {[
                  {
                    n: '01',
                    title: 'Preparar',
                    copy: 'Contrato firmado, documentos verificados y condiciones claras desde el inicio.',
                  },
                  {
                    n: '02',
                    title: 'Entregar',
                    copy: 'Acta de entrega, inventario fotográfico y registro objetivo del estado del inmueble.',
                  },
                  {
                    n: '03',
                    title: 'Gestionar',
                    copy: 'Control de pagos, obligaciones del inquilino y comunicación documentada por escrito.',
                  },
                  {
                    n: '04',
                    title: 'Proteger',
                    copy: 'Seguros de arrendamiento, procedimientos legales y rutas de acción ante incumplimientos.',
                  },
                ].map((step, i) => (
                  <li
                    key={step.n}
                    className={`ed-step ${i === 3 ? 'ed-step--final' : ''}`}
                    data-ed-reveal
                    style={delay(i * 80)}
                  >
                    <span className="ed-node" aria-hidden="true" />
                    <span className="ed-mono text-ed-ink-muted">{step.n}</span>
                    <h3
                      className={`ed-h3 mt-2 text-xl ${i === 3 ? 'text-ed-accent' : ''}`}
                    >
                      {step.title}
                    </h3>
                    <p className="ed-body mt-2 max-w-[60ch] text-sm text-ed-ink-muted">{step.copy}</p>
                  </li>
                ))}
              </ol>

              <div className="ed-protected mt-6 flex flex-col gap-8 rounded-[2px] p-8 md:flex-row md:items-center md:justify-between">
                <div data-ed-reveal>
                  <h3 className="ed-h3">Patrimonio protegido.</h3>
                  <p className="ed-body mt-3 max-w-md text-ed-ink-muted">
                    Cada ciclo completado es un inmueble mejor administrado.
                  </p>
                </div>
                <div className="ed-seal shrink-0" aria-hidden="true">
                  <svg viewBox="0 0 120 120">
                    <defs>
                      <path id="ed-seal-path" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
                    </defs>
                    <circle cx="60" cy="60" r="58" fill="none" stroke="var(--color-ed-accent)" strokeWidth="1.5" />
                    <text
                      fill="var(--color-ed-accent)"
                      fontSize="8"
                      letterSpacing="1.6"
                      style={{ fontFamily: 'var(--font-ed-mono)' }}
                    >
                      <textPath href="#ed-seal-path">
                        ARRENDADORCO · PROTEGIDO · ARRENDADORCO · PROTEGIDO ·
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 04 · HERRAMIENTAS ── */}
        <ToolsLab />

        {/* ── 05 · PLANTILLA DE CONTRATO ── */}
        <section aria-label="Plantilla de contrato" className="bg-ed-canvas py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
              <div data-ed-reveal aria-hidden="true">
                <div className="ed-paper rounded-[2px] bg-ed-surface p-8 md:p-10">
                  <p className="ed-mono text-ed-ink-muted">Contrato de arrendamiento · Vivienda urbana</p>
                  <div className="mt-10 space-y-6">
                    {[
                      { label: 'Partes contratantes', widths: ['85%', '70%', '90%'] },
                      { label: 'Cláusulas esenciales', widths: ['75%', '88%', '65%'] },
                      { label: 'Valor y vigencia', widths: ['70%', '55%'] },
                    ].map((block) => (
                      <div key={block.label}>
                        <span className="ed-mono text-ed-ink">{block.label}</span>
                        <div className="mt-3 space-y-2">
                          {block.widths.map((w, i) => (
                            <div key={i} className="ed-paper__line" style={{ width: w }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="ed-mono mt-12 text-right text-ed-accent">Ley 820 · 2003</p>
                </div>
              </div>

              <div>
                <p className="ed-eyebrow" data-ed-reveal>Producto destacado</p>
                <h2 className="ed-h2 mt-5" data-ed-reveal style={delay(80)}>
                  Plantilla de Contrato de Arrendamiento
                </h2>
                <p className="ed-body mt-5 max-w-[52ch] text-ed-ink-muted" data-ed-reveal style={delay(160)}>
                  Un abogado cobra entre $300.000 y $800.000 por redactar este contrato. Aquí lo tienes
                  listo, actualizado y editable.
                </p>

                <div className="mt-8" data-ed-reveal style={delay(240)}>
                  <p className="ed-price">{formatPrice()}</p>
                  <p className="ed-mono mt-2 text-ed-ink-muted">Pago único</p>
                </div>

                <ul className="mt-8 border-t border-ed-line" data-ed-reveal style={delay(320)}>
                  {[
                    'Campos dinámicos: fecha, valor, garantía e índice de reajuste',
                    'Cláusulas de protección: daño, subarriendo y terminación anticipada',
                    'Formato .docx editable y compatible con Google Docs',
                    'Guía de personalización en PDF incluida',
                  ].map((feature) => (
                    <li key={feature} className="ed-body border-b border-ed-line py-3 text-sm text-ed-ink-muted">
                      — {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8" data-ed-reveal style={delay(400)}>
                  <Link href="/tienda" className="ed-btn ed-btn--ink">
                    Comprar plantilla — {formatPrice()}
                    <span className="ed-arrow ml-3" aria-hidden="true">→</span>
                  </Link>
                  <p className="ed-mono mt-4 text-ed-ink-muted">Mercado Pago · Entrega inmediata</p>
                </div>

                <p className="ed-body mt-8 border-t border-ed-line pt-5 text-xs text-ed-ink-muted">
                  {PRODUCT_CONFIG.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 06 · CREDENCIALES ── */}
        <section aria-label="Rigor y transparencia" className="bg-ed-surface-ink py-20 text-ed-ink-on-dark md:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="mb-14 max-w-2xl" data-ed-reveal>
              <p className="ed-eyebrow ed-eyebrow--on-dark">Rigor y transparencia</p>
              <h2 className="ed-h2 mt-5 text-ed-ink-on-dark">Hecho para arrendadores en Colombia</h2>
            </div>

            <div className="grid gap-px border border-ed-line-dark bg-ed-line-dark sm:grid-cols-2">
              {[
                { mark: 'Ley 820', title: 'Normativa colombiana', copy: 'Ley 820 de 2003, Código Civil y legislación de vivienda vigente.' },
                { mark: 'Art. 27', title: 'Fuentes verificables', copy: 'Citas normativas y artículos específicos en cada guía publicada.' },
                { mark: '2003', title: 'Contenido informativo', copy: 'No somos abogados. Consulta con un profesional en casos litigiosos.' },
                { mark: 'COL', title: 'Hecho para Colombia', copy: 'Vivienda urbana, arrendadores independientes y contexto local real.' },
              ].map((item, i) => (
                <div
                  key={item.mark}
                  className="bg-ed-surface-ink p-8 md:p-10"
                  data-ed-reveal
                  style={delay(i * 80)}
                >
                  <p className="ed-h3 text-3xl text-ed-accent-on-dark">{item.mark}</p>
                  <h3 className="ed-h3 mt-5 text-xl text-ed-ink-on-dark">{item.title}</h3>
                  <p className="ed-body mt-3 max-w-[42ch] text-sm text-ed-ink-on-dark/65">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 07 · NEWSLETTER ── */}
        <section aria-label="Boletín" className="relative overflow-hidden bg-ed-surface-muted py-20 md:py-28">
          <div className="ed-diagonal pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="max-w-2xl" data-ed-reveal>
              <p className="ed-eyebrow">Recursos para arrendadores</p>
              <h2 className="ed-h2 mt-5">Lo útil, directo a tu correo.</h2>
              <p className="ed-body mt-4 text-ed-ink-muted">
                Novedades de la Ley 820, nuevas calculadoras y plantillas. Sin spam.
              </p>
            </div>

            <div className="mt-10 max-w-2xl" data-ed-reveal style={delay(120)}>
              <NewsletterCTA source="home-editorial" hideHeader variant="editorial" />
              <p className="ed-mono mt-5 text-ed-ink-muted">
                Sin spam · Cancela cuando quieras · Datos en Colombia
              </p>
            </div>
          </div>
        </section>

        {/* ── 08 · CIERRE ── */}
        <section aria-label="Empieza a arrendar mejor" className="relative overflow-hidden bg-ed-canvas py-20 md:py-28">
          <span className="ed-watermark" aria-hidden="true">ARRENDAR CON CONFIANZA</span>
          <div className="relative mx-auto max-w-7xl px-6 text-center sm:px-8 lg:px-12">
            <h2 className="ed-h2" data-ed-reveal>Empieza a arrendar mejor.</h2>
            <p className="ed-body mx-auto mt-4 max-w-xl text-ed-ink-muted" data-ed-reveal style={delay(80)}>
              Guías prácticas, calculadoras de rentabilidad y contratos listos para personalizar hoy mismo.
            </p>

            <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
              {[
                { n: '01', title: 'Explorar guías', copy: 'Leyes y procedimientos', href: '/guias' },
                { n: '02', title: 'Usar herramientas', copy: 'Reajuste e inventario', href: '/herramientas' },
                { n: '03', title: 'Comprar plantilla', copy: formatPrice(), href: '/tienda' },
              ].map((item, i) => (
                <Link
                  key={item.n}
                  href={item.href}
                  className="ed-ficha block p-6"
                  data-ed-reveal
                  style={delay(120 + i * 80)}
                >
                  <span className="ed-mono text-ed-ink-muted">{item.n}</span>
                  <h3 className="ed-h3 mt-5 text-xl">{item.title}</h3>
                  <p className="ed-body mt-2 text-sm text-ed-ink-muted">{item.copy}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
