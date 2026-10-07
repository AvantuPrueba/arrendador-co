import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  Home,
  FileText,
  FolderCheck,
  ArrowRight,
} from 'lucide-react';
import NewsletterCTA from '@/components/NewsletterCTA';
import CheckoutForm from '@/components/CheckoutForm';
import { MobileBuyBar } from './mobile-buy-bar';
import { formatPrice } from '@/lib/product';

const paymentLink = 'https://mpago.li/2kC2Gbt';

export const metadata: Metadata = {
  title: 'Plantilla de Contrato de Arrendamiento | ArrendadorCO',
  description:
    'Plantilla editable de contrato de arrendamiento para vivienda urbana en Colombia. Incluye Word, Google Docs y guía de personalización.',
  openGraph: { url: '/tienda' },
};

export default function Tienda() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-[13px] text-slate-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-teal-600 transition-colors">Inicio</Link>
        <span aria-hidden="true">→</span>
        <Link href="/tienda" className="hover:text-teal-600 transition-colors">Tienda</Link>
        <span aria-hidden="true">→</span>
        <span className="text-slate-900">Plantilla de contrato</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
        <main className="min-w-0">
          {/* HERO */}
          <header className="mb-10">
            <span className="mb-5 inline-block rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              Plantilla editable
            </span>
            <h1 className="mb-4 text-3xl md:text-5xl font-bold leading-tight text-slate-900">
              Contrato de arrendamiento de vivienda urbana
            </h1>
            <p className="mb-6 max-w-2xl text-lg text-slate-600">
              Una plantilla editable para organizar y adaptar tu contrato de arrendamiento en Colombia.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
              <li className="inline-flex items-center gap-1.5"><FileText className="h-4 w-4" aria-hidden="true" />Word + Google Docs</li>
              <li className="inline-flex items-center gap-1.5"><FolderCheck className="h-4 w-4" aria-hidden="true" />Guía PDF incluida</li>
              <li className="inline-flex items-center gap-1.5"><Home className="h-4 w-4" aria-hidden="true" />Vivienda urbana</li>
              <li>· Colombia</li>
            </ul>
          </header>

          {/* Preview */}
          <section className="mb-12" aria-label="Vista previa del documento">
            <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-10" style={{ perspective: '1200px' }}>
              <span className="absolute top-4 left-4 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-500 border border-slate-200">Vista previa</span>
              <span className="absolute top-4 right-4 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase text-teal-600 border border-teal-200">Editable</span>
              <span className="absolute bottom-4 right-4 text-[10px] text-slate-400">v1.0.0</span>
              <div
                className="mx-auto max-w-md rotate-[-1.5deg] rounded-lg border border-slate-200 bg-white p-6 shadow-xl animate-float motion-reduce:animate-none"
              >
                <p className="mb-1 text-center text-[10px] uppercase tracking-widest text-slate-400">ArrendadorCO</p>
                <h3 className="mb-4 text-center text-base font-bold text-slate-900">Contrato de Arrendamiento de Vivienda Urbana</h3>
                <div className="space-y-1.5 text-[11px] leading-relaxed text-slate-500">
                  <p><strong className="text-slate-700">Arrendador:</strong> [Nombre completo]</p>
                  <p><strong className="text-slate-700">Arrendatario:</strong> [Nombre completo]</p>
                  <p><strong className="text-slate-700">Inmueble:</strong> [Dirección]</p>
                  <p><strong className="text-slate-700">Canon mensual:</strong> $[valor] COP</p>
                  <div className="my-3 rounded border-l-2 border-teal-500 bg-teal-50 p-2 text-[10px] text-teal-900">
                    Cláusula destacada: objeto, precio, término y servicios.
                  </div>
                  <p>Cláusulas: uso del inmueble, canon, término, garantías, servicios.</p>
                </div>
                <div className="mt-5 border-t border-slate-100 pt-3 text-center text-[10px] text-slate-400">
                  Firma del arrendador · Firma del arrendatario
                </div>
              </div>
            </div>
          </section>

          {/* Trust bar */}
          <p className="mb-12 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">
            <span>✓ Producto digital</span>
            <span>✓ Precio final visible</span>
            <span>✓ Pago mediante Mercado Pago</span>
            <span>✓ Vivienda urbana en Colombia</span>
          </p>

          {/* Qué incluye */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Qué incluye</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                'Plantilla editable en Word',
                'Versión para Google Docs',
                'Guía PDF de personalización',
                'Campos preparados para completar',
                'Formato listo para revisar e imprimir',
                'Versión identificada por número de versión',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Qué NO incluye */}
          <section className="mb-12">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Qué no incluye</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              {['No incluye asesoría jurídica personalizada', 'No incluye representación legal', 'No garantiza un resultado jurídico concreto'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Para quién es */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Para quién es</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                'Propietario que va a iniciar un arrendamiento',
                'Arrendador que quiere organizar su documentación',
                'Persona que quiere sustituir una plantilla genérica',
              ].map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* Cómo funciona */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Cómo funciona la compra</h2>
            <ol className="grid gap-6 sm:grid-cols-3">
              {[
                { n: '01', t: 'REVISA', d: 'Conoce el contenido de la plantilla.' },
                { n: '02', t: 'PAGA', d: 'Completa el pago mediante Mercado Pago.' },
                { n: '03', t: 'RECIBE', d: 'Tras confirmar el pago, se habilitará la entrega digital.' },
              ].map((s) => (
                <li key={s.n}>
                  <span className="font-mono text-sm text-teal-600">{s.n}</span>
                  <h3 className="mt-1 font-bold text-slate-900">{s.t}</h3>
                  <p className="mt-1 text-sm text-slate-600">{s.d}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Preguntas frecuentes</h2>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {[
                { q: '¿Qué archivos incluye?', a: 'La plantilla en Word y una versión para Google Docs, más la guía PDF de personalización.' },
                { q: '¿En qué formato recibiré la plantilla?', a: 'En formato .docx editable y enlace a Google Docs.' },
                { q: '¿Puedo editarla?', a: 'Sí, es un documento editable para adaptarlo a tu caso.' },
                { q: '¿Cómo se realiza el pago?', a: 'Mediante Mercado Pago: tarjeta, transferencia, PSE o Efecty.' },
                { q: '¿Qué ocurre después de pagar?', a: 'Mercado Pago procesa el pago y posteriormente ArrendadorCO gestionará la entrega digital del producto una vez confirmado el pago.' },
              ].map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900">
                    {f.q}
                    <span className="text-teal-600 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-sm text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <p className="text-xs text-slate-500 border-l-2 border-slate-200 pl-4">
            Este documento es informativo y no constituye asesoría jurídica personalizada.
          </p>
        </main>

        {/* Card de compra */}
        <aside id="compra" className="h-fit lg:sticky lg:top-24">
          <div className="rounded-2xl border border-slate-200 border-t-2 border-t-teal-500 bg-white p-6 shadow-lg">
            <h2 className="mb-1 text-lg font-semibold text-slate-900">Tu compra</h2>
            <div className="mb-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-slate-900">{formatPrice()}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">Pago único</span>
            </div>
            <hr className="my-4 border-slate-100" />
            <CheckoutForm paymentLink={paymentLink} />
          </div>
        </aside>
      </div>

      {/* CTA final */}
      <section className="mt-20 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
        <h2 className="mb-3 text-2xl font-bold text-slate-900">¿Listo para organizar tu contrato?</h2>
        <p className="mb-6 text-slate-600">{formatPrice()} · Pago único</p>
        <Link href="#compra" className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-3.5 font-semibold text-white hover:bg-slate-800">
          Comprar plantilla
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </section>

      <NewsletterCTA source="newsletter-tienda" />

      {/* Barra móvil */}
      <MobileBuyBar />
    </div>
  );
}
