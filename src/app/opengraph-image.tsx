/**
 * src/app/opengraph-image.tsx — Imagen Open Graph dinámica para ArrendadorCO
 *
 * Generada con ImageResponse de Next.js (next/og).
 * Se sirve automáticamente en https://arrendador.co/opengraph-image
 * Dimensiones: 1200 × 630 px (estándar OG)
 *
 * Paleta editorial ArrendadorCO:
   Verde profundo:  #183C32 (fondo)
   Marfil:          #F3F0E8 (texto secundario)
   Bronce:          #B99763 (acento decorativo)
   Carbón:          #292D29 (texto principal)
 */

import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export default async function Image(): Promise<ImageResponse> {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#183C32',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
          boxSizing: 'border-box',
        }}
      >
        {/* Línea decorativa superior en bronce */}
        <div
          style={{
            width: 120,
            height: 4,
            background: '#B99763',
            marginBottom: 40,
          }}
        />

        {/* Nombre de marca */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#FFFFFF',
            lineHeight: 1.2,
            textAlign: 'center',
            letterSpacing: '-0.5px',
            fontFamily: 'DM Serif Display, serif',
          }}
        >
          ArrendadorCO
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: '#F3F0E8',
            lineHeight: 1.4,
            textAlign: 'center',
            maxWidth: 900,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Guías, herramientas y contratos para arrendadores en Colombia
        </div>

        {/* Línea decorativa inferior en bronce */}
        <div
          style={{
            width: 120,
            height: 4,
            background: '#B99763',
            marginTop: 56,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}