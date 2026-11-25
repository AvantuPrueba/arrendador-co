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
        ArrendadorCO es una plataforma digital de contenido informativo. Reunimos
        guías prácticas, plantillas editables y herramientas gratuitas basadas en
        normativa pública de vivienda urbana en Colombia, dirigidas a pequeños
        propietarios y arrendadores que gestionan sus inmuebles por su cuenta.
      </p>
      <h2 className="mb-4 mt-8">Nuestra misión</h2>
      <p>
        Democratizar el conocimiento para que cualquier propietario, sin
        importar cuántos inmuebles tenga, pueda arrendar con confianza y
        cumplir con la normativa colombiana.
      </p>
      <p className="mt-8 text-sm text-gray-600">
        Nuestros documentos y guías son informativos y no constituyen asesoría
        jurídica personalizada. Para casos concretos, consulta con un profesional.
      </p>
    </div>
  );
}
