export const runtime = 'edge';

const MP_API = 'https://api.mercadopago.com/v1/payments';

export async function POST(request: Request) {
  try {
    const xSignature = request.headers.get('x-signature');
    const xRequestId = request.headers.get('x-request-id');

    if (!xSignature || !xRequestId) {
      return Response.json({ error: 'Firma ausente' }, { status: 401 });
    }

    // Formato: "ts=...,v1=..."
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

    // Validar firma HMAC-SHA256 con el manifest de Mercado Pago
    const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    const resendKey = process.env.RESEND_API_KEY;
    if (!secret || !accessToken || !resendKey) {
      console.error('[mp-webhook] secretos no configurados');
      return Response.json({ error: 'Configuración incompleta' }, { status: 500 });
    }

    const dataId = body?.data?.id ? String(body.data.id) : '';
    const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

    // HMAC-SHA256 con WebCrypto (edge-compatible; equivalente a crypto.createHmac)
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );
    const signature = await crypto.subtle.sign('HMAC', key, enc.encode(manifest));
    const expected = Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    // Comparación en tiempo constante (equivalente a crypto.timingSafeEqual)
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

    // Solo notificaciones de pago
    if (body.type !== 'payment') {
      return Response.json({ received: true }, { status: 200 });
    }

    const paymentId = dataId;
    if (!paymentId) {
      return Response.json({ received: true }, { status: 200 });
    }

    // Consultar el pago real
    const response = await fetch(`${MP_API}/${paymentId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
      console.error('[mp-webhook] error al consultar pago', response.status);
      return Response.json({ error: 'No se pudo consultar el pago' }, { status: 502 });
    }

    const payment = await response.json();

    // Solo pagos aprobados
    if (payment.status !== 'approved') {
      return Response.json({ received: true }, { status: 200 });
    }

    const buyerEmail = payment?.payer?.email;
    if (!buyerEmail) {
      console.error('[mp-webhook] pago sin email de comprador', paymentId);
      return Response.json({ received: true }, { status: 200 });
    }

    // TODO: idempotencia con Cloudflare KV para evitar correos duplicados (MVP: se acepta el riesgo).

    // Enviar correo con Resend
    const emailResult = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ArrendadorCO <onboarding@resend.dev>',
        to: buyerEmail,
        subject: 'Tu plantilla de contrato está lista',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
            <h1 style="color:#0f172a">Hola,</h1>
            <p>Tu compra fue confirmada. Aquí tienes tu plantilla de contrato de arrendamiento:</p>
            <p style="margin:32px 0;text-align:center">
              <a href="https://arrendador-co.albertovargasarias5.workers.dev/descargas/plantilla-contrato-v1.pdf"
                 style="background:#0d9488;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:12px;display:inline-block;font-weight:bold">
                Descargar plantilla
              </a>
            </p>
            <p>Si tienes problemas, responde a este correo.</p>
            <p>Equipo de ArrendadorCO</p>
          </div>
        `,
      }),
    });

    if (!emailResult.ok) {
      console.error('[mp-webhook] error de Resend', emailResult.status);
      return Response.json({ error: 'No se pudo enviar el correo' }, { status: 502 });
    }

    return Response.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('[mp-webhook] excepción', error);
    return Response.json({ error: 'Error interno' }, { status: 500 });
  }
}
