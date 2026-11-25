import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FileText,
  ClipboardCheck,
  ShieldAlert,
  Calculator,
  ArrowRight,
  TrendingUp,
  PieChart,
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
import { homeJsonLd } from '@/lib/seo';
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
    url: 'https://arrendador.co',
    siteName: 'ArrendadorCO',
  },
  twitter: {
    ...baseTwitter(),
    title: 'ArrendadorCO - Guía para Arrendadores en Colombia',
    description:
      'Información práctica sobre contratos de arriendo, actas de entrega y manejo de inquilinos morosos en Colombia.',
  },
};

export default function Home() {
  const posts = getAllPosts().filter((p) => isValidSlug(p.slug)).slice(0, 4);
  const featuredPost = posts.find((post) => post.featured === true) ?? posts[0];
  const secondaryPosts = posts.filter((post) => post.slug !== featuredPost?.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={homeJsonLd} />
      <ScrollProgress />
      <StickyProductCta />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden bg-ivory pt-8 pb-16 md:pt-14 md:pb-24 border-b border-charcoal/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            
            {/* LEFT COLUMN: Editorial copy (55% -> col-span-7) */}
            <div className="lg:col-span-7 lg:pr-8">
              <Reveal>
                <div className="mb-4 inline-flex items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-bronze font-medium">
                    GESTIÓN INMOBILIARIA · COLOMBIA · 2026
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mb-6 font-display text-4xl sm:text-5xl lg:text-[62px] leading-[1.08] text-charcoal font-normal tracking-tight">
                  Arrendar con <span className="italic font-normal">confianza</span>. Administrar con{' '}
                  <span className="text-green-deep underline decoration-bronze/40 underline-offset-8">
                    claridad
                  </span>
                  .
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted">
                  Guías prácticas, herramientas financieras y plantillas jurídicas diseñadas
                  específicamente para propietarios de vivienda urbana en Colombia.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
                  <Link
                    href="/herramientas"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-green-deep px-7 py-3 text-sm font-medium text-white transition-all hover:bg-green-mid hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                  >
                    Explorar herramientas
                  </Link>
                  <Link
                    href="/tienda"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-charcoal/30 bg-transparent px-7 py-3 text-sm font-medium text-charcoal transition-all hover:bg-surface hover:border-charcoal hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Ver plantilla de contrato
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={320}>
                <div className="mt-8 flex items-center gap-2 border-t border-charcoal/10 pt-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-bronze" />
                  <p className="font-mono text-xs text-muted">
                    Ley 820 de 2003 · Vivienda urbana · Actualizado 2026
                  </p>
                </div>
              </Reveal>
            </div>

            {/* RIGHT COLUMN: Layered visual composition (45% -> col-span-5) */}
            <div className="lg:col-span-5">
              <Reveal delay={150}>
                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                  {/* Layer 1: Forest Green Background Panel */}
                  <div className="relative overflow-hidden rounded-3xl bg-green-deep p-6 sm:p-8 min-h-[490px] shadow-2xl flex flex-col justify-between">
                    
                    {/* Layer 2: Architectural Photography with dark overlay & fallback background */}
                    <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-green-mid/50">
                      <Image
                        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80"
                        alt="Arquitectura residencial contemporánea en Colombia"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 450px"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-deep via-green-deep/40 to-transparent" />
                    </div>

                    {/* Layer 4: Floating Mini Card (Illustrative Demo - Upper-right) */}
                    <div className="absolute top-6 right-3 sm:top-8 sm:right-6 z-20 w-44 rounded-xl border border-charcoal/10 bg-white p-3.5 shadow-xl rotate-[1.5deg] animate-float-delayed">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-muted font-medium">
                          CANON MENSUAL
                        </span>
                        <span className="rounded bg-ivory px-1 py-0.5 font-mono text-[8px] font-semibold text-bronze uppercase">
                          Demo
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm font-semibold text-charcoal">
                        $1.800.000 COP
                      </p>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-green-deep/15 overflow-hidden">
                        <div className="h-full w-full bg-green-deep" />
                      </div>
                      <span className="mt-1 block font-mono text-[9px] text-green-mid font-medium">
                        Al día · Estado simulado
                      </span>
                    </div>

                    {/* Layer 3: Floating Document Card (Lower-left) */}
                    <div className="relative z-30 mt-4 -mb-2 w-full max-w-[320px] rounded-xl border border-charcoal/10 bg-white p-4 shadow-2xl -rotate-2 animate-float">
                      <div className="mb-2 flex items-center justify-between border-b border-charcoal/10 pb-2">
                        <div>
                          <p className="font-display text-xs text-green-deep tracking-wide font-normal">
                            CONTRATO DE ARRENDAMIENTO
                          </p>
                          <p className="font-mono text-[9px] text-muted">
                            Vivienda Urbana · Ley 820 · v1.0.0
                          </p>
                        </div>
                        <span className="rounded-md bg-green-deep/10 px-1.5 py-0.5 font-mono text-[9px] font-medium text-green-deep">
                          Revisado ✓
                        </span>
                      </div>

                      {/* Simulated text lines */}
                      <div className="space-y-1.5 my-2.5">
                        <div className="h-1.5 w-[90%] rounded-full bg-charcoal/15" />
                        <div className="h-1.5 w-[75%] rounded-full bg-charcoal/15" />
                        <div className="h-1.5 w-[85%] rounded-full bg-charcoal/15" />
                        <div className="h-1.5 w-[60%] rounded-full bg-bronze/35" />
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-charcoal/5">
                        <span className="font-mono text-[9px] text-muted">Cláusulas esenciales</span>
                        <span className="font-mono text-[9px] text-bronze font-medium">Ley 820</span>
                      </div>
                    </div>

                    {/* Layer 5: Decorative details */}
                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-white/70">
                      <span className="font-mono text-[10px] text-white/80">
                        Inmueble protegido ✓
                      </span>
                      {/* 3x6 Dot Grid in Bronze */}
                      <div className="grid grid-cols-6 gap-1 opacity-40" aria-hidden="true">
                        {[...Array(18)].map((_, i) => (
                          <div key={i} className="h-1 w-1 rounded-full bg-bronze" />
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. PROBLEM-SOLVING SECTION (Warm Ivory Background) ── */}
      <section className="bg-ivory py-16 md:py-24 border-b border-charcoal/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze font-medium">
              CUATRO PROBLEMAS REALES
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl text-charcoal font-normal">
              ¿Qué necesitas resolver hoy?
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 items-stretch">
            {/* Left featured large card: 60% -> col-span-7 */}
            <div className="lg:col-span-7">
              <Reveal>
                <Link
                  href="/guias/contratos"
                  className="group flex h-full flex-col justify-between rounded-2xl bg-green-deep p-8 text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm uppercase tracking-wider text-bright-bronze font-medium">
                        01 · RECOMENDADO
                      </span>
                      <ScrollText className="h-8 w-8 text-white/90 transition-transform group-hover:scale-110" />
                    </div>
                    <h3 className="mt-6 font-display text-3xl font-normal text-white leading-tight">
                      Crear un contrato sólido y seguro
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
                      Aprende qué cláusulas son obligatorias por la Ley 820 de 2003, cómo pactar
                      garantías exigibles y qué errores anulan tu contrato en un proceso judicial.
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 font-mono text-sm text-bright-bronze font-medium">
                    Explorar guías de contratos
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                  </div>
                </Link>
              </Reveal>
            </div>

            {/* Right stacked compact cards: 40% -> col-span-5 */}
            <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
              
              {/* Card 02 */}
              <Reveal delay={80}>
                <Link
                  href="/herramientas/checklist-entrega"
                  className="group block rounded-2xl border-l-[3px] border-l-transparent bg-surface p-5 transition-all duration-200 hover:border-l-bronze hover:bg-white hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <ClipboardCheck className="h-6 w-6 text-green-deep" />
                      <h4 className="text-base font-semibold text-charcoal">
                        Entregar o recibir un inmueble
                      </h4>
                    </div>
                    <span className="font-mono text-xs text-bronze font-medium">02</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    Actas de entrega, inventario fotográfico detallado y medidores de servicios.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-green-deep font-medium">
                    Explorar herramienta →
                  </span>
                </Link>
              </Reveal>

              {/* Card 03 */}
              <Reveal delay={140}>
                <Link
                  href="/guias/morosos"
                  className="group block rounded-2xl border-l-[3px] border-l-transparent bg-white p-5 transition-all duration-200 hover:border-l-bronze hover:bg-surface hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="h-6 w-6 text-green-deep" />
                      <h4 className="text-base font-semibold text-charcoal">
                        Gestionar morosidad a tiempo
                      </h4>
                    </div>
                    <span className="font-mono text-xs text-bronze font-medium">03</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    Rutas de conciliación, cartas de cobro preventivo y causales de terminación.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-green-deep font-medium">
                    Leer procedimiento →
                  </span>
                </Link>
              </Reveal>

              {/* Card 04 */}
              <Reveal delay={200}>
                <Link
                  href="/herramientas/rentabilidad"
                  className="group block rounded-2xl border-l-[3px] border-l-transparent bg-surface p-5 transition-all duration-200 hover:border-l-bronze hover:bg-white hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Calculator className="h-6 w-6 text-green-deep" />
                      <h4 className="text-base font-semibold text-charcoal">
                        Calcular finanzas y reajuste
                      </h4>
                    </div>
                    <span className="font-mono text-xs text-bronze font-medium">04</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    Rentabilidad real neta vs CDT, vacancia, impuestos y reajuste de canon IPC.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-green-deep font-medium">
                    Usar calculadora →
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
          
          <div className="mb-14 text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze font-medium">
              MÉTODO DE GESTIÓN
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl text-charcoal font-normal">
              La forma ArrendadorCO
            </h2>
            <p className="mt-2 text-base text-muted max-w-xl">
              Un proceso ordenado en cuatro etapas para proteger tu patrimonio en cada ciclo.
            </p>
          </div>

          {/* Desktop horizontal timeline */}
          <div className="hidden md:block">
            <div className="relative grid grid-cols-4 gap-8">
              {/* Connecting line */}
              <div className="absolute top-[39px] left-8 right-8 h-[2px] bg-charcoal/15 z-0" aria-hidden="true" />

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col">
                <div className="mb-3 flex items-center justify-between">
                  <FileText className="h-7 w-7 text-green-deep" />
                  <span className="h-3 w-3 rounded-full bg-bronze border-2 border-white shadow-xs" />
                </div>
                <span className="font-mono text-xs text-bronze font-semibold mt-2">01</span>
                <h3 className="mt-1 font-display text-2xl text-charcoal font-normal">Preparar</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Contrato firmado, documentos verificados y condiciones claras desde el inicio.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col">
                <div className="mb-3 flex items-center justify-between">
                  <ClipboardCheck className="h-7 w-7 text-green-deep" />
                  <span className="h-3 w-3 rounded-full bg-bronze border-2 border-white shadow-xs" />
                </div>
                <span className="font-mono text-xs text-bronze font-semibold mt-2">02</span>
                <h3 className="mt-1 font-display text-2xl text-charcoal font-normal">Entregar</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Acta de entrega, inventario fotográfico y registro objetivo del estado del inmueble.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col">
                <div className="mb-3 flex items-center justify-between">
                  <Calculator className="h-7 w-7 text-green-deep" />
                  <span className="h-3 w-3 rounded-full bg-bronze border-2 border-white shadow-xs" />
                </div>
                <span className="font-mono text-xs text-bronze font-semibold mt-2">03</span>
                <h3 className="mt-1 font-display text-2xl text-charcoal font-normal">Gestionar</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Control de pagos, obligaciones del inquilino y comunicación documentada por escrito.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative z-10 flex flex-col">
                <div className="mb-3 flex items-center justify-between">
                  <ShieldAlert className="h-7 w-7 text-green-deep" />
                  <span className="h-3 w-3 rounded-full bg-bronze border-2 border-white shadow-xs" />
                </div>
                <span className="font-mono text-xs text-bronze font-semibold mt-2">04</span>
                <h3 className="mt-1 font-display text-2xl text-charcoal font-normal">Proteger</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Seguros de arrendamiento, procedimientos legales y rutas de acción ante incumplimientos.
                </p>
              </div>

            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="md:hidden space-y-8 border-l-2 border-green-deep pl-6 ml-2">
            
            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-bronze border-2 border-white" />
              <span className="font-mono text-xs text-bronze font-semibold">01</span>
              <h3 className="font-display text-xl text-charcoal font-normal">Preparar</h3>
              <p className="mt-1 text-sm text-muted">
                Contrato firmado, documentos verificados y condiciones claras desde el inicio.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-bronze border-2 border-white" />
              <span className="font-mono text-xs text-bronze font-semibold">02</span>
              <h3 className="font-display text-xl text-charcoal font-normal">Entregar</h3>
              <p className="mt-1 text-sm text-muted">
                Acta de entrega, inventario fotográfico y registro del estado del inmueble.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-bronze border-2 border-white" />
              <span className="font-mono text-xs text-bronze font-semibold">03</span>
              <h3 className="font-display text-xl text-charcoal font-normal">Gestionar</h3>
              <p className="mt-1 text-sm text-muted">
                Control de pagos, obligaciones del inquilino y comunicación documentada.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-bronze border-2 border-white" />
              <span className="font-mono text-xs text-bronze font-semibold">04</span>
              <h3 className="font-display text-xl text-charcoal font-normal">Proteger</h3>
              <p className="mt-1 text-sm text-muted">
                Seguros, procedimientos legales y rutas de acción ante incumplimiento.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. FREE TOOLS SECTION (Deep Forest Green Background) ── */}
      <section className="bg-green-deep py-16 md:py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          
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

          <div className="grid gap-6 md:grid-cols-3">
            
            {/* Tool Card 1: Reajuste */}
            <Reveal delay={0}>
              <div className="flex h-full flex-col justify-between rounded-2xl bg-white p-6 text-charcoal shadow-xl">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <TrendingUp className="h-7 w-7 text-green-deep" />
                    <span className="rounded-md bg-ivory px-2 py-0.5 font-mono text-[10px] text-bronze font-medium">
                      IPC DANE 2025
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-charcoal font-normal">
                    Reajuste de canon
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    Calcula el nuevo valor legal de tu arriendo según la inflación acumulada.
                  </p>

                  {/* Mini UI Preview (Illustrative) */}
                  <div className="my-5 rounded-xl border border-charcoal/10 bg-surface p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted">Canon actual:</span>
                      <span className="font-mono font-medium text-charcoal">$1.200.000</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-charcoal/10 pt-2 text-xs">
                      <span className="font-medium text-green-deep">+ Reajuste legal:</span>
                      <span className="font-mono font-bold text-green-deep">$1.311.360</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/herramientas/reajuste-canon"
                  className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-green-deep hover:text-green-mid"
                >
                  Calcular ahora →
                </Link>
              </div>
            </Reveal>

            {/* Tool Card 2: Rentabilidad */}
            <Reveal delay={80}>
              <div className="flex h-full flex-col justify-between rounded-2xl bg-white p-6 text-charcoal shadow-xl">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <PieChart className="h-7 w-7 text-green-deep" />
                    <span className="rounded-md bg-ivory px-2 py-0.5 font-mono text-[10px] text-muted font-medium">
                      Comparativa anual
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-charcoal font-normal">
                    Rentabilidad real
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    Conoce tu retorno neto después de vacancia, predial, administración e impuestos.
                  </p>

                  {/* Mini UI Preview (Illustrative) */}
                  <div className="my-5 rounded-xl border border-charcoal/10 bg-surface p-3.5 space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-muted">Rentabilidad neta</span>
                        <span className="font-mono font-semibold text-green-deep">6.8%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-charcoal/10 overflow-hidden">
                        <div className="h-full w-[68%] bg-green-deep" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-muted">CDT referencia</span>
                        <span className="font-mono font-semibold text-muted">9.5%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-charcoal/10 overflow-hidden">
                        <div className="h-full w-[42%] bg-muted/60" />
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/herramientas/rentabilidad"
                  className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-green-deep hover:text-green-mid"
                >
                  Calcular rentabilidad →
                </Link>
              </div>
            </Reveal>

            {/* Tool Card 3: Checklist */}
            <Reveal delay={160}>
              <div className="flex h-full flex-col justify-between rounded-2xl bg-white p-6 text-charcoal shadow-xl">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <ClipboardCheck className="h-7 w-7 text-green-deep" />
                    <span className="rounded-md bg-green-deep/10 px-2 py-0.5 font-mono text-[10px] text-green-deep font-medium">
                      Genera PDF
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-charcoal font-normal">
                    Checklist de entrega
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    Genera el acta de inventario con estado de paredes, llaves y lectura de medidores.
                  </p>

                  {/* Mini UI Preview (Illustrative) */}
                  <div className="my-5 rounded-xl border border-charcoal/10 bg-surface p-3.5 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-charcoal">
                      <span className="text-green-deep font-bold">✓</span>
                      <span>Llaves entregadas</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-charcoal">
                      <span className="text-green-deep font-bold">✓</span>
                      <span>Medidores registrados</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <span className="text-charcoal/30">○</span>
                      <span>Fotos del estado</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/herramientas/checklist-entrega"
                  className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-green-deep hover:text-green-mid"
                >
                  Abrir checklist →
                </Link>
              </div>
            </Reveal>

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
                      <p className="font-display text-sm tracking-wider font-normal">
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
