'use client';

import { useEffect, useState } from 'react';
import {
  Database,
  Target,
  Share2,
  ShieldCheck,
  Eye,
  PenLine,
  AlertCircle,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { LEGAL_CONFIG } from '@/lib/legal-config';

const SECTIONS = [
  { id: 'responsable', label: 'Identificación del Responsable' },
  { id: 'datos', label: 'Datos que Recopilamos' },
  { id: 'finalidades', label: 'Finalidades del Tratamiento' },
  { id: 'base-legal', label: 'Base Legal y Consentimiento' },
  { id: 'conservacion', label: 'Conservación de Datos' },
  { id: 'derechos', label: 'Derechos del Titular' },
  { id: 'transferencias', label: 'Transferencias a Terceros' },
  { id: 'cookies', label: 'Cookies y Almacenamiento Local' },
  { id: 'vigencia', label: 'Vigencia y Cambios' },
  { id: 'contacto', label: 'Contacto' },
];

export default function PoliticaClient() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-white">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 z-50 h-[2px] w-full bg-slate-200">
        <div className="h-full bg-slate-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Hero */}
      <header className="bg-slate-950 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
          <span className="mb-6 inline-block rounded-full border border-slate-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-300">
            Privacidad · ArrendadorCO
          </span>
          <h1 className="mb-4 text-3xl md:text-5xl font-bold">Política de Tratamiento de Datos</h1>
          <p className="mb-6 max-w-2xl text-slate-300">
            Conoce qué información recopilamos y cómo la protegemos.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              Última actualización · {LEGAL_CONFIG.lastUpdated}
            </span>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              {LEGAL_CONFIG.jurisdiction}
            </span>
          </div>
        </div>
      </header>

      {/* Resumen */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="mb-6 text-xl font-semibold text-slate-900">Resumen de privacidad</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Database, title: 'Qué recopilamos', text: 'Datos de contacto, facturación y navegación.' },
            { icon: Target, title: 'Para qué', text: 'Newsletter, consultas y procesamiento de compras.' },
            { icon: Share2, title: 'Con quién', text: 'Mercado Pago, FormSubmit, Resend, Cloudflare y Unsplash, según el caso.' },
            { icon: ShieldCheck, title: 'Tus derechos', text: 'Consultar, actualizar, rectificar y suprimir.' },
          ].map((card) => (
            <div key={card.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <card.icon className="mb-3 h-6 w-6 text-teal-600" aria-hidden="true" />
              <h3 className="mb-1 font-semibold text-slate-900">{card.title}</h3>
              <p className="text-sm text-slate-600">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Documento con sidebar sticky */}
      <div className="mx-auto max-w-5xl px-4 pb-24">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          {/* Sidebar desktop */}
          <aside className="hidden lg:block">
            <nav className="sticky top-10" aria-label="En esta política">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                En esta política
              </h3>
              <ul className="space-y-2 border-l border-slate-200">
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`block border-l-2 pl-4 py-1 text-sm transition-colors -ml-px ${
                        active === s.id
                          ? 'border-teal-500 font-semibold text-teal-600'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
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

          {/* Mobile dropdown */}
          <div className="mb-10 lg:hidden">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900"
            >
              En esta política ({SECTIONS.length} secciones)
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

          {/* Contenido */}
          <article className="space-y-16">
            <Section id="responsable" number="01" title="Identificación del Responsable del Tratamiento" active={active === 'responsable'}>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <ul className="space-y-1">
                  <li>Marca comercial: {LEGAL_CONFIG.brandName}</li>
                  <li>Responsable: {LEGAL_CONFIG.legalName}</li>
                  <li>Documento/NIT: {LEGAL_CONFIG.taxId}</li>
                  <li>Ciudad: {LEGAL_CONFIG.city}</li>
                  <li>Dirección de notificación: {LEGAL_CONFIG.address}</li>
                  <li>Correo para Habeas Data: {LEGAL_CONFIG.officialEmail}</li>
                  <li>Teléfono: {LEGAL_CONFIG.phone}</li>
                  <li>Sitio web: {LEGAL_CONFIG.website}</li>
                </ul>
              </div>
            </Section>

            <Section id="datos" number="02" title="Datos que Recopilamos" active={active === 'datos'}>
              <p className="text-slate-600">Datos de contacto e identificación, datos de facturación y compra, y datos de navegación (IP, navegador, registros de acceso).</p>
            </Section>

            <Section id="finalidades" number="03" title="Finalidades del Tratamiento" active={active === 'finalidades'}>
              <ol className="list-decimal pl-6 space-y-1 text-slate-600">
                <li>Gestionar suscriptores del newsletter.</li>
                <li>Responder consultas y peticiones.</li>
                <li>Procesar compras y entregar productos digitales.</li>
                <li>Cumplir obligaciones legales y tributarias.</li>
              </ol>
            </Section>

            <Section id="base-legal" number="04" title="Base Legal y Consentimiento" active={active === 'base-legal'}>
              <p className="text-slate-600">Ley Estatutaria 1581 de 2012 y Decreto 1377 de 2013. El tratamiento se basa en el consentimiento del titular, salvo excepciones legales.</p>
            </Section>

            <Section id="conservacion" number="05" title="Conservación de Datos" active={active === 'conservacion'}>
              <p className="text-slate-600">Los datos se conservan mientras sean necesarios para las finalidades descritas.</p>
            </Section>

            <Section id="derechos" number="06" title="Derechos del Titular" active={active === 'derechos'}>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Eye, title: 'Consultar', text: 'Conocer los datos que tenemos de ti.' },
                  { icon: PenLine, title: 'Actualizar', text: 'Rectificar o corregir tus datos.' },
                  { icon: AlertCircle, title: 'Reclamar', text: 'Presentar peticiones o quejas.' },
                  { icon: HelpCircle, title: 'Saber', text: 'Ser informado sobre el uso de tus datos.' },
                ].map((card) => (
                  <div key={card.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <card.icon className="mb-3 h-6 w-6 text-teal-600" aria-hidden="true" />
                    <h3 className="mb-1 font-semibold text-slate-900">{card.title}</h3>
                    <p className="text-sm text-slate-600">{card.text}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="transferencias" number="07" title="Transferencias a Terceros" active={active === 'transferencias'}>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Mercado Pago: procesamiento y verificación de pagos; recibe el correo y los datos de la compra.</li>
                <li>FormSubmit: envío de mensajes de contacto y suscripciones al newsletter; recibe nombre, correo y mensaje.</li>
                <li>Resend: envío del correo de entrega del producto; recibe el correo del comprador.</li>
                <li>Cloudflare (Workers, D1 y R2): hosting, tabla de órdenes y almacenamiento del archivo del producto; D1 guarda el correo del comprador.</li>
                <li>Unsplash: imagen decorativa de la portada, obtenida por el servidor del sitio y servida desde nuestro propio dominio.</li>
              </ul>
              <p className="mt-3 text-sm text-slate-500">
                Algunos proveedores pueden procesar información fuera de Colombia. La transferencia
                internacional de datos personales se rige por el artículo 26 de la Ley 1581 de 2012.
              </p>
            </Section>

            <Section id="cookies" number="08" title="Cookies y Almacenamiento Local" active={active === 'cookies'}>
              <p className="text-slate-600">
                Este sitio no instala cookies de analítica, publicidad ni seguimiento. No usamos
                Google Analytics, Meta Pixel, Hotjar ni servicios similares.
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-600">
                <li>
                  <strong className="text-slate-900">Preferencias de privacidad:</strong> el
                  almacenamiento local del navegador guarda, bajo la clave{' '}
                  <code className="font-mono">arrendadorco-consent</code>, tu elección, un
                  identificador aleatorio, la fecha y la versión del aviso. Duración: 180 días;
                  después ese registro deja de ser válido y el aviso vuelve a mostrarse. No contiene
                  datos personales, no se envía a ningún servidor y no se usa ninguna cookie.
                </li>
                <li>
                  <strong className="text-slate-900">Checklist de entrega:</strong> si usas esa
                  herramienta, el progreso se guarda en{' '}
                  <code className="font-mono">localStorage</code> de tu navegador bajo la clave{' '}
                  <code className="font-mono">checklist-entrega-progreso</code>. Puede incluir el
                  nombre y la dirección que escribas en el formulario. Permanece hasta que lo
                  elimines con «Reiniciar». Es una tecnología funcional, necesaria para conservar el
                  progreso de una herramienta que tú decides usar; no se transmite a terceros.
                </li>
              </ul>
              <p className="mt-3 text-slate-600">
                Puedes volver a abrir el panel en «Preferencias de privacidad», al pie de cualquier
                página, para cambiar o revocar tu elección. Al hacerlo se sobrescribe el registro
                local.
              </p>
            </Section>

            <Section id="vigencia" number="09" title="Vigencia y Cambios" active={active === 'vigencia'}>
              <p className="text-slate-600">Esta política entró en vigencia en octubre de 2026. Podemos actualizarla; los cambios rigen desde su publicación.</p>
            </Section>

            <Section id="contacto" number="10" title="Contacto" active={active === 'contacto'}>
              <p className="text-slate-600">
                Ejerce tus derechos escribiendo a {LEGAL_CONFIG.officialEmail}. Incluye tu nombre, identificación y descripción clara de la solicitud.
              </p>
              <p className="text-sm text-slate-500">Este documento es informativo y no constituye asesoría jurídica.</p>
            </Section>
          </article>
        </div>
      </div>
    </div>
  );
}

function Section({
  id,
  number,
  title,
  active,
  children,
}: {
  id: string;
  number: string;
  title: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 flex gap-6">
      <div className="flex flex-col items-center">
        <span
          className={`text-6xl font-bold transition-colors duration-300 ${
            active ? 'text-teal-600' : 'text-slate-200'
          }`}
        >
          {number}
        </span>
        <span className="mt-2 w-px flex-1 bg-slate-200" />
      </div>
      <div className="flex-1 pb-4">
        <h2 className="mb-4 text-[24px] font-semibold text-slate-900">{title}</h2>
        {children}
      </div>
    </section>
  );
}
