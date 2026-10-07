import type { Metadata } from 'next';
import LegalPageLayout from '@/components/legal/LegalPageLayout';
import LegalSection from '@/components/legal/LegalSection';
import LegalCallout from '@/components/legal/LegalCallout';
import { LEGAL_IDENTITY } from '@/lib/legal-identity';

export const metadata: Metadata = {
  title: 'Política de Retracto y Devoluciones',
  description:
    'Condiciones sobre derecho de retracto, devoluciones y garantías en la compra de productos digitales de ArrendadorCO.',
};

const TOC = [
  { id: 'derecho-retracto', label: 'Derecho de Retracto' },
  { id: 'cuando-procede', label: 'Cuándo Procede' },
  { id: 'cuando-no-procede', label: 'Cuándo No Procede' },
  { id: 'como-solicitarlo', label: 'Cómo Solicitarlo' },
  { id: 'plazos', label: 'Plazos de Devolución' },
  { id: 'reversion-pagos', label: 'Reversión de Pagos' },
  { id: 'contacto', label: 'Contacto' },
];

export default function RetractoYDevoluciones() {
  return (
    <LegalPageLayout
      title="Política de Retracto, Devoluciones y Garantías"
      subtitle="Condiciones para ejercer el derecho de retracto y solicitar devoluciones."
      lastUpdated="Octubre de 2026"
      toc={TOC}
      current="/retracto-y-devoluciones"
    >
      <LegalSection number="01" title="Derecho de Retracto" id="derecho-retracto">
        <p>
          De acuerdo con la legislación colombiana, puedes ejercer el derecho de retracto dentro de
          las condiciones de esta política.
        </p>
      </LegalSection>

      <LegalSection number="02" title="Cuándo Procede" id="cuando-procede">
        <p>
          El retracto procede cuando solicitas la devolución dentro del plazo definido y el producto
          cumple las condiciones de esta política.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Cuándo No Procede" id="cuando-no-procede">
        <LegalCallout title="Excepción por descarga del archivo" variant="warning">
          Si el archivo digital ya fue descargado, el derecho de retracto no aplica, conforme a las
          excepciones de la Ley 1480 de 2011.
        </LegalCallout>
      </LegalSection>

      <LegalSection number="04" title="Cómo Solicitarlo" id="como-solicitarlo">
        <p>
          Escribe al correo oficial {LEGAL_IDENTITY.correoOficial} con tu nombre, correo de compra y
          número de orden.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Plazos de Devolución" id="plazos">
        <p>
          Plazo para ejercer el retracto: 5 días hábiles desde la compra. La devolución del dinero
          no podrá exceder de 15 días calendario desde que ejerzas el derecho (Ley 2439 de 2024).
        </p>
      </LegalSection>

      <LegalSection number="06" title="Reversión de Pagos" id="reversion-pagos">
        <p>
          Los pagos se procesan mediante Mercado Pago. En casos procedentes solicitamos la reversión
          ante el operador de pagos.
        </p>
      </LegalSection>

      <LegalSection number="07" title="Contacto" id="contacto">
        <p>Correo oficial: {LEGAL_IDENTITY.correoOficial}.</p>
        <p className="text-sm text-slate-500">
          Este documento es informativo y no constituye asesoría jurídica.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
