/**
 * Configuración del IPC aplicable a reajustes de canon de arrendamiento.
 * Actualizar anualmente cuando el DANE publique la cifra definitiva.
 */

export const IPC_CONFIG = {
  /** Año al que corresponde el índice. */
  year: 2025,

  /** Variación porcentual del IPC (%). */
  ipc: 5.10,

  source: 'DANE',
  sourceUrl:
    'https://www.dane.gov.co/index.php/estadisticas-por-tema/precios-y-costos/indice-de-precios-al-consumidor-ipc',

  /** Fecha de última revisión de esta configuración (YYYY-MM-DD). */
  reviewedAt: '2026-10-06',
} as const;

export type ReajusteResult =
  | {
      procede: false;
      mesesFaltantes: number;
      fechaDisponible: Date;
      advertencia: string;
    }
  | {
      procede: true;
      mesesTranscurridos: number;
      ipcAplicable: number;
      aumento: number;
      nuevoCanon: number;
      advertencia: string;
    };

/** Advertencia fija sobre el aplazamiento vigente (Decreto 1423 de 2026). */
export const ADVERTENCIA_DECRETO_1423 =
  'El Decreto 1423 de 2026 aplaza el reajuste por 6 meses para inmuebles en zonas afectadas por el sismo de agosto de 2026. Verifica si aplica a tu caso.';

function mesesEntre(desde: Date, hasta: Date): number {
  let meses = (hasta.getFullYear() - desde.getFullYear()) * 12;
  meses += hasta.getMonth() - desde.getMonth();
  // Solo contamos meses completos cuando ya pasó el día de corte.
  if (hasta.getDate() < desde.getDate()) {
    meses -= 1;
  }
  return meses;
}

function sumarMeses(fecha: Date, meses: number): Date {
  const d = new Date(fecha.getTime());
  d.setMonth(d.getMonth() + meses);
  return d;
}

/**
 * Calcula si procede el reajuste del canon y, en caso afirmativo,
 * el nuevo valor según el IPC vigente (Ley 820 de 2003, art. 20).
 */
export function calcularReajuste(canonActual: number, fechaInicioCanon: Date): ReajusteResult {
  const hoy = new Date();
  const mesesTranscurridos = mesesEntre(fechaInicioCanon, hoy);

  if (mesesTranscurridos < 12) {
    return {
      procede: false,
      mesesFaltantes: 12 - mesesTranscurridos,
      fechaDisponible: sumarMeses(fechaInicioCanon, 12),
      advertencia: ADVERTENCIA_DECRETO_1423,
    };
  }

  const aumento = Math.round(canonActual * (IPC_CONFIG.ipc / 100));
  return {
    procede: true,
    mesesTranscurridos,
    ipcAplicable: IPC_CONFIG.ipc,
    aumento,
    nuevoCanon: canonActual + aumento,
    advertencia: ADVERTENCIA_DECRETO_1423,
  };
}
