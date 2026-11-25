import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contacto / FAQ',
  alternates: { canonical: '/contacto' },
  description: 'Preguntas frecuentes y formulario de contacto de ArrendadorCO.',
};

export default function Contacto() {
  return <ContactForm />;
}