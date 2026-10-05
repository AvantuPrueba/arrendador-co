import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/guias', label: 'Guías' },
  { href: '/blog', label: 'Blog' },
  { href: '/herramientas', label: 'Herramientas' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-blue-700">
          ArrendadorCO
        </Link>

        {/* Desktop nav */}
        <ul className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-blue-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger placeholder */}
        <button
          className="md:hidden"
          aria-label="Abrir menú"
        >
          <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
