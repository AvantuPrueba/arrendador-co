const DECISIONS = [
  { href: '#derecho-retracto', title: 'Quiero ejercer el retracto', text: 'Revisa el plazo y condiciones del derecho de retracto.' },
  { href: '#reversion-pago', title: 'Quiero solicitar una reversión', text: 'Casos de fraude, no entrega o producto defectuoso.' },
  { href: '#como-solicitar', title: 'Tengo un problema con mi compra', text: 'Envíanos los detalles para revisar tu caso.' },
];

export default function RefundDecisionCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {DECISIONS.map((d) => (
        <a
          key={d.href}
          href={d.href}
          className="rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-teal-500"
        >
          <h3 className="mb-1 font-semibold text-slate-900">{d.title}</h3>
          <p className="text-sm text-slate-600">{d.text}</p>
        </a>
      ))}
    </div>
  );
}
