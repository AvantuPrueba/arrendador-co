import type { Metadata } from 'next';

/** Correo de soporte leído en build time (NEXT_PUBLIC_ = inlined en bundle). */
const supportEmail =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || '[PENDIENTE: correo electrónico]';

export const metadata: Metadata = {
  title: 'Política de Tratamiento de Datos Personales',
  description:
    'Política de tratamiento y protección de datos personales de ArrendadorCO de conformidad con la Ley 1581 de 2012.',
};

export default function PoliticaDeDatos() {
  return (
    <div className="prose mx-auto px-4 py-12">
      <h1>Política de Tratamiento de Datos Personales</h1>
      <p className="text-sm text-gray-500">Última actualización: Octubre de 2026</p>

      <h2>1. Identificación del Responsable del Tratamiento</h2>
      <p>
        En cumplimiento de la Ley Estatutaria 1581 de 2012 y el Decreto Reglamentario 1377 de 2013
        (compilado en el Decreto 1074 de 2015), los datos personales que se recolecten a través de{' '}
        <strong>arrendador.co</strong> serán tratados por:
      </p>
      <ul>
        <li>
          <strong>Razón Social:</strong> [PENDIENTE: razón social]
        </li>
        <li>
          <strong>RUT / NIT:</strong> [PENDIENTE: RUT]
        </li>
        <li>
          <strong>Correo electrónico para atención de Habeas Data:</strong>{' '}
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
        </li>
        <li>
          <strong>Sitio web:</strong> https://arrendador.co
        </li>
      </ul>

      <h2>2. Marco Legal y Principios Aplicables</h2>
      <p>
        Esta política se fundamenta en los principios consagrados en el artículo 4 de la Ley 1581 de
        2012: legalidad, finalidad, libertad, veracidad o calidad, transparencia, acceso y circulación
        restringida, seguridad y confidencialidad.
      </p>

      <h2>3. Datos Personales Recolectados</h2>
      <p>
        ArrendadorCO podrá solicitar y almacenar los siguientes datos personales de los usuarios:
      </p>
      <ul>
        <li>
          <strong>Datos de contacto e identificación:</strong> Nombres, apellidos, dirección de correo
          electrónico y número de teléfono o celular (suministrados voluntariamente al suscribirse al
          boletín informativo o al diligenciar el formulario de contacto).
        </li>
        <li>
          <strong>Datos de facturación y compra:</strong> Información requerida para formalizar la
          adquisición de productos digitales y la emisión de comprobantes contables pertinentes.
        </li>
        <li>
          <strong>Datos de navegación:</strong> Dirección IP, información del navegador, registros de
          acceso y cookies técnicas y estadísticas para la analítica del sitio web.
        </li>
      </ul>

      <h2>4. Finalidades del Tratamiento de los Datos</h2>
      <p>
        Los datos personales suministrados serán tratados con las siguientes finalidades legítimas:
      </p>
      <ol>
        <li>
          Procesar las compras realizadas, validar el pago y gestionar la entrega de enlaces de
          descarga de las plantillas y productos digitales.
        </li>
        <li>
          Enviar el boletín de noticias (newsletter) periódico con artículos, novedades normativas,
          guías prácticas y ofertas relacionadas con el arrendamiento en Colombia, siempre con el
          consentimiento previo del titular.
        </li>
        <li>
          Dar respuesta y tramitar peticiones, quejas, reclamos o sugerencias formuladas por los
          usuarios.
        </li>
        <li>
          Optimizar la funcionalidad del sitio web, analizar métricas de tráfico y mejorar el
          contenido ofrecido.
        </li>
        <li>
          Dar cumplimiento a obligaciones tributarias, fiscales, comerciales y legales vigentes en
          Colombia.
        </li>
      </ol>

      <h2>5. Derechos de los Titulares (Habeas Data)</h2>
      <p>
        Conforme a lo dispuesto por el artículo 8 de la Ley 1581 de 2012, el titular de los datos
        personales tiene derecho a:
      </p>
      <ul>
        <li>
          Conocer, actualizar y rectificar sus datos personales frente a{' '}
          <strong>[PENDIENTE: razón social]</strong>.
        </li>
        <li>
          Solicitar prueba de la autorización otorgada para el tratamiento de sus datos.
        </li>
        <li>
          Ser informado sobre el uso y tratamiento que se le ha dado a sus datos personales.
        </li>
        <li>
          Presentar ante la Superintendencia de Industria y Comercio (SIC) quejas por infracciones a
          la normatividad de protección de datos personales.
        </li>
        <li>
          Revocar la autorización concedida y/o solicitar la supresión de sus datos cuando en el
          tratamiento no se respeten los principios, derechos y garantías constitucionales y legales.
        </li>
        <li>
          Acceder de forma gratuita a sus datos personales objeto de tratamiento.
        </li>
      </ul>

      <h2>6. Procedimiento para el Ejercicio de Derechos</h2>
      <p>
        El titular o sus causahabientes podrán ejercer sus derechos de consulta, actualización,
        rectificación o supresión enviando una comunicación escrita dirigida a{' '}
        <strong>[PENDIENTE: razón social]</strong> al correo electrónico:{' '}
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
      </p>
      <p>
        La solicitud debe contener: (i) nombre completo e identificación del titular, (ii) descripción
        clara y precisa de la solicitud o hechos que dan lugar al reclamo, (iii) dirección de correo
        para notificaciones, y (iv) documentos de soporte que acrediten su identidad.
      </p>
      <p>
        Los tiempos de atención serán los legalmente previstos: un máximo de diez (10) días hábiles
        para consultas y quince (15) días hábiles para reclamos.
      </p>

      <h2>7. Medidas de Seguridad de la Información</h2>
      <p>
        <strong>[PENDIENTE: razón social]</strong> adopta medidas técnicas, organizativas y humanas
        razonables para proteger los datos personales contra adulteración, pérdida, consulta indebida,
        uso fraudulento o acceso no autorizado.
      </p>

      <h2>8. Política de Cookies y Servicios de Terceros</h2>
      <p>
        El sitio web emplea cookies técnicas y analíticas para optimizar la experiencia de navegación.
        Asimismo, utilizamos proveedores externos (como herramientas de analítica y plataformas de
        envío de correo) que procesan información bajo estrictos estándares de confidencialidad y
        seguridad.
      </p>

      <h2>9. Período de Vigencia de las Bases de Datos</h2>
      <p>
        Las bases de datos tendrán una vigencia equivalente al tiempo necesario para cumplir las
        finalidades para las cuales fueron recolectadas o por el lapso que determinen las exigencias
        legales o reglamentarias aplicables.
      </p>
    </div>
  );
}
