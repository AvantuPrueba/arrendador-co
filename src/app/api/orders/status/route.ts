import { getCloudflareContext } from '@opennextjs/cloudflare';
import { findOrderByPaymentId } from '@/lib/orders';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('payment_id');
    if (!paymentId) {
      return Response.json({ error: 'payment_id es requerido' }, { status: 400 });
    }

    const { env } = await getCloudflareContext();
    const db = (env as unknown as { DB?: unknown }).DB;
    if (!db) {
      return Response.json({ error: 'DB no configurada' }, { status: 500 });
    }

    const order = await findOrderByPaymentId(db, paymentId);
    if (!order) {
      return Response.json({ status: 'not_found' }, { status: 200 });
    }

    return Response.json({
      status: order.status,
      delivery_status: order.delivery_status,
      delivered_at: order.delivered_at,
      hasDownload: order.delivery_status === 'sent',
    });
  } catch (error) {
    console.error('[orders/status] excepción', error);
    return Response.json({ error: 'Error interno' }, { status: 500 });
  }
}
