'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/guias', label: 'Guías' },
  { href: '/herramientas', label: 'Herramientas' },
  { href: '/tienda', label: 'Plantillas' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4" aria-label="Navegación principal">
        <Link href="/" className="text-xl font-bold text-navy-700" aria-label="ArrendadorCO - Inicio">
          ArrendadorCO
        </Link>

        {/* Desktop nav */}
        <ul className="hidden gap-8 md:flex" role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-navy-700 transition-colors"
                role="menuitem"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/tienda"
            className="rounded-xl bg-navy-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-700 transition-colors"
          >
            Ver plantilla
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu drawer */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-gray-200 bg-white animate-slide-down" role="navigation">
          <ul className="px-4 py-4 space-y-3" role="menubar">
            {navLinks.map((link) => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li role="none">
              <Link
                href="/tienda"
                className="block rounded-xl bg-navy-600 px-6 py-3 text-center font-semibold text-white hover:bg-navy-700"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Ver plantilla
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}