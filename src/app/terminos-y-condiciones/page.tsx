import type { Metadata } from 'next';

/** Correo de soporte leído en build time (NEXT_PUBLIC_ = inlined en bundle). */
const supportEmail =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || '[PENDIENTE: correo electrónico]';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description:
    'Términos y condiciones de uso de la plataforma y productos digitales de ArrendadorCO.',
};

export default function TerminosYCondiciones() {
  return (
    <div className="prose mx-auto px-4 py-12">
      <h1>Términos y Condiciones de Uso</h1>
      <p className="text-sm text-gray-500">Última actualización: Octubre de 2026</p>

      <h2>1. Información General y Titularidad</h2>
      <p>
        El presente sitio web, accesible a través de <strong>arrendador.co</strong>, es operado y
        administrado por <strong>[PENDIENTE: razón social]</strong>, titular identificado con el
        Registro Único Tributario (RUT) / NIT <strong>[PENDIENTE: RUT]</strong>, con correo
        electrónico de contacto y atención:{' '}
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
      </p>

      <h2>2. Aceptación de los Términos</h2>
      <p>
        El acceso, navegación y uso de este sitio web, así como la adquisición de los productos o
        recursos digitales ofrecidos en él, atribuye la condición de usuario e implica la aceptación
        plena y sin reservas de la totalidad de las condiciones establecidas en los presentes Términos y
        Condiciones. Si usted no está de acuerdo con cualquiera de estas cláusulas, deberá abstenerse
        de utilizar el sitio web y sus servicios asociados.
      </p>

      <h2>3. Objeto del Sitio Web</h2>
      <p>
        ArrendadorCO es una plataforma digital enfocada en la divulgación de contenido informativo,
        guías prácticas, modelos de referencia y herramientas de orientación para propietarios y
        arrendadores de vivienda urbana en Colombia. Asimismo, ofrece a la venta recursos y plantillas
        digitales editables orientados a facilitar la gestión de contratos de arrendamiento.
      </p>

      <h2>4. Carácter Informativo y No Asesoría Legal</h2>
      <p>
        Todo el contenido publicado en ArrendadorCO, incluyendo artículos, modelos de contratos,
        actas de entrega, guías operativas y calculadoras, tiene una finalidad exclusivamente
        pedagógica, didáctica e informativa.
      </p>
      <p>
        <strong>ArrendadorCO no es una firma o despacho de abogados ni presta servicios de consultoría legal personalizada.</strong>{' '}
        La utilización del material o de las plantillas no sustituye la asesoría jurídica calificada.
        Dado que cada caso o inmueble puede contar con particularidades legales y contractuales
        únicas, recomendamos expresamente consultar con un abogado matriculado antes de celebrar
        contratos o iniciar trámites de restitución.
      </p>

      <h2>5. Licencia de Uso de Productos Digitales</h2>
      <p>
        Al adquirir cualquiera de nuestras plantillas descargables (formatos .docx, Google Docs u
        otros documentos auxiliares), <strong>[PENDIENTE: razón social]</strong> concede al comprador
        una licencia de uso personal, profesional, limitada, revocable y no exclusiva sujeta a las
        siguientes reglas:
      </p>
      <ul>
        <li>
          <strong>Uso autorizado:</strong> El usuario tiene derecho a descargar, modificar, adaptar y
          completar las plantillas tantas veces como requiera para la administración de sus propios
          inmuebles o los inmuebles que gestione directamente.
        </li>
        <li>
          <strong>Prohibición de reventa y distribución:</strong> Queda terminantemente prohibido
          revender, sublicenciar, compartir públicamente, comercializar o distribuir de forma masiva
          las plantillas a terceros, ya sea de manera gratuita o remunerada.
        </li>
      </ul>

      <h2>6. Precios, Pagos y Facturación</h2>
      <p>
        Los precios de los productos y servicios digitales están expresados en pesos colombianos
        (COP) e incluyen los impuestos aplicables conforme a la normatividad tributaria colombiana.
        Las transacciones son procesadas a través de pasarelas de pago seguras de terceros. ArrendadorCO
        no almacena ni tiene acceso directo a datos sensibles de medios de pago como números completos
        de tarjetas de crédito o credenciales de cuentas bancarias.
      </p>

      <h2>7. Propiedad Intelectual e Industrial</h2>
      <p>
        Todos los contenidos, marcas comerciales, logotipos, textos, ilustraciones, diseños, código
        fuente y elementos gráficos que componen el sitio web son propiedad exclusiva de{' '}
        <strong>[PENDIENTE: razón social]</strong> o de terceros licenciantes que han autorizado su
        uso, encontrándose amparados por la legislación colombiana en materia de derechos de autor
        y propiedad industrial.
      </p>

      <h2>8. Enlaces de Afiliados y Sitios Web de Terceros</h2>
      <p>
        El sitio web puede incluir hipervínculos a páginas de terceros o recomendaciones de
        servicios complementarios (como seguros de arrendamiento, software contable o plataformas de
        facturación). Algunos de estos enlaces forman parte de programas de afiliados y pueden
        generar una comisión para ArrendadorCO sin ningún costo extra para el usuario. ArrendadorCO no
        ejerce control ni asume responsabilidad sobre las políticas, condiciones comerciales o
        servicios prestados por terceros.
      </p>

      <h2>9. Limitación de Responsabilidad</h2>
      <p>
        En la medida máxima permitida por la ley aplicable, <strong>[PENDIENTE: razón social]</strong>{' '}
        no será responsable por daños directos, indirectos, incidentales, contractuales o
        extracontractuales que se deriven del uso o la imposibilidad de uso del material, ni de los
        resultados obtenidos al emplear las plantillas contractuales en transacciones reales entre
        partes.
      </p>

      <h2>10. Modificaciones a los Términos</h2>
      <p>
        Nos reservamos el derecho de modificar o actualizar estos Términos y Condiciones en cualquier
        momento. Las actualizaciones entrarán en vigor a partir de su publicación en este sitio web.
        Se sugiere al usuario revisar periódicamente esta página.
      </p>

      <h2>11. Legislación Aplicable y Jurisdicción</h2>
      <p>
        Los presentes Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de la
        República de Colombia. Para la resolución de cualquier controversia o litigio, las partes se
        someten a la jurisdicción de las autoridades administrativas y jueces de la República de
        Colombia.
      </p>

      <h2>12. Contacto y Atención de Consultas</h2>
      <p>
        Para cualquier duda, petición o aclaración relativa a estos Términos y Condiciones, por
        favor contáctenos a través de:
      </p>
      <ul>
        <li>
          <strong>Razón social:</strong> [PENDIENTE: razón social]
        </li>
        <li>
          <strong>RUT:</strong> [PENDIENTE: RUT]
        </li>
        <li>
          <strong>Correo electrónico:</strong>{' '}
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
        </li>
      </ul>
    </div>
  );
}
