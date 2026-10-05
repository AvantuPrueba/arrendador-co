import type { Metadata } from 'next';
import AffiliateBox from '@/components/AffiliateBox';
import NewsletterCTA from '@/components/NewsletterCTA';

export const metadata: Metadata = {
  title: 'Herramientas',
  description: 'Herramientas recomendadas para arrendadores: seguros, software de facturación y calculadoras de rentabilidad.',
};

export default function Herramientas() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-4 text-center">Herramientas para Arrendadores</h1>
      <p className="mb-10 text-center text-gray-600">
        Recursos y servicios que pueden simplificar la gestión de tus inmuebles.
      </p>

      <div className="space-y-6">
        {/* Seguros de Arrendamiento - Contenido informativo detallado */}
        <div className="rounded-lg border-2 border-blue-100 bg-blue-50/50 p-6">
          <h2 className="mb-4 text-xl font-bold text-blue-800">Seguros de Arrendamiento en Colombia: Una Guía Informativa</h2>

          <div className="space-y-4 text-sm text-gray-700">
            <section>
              <h3 className="font-semibold text-gray-900">¿Qué es y cómo te protege?</h3>
              <p className="mt-1">
                Un seguro de arrendamiento es una póliza que actúa como un respaldo para el propietario.
                Su función principal es garantizar el pago del canon de arrendamiento y otras obligaciones
                (como cuotas de administración y servicios públicos) incluso si el inquilino deja de
                cumplir con sus pagos. La aseguradora asume el pago y luego se encarga de la gestión
                de cobro al arrendatario. Es una alternativa a la figura tradicional del codeudor.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900">Coberturas más comunes</h3>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>Canon de arrendamiento</li>
                <li>Cuotas de administración</li>
                <li>Servicios públicos</li>
                <li>Asistencia domiciliaria</li>
                <li>Daños al inmueble</li>
                <li>Acompañamiento legal</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900">¿Cuánto cuesta un seguro de arrendamiento?</h3>
              <p className="mt-1">
                No existe una tarifa única; el costo depende de la aseguradora, el valor del canon mensual,
                las coberturas elegidas y el perfil del inquilino. Las modalidades de pago más comunes son:
                Pago anual único (generalmente entre el 40% y el 70% de un mes de canon) o Pago mensual
                (entre el 3% y el 10% del canon).
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900">Principales aseguradoras en Colombia</h3>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>SURA</li>
                <li>Seguros Bolívar</li>
                <li>Mapfre</li>
                <li>Aseguradora Solidaria</li>
                <li>Equidad Seguros</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900">Requisitos para solicitarlo</h3>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>Uso residencial del inmueble</li>
                <li>Canon dentro de un rango (ej. $500.000 - $8.000.000 COP)</li>
                <li>Documento de identidad del propietario</li>
                <li>Nombre y correo del inquilino</li>
                <li>Matrícula inmobiliaria</li>
                <li>Soportes de ingresos del inquilino</li>
              </ul>
            </section>

            <p className="mt-4 text-xs text-gray-500">
              Este contenido es meramente informativo y no constituye asesoría legal o financiera.
              Las coberturas, precios y condiciones varían según cada aseguradora y el plan contratado.
              Consulta siempre los términos y condiciones de la póliza.
            </p>
          </div>
        </div>

        <AffiliateBox
          title="🧾 Software de Facturación"
          description="Genera recibos de pago, controla ingresos mensuales y cumple con la facturación electrónica de la DIAN."
          ctaText="Ver opciones de software"
          ctaHref="[PENDIENTE: URL_FACTURACION]"
        />

        <div className="rounded-lg border border-gray-200 p-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            📊 Calculadora de Rentabilidad
          </h3>
          <p className="text-sm text-gray-600">
            Próximamente — Calcula el retorno de inversión de tu inmueble considerando
            gastos de mantenimiento, impuestos y vacancia.
          </p>
          <span className="mt-3 inline-block rounded-full bg-gray-200 px-4 py-1.5 text-xs font-medium text-gray-600">
            Próximamente
          </span>
        </div>
      </div>

      <NewsletterCTA source="newsletter-herramientas" />
    </div>
  );
}