import { absoluteUrl } from '@/lib/seo';

/**
 * llms.txt generado desde SITE_URL: no hay una segunda lista de URLs absolutas
 * que mantener sincronizada. El contenido editorial se conserva; solo cambian
 * las referencias absolutas, derivadas de la fuente única de verdad.
 */

type Resource = {
  title: string;
  path: string;
  description: string;
};

const sections: ReadonlyArray<{ heading: string; resources: Resource[] }> = [
  {
    heading: 'Producto',
    resources: [
      {
        title: 'Plantilla de Contrato de Arrendamiento',
        path: '/tienda',
        description:
          'Plantilla editable de contrato de arrendamiento de vivienda urbana basada en la Ley 820 de 2003. Precio: $45.000 COP. Formato .docx editable y compatible con Google Docs. Incluye guía de personalización en PDF.',
      },
    ],
  },
  {
    heading: 'Guías',
    resources: [
      {
        title: 'Guías de contratos',
        path: '/guias/contratos',
        description:
          'Elementos obligatorios, cláusulas recomendadas y errores comunes en contratos de arrendamiento en Colombia.',
      },
      {
        title: 'Guías de actas',
        path: '/guias/actas',
        description:
          'Acta de entrega y recepción de arrendamiento: checklist, pasos y ejemplos para documentar el estado del inmueble.',
      },
      {
        title: 'Guías de morosos',
        path: '/guias/morosos',
        description:
          'Rutas de conciliación, cartas de cobro preventivo y causales de terminación para manejo de inquilinos morosos.',
      },
      {
        title: 'Guías de fiscalidad',
        path: '/guias/fiscalidad',
        description: 'Información fiscal relacionada con el arrendamiento de vivienda urbana en Colombia.',
      },
      {
        title: 'Índice de guías',
        path: '/guias',
        description: 'Listado general de guías prácticas para arrendadores.',
      },
    ],
  },
  {
    heading: 'Herramientas',
    resources: [
      {
        title: 'Reajuste de canon',
        path: '/herramientas/reajuste-canon',
        description: 'Calcula el nuevo valor legal del arriendo según la inflación acumulada (IPC DANE).',
      },
      {
        title: 'Rentabilidad real',
        path: '/herramientas/rentabilidad',
        description: 'Calcula el retorno neto después de vacancia, predial, administración e impuestos.',
      },
      {
        title: 'Checklist de entrega',
        path: '/herramientas/checklist-entrega',
        description: 'Genera el acta de inventario con estado de paredes, llaves y lectura de medidores.',
      },
    ],
  },
  {
    heading: 'Blog',
    resources: [
      {
        title: 'Acta de entrega de arrendamiento en Colombia',
        path: '/blog/acta-entrega-recepcion-arrendamiento-colombia',
        description:
          'Guía práctica para crear un acta de entrega y recepción de inmueble con checklist, pasos y ejemplos.',
      },
    ],
  },
  {
    heading: 'Información institucional',
    resources: [
      {
        title: 'Sobre nosotros',
        path: '/sobre-nosotros',
        description: 'Información sobre ArrendadorCO y su propósito editorial.',
      },
      {
        title: 'Términos y condiciones',
        path: '/terminos-y-condiciones',
        description: 'Reglas generales de uso de la plataforma y productos digitales.',
      },
      {
        title: 'Política de datos',
        path: '/politica-de-datos',
        description: 'Política de tratamiento de datos personales.',
      },
      {
        title: 'Aviso legal',
        path: '/aviso-legal',
        description: 'Información legal del sitio web.',
      },
      {
        title: 'Derecho de retracto',
        path: '/retracto-y-devoluciones',
        description: 'Procedimiento de retracto y devoluciones.',
      },
      {
        title: 'Contacto',
        path: '/contacto',
        description: 'Formulario de contacto y preguntas frecuentes.',
      },
    ],
  },
];

function formatResource(resource: Resource): string {
  return `- [${resource.title}](${absoluteUrl(resource.path)}): ${resource.description}`;
}

export function GET(): Response {
  const lines = [
    '# ArrendadorCO',
    '',
    '> Recursos digitales prácticos para propietarios de vivienda urbana en Colombia. La información se basa en la Ley 820 de 2003 y la normativa de vivienda vigente. Este sitio contiene contenido informativo y educativo; no constituye asesoría legal ni representación jurídica.',
    '',
  ];

  for (const section of sections) {
    lines.push(`## ${section.heading}`, '');
    for (const resource of section.resources) {
      lines.push(formatResource(resource));
    }
    lines.push('');
  }

  return new Response(`${lines.join('\n').trimEnd()}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
