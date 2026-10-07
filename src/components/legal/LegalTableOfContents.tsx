interface LegalTableOfContentsProps {
  items: { id: string; label: string }[];
}

export default function LegalTableOfContents({ items }: LegalTableOfContentsProps) {
  return (
    <nav className="mb-16 rounded-xl border border-slate-200 bg-slate-50 p-6" aria-label="Contenido del documento">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Contenido del documento
      </h2>
      <ol className="grid gap-2 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="text-sm text-teal-600 hover:underline">
              <span className="mr-2 font-mono text-slate-400">{String(i + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
