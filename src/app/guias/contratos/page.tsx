import type { Metadata } from 'next';
import ProductCTA from '@/components/ProductCTA';
import NewsletterCTA from '@/components/NewsletterCTA';

export const metadata: Metadata = {
  title: 'Contratos de Arrendamiento',
  description: 'Guía completa sobre contratos de arrendamiento en Colombia: elementos obligatorios, cláusulas recomendadas y errores comunes.',
};

export default function ContratosGuia() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6">Contratos de Arrendamiento</h1>
      <div className="prose">
        <h2>Elementos obligatorios</h2>
        <p>
          En Colombia, de acuerdo con la Ley 820 de 2003, todo contrato de arrendamiento de vivienda urbana debe incluir la identificación clara de las partes con documento de identidad, la descripción e identificación precisa del inmueble y sus anexidades, el valor del canon mensual de arrendamiento junto con la periodicidad de pago, la duración inicial pactada del contrato y la forma de pago establecida.
        </p>

        <h2>Cláusulas recomendadas</h2>
        <p>
          Para salvaguardar los derechos del arrendador, es altamente aconsejable incorporar cláusulas de restitución del inmueble ante incumplimientos, la constitución de garantías mediante fiador solidario o póliza de seguro de arrendamiento, el procedimiento para el mantenimiento locativo frente a reparaciones necesarias y la formalización de un inventario detallado como anexo inseparable.
        </p>

        <h2>Renovación y adendas</h2>
        <p>
          Los contratos se renuevan automáticamente bajo los mismos términos si ninguna de las partes notifica la terminación con una antelación mínima de tres meses a la fecha de vencimiento. Cuando se requiera actualizar el canon o ajustar condiciones particulares, las modificaciones deben formalizarse a través de un otrosí o adenda escrita debidamente suscrita por arrendador y arrendatario.
        </p>

        <h2>Errores comunes</h2>
        <p>
          Entre las fallas más recurrentes de los propietarios destacan pactar acuerdos verbales sin soporte probatorio, no elaborar un acta de entrega e inventario al inicio de la relación, prescindir de la firma del codeudor solidario en el documento y omitir los plazos legales de preaviso formal exigidos por la normatividad colombiana.
        </p>
      </div>
      <ProductCTA />
      <NewsletterCTA />
    </div>
  );
}
