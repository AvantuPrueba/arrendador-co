'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GUIDE_TOC } from './guia-toc-data';

export function GuideToc() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-25% 0px -65% 0px' },
    );
    GUIDE_TOC.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Tabla de contenidos" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">En esta guía</h3>
      <ol className="space-y-1">
        {GUIDE_TOC.map((item, i) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className={`block border-l-2 py-1.5 pl-3 text-sm transition-colors ${
                active === item.id
                  ? 'border-teal-500 bg-slate-50 font-semibold text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-teal-600'
              }`}
            >
              <span className="mr-2 font-mono text-xs text-slate-400">{String(i + 1).padStart(2, '0')}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function GuideProgress() {
  useEffect(() => {
    let raf = 0;
    function update() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      const bar = document.getElementById('guide-progress');
      if (bar) bar.style.width = `${pct}%`;
    }
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }
    raf = requestAnimationFrame(update);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 h-[2px] w-full" aria-hidden="true">
      <div id="guide-progress" className="h-full bg-teal-500 motion-reduce:transition-none" style={{ transition: 'width 150ms ease-out' }} />
    </div>
  );
}
