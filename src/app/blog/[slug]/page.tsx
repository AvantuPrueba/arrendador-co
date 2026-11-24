import type { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import ProductCTA from '@/components/ProductCTA';
import NewsletterCTA from '@/components/NewsletterCTA';
import AffiliateBox from '@/components/AffiliateBox';
import JsonLd from '@/components/JsonLd';
import { absoluteUrl, ORGANIZATION_ID, WEBSITE_ID } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.title,
      description: post.description || post.excerpt,
      openGraph: {
        title: post.title,
        description: post.description || post.excerpt,
        type: 'article',
        publishedTime: post.date,
      },
      alternates: { canonical: post.canonical || `/blog/${post.slug}` },
    };
  } catch {
    return { title: 'Artículo no encontrado' };
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const articleUrl = absoluteUrl(`/blog/${post.slug}`);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#article`,
    headline: post.title,
    description: post.description || post.excerpt,
    datePublished: post.date,
    ...(post.updated ? { dateModified: post.updated } : {}),
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    isPartOf: { '@id': WEBSITE_ID },
    url: articleUrl,
    inLanguage: 'es-CO',
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <article className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8">
        <h1 className="mb-3">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{post.author}</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('es-CO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </header>

      <div className="prose max-w-none">
        <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <AffiliateBox
        title="🛡️ Seguro de arrendamiento recomendado"
        description="Protege tu inversión con cobertura de canon impago y asistencia legal."
        ctaText="Conocer más"
        ctaHref="[PENDIENTE: URL_SEGUROS]"
      />

      <ProductCTA />
      <NewsletterCTA />
      </article>
    </>
  );
}
