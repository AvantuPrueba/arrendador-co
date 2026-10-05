import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guías y Recursos',
  description: 'Guías prácticas sobre contratos, actas de entrega, inquilinos morosos y fiscalidad para arrendadores en Colombia.',
};

const guias = [
  {
    slug: 'contratos',
    icon: '📝',
    title: 'Contratos de Arrendamiento',
    desc: 'Elementos obligatorios, cláusulas recomendadas, renovaciones y addendas.',
  },
  {
    slug: 'actas',
    icon: '🏠',
    title: 'Actas de Entrega',
    desc: 'Checklists de inspección, modelos de acta y cómo documentar con fotos.',
  },
  {
    slug: 'morosos',
    icon: '⚖️',
    title: 'Inquilinos Morosos',
    desc: 'Notificaciones, mediación y procedimientos judiciales paso a paso.',
  },
  {
    slug: 'fiscalidad',
    icon: '🧾',
    title: 'Fiscalidad del Arrendador',
    desc: 'Impuestos, deducciones y obligaciones tributarias en Colombia.',
  },
];

export default function Guias() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-4 text-center">Guías y Recursos</h1>
      <p className="mb-10 text-center text-gray-600">
        Información práctica organizada por tema para que encuentres lo que necesitas rápidamente.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {guias.map((guia) => (
          <Link key={guia.slug} href={`/guias/${guia.slug}`}>
            <div className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md">
              <div className="mb-2 text-3xl">{guia.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{guia.title}</h3>
              <p className="text-sm text-gray-600">{guia.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
