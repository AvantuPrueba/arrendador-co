import type { Metadata } from 'next';

/** Correo de soporte leído en build time (NEXT_PUBLIC_ = inlined en bundle). */
const supportEmail =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || '[PENDIENTE: correo electrónico]';

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description:
    'Aviso legal, exención de responsabilidad y divulgación de afiliados de ArrendadorCO.',
};

export default function AvisoLegal() {
  return (
    <div className="prose mx-auto px-4 py-12">
      <h1>Aviso Legal</h1>
      <p className="text-sm text-gray-500">Última actualización: Octubre de 2026</p>

      <h2>1. Datos Identificativos del Responsable</h2>
      <p>
        En cumplimiento de los principios de transparencia y de la legislación aplicable en la
        República de Colombia, se informa que el sitio web <strong>arrendador.co</strong> es
        propiedad de y se encuentra gestionado por:
      </p>
      <ul>
        <li>
          <strong>Razón Social:</strong> [PENDIENTE: razón social]
        </li>
        <li>
          <strong>RUT / NIT:</strong> [PENDIENTE: RUT]
        </li>
        <li>
          <strong>Correo electrónico de contacto:</strong>{' '}
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
        </li>
        <li>
          <strong>Sitio web principal:</strong> https://arrendador.co
        </li>
      </ul>

      <h2>2. Finalidad Informativa y Pedagógica</h2>
      <p>
        El objetivo de ArrendadorCO es proporcionar contenidos de orientación práctica, resúmenes
        explicativos, modelos de referencia y herramientas útiles para pequeños propietarios y
        arrendadores de vivienda urbana en Colombia.
      </p>

      <h2>3. Ausencia de Relación Abogado-Cliente y Asesoría Legal</h2>
      <p>
        La consulta, lectura o uso de los artículos, modelos y plantillas publicados en este portal no
        configura ni sustituye una asesoría jurídica formal, ni genera vínculo contractual alguno de
        relación abogado-cliente entre el usuario y <strong>[PENDIENTE: razón social]</strong>.
      </p>
      <p>
        La normatividad sobre arrendamientos en Colombia (como la Ley 820 de 2003, el Código Civil y
        demás disposiciones concordantes) está sujeta a interpretaciones de jueces de la República y
        a particularidades fácticas de cada caso. Para la redacción final de contratos de alto valor,
        procesos judiciales de restitución o reclamaciones complejas, se insta a los usuarios a
        procurar la asesoría de un profesional del derecho habilitado.
      </p>

      <h2>4. Transparencia y Divulgación de Enlaces de Afiliados</h2>
      <p>
        En cumplimiento de las mejores prácticas y principios de publicidad digital, se hace saber a
        los usuarios que diversas páginas del sitio web contienen hipervínculos a servicios de
        terceros (por ejemplo: empresas aseguradoras de canon, afianzadoras inmobiliarias o plataformas
        de facturación electrónica).
      </p>
      <p>
        Algunos de estos enlaces son enlaces de afiliados, lo cual implica que ArrendadorCO puede
        recibir una contraprestación económica o comisión si el usuario decide contratar o registrarse
        a través de dichos vínculos, sin que ello represente ningún sobrecosto para el usuario.
        ArrendadorCO selecciona estas recomendaciones buscando brindar valor, pero no garantiza ni se
        hace responsable por la calidad o prestación final de los servicios de dichos proveedores.
      </p>

      <h2>5. Derechos de Propiedad Intelectual</h2>
      <p>
        Los textos, marcas, imágenes y código fuente integrados en este sitio web son titularidad de{' '}
        <strong>[PENDIENTE: razón social]</strong> o de terceros que han concedido los permisos
        pertinentes. Se prohíbe cualquier uso no autorizado, reproducción o redistribución de los
        mismos.
      </p>

      <h2>6. Limitación de Responsabilidad</h2>
      <p>
        <strong>[PENDIENTE: razón social]</strong> procura mantener la información actualizada y
        precisa. No obstante, no garantiza la ausencia total de errores tipográficos o normativos ni
        se responsabiliza por los perjuicios que pudieren suscitarse del empleo de los modelos de
        documentos en acuerdos particulares.
      </p>

      <h2>7. Descargo de Responsabilidad Legal</h2>
      <div className="rounded-md border-l-4 border-blue-600 bg-blue-50 p-4 text-blue-900 not-italic">
        <p className="mb-0">
          ArrendadorCO es un sitio de contenido informativo. No somos un despacho de abogados ni
          ofrecemos asesoría legal personalizada. Las guías y plantillas publicadas son modelos de
          referencia. Recomendamos consultar con un profesional del derecho antes de tomar decisiones
          legales. Los enlaces marcados como afiliados pueden generar una comisión para el sitio.
        </p>
      </div>
    </div>
  );
}
