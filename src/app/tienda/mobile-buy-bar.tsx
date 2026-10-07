'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PRODUCT_CONFIG, formatPrice } from '@/lib/product';

export function MobileBuyBar() {
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
        href="#compra"
        className="flex items-center justify-between rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
      >
        <span>{PRODUCT_CONFIG.name.split(' ')[0]} · {formatPrice()}</span>
        <span className="rounded-lg bg-teal-600 px-4 py-1.5 text-sm">Comprar</span>
      </Link>
    </div>
  );
}
