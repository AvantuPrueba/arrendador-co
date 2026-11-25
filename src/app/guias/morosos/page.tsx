import type { Metadata } from 'next';
import Link from 'next/link';
import NewsletterCTA from '@/components/NewsletterCTA';
import { baseOpenGraph, baseTwitter } from '@/lib/metadata';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: '¿Qué hacer con un inquilino moroso en Colombia?',
  alternates: { canonical: '/guias/morosos' },
  description: 'Guía para arrendadores ante el incumplimiento del canon de vivienda urbana en Colombia: documentación, comunicación, conciliación y restitución.',
  openGraph: {
    ...baseOpenGraph(),
    title: '¿Qué hacer con un inquilino moroso en Colombia? | ArrendadorCO',
    description: 'Guía para arrendadores ante el incumplimiento del canon de vivienda urbana en Colombia: documentación, comunicación, conciliación y restitución.',
    type: 'website',
    locale: 'es_CO',
    url: absoluteUrl('/guias/morosos'),
    siteName: 'ArrendadorCO',
  },
  twitter: {
    ...baseTwitter(),
    title: '¿Qué hacer con un inquilino moroso en Colombia? | ArrendadorCO',
    description: 'Guía para arrendadores ante el incumplimiento del canon de vivienda urbana en Colombia: documentación, comunicación, conciliación y restitución.',
  },
};

export default function MorososGuia() {
  const today = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <h1 className="mb-3 text-3xl md:text-4xl font-bold text-navy-900">
          ¿Qué hacer si tu inquilino no está pagando?
        </h1>
        <p className="mb-4 text-lg text-gray-600">
          Qué revisar, cómo documentar la mora y cuáles son las alternativas del arrendador ante un incumplimiento.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span>Vivienda urbana en Colombia</span>
          <span>Información general</span>
          <span>Última actualización: {today}</span>
        </div>
      </header>

      {/* Advertencia inicial */}
      <section className="mb-10 p-5 rounded-xl border border-red-200 bg-red-50">
        <h2 className="mb-2 text-lg font-semibold text-red-900 flex items-center gap-2">
          <span className="w-5 h-5 flex-shrink-0">⚠</span>
          Importante
        </h2>
        <p className="text-red-800">
          No tomes medidas de hecho para recuperar el inmueble. Revisa el contrato, conserva evidencias y utiliza los mecanismos legales correspondientes.
        </p>
      </section>

      <div className="prose prose-navy max-w-none">
        <h2>Revisión del contrato y documentación</h2>
        <p>
          Antes de actuar, verifica lo pactado por escrito: valor del canon, fecha de pago, forma de pago, servicios a cargo del arrendatario y cláusulas de incumplimiento. Si el contrato es verbal, conserva comprobantes de pagos previos, transferencias, mensajes y cualquier prueba que acredite la relación arrendaticia y sus condiciones.
        </p>

        <h2>Comunicación con el arrendatario</h2>
        <p>
          Documenta la mora mediante comunicación escrita (correo electrónico, mensajería certificada, carta). Indica el canon adeudado, el período correspondiente y un plazo razonable para subsanar.
        </p>
        <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 my-6">
          <p className="font-semibold text-amber-900">
            Sobre el medio de notificación:
          </p>
          <p className="mt-2 text-amber-800">
            Conserva evidencia de la comunicación enviada. La Ley 820 exige comunicación por servicio postal autorizado en determinados supuestos de terminación unilateral, pero no todo requerimiento de mora requiere ese medio para tener valor probatorio.
          </p>
        </div>

        <h2>Intereses de mora</h2>
        <p>
          Si el contrato los ha pactado o la ley los autoriza, pueden cobrarse intereses de mora. Verifica la base contractual y legal aplicable.
        </p>

        <h2>Conciliación</h2>
        <p>
          La conciliación es una alternativa para intentar un acuerdo. En la restitución de inmueble arrendado del artículo 384 del Código General del Proceso, la conciliación extrajudicial no es requisito de procedibilidad.
        </p>
        <div className="rounded-lg border-l-4 border-teal-500 bg-teal-50 p-4 my-6">
          <p className="font-semibold text-teal-900">
            Efectos de un acuerdo en conciliación:
          </p>
          <p className="mt-2 text-teal-800">
            Un acta de conciliación con acuerdo puede prestar mérito ejecutivo y tener efecto de cosa juzgada, según la Ley 2220 de 2022.
          </p>
        </div>

        <h2>¿Cuándo entra la vía judicial?</h2>
        <p>
          El proceso de restitución de inmueble arrendado está regulado por el artículo 384 del Código General del Proceso. Se debe aportar prueba documental del contrato de arrendamiento suscrito por el arrendatario (o las alternativas probatorias que la norma contempla).
        </p>
        <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 my-6">
          <p className="font-semibold text-blue-900">
            Sobre el cobro de sumas adeudadas:
          </p>
          <p className="mt-2 text-blue-800">
            El proceso de restitución se rige por el artículo 384 del CGP. Los mecanismos para el cobro de sumas adeudadas se tramitan por vías separadas o dentro del mismo proceso, según corresponda. No se prometen tiempos ni resultados.
          </p>
        </div>
        <p className="text-sm text-gray-500">
          ArrendadorCO no es un despacho jurídico. Esta información es orientativa.
        </p>

        <h2>Prevención responsable</h2>
        <p>
          Verifica la información crediticia de forma responsable, con finalidad legítima y tratando los datos conforme a la normativa de protección de datos (Ley 1266 de 2008). Solicita únicamente la información necesaria.
        </p>

        {/* ¿Qué NO debes hacer? */}
        <h2>¿Qué NO debes hacer?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>No cambies las cerraduras por tu cuenta.</li>
          <li>No retires las pertenencias del arrendatario.</li>
          <li>No cortes servicios para presionar el pago.</li>
          <li>No ingreses al inmueble sin autorización.</li>
          <li>No publiques datos personales del arrendatario.</li>
          <li>No amenaces.</li>
        </ul>

        <h2>Fuentes consultadas</h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>
            Ley 820 de 2003, artículos 6 y 22.
            <a
              href="http://www.secretariasenado.gov.co/senado/basedoc/ley_0820_2003.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:underline"
            >
              Ver texto oficial
            </a>
          </li>
          <li>
            Ley 2220 de 2022, artículo 68.
            <a
              href="http://www.secretariasenado.gov.co/senado/basedoc/ley_2220_2022.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:underline"
            >
              Ver texto oficial
            </a>
          </li>
          <li>
            Ley 1564 de 2012 (CGP), artículo 384.
            <a
              href="http://www.secretariasenado.gov.co/senado/basedoc/ley_1564_2012_pr012.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:underline"
            >
              Ver texto oficial
            </a>
          </li>
          <li>
            Ley 1266 de 2008.
            <a
              href="http://www.secretariasenado.gov.co/senado/basedoc/ley_1266_2008.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:underline"
            >
              Ver texto oficial
            </a>
          </li>
        </ul>
        <p className="mt-6 text-xs text-gray-500">
          <strong>Contenido informativo.</strong> No constituye asesoría jurídica personalizada.
          Para decisiones específicas, consulta con un abogado.
        </p>
      </div>

      {/* Seguros de arrendamiento - contenido educativo */}
      <section className="mt-12 p-6 rounded-2xl border border-navy-100 bg-navy-50">
        <h2 className="mb-4 text-xl font-semibold text-navy-900">
          Seguros de arrendamiento: qué debes saber
        </h2>
        <p className="mb-4 text-gray-600">
          Un seguro de arrendamiento es una póliza que actúa como respaldo para el propietario. Su función principal es garantizar el pago del canon de arrendamiento y otras obligaciones (como cuotas de administración y servicios públicos) incluso si el inquilino deja de cumplir con sus pagos. La aseguradora asume el pago y luego se encarga de la gestión de cobro al arrendatario. Es una alternativa a la figura tradicional del codeudor.
        </p>
        <p className="mb-4 text-gray-600">
          Coberturas habituales: canon de arrendamiento, cuotas de administración, servicios públicos, asistencia domiciliaria, daños al inmueble, acompañamiento legal. El costo varía según aseguradora, valor del canon, coberturas elegidas y perfil del inquilino. Modalidades comunes: pago anual único (generalmente entre el 40 % y el 70 % de un mes de canon) o pago mensual (entre el 3 % y el 10 % del canon).
        </p>
        <p className="mb-4 text-gray-600">
          Principales aseguradoras en Colombia: SURA, Seguros Bolívar, Mapfre, Aseguradora Solidaria, Equidad Seguros. Requisitos típicos: uso residencial del inmueble, canon dentro de un rango (ej. $500.000 – $8.000.000 COP), documento de identidad del propietario, nombre y correo del inquilino, matrícula inmobiliaria, soportes de ingresos del inquilino.
        </p>
        <p className="mb-4 text-xs text-gray-500">
          Las coberturas, precios y condiciones varían según cada aseguradora y el plan contratado. Consulta siempre los términos y condiciones de la póliza.
        </p>
        <Link
          href="/seguros-arrendamiento"
          className="inline-flex items-center gap-2 rounded-xl bg-navy-600 px-6 py-3 text-base font-semibold text-white hover:bg-navy-700 transition-colors"
        >
          Comparar opciones de seguro
          <span aria-hidden="true">→</span>
        </Link>
        <p className="mt-3 text-xs text-gray-500">
          Nota de transparencia: ArrendadorCO no es intermediario de seguros ni corredor. Este contenido es educativo. Si en el futuro mostramos enlaces a aseguradoras, podríamos recibir una comisión por referidos. Te avisaremos claramente cuando sea el caso.
        </p>
      </section>

      <NewsletterCTA source="newsletter-guias" />
    </div>
  );
}