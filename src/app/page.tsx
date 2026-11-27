import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  ClipboardCheck,
  ShieldAlert,
  Calculator,
  ArrowRight,
  BookOpen,
  Link2,
  Scale,
  MapPin,
  Lock,
  ScrollText,
} from 'lucide-react';

import NewsletterCTA from '@/components/NewsletterCTA';
import JsonLd from '@/components/JsonLd';
import { PRODUCT_CONFIG, formatPrice } from '@/lib/product';
import { getAllPosts, isValidSlug, blogPostHref } from '@/lib/blog';
import { Reveal, ScrollProgress, StickyProductCta } from '@/components/home/Motion';
import FloorPlan from '@/components/home/FloorPlan';
import IsoBuilding from '@/components/home/IsoBuilding';
import { ContractMockup } from '@/components/home/ContractMockup';
import { IPC_CONFIG } from '@/lib/ipc-config';
import { RENTABILIDAD_DEFAULTS, calcularRentabilidad } from '@/lib/rentabilidad-config';
import { absoluteUrl, homeJsonLd } from '@/lib/seo';
import { baseOpenGraph, baseTwitter } from '@/lib/metadata';



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

// Formateo COP es-CO para previsualizaciones ilustrativas (no cálculo).
function formatCOP(valor: number): string {
  return `$${Math.round(valor).toLocaleString("es-CO")}`;
}

export default function Home() {

  const posts = getAllPosts().filter((p) => isValidSlug(p.slug)).slice(0, 4);
  const featuredPost = posts.find((post) => post.featured === true) ?? posts[0];
  const secondaryPosts = posts.filter((post) => post.slug !== featuredPost?.slug).slice(0, 3);

  // Previsualización ilustrativa de reajuste con IPC real (IPC_CONFIG).
  const reajusteEjemploCanon = 1_200_000;
  const reajustePorcentaje = IPC_CONFIG.ipc;
  const reajusteAumento = Math.round(reajusteEjemploCanon * (reajustePorcentaje / 100));
  const reajusteNuevoCanon = reajusteEjemploCanon + reajusteAumento;

  // Previsualización ilustrativa DEMO con cálculo real + defaults reales.
  const rentabilidadEjemplo = calcularRentabilidad(
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
  // Escala común derivada de los valores reales: la barra mayor siempre es la de mayor valor.
  const rentabilidadEscalaMax = Math.ceil(
    Math.max(rentabilidadEjemplo.rentabilidadNeta, RENTABILIDAD_DEFAULTS.tasaCDT, 1),
  );
  const rentabilidadNetaAncho = (rentabilidadEjemplo.rentabilidadNeta / rentabilidadEscalaMax) * 100;
  const rentabilidadCdtAncho = (RENTABILIDAD_DEFAULTS.tasaCDT / rentabilidadEscalaMax) * 100;
  const reajusteCanonActualAncho = (reajusteEjemploCanon / reajusteNuevoCanon) * 100;

  function formatPorcentaje(valor: number, decimales = 2): string {
    return valor.toFixed(decimales).replace('.', ',');
  }

  return (
    <>
      <JsonLd data={homeJsonLd} />
      <ScrollProgress />
      <StickyProductCta />

      {/* ── 1. THE LEGAL ARTIFACT — EDITORIAL CONTRACT EDITION ── */}
      <section className="relative overflow-hidden bg-ivory">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            {/* Columna izquierda: Maqueta contrato 3D */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <Reveal delay={100} threshold={0.1}>
                <ContractMockup />
              </Reveal>
            </div>

            {/* Columna derecha: Presentación editorial */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <Reveal delay={0} threshold={0.1}>
                {/* Eyebrow: PRODUCTO DESTACADO */}
                <div className="mb-6">
                  <span className="inline-block text-xs font-mono font-medium uppercase tracking-[0.15em] text-bronze">
                    PRODUCTO DESTACADO
                  </span>
                </div>

                {/* Título editorial */}
                <h1 className="mt-4 max-w-xl font-display font-normal leading-[0.95] tracking-[-0.01em] text-charcoal">
                  <span className="block text-[clamp(2rem,3vw,3rem)]">
                    Contrato de Arrendamiento
                  </span>
                  <span className="block text-sm text-terracotta uppercase tracking-wider mb-4">
                    Vivienda Urbana · República de Colombia
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={150} threshold={0.1}>
                {/* Descripción comercial basada en configuración */}
                <p className="mb-8 max-w-xl text-base leading-relaxed text-muted">
                  {PRODUCT_CONFIG.description}
                </p>
              </Reveal>

              <Reveal delay={300} threshold={0.1}>
                {/* Precio destacado */}
                <div className="mb-8">
                  <span className="font-mono text-3xl font-semibold text-green-deep tabular-nums">
                    {formatPrice().split(' ')[0]}
                  </span>
                  <span className="text-terracotta font-mono text-sm font-medium uppercase tracking-wider">
                    {formatPrice().split(' ')[1]}
                  </span>
                </div>

                {/* Badge PAGO ÚNICO */}
                <div className="mb-8 flex items-center gap-2">
                  <span className="font-mono text-xs font-medium text-bronze uppercase tracking-wider">
                    PAGO ÚNICO
                  </span>
                </div>
              </Reveal>

              <Reveal delay={450} threshold={0.1}>
                {/* Beneficios indexados editorialmente */}
                <div className="mb-8 space-y-1">
                  {PRODUCT_CONFIG.includes.map((benefit, i) => (
                    <div
                      key={i}
                      className="contract-benefit-item flex items-start gap-3 py-4 border-y border-charcoal/20 last:border-0 first:border-t-0"
                    >
                      <span className="font-mono text-xs font-medium text-bronze shrink-0">
                        {i + 1}.
                      </span>
                      <div>
                        <span className="font-display font-medium text-charcoal block">
                          {benefit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={600} threshold={0.1}>
                {/* CTA principal */}
                <div className="mb-8">
                  <Link
                    href="/tienda"
                    className="group contract-cta inline-flex min-h-[52px] items-center gap-3 rounded-xl bg-green-deep px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-green-mid hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
                  >
                    Comprar plantilla — {formatPrice()}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={750} threshold={0.1}>
                {/* Información de confianza */}
                <div className="flex items-center justify-between pt-6 border-t border-charcoal/15">
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="10 14 16 14" />
                      <line points="21 13 21 19" />
                    </svg>
                    Pago seguro vía Mercado Pago ·
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-terracotta">
                      Entrega por correo electrónico
                    </span>
                  </div>
                </div>

                {/* Descargo legal */}
                <p className="mt-8 pt-6 border-t border-charcoal/10 text-[11px] text-muted/80 leading-relaxed max-w-xl">
                  {PRODUCT_CONFIG.disclaimer}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      {/* ── 2. PROBLEM-SOLVING SECTION (Warm Ivory Background) ── */}
      <section className="bg-ivory py-16 md:py-24 border-b border-charcoal/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          
          <Reveal threshold={0.3}>
            <div className="mb-12 max-w-2xl">
              <p className="flex items-center gap-3 font-mono text-xs text-muted">
                Cuatro problemas reales
                <span className="h-px w-12 bg-bronze" aria-hidden="true" />
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl text-charcoal font-normal">
                ¿Qué necesitas resolver hoy?
              </h2>
              <p className="mt-3 text-base text-muted">
                Cuatro frentes esenciales para administrar una propiedad urbana.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-12 items-stretch">
            {/* Left featured block 01 with architectural piece */}
            <div className="lg:col-span-7">
              <Reveal delay={100} threshold={0.3}>
                <Link
                  href="/guias/contratos"
                  className="group flex h-full flex-col justify-between rounded-2xl bg-green-deep p-8 text-white transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-bronze"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex items-center border border-bright-bronze/40 px-2.5 py-1 font-mono text-[11px] font-medium text-bright-bronze">
                        01 · Recomendado
                      </span>
                      <ScrollText className="h-8 w-8 text-white/90" aria-hidden="true" />
                    </div>
                    <div className="mt-6 grid items-center gap-6 sm:grid-cols-[1fr_minmax(0,14rem)]">
                      <div>
                        <h3 className="font-display text-3xl font-normal text-white leading-tight">
                          Crear un contrato sólido y seguro
                        </h3>
                        <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
                          Aprende qué cláusulas son obligatorias por la Ley 820 de 2003, los elementos
                          mínimos del art. 3, cómo pactar garantías exigibles y qué errores anulan tu
                          contrato en un proceso judicial.
                        </p>
                      </div>
                      <FloorPlan className="mx-auto w-full max-w-[14rem] text-white/60" />
                    </div>
                  </div>
                  <div className="mt-8 flex items-center gap-2 font-mono text-sm text-bright-bronze font-medium">
                    Explorar guías de contratos
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </div>
                </Link>
              </Reveal>
            </div>

            {/* Right: editorial list (no card containers) */}
            <div className="lg:col-span-5">
              {/* 02 */}
              <Reveal delay={200} threshold={0.3}>
                <Link
                  href="/herramientas/checklist-entrega"
                  className="group block border-t border-charcoal/20 py-5 transition-colors duration-200 hover:border-bronze focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
                >
                  <span className="font-mono text-xs text-bronze font-medium">02</span>
                  <h4 className="mt-1 font-display text-xl text-charcoal transition-colors duration-200 group-hover:text-bronze">
                    Entregar o recibir un inmueble
                  </h4>
                  <p className="mt-1.5 text-sm text-muted line-clamp-2">
                    Actas de entrega, inventario fotográfico detallado y medidores de servicios.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-green-deep transition-colors duration-200 group-hover:text-bronze">
                    Explorar herramienta
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>

              {/* 03 */}
              <Reveal delay={300} threshold={0.3}>
                <Link
                  href="/guias/morosos"
                  className="group block border-t border-charcoal/20 py-6 transition-colors duration-200 hover:border-bronze focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
                >
                  <span className="font-mono text-xs text-bronze font-medium">03</span>
                  <h4 className="mt-1 font-display text-xl text-charcoal transition-colors duration-200 group-hover:text-bronze">
                    Gestionar morosidad a tiempo
                  </h4>
                  <p className="mt-1.5 text-sm text-muted line-clamp-2">
                    Rutas de conciliación, cartas de cobro preventivo y causales de terminación.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-green-deep transition-colors duration-200 group-hover:text-bronze">
                    Leer procedimiento
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>

              {/* 04 */}
              <Reveal delay={400} threshold={0.3}>
                <Link
                  href="/herramientas/rentabilidad"
                  className="group block border-t border-charcoal/20 py-5 transition-colors duration-200 hover:border-bronze focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
                >
                  <span className="font-mono text-xs text-bronze font-medium">04</span>
                  <h4 className="mt-1 font-display text-xl text-charcoal transition-colors duration-200 group-hover:text-bronze">
                    Calcular finanzas y reajuste
                  </h4>
                  <p className="mt-1.5 text-sm text-muted line-clamp-2">
                    Rentabilidad real neta vs CDT, vacancia, impuestos y reajuste de canon IPC.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-green-deep transition-colors duration-200 group-hover:text-bronze">
                    Usar calculadora
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. METHODOLOGY SECTION: LA FORMA ARRENDADORCO (White Background) ── */}
      <section className="bg-white py-16 md:py-24 border-b border-charcoal/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          
          <div className="mb-12 max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-xs text-muted">
              <span className="font-medium">§ 03</span>
              MÉTODO DE GESTIÓN
              <span className="h-px w-12 bg-bronze" aria-hidden="true" />
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-charcoal font-normal">
              La forma ArrendadorCO
            </h2>
            <p className="mt-2 text-base text-muted max-w-xl">
              Un proceso ordenado en cuatro etapas para proteger tu patrimonio en cada ciclo.
            </p>
          </div>

          {/* Single responsive timeline + isométrico arquitectónico (Opción A) */}
          <div className="relative mx-auto max-w-5xl">
            {/* Edificio isométrico: eje visual del ciclo */}
            <Reveal threshold={0.3}>
              <IsoBuilding className="mx-auto mb-10 w-full max-w-[13rem] text-green-deep sm:max-w-[15rem] md:max-w-[17rem]" />
            </Reveal>

            {/* Línea de progreso + cuatro estaciones (una sola marca, responsive) */}
            <div className="relative">
              {/* Connecting line -> narrativa de progreso */}
              <Reveal threshold={0.3}>
                <span className="method-line absolute left-[19px] right-4 top-[15px] h-px bg-charcoal/15 md:left-[15px] md:right-[15px] md:top-[19px] md:h-[2px]" aria-hidden="true" />
              </Reveal>

              <div className="grid gap-8 md:grid-cols-4 md:gap-8">
                  {/* 01 Preparar */}
                  <Reveal delay={0} threshold={0.3}>
                    <div className="group relative pl-12 md:pl-0">
                      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-bronze/40 bg-white md:mb-3 md:h-10 md:w-10">
                        <FileText className="h-4 w-4 text-green-deep transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none md:h-5 md:w-5" aria-hidden="true" />
                      </span>
                      <svg className="mb-2 hidden h-7 w-10 text-bronze transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none md:block" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="0.75" aria-hidden="true"><rect x="2" y="2" width="14" height="14" rx="1" /><path d="M5 6h8M5 9h8M5 12h5" /><path d="M18 6h4v10" /></svg>
                      <span className="font-mono text-xs text-bronze font-medium">01</span>
                      <h3 className="mt-1 font-display text-xl text-charcoal font-normal transition-colors duration-200 group-hover:text-green-deep md:text-2xl">Preparar</h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">Contrato firmado, documentos verificados y condiciones claras desde el inicio.</p>
                    </div>
                  </Reveal>

                  {/* 02 Entregar */}
                  <Reveal delay={150} threshold={0.3}>
                    <div className="group relative pl-12 md:pl-0">
                      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-bronze/40 bg-white md:mb-3 md:h-10 md:w-10">
                        <ClipboardCheck className="h-4 w-4 text-green-deep transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none md:h-5 md:w-5" aria-hidden="true" />
                      </span>
                      <svg className="mb-2 hidden h-7 w-10 text-bronze transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none md:block" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="0.75" aria-hidden="true"><rect x="3" y="1" width="15" height="16" rx="1" /><path d="M6 5h9M6 8h9M6 11h6" /><path d="M14 13l2 2 3-4" /></svg>
                      <span className="font-mono text-xs text-bronze font-medium">02</span>
                      <h3 className="mt-1 font-display text-xl text-charcoal font-normal transition-colors duration-200 group-hover:text-green-deep md:text-2xl">Entregar</h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">Acta de entrega, inventario fotográfico y registro objetivo del estado del inmueble.</p>
                    </div>
                  </Reveal>

                  {/* 03 Gestionar */}
                  <Reveal delay={300} threshold={0.3}>
                    <div className="group relative pl-12 md:pl-0">
                      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-bronze/40 bg-white md:mb-3 md:h-10 md:w-10">
                        <Calculator className="h-4 w-4 text-green-deep transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none md:h-5 md:w-5" aria-hidden="true" />
                      </span>
                      <svg className="mb-2 hidden h-7 w-10 text-bronze transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none md:block" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="0.75" aria-hidden="true"><path d="M2 15h20" /><path d="M4 12l4-4 4 3 6-7" /><circle cx="18" cy="4" r="1.4" fill="currentColor" stroke="none" /></svg>
                      <span className="font-mono text-xs text-bronze font-medium">03</span>
                      <h3 className="mt-1 font-display text-xl text-charcoal font-normal transition-colors duration-200 group-hover:text-green-deep md:text-2xl">Gestionar</h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">Control de pagos, obligaciones del inquilino y comunicación documentada por escrito.</p>
                    </div>
                  </Reveal>

                  {/* 04 Proteger — cierre visual */}
                  <Reveal delay={450} threshold={0.3}>
                    <div className="group relative pl-12 md:pl-0">
                      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-bronze bg-white md:mb-3 md:h-10 md:w-10">
                        <ShieldAlert className="h-4 w-4 text-green-deep transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none md:h-5 md:w-5" aria-hidden="true" />
                      </span>
                      <svg className="mb-2 hidden h-7 w-10 text-bronze transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none md:block" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="0.75" aria-hidden="true"><path d="M3 5V3h3M21 5V3h-3M3 13v2h3M21 13v2h-3" /><path d="M9 9l2 2 4-4" /></svg>
                      <span className="font-mono text-xs text-bronze font-medium">04</span>
                      <h3 className="mt-1 font-display text-xl text-charcoal font-normal transition-colors duration-200 group-hover:text-green-deep md:text-2xl">Proteger</h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">Seguros de arrendamiento, procedimientos legales y rutas de acción ante incumplimientos.</p>
                      <span className="mt-3 inline-flex items-center gap-2 border-t border-bronze/30 pt-3 font-mono text-[11px] uppercase tracking-wider text-bronze">CICLO COMPLETO · PATRIMONIO PROTEGIDO</span>
                    </div>
                  </Reveal>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. FREE TOOLS SECTION (Deep Forest Green Background) ── */}
      <section className="bg-green-deep py-16 md:py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <Reveal threshold={0.15}>
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-bright-bronze font-medium">
                HERRAMIENTAS GRATUITAS
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl text-white font-normal">
                Todo lo que necesitas, sin costo
              </h2>
            </div>
            <Link
              href="/herramientas"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-bright-bronze hover:text-white transition-colors"
            >
              Ver todas las herramientas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* ── COMPOSICIÓN EDITORIAL 60/40: un instrumento principal, dos complementarios ── */}
          <div className="tools-editorial grid min-w-0 gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-10">
            {/* 01 · Reajuste de canon — superficie marfil, protagonista */}
            <div className="min-w-0">
              <Reveal delay={0} threshold={0.25}>
                <article className="tools-editorial__paper group flex h-full flex-col p-6 transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-bronze">
                      01 · Reajuste de canon
                    </span>
                    <span className="border border-bronze/30 px-2 py-1 font-mono text-[10px] font-medium tabular-nums text-bronze">
                      IPC DANE {IPC_CONFIG.year} · {formatPorcentaje(reajustePorcentaje)} %
                    </span>
                  </div>

                  <h3 className="mt-7 font-display text-3xl font-normal leading-tight text-charcoal sm:text-4xl">
                    Reajuste de canon
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                    El nuevo valor legal de tu arriendo, calculado con el IPC del año anterior.
                  </p>

                  {/* Visualización del cálculo con jerarquía real */}
                  <div className="mt-8 border-y border-bronze/25 py-6">
                    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-bronze">Canon actual</p>
                        <p className="mt-2 font-body text-base font-medium tabular-nums text-charcoal sm:text-lg">
                          {formatCOP(reajusteEjemploCanon)}
                        </p>
                      </div>
                      <p className="font-mono text-3xl font-medium leading-none tabular-nums text-bronze sm:text-4xl">
                        +{formatPorcentaje(reajustePorcentaje)} %
                      </p>
                    </div>

                    <div className="my-5 flex items-center gap-3" aria-hidden="true">
                      <span className="h-px flex-1 bg-bronze/25" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bronze">Aplica IPC · Ley 820</span>
                      <span className="h-px flex-1 bg-bronze/25" />
                    </div>

                    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-bronze">Nuevo canon</p>
                        <p className="mt-2 font-body text-3xl font-bold leading-none tracking-tight tabular-nums text-green-deep sm:text-4xl">
                          {formatCOP(reajusteNuevoCanon)}
                        </p>
                      </div>
                      <p className="font-mono text-[11px] tabular-nums text-muted">
                        Ejemplo de cálculo · +{formatCOP(reajusteAumento)} de incremento
                      </p>
                    </div>
                  </div>

                  {/* Escala común: la barra del nuevo canon es siempre la más larga */}
                  <div
                    className="mt-7"
                    role="img"
                    aria-label={`Escala de canon: actual ${formatCOP(reajusteEjemploCanon)}, nuevo ${formatCOP(reajusteNuevoCanon)}`}
                  >
                    <div className="mb-3 flex flex-wrap justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                      <span>Escala 0 → {formatCOP(reajusteNuevoCanon)}</span>
                      <span>IPC {formatPorcentaje(reajustePorcentaje)} %</span>
                    </div>
                    <div className="space-y-3" aria-hidden="true">
                      <div>
                        <div className="mb-1 flex justify-between gap-3 font-mono text-[11px] tabular-nums text-muted">
                          <span>Actual</span><span>{formatCOP(reajusteEjemploCanon)}</span>
                        </div>
                        <div className="tools-editorial__track">
                          <div
                            className="tools-editorial__fill tools-editorial__fill--base bar-fill"
                            style={{ width: `${reajusteCanonActualAncho}%`, animationDelay: '160ms' }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between gap-3 font-mono text-[11px] font-medium tabular-nums text-green-deep">
                          <span>Nuevo</span><span>{formatCOP(reajusteNuevoCanon)}</span>
                        </div>
                        <div className="tools-editorial__track">
                          <div
                            className="tools-editorial__fill tools-editorial__fill--next bar-fill"
                            style={{ width: '100%', animationDelay: '240ms' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/herramientas/reajuste-canon"
                    className="group/cta mt-9 inline-flex min-h-11 w-full items-center justify-between gap-4 rounded-sm bg-green-deep px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-green-mid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-deep motion-reduce:transition-none sm:w-auto sm:min-w-[240px]"
                  >
                    <span>Calcular ahora</span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-200 group-hover/cta:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/cta:translate-x-0"
                    >
                      →
                    </span>
                  </Link>
                </article>
              </Reveal>
            </div>

            {/* 02 y 03 · instrumentos complementarios sobre el verde */}
            <div className="grid min-w-0 gap-10 md:grid-cols-2 lg:grid-cols-1">
              {/* 02 · Rentabilidad real */}
              <div className="min-w-0 border-t border-white/15 pt-6">
                <Reveal delay={150} threshold={0.25}>
                  <article className="tools-editorial__secondary group flex h-full flex-col transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-bright-bronze">
                        02 · Rentabilidad
                      </span>
                      <span className="border border-bright-bronze/40 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-bright-bronze">
                        Demo
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-normal leading-tight text-white sm:text-3xl">
                      Rentabilidad real
                    </h3>
                    <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/70">
                      Retorno neto frente a un CDT, después de costos y vacancia.
                    </p>

                    <div
                      className="mt-7"
                      role="img"
                      aria-label={`Comparación en escala común de 0 a ${rentabilidadEscalaMax} por ciento: rentabilidad neta ${formatPorcentaje(rentabilidadEjemplo.rentabilidadNeta, 1)} por ciento, CDT de referencia ${RENTABILIDAD_DEFAULTS.tasaCDT} por ciento`}
                    >
                      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.12em] text-white/60">
                        Escala 0 – {rentabilidadEscalaMax} % E.A.
                      </p>
                      <div className="space-y-4" aria-hidden="true">
                        <div>
                          <div className="mb-1.5 flex items-baseline justify-between gap-3 font-mono text-[11px] text-white/80">
                            <span>Rentabilidad neta</span>
                            <span className="font-medium tabular-nums text-white">{formatPorcentaje(rentabilidadEjemplo.rentabilidadNeta, 1)} %</span>
                          </div>
                          <div className="tools-editorial__track tools-editorial__track--dark">
                            <div
                              className="tools-editorial__fill tools-editorial__fill--neta bar-fill"
                              style={{ width: `${rentabilidadNetaAncho}%`, animationDelay: '180ms' }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="mb-1.5 flex items-baseline justify-between gap-3 font-mono text-[11px] text-white/80">
                            <span>CDT de referencia</span>
                            <span className="tabular-nums">{RENTABILIDAD_DEFAULTS.tasaCDT} %</span>
                          </div>
                          <div className="tools-editorial__track tools-editorial__track--dark">
                            <div
                              className="tools-editorial__fill tools-editorial__fill--cdt bar-fill"
                              style={{ width: `${rentabilidadCdtAncho}%`, animationDelay: '480ms' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 font-mono text-[10px] text-white/60">
                      Ejemplo ilustrativo · no es un resultado personalizado.
                    </p>

                    <Link
                      href="/herramientas/rentabilidad"
                      className="group/cta mt-6 inline-flex min-h-11 items-center gap-2 self-start font-mono text-xs font-medium text-bright-bronze transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bright-bronze motion-reduce:transition-none"
                    >
                      <span>Calcular rentabilidad</span>
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-200 group-hover/cta:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/cta:translate-x-0"
                      >
                        →
                      </span>
                    </Link>
                  </article>
                </Reveal>
              </div>

              {/* 03 · Checklist de entrega — fragmento de acta real */}
              <div className="min-w-0 border-t border-white/15 pt-6">
                <Reveal delay={300} threshold={0.25}>
                  <article className="tools-editorial__secondary group flex h-full flex-col transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-bright-bronze">
                        03 · Checklist
                      </span>
                      <span className="border border-bright-bronze/40 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-bright-bronze">
                        Genera PDF
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-normal leading-tight text-white sm:text-3xl">
                      Checklist de entrega
                    </h3>
                    <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/70">
                      Documenta el estado del inmueble y exporta el acta en PDF.
                    </p>

                    {/* Fragmento de acta de inspección */}
                    <div className="tools-editorial__acta mt-7 p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-3 border-b border-bronze/25 pb-2.5">
                        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-bronze">
                          Acta de inventario
                        </span>
                        <span className="font-mono text-[10px] tabular-nums text-charcoal">Entrega · 2/4</span>
                      </div>
                      <ul className="mt-3 space-y-2 font-mono text-[11px] leading-relaxed text-charcoal sm:text-xs">
                        <li className="flex items-baseline gap-2">
                          <span aria-hidden="true" className="text-green-deep">✓</span>
                          <span className="sr-only">Completado: </span>Llaves entregadas
                        </li>
                        <li className="flex items-baseline gap-2">
                          <span aria-hidden="true" className="text-green-deep">✓</span>
                          <span className="sr-only">Completado: </span>Medidores registrados
                        </li>
                        <li className="flex items-baseline gap-2 text-muted">
                          <span aria-hidden="true" className="text-charcoal/40">○</span>
                          <span className="sr-only">Pendiente: </span>Fotos del estado
                        </li>
                        <li className="flex items-baseline gap-2 text-muted">
                          <span aria-hidden="true" className="text-charcoal/40">○</span>
                          <span className="sr-only">Pendiente: </span>Firma del inquilino
                        </li>
                      </ul>
                      <div className="mt-4">
                        <div className="mb-1.5 flex justify-between font-mono text-[10px] text-muted">
                          <span>Registro</span><span className="tabular-nums">50 %</span>
                        </div>
                        <div
                          className="tools-editorial__track"
                          role="progressbar"
                          aria-label="Ítems completados del acta de ejemplo"
                          aria-valuenow={2}
                          aria-valuemin={0}
                          aria-valuemax={4}
                        >
                          <div
                            className="tools-editorial__fill tools-editorial__fill--next bar-fill"
                            style={{ width: '50%', animationDelay: '120ms' }}
                          />
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/herramientas/checklist-entrega"
                      className="group/cta mt-6 inline-flex min-h-11 items-center gap-2 self-start font-mono text-xs font-medium text-bright-bronze transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bright-bronze motion-reduce:transition-none"
                    >
                      <span>Abrir checklist</span>
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-200 group-hover/cta:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/cta:translate-x-0"
                      >
                        →
                      </span>
                    </Link>
                  </article>
                </Reveal>
              </div>
            </div>
          </div>
          </Reveal>

          {/* Pieza arquitectonica 2.5D secundaria - no compite con las herramientas */}
          <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6" aria-hidden="true">
            <IsoBuilding className="h-12 w-9 shrink-0 text-bright-bronze/70" />
            <p className="font-mono text-[11px] uppercase tracking-wider text-white/60">Un inmueble · un ciclo · herramientas reales</p>
          </div>

        </div>
      </section>

            {/* ── 5. FEATURED PRODUCT: CONTRATO DE ARRENDAMIENTO (Warm Ivory Background) ── */}
      <section className="bg-ivory py-16 md:py-24 border-b border-charcoal/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="rounded-3xl border border-charcoal/10 bg-surface p-8 sm:p-12 lg:p-14 shadow-xl">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              
              {/* LEFT COLUMN: Product details (7 cols) */}
              <div className="lg:col-span-7">
                <span className="font-mono text-xs uppercase tracking-widest text-bronze font-medium">
                  PRODUCTO DESTACADO
                </span>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl text-charcoal font-normal">
                  {PRODUCT_CONFIG.name}
                </h2>
                <p className="mt-3 text-base text-muted max-w-xl">
                  Contrato editable basado en la Ley 820 de 2003. Listo para personalizar en Word o Google Docs con redacción preventiva.
                </p>

                {/* Price block */}
                <div className="my-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl sm:text-5xl font-normal text-green-deep">
                      {formatPrice()}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-bronze font-medium">
                    Pago único · Entrega por correo inmediata
                  </span>
                </div>

                {/* Benefits list */}
                <ul className="mb-8 space-y-3">
                  {[
                    'Campos dinámicos (fecha, valor, garantía, índice de reajuste)',
                    'Cláusulas de protección: daño, subarriendo y terminación anticipada',
                    'Formato .docx editable + compatible con Google Docs',
                    'Guía de personalización en PDF incluida',
                    'Versión 1.0.0 · Actualizaciones normativas por 12 meses',
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm text-charcoal">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bronze/15 text-bronze font-bold text-xs">
                        ✓
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA & Trust */}
                <div className="space-y-3 max-w-md">
                  <Link
                    href="/tienda"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-deep px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-green-mid hover:scale-[1.01] active:scale-[0.99] shadow-md"
                  >
                    <Lock className="h-4 w-4 text-bright-bronze" />
                    Comprar plantilla — {formatPrice()}
                  </Link>

                  <p className="font-mono text-[11px] text-center text-muted">
                    Pago seguro vía Mercado Pago · Entrega inmediata por correo
                  </p>
                </div>

                {/* Legal disclaimer */}
                <p className="mt-6 border-t border-charcoal/10 pt-4 text-xs text-muted/80 leading-relaxed max-w-xl">
                  {PRODUCT_CONFIG.disclaimer}
                </p>
              </div>

              {/* RIGHT COLUMN: Realistic Stacked Document Mockup (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-[340px]">
                  
                  {/* Page 3: Back Stack */}
                  <div className="absolute inset-0 rounded-xl bg-white border border-charcoal/15 shadow-sm transform translate-x-3 -translate-y-2 rotate-3" />
                  
                  {/* Page 2: Middle Stack */}
                  <div className="absolute inset-0 rounded-xl bg-white border border-charcoal/15 shadow-md transform translate-x-1.5 -translate-y-1 rotate-[1.5deg]" />

                  {/* Page 1: Main Front Page */}
                  <div className="relative rounded-xl border border-charcoal/15 bg-white shadow-2xl overflow-hidden">
                    
                    {/* Top Green Band */}
                    <div className="bg-green-deep p-4 text-center text-white">
                      <p className="font-display text-sm tracking-wider font-normal text-white">
                        CONTRATO DE ARRENDAMIENTO
                      </p>
                      <p className="font-mono text-[9px] text-white/70 mt-0.5">
                        Vivienda Urbana · República de Colombia
                      </p>
                    </div>

                    {/* Document body */}
                    <div className="p-5 space-y-4">
                      
                      {/* Section 1 */}
                      <div>
                        <span className="font-mono text-[9px] font-semibold text-green-deep uppercase tracking-wider block mb-2">
                          PARTES CONTRATANTES
                        </span>
                        <div className="space-y-1.5">
                          <div className="h-2 w-[85%] rounded-full bg-charcoal/10" />
                          <div className="h-2 w-[70%] rounded-full bg-charcoal/10" />
                          <div className="h-2 w-[90%] rounded-full bg-charcoal/10" />
                        </div>
                      </div>

                      <div className="h-px w-full bg-charcoal/10" />

                      {/* Section 2 */}
                      <div>
                        <span className="font-mono text-[9px] font-semibold text-green-deep uppercase tracking-wider block mb-2">
                          CLÁUSULAS ESENCIALES
                        </span>
                        <div className="space-y-1.5">
                          <div className="h-2 w-[75%] rounded-full bg-charcoal/10" />
                          <div className="h-2 w-[88%] rounded-full bg-charcoal/10" />
                          <div className="h-2 w-[65%] rounded-full bg-charcoal/10" />
                          <div className="h-2 w-[80%] rounded-full bg-charcoal/10" />
                        </div>
                      </div>

                      <div className="h-px w-full bg-charcoal/10" />

                      {/* Section 3 */}
                      <div>
                        <span className="font-mono text-[9px] font-semibold text-green-deep uppercase tracking-wider block mb-2">
                          VALOR Y VIGENCIA
                        </span>
                        <div className="space-y-1.5">
                          <div className="h-2 w-[70%] rounded-full bg-charcoal/10" />
                          <div className="h-2 w-[55%] rounded-full bg-charcoal/10" />
                        </div>
                      </div>

                      {/* Bottom pills */}
                      <div className="flex items-center gap-2 pt-2">
                        <span className="rounded-md bg-bronze/15 px-2 py-0.5 font-mono text-[9px] font-semibold text-bronze">
                          LEY 820 · 2003
                        </span>
                        <span className="rounded-md bg-charcoal/10 px-2 py-0.5 font-mono text-[9px] font-medium text-charcoal">
                          v1.0.0
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Compatibility badges floating below */}
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <div className="flex items-center gap-1.5 rounded-lg border border-charcoal/10 bg-white px-3 py-1.5 shadow-sm text-xs font-medium text-charcoal">
                      <FileText className="h-4 w-4 text-green-deep" />
                      <span>Word .docx</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg border border-charcoal/10 bg-white px-3 py-1.5 shadow-sm text-xs font-medium text-charcoal">
                      <FileText className="h-4 w-4 text-bronze" />
                      <span>Google Docs</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 6. EDITORIAL GUIDES SECTION (White Background) ── */}
      <section className="bg-white py-16 md:py-24 border-b border-charcoal/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-bronze font-medium">
                CONTENIDO EDITORIAL
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl text-charcoal font-normal">
                Guías para arrendadores
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-green-deep hover:text-green-mid transition-colors font-medium"
            >
              Ver todas las guías
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-stretch">
            
            {/* Featured Article (60% -> col-span-7) */}
            {featuredPost && (
              <div className="lg:col-span-7">
                <Reveal>
                  {(() => {
                    const href = blogPostHref(featuredPost.slug);
                    if (!href) return null;
                    return (
                      <Link
                        href={href}
                        className="group flex h-full flex-col justify-between rounded-2xl border border-charcoal/10 bg-surface p-8 transition-all hover:bg-ivory hover:shadow-lg"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs uppercase tracking-wider text-bronze font-semibold">
                              {featuredPost.category || 'CONTRATOS'}
                            </span>
                            <time className="font-mono text-xs text-muted">{featuredPost.date}</time>
                          </div>

                          <h3 className="mt-4 font-display text-2xl sm:text-3xl text-charcoal font-normal group-hover:text-green-deep transition-colors leading-snug">
                            {featuredPost.title}
                          </h3>

                          <p className="mt-3 text-base text-muted line-clamp-3 leading-relaxed">
                            {featuredPost.excerpt}
                          </p>
                        </div>

                        <div className="mt-6 flex items-center gap-2 font-mono text-xs font-semibold text-green-deep">
                          Leer guía completa
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    );
                  })()}
                </Reveal>
              </div>
            )}

            {/* Secondary Articles (40% -> col-span-5) */}
            <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
              {secondaryPosts.map((post, i) => {
                const href = blogPostHref(post.slug);
                if (!href) return null;
                return (
                  <Reveal key={post.slug} delay={i * 70}>
                    <Link
                      href={href}
                      className="group block rounded-xl border border-charcoal/10 border-l-[3px] border-l-transparent bg-white p-5 transition-all hover:border-l-bronze hover:bg-surface hover:shadow-md"
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-muted">
                        <span className="text-bronze font-medium uppercase">
                          {post.category || 'GUÍA'}
                        </span>
                        <time>{post.date}</time>
                      </div>

                      <h4 className="mt-2 text-base font-semibold text-charcoal group-hover:text-green-deep transition-colors line-clamp-2">
                        {post.title}
                      </h4>

                      <span className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-green-deep font-medium">
                        Leer artículo →
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ── 7. TRUST SECTION (Deep Forest Green Background) ── */}
      <section className="bg-green-deep py-16 md:py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          
          <div className="mb-14 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-bright-bronze font-medium">
              RIGOR Y TRANSPARENCIA
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl text-white font-normal">
              Hecho para arrendadores en Colombia
            </h2>
            <p className="mt-2 text-sm text-white/70 max-w-lg mx-auto">
              Información clara, fuentes verificables y total apego a la legislación de vivienda.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Pillar 1 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs">
              <BookOpen className="h-7 w-7 text-bright-bronze mb-4" />
              <h3 className="font-display text-xl text-white font-normal mb-2">
                Normativa colombiana
              </h3>
              <p className="text-sm text-white/75 leading-relaxed">
                Basado en la Ley 820 de 2003, el Código Civil y la legislación de vivienda vigente.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs">
              <Link2 className="h-7 w-7 text-bright-bronze mb-4" />
              <h3 className="font-display text-xl text-white font-normal mb-2">
                Fuentes verificables
              </h3>
              <p className="text-sm text-white/75 leading-relaxed">
                Citamos las fuentes normativas y artículos específicos en cada guía publicada.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs">
              <Scale className="h-7 w-7 text-bright-bronze mb-4" />
              <h3 className="font-display text-xl text-white font-normal mb-2">
                Contenido informativo
              </h3>
              <p className="text-sm text-white/75 leading-relaxed">
                No somos abogados. Recomendamos siempre consultar con un profesional para casos litigiosos.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs">
              <MapPin className="h-7 w-7 text-bright-bronze mb-4" />
              <h3 className="font-display text-xl text-white font-normal mb-2">
                Hecho para Colombia
              </h3>
              <p className="text-sm text-white/75 leading-relaxed">
                Enfocado en vivienda urbana, arrendadores independientes y el contexto local real.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ── 8. NEWSLETTER SECTION (Warm Ivory / Surface Background) ── */}
      <section className="bg-surface py-16 md:py-24 border-b border-charcoal/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Editorial message */}
            <div className="lg:col-span-6">
              <span className="font-mono text-xs uppercase tracking-widest text-bronze font-medium">
                RECURSOS PARA ARRENDADORES
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl text-charcoal font-normal">
                Lo útil, directo a tu correo.
              </h2>
              <p className="mt-3 text-base text-muted max-w-md leading-relaxed">
                Guías de redacción, novedades legales de la Ley 820 y nuevas herramientas para administrar tu inmueble. Sin spam.
              </p>

              {/* Minimal Line-art Property/Document decorative SVG */}
              <div className="mt-8 flex items-center gap-3 text-green-deep">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-deep/10 border border-green-deep/20">
                  <ScrollText className="h-6 w-6 text-green-deep" />
                </div>
                <div>
                  <p className="font-mono text-xs text-charcoal font-medium">Actualizaciones jurídicas</p>
                  <p className="font-mono text-[11px] text-muted">Directo a propietarios en Colombia</p>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Form */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-charcoal/10 bg-white p-6 sm:p-8 shadow-sm">
                <NewsletterCTA source="home-editorial" hideHeader={true} />
                <p className="mt-3 text-center font-mono text-[11px] text-muted">
                  Sin spam · Cancela cuando quieras ·{' '}
                  <Link href="/politica-de-datos" className="underline hover:text-green-deep">
                    Política de datos
                  </Link>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA SECTION (Deep Forest Green Background) ── */}
      <section className="bg-green-deep py-16 md:py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
          
          <h2 className="font-display text-3xl sm:text-5xl text-white font-normal">
            Empieza a arrendar mejor.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-white/75 max-w-xl mx-auto">
            Guías prácticas, calculadoras de rentabilidad y contratos listos para personalizar hoy mismo.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            
            {/* Action 1 */}
            <Link
              href="/guias"
              className="flex flex-col items-center justify-center rounded-xl bg-ivory p-6 text-charcoal transition-all hover:scale-[1.02] hover:bg-white shadow-md"
            >
              <BookOpen className="h-6 w-6 text-green-deep mb-2" />
              <span className="font-semibold text-base">Explorar guías</span>
              <span className="font-mono text-xs text-muted mt-1">Leyes y procedimientos</span>
            </Link>

            {/* Action 2 */}
            <Link
              href="/herramientas"
              className="flex flex-col items-center justify-center rounded-xl bg-ivory p-6 text-charcoal transition-all hover:scale-[1.02] hover:bg-white shadow-md"
            >
              <Calculator className="h-6 w-6 text-green-deep mb-2" />
              <span className="font-semibold text-base">Usar herramientas</span>
              <span className="font-mono text-xs text-muted mt-1">Reajuste e inventario</span>
            </Link>

            {/* Action 3: Primary Highlighted */}
            <Link
              href="/tienda"
              className="flex flex-col items-center justify-center rounded-xl bg-bronze p-6 text-white transition-all hover:scale-[1.03] hover:bg-[#5E4525] shadow-lg ring-2 ring-bronze/50"
            >
              <Lock className="h-6 w-6 text-white mb-2" />
              <span className="font-semibold text-base">Comprar plantilla</span>
              <span className="font-mono text-xs text-white/90 mt-1">{formatPrice()}</span>
            </Link>

          </div>

        </div>
      </section>
    </>
  );
}
