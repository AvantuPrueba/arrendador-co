import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import ArticleCard from '@/components/ArticleCard';
import { PRODUCT_CONFIG, formatPrice } from '@/lib/product';
import { ArrowRight } from 'lucide-react';
import { baseOpenGraph, baseTwitter } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Blog para Arrendadores en Colombia | ArrendadorCO',
  description: 'Guías y artículos prácticos para pequeños arrendadores en Colombia sobre contratos, entrega de inmuebles, morosidad y gestión del arriendo.',
  alternates: { canonical: '/blog' },
  openGraph: {
    ...baseOpenGraph(),
    title: 'Blog para Arrendadores en Colombia | ArrendadorCO',
    description: 'Guías y artículos prácticos para pequeños arrendadores en Colombia sobre contratos, entrega de inmuebles, morosidad y gestión del arriendo.',
    type: 'website',
    locale: 'es_CO',
    url: 'https://arrendador.co/blog',
    siteName: 'ArrendadorCO',
  },
  twitter: {
    ...baseTwitter(),
    title: 'Blog para Arrendadores en Colombia | ArrendadorCO',
    description: 'Guías y artículos prácticos para pequeños arrendadores en Colombia sobre contratos, entrega de inmuebles, morosidad y gestión del arriendo.',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  // Separate featured post from regular posts
  const featuredPost = posts.find((p) => p.featured === true);
  const regularPosts = posts.filter((p) => p.featured !== true);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {/* Hero */}
      <section className="mb-12 md:mb-16">
        <h1 className="mb-4 text-3xl md:text-4xl font-bold text-navy-900">
          Consejos y guías para pequeños arrendadores
        </h1>
        <p className="max-w-2xl text-lg text-gray-600">
          Información práctica sobre contratos, entrega de inmuebles, morosidad
          y gestión del arriendo en Colombia.
        </p>
      </section>

      {/* Featured article */}
      {featuredPost && (
        <section className="mb-12 md:mb-16">
          <article className="rounded-2xl border border-navy-100 bg-white p-8 md:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 min-w-0">
                {featuredPost.category && (
                  <span className="mb-3 inline-block uppercase text-xs font-medium text-navy-600 bg-navy-50 px-2.5 py-0.5 rounded">
                    {featuredPost.category}
                  </span>
                )}
                <Link href={`/blog/${featuredPost.slug}`}>
                  <h2 className="mb-4 text-2xl md:text-3xl font-bold text-navy-900 hover:text-teal-600 transition-colors">
                    {featuredPost.title}
                  </h2>
                </Link>
                <p className="mb-6 text-base md:text-lg text-gray-600 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="mb-6 flex flex-col gap-1.5 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>{featuredPost.author}</span>
                    <time dateTime={featuredPost.date}>
                      {new Date(featuredPost.date).toLocaleDateString('es-CO')}
                    </time>
                  </div>
                  {featuredPost.updated && featuredPost.updated !== featuredPost.date && (
                    <time dateTime={featuredPost.updated} className="text-gray-400">
                      Actualizado: {new Date(featuredPost.updated).toLocaleDateString('es-CO')}
                    </time>
                  )}
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 text-base font-semibold text-teal-600 hover:text-teal-700"
                >
                  Leer artículo
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Regular articles */}
      {regularPosts.length > 0 && (
        <section className="mb-12 md:mb-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <ArticleCard key={post.slug} {...post} />
            ))}
          </div>
        </section>
      )}

      {/* CTA to tienda */}
      <section>
        <div className="rounded-2xl border border-navy-200 bg-navy-50 p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl md:text-3xl font-bold text-navy-900">
              ¿Necesitas el documento?
            </h2>
            <p className="mb-4 text-lg text-gray-600">
              Plantilla editable de contrato de arrendamiento de vivienda urbana.
            </p>
            <div className="mb-6 flex items-center justify-center gap-4">
              <span className="text-2xl md:text-3xl font-bold text-navy-900">
                {formatPrice(PRODUCT_CONFIG)}
              </span>
              <span className="text-gray-500">Pago único</span>
            </div>
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 rounded-xl bg-navy-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-navy-700 transition-colors shadow-lg"
            >
              Ver plantilla
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <p className="mt-6 text-xs text-gray-500">
              Modelo informativo. No constituye asesoría legal.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
