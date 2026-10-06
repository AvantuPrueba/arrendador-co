import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/** Seguridad: deshabilitar motor JS de gray-matter (CVE-2026-78847).
 *  Evita ejecución de código si un archivo .md contiene frontmatter tipo ---js o ---javascript. */
(matter as unknown as { engines: Record<string, () => object> }).engines.javascript = function() { return {}; };
(matter as unknown as { engines: Record<string, () => object> }).engines.js = function() { return {}; };

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

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
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'));

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

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
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const slugs = getAllPostSlugs();
  if (!slugs.includes(slug)) {
    throw new Error(`Artículo no encontrado: ${slug}`);
  }

  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  if (!data.date) {
    throw new Error(`Artículo "${slug}": falta campo obligatorio "date" en frontmatter`);
  }

  const validatedDate = validateDate(data.date, 'date', slug);
  let validatedUpdated = data.updated;
  if (data.updated) {
    validatedUpdated = validateDate(data.updated, 'updated', slug);
  }

  // Si es borrador, solo permitir acceso si se solicita explícitamente
  // (en producción esto se controlaría con autenticación/preview mode)
  const isDraft = data.draft === true;

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
    draft: isDraft,
    content,
  };
}