import { getCloudflareContext } from '@opennextjs/cloudflare';
import { findOrderByTokenHash } from '@/lib/orders';

export const runtime = 'edge';

const PRODUCT_KEY = 'products/plantilla-contrato/v1.0.0/ArrendadorCO-Plantilla-Contrato-v1.0.0.zip';

interface CloudflareEnv {
  DB?: unknown;
  R2_BUCKET?: { get: (key: string) => Promise<{ body: ReadableStream } | null> };
}

export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await params;
    if (!token) {
      return new Response('Token inválido', { status: 400 });
    }

    const { env } = await getCloudflareContext();
    const e = env as unknown as CloudflareEnv;
    if (!e.DB) {
      return new Response('DB no configurada', { status: 500 });
    }

    const enc = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest('SHA-256', enc.encode(token));
    const tokenHash = Array.from(new Uint8Array(hashBuffer))
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('');

    const order = await findOrderByTokenHash(e.DB, tokenHash);
    if (!order) {
      return new Response('No encontrado', { status: 404 });
    }
    if (order.status !== 'paid') {
      return new Response('No autorizado', { status: 403 });
    }
    if (!order.delivery_expires_at || new Date(order.delivery_expires_at) < new Date()) {
      return new Response('Enlace expirado', { status: 410 });
    }
    if (!e.R2_BUCKET) {
      return new Response('R2 no configurado', { status: 500 });
    }

    const object = await e.R2_BUCKET.get(PRODUCT_KEY);
    if (!object) {
      console.error('[download] objeto no encontrado en R2');
      return new Response('Producto no disponible', { status: 404 });
    }

    return new Response(object.body as ReadableStream, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="ArrendadorCO-Plantilla-Contrato-v1.0.0.zip"',
        'Cache-Control': 'private, no-store',
      },
    });
  } catch (error) {
    console.error('[download] excepción', error);
    return new Response('Error interno', { status: 500 });
  }
}
