import { Check, X } from 'lucide-react';

interface LegalPermissionGridProps {
  allowed: string[];
  forbidden: string[];
}

export default function LegalPermissionGrid({ allowed, forbidden }: LegalPermissionGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-green-200 bg-green-50 p-5">
        <h3 className="mb-3 text-sm font-semibold text-green-700">Uso permitido</h3>
        <ul className="space-y-2">
          {allowed.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[15px] text-green-800">
              <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-red-200 bg-red-50 p-5">
        <h3 className="mb-3 text-sm font-semibold text-red-700">No permitido</h3>
        <ul className="space-y-2">
          {forbidden.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[15px] text-red-800">
              <X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
