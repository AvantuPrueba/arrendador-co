import type { Metadata } from 'next';
import AffiliateBox from '@/components/AffiliateBox';
import NewsletterCTA from '@/components/NewsletterCTA';

export const metadata: Metadata = {
  title: 'Manejo de Inquilinos Morosos',
  description: 'Guía sobre manejo de inquilinos morosos en Colombia: prevención, notificaciones, mediación y procedimientos judiciales.',
};

export default function MorososGuia() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6">Manejo de Inquilinos Morosos</h1>
      <div className="prose">
        <h2>Prevención</h2>
        <p>
          La mejor protección contra la morosidad comienza en la selección del arrendatario. Es fundamental evaluar el historial crediticio en centrales de riesgo, solicitar certificados de ingresos laborales o tributarios tanto del arrendatario como de su codeudor solidario, y considerar la adquisición de una póliza o fianza de arrendamiento.
        </p>

        <h2>Notificaciones legales</h2>
        <p>
          Si el pago no se efectúa en las fechas acordadas en el contrato, se debe emitir un requerimiento formal por escrito notificando el retraso, los intereses de mora aplicables y el plazo perentorio para subsanar el incumplimiento. Esta notificación debe enviarse por correo postal certificado para que tenga validez probatoria.
        </p>

        <h2>Mediación</h2>
        <p>
          Antes de emprender acciones litigiosas, convocar a una audiencia de conciliación en un centro autorizado, consultorio jurídico o notaría permite concertar un acuerdo de pago con plazos realistas. El acta de conciliación presta mérito ejecutivo y facilita la restitución expedita del inmueble si se incumple lo pactado.
        </p>

        <h2>Procedimientos judiciales</h2>
        <p>
          Cuando la vía de conciliación no rinde frutos, el arrendador puede instaurar una demanda de restitución de inmueble arrendado ante los juzgados civiles, acompañada de un proceso ejecutivo para el cobro de los cánones y servicios públicos causados hasta la entrega material efectiva del predio.
        </p>
      </div>
      <AffiliateBox
        title="🛡️ Seguros de arrendamiento (información)"
        description="Las pólizas pueden cubrir canon impago y costos legales de restitución. Consulta con aseguradoras autorizadas en Colombia."
        ctaText="Ver información"
        ctaHref="[PENDIENTE: URL_SEGUROS]"
      />
      <NewsletterCTA source="newsletter-guias" />
    </div>
  );
}