import Link from 'next/link';
import {
  FileText,
  ClipboardCheck,
  ShieldAlert,
  Home as HomeIcon,
  Calculator,
  BookOpen,
  ArrowRight,
  Check,
} from 'lucide-react';
import NewsletterCTA from '@/components/NewsletterCTA';
import { PRODUCT_CONFIG, formatPrice } from '@/lib/product';

const trustBarText = 'Más de 500 arrendadores confían en nuestras guías cada mes · Contenido actualizado a 2026 · No somos un despacho de abogados';

const problemCards = [
  {
    icon: FileText,
    title: 'Contratos incompletos o genéricos',
    description: 'La mayoría de plantillas gratis omiten cláusulas clave para Colombia. Nuestras guías explican qué debe ir en cada contrato y por qué.',
  },
  {
    icon: ClipboardCheck,
    title: 'Entregas sin documentación',
    description: 'Sin acta de entrega firmada, no hay prueba del estado del inmueble. Te enseñamos a documentar todo con checklist y fotos.',
  },
  {
    icon: ShieldAlert,
    title: 'Morosidad sin plan de acción',
    description: 'Cuando el inquilino no paga, el tiempo corre en tu contra. Te damos los pasos legales y preventivos para actuar rápido.',
  },
];

const resourceCards = [
  {
    icon: HomeIcon,
    title: 'Guía: Contrato de arrendamiento',
    description: 'Elementos obligatorios, cláusulas recomendadas y errores que debes evitar al redactar tu contrato.',
    href: '/guias/contratos',
  },
  {
    icon: Calculator,
    title: 'Calculadora de rentabilidad',
    description: 'Estima el retorno real de tu inmueble considerando vacancia, mantenimiento, impuestos y seguros.',
    href: '/herramientas',
  },
  {
    icon: BookOpen,
    title: 'Checklist de inspección',
    description: 'Lista completa para revisar pisos, instalaciones, medidores y elementos antes de entregar llaves.',
    href: '/recursos',
  },
];

const productFeatures = [
  'Campos dinámicos (fecha, valor, garantía, índice de actualización)',
  'Cláusulas de protección: daño, subarriendo, terminación anticipada',
  'Guía paso a paso para personalizar (PDF incluido)',
  'Formato .docx editable + enlace a Google Docs',
  'Actualizaciones gratuitas por 12 meses',
  'Respuesta por email ante dudas de uso',
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-50 via-white to-white py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 mb-6">
                Nueva guía: Acta de entrega paso a paso
              </span>
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight">
                Arrendar con confianza
                <br />
                <span className="text-teal-600">empieza con la información correcta</span>
              </h1>
              <p className="mb-8 text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
                Guías prácticas, plantillas legales y herramientas para arrendadores en Colombia.
                Sin tecnicismos, sin relleno, listo para aplicar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/guias"
                  className="rounded-xl bg-navy-600 px-8 py-3 text-base font-semibold text-white hover:bg-navy-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Explorar guías gratis
                  <ArrowRight className="inline-block w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/tienda"
                  className="rounded-xl border-2 border-navy-300 bg-white px-8 py-3 text-base font-semibold text-navy-700 hover:bg-navy-50 transition-colors"
                >
                  Ver plantilla de contrato
                </Link>
              </div>
            </div>

            {/* Illustration placeholder */}
            <div className="relative hidden lg:block">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-navy-100 via-teal-50 to-white border border-navy-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-teal-100 to-transparent opacity-50" />
                <div className="relative z-10 text-center p-8">
                  <div className="mb-4 text-6xl">📋</div>
                  <p className="text-navy-600 font-medium">Plantilla de contrato</p>
                  <p className="text-sm text-gray-500">Editable en Word y Google Docs</p>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-2">
                  <div className="w-20 h-2 bg-teal-200 rounded" />
                  <div className="w-20 h-2 bg-teal-200 rounded" />
                  <div className="w-20 h-2 bg-teal-200 rounded" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-100 rounded-full blur-3xl opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-4 bg-navy-50 border-y border-navy-100">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm text-navy-600 font-medium">{trustBarText}</p>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <header className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Resolvemos los problemas reales del arrendador
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No vendemos humo. Atacamos los dolores de cabeza que todo propietario tiene al arrendar.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            {problemCards.map((card) => (
              <article
                key={card.title}
                className="group rounded-2xl border border-navy-100 bg-white p-8 shadow-lg hover:shadow-xl hover:border-teal-200 transition-all duration-300"
              >
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-100 group-hover:text-teal-700 transition-colors">
                  <card.icon className="w-8 h-8" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-navy-900">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product */}
      <section className="py-20 md:py-28 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-3xl border border-navy-200 bg-white p-8 md:p-12 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 mb-4">
                  Producto destacado
                </span>
                <h2 className="mb-4 text-3xl md:text-4xl font-bold text-navy-900">
                  {PRODUCT_CONFIG.name}
                </h2>
                <p className="mb-8 text-lg text-gray-600">
                  Contrato editable en Word y Google Docs basado en la normativa aplicable.
                  Incluye todo lo necesario para proteger tu inmueble y tu relación contractual.
                </p>

                <div className="mb-8 flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-navy-900">{formatPrice()}</span>
                  <span className="text-gray-500">Pago único · Acceso inmediato</span>
                </div>

                <ul className="mb-8 space-y-4" role="list">
                  {productFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/tienda"
                  className="inline-flex items-center gap-2 rounded-xl bg-navy-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-navy-700 transition-colors shadow-lg"
                >
                  Comprar y descargar
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>

                <p className="mt-6 text-xs text-gray-500">
                  {PRODUCT_CONFIG.disclaimer}
                </p>
              </div>

              <div className="relative">
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-navy-100 via-teal-50 to-white border border-navy-200 p-8 flex flex-col items-center justify-center">
                  <div className="mb-6 text-8xl">📄</div>
                  <h3 className="text-xl font-semibold text-navy-900 text-center mb-2">Plantilla lista para usar</h3>
                  <p className="text-gray-600 text-center text-sm">
                    Completa los campos, revisa con tu abogado si lo deseas, y firma.
                  </p>
                  <div className="mt-8 flex flex-col gap-2 w-full max-w-xs">
                    <div className="h-8 bg-navy-100 rounded-lg" />
                    <div className="h-8 bg-navy-100 rounded-lg" />
                    <div className="h-8 bg-teal-100 rounded-lg" />
                    <div className="h-8 bg-navy-100 rounded-lg" />
                    <div className="h-8 bg-navy-100 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <header className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Recursos gratuitos para arrendadores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Herramientas y guías que puedes usar hoy mismo sin pagar nada.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {resourceCards.map((card) => (
              <article
                key={card.title}
                className="group rounded-2xl border border-navy-100 bg-white p-8 shadow-lg hover:shadow-xl hover:border-teal-200 transition-all duration-300 flex flex-col h-full"
              >
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-navy-50 text-navy-600 group-hover:bg-navy-100 group-hover:text-navy-700 transition-colors">
                  <card.icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-navy-900">{card.title}</h3>
                <p className="text-gray-600 mb-6 flex-1">{card.description}</p>
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 group"
                >
                  Acceder
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/guias"
              className="inline-flex items-center gap-1.5 text-base font-semibold text-navy-600 hover:text-navy-700"
            >
              Ver todas las guías
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-20 md:py-28 bg-navy-900">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-3xl bg-gradient-to-r from-navy-800 to-navy-900 border border-navy-700 p-8 md:p-12 text-center">
            <div className="mx-auto max-w-xl">
              <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
                Recibe una guía práctica cada semana
              </h2>
              <p className="mb-8 text-lg text-navy-200">
                Contratos, actas, morosidad, fiscalidad. Solo lo útil, directo a tu bandeja de entrada.
              </p>
              <NewsletterCTA source="hero" />
              <p className="mt-6 text-xs text-navy-400">
                Sin spam. Solo contenido útil. Cancela cuando quieras.{' '}
                <a href="/politica-de-datos" className="underline hover:text-teal-300">
                  Política de datos
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      </>
  );
}