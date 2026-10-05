import type { Metadata } from 'next';

/** Correo de soporte leído en build time (NEXT_PUBLIC_ = inlined en bundle). */
const supportEmail =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || '[PENDIENTE: correo electrónico]';

export const metadata: Metadata = {
  title: 'Política de Retracto y Devoluciones',
  description:
    'Condiciones sobre derecho de retracto, garantías y soporte técnico en la compra de productos digitales en ArrendadorCO.',
};

export default function RetractoYDevoluciones() {
  return (
    <div className="prose mx-auto px-4 py-12">
      <h1>Política de Retracto, Devoluciones y Garantías</h1>
      <p className="text-sm text-gray-500">Última actualización: Octubre de 2026</p>

      <h2>1. Identificación del Proveedor</h2>
      <p>
        Los productos y servicios digitales ofrecidos en <strong>arrendador.co</strong> son
        suministrados por:
      </p>
      <ul>
        <li>
          <strong>Razón Social:</strong> [PENDIENTE: razón social]
        </li>
        <li>
          <strong>RUT / NIT:</strong> [PENDIENTE: RUT]
        </li>
        <li>
          <strong>Correo de atención y soporte:</strong>{' '}
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
        </li>
      </ul>

      <h2>2. Marco Legal</h2>
      <p>
        La presente política se formula de conformidad con la Ley 1480 de 2011 (Estatuto del
        Consumidor de la República de Colombia) y sus decretos reglamentarios relativos al comercio
        electrónico y ventas que utilizan métodos a distancia.
      </p>

      <h2>3. Naturaleza de los Productos Digitales</h2>
      <p>
        En ArrendadorCO comercializamos bienes de contenido digital intangible (plantillas editables
        en formatos .docx y Google Docs, guías explicativas en PDF y checklists operativos). Al ser
        adquiridos, estos productos son puestos a disposición inmediata para descarga o acceso directo
        en línea una vez se confirma la transacción mediante la pasarela de pagos.
      </p>

      <h2>4. Aplicación del Derecho de Retracto y Excepciones</h2>
      <p>
        El artículo 47 de la Ley 1480 de 2011 consagra el derecho de retracto en las ventas a distancia.
        No obstante, el numeral 4 de dicho artículo establece excepciones expresas para:
      </p>
      <blockquote>
        &ldquo;En los contratos de suministro de bienes que, por su naturaleza, no puedan ser
        devueltos o puedan deteriorarse con rapidez;&rdquo; y contratos de suministro de grabaciones,
        programas informáticos o contenidos digitales cuyo suministro o descarga ya haya iniciado.
      </blockquote>
      <p>
        Por consiguiente, <strong>una vez que el usuario ha completado el pago y ha obtenido acceso al enlace de descarga o al contenido digital editable, no operará el derecho de retracto</strong>,
        toda vez que el producto queda en posesión permanente del comprador sin posibilidad material de
        devolución física del bien intangible.
      </p>

      <h2>5. Garantía de Entrega y Soporte de Calidad</h2>
      <p>
        Sin perjuicio de la excepción legal anterior, <strong>[PENDIENTE: razón social]</strong> está
        comprometido con la completa satisfacción y la calidad técnica de sus productos digitales.
      </p>
      <p>
        Si tras realizar la compra usted experimenta alguna de las siguientes eventualidades:
      </p>
      <ul>
        <li>El enlace de descarga recibido está inactivo, caducado o presenta fallas técnicas.</li>
        <li>El archivo descargado se encuentra dañado, corrupto o es ilegible.</li>
        <li>
          Existe una discrepancia evidente entre el producto ofertado en la página de compra y el
          archivo finalmente recibido.
        </li>
      </ul>
      <p>
        El usuario podrá comunicarse con nuestro equipo de soporte al correo:{' '}
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a> dentro
        de los cinco (5) días hábiles siguientes a la fecha de compra, indicando el número de orden o
        correo utilizado en la transacción y la descripción del inconveniente.
      </p>
      <p>
        Nos comprometemos a validar y resolver la incidencia, reenviando un enlace funcional o un
        archivo corregido en un lapso no mayor a dos (2) días hábiles.
      </p>

      <h2>6. Reembolsos Excepcionales</h2>
      <p>
        Se procederá al reembolso económico del dinero únicamente en los siguientes casos
        excepcionales:
      </p>
      <ol>
        <li>
          Cuando se haya generado un cobro duplicado o erróneo atribuible a la pasarela de pagos.
        </li>
        <li>
          Cuando se compruebe una falla técnica atribuible a nuestra plataforma que impida la entrega
          definitiva del producto digital y no haya sido posible subsanarla dentro del término de
          garantía establecido.
        </li>
      </ol>
      <p>
        En tales circunstancias, <strong>[PENDIENTE: razón social]</strong> solicitará la reversión o
        reembolso ante el operador de pagos correspondiente en los términos y plazos fijados por la
        entidad bancaria emisora.
      </p>

      <h2>7. Dudas y Aclaraciones</h2>
      <p>
        Si tiene dudas sobre las características o especificaciones de un producto antes de adquirirlo,
        le invitamos a escribirnos a:{' '}
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
      </p>
    </div>
  );
}
