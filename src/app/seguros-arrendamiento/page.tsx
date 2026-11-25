import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, AlertCircle, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Seguros de Arrendamiento en Colombia',
  alternates: { canonical: '/seguros-arrendamiento' },
  description: 'Compara opciones de seguros de arrendamiento para proteger tus ingresos por alquiler en Colombia.',
};

export default function SegurosArrendamiento() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      {/* Hero */}
      <header className="mb-12 md:mb-16 text-center">
        <h1 className="mb-4 text-3xl md:text-4xl font-bold text-navy-900">
          Seguros de arrendamiento en Colombia
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Compara opciones para proteger tus ingresos por alquiler: coberturas, costos, aseguradoras y requisitos.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-800">
          <AlertCircle className="w-4 h-4" aria-hidden="true" />
          Próximamente — Estamos construyendo la comparativa
        </div>
      </header>

      {/* Nota de transparencia */}
      <section className="mb-12 p-6 rounded-2xl border border-amber-200 bg-amber-50">
        <h2 className="mb-3 text-lg font-semibold text-amber-900 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" aria-hidden="true" />
          Transparencia
        </h2>
        <ul className="space-y-2 text-sm text-amber-800">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-teal-600" aria-hidden="true" />
            ArrendadorCO no es intermediario de seguros ni corredor autorizado.
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-teal-600" aria-hidden="true" />
            Esta página es contenido educativo y comparativo; no constituye asesoría en seguros.
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-teal-600" aria-hidden="true" />
            Si en el futuro mostramos enlaces a aseguradoras, podríamos recibir una comisión por referidos. Te avisaremos claramente cuando sea el caso.
          </li>
        </ul>
      </section>

      {/* Tabla comparativa (datos de ejemplo) */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-navy-900">
          Comparativa de ejemplo (datos ilustrativos)
        </h2>
        <p className="mb-6 text-gray-600">
          La siguiente tabla contiene <strong>datos de ejemplo</strong> únicamente para mostrar la estructura de la comparativa. No representan ofertas reales ni cotizaciones vigentes.
        </p>
        <div className="overflow-x-auto rounded-xl border border-navy-100 bg-white">
          <table className="w-full text-sm" role="table">
            <thead className="bg-navy-50">
              <tr>
                <th className="p-4 text-left font-semibold text-navy-900 border-b border-navy-100">Aseguradora</th>
                <th className="p-4 text-left font-semibold text-navy-900 border-b border-navy-100">Cobertura principal</th>
                <th className="p-4 text-left font-semibold text-navy-900 border-b border-navy-100">Costo anual referencial</th>
                <th className="p-4 text-left font-semibold text-navy-900 border-b border-navy-100">Canon máximo</th>
                <th className="p-4 text-left font-semibold text-navy-900 border-b border-navy-100">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              <tr className="hover:bg-navy-50">
                <td className="p-4 font-medium text-navy-900">SURA (ejemplo)</td>
                <td className="p-4 text-gray-600">Canon, admin, servicios, daños, acompañamiento legal</td>
                <td className="p-4 text-gray-600">~50 % de 1 mes de canon</td>
                <td className="p-4 text-gray-600">Hasta $8.000.000 COP</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                    Ejemplo
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-navy-50">
                <td className="p-4 font-medium text-navy-900">Seguros Bolívar (ejemplo)</td>
                <td className="p-4 text-gray-600">Canon, admin, servicios, asistencia domiciliaria</td>
                <td className="p-4 text-gray-600">~60 % de 1 mes de canon</td>
                <td className="p-4 text-gray-600">Hasta $7.000.000 COP</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                    Ejemplo
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-navy-50">
                <td className="p-4 font-medium text-navy-900">Mapfre (ejemplo)</td>
                <td className="p-4 text-gray-600">Canon, admin, servicios, daños, defensa jurídica</td>
                <td className="p-4 text-gray-600">~55 % de 1 mes de canon</td>
                <td className="p-4 text-gray-600">Hasta $8.000.000 COP</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                    Ejemplo
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-navy-50">
                <td className="p-4 font-medium text-navy-900">Equidad Seguros (ejemplo)</td>
                <td className="p-4 text-gray-600">Canon, admin, servicios, asistencia domiciliaria</td>
                <td className="p-4 text-gray-600">~45 % de 1 mes de canon</td>
                <td className="p-4 text-gray-600">Hasta $6.000.000 COP</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                    Ejemplo
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-navy-50">
                <td className="p-4 font-medium text-navy-900">Aseguradora Solidaria (ejemplo)</td>
                <td className="p-4 text-gray-600">Canon, admin, servicios, daños</td>
                <td className="p-4 text-gray-600">~50 % de 1 mes de canon</td>
                <td className="p-4 text-gray-600">Hasta $8.000.000 COP</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                    Ejemplo
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          * Valores ilustrativos. Las coberturas, precios, rangos de canon y condiciones varían según aseguradora, plan y perfil del inquilino. Consulta siempre los términos y condiciones de la póliza vigente.
        </p>
      </section>

      {/* Verificar intermediarios autorizados */}
      <section className="mb-12 p-6 rounded-2xl border border-teal-200 bg-teal-50">
        <h2 className="mb-3 text-lg font-semibold text-teal-900">
          Verifica intermediarios autorizados
        </h2>
        <p className="mb-4 text-teal-800">
          Antes de contratar, confirma que la aseguradora o el intermediario estén autorizados por la Superintendencia Financiera de Colombia.
        </p>
        <Link
          href="https://www.superfinanciera.gov.co/sucis"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-base font-semibold text-white hover:bg-teal-700 transition-colors"
        >
          Consultar SUCIS (Superintendencia Financiera)
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </Link>
      </section>

      {/* Formulario de captura de email */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-navy-900 text-center">
          ¿Quieres que te avisen cuando la comparativa esté lista?
        </h2>
        <form
          action="/api/leads"
          method="POST"
          className="mx-auto max-w-md"
        >
          <input type="hidden" name="source" value="seguros-arrendamiento" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder="tu@email.com"
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              aria-label="Tu correo electrónico"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-teal-600 px-6 py-3 text-base font-semibold text-white hover:bg-teal-700 transition-colors"
            >
              Avísame
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-gray-500">
            Usaremos tu correo solo para notificarte cuando la comparativa esté disponible. Sin spam.
          </p>
        </form>
      </section>

      {/* Enlaces relacionados */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-navy-900">
          Guías relacionadas
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/guias/contratos"
            className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="mb-2 font-semibold text-navy-900">Contrato de arrendamiento de vivienda urbana</h3>
            <p className="text-sm text-gray-600">Qué debe contener, cláusulas recomendadas y errores frecuentes.</p>
          </Link>
          <Link
            href="/guias/morosos"
            className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="mb-2 font-semibold text-navy-900">¿Qué hacer si tu inquilino no está pagando?</h3>
            <p className="text-sm text-gray-600">Documentación, comunicación, conciliación y restitución.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}