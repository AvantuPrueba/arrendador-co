import { LEGAL_CONFIG } from '@/lib/legal-config';

export default function LegalIdentityCard() {
  const rows = [
    ['Marca comercial', LEGAL_CONFIG.brandName],
    ['Titular', LEGAL_CONFIG.legalName],
    ['Identificación', LEGAL_CONFIG.taxId],
    ['Domicilio', LEGAL_CONFIG.city],
    ['Dirección de notificación', LEGAL_CONFIG.address],
    ['Correo', LEGAL_CONFIG.officialEmail],
    ['Teléfono', LEGAL_CONFIG.phone],
    ['País', LEGAL_CONFIG.jurisdiction],
  ];
  return (
    <div className="rounded-xl border-l-4 border-teal-500 bg-slate-900 p-6 text-slate-200">
      <dl className="space-y-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="w-56 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-400">{k}</dt>
            <dd className="text-sm text-slate-100">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
