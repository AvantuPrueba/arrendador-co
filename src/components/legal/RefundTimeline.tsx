const STEPS = [
  'Recibimos tu solicitud',
  'Te asignamos un radicado',
  'Revisamos el caso',
  'Te informamos la decisión',
  'Procesamos el reembolso',
];

export default function RefundTimeline() {
  return (
    <ol className="space-y-4">
      {STEPS.map((step, i) => (
        <li key={step} className="flex items-start gap-4">
          <span className="font-mono text-sm text-teal-600">{String(i + 1).padStart(2, '0')}</span>
          <span className="text-slate-700">{step}</span>
        </li>
      ))}
    </ol>
  );
}
