import Link from 'next/link';
import ConsentPreferencesButton from './ConsentPreferencesButton';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t-2 border-bronze/30 bg-charcoal text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12 mb-12">
          {/* Brand info */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-baseline mb-3" aria-label="ArrendadorCO - Inicio">
              <span className="font-display text-2xl font-normal text-white">
                Arrendador
              </span>
              <span className="ml-0.5 font-mono text-xs font-semibold tracking-wider text-bright-bronze uppercase">
                CO
              </span>
            </Link>
            <p className="font-mono text-xs text-white/60 leading-relaxed mb-4">
              Información práctica para arrendadores en Colombia.
            </p>
            <p className="text-xs text-white/50 leading-relaxed">
              Guías, plantillas y herramientas para administrar inmuebles urbanos con seguridad jurídica.
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Navegación del sitio">
            <h4 className="font-mono text-xs uppercase tracking-wider text-bright-bronze mb-4 font-medium">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/guias" className="text-white/70 hover:text-white transition-colors">
                  Guías prácticas
                </Link>
              </li>
              <li>
                <Link href="/herramientas" className="text-white/70 hover:text-white transition-colors">
                  Herramientas gratuitas
                </Link>
              </li>
              <li>
                <Link href="/tienda" className="text-white/70 hover:text-white transition-colors">
                  Plantilla de contrato
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 hover:text-white transition-colors">
                  Blog inmobiliario
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Información legal">
            <h4 className="font-mono text-xs uppercase tracking-wider text-bright-bronze mb-4 font-medium">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/terminos-y-condiciones" className="text-white/70 hover:text-white transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/politica-de-datos" className="text-white/70 hover:text-white transition-colors">
                  Política de tratamiento de datos
                </Link>
              </li>
              <li>
                <Link href="/retracto-y-devoluciones" className="text-white/70 hover:text-white transition-colors">
                  Derecho de retracto
                </Link>
              </li>
              <li>
                <Link href="/aviso-legal" className="text-white/70 hover:text-white transition-colors">
                  Aviso legal
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contacto & Autoridad */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-bright-bronze mb-4 font-medium">
              Contacto y Vigilancia
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex flex-col">
                <span className="text-xs text-white/50">Correo de atención:</span>
                <a href="mailto:hola@arrendador.co" className="text-bright-bronze hover:underline font-mono text-xs mt-0.5">
                  hola@arrendador.co
                </a>
              </li>
              <li>
                <span className="text-xs text-white/50">Jurisdicción:</span>
                <p className="text-xs text-white/80">Colombia (Ley 820 de 2003)</p>
              </li>
              <li className="pt-1">
                <span className="text-xs text-white/50 block mb-1">Protección al consumidor:</span>
                <a
                  href="https://www.sic.gov.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/70 hover:text-white underline decoration-white/30 transition-colors"
                >
                  Superintendencia de Industria y Comercio — sic.gov.co
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            © {CURRENT_YEAR} ArrendadorCO. Contenido informativo. No constituye asesoría legal ni financiera.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/politica-de-datos" className="hover:text-white transition-colors">
              Política de datos
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/terminos-y-condiciones" className="hover:text-white transition-colors">
              Términos
            </Link>
            <span className="text-white/20">·</span>
            <ConsentPreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
