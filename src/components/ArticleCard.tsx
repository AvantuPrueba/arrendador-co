import Link from 'next/link';

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
  author: string;
  category?: string;
  featured?: boolean;
}

export default function ArticleCard({
  slug,
  title,
  excerpt,
  date,
  updated,
  author,
  category,
}: ArticleCardProps) {
  const showUpdated = updated && updated !== date;

  return (
    <article className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      {category && (
        <span className="mb-3 inline-block uppercase text-xs font-medium text-navy-600 bg-navy-50 px-2.5 py-0.5 rounded">
          {category}
        </span>
      )}
      <Link href={`/blog/${slug}`}>
        <h3 className="mb-2 text-lg font-semibold text-navy-900 hover:text-teal-600 transition-colors">
          {title}
        </h3>
      </Link>
      <p className="mb-4 text-sm text-gray-600 line-clamp-3 flex-1">{excerpt}</p>
      <div className="flex flex-col gap-1.5 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span>{author}</span>
          <time dateTime={date}>{new Date(date).toLocaleDateString('es-CO')}</time>
        </div>
        {showUpdated && (
          <time dateTime={updated} className="text-gray-400">
            Actualizado: {new Date(updated).toLocaleDateString('es-CO')}
          </time>
        )}
      </div>
      <Link
        href={`/blog/${slug}`}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700"
      >
        Leer artículo
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}