import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calculator,
  TrendingUp,
  ClipboardCheck,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Herramientas para Arrendadores en Colombia | ArrendadorCO',
  description: 'Próximas calculadoras y utilidades para pequeños arrendadores en Colombia: reajuste del canon, rentabilidad y gestión de inmuebles.',
};

const upcomingTools = [
  {
    icon: Calculator,
    title: 'Calculadora de reajuste del canon',
    description: 'Calcula el nuevo valor del canon aplicando el IPC o el índice acordado en el contrato, según la Ley 820 de 2003.',
    available: true,
    href: '/herramientas/reajuste-canon',
  },
  {
    icon: TrendingUp,
    title: 'Calculadora de rentabilidad',
    description: 'Proyecta el retorno de inversión de tu inmueble considerando gastos de mantenimiento, impuestos, vacancia y administración.',
    available: false,
  },
  {
    icon: ClipboardCheck,
    title: 'Checklist de entrega',
    description: 'Lista detallada para documentar el estado del inmueble al entregarlo y recibirlo, con campos para fotos y observaciones.',
    available: false,
  },
] as const;

export default function Herramientas() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      {/* Hero */}
      <section className="mb-16 md:mb-20">
        <h1 className="mb-4 text-3xl md:text-4xl font-bold text-navy-900">
          Herramientas para gestionar tus arriendos
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-gray-600">
          Estamos construyendo calculadoras y utilidades gratuitas para pequeños
          arrendadores en Colombia. Mientras tanto, explora las guías disponibles.
        </p>
        <Link
          href="/guias"
          className="inline-flex items-center gap-2 rounded-xl bg-navy-600 px-6 py-3 text-base font-semibold text-white hover:bg-navy-700 transition-colors"
        >
          Ver las guías
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </Link>
      </section>

      {/* En camino section */}
      <section className="mb-16 md:mb-20">
        <h2 className="mb-8 text-2xl md:text-3xl font-bold text-navy-900">
          Próximamente
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingTools.map((tool) => (
            <article
              key={tool.title}
              className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-navy-50 text-navy-600">
                <tool.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">
                {tool.title}
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                {tool.description}
              </p>
              {tool.available ? (
                <>
                  <span className="mb-4 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 border border-green-200">
                    Disponible
                  </span>
                  <Link
                    href={tool.href}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-navy-600 hover:underline"
                  >
                    Usar calculadora →
                  </Link>
                </>
              ) : (
                <span className="inline-block rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700">
                  Próximamente
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Servicios recomendados section */}
      <section className="mb-16 md:mb-20">
        <h2 className="mb-4 text-2xl md:text-3xl font-bold text-navy-900">
          Servicios que pueden ayudarte a gestionar tus arriendos
        </h2>
        <p className="mb-8 max-w-2xl text-gray-600">
          Estamos revisando opciones para recomendarte. Pronto publicaremos
          comparativas.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Seguros de arrendamiento - informativo */}
          <article className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-navy-900">
              Seguros de arrendamiento
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Garantizan el pago del canon, administración y servicios si el inquilino incumple.</li>
              <li>• Coberturas comunes: canon, administración, servicios públicos, asistencia domiciliaria, daños, acompañamiento legal.</li>
              <li>• Costo referencial: 40–70 % de un mes de canon (anual) o 3–10 % del canon (mensual), según aseguradora y perfil.</li>
              <li>• Principales aseguradoras en Colombia: SURA, Seguros Bolívar, Mapfre, Aseguradora Solidaria, Equidad Seguros.</li>
              <li>• Requisitos típicos: uso residencial, canon en rango ($500.000–$8.000.000), documentos de identidad, matrícula inmobiliaria, soportes de ingresos del inquilino.</li>
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              Información general. Las coberturas, precios y condiciones varían según cada aseguradora y plan. Consulta siempre los términos de la póliza.
            </p>
          </article>

          {/* Software de facturación - informativo */}
          <article className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-navy-900">
              Software de facturación y gestión
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Genera recibos de pago y controla ingresos mensuales de tus arriendos.</li>
              <li>• Facilita el cumplimiento de la facturación electrónica ante la DIAN.</li>
              <li>• Funciones habituales: conciliación bancaria, reportes de rentabilidad, recordatorios de vencimiento, portal para inquilinos.</li>
              <li>• Opciones en el mercado colombiano: soluciones contables completas y plataformas especializadas en arrendamiento.</li>
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              Información general. Las funcionalidades, precios y cumplimiento normativo varían según cada proveedor. Verifica que la solución se ajuste a tus necesidades.
            </p>
          </article>
        </div>
      </section>

      {/* Producto section */}
      <section>
        <div className="rounded-2xl border border-navy-200 bg-navy-50 p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl md:text-3xl font-bold text-navy-900">
              ¿Necesitas el contrato de arrendamiento?
            </h2>
            <p className="mb-4 text-lg text-gray-600">
              Plantilla editable de contrato de vivienda urbana
            </p>
            <div className="mb-6 flex items-center justify-center gap-4">
              <span className="text-2xl md:text-3xl font-bold text-navy-900">
                $45.000 COP
              </span>
              <span className="text-gray-500">Pago único</span>
            </div>
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 rounded-xl bg-navy-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-navy-700 transition-colors shadow-lg"
            >
              Ver plantilla
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <p className="mt-6 text-xs text-gray-500">
              Modelo informativo. No constituye asesoría legal.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}