/**
 * src/proxy.ts — Middleware de Next.js 16 para Cabeceras de Seguridad HTTP
 *
 * Next.js 16 renombró middleware.ts a proxy.ts. Este archivo aplica
 * cabeceras de seguridad a todas las respuestas dinámicas generadas por
 * Next.js a través del adaptador OpenNext + Cloudflare Workers.
 *
 * Stack: Next.js 16.3.8 + @opennextjs/cloudflare 1.20.8 + Wrangler 4.x
 *
 * LIMITACIÓN CONFIRMADA DE OPENNEXT:
 *   OpenNext no reescribe el HTML para inyectar nonces.
 *   Por tanto, NO se puede usar CSP basada en nonces de forma fiable.
 *   Se implementa Content-Security-Policy-Report-Only (sin enforcement)
 *   hasta validar que no hay violaciones en entorno real.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Cabeceras de seguridad aplicadas a todas las respuestas dinámicas.
 * No son condicionales: se aplican siempre.
 */
function setSecurityHeaders(response: NextResponse): void {
  // 1. Clickjacking — impedir que el sitio se incruste en iframes
  response.headers.set("X-Frame-Options", "DENY");

  // 2. Evitar MIME-sniffing en navegadores
  response.headers.set("X-Content-Type-Options", "nosniff");

  // 3. Política de referencia — solo enviar origen en peticiones same-origin
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin",
  );

  // 4. Desactivar el filtro XSS antiguo de IE (valor "1" es inseguro)
  response.headers.set("X-XSS-Protection", "0");

  // 5. Permissions-Policy — restringir capacidades del navegador que
  //    la aplicación no utiliza. No incluye interest-cohort (obsoleto).
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()",
  );

  // 6. Content-Security-Policy en modo Report-Only.
  //    Construida a partir del inventario de recursos externos (Fase 3).
  //    NO activar enforcement (Content-Security-Policy) hasta analizar
  //    las violaciones de Report-Only en entorno de prueba real.
  const cspReportOnly = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "font-src 'self'",
    "img-src 'self' data: https://images.unsplash.com",
    "connect-src 'self' https://formsubmit.co",
    "form-action 'self' https://formsubmit.co",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "object-src 'none'",
  ].join("; ");

  response.headers.set(
    "Content-Security-Policy-Report-Only",
    cspReportOnly,
  );
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next();

  setSecurityHeaders(response);

  return response;
}

/**
 * Matcher para excluir activos estáticos servidos por OpenNext.
 * Las cabeceras de seguridad solo se aplican a rutas dinámicas (HTML,
 * API routes, etc.). Los activos estáticos (_next/static, imágenes, etc.)
 * se sirven directamente desde el almacenamiento de assets de Cloudflare.
 */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};