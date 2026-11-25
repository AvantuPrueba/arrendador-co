/**
 * Única fuente de verdad para la URL pública de ArrendadorCO.
 *
 * Valor temporal: el subdominio workers.dev realmente operativo. Cuando se
 * disponga de arrendador.co, basta con cambiar SITE_URL aquí: metadataBase,
 * canonicals, sitemap, robots, og:url, llms.txt y la URL de entrega del
 * webhook se derivan de esta constante.
 *
 * Configuración por entorno:
 * - Desarrollo local: no requiere variables de entorno; usa este valor.
 * - Build de Next.js / OpenNext: la constante se compila en la metadata, el
 *   sitemap y el HTML generado. No hay nada que configurar en `.env*`.
 * - Cloudflare Workers: el valor ya viene compilado en el Worker; una variable
 *   de runtime NO reescribe el HTML prerenderizado. Para migrar hay que cambiar
 *   esta constante, reconstruir y desplegar.
 *
 * Se usa una constante en código (y no `NEXT_PUBLIC_*`) para no exponer variables
 * al cliente y evitar divergencias entre módulos servidor y cliente. No es un
 * secreto: es una URL pública.
 */

export const SITE_URL = 'https://arrendador-co.albertovargasarias5.workers.dev';

/** Construye una URL absoluta a partir de una ruta relativa. */
export function absoluteUrl(pathname: string): string {
  return new URL(pathname, `${SITE_URL}/`).toString();
}
