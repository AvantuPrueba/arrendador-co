/**
 * Acceso a la tabla `orders` en Cloudflare D1 (binding DB).
 * No usar en el cliente: solo desde route handlers.
 */

export interface OrderRecord {
  id: string;
  email: string;
  product_id: string;
  product_version: string;
  amount: number;
  currency: string;
  status: string;
  mp_payment_id: string | null;
  external_reference: string | null;
  created_at: string;
  paid_at: string | null;
  delivery_status: string;
  delivered_at: string | null;
  delivery_error: string | null;
  download_token_hash: string | null;
  delivery_expires_at: string | null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type DB = any;

export async function findOrderByPaymentId(db: DB, mpPaymentId: string): Promise<OrderRecord | null> {
  const row = await db
    .prepare('SELECT * FROM orders WHERE mp_payment_id = ? LIMIT 1')
    .bind(mpPaymentId)
    .first();
  return (row as OrderRecord) ?? null;
}

export async function findOrderByTokenHash(db: DB, tokenHash: string): Promise<OrderRecord | null> {
  const row = await db
    .prepare('SELECT * FROM orders WHERE download_token_hash = ? LIMIT 1')
    .bind(tokenHash)
    .first();
  return (row as OrderRecord) ?? null;
}

export async function upsertPaidOrder(
  db: DB,
  data: {
    id: string;
    email: string;
    productId: string;
    productVersion: string;
    amount: number;
    currency: string;
    mpPaymentId: string;
    externalReference: string | null;
  },
): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO orders (id, email, product_id, product_version, amount, currency, status, mp_payment_id, external_reference, created_at, paid_at, delivery_status)
       VALUES (?, ?, ?, ?, ?, ?, 'paid', ?, ?, ?, ?, 'processing')
       ON CONFLICT(mp_payment_id) DO UPDATE SET status = 'paid', paid_at = excluded.paid_at`,
    )
    .bind(
      data.id,
      data.email,
      data.productId,
      data.productVersion,
      data.amount,
      data.currency,
      data.mpPaymentId,
      data.externalReference,
      now,
      now,
    )
    .run();
}

export async function markDeliverySent(db: DB, orderId: string, tokenHash: string, expiresAt: string): Promise<void> {
  await db
    .prepare(
      `UPDATE orders SET delivery_status = 'sent', delivered_at = ?, delivery_error = NULL, download_token_hash = ?, delivery_expires_at = ? WHERE id = ?`,
    )
    .bind(new Date().toISOString(), tokenHash, expiresAt, orderId)
    .run();
}

export async function markDeliveryFailed(db: DB, orderId: string, error: string): Promise<void> {
  await db
    .prepare(`UPDATE orders SET delivery_status = 'failed', delivery_error = ? WHERE id = ?`)
    .bind(error.slice(0, 500), orderId)
    .run();
}
