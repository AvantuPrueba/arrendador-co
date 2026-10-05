/**
 * Validación y normalización de correos electrónicos.
 *
 * Módulo puro y sin dependencias de Node para poder importarse desde
 * Client Components (el componente de checkout) y desde Route Handlers.
 *
 * No pretende implementar RFC 5322 completo: aplica las reglas que
 * importan en la práctica y rechaza las entradas que definitivamente
 * no son un correo válido.
 */

/** Longitud máxima de una dirección completa (RFC 5321). */
const EMAIL_MAX_LENGTH = 254;

/** Longitud máxima de la parte local, antes de la arroba. */
const LOCAL_PART_MAX_LENGTH = 64;

/** Longitud máxima de cada etiqueta del dominio (`ejemplo`, `com`...). */
const DOMAIN_LABEL_MAX_LENGTH = 63;

/**
 * Parte local: atornos RFC 5322 "atext", separados por puntos.
 * Rechaza puntos iniciales, finales o consecutivos porque el patrón
 * exige al menos un carácter entre cada punto.
 */
const LOCAL_PART_PATTERN =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;

/** Etiqueta de dominio: alfanuméricos y guiones, sin empezar ni terminar en guion. */
const DOMAIN_LABEL_PATTERN = /^[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?$/;

/** El TLD (.com, .co, ...) solo puede ser letras, mínimo dos. */
const TLD_PATTERN = /^[A-Za-z]{2,}$/;

/**
 * Normaliza un correo para poder compararlo y guardarlo.
 *
 * Recorta espacios y pasa el dominio a minúsculas. La parte local se
 * respeta tal cual porque, aunque en la práctica casi todos los
 * servidores de correo la tratan sin distinguir mayúsculas, la
 * especificación la considera sensible.
 *
 * @param input Texto introducido por la persona usuaria.
 * @returns El correo normalizado, o el texto recortado si no es válido.
 */
export function normalizeEmail(input: string): string {
  const trimmed = input.trim();
  const at = trimmed.lastIndexOf('@');

  if (at < 1) return trimmed;

  return `${trimmed.slice(0, at)}@${trimmed.slice(at + 1).toLowerCase()}`;
}

/**
 * Indica si un texto tiene forma de correo electrónico válido.
 *
 * Rechaza: cadenas vacías o demasiado largas, más de una arroba, parte
 * local vacía o con puntos mal formados, dominios sin punto (por ejemplo
 * `usuario@localhost`), etiquetas de dominio demasiado largas, guiones en
 * los extremos de una etiqueta y TLD no alfabéticos.
 *
 * @param input Texto introducido por la persona usuaria.
 * @returns `true` solo si el correo puede aceptarse para entrega.
 */
export function isValidEmail(input: string): boolean {
  const email = normalizeEmail(input);

  if (!email || email.length > EMAIL_MAX_LENGTH) return false;

  // Debe haber exactamente una arroba: si la primera y la última no
  // coinciden, hay más de una.
  const at = email.indexOf('@');
  if (at < 1 || at !== email.lastIndexOf('@')) return false;

  const localPart = email.slice(0, at);
  const domain = email.slice(at + 1);

  if (localPart.length > LOCAL_PART_MAX_LENGTH) return false;
  if (!LOCAL_PART_PATTERN.test(localPart)) return false;

  const labels = domain.split('.');

  // Se exige al menos un TLD: `usuario@localhost` no es entregable.
  if (labels.length < 2) return false;

  const invalidLabel = labels.some(
    (label) =>
      label.length === 0 ||
      label.length > DOMAIN_LABEL_MAX_LENGTH ||
      !DOMAIN_LABEL_PATTERN.test(label),
  );
  if (invalidLabel) return false;

  const tld = labels[labels.length - 1];

  return TLD_PATTERN.test(tld);
}