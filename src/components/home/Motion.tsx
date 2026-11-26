'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { PRODUCT_CONFIG_NAME, PRODUCT_PRICE } from './constants';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Reveal({
  children,
  delay = 0,
  threshold = 0.08,
}: {
  children: ReactNode;
  delay?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Visible by default so server-rendered and no-JS content stays readable.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Progressive enhancement: no motion / no IntersectionObserver => stay visible.
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;

    // Only animate in when the element starts offscreen (avoids a flash).
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) return;

    setVisible(false);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal transition-all duration-500 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none ${
        visible ? 'is-visible opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </div>
  );
}

export function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.min(Math.max((window.scrollY / scrollHeight) * 100, 0), 100);
        setWidth(progress);
      } else {
        setWidth(0);
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 h-[3px] w-full bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-green-deep transition-all duration-75 motion-reduce:transition-none"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export function StickyProductCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 800);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-charcoal/10 bg-ivory/95 p-3 pb-safe backdrop-blur md:hidden">
      <Link
        href="/tienda"
        aria-label={`Comprar ${PRODUCT_CONFIG_NAME} por ${PRODUCT_PRICE}`}
        className="flex items-center justify-between rounded-lg bg-green-deep px-5 py-3 font-medium text-white shadow-md active:bg-green-mid"
      >
        <span className="text-sm truncate mr-2">{PRODUCT_CONFIG_NAME}</span>
        <span className="font-mono text-xs font-semibold text-bright-bronze shrink-0">{PRODUCT_PRICE}</span>
      </Link>
    </div>
  );
}
