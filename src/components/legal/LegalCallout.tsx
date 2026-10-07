import type { ReactNode } from 'react';
import { Info, AlertTriangle } from 'lucide-react';

interface LegalCalloutProps {
  title: string;
  children: ReactNode;
  variant?: 'info' | 'warning';
}

export default function LegalCallout({ title, children, variant = 'info' }: LegalCalloutProps) {
  const styles =
    variant === 'warning'
      ? 'border-amber-400 bg-amber-50 text-amber-900'
      : 'border-blue-300 bg-blue-50 text-blue-900';
  const Icon = variant === 'warning' ? AlertTriangle : Info;
  return (
    <div className={`rounded-lg border-l-4 p-5 ${styles}`}>
      <div className="mb-1 flex items-center gap-2">
        <Icon className="h-5 w-5" aria-hidden="true" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="text-[15px]">{children}</div>
    </div>
  );
}
