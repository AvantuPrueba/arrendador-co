const BRANCHES = [
  { title: 'Contenido', text: 'Guías y artículos informativos' },
  { title: 'Productos', text: 'Plantillas y recursos digitales' },
  { title: 'Recomendaciones', text: 'Enlaces de afiliados transparentes' },
];

export default function LegalTrustMap() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {BRANCHES.map((b) => (
        <div key={b.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
          <h3 className="mb-1 font-semibold text-slate-900">{b.title}</h3>
          <p className="text-sm text-slate-600">{b.text}</p>
        </div>
      ))}
    </div>
  );
}
