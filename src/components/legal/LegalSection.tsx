import type { ReactNode } from 'react';

interface LegalSectionProps {
  number: string;
  title: string;
  id: string;
  children: ReactNode;
}

export default function LegalSection({ number, title, id, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <p className="mb-2 font-mono text-xs text-slate-400">{number}</p>
      <h2 className="mb-2 text-2xl md:text-[26px] font-semibold text-slate-900">{title}</h2>
      <hr className="mb-6 border-slate-200" />
      <div className="space-y-4 text-[16px] md:text-[17px] leading-[1.7] text-slate-600">
        {children}
      </div>
    </section>
  );
}
