import Link from 'next/link';

const LINKS = [
  { href: '/terminos-y-condiciones', label: 'Términos' },
  { href: '/politica-de-datos', label: 'Privacidad' },
  { href: '/retracto-y-devoluciones', label: 'Retracto' },
  { href: '/aviso-legal', label: 'Aviso legal' },
];

export default function LegalNavigation({ current }: { current?: string }) {
  return (
    <nav aria-label="Documentación legal">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Documentación legal
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={
                current === link.href
                  ? 'text-sm font-semibold text-teal-600'
                  : 'text-sm text-slate-600 hover:text-teal-600 transition-colors'
              }
              aria-current={current === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
