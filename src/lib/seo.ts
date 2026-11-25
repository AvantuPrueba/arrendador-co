import { SITE_URL } from '@/lib/site-url';

export { absoluteUrl, SITE_URL } from '@/lib/site-url';

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const ORGANIZATION_NAME = 'ArrendadorCO';
export const ORGANIZATION_EMAIL = 'hola@arrendador.co';
export const ORGANIZATION_DESCRIPTION =
  'Guías, herramientas y plantillas digitales para propietarios de vivienda urbana en Colombia.';

export const organizationReference = {
  '@id': ORGANIZATION_ID,
} as const;

export const websiteReference = {
  '@id': WEBSITE_ID,
} as const;

export const organizationJsonLd = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: ORGANIZATION_NAME,
  url: `${SITE_URL}/`,
  description: ORGANIZATION_DESCRIPTION,
  email: ORGANIZATION_EMAIL,
  areaServed: {
    '@type': 'Country',
    name: 'Colombia',
  },
} as const;

export const websiteJsonLd = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: ORGANIZATION_NAME,
  url: `${SITE_URL}/`,
  publisher: organizationReference,
  inLanguage: 'es-CO',
} as const;

export const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [organizationJsonLd, websiteJsonLd],
} as const;
