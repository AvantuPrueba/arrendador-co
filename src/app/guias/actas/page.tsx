import type { Metadata } from 'next';
import NewsletterCTA from '@/components/NewsletterCTA';

export const metadata: Metadata = {
  title: 'Actas de Entrega y Recepción',
  description: 'Tutorial para crear actas de entrega de inmuebles en Colombia: checklists, modelos y documentación fotográfica.',
};

export default function ActasGuia() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6">Actas de Entrega y Recepción</h1>
      <div className="prose">
        <h2>¿Qué es un acta de entrega?</h2>
        <p>
          El acta de entrega y recepción es el documento probatorio en el que arrendador y arrendatario dejan constancia por escrito del estado material, estético y funcional en que se entrega el inmueble al iniciar el contrato, así como al momento de su restitución final.
        </p>

        <h2>Checklist de inspección</h2>
        <p>
          Durante el recorrido de inspección se deben revisar minuciosamente puertas, cerraduras, ventanas, vidrios, acabados de pintura, pisos, enchapes, sanitarios, griferías, instalaciones eléctricas, tomacorrientes e interruptores, calentador y tomas de gas. Asimismo, es esencial anotar la lectura de los contadores de servicios públicos al momento de la entrega.
        </p>

        <h2>Modelo de acta</h2>
        <p>
          Un formato completo de acta de entrega debe contener la fecha, los datos de identificación de ambas partes, la relación discriminada de llaves y controles entregados, una lista de chequeo estancia por estancia con espacio para observaciones detalladas y la firma de conformidad de los intervinientes.
        </p>

        <h2>Documentación fotográfica</h2>
        <p>
          Complementar el acta física con un registro fotográfico y de video con fecha visible es indispensable para evitar discrepancias futuras. Estas imágenes sirven como soporte fehaciente ante reclamos por daños extraordinarios o deterioro al momento de la desocupación del inmueble.
        </p>
      </div>
      <NewsletterCTA />
    </div>
  );
}
