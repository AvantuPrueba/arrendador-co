interface LegalHeaderProps {
  badge?: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
}

export default function LegalHeader({ badge = 'DOCUMENTO LEGAL', title, subtitle, lastUpdated }: LegalHeaderProps) {
  return (
    <header className="mb-16">
      <span className="mb-6 inline-block rounded-full border border-teal-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-teal-600">
        {badge}
      </span>
      <h1 className="mb-4 text-[32px] md:text-[40px] font-bold leading-tight text-slate-900">
        {title}
      </h1>
      <p className="mb-4 max-w-2xl text-base md:text-lg text-slate-600">{subtitle}</p>
      <p className="text-sm text-slate-500">
        Última actualización · {lastUpdated} · Jurisdicción · Colombia
      </p>
    </header>
  );
}
