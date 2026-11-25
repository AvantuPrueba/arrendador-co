import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  ClipboardList,
  ShieldCheck,
  CalendarClock,
  AlertTriangle,
  BookOpen,
  Home,
  ChevronRight,
  UserCheck,
  Landmark,
  CheckCircle2,
  LogOut,
  Clock,
  Calendar,
  Tag,
} from 'lucide-react';
import { formatPrice } from '@/lib/product';
import ProductCTA from '@/components/ProductCTA';
import NewsletterCTA from '@/components/NewsletterCTA';
import { GuideToc, GuideProgress } from './guia-interactivo';
import { GUIDE_TOC } from './guia-toc-data';
import { baseOpenGraph, baseTwitter } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Contrato de Arrendamiento de Vivienda Urbana en Colombia',
  description: 'Guía práctica sobre contratos de arrendamiento de vivienda urbana en Colombia: requisitos, cláusulas, garantías, prórroga, terminación y errores frecuentes.',
  openGraph: {
    ...baseOpenGraph(),
    title: 'Contrato de Arrendamiento de Vivienda Urbana en Colombia | ArrendadorCO',
    description: 'Guía práctica sobre contratos de arrendamiento de vivienda urbana en Colombia: requisitos, cláusulas, garantías, prórroga, terminación y errores frecuentes.',
    type: 'website',
    locale: 'es_CO',
    url: 'https://arrendador.co/guias/contratos',
    siteName: 'ArrendadorCO',
  },
  twitter: {
    ...baseTwitter(),
    title: 'Contrato de Arrendamiento de Vivienda Urbana en Colombia | ArrendadorCO',
    description: 'Guía práctica sobre contratos de arrendamiento de vivienda urbana en Colombia: requisitos, cláusulas, garantías, prórroga, terminación y errores frecuentes.',
  },
};

const SEVEN_ELEMENTS = [
  { n: '01', title: 'Nombre e identificación de los contratantes', text: 'Quiénes son arrendador y arrendatario, con sus datos de identificación.' },
  { n: '02', title: 'Identificación del inmueble objeto del contrato', text: 'Descripción precisa del inmueble que se arrienda.' },
  { n: '03', title: 'Parte del inmueble arrendada y zonas compartidas', text: 'Qué parte se arrienda y cuáles zonas o servicios son compartidos con otros ocupantes.' },
  { n: '04', title: 'Precio y forma de pago', text: 'Canon pactado y cómo y cuándo se paga.' },
  { n: '05', title: 'Servicios, cosas o usos conexos y adicionales', text: 'Qué está incluido y qué se cobra aparte.' },
  { n: '06', title: 'Término de duración del contrato', text: 'Período inicial pactado entre las partes.' },
  { n: '07', title: 'Pago de servicios públicos', text: 'Designación de la parte contratante a cuyo cargo está el pago de los servicios públicos.' },
];

const ERRORES = [
  { title: 'No definir quién paga los servicios públicos', text: 'Genera disputas y posibles cortes de servicio.' },
  { title: 'No indicar datos de notificación', text: 'Sin direcciones o canales válidos, los avisos pierden eficacia.' },
  { title: 'Confundir recomendación con obligación legal', text: 'No toda buena práctica es una exigencia de la ley.' },
  { title: 'No documentar el estado del inmueble', text: 'Acta firmada y evidencia fotográfica reducen discusiones al devolver.' },
  { title: 'Pactar garantías prohibidas', text: 'El art. 16 prohíbe depósitos en efectivo u otras cauciones reales sobre el canon.' },
  { title: 'Desconocer las reglas de terminación', text: 'Arrendador y arrendatario tienen causales y plazos distintos.' },
];

export default function ContratosGuia() {
  return (
    <>
      <GuideProgress />
      <div className="mx-auto max-w-[1180px] px-4 py-12 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="flex items-center gap-1.5 hover:text-teal-600 transition-colors">
            <Home className="h-4 w-4" aria-hidden="true" />
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <Link href="/guias" className="hover:text-teal-600 transition-colors">Guías</Link>
          <ChevronRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span className="font-medium text-slate-900" aria-current="page">Contratos</span>
        </nav>

        {/* Mobile TOC */}
        <details className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-4 lg:hidden">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">En esta guía ↓</summary>
          <nav className="mt-3" aria-label="Tabla de contenidos móvil">
            <ol className="space-y-1.5">
              {GUIDE_TOC.map((item, i) => (
                <li key={item.id}>
                  <Link href={`#${item.id}`} className="block py-1 text-sm text-slate-600 hover:text-teal-600">
                    <span className="mr-2 font-mono text-xs text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </details>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
          <main className="min-w-0">
            {/* HERO */}
            <header className="mb-12">
              <span className="mb-5 inline-block rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                Ley 820 de 2003 · Vivienda urbana
              </span>
              <h1 className="mb-4 text-3xl md:text-5xl font-bold leading-tight text-slate-900">
                Contrato de arrendamiento de vivienda urbana en Colombia
              </h1>
              <p className="mb-6 max-w-2xl text-lg text-slate-600">
                Qué debe contener, qué conviene documentar y qué revisar antes de firmar.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" />~10 min de lectura</span>
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" />Actualizado · Octubre 2026</span>
                <span className="inline-flex items-center gap-1.5"><BookOpen className="h-4 w-4" aria-hidden="true" />Fuente normativa</span>
                <span className="inline-flex items-center gap-1.5"><Tag className="h-4 w-4" aria-hidden="true" />Guía práctica</span>
              </div>
            </header>

            {/* ANTES DE FIRMAR */}
            <section className="mb-12 rounded-xl border border-slate-200 bg-slate-50 p-6" aria-labelledby="antes-de-firmar">
              <h2 id="antes-de-firmar" className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Antes de firmar</h2>
              <ul className="grid gap-2 sm:grid-cols-2 text-sm text-slate-700">
                {['Identifica correctamente a las partes', 'Describe el inmueble', 'Define canon y forma de pago', 'Deja claro quién paga los servicios', 'Establece el término', 'Documenta la entrega'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#elementos" className="mt-4 inline-block text-sm font-semibold text-teal-600 hover:underline">
                Ir a los 7 elementos ↓
              </a>
            </section>

            {/* EN ESTA GUÍA */}
            <section className="mb-14">
              <h2 className="mb-2 text-2xl font-bold text-slate-900">En esta guía</h2>
              <p className="mb-6 text-slate-600">Lo esencial para estructurar y revisar un contrato de vivienda urbana.</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: FileText, title: 'Elementos del contrato', text: 'Los 7 puntos mínimos del art. 3.' },
                  { icon: ClipboardList, title: 'Cláusulas prácticas', text: 'Inventario, acta y comunicaciones.' },
                  { icon: ShieldCheck, title: 'Garantías', text: 'Fiador, póliza y servicios públicos.' },
                  { icon: CalendarClock, title: 'Duración y terminación', text: 'Prórroga, causales y preavisos.' },
                  { icon: AlertTriangle, title: 'Errores frecuentes', text: '6 cosas que conviene evitar.' },
                  { icon: BookOpen, title: 'Fuentes normativas', text: 'Ley 820 de 2003.' },
                ].map((item, i) => (
                  <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-[3px] hover:border-teal-300 hover:shadow-md">
                    <span className="mb-3 block font-mono text-xs text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                    <item.icon className="mb-2 h-6 w-6 text-teal-600" aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-xs text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ÁMBITO */}
            <section id="ambito" className="mb-14 scroll-mt-24">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Ámbito de esta guía</h2>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-teal-700">Aplica a</h3>
                    <ul className="space-y-1 text-sm text-slate-700">
                      <li>· Arrendamiento de vivienda urbana</li>
                      <li>· Ley 820 de 2003</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">No cubre</h3>
                    <ul className="space-y-1 text-sm text-slate-700">
                      <li>· Arrendamiento comercial</li>
                      <li>· Arrendamiento rural</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* ELEMENTOS */}
            <section id="elementos" className="mb-14 scroll-mt-24">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Elementos del contrato</h2>
              <p className="mb-8 text-slate-600">
                El artículo 3 de la Ley 820 de 2003 exige acordar como mínimo estos siete elementos. El
                reajuste del canon no hace parte de este listado; tiene regulación propia en el art. 20.
              </p>
              <ol className="relative space-y-6 border-l border-slate-200 pl-8">
                {SEVEN_ELEMENTS.map((el) => (
                  <li key={el.n} className="relative">
                    <span className="absolute -left-[41px] top-1 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white font-mono text-xs text-teal-600">
                      {el.n}
                    </span>
                    <h3 className="font-semibold text-slate-900">{el.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{el.text}</p>
                    <p className="mt-2 text-xs text-slate-400">Ley 820 de 2003, art. 3</p>
                  </li>
                ))}
              </ol>

              {/* Mínimo legal vs recomendado */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700">Mínimo legal</h3>
                  <p className="mt-1 text-sm text-teal-900">Art. 3 — los 7 elementos obligatorios.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Recomendado</h3>
                  <p className="mt-1 text-sm text-slate-700">Buenas prácticas como inventario y acta. No son obligaciones legales.</p>
                </div>
              </div>
            </section>

            {/* GARANTÍAS */}
            <section id="garantias" className="mb-14 scroll-mt-24">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Garantías</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { icon: UserCheck, title: 'Fiador / codeudor', text: 'Qué es: una persona natural responde patrimonialmente por el arrendatario.', revisar: 'Qué debe revisar el arrendador: solvencia del fiador y alcance del codeudo solidario.', limit: 'Limitación: depende del patrimonio del fiador.' },
                  { icon: ShieldCheck, title: 'Póliza de seguro', text: 'Qué es: una aseguradora cubre canon, administración, servicios y daños según la póliza.', revisar: 'Qué debe revisar el arrendador: cobertura, exclusiones y deducibles.', limit: 'Limitación: sujeto a las condiciones de la póliza.' },
                  { icon: Landmark, title: 'Garantías para servicios públicos', text: 'Qué es: garantía específica para cubrir servicios públicos domiciliarios.', revisar: 'Qué debe revisar el arrendador: que se limite a servicios públicos y respete los límites del art. 15.', limit: 'Limitación: no es un depósito para el canon (art. 16).' },
                ].map((g) => (
                  <article key={g.title} className="rounded-xl border border-slate-200 bg-white p-6">
                    <g.icon className="mb-3 h-7 w-7 text-teal-600" aria-hidden="true" />
                    <h3 className="mb-2 font-semibold text-slate-900">{g.title}</h3>
                    <p className="mb-2 text-sm text-slate-600">{g.text}</p>
                    <p className="mb-2 text-sm text-slate-600">{g.revisar}</p>
                    <p className="text-xs text-slate-500">{g.limit}</p>
                  </article>
                ))}
              </div>

              <div className="mt-6 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5">
                <h3 className="mb-2 font-semibold text-amber-900">Importante sobre los depósitos</h3>
                <p className="text-sm text-amber-900">
                  El artículo 16 de la Ley 820 prohíbe exigir depósitos en dinero efectivo u otras
                  cauciones reales para garantizar obligaciones del contrato. Distinto es el régimen
                  del artículo 15 sobre garantías para servicios públicos domiciliarios.
                </p>
                <p className="mt-2 text-xs text-amber-800">Fuente: Ley 820 de 2003, arts. 15 y 16.</p>
              </div>
            </section>

            {/* DURACIÓN Y PRÓRROGA */}
            <section id="prorroga" className="mb-14 scroll-mt-24">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Duración y prórroga</h2>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <span className="rounded-full border border-slate-200 px-3 py-1">Contrato</span>
                <span aria-hidden="true">→</span>
                <span className="rounded-full border border-slate-200 px-3 py-1">Vencimiento del término</span>
                <span aria-hidden="true">→</span>
                <span className="rounded-full border border-slate-200 px-3 py-1">Prórroga / Terminación</span>
                <span aria-hidden="true">→</span>
                <span className="rounded-full border border-slate-200 px-3 py-1">Nuevo período</span>
              </div>
              <p className="mt-6 text-slate-600">
                El contrato se entiende prorrogado por el mismo término inicial cuando ambas partes
                cumplen sus obligaciones y el arrendatario acepta los reajustes de ley. No es una
                &ldquo;renovación automática&rdquo; sin más.
              </p>
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="mb-2 font-semibold text-slate-900">Reajuste del canon</h3>
                <p className="text-sm text-slate-600">
                  El reajuste tiene regulación específica en el artículo 20 de la Ley 820 y NO forma
                  parte de los siete elementos del artículo 3.
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-6">
                  <LogOut className="mb-3 h-6 w-6 text-teal-600" aria-hidden="true" />
                  <h3 className="mb-1 font-semibold text-slate-900">Terminación por el arrendador</h3>
                  <p className="text-sm text-slate-600">Incumplimiento, necesidad de vivienda propia, demolición o reparación estructural (Ley 820, art. 22).</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-6">
                  <CalendarClock className="mb-3 h-6 w-6 text-teal-600" aria-hidden="true" />
                  <h3 className="mb-1 font-semibold text-slate-900">Terminación por el arrendatario</h3>
                  <p className="text-sm text-slate-600">Previo aviso con 3 meses de antelación, o por incumplimiento grave del arrendador (Ley 820, art. 25).</p>
                </div>
              </div>
            </section>

            {/* ERRORES */}
            <section id="errores" className="mb-14 scroll-mt-24">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">6 errores que conviene evitar</h2>
              <ol className="space-y-4">
                {ERRORES.map((e, i) => (
                  <li key={e.title} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-teal-200">
                    <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
                    <div>
                      <span className="font-mono text-xs text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="font-semibold text-slate-900">{e.title}</h3>
                      <p className="text-sm text-slate-600">{e.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* CTA MID-PAGE */}
            <section className="mb-14 rounded-2xl border border-teal-900/30 bg-slate-950 p-8 text-white md:p-10">
              <span className="mb-4 inline-block rounded-full border border-slate-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                Plantilla editable
              </span>
              <h2 className="mb-3 text-2xl md:text-3xl font-bold">¿Quieres partir de un documento ya estructurado?</h2>
              <p className="mb-6 text-slate-300">
                {formatPrice()} · Pago único · Incluye Word editable, Google Docs y guía de personalización.
              </p>
              <Link href="/tienda" className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-8 py-3.5 font-semibold text-white hover:bg-teal-700">
                Ver plantilla
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <p className="mt-4 text-xs text-slate-500">Entrega por correo después de confirmar el pago.</p>
            </section>

            {/* FUENTES */}
            <section id="fuentes" className="mb-14 scroll-mt-24">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Fuentes normativas</h2>
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="mb-1 font-semibold text-slate-900">Ley 820 de 2003</h3>
                <p className="mb-3 text-sm text-slate-600">Artículos relevantes: 3, 15, 16, 18, 20, 22 y concordantes.</p>
                <a
                  href="http://www.secretariasenado.gov.co/senado/basedoc/ley_0820_2003.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-teal-600 hover:underline"
                >
                  Ver texto oficial
                </a>
              </div>
              <p className="mt-6 text-xs text-slate-500">
                Actualizado: Octubre de 2026 · Contenido informativo. No constituye asesoría jurídica personalizada.
              </p>
            </section>

            {/* CTA FINAL */}
            <section className="mb-14 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
              <h2 className="mb-3 text-xl font-semibold text-slate-900">¿Listo para revisar tu contrato?</h2>
              <Link href="/tienda" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800">
                Ver plantilla
              </Link>
            </section>

            <p className="text-xs text-slate-500 border-l-2 border-slate-200 pl-4">
              Contenido informativo. No constituye asesoría jurídica personalizada.
            </p>
          </main>

          {/* SIDEBAR TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <GuideToc />
            </div>
          </aside>
        </div>

        <ProductCTA />
        <NewsletterCTA />
      </div>
    </>
  );
}
