'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLUListElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }
  }, [isOpen]);

  // Close mobile menu on resize to desktop breakpoint
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Focus management for the mobile dialog
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      const id = window.requestAnimationFrame(() => {
        const first = menuRef.current?.querySelector<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        first?.focus();
      });

      // Constrain Tab / Shift+Tab inside the dialog while it is open.
      function trapFocus(e: KeyboardEvent) {
        if (e.key !== 'Tab') return;
        const focusable = menuRef.current
          ? Array.from(
              menuRef.current.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
              ),
            )
          : [];
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first || document.activeElement === toggleRef.current) {
            e.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      window.addEventListener('keydown', trapFocus);
      return () => {
        window.cancelAnimationFrame(id);
        window.removeEventListener('keydown', trapFocus);
      };
    }
    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      if (window.innerWidth >= 768) {
        desktopNavRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
      } else {
        toggleRef.current?.focus();
      }
    }
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ivory/95 backdrop-blur border-b border-charcoal/10 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12"
        aria-label="Navegación principal"
      >
        {/* Wordmark logo */}
        <Link
          href="/"
          className="group flex items-baseline tracking-tight focus-visible:ring-2 focus-visible:ring-green-deep rounded-sm"
          aria-label="ArrendadorCO - Inicio"
        >
          <span className="font-display text-2xl font-normal text-green-deep">
            Arrendador
          </span>
          <span className="ml-0.5 font-mono text-xs font-semibold tracking-wider text-bronze uppercase">
            CO
          </span>
        </Link>

        {/* Desktop nav items */}
        <ul ref={desktopNavRef} className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative py-1 text-sm font-medium tracking-wide text-charcoal transition-colors hover:text-green-deep focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-green-deep rounded-sm"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-green-deep transition-all duration-200 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/tienda"
            className="rounded-lg bg-green-deep px-5 py-2.5 text-sm font-medium text-white transition-all duration-150 hover:bg-green-mid hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-green-deep"
          >
            Ver plantilla
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <button
          ref={toggleRef}
          type="button"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 text-charcoal hover:bg-black/5 md:hidden focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-green-deep"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-dialog"
          aria-label={isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        >
          {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      {/* Full-height mobile overlay menu */}
      {isOpen && (
        <div
          ref={menuRef}
          id="mobile-navigation-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación principal móvil"
          className="fixed inset-x-0 top-[72px] bottom-0 z-50 flex flex-col justify-between bg-ivory px-6 py-8 md:hidden animate-slide-down border-t border-charcoal/10 overflow-y-auto"
        >
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-4 py-3.5 text-lg font-medium text-charcoal hover:bg-surface hover:text-green-deep transition-colors focus-visible:ring-2 focus-visible:ring-green-deep"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-charcoal/10 space-y-4">
            <Link
              href="/tienda"
              className="block w-full rounded-lg bg-green-deep px-6 py-3.5 text-center text-base font-medium text-white hover:bg-green-mid transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-green-deep"
              onClick={() => setIsOpen(false)}
            >
              Ver plantilla de contrato
            </Link>
            <p className="text-center font-mono text-xs text-muted">
              Ley 820 de 2003 · Vivienda urbana · Colombia
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
