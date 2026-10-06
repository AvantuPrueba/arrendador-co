/**
 * Parámetros de referencia para calcular la rentabilidad de un inmueble.
 * Los valores por defecto son estimaciones de mercado 2026; el usuario
 * debe poder ajustarlos con sus cifras reales.
 */

export const RENTABILIDAD_DEFAULTS = {
  /** Comisión de la inmobiliaria de ADMINISTRACIÓN: % del canon mensual. */
  comisionInmobiliaria: 8,

  /** Predial: % del avalúo catastral (residencial). */
  predial: 0.4,

  /** Mantenimiento estimado: % del valor del inmueble al año. */
  mantenimiento: 0.5,

  /** Seguro estimado: % del valor del inmueble al año. */
  seguro: 0.2,

  /** Meses de vacancia estimados al año. */
  mesesVacancia: 1,

  /** Tasa CDT de referencia (% E.A.). */
  tasaCDT: 11,

  /** Valorización anual de vivienda nueva (solo contexto). */
  valorizacionReferencia: 5,
} as const;

export interface CostosAnuales {
  /** Administración mensual (ej. vigilancia, aseo). */
  administracionMensual: number;
  /** Comisión de la inmobiliaria: % del canon mensual. */
  comisionInmobiliaria: number;
  /** Predial pagado en el año (valor COP). */
  predialAnual: number;
  /** Seguro anual (valor COP). */
  seguroAnual: number;
  /** Mantenimiento: % del valor del inmueble. */
  mantenimientoAnual: number;
}

export type DiagnosticoRentabilidad =
  | 'supera_cdt'
  | 'similar_cdt'
  | 'por_debajo_cdt';

export interface ResultadoRentabilidad {
  ingresoBruto: number;
  costosTotales: number;
  perdidaVacancia: number;
  ingresoNeto: number;
  rentabilidadBruta: number;
  rentabilidadNeta: number;
  diagnostico: DiagnosticoRentabilidad;
  diferenciaConCDT: number;
}

/**
 * Calcula la rentabilidad de un inmueble arrendado y la compara con la
 * tasa de referencia de un CDT.
 */
export function calcularRentabilidad(
  precio: number,
  canonMensual: number,
  aniosAntiguedad: number,
  costos: CostosAnuales,
  vacanciaMeses: number,
): ResultadoRentabilidad {
  void aniosAntiguedad; // Reservado para ajustes futuros por antigüedad.

  const ingresoBruto = canonMensual * 12;

  const costosTotales =
    costos.administracionMensual * 12 +
    (canonMensual * (costos.comisionInmobiliaria / 100)) * 12 +
    costos.predialAnual +
    costos.seguroAnual +
    precio * (costos.mantenimientoAnual / 100);

  const perdidaVacancia = canonMensual * vacanciaMeses;
  const ingresoNeto = ingresoBruto - costosTotales - perdidaVacancia;

  const rentabilidadBruta = (ingresoBruto / precio) * 100;
  const rentabilidadNeta = (ingresoNeto / precio) * 100;

  const diferenciaConCDT = rentabilidadNeta - RENTABILIDAD_DEFAULTS.tasaCDT;

  let diagnostico: DiagnosticoRentabilidad;
  if (diferenciaConCDT > 1) {
    diagnostico = 'supera_cdt';
  } else if (diferenciaConCDT >= -1) {
    diagnostico = 'similar_cdt';
  } else {
    diagnostico = 'por_debajo_cdt';
  }

  return {
    ingresoBruto,
    costosTotales,
    perdidaVacancia,
    ingresoNeto,
    rentabilidadBruta,
    rentabilidadNeta,
    diagnostico,
    diferenciaConCDT,
  };
}
