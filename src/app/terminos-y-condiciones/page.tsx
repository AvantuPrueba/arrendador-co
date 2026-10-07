import type { Metadata } from 'next';
import LegalPageLayout from '@/components/legal/LegalPageLayout';
import LegalSection from '@/components/legal/LegalSection';
import LegalCallout from '@/components/legal/LegalCallout';
import LegalPermissionGrid from '@/components/legal/LegalPermissionGrid';
import { LEGAL_CONFIG } from '@/lib/legal-config';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description:
    'Términos y condiciones de uso de la plataforma y productos digitales de ArrendadorCO.',
};

const TOC = [
  { id: 'info-general', label: 'Información General y Titularidad' },
  { id: 'uso-del-sitio', label: 'Uso del Sitio' },
  { id: 'naturaleza-servicios', label: 'Naturaleza de los Servicios' },
  { id: 'caracter-informativo', label: 'Carácter Informativo' },
  { id: 'propiedad-licencia', label: 'Propiedad Intelectual y Licencia' },
  { id: 'precios-pagos', label: 'Precios y Pagos' },
  { id: 'responsabilidades', label: 'Responsabilidades' },
  { id: 'afiliados', label: 'Afiliados y Recomendaciones' },
  { id: 'disponibilidad', label: 'Disponibilidad del Servicio' },
  { id: 'modificaciones', label: 'Modificaciones' },
  { id: 'ley-aplicable', label: 'Ley Aplicable' },
  { id: 'contacto', label: 'Contacto' },
];

export default function TerminosYCondiciones() {
  return (
    <LegalPageLayout
      title="Términos y Condiciones de Uso"
      subtitle="Las reglas generales de uso de ArrendadorCO y de la compra de nuestros productos digitales."
      lastUpdated="Octubre de 2026"
      toc={TOC}
      current="/terminos-y-condiciones"
    >
      <LegalSection number="01" title="Información General y Titularidad" id="info-general">
        <p>El sitio web accesible a través de arrendador.co es operado por:</p>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <ul className="space-y-1">
            <li>Marca comercial: {LEGAL_CONFIG.brandName}</li>
            <li>Responsable: {LEGAL_CONFIG.legalName}</li>
            <li>Documento/NIT: {LEGAL_CONFIG.taxId}</li>
            <li>Domicilio: {LEGAL_CONFIG.city}</li>
            <li>Dirección de notificación: {LEGAL_CONFIG.address}</li>
            <li>Correo oficial: {LEGAL_CONFIG.officialEmail}</li>
            <li>Teléfono: {LEGAL_CONFIG.phone}</li>
            <li>Sitio web: {LEGAL_CONFIG.website}</li>
          </ul>
        </div>
      </LegalSection>

      <LegalSection number="02" title="Uso del Sitio" id="uso-del-sitio">
        <p>
          El acceso y uso del sitio atribuye la condición de usuario e implica la aceptación de estas
          condiciones. Si no está de acuerdo, absténgase de usar el sitio.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Naturaleza de los Servicios" id="naturaleza-servicios">
        <p>
          ArrendadorCO ofrece contenido informativo, guías prácticas, modelos de referencia,
          herramientas de orientación y plantillas digitales editables para arrendadores de vivienda
          urbana en Colombia.
        </p>
      </LegalSection>

      <LegalSection number="04" title="Carácter Informativo" id="caracter-informativo">
        <LegalCallout title="Contenido orientativo" variant="info">
          Todo el contenido tiene finalidad pedagógica e informativa y no sustituye la asesoría
          jurídica calificada. Consulta a un abogado matriculado antes de celebrar contratos o iniciar
          trámites.
        </LegalCallout>
      </LegalSection>

      <LegalSection number="05" title="Propiedad Intelectual y Licencia" id="propiedad-licencia">
        <LegalPermissionGrid
          allowed={[
            'Descargar y modificar las plantillas para tus propios inmuebles',
            'Usar las plantillas en la administración directa de tus inmuebles',
          ]}
          forbidden={[
            'Revender o sublicenciar las plantillas',
            'Compartirlas públicamente o distribuirlas de forma masiva',
          ]}
        />
      </LegalSection>

      <LegalSection number="06" title="Precios y Pagos" id="precios-pagos">
        <p>
          Los precios están expresados en pesos colombianos (COP). Los pagos se procesan mediante
          Mercado Pago. ArrendadorCO no almacena datos sensibles de medios de pago.
        </p>
      </LegalSection>

      <LegalSection number="07" title="Responsabilidades" id="responsabilidades">
        <p>
          En la medida máxima permitida por la ley, el titular no será responsable por daños derivados
          del uso del material ni de los resultados obtenidos al emplear las plantillas.
        </p>
      </LegalSection>

      <LegalSection number="08" title="Afiliados y Recomendaciones" id="afiliados">
        <p>
          Algunos enlaces a servicios de terceros pueden generar una comisión para ArrendadorCO sin
          costo extra para el usuario. No ejercemos control sobre esos terceros.
        </p>
      </LegalSection>

      <LegalSection number="09" title="Disponibilidad del Servicio" id="disponibilidad">
        <p>El sitio puede presentar interrupciones por mantenimiento o causas ajenas a nosotros.</p>
      </LegalSection>

      <LegalSection number="10" title="Modificaciones" id="modificaciones">
        <p>Podemos actualizar estos términos en cualquier momento; rigen desde su publicación.</p>
      </LegalSection>

      <LegalSection number="11" title="Ley Aplicable" id="ley-aplicable">
        <p>
          Se rigen por las leyes de la República de Colombia y las autoridades competentes del país.
        </p>
        <p>
          Autoridad de protección al consumidor: Superintendencia de Industria y Comercio —{' '}
          <a href="https://www.sic.gov.co/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
            www.sic.gov.co
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number="12" title="Contacto" id="contacto">
        <ul className="list-disc pl-6 space-y-1">
          <li>Responsable: {LEGAL_CONFIG.legalName}</li>
          <li>Documento/NIT: {LEGAL_CONFIG.taxId}</li>
          <li>Correo oficial: {LEGAL_CONFIG.officialEmail}</li>
        </ul>
        <p className="text-sm text-slate-500">
          Este documento es informativo y no constituye asesoría jurídica.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
