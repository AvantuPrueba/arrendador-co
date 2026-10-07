'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import LegalSection from '@/components/legal/LegalSection';
import LegalContactCard from '@/components/legal/LegalContactCard';
import LegalNavigation from '@/components/legal/LegalNavigation';
import LegalIdentityCard from '@/components/legal/LegalIdentityCard';
import LegalTrustMap from '@/components/legal/LegalTrustMap';
import LegalDisclosure from '@/components/legal/LegalDisclosure';
import { LEGAL_CONFIG } from '@/lib/legal-config';

const SECTIONS = [
  { id: 'titular', label: 'Identificación del Titular' },
  { id: 'que-es', label: 'Qué es ArrendadorCO' },
  { id: 'que-no-es', label: 'Qué NO es ArrendadorCO' },
  { id: 'propiedad', label: 'Propiedad Intelectual' },
  { id: 'editorial', label: 'Contenido Editorial y Fuentes' },
  { id: 'terceros', label: 'Enlaces y Servicios de Terceros' },
  { id: 'afiliados', label: 'Divulgación de Afiliados' },
  { id: 'responsabilidad', label: 'Responsabilidad y Alcance' },
  { id: 'marco-legal', label: 'Marco Legal Aplicable' },
  { id: 'contacto', label: 'Contacto' },
];

export default function AvisoClient() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-20% 0px -70% 0px' },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white">
      <header className="bg-slate-950 text-white">
        <div className="mx-auto max-w-[800px] px-4 py-16 md:py-24">
          <span className="mb-6 inline-block rounded-full border border-slate-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-300">
            Identidad · Transparencia
          </span>
          <h1 className="mb-4 text-3xl md:text-5xl font-bold">Aviso Legal</h1>
          <p className="mb-8 max-w-2xl text-slate-300">
            Quiénes somos, qué hacemos y bajo qué condiciones funciona este sitio.
          </p>
          <div className="mb-8 max-w-2xl">
            <LegalIdentityCard />
          </div>
          <div className="mb-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">Colombia</span>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">Actualizado: Octubre 2026</span>
          </div>
          <p className="text-xs text-slate-500">
            Este documento explica las condiciones de ArrendadorCO y no constituye asesoría jurídica personalizada.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-16 lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <nav className="sticky top-10" aria-label="En este aviso">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">En este aviso</h3>
            <ul className="space-y-2 border-l border-slate-200">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`block -ml-px border-l-2 pl-4 py-1 text-sm transition-colors ${
                      active === s.id ? 'border-teal-500 font-semibold text-teal-600' : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="mr-2 font-mono text-xs text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="lg:hidden mb-10">
          <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
            En este aviso ({SECTIONS.length} secciones)
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <ul className="mt-2 space-y-1 rounded-xl border border-slate-200 p-4">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} onClick={() => setOpen(false)} className="block py-1 text-sm text-teal-600">
                    <span className="mr-2 font-mono text-xs text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <article className="space-y-16">
          <LegalSection number="01" title="Identificación del Titular" id="titular">
            <LegalIdentityCard />
          </LegalSection>

          <LegalSection number="02" title="Qué es ArrendadorCO" id="que-es">
            <LegalTrustMap />
          </LegalSection>

          <LegalSection number="03" title="Qué NO es ArrendadorCO" id="que-no-es">
            <ul className="space-y-2">
              {['Contenido', 'Guías', 'Plantillas', 'Recursos', 'Afiliados'].map((x) => (
                <li key={x} className="text-green-700">✓ {x}</li>
              ))}
              {['SaaS', 'Marketplace', 'Inmobiliaria', 'Asesoría legal'].map((x) => (
                <li key={x} className="text-red-700">✕ {x}</li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection number="04" title="Propiedad Intelectual" id="propiedad">
            <p>
              La adquisición de una plantilla digital permite al comprador utilizarla conforme a las
              condiciones de licencia indicadas en la página de producto y en los Términos y
              Condiciones. La adquisición no transfiere los derechos de propiedad intelectual sobre la
              plantilla ni autoriza su reventa, redistribución o publicación no autorizada.
            </p>
          </LegalSection>

          <LegalSection number="05" title="Contenido Editorial y Fuentes" id="editorial">
            <ul className="space-y-2">
              {[
                'Citar fuentes oficiales cuando corresponda',
                'Indicar fechas de actualización',
                'Distinguir información de opinión',
                'Evitar presentar contenido general como asesoría personalizada',
                'Actualizar contenidos cuando existan cambios relevantes',
              ].map((x) => (
                <li key={x} className="text-slate-600">✓ {x}</li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection number="06" title="Enlaces y Servicios de Terceros" id="terceros">
            <ul className="list-disc pl-6 space-y-1 text-slate-600">
              <li>Mercado Pago (procesamiento de pagos)</li>
              <li>Cloudflare (infraestructura / hosting)</li>
            </ul>
          </LegalSection>

          <LegalSection number="07" title="Divulgación de Afiliados" id="afiliados">
            <LegalDisclosure />
          </LegalSection>

          <LegalSection number="08" title="Responsabilidad y Alcance" id="responsabilidad">
            <p className="text-slate-600">
              Procuramos mantener la información actualizada y precisa, pero no garantizamos la
              ausencia total de errores ni nos responsabilizamos por el uso de los modelos en acuerdos
              particulares.
            </p>
          </LegalSection>

          <LegalSection number="09" title="Marco Legal Aplicable" id="marco-legal">
            <ul className="list-disc pl-6 space-y-1 text-slate-600">
              <li><a href="https://normograma.dian.gov.co/dian/compilacion/docs/ley_0820_2003.htm" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Ley 820 de 2003</a> (Arrendamiento de vivienda urbana)</li>
              <li><a href="https://normograma.dian.gov.co/dian/compilacion/docs/ley_1480_2011.htm" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Ley 1480 de 2011</a> (Estatuto del Consumidor)</li>
              <li><a href="https://normograma.dian.gov.co/dian/compilacion/docs/ley_1581_2012.htm" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Ley 1581 de 2012</a> (Protección de Datos Personales)</li>
              <li><a href="https://normograma.dian.gov.co/dian/compilacion/docs/ley_2439_2024.htm" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Ley 2439 de 2024</a> (Modificaciones en comercio electrónico)</li>
            </ul>
          </LegalSection>

          <LegalSection number="10" title="Contacto" id="contacto">
            <p className="text-slate-600">
              Correo oficial: {LEGAL_CONFIG.officialEmail}.
            </p>
          </LegalSection>

          <LegalContactCard email={LEGAL_CONFIG.officialEmail} />
          <LegalNavigation current="/aviso-legal" />
        </article>
      </div>
    </div>
  );
}
