import type { Metadata } from 'next';
import LegalPageLayout from '@/components/legal/LegalPageLayout';
import LegalSection from '@/components/legal/LegalSection';
import LegalCallout from '@/components/legal/LegalCallout';
import { LEGAL_IDENTITY } from '@/lib/legal-identity';

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description:
    'Aviso legal, exención de responsabilidad y divulgación de afiliados de ArrendadorCO.',
};

const TOC = [
  { id: 'titular', label: 'Titular del Sitio' },
  { id: 'objeto', label: 'Objeto' },
  { id: 'caracter-informativo', label: 'Carácter Informativo' },
  { id: 'propiedad', label: 'Propiedad Intelectual' },
  { id: 'enlaces', label: 'Enlaces Externos' },
  { id: 'legislacion', label: 'Legislación Aplicable' },
  { id: 'contacto', label: 'Contacto' },
];

export default function AvisoLegal() {
  return (
    <LegalPageLayout
      title="Aviso Legal"
      subtitle="Información general sobre el titular, el objeto del sitio y la divulgación de afiliados."
      lastUpdated="Octubre de 2026"
      toc={TOC}
      current="/aviso-legal"
    >
      <LegalSection number="01" title="Titular del Sitio" id="titular">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <ul className="space-y-1">
            <li>Marca comercial: {LEGAL_IDENTITY.marcaComercial}</li>
            <li>Responsable: {LEGAL_IDENTITY.titular}</li>
            <li>Documento/NIT: {LEGAL_IDENTITY.documento}</li>
            <li>Domicilio: {LEGAL_IDENTITY.domicilio}</li>
            <li>Dirección de notificación: {LEGAL_IDENTITY.direccionNotificacion}</li>
            <li>Correo oficial: {LEGAL_IDENTITY.correoOficial}</li>
            <li>Teléfono: {LEGAL_IDENTITY.telefono}</li>
            <li>Sitio web: {LEGAL_IDENTITY.sitioWeb}</li>
          </ul>
        </div>
      </LegalSection>

      <LegalSection number="02" title="Objeto" id="objeto">
        <p>
          El objetivo de ArrendadorCO es proporcionar orientación práctica, resúmenes explicativos,
          modelos de referencia y herramientas útiles para pequeños arrendadores.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Carácter Informativo" id="caracter-informativo">
        <LegalCallout title="Sitio informativo" variant="info">
          ArrendadorCO es un sitio de contenido informativo. No somos un despacho de abogados ni
          ofrecemos asesoría legal personalizada.
        </LegalCallout>
      </LegalSection>

      <LegalSection number="04" title="Propiedad Intelectual" id="propiedad">
        <p>Los textos, marcas, imágenes y código son titularidad del titular del sitio o de terceros que autorizaron su uso.</p>
      </LegalSection>

      <LegalSection number="05" title="Enlaces Externos" id="enlaces">
        <p>
          Algunas recomendaciones a servicios de terceros son enlaces de afiliados y pueden generar
          una comisión sin sobrecosto para el usuario.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Legislación Aplicable" id="legislacion">
        <p>Este aviso se rige por las leyes de la República de Colombia.</p>
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
