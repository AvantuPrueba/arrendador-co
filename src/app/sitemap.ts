import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/site-url';

/**
 * Sitemap de páginas públicas indexables.
 *
 * Todas las URLs se derivan de SITE_URL (única fuente de verdad). No se incluye
 * `lastModified` en páginas estáticas porque no hay una fecha real de
 * modificación: usar la fecha del build sería engañoso. Los artículos del blog
 * sí usan su fecha real del frontmatter.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/guias`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/guias/contratos`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/guias/actas`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/guias/morosos`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/guias/fiscalidad`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE_URL}/herramientas`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/herramientas/reajuste-canon`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/herramientas/rentabilidad`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/herramientas/checklist-entrega`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/tienda`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/contacto`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/sobre-nosotros`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/seguros-arrendamiento`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terminos-y-condiciones`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/politica-de-datos`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/retracto-y-devoluciones`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/aviso-legal`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  try {
    const posts = getAllPosts();
    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : undefined,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...blogRoutes];
  } catch {
    return staticRoutes;
  }
}
