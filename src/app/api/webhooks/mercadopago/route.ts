import { getCloudflareContext } from '@opennextjs/cloudflare';
import { PRODUCT_CONFIG } from '@/lib/product';
import {
  findOrderByPaymentId,
  upsertPaidOrder,
  markDeliverySent,
  markDeliveryFailed,
} from '@/lib/orders';

export const runtime = 'edge';

const MP_API = 'https://api.mercadopago.com/v1/payments';

interface CloudflareEnv {
  DB?: unknown;
  R2_BUCKET?: unknown;
}

async function getEnv() {
  const { env } = await getCloudflareContext();
  return env as unknown as CloudflareEnv;
}

export async function POST(request: Request) {
  try {
    const xSignature = request.headers.get('x-signature');
    const xRequestId = request.headers.get('x-request-id');

    if (!xSignature || !xRequestId) {
      return Response.json({ error: 'Firma ausente' }, { status: 401 });
    }

    const parts = Object.fromEntries(
      xSignature.split(',').map((p) => {
        const [k, v] = p.split('=');
        return [k.trim(), v.trim()];
      }),
    );
    const ts = parts['ts'];
    const v1 = parts['v1'];
    if (!ts || !v1) {
      return Response.json({ error: 'Firma inválida' }, { status: 401 });
    }

    let body: { type?: string; data?: { id?: string | number } };
    try {
      body = await request.json();
    } catch {
      return Response.json({ received: true }, { status: 200 });
    }

    const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    const resendKey = process.env.RESEND_API_KEY;
    if (!secret || !accessToken || !resendKey) {
      console.error('[mp-webhook] secretos no configurados');
      return Response.json({ error: 'Configuración incompleta' }, { status: 500 });
    }

    const dataId = body?.data?.id ? String(body.data.id) : '';
    const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const signature = await crypto.subtle.sign('HMAC', key, enc.encode(manifest));
    const expected = Array.from(new Uint8Array(signature)).map((b) => b.toString(16).padStart(2, '0')).join('');

    let igual = expected.length === v1.length;
    const a = enc.encode(expected);
    const b = enc.encode(v1);
    if (a.length === b.length) {
      let diff = 0;
      for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
      igual = diff === 0;
    }
    if (!igual) {
      return Response.json({ error: 'Firma inválida' }, { status: 401 });
    }

    if (body.type !== 'payment') {
      return Response.json({ received: true }, { status: 200 });
    }

    const paymentId = dataId;
    if (!paymentId) {
      return Response.json({ received: true }, { status: 200 });
    }

    const response = await fetch(`${MP_API}/${paymentId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
      console.error('[mp-webhook] error al consultar pago', response.status);
      return Response.json({ error: 'No se pudo consultar el pago' }, { status: 502 });
    }

    const payment = await response.json();

    if (payment.status !== 'approved') {
      return Response.json({ received: true }, { status: 200 });
    }

    // Validación estricta del producto
    if (payment.transaction_amount !== PRODUCT_CONFIG.priceCOP || payment.currency_id !== PRODUCT_CONFIG.currency) {
      console.error('[mp-webhook] monto/moneda incorrectos', paymentId, payment.transaction_amount, payment.currency_id);
      return Response.json({ received: true }, { status: 200 });
    }

    const buyerEmail = payment?.payer?.email;
    if (!buyerEmail) {
      console.error('[mp-webhook] pago sin email', paymentId);
      return Response.json({ received: true }, { status: 200 });
    }

    const env = await getEnv();
    const db = env.DB;
    if (!db) {
      console.error('[mp-webhook] binding DB no configurado');
      return Response.json({ error: 'DB no configurada' }, { status: 500 });
    }

    // Idempotencia
    const existing = await findOrderByPaymentId(db, paymentId);
    if (existing && existing.status === 'paid' && existing.delivery_status === 'sent') {
      return Response.json({ received: true, duplicate: true }, { status: 200 });
    }

    const orderId = payment.external_reference ?? `ARC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${crypto.randomUUID().slice(0, 8)}`;
    await upsertPaidOrder(db, {
      id: orderId,
      email: buyerEmail,
      productId: PRODUCT_CONFIG.id,
      productVersion: PRODUCT_CONFIG.version,
      amount: PRODUCT_CONFIG.priceCOP,
      currency: PRODUCT_CONFIG.currency,
      mpPaymentId: paymentId,
      externalReference: payment.external_reference ?? null,
    });

    const target = existing ?? (await findOrderByPaymentId(db, paymentId));
    if (!target) {
      return Response.json({ error: 'No se pudo registrar la orden' }, { status: 500 });
    }

    // Generar token aleatorio y guardar solo su hash
    const tokenBytes = new Uint8Array(24);
    crypto.getRandomValues(tokenBytes);
    const token = Array.from(tokenBytes).map((x) => x.toString(16).padStart(2, '0')).join('');
    const tokenHash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(token))))
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('');

    const expiresAt = new Date(Date.now() + 48 * 3600 * 1000).toISOString();

    const downloadUrl = `https://arrendador-co.albertovargasarias5.workers.dev/api/download/${token}`;

    const emailResult = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `ArrendadorCO <${process.env.EMAIL_OFICIAL_CONFIGURADO ?? 'onboarding@resend.dev'}>`,
        to: buyerEmail,
        subject: 'Tu compra de ArrendadorCO está lista',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
            <p>Hola,</p>
            <p>Tu pago fue confirmado correctamente.</p>
            <p><strong>Producto:</strong> ${PRODUCT_CONFIG.name}<br/><strong>Versión:</strong> ${PRODUCT_CONFIG.version}</p>
            <p>Incluye: Plantilla Word, Guía PDF y Enlace a Google Docs.</p>
            <p style="margin:32px 0;text-align:center">
              <a href="${downloadUrl}" style="background:#0d9488;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:12px;display:inline-block;font-weight:bold">
                Descargar mi producto
              </a>
            </p>
            <p>Este enlace es temporal por seguridad (válido 48 horas).</p>
            <p>Equipo de ArrendadorCO</p>
          </div>
        `,
      }),
    });

    if (!emailResult.ok) {
      console.error('[mp-webhook] error de Resend', emailResult.status);
      await markDeliveryFailed(db, target.id, `resend_${emailResult.status}`);
      return Response.json({ error: 'No se pudo enviar el correo' }, { status: 502 });
    }

    await markDeliverySent(db, target.id, tokenHash, expiresAt);
    console.log('[mp-webhook] orden', target.id, 'paymentId', paymentId, 'deliveryStatus sent');

    return Response.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('[mp-webhook] excepción', error);
    return Response.json({ error: 'Error interno' }, { status: 500 });
  }
}
