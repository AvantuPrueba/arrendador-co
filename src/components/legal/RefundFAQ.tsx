'use client';

import { useState } from 'react';

const FAQS = [
  { q: '¿Puedo solicitar devolución después de comprar?', a: 'Sí, dentro del plazo del derecho de retracto o por las causales de reversión.' },
  { q: '¿Qué información debo enviar?', a: 'Correo de compra, número de orden si lo tienes, fecha y una explicación clara.' },
  { q: '¿Cómo se devuelve el dinero?', a: 'Al mismo instrumento de pago usado en la compra.' },
  { q: '¿Cuánto tarda el reembolso?', a: 'Máximo 15 días calendario desde que ejerzas el derecho (Ley 2439 de 2024).' },
  { q: '¿Qué diferencia hay entre retracto y reversión?', a: 'El retracto es un derecho del comprador a arrepentirse; la reversión aplica en casos de fraude, no entrega o producto defectuoso.' },
  { q: '¿Qué ocurre si no recibí el archivo?', a: 'Contáctanos con tu correo y orden; reenviamos el enlace o aplicamos reversión.' },
  { q: '¿Qué ocurre si recibí un archivo incorrecto?', a: 'Escríbenos y te enviamos el archivo correcto.' },
  { q: '¿A qué correo debo escribir?', a: 'Usa el correo oficial indicado en esta página.' },
];

export default function RefundFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {FAQS.map((f, i) => (
        <div key={f.q} className="border-b border-slate-200 pb-2">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between py-2 text-left font-semibold text-slate-900"
          >
            {f.q}
            <span className="text-teal-600">{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <p className="pb-2 text-sm text-slate-600">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}
