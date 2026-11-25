/**
 * Preferencias de privacidad de ArrendadorCO.
 *
 * No hay tecnologías de analítica ni publicidad en el sitio: la única
 * tecnología de almacenamiento existente es localStorage del checklist de
 * entrega (funcional). Esta preferencia también usa localStorage.
 *
 * NO se usa una cookie: se verificó que el converter de middleware de
 * @opennextjs/cloudflare 1.20.18 falla con CUALQUIER cabecera Cookie
 * (`import_cookie.default.parse` es undefined) y devuelve HTTP 500. Guardar la
 * elección en una cookie rompería todas las peticiones posteriores.
 *
 * El registro queda en el dispositivo del visitante: incluye identificador
 * aleatorio, fecha, versión del aviso, acción y categorías. No se envía a
 * ningún servidor ni contiene datos personales.
 */

export const CONSENT_STORAGE_KEY = 'arrendadorco-consent';
export const CONSENT_VERSION = '1';
/** 180 días, en milisegundos. */
export const CONSENT_TTL_MS = 180 * 24 * 60 * 60 * 1000;
/** Evento usado por el enlace del footer para reabrir el panel. */
export const CONSENT_OPEN_EVENT = 'arrendadorco:open-consent';
/** Evento interno para notificar a useSyncExternalStore tras escribir. */
export const CONSENT_CHANGE_EVENT = 'arrendadorco:consent-change';

export type ConsentChoice = 'accepted' | 'rejected' | 'custom';

export interface ConsentState {
  /** Identificador aleatorio de la decisión (no es un dato personal). */
  id: string;
  /** Versión del aviso mostrado. */
  version: string;
  /** Fecha y hora ISO 8601 de la decisión. */
  decidedAt: string;
  /** Acción realizada. */
  choice: ConsentChoice;
  /** Siempre activa: no es opcional. */
  essential: true;
  /** No existe analítica integrada; se registra como falsa por transparencia. */
  analytics: false;
  /** No existe publicidad ni seguimiento integrado. */
  advertising: false;
}

/** `undefined` = aún no se ha podido leer (SSR); `null` = sin decisión válida. */
export type ConsentSnapshot = ConsentState | null | undefined;

let cachedRaw: string | null = null;
let cachedState: ConsentState | null = null;

function parse(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    const validChoice: ConsentChoice[] = ['accepted', 'rejected', 'custom'];
    const age = Date.now() - Date.parse(parsed.decidedAt ?? '');
    if (
      typeof parsed.version !== 'string' ||
      typeof parsed.decidedAt !== 'string' ||
      typeof parsed.id !== 'string' ||
      !validChoice.includes(parsed.choice as ConsentChoice) ||
      !Number.isFinite(age) ||
      age < 0 ||
      age > CONSENT_TTL_MS
    ) {
      return null;
    }
    return parsed as ConsentState;
  } catch {
    return null;
  }
}

/** Snapshot estable para useSyncExternalStore memoizado por el valor crudo. */
export function getConsentSnapshot(): ConsentSnapshot {
  if (typeof window === 'undefined') return undefined;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
  if (raw === cachedRaw) return cachedState;
  cachedRaw = raw;
  cachedState = parse(raw);
  return cachedState;
}

/** En el servidor no hay almacenamiento: mantiene el banner oculto hasta la hidratación. */
export function getServerConsentSnapshot(): ConsentSnapshot {
  return undefined;
}

export function subscribeConsent(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

function randomId(): string {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export function writeConsent(choice: ConsentChoice, version = CONSENT_VERSION): ConsentState {
  const state: ConsentState = {
    id: randomId(),
    version,
    decidedAt: new Date().toISOString(),
    choice,
    essential: true,
    analytics: false,
    advertising: false,
  };

  try {
    const serialized = JSON.stringify(state);
    window.localStorage.setItem(CONSENT_STORAGE_KEY, serialized);
    cachedRaw = serialized;
    cachedState = state;
  } catch {
    // Sin almacenamiento disponible: la decisión no persiste, pero el sitio sigue funcionando.
  }

  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  return state;
}
