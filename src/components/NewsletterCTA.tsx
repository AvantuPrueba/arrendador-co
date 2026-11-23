'use client';

import { useState, FormEvent } from 'react';
import { isValidEmail, normalizeEmail } from '@/lib/email';
import Link from 'next/link';
import { PRODUCT_CONFIG } from '@/lib/product';
import { CheckCircle2 } from 'lucide-react';

/** Endpoint de FormSubmit para newsletter. */
const FORMSUBMIT_NEWSLETTER_URL = 'https://formsubmit.co/spaceyisusshop@gmail.com';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function NewsletterCTA({
  source = 'newsletter-footer',
  hideHeader = false,
}: { source?: string; hideHeader?: boolean } = {}) {
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
      <div className="rounded-xl border border-green-mid/20 bg-green-deep/5 p-6 text-center" role="status">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-deep text-white">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <p className="font-display text-lg text-green-deep">¡Te has suscrito con éxito!</p>
        <p className="mt-1 text-sm text-muted">
          Recibirás nuestras guías y herramientas para arrendadores en tu correo.
        </p>
      </div>
    );
  }

  return (
    <div className={hideHeader ? 'w-full' : 'my-8 rounded-2xl border border-charcoal/10 bg-surface p-6 sm:p-8'}>
      {!hideHeader && (
        <div className="mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-bronze">
            RECURSOS PARA ARRENDADORES
          </span>
          <h4 className="mt-1 font-display text-2xl text-charcoal">
            Recibe guías prácticas en tu correo
          </h4>
          <p className="mt-1 text-sm text-muted">
            Consejos clave y herramientas actualizadas según la Ley 820. Sin spam.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'submitting'}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `newsletter-error-${source}` : undefined}
            className="flex-1 rounded-lg border border-charcoal/25 bg-ivory px-4 py-3 text-sm text-charcoal placeholder:text-muted/60 transition-colors focus:border-green-deep focus:outline-none focus:ring-1 focus:ring-green-deep disabled:bg-black/5"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="min-h-[44px] rounded-lg bg-bronze px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#A37B48] hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'submitting' ? 'Suscribiendo…' : 'Suscribirme'}
          </button>
        </div>

        <div className="flex items-start gap-2.5">
          <input
            type="checkbox"
            id={`newsletter-consent-${source}`}
            name="consent"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            disabled={status === 'submitting'}
            className="mt-0.5 h-4 w-4 rounded border-charcoal/30 text-green-deep focus:ring-green-deep"
          />
          <label
            htmlFor={`newsletter-consent-${source}`}
            className="text-xs leading-relaxed text-muted"
          >
            Acepto la{' '}
            <Link
              href={PRODUCT_CONFIG.privacyPolicyHref}
              className="text-charcoal underline underline-offset-2 hover:text-green-deep"
            >
              política de tratamiento de datos
            </Link>
            .
          </label>
        </div>

        {error && (
          <p id={`newsletter-error-${source}`} role="alert" className="text-xs text-terracotta">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
