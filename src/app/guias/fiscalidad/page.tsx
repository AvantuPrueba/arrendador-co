import type { Metadata } from 'next';
import NewsletterCTA from '@/components/NewsletterCTA';

export const metadata: Metadata = {
  title: 'Fiscalidad del Arrendador',
  description: 'Guía tributaria para arrendadores en Colombia: impuestos, deducciones y declaración anual.',
};

export default function FiscalidadGuia() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6">Fiscalidad del Arrendador Colombiano</h1>
      <div className="prose">
        <h2>Impuesto predial vs. renta</h2>
        <p>
          El impuesto predial unificado es un gravamen municipal anual que recae sobre el inmueble por el hecho de su posesión o propiedad, mientras que los cánones de arrendamiento percibidos constituyen ingresos gravables en el impuesto sobre la renta del orden nacional ante la DIAN dentro de la cédula general.
        </p>

        <h2>Deducciones permitidas</h2>
        <p>
          En la determinación de la renta líquida celular por rentas de capital, las personas naturales pueden imputar costos y gastos procedentes debidamente soportados, tales como el impuesto predial efectivamente pagado en el año gravable, intereses pagados por créditos de adquisición de vivienda y gastos necesarios de mantenimiento y conservación.
        </p>

        <h2>Declaración anual</h2>
        <p>
          Si los ingresos brutos, patrimonio o consumos superan los umbrales fijados anualmente por la DIAN en UVT, el arrendador está obligado a presentar declaración de renta. Es indispensable solicitar y conservar los certificados de retención en la fuente expedidos por arrendatarios que actúen como agentes de retención.
        </p>

        <h2>Tips de ahorro fiscal</h2>
        <p>
          Llevar un archivo ordenado con facturas electrónicas de todas las reparaciones locativas, certificar adecuadamente los intereses hipotecarios y planificar adecuadamente deducciones por dependientes económicos o aportes voluntarios a fondos de pensiones y cuentas AFC permite optimizar legalmente la carga fiscal del arrendador.
        </p>
      </div>
      <NewsletterCTA />
    </div>
  );
}
