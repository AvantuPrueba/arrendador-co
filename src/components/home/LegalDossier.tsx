'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Envoltorio del expediente documental. El tilt de cursor es decorativo:
 * solo se activa en desktop con puntero fino y sin prefers-reduced-motion.
 */
export default function LegalDossier({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.closest('section');
    if (!el || !section) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const desktop = window.matchMedia('(min-width: 1024px)').matches;
    if (reduce || !finePointer || !desktop) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const apply = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const nx = (pointerX - rect.left) / rect.width - 0.5;
      const ny = (pointerY - rect.top) / rect.height - 0.5;
      const rotateY = Math.max(-3, Math.min(3, nx * 6));
      const rotateX = Math.max(-4, Math.min(4, -ny * 8));
      el.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    };

    const onMove = (event: MouseEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      el.style.transform = '';
    };

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);

    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
      el.style.transform = '';
    };
  }, []);

  return (
    <div ref={ref} className="lt-left lt-tilt" data-lt-reveal aria-hidden="true">
      {children}
    </div>
  );
}
