/**
 * Pieza visual arquitectónica: plano técnico lineal de un inmueble residencial.
 * SVG inline, sin dependencias, geometría ilustrativa (no representa una
 * propiedad real ni datos de medición). Trazos finos que se dibujan una vez
 * al entrar en viewport vía la clase `.draw` + `.reveal.is-visible` (CSS),
 * reutilizando el IntersectionObserver del componente `Reveal`.
 * Sin JavaScript y/o con prefers-reduced-motion: el plano aparece estático.
 */
type FloorPlanProps = { className?: string };

const STROKE = 0.75;

export default function FloorPlan({ className }: FloorPlanProps) {
  // Cada trazo: clase `draw`, pathLength=1 y retardo incremental `--d`.
  const paths = [
    'M8 8 H112 V92 H8 Z', // muro exterior
    'M64 8 V30', // muro interior (con vano de puerta)
    'M64 38 V58',
    'M8 52 H44', // división habitación (con vano)
    'M52 52 H64',
    'M64 58 H84', // división pieza derecha (con vano)
    'M92 58 H112',
    'M24 8 V12', // ventanas
    'M40 8 V12',
    'M72 8 V12',
    'M96 8 V12',
    'M8 24 H12',
    'M8 72 H12',
    'M112 30 H108',
    'M112 76 H108',
    'M24 92 V88',
    'M88 92 V88',
    'M16 60 H28 M16 60 V72', // hint mueble
    'M96 16 H106 V26 H96', // hint mueble
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 120 100"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid meet"
    >
      {paths.map((d, i) => (
        <path
          key={d}
          className="draw"
          d={d}
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          style={{ ['--d' as string]: `${i * 0.09}s` }}
        />
      ))}
      {/* punto de anotación en bronce */}
      <circle
        className="draw draw--accent"
        cx="108"
        cy="90"
        r="1.6"
        fill="var(--color-bright-bronze)"
        stroke="var(--color-bright-bronze)"
        strokeWidth={STROKE}
        pathLength={1}
        style={{ ['--d' as string]: `${paths.length * 0.09}s` }}
      />
    </svg>
  );
}
