export const runtime = 'edge';

const MP_API = 'https://api.mercadopago.com/v1/payments';
const TIMEOUT_MS = 5000;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const paymentId = searchParams.get('payment_id');

  if (!paymentId) {
    return Response.json({ error: 'payment_id es requerido' }, { status: 400 });
  }

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) {
    console.error('[payments/verify] MERCADO_PAGO_ACCESS_TOKEN no configurado');
    return Response.json({ error: 'No se pudo verificar el pago' }, { status: 500 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${MP_API}/${encodeURIComponent(paymentId)}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error('[payments/verify] error de Mercado Pago', response.status);
      return Response.json({ error: 'No se pudo verificar el pago' }, { status: response.status });
    }

    const data = await response.json();

    return Response.json({
      id: data.id,
      status: data.status,
      status_detail: data.status_detail,
      transaction_amount: data.transaction_amount,
      payment_method_id: data.payment_method_id,
      payment_type_id: data.payment_type_id,
      date_approved: data.date_approved,
      external_reference: data.external_reference,
    });
  } catch (error) {
    console.error('[payments/verify] excepción', error);
    return Response.json({ error: 'No se pudo verificar el pago' }, { status: 500 });
  } finally {
    clearTimeout(timeout);
  }
}
