import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Building2, Receipt, FileCheck, Calculator, Wallet, Home, Wrench, Landmark, AlertCircle, CalendarX, FolderX, Building, FileX, Store, Globe, Users, Briefcase, Info } from 'lucide-react';
import { TAX_YEAR_CONFIG, uvtToCop } from '@/lib/tax-config';
import { baseOpenGraph, baseTwitter } from '@/lib/metadata';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Impuestos y Obligaciones Tributarias del Arrendador en Colombia',
  description: 'Guía para pequeños arrendadores en Colombia sobre renta, predial, IVA, facturación y documentación tributaria. Enfocada en personas naturales con arrendamiento de vivienda urbana.',
  alternates: {
    canonical: '/guias/fiscalidad',
  },
  openGraph: {
    ...baseOpenGraph(),
    title: 'Impuestos y Obligaciones Tributarias del Arrendador en Colombia',
    description: 'Guía práctica sobre renta, predial, IVA y facturación para pequeños arrendadores en Colombia.',
    type: 'article',
    locale: 'es_CO',
    url: absoluteUrl('/guias/fiscalidad'),
    siteName: 'ArrendadorCO',
  },
  twitter: {
    ...baseTwitter(),
    title: 'Impuestos y Obligaciones Tributarias del Arrendador en Colombia | ArrendadorCO',
    description: 'Guía para pequeños arrendadores en Colombia sobre renta, predial, IVA, facturación y documentación tributaria.',
  },
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
          <span>Año gravable: {TAX_YEAR_CONFIG.year}</span>
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

        <section id="costos" className="border-t border-navy-100 pt-8">
          <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
            <Receipt className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-navy-900">
            Costos y gastos procedentes
          </h2>
          <p className="mb-4 text-gray-600">
            Para rentas de capital (donde caen los arrendamientos), la ley permite restar costos y gastos que cumplan los requisitos generales de procedencia (art. 336 ET).
          </p>
          <p className="mb-4 text-gray-600">
            Algunos ejemplos suelen incluir administración, reparaciones y mantenimiento necesarios, seguros y comisiones. La procedencia depende de cada caso.
          </p>
          <p className="mb-6 text-gray-600">
            Los gastos personales no relacionados con la generación del ingreso no son deducibles de la renta de arrendamiento.
          </p>
          <div className="mb-6 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5">
            <p className="text-amber-800">
              No todo gasto relacionado con el inmueble es automáticamente deducible. Debe cumplir los requisitos generales y estar asociado a la generación de la renta.
            </p>
          </div>
          <h3 className="mb-3 text-lg font-semibold text-navy-900">
            Algunos ejemplos suelen incluir:
          </h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Administración del inmueble (cuando aplique)</li>
            <li>Reparaciones y mantenimiento necesarios</li>
            <li>Seguros relacionados con el inmueble</li>
            <li>Comisiones pagadas por gestión</li>
            <li>Otros gastos que cumplan los requisitos generales</li>
          </ul>
        </section>

        <section id="deducciones" className="border-t border-navy-100 pt-8">
          <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
            <Wallet className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-navy-900">
            Deducciones específicas: qué revisar
          </h2>
          <p className="mb-4 text-gray-600">
            Las deducciones especiales (como los intereses de vivienda) son distintas de los costos y gastos de la actividad. Tienen reglas y límites propios.
          </p>
          <p className="mb-4 text-gray-600">
            Intereses de vivienda (art. 119 ET): tienen tratamiento específico y un límite de 1.200 UVT en el formulario 210. No son un gasto del inmueble; son una deducción con condiciones particulares.
          </p>
          <p className="mb-6 text-gray-600">
            Otros beneficios personales (dependientes, AFC, pensiones voluntarias) NO son deducciones del arrendamiento. Son beneficios personales que se aplican según el caso del contribuyente.
          </p>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-gray-700">
              Las deducciones y beneficios aplicables dependen de tu situación tributaria particular. Consulta con un contador antes de aplicarlos en tu declaración.
            </p>
          </div>
        </section>

        <section id="iva" className="border-t border-navy-100 pt-8">
          <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
            <Receipt className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-navy-900">
            ¿El arrendamiento tiene IVA?
          </h2>
          <p className="mb-6 text-gray-600">
            El tratamiento del IVA en arrendamiento depende de la destinación del inmueble. No es lo mismo arrendar para vivienda que para uso comercial.
          </p>
          <div className="mb-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
                <Home className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">
                Inmueble destinado a vivienda
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                El arrendamiento de inmuebles para vivienda está excluido del IVA bajo las condiciones previstas en la normativa (Estatuto Tributario, art. 476, num. 15).
              </p>
              <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
                Excluido de IVA
              </span>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
                <Building2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">
                Inmueble de uso comercial o mixto
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                El arrendamiento de inmuebles para usos distintos a vivienda puede estar gravado con IVA. El tratamiento depende de las condiciones particulares de la operación.
              </p>
              <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
                Puede estar gravado
              </span>
            </div>
          </div>
          <div className="mb-6 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5">
            <p className="text-amber-800">
              Esta guía cubre arrendamiento de vivienda urbana. Si arriendas locales, oficinas o bodegas, el tratamiento tributario puede ser diferente. Consulta con un contador.
            </p>
          </div>
          <a
            href="https://www.dian.gov.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50 transition-colors"
          >
            Consultar información oficial en la DIAN →
          </a>
        </section>

        <section id="facturacion" className="border-t border-navy-100 pt-8">
          <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
            <FileCheck className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-navy-900">
            ¿Debo facturar?
          </h2>
          <p className="mb-4 text-gray-600">
            Una cosa es el IVA y otra es la obligación de facturar. Son conceptos distintos y no siempre van juntos.
          </p>
          <p className="mb-4 text-gray-600">
            La obligación de facturar depende de la situación tributaria del arrendador y de las reglas aplicables a la operación.
          </p>
          <p className="mb-6 text-gray-600">
            El hecho de que el arrendamiento de vivienda esté excluido de IVA no significa automáticamente que desaparezcan todas las obligaciones formales de facturación que puedan corresponder.
          </p>
          <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h3 className="mb-2 text-lg font-semibold text-navy-900">
              ¿Cómo saber si debo facturar?
            </h3>
            <p className="text-gray-700">
              La DIAN define los sujetos obligados a facturar electrónicamente. Consulta la información oficial vigente para tu caso concreto.
            </p>
          </div>
          <a
            href="https://www.dian.gov.co/impuestos/factura-electronica/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50 transition-colors"
          >
            Consultar información oficial sobre facturación electrónica →
          </a>
        </section>

        <section id="documentos" className="border-t border-navy-100 pt-8">
          <h2 className="mb-4 text-2xl font-bold text-navy-900">
            Documentos que conviene conservar
          </h2>
          <p className="mb-6 text-gray-600">
            Conservar los soportes adecuados facilita la declaración y ayuda a responder a cualquier requerimiento de la DIAN. Estos son los principales.
          </p>
          <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
                <FileText className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Contratos de arrendamiento</h3>
              <p className="text-sm text-gray-600">El contrato vigente y sus modificaciones (otrosí, adendas).</p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
                <Receipt className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Comprobantes de pago</h3>
              <p className="text-sm text-gray-600">Soportes de los cánones recibidos: transferencias, recibos, facturas cuando correspondan.</p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
                <Building2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Recibos de predial</h3>
              <p className="text-sm text-gray-600">Recibo del impuesto predial efectivamente pagado del año.</p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
                <Wrench className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Facturas de reparaciones</h3>
              <p className="text-sm text-gray-600">Facturas de mantenimiento y reparaciones del inmueble.</p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
                <FileCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Certificados de retención</h3>
              <p className="text-sm text-gray-600">Cuando corresponda, los certificados expedidos por agentes de retención.</p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
                <Landmark className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Certificados bancarios y financieros</h3>
              <p className="text-sm text-gray-600">Certificados de intereses, saldos y movimientos relacionados con el inmueble.</p>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-gray-700">
              La DIAN puede solicitar soportes de las deducciones y costos declarados. Conserva los documentos por el término legal que corresponda.
            </p>
          </div>
        </section>

        <section id="errores" className="border-t border-navy-100 pt-8">
          <h2 className="mb-4 text-2xl font-bold text-navy-900">
            Errores frecuentes
          </h2>
          <p className="mb-6 text-gray-600">
            Estos son los errores más comunes que cometen los arrendadores al declarar. Evitarlos te ahorra tiempo y problemas.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
                <Building className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Confundir predial con renta</h3>
              <p className="text-sm text-gray-600">El predial es municipal; la renta es nacional. Son impuestos distintos.</p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
                <CalendarX className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Usar umbrales de otro año</h3>
              <p className="text-sm text-gray-600">La UVT y los umbrales cambian cada año. Verifica siempre el año gravable que te corresponde.</p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
                <Wallet className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Asumir que todo gasto es deducible</h3>
              <p className="text-sm text-gray-600">No todo gasto relacionado con el inmueble cumple los requisitos de procedencia.</p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
                <FolderX className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">No conservar soportes</h3>
              <p className="text-sm text-gray-600">Sin documentos no puedes probar las deducciones que declaras.</p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
                <AlertCircle className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Confundir vivienda con inmueble comercial</h3>
              <p className="text-sm text-gray-600">El tratamiento tributario cambia según la destinación del inmueble.</p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600">
                <FileX className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Asumir que siempre hay retención</h3>
              <p className="text-sm text-gray-600">No todo arrendatario está obligado a practicar retención. Depende del caso.</p>
            </div>
          </div>
        </section>

        <section id="contador" className="border-t border-navy-100 pt-8">
          <h2 className="mb-4 text-2xl font-bold text-navy-900">
            ¿Cuándo conviene consultar a un contador?
          </h2>
          <p className="mb-6 text-gray-600">
            Esta guía cubre el caso general de personas naturales con arrendamiento de vivienda urbana. Hay situaciones donde un profesional tributario puede ahorrarte tiempo, dinero o problemas.
          </p>
          <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600"><Building2 className="w-5 h-5" aria-hidden="true" /></div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Tienes varios inmuebles</h3>
              <p className="text-sm text-gray-600">Múltiples fuentes de ingreso pueden complicar la declaración.</p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600"><Wallet className="w-5 h-5" aria-hidden="true" /></div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Recibes ingresos de varias fuentes</h3>
              <p className="text-sm text-gray-600">Trabajo, honorarios, arriendos y otros ingresos requieren consolidación.</p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600"><Store className="w-5 h-5" aria-hidden="true" /></div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Tienes inmuebles comerciales</h3>
              <p className="text-sm text-gray-600">El tratamiento del IVA y otros tributos cambia según la destinación.</p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600"><Globe className="w-5 h-5" aria-hidden="true" /></div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">No eres residente fiscal</h3>
              <p className="text-sm text-gray-600">Las reglas para no residentes son diferentes.</p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600"><Users className="w-5 h-5" aria-hidden="true" /></div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">El inmueble es copropiedad</h3>
              <p className="text-sm text-gray-600">La distribución de ingresos entre copropietarios tiene reglas propias.</p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-50 text-navy-600"><Briefcase className="w-5 h-5" aria-hidden="true" /></div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Tienes una sociedad</h3>
              <p className="text-sm text-gray-600">Si arriendas a través de una sociedad, el tratamiento es distinto.</p>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <div className="flex items-start gap-3">
              <Info className="mt-1 w-5 h-5 text-navy-600 shrink-0" aria-hidden="true" />
              <p className="text-gray-700">
                Esta guía ofrece información general y no reemplaza asesoría tributaria personalizada. Un contador puede revisar tu caso concreto y ayudarte a cumplir correctamente.
              </p>
            </div>
          </div>
        </section>

        <section id="fuentes" className="border-t border-navy-100 pt-8">
          <h2 className="mb-4 text-2xl font-bold text-navy-900">
            Fuentes consultadas
          </h2>
          <p className="mb-6 text-gray-600">
            Esta guía se basa en la siguiente normativa y fuentes oficiales. Verifica siempre la información vigente directamente en las fuentes primarias.
          </p>
          <ol className="mb-6 list-decimal pl-6 text-gray-600 space-y-4">
            <li>
              <strong className="text-navy-900">Estatuto Tributario colombiano</strong>
              <p className="text-sm">Decreto 624 de 1989 y sus modificaciones.</p>
              <a href="https://normograma.dian.gov.co/dian/compilacion/docs/estatuto_tributario.htm" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-navy-600 hover:underline">
                Ver en el normograma de la DIAN →
              </a>
              <p className="text-sm">Artículos relevantes: 115, 119, 336, 476.</p>
            </li>
            <li>
              <strong className="text-navy-900">DIAN - Dirección de Impuestos y Aduanas Nacionales</strong>
              <p className="text-sm">
                <a href="https://www.dian.gov.co/" target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-600 hover:underline">https://www.dian.gov.co/</a>
              </p>
            </li>
            <li>
              <strong className="text-navy-900">Formulario 210 - Declaración de renta personas naturales</strong>
              <p className="text-sm">Instructivo vigente disponible en el portal de la DIAN.</p>
            </li>
            <li>
              <strong className="text-navy-900">Resolución anual de UVT</strong>
              <p className="text-sm">Valor UVT 2026: $52.374. Publicada por la DIAN.</p>
            </li>
            <li>
              <strong className="text-navy-900">Ley 2010 de 2019</strong>
              <p className="text-sm">Normas de financiamiento y reforma tributaria.</p>
              <a href="https://normograma.dian.gov.co/dian/compilacion/docs/ley_2010_2019.htm" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-navy-600 hover:underline">
                Ver en el normograma de la DIAN →
              </a>
            </li>
          </ol>
          <div className="mb-6 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5">
            <p className="text-amber-800">
              La normativa tributaria cambia con frecuencia. Los valores de UVT, umbrales y formularios se actualizan cada año. Verifica siempre la información vigente en las fuentes oficiales antes de tomar decisiones.
            </p>
          </div>
          <p className="text-sm text-gray-400">
            Última revisión: {today} · Año gravable: {TAX_YEAR_CONFIG.year}
          </p>
        </section>
      </div>
    </div>
  );
}
