import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  ClipboardCheck,
  ShieldAlert,
  Scale,
  AlertCircle,
  BookOpen,
  Home,
  ChevronRight,
} from 'lucide-react';
import { PRODUCT_CONFIG, formatPrice } from '@/lib/product';
import ProductCTA from '@/components/ProductCTA';
import NewsletterCTA from '@/components/NewsletterCTA';

export const metadata: Metadata = {
  title: 'Contrato de Arrendamiento de Vivienda Urbana en Colombia | ArrendadorCO',
  description: 'Guía práctica sobre contratos de arrendamiento de vivienda urbana en Colombia: requisitos, cláusulas, garantías, prórroga, terminación y errores frecuentes.',
};

const tocItems = [
  { id: 'ambito', label: 'Ámbito de esta guía' },
  { id: 'elementos', label: 'Elementos del contrato' },
  { id: 'garantias', label: 'Garantías' },
  { id: 'prorroga', label: 'Duración y prórroga' },
  { id: 'errores', label: 'Errores frecuentes' },
  { id: 'fuentes', label: 'Fuentes consultadas' },
] as const;

export default function ContratosGuia() {
  const today = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
        <Link href="/" className="flex items-center gap-1.5 hover:text-navy-700 transition-colors">
          <Home className="w-4 h-4" aria-hidden="true" />
          Inicio
        </Link>
        <ChevronRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
        <Link href="/guias" className="hover:text-navy-700 transition-colors">
          Guías
        </Link>
        <ChevronRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
        <span className="text-navy-900 font-medium" aria-current="page">Contratos</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar - Table of Contents */}
        <aside className="lg:w-64 flex-shrink-0 hidden lg:block">
          <div className="sticky top-24">
            <h3 className="mb-3 text-sm font-semibold text-navy-900 uppercase tracking-wide">En esta guía</h3>
            <nav aria-label="Tabla de contenidos">
              <ul className="space-y-2">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`#${item.id}`}
                      className="block text-sm text-gray-600 hover:text-navy-700 transition-colors py-1 px-2 rounded hover:bg-navy-50"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Mobile TOC */}
        <details className="lg:hidden mb-8">
          <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold text-navy-900">
            <span>En esta guía</span>
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </summary>
          <nav className="mt-3 p-4 rounded-xl bg-navy-50" aria-label="Tabla de contenidos móvil">
            <ul className="space-y-2">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`#${item.id}`}
                    className="block text-sm text-gray-600 hover:text-navy-700 transition-colors py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Hero */}
          <header className="mb-10">
            <h1 className="mb-4 text-4xl md:text-5xl font-bold text-navy-900 leading-tight">
              Contrato de arrendamiento de vivienda urbana en Colombia
            </h1>
            <p className="mb-6 text-xl text-gray-600 max-w-2xl">
              Qué debe contener, qué conviene revisar antes de firmar y cómo evitar errores frecuentes.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span>Última actualización: {today}</span>
              <span>Lectura: ~10 min</span>
            </div>
          </header>

          {/* "En esta guía" visual summary */}
          <section id="ambito" className="mb-12 p-6 rounded-2xl bg-navy-50 border border-navy-100">
            <h2 className="mb-4 text-xl font-semibold text-navy-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-600" aria-hidden="true" />
              Qué encontrará en esta guía
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: FileText, title: 'Elementos del contrato', desc: 'Los 7 puntos mínimos que exige la Ley 820 (art. 3)' },
                { icon: ClipboardCheck, title: 'Cláusulas recomendadas', desc: 'Inventario, acta de entrega, comunicaciones por escrito' },
                { icon: ShieldAlert, title: 'Garantías permitidas', desc: 'Fiador, póliza, depósito solo para servicios públicos' },
                { icon: Scale, title: 'Duración y prórroga', desc: 'Cómo opera la prórroga legal y la terminación' },
                { icon: AlertCircle, title: 'Errores frecuentes', desc: '6 errores reales que conviene evitar' },
                { icon: BookOpen, title: 'Fuentes', desc: 'Ley 820 de 2003 con enlace al texto oficial' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white text-teal-600 flex items-center justify-center shadow-sm">
                    <item.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-navy-900 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="prose prose-navy max-w-none">
            {/* Ámbito */}
            <h2 id="ambito" className="scroll-mt-24">Ámbito de esta guía</h2>
            <p>
              Esta guía se refiere al <strong>arrendamiento de vivienda urbana</strong> regulado por la <strong>Ley 820 de 2003</strong>.
              No cubre arrendamiento rural, comercial, ni fincas raíz distintas a vivienda urbana.
            </p>

            {/* Elementos del contrato - split obligatory vs recommended */}
            <h2 id="elementos" className="scroll-mt-24">Elementos del contrato: lo obligatorio vs. lo recomendable</h2>
            <p>
              En vivienda urbana, el contrato puede ser <strong>verbal o escrito</strong>. En cualquier caso,
              el artículo 3 de la Ley 820 de 2003 establece que las partes deben acordar como mínimo estos
              <strong>siete puntos</strong>:
            </p>

            <div className="grid gap-6 md:grid-cols-2 my-8">
              {/* Debe contemplarse */}
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-navy-900">
                  <ClipboardCheck className="w-5 h-5 text-teal-600" aria-hidden="true" />
                  Debe contemplarse (mínimo legal, art. 3 Ley 820)
                </h3>
                <ol className="list-decimal list-inside space-y-3 text-sm">
                  <li><strong>Las partes</strong>: nombre completo e identificación (documento de identidad) de arrendador y arrendatario.</li>
                  <li><strong>El inmueble</strong>: identificación precisa (dirección, matrícula inmobiliaria si existe) y zonas o servicios compartidos si aplica.</li>
                  <li><strong>Canon y forma de pago</strong>: valor del canon mensual y periodicidad de pago (mensual, quincenal, etc.).</li>
                  <li><strong>Servicios, cosas o usos conexos y adicionales</strong>: qué está incluido (parqueadero, depósito, zonas comunes, etc.).</li>
                  <li><strong>Duración del contrato</strong>: término inicial pactado (puede ser indefinido).</li>
                  <li><strong>Designación de quién paga los servicios públicos</strong>: agua, energía, gas, internet, etc.</li>
                  <li><strong>Reajuste del canon</strong>: forma en que se actualizará el canon (IPC, índice acordado, etc.).</li>
                </ol>
                <p className="mt-4 text-xs text-gray-500"><em>Fuente: Ley 820 de 2003, art. 3.</em></p>
              </div>

              {/* Conviene documentar */}
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-navy-900">
                  <FileText className="w-5 h-5 text-gray-500" aria-hidden="true" />
                  Conviene documentar (no es requisito legal)
                </h3>
                <ul className="list-disc list-inside space-y-3 text-sm text-gray-700">
                  <li><strong>Inventario detallado</strong> del inmueble y sus accesorios (fotos, videos, estado de paredes, pisos, instalaciones).</li>
                  <li><strong>Acta de entrega y recepción</strong> firmada por ambas partes al inicio y al final del contrato.</li>
                  <li><strong>Medios de notificación</strong>: direcciones físicas y electrónicas válidas para notificaciones.</li>
                  <li><strong>Registro de comunicaciones</strong> por escrito (correo, mensajería) para pruebas futuras.</li>
                  <li><strong>Cláusula de restitución anticipada</strong> con plazos y consecuencias claras.</li>
                  <li><strong>Especificación de reparaciones locativas</strong> vs. mejoras a cargo del arrendador.</li>
                </ul>
                <p className="mt-4 text-xs text-gray-500">
                  <strong>Clave:</strong> ninguna de estas cláusulas es obligatoria por ley. Son recomendaciones prácticas para reducir riesgos.
                </p>
              </div>
            </div>

            {/* Garantías */}
            <h2 id="garantias" className="scroll-mt-24">Garantías: qué debes saber</h2>
            <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-5 my-6">
              <p className="font-semibold text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                En contratos de vivienda urbana, el artículo 16 de la Ley 820 <strong>prohíbe exigir
                depósitos en dinero efectivo u otras cauciones reales</strong> para garantizar las obligaciones del arrendatario.
              </p>
            </div>
            <p>
              Ninguna garantía es un requisito legal universal. Las opciones que usan las partes por acuerdo son:
            </p>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>Fiador / codeudor solidario</strong>: una persona natural responde con su patrimonio si el arrendatario incumple.
              </li>
              <li>
                <strong>Póliza de seguro de arrendamiento</strong>: una aseguradora cubre canon, administración, servicios y daños, según la póliza.
              </li>
              <li>
                <strong>Garantía para servicios públicos</strong>: se puede pactar un depósito <strong>exclusivamente</strong> para cubrir servicios públicos domiciliarios, pero nunca para el canon.
              </li>
            </ul>
            <p>
              El arrendador no puede obligar al arrendatario a constituir garantía alguna como condición para celebrar el contrato.
            </p>

            {/* Prórroga y terminación */}
            <h2 id="prorroga" className="scroll-mt-24">Duración, prórroga y terminación</h2>

            <h3 className="scroll-mt-20">Prórroga legal</h3>
            <p>
              El contrato se entiende <strong>prorrogado por el mismo término inicial</strong> (o por períodos anuales si era indefinido),
              siempre que <strong>cada parte haya cumplido sus obligaciones</strong> y el arrendatario acepte los reajustes del canon
              autorizados por la ley. No opera una &ldquo;renovación automática&rdquo; sin más; la prórroga depende del cumplimiento y la aceptación del reajuste.
            </p>

            <h3 className="scroll-mt-20">Terminación por el arrendador</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Por incumplimiento del arrendatario (canon, servicios, uso indebido, subarriendo no autorizado).</li>
              <li>Por necesidad de vivienda propia (con prueba y notificación con 6 meses de antelación).</li>
              <li>Por demolición o reparación estructural que exija desocupación.</li>
            </ul>

            <h3 className="scroll-mt-20">Terminación por el arrendatario</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>En cualquier momento, notificando con <strong>3 meses de antelación</strong> (art. 22 Ley 820).</li>
              <li>Por incumplimiento grave del arrendador (no entregar el inmueble, no hacer reparaciones locativas).</li>
            </ul>

            {/* Errores frecuentes */}
            <h2 id="errores" className="scroll-mt-24">Errores frecuentes que conviene evitar</h2>
            <ol className="list-decimal list-inside space-y-4">
              <li>
                <strong>No definir quién paga los servicios públicos</strong>: genera disputas y cortes de servicio.
              </li>
              <li>
                <strong>No dejar datos de notificación en el contrato</strong>: direcciones físicas y electrónicas para notificaciones válidas.
              </li>
              <li>
                <strong>Confundir una cláusula recomendada con una obligación legal</strong>: ejemplo, inventario detallado, cláusula de restitución anticipada, multas contractuales.
              </li>
              <li>
                <strong>No documentar el estado del inmueble al entregarlo</strong>: fotos, videos y acta firmada por ambas partes.
              </li>
              <li>
                <strong>Intentar pactar depósitos prohibidos</strong>: dinero en efectivo como garantía del canon (art. 16 Ley 820).
              </li>
              <li>
                <strong>Desconocer las reglas de terminación aplicables</strong>: preavisos, causales y procedimientos distintos para arrendador y arrendatario.
              </li>
            </ol>

            {/* CTA Producto */}
            <section className="mt-16 rounded-2xl border border-navy-200 bg-navy-50 p-8 md:p-10">
              <div className="text-center">
                <h2 className="mb-3 text-2xl md:text-3xl font-bold text-navy-900">
                  ¿Prefieres partir de un documento ya estructurado?
                </h2>
                <p className="mb-4 text-lg text-gray-600">
                  Plantilla editable de contrato de arrendamiento de vivienda urbana
                </p>
                <div className="mb-6 flex items-center justify-center gap-4">
                  <span className="text-2xl md:text-3xl font-bold text-navy-900">
                    {formatPrice(PRODUCT_CONFIG)}
                  </span>
                  <span className="text-gray-500">Pago único</span>
                </div>
                <Link
                  href="/tienda"
                  className="inline-flex items-center gap-2 rounded-xl bg-navy-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-navy-700 transition-colors shadow-lg"
                >
                  Ver plantilla
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </Link>
                <p className="mt-6 text-xs text-gray-500">
                  Modelo informativo. No constituye asesoría legal.
                </p>
              </div>
            </section>

            {/* Fuentes */}
            <h2 id="fuentes" className="scroll-mt-24">Fuentes consultadas</h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                Ley 820 de 2003, artículos 1, 2, 3, 6, 16, 22 y concordantes.
                <a
                  href="http://www.secretariasenado.gov.co/senado/basedoc/ley_0820_2003.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline"
                >
                  Ver texto oficial
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs text-gray-500">
              <strong>Contenido informativo.</strong> No constituye asesoría jurídica personalizada.
              Para decisiones específicas, consulta con un abogado.
            </p>
          </div>

          <ProductCTA />
          <NewsletterCTA />
        </main>
      </div>
    </div>
  );
}