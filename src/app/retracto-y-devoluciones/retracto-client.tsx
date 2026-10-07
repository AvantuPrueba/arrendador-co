'use client';

import { useState } from 'react';
import Link from 'next/link';
import LegalSection from '@/components/legal/LegalSection';
import LegalCallout from '@/components/legal/LegalCallout';
import LegalContactCard from '@/components/legal/LegalContactCard';
import LegalNavigation from '@/components/legal/LegalNavigation';
import RefundDecisionCards from '@/components/legal/RefundDecisionCards';
import RefundTimeline from '@/components/legal/RefundTimeline';
import RefundFAQ from '@/components/legal/RefundFAQ';
import { LEGAL_CONFIG } from '@/lib/legal-config';

export default function RetractoClient() {
  const [radicado, setRadicado] = useState('');

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRadicado('ARC-2026-XXXX');
  }

  return (
    <div className="bg-white">
      {/* Hero oscuro */}
      <header className="bg-slate-950 text-white">
        <div className="mx-auto max-w-[800px] px-4 py-16 md:py-24">
          <span className="mb-6 inline-block rounded-full border border-slate-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-300">
            Compras · Retracto · Devoluciones
          </span>
          <h1 className="mb-4 text-3xl md:text-5xl font-bold">
            Política de Retracto, Reversiones y Devoluciones
          </h1>
          <p className="mb-6 max-w-2xl text-slate-300">
            Aquí encontrarás cuándo aplica, cómo solicitarla y qué ocurre después.
          </p>
          <div className="mb-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">Colombia</span>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">Actualizado: Octubre 2026</span>
          </div>
          <p className="text-xs text-slate-500">
            Esta página explica las condiciones comerciales de ArrendadorCO y no constituye asesoría jurídica personalizada.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[800px] px-4 py-16 space-y-16">
        <RefundDecisionCards />

        {/* Antes de solicitar */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Antes de solicitar</h2>
          <ul className="space-y-2 text-slate-600">
            {['Correo de compra', 'Número de orden (si lo tienes)', 'Fecha de compra', 'Explicación clara de la solicitud', 'Confirmación de pago'].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-teal-600" aria-hidden="true">✓</span> {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Qué pasa después de solicitar</h2>
          <RefundTimeline />
        </section>

        <LegalSection number="01" title="Derecho de Retracto" id="derecho-retracto">
          <p>
            El derecho de retracto es la facultad del comprador de retractarse de la compra. El plazo
            es de 5 días hábiles desde la entrega del bien o la celebración del contrato (Ley 1480,
            art. 47). Solo aplica a ventas a distancia.
          </p>
        </LegalSection>

        <LegalSection number="02" title="Cuándo Procede" id="cuando-procede">
          <p>Procede dentro del plazo de 5 días hábiles y cuando el producto cumple las condiciones de esta política.</p>
        </LegalSection>

        <LegalSection number="03" title="Cuándo No Procede (excepciones)" id="cuando-no-procede">
          <LegalCallout title="Excepciones" variant="warning">
            De acuerdo con el numeral 4 del artículo 47 de la Ley 1480 de 2011, pueden estar
            exceptuados del retracto los bienes que, por su naturaleza, no puedan ser devueltos. Para
            el caso de productos digitales descargables, te recomendamos consultar las condiciones
            específicas antes de comprar.
          </LegalCallout>
        </LegalSection>

        <LegalSection number="04" title="Productos Digitales" id="productos-digitales">
          <ul className="list-disc pl-6 space-y-1">
            <li>Producto: Plantilla editable de contrato de arrendamiento.</li>
            <li>Formato: .docx + Google Docs.</li>
            <li>Método de entrega: Correo electrónico.</li>
            <li>Entrega prevista: dentro del plazo anunciado en la página de compra.</li>
            <li>Versión: 1.0.0 (o la versión adquirida).</li>
          </ul>
        </LegalSection>

        <LegalSection number="05" title="Cómo Solicitar una Devolución" id="como-solicitar">
          <form onSubmit={enviar} className="space-y-4">
            <input required type="email" placeholder="Correo usado en la compra" className="w-full rounded-lg border border-slate-200 px-4 py-3" />
            <input type="text" placeholder="Número de orden (si lo tienes)" className="w-full rounded-lg border border-slate-200 px-4 py-3" />
            <select className="w-full rounded-lg border border-slate-200 px-4 py-3" defaultValue="Retracto">
              <option>Retracto</option>
              <option>Reversión</option>
              <option>Problema con la compra</option>
            </select>
            <textarea required rows={4} placeholder="Motivo / explicación" className="w-full rounded-lg border border-slate-200 px-4 py-3" />
            <button type="submit" className="rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700">
              Enviar solicitud
            </button>
          </form>
          {radicado && (
            <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm font-semibold text-slate-900">
              Radicado: {radicado}
            </p>
          )}
        </LegalSection>

        <LegalSection number="06" title="Devolución del Dinero" id="devolucion-dinero">
          <p>
            La devolución del dinero no podrá exceder de quince (15) días calendario desde que ejerzas
            el derecho y hayas cumplido con las obligaciones (Ley 2439 de 2024). El reembolso se hará
            al mismo instrumento de pago usado en la compra.
          </p>
        </LegalSection>

        <LegalSection number="07" title="Reversión del Pago" id="reversion-pago">
          <p>
            La reversión del pago aplica en casos de fraude, operación no solicitada, producto no
            recibido, producto que no corresponde a lo adquirido o producto defectuoso (Ley 1480,
            art. 51).
          </p>
        </LegalSection>

        <LegalSection number="08" title="Preguntas Frecuentes" id="faq">
          <RefundFAQ />
        </LegalSection>

        <LegalSection number="09" title="Contacto" id="contacto">
          <p>
            ¿Tu compra presentó algún problema? Estamos aquí para ayudarte. Escríbenos a{' '}
            <Link href={`mailto:${LEGAL_CONFIG.officialEmail}`} className="text-teal-600 hover:underline">
              {LEGAL_CONFIG.officialEmail}
            </Link>{' '}
            o usa el formulario de la sección 05.
          </p>
        </LegalSection>

        <LegalContactCard email={LEGAL_CONFIG.officialEmail} title="¿Tu compra presentó algún problema? Estamos aquí para ayudarte." />

        <LegalNavigation current="/retracto-y-devoluciones" />
      </div>
    </div>
  );
}
