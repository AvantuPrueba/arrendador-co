import { isValidEmail, normalizeEmail } from '@/lib/email';
import { saveLead } from '@/lib/leads';

/** Límite del campo `source` para no guardar cadenas arbitrarias. */
const MAX_SOURCE_LENGTH = 64;

/**
 * POST /api/leads
 *
 * Recibe el correo que la persona escribe en /tienda antes de pagar y lo
 * registra para poder entregar la plantilla a mano.
 *
 * No autentica a nadie: es un endpoint público por diseño. Solo acepta y
 * normaliza el correo, nunca devuelve datos de otros registros. Rate
 * limiting pendiente (ver INTEGRACION_PAGOS.md).
 *
 * Respuestas:
 * - `400` cuerpo inválido o correo con formato incorrecto
 * - `200` `{ captured, destination | reason }`
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Petición inválida.' }, { status: 400 });
  }

  // `payload` puede ser cualquier JSON. Lo tratamos como objeto y usamos
  // comprobaciones por propiedad en vez de castear a ciegas.
  const { email, source } = (payload ?? {}) as { email?: unknown; source?: unknown };

  if (typeof email !== 'string' || !isValidEmail(email)) {
    return Response.json(
      { error: 'Escribe un correo electrónico válido.' },
      { status: 400 },
    );
  }

  const result = await saveLead({
    email: normalizeEmail(email),
    source: typeof source === 'string' ? source.slice(0, MAX_SOURCE_LENGTH) : 'desconocido',
    createdAt: new Date().toISOString(),
  });

  return Response.json(result);
}