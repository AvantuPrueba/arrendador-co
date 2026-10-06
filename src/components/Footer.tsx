import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-800">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold text-white mb-4 block" aria-label="ArrendadorCO - Inicio">
              ArrendadorCO
            </Link>
            <p className="text-navy-300 text-sm max-w-xs">
              Información práctica para arrendadores en Colombia. Guías, plantillas y herramientas para arrendar con confianza.
            </p>
          </div>

          <nav aria-label="Navegación principal">
            <h4 className="font-semibold text-white mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guias" className="text-navy-300 hover:text-teal-300 transition-colors">Guías</Link></li>
              <li><Link href="/herramientas" className="text-navy-300 hover:text-teal-300 transition-colors">Herramientas</Link></li>
              <li><Link href="/tienda" className="text-navy-300 hover:text-teal-300 transition-colors">Plantillas</Link></li>
              <li><Link href="/blog" className="text-navy-300 hover:text-teal-300 transition-colors">Blog</Link></li>
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terminos-y-condiciones" className="text-navy-300 hover:text-teal-300 transition-colors">Términos y condiciones</Link></li>
              <li><Link href="/politica-de-datos" className="text-navy-300 hover:text-teal-300 transition-colors">Política de datos</Link></li>
              <li><Link href="/retracto-y-devoluciones" className="text-navy-300 hover:text-teal-300 transition-colors">Retracto y devoluciones</Link></li>
              <li><Link href="/aviso-legal" className="text-navy-300 hover:text-teal-300 transition-colors">Aviso legal</Link></li>
            </ul>
          </nav>

          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-navy-300">
              <li>Email: <a href="mailto:hola@arrendador.co" className="hover:text-teal-300 transition-colors">hola@arrendador.co</a></li>
              <li>Colombia</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-navy-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-400">
            © {new Date().getFullYear()} ArrendadorCO. Todos los derechos reservados.
          </p>
          <p className="text-xs text-navy-500">
            Contenido informativo. No asesoría legal. Consulta a un profesional.
          </p>
          <div className="flex items-center gap-4">
            <a href="/politica-de-datos" className="text-xs text-navy-400 hover:text-teal-300">Política de datos</a>
            <span className="text-navy-700">·</span>
            <a href="/terminos-y-condiciones" className="text-xs text-navy-400 hover:text-teal-300">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}