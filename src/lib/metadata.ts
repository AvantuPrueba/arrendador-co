/**
 * Configuración compartida de metadatos sociales (Open Graph + Twitter Cards)
 *
 * La URL pública se obtiene de la única fuente de verdad en `site-url.ts`.
 * No modifica metadataBase (definido en src/app/layout.tsx a partir de SITE_URL).
 */

import { SITE_URL } from '@/lib/site-url';

export { SITE_URL } from '@/lib/site-url';

export const SITE_NAME = 'ArrendadorCO';
export const OG_LOCALE = 'es_CO';
export const OG_TYPE_WEBSITE = 'website';
export const OG_TYPE_ARTICLE = 'article';
export const TWITTER_CARD = 'summary_large_image';

export const OG_IMAGE_DEFAULT = `${SITE_URL}/opengraph-image`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT = 'ArrendadorCO — Guías, herramientas y contratos para arrendadores en Colombia';

/** Construye el objeto openGraph base con los campos comunes. */
export function baseOpenGraph(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    type: OG_TYPE_WEBSITE,
    locale: OG_LOCALE,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_DEFAULT,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: OG_IMAGE_ALT,
      },
    ],
    ...overrides,
  };
}

/** Construye el objeto twitter base con los campos comunes. */
export function baseTwitter(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    card: TWITTER_CARD,
    images: [OG_IMAGE_DEFAULT],
    ...overrides,
  };
}
