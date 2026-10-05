import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-lg font-bold text-blue-700">ArrendadorCO</h3>
            <p className="text-sm text-gray-600">
              Información práctica para arrendadores en Colombia.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-gray-800">Navegación</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/guias" className="hover:text-blue-700">Guías y Recursos</Link></li>
              <li><Link href="/blog" className="hover:text-blue-700">Blog</Link></li>
              <li><Link href="/herramientas" className="hover:text-blue-700">Herramientas</Link></li>
              <li><Link href="/tienda" className="hover:text-blue-700">Tienda</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-gray-800">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/terminos-y-condiciones" className="hover:text-blue-700">Términos y Condiciones</Link></li>
              <li><Link href="/politica-de-datos" className="hover:text-blue-700">Política de Datos</Link></li>
              <li><Link href="/retracto-y-devoluciones" className="hover:text-blue-700">Retracto y Devoluciones</Link></li>
              <li><Link href="/aviso-legal" className="hover:text-blue-700">Aviso Legal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-gray-800">Nuestros Partners</h4>
            <p className="text-sm text-gray-500">
              Seguros de arrendamiento y software de facturación.
              <br />
              <span className="text-xs italic">Los enlaces de partners son afiliados y pueden generar una comisión.</span>
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
          <p className="mx-auto mb-3 max-w-3xl">
            ArrendadorCO es un sitio de contenido informativo. No somos un despacho de abogados ni
            ofrecemos asesoría legal personalizada. Las guías y plantillas publicadas son modelos de
            referencia. Recomendamos consultar con un profesional del derecho antes de tomar
            decisiones legales. Los enlaces marcados como afiliados pueden generar una comisión para el
            sitio.
          </p>
          <p>© {new Date().getFullYear()} ArrendadorCO. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
