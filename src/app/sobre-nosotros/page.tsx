import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description: 'Conoce al equipo detrás de ArrendadorCO y nuestra misión de ayudar a pequeños arrendadores en Colombia.',
};

export default function SobreNosotros() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6">Sobre Nosotros</h1>
      <p className="mb-4">
        ArrendadorCO nació de una necesidad real: los pequeños arrendadores en
        Colombia no tienen acceso fácil a información legal y operativa clara
        sobre cómo gestionar sus inmuebles en alquiler.
      </p>
      <p className="mb-4">
        Nuestro equipo combina experiencia en gestión inmobiliaria y derecho
        civil colombiano para crear guías prácticas, plantillas editables y
        herramientas que simplifican tu día a día como arrendador.
      </p>
      <h2 className="mb-4 mt-8">Nuestra misión</h2>
      <p>
        Democratizar el conocimiento para que cualquier propietario, sin
        importar cuántos inmuebles tenga, pueda arrendar con confianza y
        cumplir con la normativa colombiana.
      </p>
    </div>
  );
}
