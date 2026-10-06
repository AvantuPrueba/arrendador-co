import type { Metadata } from 'next';
import Link from 'next/link';
import NewsletterCTA from '@/components/NewsletterCTA';

export const metadata: Metadata = {
  title: 'Acta de Entrega de Inmueble en Arriendo Colombia | ArrendadorCO',
  description: 'Aprende qué revisar y documentar al entregar o recibir un inmueble en arriendo en Colombia. Incluye checklist práctico y recomendaciones de documentación.',
};

export default function ActasGuia() {
  const today = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <h1 className="mb-3 text-3xl md:text-4xl font-bold text-navy-900">
          Acta de entrega de inmueble en arriendo
        </h1>
        <p className="mb-4 text-lg text-gray-600">
          Qué revisar, qué documentar y cómo dejar constancia del estado del inmueble.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span>Última actualización: {today}</span>
          <span>Lectura: ~8 min</span>
        </div>
      </header>

      {/* ¿Es obligatorio? */}
      <section className="mb-10 p-6 rounded-xl border border-amber-200 bg-amber-50">
        <h2 className="mb-3 text-xl font-semibold text-amber-900">
          ¿Es obligatorio hacer un acta de entrega?
        </h2>
        <p className="text-amber-800">
          No es un requisito general de validez del contrato de arrendamiento de vivienda urbana. La Ley 820 de 2003 establece los asuntos mínimos que las partes deben acordar (artículo 3) y no incluye el acta de entrega entre ellos. El acta es una herramienta documental recomendable para registrar el estado del inmueble.
        </p>
        <p className="mt-3">
          <Link
            href="http://www.secretariasenado.gov.co/senado/basedoc/ley_0820_2003.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 underline hover:text-amber-900"
          >
            Ver Ley 820 de 2003 en Secretaría del Senado
          </Link>
        </p>
      </section>

      <div className="prose prose-navy max-w-none">
        <h2>¿Qué es un acta de entrega?</h2>
        <p>
          El acta de entrega y recepción es una <strong>herramienta documental recomendable</strong> en la que arrendador y arrendatario dejan constancia por escrito del estado material, estético y funcional en que se entrega el inmueble al iniciar el contrato, así como al momento de su restitución final.
        </p>

        <h2>Checklist de inspección</h2>
        <p>
          Durante el recorrido de inspección <strong>se recomienda revisar</strong> minuciosamente puertas, cerraduras, ventanas, vidrios, acabados de pintura, pisos, enchapes, sanitarios, griferías, instalaciones eléctricas, tomacorrientes e interruptores, calentador y tomas de gas. Asimismo, <strong>es una buena práctica</strong> anotar la lectura de los contadores de servicios públicos al momento de la entrega.
        </p>

        <h2>Modelo de acta</h2>
        <p>
          Un formato completo de acta de entrega <strong>conviene que incluya</strong> la fecha, los datos de identificación de ambas partes, la relación discriminada de llaves y controles entregados, una lista de chequeo estancia por estancia con espacio para observaciones detalladas y la <strong>firma (si ambas partes están de acuerdo con el contenido)</strong> de los intervinientes.
        </p>

        <h2>Documentación fotográfica</h2>
        <p>
          Complementar el acta física con un registro fotográfico y de video con fecha visible <strong>es una buena práctica</strong> para evitar discrepancias futuras. Estas imágenes <strong>pueden servir como evidencia</strong> ante reclamos por daños extraordinarios o deterioro al momento de la desocupación del inmueble.
        </p>

        {/* Lo que dice la ley sobre depósitos */}
        <h2>Lo que dice la ley sobre depósitos</h2>
        <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 my-6">
          <p className="font-semibold text-amber-900">
            En contratos de arrendamiento de vivienda urbana, el artículo 16 de la Ley 820 de 2003 prohíbe exigir depósitos en dinero efectivo u otras cauciones reales para garantizar las obligaciones del arrendatario.
          </p>
        </div>
        <p>
          Sí son posibles otras figuras como fiadores, codeudores o pólizas, pero ninguna de ellas es un requisito legal universal.
        </p>

        <h2>Fuentes consultadas</h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>
            Ley 820 de 2003, artículos 1, 2, 3, 8 y 16.
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

      <NewsletterCTA />
    </div>
  );
}