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
import { PRODUCT_CONFIG, formatPrice } from '@/lib/product';
import JsonLd from '@/components/JsonLd';
import { absoluteUrl, ORGANIZATION_ID } from '@/lib/seo';
import { baseOpenGraph, baseTwitter } from '@/lib/metadata';

const paymentLink = 'https://mpago.li/2kC2Gbt';

export const metadata: Metadata = {
  title: 'Plantilla de Contrato de Arrendamiento',
  description: PRODUCT_CONFIG.description,
  alternates: { canonical: '/tienda' },
  openGraph: {
    ...baseOpenGraph(),
    title: 'Plantilla de Contrato de Arrendamiento',
    description: PRODUCT_CONFIG.description,
    type: 'website',
    locale: 'es_CO',
    url: 'https://arrendador.co/tienda',
    siteName: 'ArrendadorCO',
  },
  twitter: {
    ...baseTwitter(),
    title: 'Plantilla de Contrato de Arrendamiento',
    description: PRODUCT_CONFIG.description,
  },
};

export default function Tienda() {
  const productUrl = absoluteUrl('/tienda');
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productUrl}#product`,
    name: PRODUCT_CONFIG.name,
    description: PRODUCT_CONFIG.description,
    url: productUrl,
    brand: { '@id': ORGANIZATION_ID },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      price: PRODUCT_CONFIG.priceCOP,
      priceCurrency: PRODUCT_CONFIG.currency,
      seller: { '@id': ORGANIZATION_ID },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plantilla de contrato',
      },
    ],
  } as const;

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-[13px] text-muted" aria-label="Breadcrumb">
        <Link href="/" className="transition-colors hover:text-green-mid">Inicio</Link>
        <span aria-hidden="true">→</span>
        <span className="text-charcoal">Plantilla de contrato</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
        <main className="min-w-0">
          {/* HERO */}
          <header className="mb-10">
            <span className="mb-5 inline-block rounded-full border border-bronze/40 bg-ivory px-3 py-1 text-xs font-semibold text-green-deep">
              Plantilla editable
            </span>
            <h1 className="mb-4 text-3xl font-bold leading-tight text-charcoal md:text-5xl">
              Contrato de arrendamiento de vivienda urbana
            </h1>
            <p className="mb-6 max-w-2xl text-lg text-muted">{PRODUCT_CONFIG.description}</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              <li className="inline-flex items-center gap-1.5"><FileText className="h-4 w-4" aria-hidden="true" />Word + Google Docs</li>
              <li className="inline-flex items-center gap-1.5"><FolderCheck className="h-4 w-4" aria-hidden="true" />Guía PDF incluida</li>
              <li className="inline-flex items-center gap-1.5"><Home className="h-4 w-4" aria-hidden="true" />Vivienda urbana</li>
              <li>· Colombia</li>
            </ul>
          </header>

          {/* Preview */}
          <section className="mb-12" aria-label="Vista previa del documento">
            <div className="relative rounded-2xl border border-charcoal/10 bg-surface p-6 md:p-10" style={{ perspective: '1200px' }}>
              <span className="absolute left-4 top-4 rounded-full border border-charcoal/10 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase text-muted">Vista previa</span>
              <span className="absolute right-4 top-4 rounded-full border border-bronze/40 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase text-green-mid">Editable</span>
              <span className="absolute bottom-4 right-4 text-[10px] text-charcoal/50">v1.0.0</span>
              <div
                className="mx-auto max-w-md rotate-[-1.5deg] rounded-lg border border-charcoal/10 bg-white p-6 shadow-xl animate-float motion-reduce:animate-none"
              >
                <p className="mb-1 text-center text-[10px] uppercase tracking-widest text-charcoal/50">ArrendadorCO</p>
                <h3 className="mb-4 text-center text-base font-bold text-charcoal">Contrato de Arrendamiento de Vivienda Urbana</h3>
                <div className="space-y-1.5 text-[11px] leading-relaxed text-muted">
                  <p><strong className="text-charcoal">Arrendador:</strong> [Nombre completo]</p>
                  <p><strong className="text-charcoal">Arrendatario:</strong> [Nombre completo]</p>
                  <p><strong className="text-charcoal">Inmueble:</strong> [Dirección]</p>
                  <p><strong className="text-charcoal">Canon mensual:</strong> $[valor] COP</p>
                  <div className="my-3 rounded border-l-2 border-bronze bg-ivory p-2 text-[10px] text-green-deep">
                    Cláusula destacada: objeto, precio, término y servicios.
                  </div>
                  <p>Cláusulas: uso del inmueble, canon, término, garantías, servicios.</p>
                </div>
                <div className="mt-5 border-t border-charcoal/10 pt-3 text-center text-[10px] text-charcoal/50">
                  Firma del arrendador · Firma del arrendatario
                </div>
              </div>
            </div>
          </section>

          {/* Trust bar */}
          <p className="mb-12 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
            <span>✓ Producto digital</span>
            <span>✓ Precio final visible</span>
            <span>✓ Pago mediante Mercado Pago</span>
            <span>✓ Vivienda urbana en Colombia</span>
          </p>

          {/* Qué incluye */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-charcoal">Qué incluye</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                'Plantilla editable en Word',
                'Versión para Google Docs',
                'Guía PDF de personalización',
                'Campos preparados para completar',
                'Formato listo para revisar e imprimir',
                'Versión identificada por número de versión',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-charcoal">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-mid" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Qué NO incluye */}
          <section className="mb-12">
            <h2 className="mb-4 text-lg font-semibold text-charcoal">Qué no incluye</h2>
            <ul className="space-y-2 text-sm text-muted">
              {['No incluye asesoría jurídica personalizada', 'No incluye representación legal', 'No garantiza un resultado jurídico concreto'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-charcoal/50" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Para quién es */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-charcoal">Para quién es</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                'Propietario que va a iniciar un arrendamiento',
                'Arrendador que quiere organizar su documentación',
                'Persona que quiere sustituir una plantilla genérica',
              ].map((item) => (
                <div key={item} className="rounded-xl border border-charcoal/10 bg-white p-5 text-sm text-charcoal">
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* Cómo funciona */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-charcoal">Cómo funciona la compra</h2>
            <ol className="grid gap-6 sm:grid-cols-3">
              {[
                { n: '01', t: 'REVISA', d: 'Conoce el contenido de la plantilla.' },
                { n: '02', t: 'PAGA', d: 'Completa el pago mediante Mercado Pago.' },
                { n: '03', t: 'RECIBE', d: 'Tras confirmar el pago, se habilitará la entrega digital.' },
              ].map((s) => (
                <li key={s.n}>
                  <span className="font-mono text-sm text-bronze">{s.n}</span>
                  <h3 className="mt-1 font-bold text-charcoal">{s.t}</h3>
                  <p className="mt-1 text-sm text-muted">{s.d}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-charcoal">Preguntas frecuentes</h2>
            <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
              {[
                { q: '¿Qué archivos incluye?', a: 'La plantilla en Word y una versión para Google Docs, más la guía PDF de personalización.' },
                { q: '¿En qué formato recibiré la plantilla?', a: 'En formato .docx editable y enlace a Google Docs.' },
                { q: '¿Puedo editarla?', a: 'Sí, es un documento editable para adaptarlo a tu caso.' },
                { q: '¿Cómo se realiza el pago?', a: 'Mediante Mercado Pago: tarjeta, transferencia, PSE o Efecty.' },
                { q: '¿Qué ocurre después de pagar?', a: 'Mercado Pago procesa el pago y posteriormente ArrendadorCO gestionará la entrega digital del producto una vez confirmado el pago.' },
              ].map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-charcoal">
                    {f.q}
                    <span className="text-bronze transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-sm text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <p className="border-l-2 border-charcoal/10 pl-4 text-xs text-muted">
            Este documento es informativo y no constituye asesoría jurídica personalizada.
          </p>
        </main>

        {/* Card de compra */}
        <aside id="compra" className="h-fit lg:sticky lg:top-24">
          <div className="rounded-2xl border border-charcoal/10 border-t-2 border-t-bronze bg-white p-6 shadow-lg">
            <h2 className="mb-1 text-lg font-semibold text-charcoal">Tu compra</h2>
            <div className="mb-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-charcoal">{formatPrice()}</span>
              <span className="rounded-full bg-ivory px-2 py-0.5 text-xs text-muted">Pago único</span>
            </div>
            <hr className="my-4 border-charcoal/10" />
            <CheckoutForm paymentLink={paymentLink} />
          </div>
        </aside>
      </div>

      {/* CTA final */}
      <section className="mt-20 rounded-2xl border border-charcoal/10 bg-surface p-10 text-center">
        <h2 className="mb-3 text-2xl font-bold text-charcoal">¿Listo para organizar tu contrato?</h2>
        <p className="mb-6 text-muted">{formatPrice()} · Pago único</p>
        <Link href="#compra" className="group inline-flex items-center gap-2 rounded-xl bg-green-deep px-8 py-3.5 font-semibold text-white hover:bg-green-mid">
          Comprar plantilla
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </section>

      <NewsletterCTA source="newsletter-tienda" />

      {/* Barra móvil */}
      <MobileBuyBar />
      </div>
    </>
  );
}
