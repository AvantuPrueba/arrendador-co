import Link from 'next/link';

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
}

export default function ArticleCard({ slug, title, excerpt, date, author }: ArticleCardProps) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/blog/${slug}`}>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 hover:text-blue-700">
          {title}
        </h3>
      </Link>
      <p className="mb-4 text-sm text-gray-600 line-clamp-3">{excerpt}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{author}</span>
        <time dateTime={date}>{new Date(date).toLocaleDateString('es-CO')}</time>
      </div>
    </article>
  );
}
