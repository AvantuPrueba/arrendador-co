import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  ClipboardCheck,
  ShieldAlert,
  Receipt,
  ArrowRight,
} from 'lucide-react';
import { baseOpenGraph, baseTwitter } from '@/lib/metadata';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Guías para Arrendadores en Colombia',
  alternates: { canonical: '/guias' },
  description: 'Guías prácticas para pequeños arrendadores en Colombia sobre contratos, entrega de inmuebles, morosidad y fiscalidad.',
  openGraph: {
    ...baseOpenGraph(),
    title: 'Guías para Arrendadores en Colombia | ArrendadorCO',
    description: 'Guías prácticas para pequeños arrendadores en Colombia sobre contratos, entrega de inmuebles, morosidad y fiscalidad.',
    type: 'website',
    locale: 'es_CO',
    url: absoluteUrl('/guias'),
    siteName: 'ArrendadorCO',
  },
  twitter: {
    ...baseTwitter(),
    title: 'Guías para Arrendadores en Colombia | ArrendadorCO',
    description: 'Guías prácticas para pequeños arrendadores en Colombia sobre contratos, entrega de inmuebles, morosidad y fiscalidad.',
  },
};

const categories = [
  {
    slug: 'contratos',
    icon: FileText,
    title: 'Contratos de Arrendamiento',
    description: 'Qué revisar antes de firmar y qué debe incluir un contrato de vivienda urbana.',
  },
  {
    slug: 'actas',
    icon: ClipboardCheck,
    title: 'Entrega del Inmueble',
    description: 'Cómo documentar el estado del inmueble al entregarlo y recibirlo.',
  },
  {
    slug: 'morosos',
    icon: ShieldAlert,
    title: 'Inquilinos Morosos',
    description: 'Qué opciones considera la ley colombiana ante un incumplimiento de pago.',
  },
  {
    slug: 'fiscalidad',
    icon: Receipt,
    title: 'Fiscalidad del Arrendador',
    description: 'Impuestos, deducciones y obligaciones que debe conocer un arrendador.',
  },
] as const;

export default function Guias() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-navy-50 via-white to-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 mb-6">
            RECURSOS PARA PEQUEÑOS ARRENDADORES
          </span>
          <h1 className="mb-6 text-4xl md:text-5xl font-bold text-navy-900 leading-tight">
            Todo lo que necesitas para gestionar tus arriendos
          </h1>
          <p className="mx-auto max-w-3xl text-lg md:text-xl text-gray-600">
            Guías prácticas para pequeños propietarios en Colombia sobre contratos, entrega de inmuebles, morosidad y fiscalidad.
          </p>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/guias/${category.slug}`}
                className="group rounded-2xl border border-navy-100 bg-white p-6 shadow-lg hover:shadow-xl hover:border-teal-200 transition-all duration-300 flex flex-col h-full"
              >
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-navy-50 text-navy-600 group-hover:bg-navy-100 group-hover:text-navy-700 transition-colors">
                  <category.icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-navy-900">{category.title}</h3>
                <p className="text-gray-600 mb-6 flex-1">{category.description}</p>
                <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 group">
                  Explorar
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product CTA */}
      <section className="py-16 md:py-20 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-3xl border border-navy-200 bg-white p-8 md:p-12 text-center">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-navy-900">
              ¿Necesitas el documento, no solo la teoría?
            </h2>
            <p className="mb-4 text-lg text-gray-600">
              Plantilla editable de contrato de arrendamiento de vivienda urbana.
            </p>
            <div className="mb-6 flex items-center justify-center gap-4">
              <span className="text-3xl font-bold text-navy-900">$45.000 COP</span>
              <span className="text-gray-500">Pago único</span>
            </div>
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 rounded-xl bg-navy-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-navy-700 transition-colors shadow-lg"
            >
              Ver la plantilla
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <p className="mt-6 text-xs text-gray-500">
              Modelo informativo. No constituye asesoría legal.
            </p>
          </div>
        </div>
      </section>

      {/* Minimal Footer for this page */}
      <footer className="bg-navy-950 border-t border-navy-800 py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-navy-400">
              © {new Date().getFullYear()} ArrendadorCO. Todos los derechos reservados.
            </p>
            <p className="text-navy-500">
              Contenido informativo. No asesoría legal.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/politica-de-datos" className="text-navy-400 hover:text-teal-300">Política de datos</Link>
              <span className="text-navy-700">·</span>
              <Link href="/terminos-y-condiciones" className="text-navy-400 hover:text-teal-300">Términos</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}