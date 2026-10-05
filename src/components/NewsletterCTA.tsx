'use client';

import { useState, FormEvent } from 'react';
import { isValidEmail, normalizeEmail } from '@/lib/email';
import Link from 'next/link';
import { PRODUCT_CONFIG } from '@/lib/product';

/** Endpoint de FormSubmit para newsletter. */
const FORMSUBMIT_NEWSLETTER_URL = 'https://formsubmit.co/spaceyisusshop@gmail.com';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function NewsletterCTA({
  source = 'newsletter-footer',
}: { source?: string } = {}) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!consent) {
      setError('Debes aceptar la política de tratamiento de datos.');
      return;
    }

    const normalized = normalizeEmail(email);
    if (!isValidEmail(normalized)) {
      setError('Escribe un correo electrónico válido.');
      return;
    }

    setStatus('submitting');

    try {
      const formData = new FormData();
      formData.append('email', normalized);
      formData.append('source', source);
      formData.append('consent', 'true');
      formData.append('_subject', 'Nuevo suscriptor - ArrendadorCO');
      formData.append('_captcha', 'false');
      formData.append('_next', 'https://tudominio.com/gracias');

      const res = await fetch(FORMSUBMIT_NEWSLETTER_URL, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Error del servidor');
      }

      setStatus('success');
      setEmail('');
      setConsent(false);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'No se pudo suscribir. Intenta de nuevo.');
    }
  }

  if (status === 'success') {
    return (
      <div className="my-8 rounded-lg bg-green-50 p-6 text-center" role="status">
        <p className="font-semibold text-green-700">¡Te has suscrito correctamente!</p>
        <p className="mt-1 text-sm text-green-600">
          Recibirás nuestras guías prácticas en tu correo.
        </p>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-lg bg-gray-100 p-6">
      <h4 className="mb-2 text-lg font-semibold text-gray-800">
        📬 Recibe guías prácticas en tu correo
      </h4>
      <p className="mb-4 text-sm text-gray-600">
        Suscríbete y recibe consejos semanales para arrendadores en Colombia.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor={`newsletter-email-${source}`} className="sr-only">
            Tu correo electrónico
          </label>
          <input
            id={`newsletter-email-${source}`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'submitting'}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'newsletter-error' : undefined}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {status === 'submitting' ? 'Suscribiendo…' : 'Suscribirme'}
          </button>
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id={`newsletter-consent-${source}`}
            name="consent"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            disabled={status === 'submitting'}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor={`newsletter-consent-${source}`}
            className="text-xs text-gray-600"
          >
            Acepto la{' '}
            <Link
              href={PRODUCT_CONFIG.privacyPolicyHref}
              className="underline hover:text-blue-700"
            >
              política de tratamiento de datos
            </Link>
            .
          </label>
        </div>

        {error && (
          <p id="newsletter-error" role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}