import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Building2, Receipt, FileCheck, Calculator, Wallet } from 'lucide-react';
import { TAX_YEAR_CONFIG, uvtToCop } from '@/lib/tax-config';

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

      <div className="prose prose-navy max-w-none space-y-16">
        <section id="renta" className="border-t border-navy-100 pt-8 first:border-0 first:pt-0">
          <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
            <Wallet className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-navy-900">
            ¿Dónde se declaran los ingresos por arrendamiento?
          </h2>
          <p className="mb-4 text-gray-600">
            Para personas naturales residentes en Colombia, los ingresos por arrendamiento se clasifican, en términos generales, como rentas de capital dentro de la cédula general del impuesto sobre la renta. Es decir, estos ingresos se suman con otras rentas de la misma cédula (según corresponda a cada caso) y se someten a las reglas generales de la declaración de renta.
          </p>
          <p className="mb-4 text-gray-600">
            Esta guía NO cubre los siguientes casos:
          </p>
          <ul className="mb-6 list-disc pl-6 text-gray-600 space-y-1">
            <li>Sociedades comerciales o entidades jurídicas.</li>
            <li>Personas naturales no residentes fiscales en Colombia.</li>
            <li>Casos con estructuras tributarias especiales.</li>
          </ul>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-gray-700">
              Esta guía está enfocada en personas naturales residentes con ingresos por arrendamiento de vivienda urbana. Si tu caso es distinto, consulta con un contador.
            </p>
          </div>
        </section>

        <section id="declaracion" className="border-t border-navy-100 pt-8">
          <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
            <Calculator className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-navy-900">
            ¿Debo presentar declaración de renta?
          </h2>
          <p className="mb-6 text-lg text-gray-500">
            Criterios orientativos para el año gravable {TAX_YEAR_CONFIG.year}
          </p>
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border border-navy-100 text-left text-sm">
              <thead>
                <tr className="bg-navy-50">
                  <th className="px-4 py-3 font-semibold text-navy-900">Concepto</th>
                  <th className="px-4 py-3 font-semibold text-navy-900">UVT</th>
                  <th className="px-4 py-3 font-semibold text-navy-900">Equivalente en COP</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-navy-100">
                  <td className="px-4 py-3 text-gray-700">Ingresos brutos</td>
                  <td className="px-4 py-3 text-gray-700">{TAX_YEAR_CONFIG.thresholds.income.toLocaleString('es-CO')} UVT</td>
                  <td className="px-4 py-3 text-gray-700">{`$${uvtToCop(TAX_YEAR_CONFIG.thresholds.income).toLocaleString('es-CO')}`}</td>
                </tr>
                <tr className="border-t border-navy-100">
                  <td className="px-4 py-3 text-gray-700">Patrimonio bruto</td>
                  <td className="px-4 py-3 text-gray-700">{TAX_YEAR_CONFIG.thresholds.patrimonio.toLocaleString('es-CO')} UVT</td>
                  <td className="px-4 py-3 text-gray-700">{`$${uvtToCop(TAX_YEAR_CONFIG.thresholds.patrimonio).toLocaleString('es-CO')}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mb-6 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5">
            <p className="text-amber-800">
              Los umbrales y la UVT cambian cada año. Antes de tomar una decisión, verifica la información oficial vigente en la DIAN.
            </p>
          </div>
          <a
            href={TAX_YEAR_CONFIG.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 inline-block font-semibold text-navy-600 hover:underline"
          >
            Consultar información oficial en la DIAN →
          </a>
          <p className="mb-2 text-gray-600">
            Presentar la declaración no es lo mismo que pagar impuesto: declarar es informar, y el pago depende del resultado de la liquidación según corresponda.
          </p>
          <p className="text-gray-600">
            Además de los umbrales de ingresos y patrimonio, otros criterios (como consumos con tarjeta, compras o consignaciones) pueden obligar a declarar. Esta tabla solo muestra los más comunes.
          </p>
        </section>

        <section id="predial" className="border-t border-navy-100 pt-8">
          <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
            <Building2 className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-navy-900">
            Impuesto predial: qué debes saber
          </h2>
          <p className="mb-4 text-gray-600">
            El predial es un impuesto territorial municipal, no nacional. Lo administra el municipio o distrito donde está ubicado el inmueble, y su recaudo corresponde a esa entidad territorial.
          </p>
          <p className="mb-6 text-gray-600">
            No debes confundirlo con el impuesto de renta, que es de carácter nacional y lo administra la DIAN.
          </p>
          <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h3 className="mb-2 text-lg font-semibold text-navy-900">
              ¿Es deducible del impuesto de renta?
            </h3>
            <p className="text-gray-700">
              El predial puede ser deducible cuando cumple los requisitos generales del Estatuto Tributario (art. 115): relación de causalidad con la actividad económica y pago efectivo. No es una deducción automática. Conserva el recibo de pago como soporte.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border border-navy-100 text-left text-sm">
              <thead>
                <tr className="bg-navy-50">
                  <th className="px-4 py-3 font-semibold text-navy-900">Aspecto</th>
                  <th className="px-4 py-3 font-semibold text-navy-900">Predial</th>
                  <th className="px-4 py-3 font-semibold text-navy-900">Renta</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-navy-100">
                  <td className="px-4 py-3 text-gray-700">Tipo</td>
                  <td className="px-4 py-3 text-gray-700">Territorial</td>
                  <td className="px-4 py-3 text-gray-700">Nacional</td>
                </tr>
                <tr className="border-t border-navy-100">
                  <td className="px-4 py-3 text-gray-700">Administra</td>
                  <td className="px-4 py-3 text-gray-700">Municipio</td>
                  <td className="px-4 py-3 text-gray-700">DIAN</td>
                </tr>
                <tr className="border-t border-navy-100">
                  <td className="px-4 py-3 text-gray-700">Relacionado con</td>
                  <td className="px-4 py-3 text-gray-700">El inmueble</td>
                  <td className="px-4 py-3 text-gray-700">Tu situación tributaria</td>
                </tr>
                <tr className="border-t border-navy-100">
                  <td className="px-4 py-3 text-gray-700">Frecuencia</td>
                  <td className="px-4 py-3 text-gray-700">Según municipio</td>
                  <td className="px-4 py-3 text-gray-700">Anual, cuando corresponda</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {sectionIds
          .filter((id) => !['renta', 'declaracion', 'predial'].includes(id))
          .map((id) => (
            <section
              key={id}
              id={id}
              className="min-h-[100px] border-t border-navy-100 pt-8"
            >
              {/* Contenido se añadirá en las siguientes partes */}
            </section>
          ))}
      </div>
    </div>
  );
}