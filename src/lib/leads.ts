/**
 * Almacenamiento de los correos capturados en /tienda antes de pagar.
 *
 * Contexto: el MVP usa un Link de Pago de Mercado Pago, así que no hay
 * tabla de órdenes ni webhook que confirme el pago. La entrega del
 * producto es manual: el dueño del sitio revisa los pagos en el panel de
 * Mercado Pago, cruza el correo contra esta lista y envía la plantilla.
 * Este módulo existe solo para no perder esos correos.
 *
 * IMPORTANTE — `node:fs` solo está disponible en desarrollo local, por eso
 * el import es dinámico dentro de `saveLead`: evita que el bundle del
 * Worker de Cloudflare dependa de `node:fs` en tiempo de importación.
 * Para validar correos en el navegador usa `@/lib/email`.
 */

/** Un correo capturado, listo para persistir. */
export interface LeadRecord {
  /** Correo normalizado. */
  email: string;
  /** De dónde vino el registro (`tienda`, `contacto`...). */
  source: string;
  /** Fecha de captura en ISO 8601. */
  createdAt: string;
}

/** Resultado del intento de guardado. Nunca lanza: degradar a `captured: false`. */
export type SaveLeadResult =
  | { captured: true; destination: string }
  | { captured: false; reason: string };

/**
 * Archivo local usado en desarrollo. Cada línea es un JSON independiente
 * (JSONL) para poder anexar sin leer ni reescribir el archivo entero.
 *
 * Contiene datos personales, por eso `/data` está en `.gitignore`.
 */
const LEADS_FILE = 'data/leads.jsonl';

/**
 * En Vercel el sistema de archivos es efímero y de solo lectura fuera de
 * `/tmp`, así que escribir un archivo no sirve: el contenido se pierde
 * entre invocaciones. Detecting el entorno en lugar de confiar en que
 * falle la escritura.
 */
const IS_SERVERLESS =
  Boolean(process.env.VERCEL) ||
  (typeof navigator !== 'undefined' && navigator.userAgent === 'Cloudflare-Workers');

/**
 * Guarda un correo capturado.
 *
 * Nunca lanza una excepción. La captura de correo es una ayuda para la
 * entrega, no un requisito para cobrar: si falla, el cliente debe poder
 * pagar igual. Por eso el Route Handler responde con `captured: false`
 * en lugar de un 5xx.
 *
 * --- ADAPTADORES PARA PRODUCCIÓN -------------------------------
 * En producción hace falta un destino persistente y consultable. Opciones,
 * de menos a más trabajo. Ninguna está implementada porque todas requieren
 * credenciales que todavía no existen (ver INTEGRACION_PAGOS.md).
 *
 * (a) Google Sheets vía Apps Script — lo más rápido para el MVP manual.
 *     Publicar un Web App de Google Apps Script que acepte un POST con
 *     { email, source, createdAt } y lo añada a una fila. Enviar con fetch.
 *
 * (b) Brevo — ya está en el stack previsto (ver PRD.md, sección 10).
 *     POST https://api.brevo.com/v3/contacts con
 *         { email, attributes: { SOURCE: source }, listIds: [LIST_ID] }
 *     y cabecera `api-key`. Reutiliza el dominio y los registros SPF/DKIM
 *     que habrá que configurar para el newsletter.
 *
 * (c) Vercel Postgres / Neon + tabla `leads`. Es lo único que permite
 *     automatizar la entrega más adelante; también requiere la tabla de
 *     órdenes, que esta arquitectura decidió no crear.
 *
 * Hasta entonces, en local escribimos en `data/leads.jsonl` y en Vercel
 * escribimos en los logs (visibles en el dashboard de Vercel).
 * ------------------------------------------------------------------
 *
 * @param lead Registro a guardar (el correo debe venir ya normalizado).
 * @returns Si se capturó y en qué destino quedó.
 */
export async function saveLead(lead: LeadRecord): Promise<SaveLeadResult> {
  const line = JSON.stringify(lead);

  if (IS_SERVERLESS) {
    // El sistema de archivos no persiste: usamos el log del servidor,
    // que sí se puede consultar y descargar desde Vercel.
    console.info(`[lead] ${line}`);
    return { captured: true, destination: 'log del servidor' };
  }

  try {
    const [{ promises: fs }, path] = await Promise.all([
      import('node:fs'),
      import('node:path'),
    ]);
    const filePath = path.join(process.cwd(), LEADS_FILE);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.appendFile(filePath, `${line}\n`, 'utf8');
    return { captured: true, destination: 'archivo local' };
  } catch (error) {
    // No bloqueamos la venta: devolvemos `captured: false` y el cliente
    // ofrece una alternativa para que la persona nos escriba directamente.
    console.error('[lead] no se pudo guardar el correo', error);
    return { captured: false, reason: 'No se pudo guardar el correo.' };
  }
}