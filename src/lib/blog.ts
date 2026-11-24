import matter from 'gray-matter';
import { BLOG_POSTS } from './blog-data.generated.js';

/** Seguridad: deshabilitar motor JS de gray-matter (CVE-2026-78847).
 *  Evita ejecución de código si un archivo .md contiene frontmatter tipo ---js o ---javascript. */
(matter as unknown as { engines: Record<string, { parse: () => never; stringify: () => never }> }).engines.javascript = {
  parse: function() { throw new Error('JavaScript frontmatter is not supported (CVE-2026-78847)'); },
  stringify: function() { throw new Error('JavaScript frontmatter is not supported'); },
};
(matter as unknown as { engines: Record<string, { parse: () => never; stringify: () => never }> }).engines.js = {
  parse: function() { throw new Error('JavaScript frontmatter is not supported (CVE-2026-78847)'); },
  stringify: function() { throw new Error('JavaScript frontmatter is not supported'); },
};

/** Formato permitido para slugs: solo minúsculas, dígitos y guiones, sin path traversal ni caracteres peligrosos. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(slug: string): boolean {
  return typeof slug === 'string' && SLUG_PATTERN.test(slug);
}

/**
 * Construye de forma segura la ruta relativa de un artículo del blog.
 * Acepta únicamente slugs que pasen la validación estricta.
 * Rechaza cualquier entrada inválida devolviendo null.
 * Codifica el segmento de ruta para mayor seguridad.
 */
export function blogPostHref(slug: string): string | null {
  if (!isValidSlug(slug)) return null;
  return `/blog/${encodeURIComponent(slug)}`;
}

function assertValidSlug(slug: string): void {
  if (!isValidSlug(slug)) {
    throw new Error(`Slug inválido o no permitido: "${slug}"`);
  }
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  author: string;
  excerpt: string;
  description: string;
  category?: string;
  tags?: string[];
  sources?: string[];
  featured?: boolean;
  canonical?: string;
  legalReviewDate?: string;
  /** Si el artículo es borrador (no publicable). */
  draft?: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

/**
 * Valida que una fecha sea ISO 8601 válida (YYYY-MM-DD).
 * Lanza si no lo es.
 */
function validateDate(date: string, field: string, slug: string): string {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoDateRegex.test(date)) {
    throw new Error(`Artículo "${slug}": ${field} debe ser YYYY-MM-DD, recibido "${date}"`);
  }
  // Validación adicional: que sea una fecha real (no 2024-02-30)
  const parsed = new Date(date + 'T00:00:00');
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
    throw new Error(`Artículo "${slug}": ${field} no es una fecha válida: "${date}"`);
  }
  return date;
}

export function getAllPosts(): PostMeta[] {
  const posts = BLOG_POSTS.map((data) => {
    const slug = data.slug;
    assertValidSlug(slug);

    // date es OBLIGATORIO: si falta, el build debe fallar
    if (!data.date) {
      throw new Error(`Artículo "${slug}": falta campo obligatorio "date" en frontmatter`);
    }

    const validatedDate = validateDate(data.date, 'date', slug);
    let validatedUpdated = data.updated;
    if (data.updated) {
      validatedUpdated = validateDate(data.updated, 'updated', slug);
    }

    return {
      slug,
      title: data.title || 'Sin título',
      date: validatedDate,
      updated: validatedUpdated,
      author: data.author || 'ArrendadorCO',
      excerpt: data.excerpt || '',
      description: data.description || '',
      category: data.category,
      tags: data.tags,
      sources: data.sources,
      featured: data.featured,
      canonical: data.canonical,
      legalReviewDate: data.legalReviewDate,
      draft: data.draft === true,
    };
  });

  // Filtrar borradores (draft: true) para que no aparezcan en listas públicas
  const published = posts.filter((p) => !p.draft);

  return published.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  assertValidSlug(slug);
  const post = BLOG_POSTS.find((candidate) => candidate.slug === slug);
  if (!post || post.draft === true) {
    throw new Error(`Artículo no encontrado: ${slug}`);
  }

  if (!post.date) {
    throw new Error(`Artículo "${slug}": falta campo obligatorio "date" en frontmatter`);
  }

  const validatedDate = validateDate(post.date, 'date', slug);
  let validatedUpdated = post.updated;
  if (post.updated) {
    validatedUpdated = validateDate(post.updated, 'updated', slug);
  }

  return {
    slug,
    title: post.title || 'Sin título',
    date: validatedDate,
    updated: validatedUpdated,
    author: post.author || 'ArrendadorCO',
    excerpt: post.excerpt || '',
    description: post.description || '',
    category: post.category,
    tags: post.tags,
    sources: post.sources,
    featured: post.featured,
    canonical: post.canonical,
    legalReviewDate: post.legalReviewDate,
    draft: false,
    content: post.content,
  };
}
