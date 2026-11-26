/**
 * Pieza visual arquitectónica: edificio residencial isométrico SVG (Opción A).
 * Geometría construida en código, sin dependencias, sin texturas, sin
 * materiales externos, sin personas. NO representa una propiedad real ni
 * datos de medición. Trazos finos + rellenos planos de la paleta existente.
 * Construcción progresiva una vez al viewport vía `.draw` + `.reveal.is-visible`
 * (CSS), reutilizando el IntersectionObserver de `Reveal`. Flotación sutil
 * opcional `.iso-float`, desactivada con prefers-reduced-motion / móvil.
 * Sin JavaScript y/o reduced-motion: edificio estático visible.
 */
type IsoBuildingProps = { className?: string };

const K = 12; // escala iso x/z
const FLOOR = 18; // altura por planta
const FLOORS = 4; // 3-4 plantas
const W = 2; // footprint ancho
const D = 2; // footprint profundo

type Pt = { x: number; y: number };

function iso(x: number, z: number, y: number): Pt {
  return { x: (x - z) * K, y: (x + z) * K * 0.5 - y };
}

function pts(...p: Pt[]): string {
  return p.map((q) => `${q.x.toFixed(2)},${q.y.toFixed(2)}`).join(' ');
}

const SW = 0.8;

export default function IsoBuilding({ className }: IsoBuildingProps) {
  const H = FLOORS * FLOOR;

  // Base
  const a = iso(0, 0, 0);
  const b = iso(W, 0, 0);
  const c = iso(W, D, 0);
  const d = iso(0, D, 0);
  // Top
  const e = iso(0, 0, H);
  const f = iso(W, 0, H);
  const g = iso(W, D, H);
  const h = iso(0, D, H);

  const xs = [a, b, c, d, e, f, g, h].map((p) => p.x);
  const ys = [a, b, c, d, e, f, g, h].map((p) => p.y);
  const PAD = K * (W + D) * 0.5 + 12;
  const minX = Math.min(...xs) - PAD * 0.25;
  const maxX = Math.max(...xs) + PAD * 0.25;
  const minY = Math.min(e.y, f.y, g.y, h.y) - 10;
  const maxY = Math.max(...ys) + 8;
  const vbW = maxX - minX;
  const vbH = maxY - minY;

  // Divisorias de planta (cuadrícula ilustrativa, sin datos)
  const floorLines: string[] = [];
  for (let lvl = 1; lvl < FLOORS; lvl++) {
    const yy = lvl * FLOOR;
    floorLines.push(pts(iso(0, 0, yy), iso(0, D, yy))); // cara izquierda
    floorLines.push(pts(iso(0, D, yy), iso(W, D, yy))); // cara derecha/frontal
  }

  // Ventanas (cuadrícula fina, sin inventar)
  const windows: string[] = [];
  for (let lvl = 0; lvl < FLOORS; lvl++) {
    const y0 = lvl * FLOOR + 5;
    const y1 = lvl * FLOOR + FLOOR - 5;
    windows.push(pts(iso(0.15, 0.45, y0), iso(0.15, 0.45, y1), iso(0.15, 1.55, y1), iso(0.15, 1.55, y0))); // izquierda
    windows.push(pts(iso(0.45, D - 0.15, y0), iso(0.45, D - 0.15, y1), iso(1.55, D - 0.15, y1), iso(1.55, D - 0.15, y0))); // derecha
  }

  // Perímetro de cierre (etapa 04): anillo que se completa
  const pad = 8;
  const perimeter = pts(
    { x: minX + pad, y: minY + pad },
    { x: maxX - pad, y: minY + pad },
    { x: maxX - pad, y: maxY - pad },
    { x: minX + pad, y: maxY - pad },
  );

  const face = { stroke: 'var(--color-green-deep)', strokeWidth: SW } as const;

  return (
    <svg
      className={className}
      viewBox={`${minX.toFixed(2)} ${minY.toFixed(2)} ${vbW.toFixed(2)} ${vbH.toFixed(2)}`}
      aria-hidden="true"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid meet"
    >
      <g className="iso-float">
        {/* suelo / parcela */}
        <polygon
          points={pts(iso(-0.6, -0.6, 0), iso(W + 0.6, -0.6, 0), iso(W + 0.6, D + 0.6, 0), iso(-0.6, D + 0.6, 0))}
          stroke="var(--color-green-deep)"
          strokeWidth={0.5}
          strokeDasharray="2 3"
        />

        {/* cara izquierda */}
        <polygon className="draw" points={pts(a, d, h, e)} fill="var(--color-surface)" {...face} style={{ ['--d' as string]: '0.05s' }} />
        {/* cara derecha */}
        <polygon className="draw" points={pts(c, d, h, g)} fill="var(--color-ivory)" {...face} style={{ ['--d' as string]: '0.12s' }} />
        {/* cara frontal */}
        <polygon className="draw" points={pts(b, c, g, f)} fill="#E4DFD3" {...face} style={{ ['--d' as string]: '0.12s' }} />
        {/* techo */}
        <polygon className="draw" points={pts(e, f, g, h)} fill="var(--color-ivory)" {...face} style={{ ['--d' as string]: '0.22s' }} />

        {/* divisorias de planta */}
        {floorLines.map((p, i) => (
          <polyline key={`f${i}`} className="draw" points={p} stroke="var(--color-green-deep)" strokeWidth={0.5} style={{ ['--d' as string]: `${0.3 + i * 0.04}s` }} />
        ))}

        {/* ventanas */}
        {windows.map((p, i) => (
          <polygon key={`w${i}`} className="draw" points={p} stroke="var(--color-bronze)" strokeWidth={0.5} style={{ ['--d' as string]: `${0.45 + i * 0.04}s` }} />
        ))}
      </g>

      {/* cierre editorial: perímetro que se completa (etapa 04) */}
      <polygon className="draw draw--close" points={perimeter} stroke="var(--color-bronze)" strokeWidth={SW} style={{ ['--d' as string]: '0.6s' }} />
    </svg>
  );
}
