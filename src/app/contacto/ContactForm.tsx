'use client';

import { useState, FormEvent } from 'react';
import { isValidEmail } from '@/lib/email';

/** Endpoint de FormSubmit para formulario de contacto. */
const FORMSUBMIT_CONTACT_URL = 'https://formsubmit.co/spaceyisusshop@gmail.com';

const faqs = [
  {
    q: '¿Los contratos se ajustan a la normativa colombiana aplicable?',
    a: 'Nuestras plantillas están basadas en la normativa aplicable (Ley 820 de 2003, Código Civil, jurisprudencia) y se actualizan periódicamente. Son modelos informativos, no asesoría legal.',
  },
  {
    q: '¿Puedo editar la plantilla del contrato?',
    a: 'Sí. La plantilla viene en formato Word (.docx) y Google Docs para que la personalices con los datos de tu inmueble.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'El pago se procesa en Mercado Pago, que acepta tarjetas de crédito, débito, PSE y otros métodos disponibles en su plataforma.',
  },
  {
    q: '¿Ofrecen asesoría legal personalizada?',
    a: 'No. Somos un sitio de contenido informativo. Para casos específicos, recomendamos consultar con un abogado.',
  },
];

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Escribe tu nombre.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Escribe un correo electrónico válido.');
      return;
    }
    if (message.trim().length < 10) {
      setError('El mensaje debe tener al menos 10 caracteres.');
      return;
    }

    setStatus('submitting');

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('email', email);
      formData.append('message', message.trim());
      formData.append('website', ''); // honeypot
      formData.append('_subject', 'Nuevo mensaje de contacto - ArrendadorCO');
      formData.append('_captcha', 'false');
      formData.append('_next', 'https://tudominio.com/gracias');

      const res = await fetch(FORMSUBMIT_CONTACT_URL, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Error del servidor');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'No se pudo enviar. Intenta de nuevo.');
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-4 text-center">Contacto y Preguntas Frecuentes</h1>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="mb-6">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border border-gray-200 p-5">
              <h3 className="mb-2 font-semibold text-gray-900">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section>
        <h2 className="mb-6">Escríbenos</h2>

        {status === 'success' && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 text-center text-green-700" role="status">
            <p className="font-semibold">Mensaje enviado correctamente.</p>
            <p className="text-sm">Te responderemos a la brevedad.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'submitting'}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'submitting'}
              aria-invalid={error ? true : undefined}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              minLength={10}
              maxLength={5000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === 'submitting'}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50"
              placeholder="¿En qué podemos ayudarte?"
            />
          </div>

          {/* Honeypot anti-spam (invisible para humanos) */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full rounded-md bg-blue-600 px-8 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {status === 'submitting' ? 'Enviando…' : 'Enviar mensaje'}
          </button>

          {error && (
            <p role="alert" className="text-sm text-red-600 text-center">
              {error}
            </p>
          )}
        </form>
      </section>
    </div>
  );
}