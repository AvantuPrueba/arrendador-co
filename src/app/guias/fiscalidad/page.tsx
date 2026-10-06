import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Building2, Receipt, FileCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fiscalidad del Arrendador',
  description: 'Guía sobre impuestos y obligaciones tributarias del arrendador en Colombia.',
};

const fiscalMap = [
  {
    id: 'renta',
    icon: FileText,
    title: 'Renta',
    description: '¿Cómo se tratan los ingresos por alquiler?',
  },
  {
    id: 'predial',
    icon: Building2,
    title: 'Predial',
    description: '¿Qué impuesto recae sobre el inmueble?',
  },
  {
    id: 'iva',
    icon: Receipt,
    title: 'IVA',
    description: '¿El arrendamiento de vivienda genera IVA?',
  },
  {
    id: 'facturacion',
    icon: FileCheck,
    title: 'Facturación',
    description: '¿Qué obligaciones formales pueden existir?',
  },
] as const;

const sectionIds = [
  'renta',
  'declaracion',
  'predial',
  'costos',
  'deducciones',
  'iva',
  'facturacion',
  'documentos',
  'errores',
  'contador',
  'fuentes',
] as const;

export default function FiscalidadGuia() {
  const today = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      {/* Hero */}
      <header className="mb-12 md:mb-16">
        <h1 className="mb-4 text-3xl md:text-4xl font-bold text-navy-900">
          Impuestos y obligaciones tributarias del arrendador en Colombia
        </h1>
        <p className="mb-6 max-w-2xl text-lg text-gray-600">
          Una guía práctica para entender renta, predial, IVA, facturación y documentación relacionada con tus ingresos por arrendamiento.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span>Enfoque: personas naturales · vivienda urbana</span>
          <span>Última revisión: {today}</span>
          <span>Año gravable: 2025</span>
        </div>
      </header>

      {/* Aviso */}
      <section className="mb-12 p-6 rounded-2xl border border-amber-200 bg-amber-50">
        <p className="text-amber-800">
          <strong>Esta guía ofrece información general.</strong> Las obligaciones tributarias dependen de las circunstancias de cada contribuyente y no sustituye asesoría de un contador o profesional tributario.
        </p>
      </section>

      {/* Mapa fiscal */}
      <section className="mb-12" aria-labelledby="mapa-fiscal">
        <h2 id="mapa-fiscal" className="mb-6 text-2xl font-bold text-navy-900">
          Mapa fiscal del arrendador
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fiscalMap.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-navy-50 text-navy-600">
                <item.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Estructura de secciones (vacías por ahora) */}
      <div className="prose prose-navy max-w-none space-y-16">
        {sectionIds.map((id) => (
          <section
            key={id}
            id={id}
            className="min-h-[100px] border-t border-navy-100 pt-8 first:border-0 first:pt-0"
          >
            {/* Contenido se añadirá en las siguientes partes */}
          </section>
        ))}
      </div>
    </div>
  );
}