import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import ArticleCard from '@/components/ArticleCard';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artículos prácticos para arrendadores en Colombia: contratos, actas, morosos, seguros y más.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-4 text-center">Blog</h1>
      <p className="mb-10 text-center text-gray-600">
        Artículos prácticos para gestionar tus inmuebles con confianza.
      </p>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">Pronto publicaremos contenido. ¡Vuelve pronto!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} {...post} />
          ))}
        </div>
      )}
    </div>
  );
}
