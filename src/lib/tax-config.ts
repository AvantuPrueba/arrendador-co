/**
 * Configuración del año tributario para cálculos y referencias.
 * Actualizar anualmente cuando la DIAN publique las nuevas cifras.
 */

export const TAX_YEAR_CONFIG = {
  /** Año gravable (año al que corresponde la declaración). */
  year: 2026,

  /** Valor de la UVT para el año gravable (pesos colombianos). */
  uvt: 52374,

  /** Umbrales en UVT para el año gravable. */
  thresholds: {
    /** Umbral para declarar renta (UVT). */
    income: 1400,
    /** Umbral de patrimonio bruto para declarar renta (UVT). */
    patrimonio: 4500,
  },

  /** Fuente oficial de los valores. */
  sourceUrl: 'https://www.dian.gov.co/',

  /** Fecha de última revisión de esta configuración (YYYY-MM-DD). */
  reviewedAt: '2026-10-06',
} as const;

/** Tipo derivado para uso en componentes. */
export type TaxYearConfig = typeof TAX_YEAR_CONFIG;

/**
 * Convierte UVT a pesos colombianos usando la UVT del año configurado.
 */
export function uvtToCop(uvt: number): number {
  return Math.round(uvt * TAX_YEAR_CONFIG.uvt);
}

/**
 * Formatea un valor en COP para mostrar en UI.
 */
export function formatCOP(value: number): string {
  return `$${value.toLocaleString('es-CO')} COP`;
}

/**
 * Formatea un valor en UVT para mostrar en UI.
 */
export function formatUVT(uvt: number): string {
  return `${uvt.toLocaleString('es-CO')} UVT`;
}