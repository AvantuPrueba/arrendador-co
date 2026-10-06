import type { Metadata } from 'next';
import ProductCTA from '@/components/ProductCTA';
import NewsletterCTA from '@/components/NewsletterCTA';

export const metadata: Metadata = {
  title: 'Contrato de arrendamiento de vivienda urbana en Colombia | ArrendadorCO',
  description: 'Qué debe contener, qué conviene revisar antes de firmar y cómo evitar errores frecuentes en contratos de arrendamiento de vivienda urbana bajo la Ley 820 de 2003.',
};

export default function ContratosGuia() {
  const today = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <h1 className="mb-3 text-3xl md:text-4xl font-bold text-navy-900">
          Contrato de arrendamiento de vivienda urbana en Colombia
        </h1>
        <p className="mb-4 text-lg text-gray-600">
          Qué debe contener, qué conviene revisar antes de firmar y cómo evitar errores frecuentes.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span>Última actualización: {today}</span>
          <span>Lectura: ~10 min</span>
        </div>
      </header>

      <div className="prose prose-navy max-w-none">
        <h2>Ámbito de esta guía</h2>
        <p>
          Esta guía se refiere al <strong>arrendamiento de vivienda urbana</strong> regulado por la <strong>Ley 820 de 2003</strong>.
          No cubre arrendamiento rural, comercial, ni fincas raíz distintas a vivienda urbana.
        </p>

        <h2>Qué deben acordar las partes (mínimo legal)</h2>
        <p>
          En vivienda urbana, el contrato puede ser <strong>verbal o escrito</strong>. En cualquier caso,
          el artículo 3 de la Ley 820 de 2003 establece que las partes deben acordar como mínimo estos
          <strong>siete puntos</strong>:
        </p>
        <ol className="list-decimal list-inside space-y-3">
          <li><strong>Las partes</strong>: nombre completo e identificación (documento de identidad) de arrendador y arrendatario.</li>
          <li><strong>El inmueble</strong>: identificación precisa (dirección, matrícula inmobiliaria si existe) y zonas o servicios compartidos si aplica.</li>
          <li><strong>Canon y forma de pago</strong>: valor del canon mensual y periodicidad de pago (mensual, quincenal, etc.).</li>
          <li><strong>Servicios, cosas o usos conexos y adicionales</strong>: qué está incluido (parqueadero, depósito, zonas comunes, etc.).</li>
          <li><strong>Duración del contrato</strong>: término inicial pactado (puede ser indefinido).</li>
          <li><strong>Designación de quién paga los servicios públicos</strong>: agua, energía, gas, internet, etc.</li>
          <li><strong>Reajuste del canon</strong>: forma en que se actualizará el canon (IPC, índice acordado, etc.).</li>
        </ol>
        <p className="text-sm text-gray-600">
          <em>Fuente: Ley 820 de 2003, art. 3.</em>
        </p>

        <h2>Garantías: qué debes saber</h2>
        <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 my-6">
          <p className="font-semibold text-amber-900">
            En contratos de vivienda urbana, el artículo 16 de la Ley 820 <strong>prohíbe exigir
            depósitos en dinero efectivo u otras cauciones reales</strong> para garantizar las obligaciones del arrendatario.
          </p>
        </div>
        <p>
          Ninguna garantía es un requisito legal universal. Las opciones que usan las partes por acuerdo son:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Fiador / codeudor solidario</strong>: una persona natural responde con su patrimonio si el arrendatario incumple.</li>
          <li><strong>Póliza de seguro de arrendamiento</strong>: una aseguradora cubre canon, administración, servicios y daños, según la póliza.</li>
          <li><strong>Garantía para servicios públicos</strong>: se puede pactar un depósito <strong>exclusivamente</strong> para cubrir servicios públicos domiciliarios, pero nunca para el canon.</li>
        </ul>
        <p>
          El arrendador no puede obligar al arrendatario a constituir garantía alguna como condición para celebrar el contrato.
        </p>

        <h2>Prórroga y terminación</h2>
        <h3>Prórroga legal</h3>
        <p>
          El contrato se entiende <strong>prorrogado por el mismo término inicial</strong> (o por períodos anuales si era indefinido),
          siempre que <strong>cada parte haya cumplido sus obligaciones</strong> y el arrendatario acepte los reajustes del canon
          autorizados por la ley. No opera una &ldquo;renovación automática&rdquo; sin más; la prórroga depende del cumplimiento y la aceptación del reajuste.
        </p>
        <h3>Terminación por el arrendador</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Por incumplimiento del arrendatario (canon, servicios, uso indebido, subarriendo no autorizado).</li>
          <li>Por necesidad de vivienda propia (con prueba y notificación con 6 meses de antelación).</li>
          <li>Por demolición o reparación estructural que exija desocupación.</li>
        </ul>
        <h3>Terminación por el arrendatario</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>En cualquier momento, notificando con <strong>3 meses de antelación</strong> (art. 22 Ley 820).</li>
          <li>Por incumplimiento grave del arrendador (no entregar el inmueble, no hacer reparaciones locativas).</li>
        </ul>

        <h2>Errores frecuentes que conviene evitar</h2>
        <ol className="list-decimal list-inside space-y-3">
          <li><strong>No definir quién paga los servicios públicos</strong>: genera disputas y cortes de servicio.</li>
          <li><strong>No dejar datos de notificación en el contrato</strong>: direcciones físicas y electrónicas para notificaciones válidas.</li>
          <li><strong>Confundir una cláusula recomendada con una obligación legal</strong>: ejemplo, inventario detallado, cláusula de restitución anticipada, multas contractuales.</li>
          <li><strong>No documentar el estado del inmueble al entregarlo</strong>: fotos, videos y acta firmada por ambas partes.</li>
          <li><strong>Intentar pactar depósitos prohibidos</strong>: dinero en efectivo como garantía del canon (art. 16 Ley 820).</li>
          <li><strong>Desconocer las reglas de terminación aplicables</strong>: preavisos, causales y procedimientos distintos para arrendador y arrendatario.</li>
        </ol>

        <h2>Fuentes consultadas</h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>
            Ley 820 de 2003, artículos 1, 2, 3, 6, 16, 22 y concordantes.
            <a
              href="http://www.secretariasenado.gov.co/senado/basedoc/ley_0820_2003.html"
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

      <ProductCTA />
      <NewsletterCTA />
    </div>
  );
}