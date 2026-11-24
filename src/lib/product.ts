/**
 * Configuración centralizada del producto digital.
 *
 * ÚNICA FUENTE DE VERDAD para nombre, precio, versión, soporte, etc.
 * Importar desde aquí en TODOS los componentes/páginas (tienda, CTA, etc.).
 * NO duplicar estos valores en ningún otro archivo.
 */

export const PRODUCT_CONFIG = {
  /** Nombre comercial del producto. */
  name: 'Plantilla de Contrato de Arrendamiento',

  /** Descripción visible y reutilizable para metadatos y datos estructurados. */
  description:
    'Una plantilla editable para organizar y adaptar tu contrato de arrendamiento en Colombia.',

  /** Identificador interno (slug, claves de BD, etc.). */
  id: 'plantilla-contrato-arrendamiento',

  /** Versión actual del documento. */
  version: '1.0.0',

  /** Precio en COP (entero, sin separadores de miles). */
  priceCOP: 45000,

  /** Moneda (ISO 4217). */
  currency: 'COP',

  /** Formatos incluidos. */
  formats: ['.docx', 'Google Docs'] as const,

  /** Qué incluye el producto (lista para mostrar en UI). */
  includes: [
    'Campos dinámicos (fecha, valor, garantía)',
    'Guía paso a paso para personalizar (PDF)',
    'Respuesta por email ante dudas de uso',
  ] as const,

  /** Lo que NO incluye (para expectativas claras). */
  excludes: [
    'Asesoría legal personalizada',
    'Garantía de resultado jurídico',
    'Actualizaciones automáticas',
  ] as const,

  /** Tiempo de respuesta comprometido (no SLA legal). */
  supportResponseTime: 'Respuesta por email en días hábiles',

  /** Disclaimer legal obligatorio. */
  disclaimer:
    'Este documento es un modelo informativo basado en la normativa aplicable. No constituye asesoría legal ni garantiza cumplimiento normativo. Recomendamos consultar con un abogado antes de firmar.',

  /** Enlace a la política de datos (para el checkbox del formulario). */
  privacyPolicyHref: '/politica-de-datos',

  /** Enlace a términos y condiciones. */
  termsHref: '/terminos-y-condiciones',
} as const;

/** Tipo derivado para uso en componentes. */
export type ProductConfig = typeof PRODUCT_CONFIG;

/** Precio formateado para mostrar en UI. */
export function formatPrice(config: ProductConfig = PRODUCT_CONFIG): string {
  return `$${config.priceCOP.toLocaleString('es-CO')} ${config.currency}`;
}
