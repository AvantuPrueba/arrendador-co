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
  { id: 'responsable', label: 'Responsable del Tratamiento' },
  { id: 'datos', label: 'Datos que Recopilamos' },
  { id: 'finalidades', label: 'Finalidades' },
  { id: 'base-legal', label: 'Base Legal' },
  { id: 'conservacion', label: 'Conservación' },
  { id: 'derechos', label: 'Derechos del Titular' },
  { id: 'transferencias', label: 'Transferencias' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'cambios', label: 'Cambios' },
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
      <LegalSection number="01" title="Responsable del Tratamiento" id="responsable">
        <ul className="list-disc pl-6 space-y-1">
          <li>Titular: {LEGAL_IDENTITY.titular}</li>
          <li>Identificación: {LEGAL_IDENTITY.identificacion}</li>
          <li>Correo oficial: {LEGAL_IDENTITY.correoOficial}</li>
          <li>País: {LEGAL_IDENTITY.pais}</li>
        </ul>
      </LegalSection>

      <LegalSection number="02" title="Datos que Recopilamos" id="datos">
        <p>
          Datos de contacto e identificación, datos de facturación y compra, y datos de navegación
          (IP, navegador, registros de acceso y cookies técnicas).
        </p>
      </LegalSection>

      <LegalSection number="03" title="Finalidades" id="finalidades">
        <ol className="list-decimal pl-6 space-y-1">
          <li>Gestionar suscriptores del newsletter.</li>
          <li>Responder consultas y peticiones.</li>
          <li>Procesar compras y entregar productos digitales.</li>
          <li>Cumplir obligaciones legales y tributarias.</li>
        </ol>
      </LegalSection>

      <LegalSection number="04" title="Base Legal" id="base-legal">
        <p>Ley Estatutaria 1581 de 2012 y Decreto 1377 de 2013.</p>
      </LegalSection>

      <LegalSection number="05" title="Conservación" id="conservacion">
        <p>Los datos se conservan mientras sean necesarios para las finalidades descritas.</p>
      </LegalSection>

      <LegalSection number="06" title="Derechos del Titular" id="derechos">
        <LegalCallout title="Ejercicio de derechos" variant="info">
          Puedes conocer, actualizar, rectificar o suprimir tus datos escribiendo al correo oficial.
          También puedes revocar la autorización y presentar quejas ante la SIC.
        </LegalCallout>
      </LegalSection>

      <LegalSection number="07" title="Transferencias" id="transferencias">
        <p>
          Los datos no se comparten con terceros salvo para procesar pagos a través de Mercado Pago.
        </p>
      </LegalSection>

      <LegalSection number="08" title="Cookies" id="cookies">
        <p>Usamos cookies técnicas y analíticas para optimizar la experiencia de navegación.</p>
      </LegalSection>

      <LegalSection number="09" title="Cambios" id="cambios">
        <p>Podemos actualizar esta política; los cambios rigen desde su publicación.</p>
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
