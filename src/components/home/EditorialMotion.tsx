'use client';

import { useEffect } from 'react';

/**
 * Un único IntersectionObserver para la homepage editorial.
 * Sin JS o con prefers-reduced-motion el contenido permanece visible:
 * el estado inicial oculto solo se activa desde este efecto.
 */
export default function EditorialMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.editorial-home');
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') return;

    root.dataset.motion = 'ready';

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    root.querySelectorAll<HTMLElement>('[data-ed-reveal], [data-pd-reveal]').forEach((el) => {
      revealObserver.observe(el);
    });

    const timeline = root.querySelector<HTMLElement>('[data-ed-timeline]');
    const timelineObserver = timeline
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add('is-in');
              timelineObserver?.unobserve(entry.target);
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -40% 0px' },
        )
      : null;
    if (timeline && timelineObserver) timelineObserver.observe(timeline);

    return () => {
      revealObserver.disconnect();
      timelineObserver?.disconnect();
      delete root.dataset.motion;
    };
  }, []);

  return null;
}
