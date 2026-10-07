import type { Metadata } from 'next';
import LegalPageLayout from '@/components/legal/LegalPageLayout';
import LegalSection from '@/components/legal/LegalSection';
import LegalCallout from '@/components/legal/LegalCallout';
import { LEGAL_IDENTITY } from '@/lib/legal-identity';

export const metadata: Metadata = {
  title: 'Política de Tratamiento de Datos Personales',
  description:
    'Política de tratamiento y protección de datos personales de ArrendadorCO de conformidad con la Ley 1581 de 2012.',
};

const TOC = [
  { id: 'responsable', label: 'Identificación del Responsable' },
  { id: 'datos', label: 'Datos que Recopilamos' },
  { id: 'finalidades', label: 'Finalidades del Tratamiento' },
  { id: 'base-legal', label: 'Base Legal y Consentimiento' },
  { id: 'conservacion', label: 'Conservación de Datos' },
  { id: 'derechos', label: 'Derechos del Titular' },
  { id: 'transferencias', label: 'Transferencias a Terceros' },
  { id: 'cookies', label: 'Cookies y Analítica' },
  { id: 'vigencia', label: 'Vigencia y Cambios' },
  { id: 'contacto', label: 'Contacto' },
];

export default function PoliticaDeDatos() {
  return (
    <LegalPageLayout
      title="Política de Tratamiento de Datos Personales"
      subtitle="Cómo recolectamos, usamos y protegemos tus datos personales."
      lastUpdated="Octubre de 2026"
      toc={TOC}
      current="/politica-de-datos"
    >
      <LegalSection number="01" title="Identificación del Responsable del Tratamiento" id="responsable">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <ul className="space-y-1">
            <li>Marca comercial: {LEGAL_IDENTITY.marcaComercial}</li>
            <li>Responsable: {LEGAL_IDENTITY.titular}</li>
            <li>Documento/NIT: {LEGAL_IDENTITY.documento}</li>
            <li>Domicilio: {LEGAL_IDENTITY.domicilio}</li>
            <li>Dirección de notificación: {LEGAL_IDENTITY.direccionNotificacion}</li>
            <li>Correo para Habeas Data: {LEGAL_IDENTITY.correoOficial}</li>
            <li>Teléfono: {LEGAL_IDENTITY.telefono}</li>
            <li>Sitio web: {LEGAL_IDENTITY.sitioWeb}</li>
          </ul>
        </div>
      </LegalSection>

      <LegalSection number="02" title="Datos que Recopilamos" id="datos">
        <p>
          Datos de contacto e identificación, datos de facturación y compra, y datos de navegación
          (IP, navegador, registros de acceso y cookies técnicas).
        </p>
      </LegalSection>

      <LegalSection number="03" title="Finalidades del Tratamiento" id="finalidades">
        <ol className="list-decimal pl-6 space-y-1">
          <li>Gestionar suscriptores del newsletter.</li>
          <li>Responder consultas y peticiones.</li>
          <li>Procesar compras y entregar productos digitales.</li>
          <li>Cumplir obligaciones legales y tributarias.</li>
        </ol>
      </LegalSection>

      <LegalSection number="04" title="Base Legal y Consentimiento" id="base-legal">
        <p>Ley Estatutaria 1581 de 2012 y Decreto 1377 de 2013. El tratamiento se basa en el consentimiento del titular, salvo excepciones legales.</p>
      </LegalSection>

      <LegalSection number="05" title="Conservación de Datos" id="conservacion">
        <p>Los datos se conservan mientras sean necesarios para las finalidades descritas.</p>
      </LegalSection>

      <LegalSection number="06" title="Derechos del Titular" id="derechos">
        <LegalCallout title="Ejercicio de derechos" variant="info">
          Puedes ejercer los derechos de conocer, actualizar, rectificar y suprimir tus datos
          escribiendo al correo oficial. También puedes revocar la autorización y presentar quejas
          ante la SIC.
        </LegalCallout>
      </LegalSection>

      <LegalSection number="07" title="Transferencias a Terceros" id="transferencias">
        <ul className="list-disc pl-6 space-y-1">
          <li>Mercado Pago (procesador de pagos) — para procesar compras.</li>
          <li>Cloudflare (hosting y analytics) — para servir el sitio.</li>
        </ul>
      </LegalSection>

      <LegalSection number="08" title="Cookies y Analítica" id="cookies">
        <p>Usamos cookies técnicas y analíticas para optimizar la experiencia de navegación.</p>
      </LegalSection>

      <LegalSection number="09" title="Vigencia y Cambios" id="vigencia">
        <p>
          Esta política entró en vigencia en octubre de 2026. Podemos actualizarla; los cambios
          rigen desde su publicación en este sitio.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Contacto" id="contacto">
        <p>
          Ejerce tus derechos escribiendo a {LEGAL_IDENTITY.correoOficial}. Incluye tu nombre,
          identificación y descripción clara de la solicitud.
        </p>
        <p className="text-sm text-slate-500">
          Este documento es informativo y no constituye asesoría jurídica.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
