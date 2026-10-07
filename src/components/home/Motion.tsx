'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { PRODUCT_CONFIG_NAME, PRODUCT_PRICE } from './constants';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-500 ease-out motion-reduce:transition-none ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
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
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(total > 0 ? (window.scrollY / total) * 100 : 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 z-50 h-[2px] w-full bg-transparent" aria-hidden="true">
      <div className="h-full bg-teal-500" style={{ width: `${width}%` }} />
    </div>
  );
}

export function StickyProductCta() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 700);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur md:hidden">
      <Link
        href="/tienda"
        className="flex items-center justify-between rounded-xl bg-navy-600 px-5 py-3 font-semibold text-white"
      >
        <span>{PRODUCT_CONFIG_NAME}</span>
        <span className="text-teal-300">{PRODUCT_PRICE}</span>
      </Link>
    </div>
  );
}
