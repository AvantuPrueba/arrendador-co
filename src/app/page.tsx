import Link from 'next/link';
import {
  FileText,
  ClipboardCheck,
  ShieldAlert,
  Calculator,
  ArrowRight,
  Check,
  Home as HomeIcon,
  CalendarClock,
  Wallet,
} from 'lucide-react';
import NewsletterCTA from '@/components/NewsletterCTA';
import { PRODUCT_CONFIG, formatPrice } from '@/lib/product';
import { getAllPosts } from '@/lib/blog';
import { Reveal, ScrollProgress, StickyProductCta } from '@/components/home/Motion';

const problems = [
  {
    icon: FileText,
    title: 'Crear un contrato',
    description: 'Cláusulas clave, garantías y estructura para vivienda urbana.',
    href: '/guias/contratos',
  },
  {
    icon: ClipboardCheck,
    title: 'Entregar un inmueble',
    description: 'Checklists, actas y evidencia fotográfica del estado.',
    href: '/herramientas/checklist-entrega',
  },
  {
    icon: ShieldAlert,
    title: 'Gestionar morosidad',
    description: 'Pasos preventivos y rutas legales para actuar a tiempo.',
    href: '/guias/morosos',
  },
  {
    icon: Calculator,
    title: 'Calcular / revisar finanzas',
    description: 'Rentabilidad, reajuste de canon y costos del año.',
    href: '/herramientas/rentabilidad',
  },
];

const method = [
  { n: '01', title: 'PREPARAR', text: 'Contrato + documentación' },
  { n: '02', title: 'ENTREGAR', text: 'Inventario + evidencias' },
  { n: '03', title: 'GESTIONAR', text: 'Pagos + obligaciones' },
  { n: '04', title: 'PROTEGER', text: 'Seguros + procedimientos' },
];

const tools = [
  { icon: Calculator, title: 'Calculadora de reajuste', text: 'Aplica el IPC del año según la Ley 820 de 2003.', href: '/herramientas/reajuste-canon' },
  { icon: Wallet, title: 'Calculadora de rentabilidad', text: 'Neta real vs CDT, vacancia y costos anuales.', href: '/herramientas/rentabilidad' },
  { icon: ClipboardCheck, title: 'Checklist de entrega', text: 'Estado del inmueble y genera un PDF.', href: '/herramientas/checklist-entrega' },
];

const guides = [
  { icon: HomeIcon, title: 'Contratos de arrendamiento', href: '/guias/contratos', text: 'Qué debe incluir y errores comunes.' },
  { icon: CalendarClock, title: 'Actas de entrega', href: '/guias/actas', text: 'Documenta el estado al recibir y devolver.' },
  { icon: ShieldAlert, title: 'Morosidad', href: '/guias/morosos', text: 'Prevención y procedimiento.' },
  { icon: FileText, title: 'Fiscalidad', href: '/guias/fiscalidad', text: 'Renta, predial, IVA y documentación.' },
];

function DocumentMockup() {
  return (
    <div className="relative w-full max-w-md animate-float rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-700">
          Contrato
        </span>
        <span className="text-[10px] text-slate-400">v1.0.0</span>
      </div>
      <h3 className="mb-4 text-lg font-bold text-slate-900">Contrato de Arrendamiento</h3>
      <div className="space-y-2">
        <div className="h-2 w-3/4 rounded bg-slate-100" />
        <div className="h-2 w-full rounded bg-slate-100" />
        <div className="h-2 w-5/6 rounded bg-slate-100" />
        <div className="my-3 rounded-lg border-l-4 border-teal-500 bg-teal-50/60 p-3">
          <div className="mb-1 h-2 w-2/3 rounded bg-teal-200" />
          <div className="h-2 w-full rounded bg-teal-100" />
        </div>
        <div className="h-2 w-full rounded bg-slate-100" />
        <div className="h-2 w-2/3 rounded bg-slate-100" />
      </div>
      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">
          <Check className="h-3 w-3" aria-hidden="true" />
        </span>
        <span className="text-xs text-slate-500">Estructura revisada · Enfocada en Ley 820</span>
      </div>
    </div>
  );
}

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <ScrollProgress />
      <StickyProductCta />

      {/* HERO */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-50 via-transparent to-transparent" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
          <div>
            <span className="mb-6 inline-block rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              Guías prácticas · Vivienda urbana · Colombia
            </span>
            <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
              Arrendar con confianza, sin complicaciones legales
            </h1>
            <p className="mb-8 max-w-xl text-lg text-slate-600">
              ArrendadorCO te da guías, herramientas y plantillas para administrar un inmueble en Colombia sin ser abogado.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/guias" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-slate-800">
                Explorar guías
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link href="/tienda" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-8 py-3.5 font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                Ver plantilla
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Vivienda urbana · Colombia · Contenido práctico</p>
          </div>

          <div className="relative flex items-center justify-center rounded-3xl bg-slate-950 p-10 lg:min-h-[480px]">
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/40 to-transparent" aria-hidden="true" />
            <DocumentMockup />
          </div>
        </div>
      </section>

      {/* ¿Qué necesitas resolver hoy? */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-3xl font-bold text-slate-900">¿Qué necesitas resolver hoy?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <Link href={p.href} className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg">
                  <p.icon className="mb-4 h-8 w-8 text-teal-600 transition-transform group-hover:scale-110" aria-hidden="true" />
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">{p.title}</h3>
                  <p className="text-sm text-slate-600">{p.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* La forma ArrendadorCO */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-3xl font-bold text-slate-900">La forma ArrendadorCO</h2>
          <div className="relative grid gap-8 md:grid-cols-4">
            <div className="absolute top-6 left-0 right-0 hidden h-px bg-slate-200 md:block" aria-hidden="true" />
            {method.map((m, i) => (
              <Reveal key={m.n} delay={i * 100}>
                <div className="relative">
                  <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white font-mono text-sm text-teal-600">
                    {m.n}
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-wide text-slate-900">{m.title}</h3>
                  <p className="text-sm text-slate-600">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Herramientas gratuitas */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-3xl font-bold text-slate-900">Herramientas gratuitas</h2>
            <Link href="/herramientas" className="hidden text-sm font-semibold text-teal-600 hover:underline sm:inline">
              Ver todas →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {tools.map((t, i) => (
              <Reveal key={t.title} delay={i * 80}>
                <Link href={t.href} className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg">
                  <t.icon className="mb-4 h-8 w-8 text-teal-600" aria-hidden="true" />
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">{t.title}</h3>
                  <p className="mb-4 flex-1 text-sm text-slate-600">{t.text}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600">
                    Usar
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-lg font-semibold text-slate-900">Guías para empezar</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((g) => (
              <Link key={g.title} href={g.href} className="group rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-teal-300">
                <g.icon className="mb-3 h-6 w-6 text-teal-600" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-slate-900">{g.title}</h3>
                <p className="mt-1 text-xs text-slate-600">{g.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Producto destacado */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl md:p-12">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="mb-4 inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">Producto destacado</span>
                <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">{PRODUCT_CONFIG.name}</h2>
                <p className="mb-8 text-slate-600">
                  Contrato editable en Word y Google Docs basado en la normativa aplicable. Incluye guía paso a paso (PDF) y actualizaciones por 12 meses.
                </p>
                <div className="mb-8 flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-slate-900">{formatPrice()}</span>
                  <span className="text-sm text-slate-500">Pago único · Entrega por correo después de confirmar el pago.</span>
                </div>
                <ul className="mb-8 space-y-3">
                  {[
                    'Campos dinámicos (fecha, valor, garantía, índice)',
                    'Cláusulas de protección: daño, subarriendo, terminación',
                    'Formato .docx editable + Google Docs',
                    'Guía de personalización (PDF incluido)',
                    'Versión 1.0.0 · Actualizaciones por 12 meses',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-slate-700">
                      <Check className="mt-0.5 h-5 w-5 text-teal-600" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/tienda" className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-3.5 font-semibold text-white hover:bg-slate-800">
                  Comprar plantilla
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <p className="mt-6 text-xs text-slate-500">{PRODUCT_CONFIG.disclaimer}</p>
              </div>
              <div className="flex justify-center">
                <DocumentMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Último contenido */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-3xl font-bold text-slate-900">Contenido útil</h2>
            <Link href="/blog" className="hidden text-sm font-semibold text-teal-600 hover:underline sm:inline">Ver blog →</Link>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col gap-1 p-6 transition-colors hover:bg-slate-50 md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">{post.category ?? 'Artículo'}</span>
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-teal-700">{post.title}</h3>
                  <p className="text-sm text-slate-600">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-4 md:text-right">
                  <time className="text-xs text-slate-400">{post.date}</time>
                  <ArrowRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-teal-600" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Confianza */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-3xl font-bold text-slate-900">Hecho para arrendadores como tú</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              'Colombia',
              'Vivienda urbana',
              'Contenido práctico',
              'Fuentes normativas citadas',
              'No somos un despacho de abogados',
            ].map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-white p-5 text-center text-sm font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-slate-950 py-16 md:py-24">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Recibe recursos prácticos para administrar mejor tu inmueble.</h2>
          <p className="mb-8 text-slate-300">Guías, plantillas y herramientas nuevas. Solo lo útil, directo a tu correo.</p>
          <NewsletterCTA source="hero" />
          <p className="mt-6 text-xs text-slate-500">
            Sin spam. Cancela cuando quieras.{' '}
            <a href="/politica-de-datos" className="underline hover:text-teal-300">Política de datos</a>
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-8 text-3xl font-bold text-slate-900">¿Qué quieres resolver hoy?</h2>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/guias" className="rounded-xl bg-slate-900 px-8 py-3.5 font-semibold text-white hover:bg-slate-800">Explorar guías</Link>
            <Link href="/herramientas" className="rounded-xl border border-slate-300 px-8 py-3.5 font-semibold text-slate-700 hover:bg-slate-50">Ver herramientas</Link>
            <Link href="/tienda" className="rounded-xl border border-slate-300 px-8 py-3.5 font-semibold text-slate-700 hover:bg-slate-50">Ver plantilla</Link>
          </div>
        </div>
      </section>
    </>
  );
}
