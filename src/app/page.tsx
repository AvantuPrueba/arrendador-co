import Link from 'next/link';
import ProductCTA from '@/components/ProductCTA';
import NewsletterCTA from '@/components/NewsletterCTA';

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Tu guía práctica para{' '}
          <span className="text-blue-700">arrendar con confianza</span> en Colombia
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Contratos, actas de entrega, manejo de morosos y más. Todo lo que un
          pequeño arrendador necesita, explicado de forma simple.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/guias"
            className="rounded-md bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Explorar guías
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-gray-300 px-8 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Leer el blog
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mb-16 grid gap-8 md:grid-cols-3">
        {[
          {
            icon: '📝',
            title: 'Contratos claros',
            desc: 'Aprende qué cláusulas son obligatorias y cuáles te protegen como arrendador.',
          },
          {
            icon: '🏠',
            title: 'Actas de entrega',
            desc: 'Checklists y modelos para documentar el estado del inmueble sin ambigüedades.',
          },
          {
            icon: '⚖️',
            title: 'Inquilinos morosos',
            desc: 'Pasos legales y preventivos para manejar la morosidad en Colombia.',
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-lg border border-gray-200 p-6 text-center shadow-sm"
          >
            <div className="mb-3 text-4xl">{card.icon}</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">{card.title}</h3>
            <p className="text-sm text-gray-600">{card.desc}</p>
          </div>
        ))}
      </section>

      {/* Product CTA */}
      <ProductCTA />

      {/* Newsletter */}
      <NewsletterCTA />
    </div>
  );
}
