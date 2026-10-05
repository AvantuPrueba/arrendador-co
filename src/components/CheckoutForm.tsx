'use client';

import { useState, FormEvent } from 'react';
import { isValidEmail, normalizeEmail } from '@/lib/email';
import { PRODUCT_CONFIG } from '@/lib/product';

/**
 * Microcopy de la sección de pago. El texto exacto es el aprobado por el
 * fundador; solo el correo de soporte es un placeholder pendiente.
 */
export const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || '[PENDIENTE: correo electrónico]';

const INVALID_EMAIL_MESSAGE = 'Escribe un correo electrónico válido.';

type Status = 'idle' | 'submitting' | 'sent';

export default function CheckoutForm({ paymentLink }: { paymentLink: string | null }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [captureFailed, setCaptureFailed] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!paymentLink || status === 'submitting') return;

    const normalized = normalizeEmail(email);

    if (!isValidEmail(normalized)) {
      setError(INVALID_EMAIL_MESSAGE);
      return;
    }

    setError(null);
    setCaptureFailed(false);
    setStatus('submitting');

    let captured = false;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalized, source: 'tienda' }),
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(typeof body?.error === 'string' ? body.error : 'error desconocido');
      }

      captured = body?.captured === true;
    } catch (requestError) {
      // Perder el correo NO puede impedir la venta. Registramos el motivo y
      // dejamos que la persona pague igual.
      console.error('[checkout] no se pudo registrar el correo', requestError);
      captured = false;
    }

    setStatus('sent');

    if (!captured) {
      setCaptureFailed(true);
    }

    // Redirect normal (no window.open) — cumple requisito de auditoría
    window.location.href = paymentLink;
  }

  if (!paymentLink) {
    return (
      <div className="mt-6 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <p className="font-semibold">El pago en línea no está disponible todavía.</p>
        <p className="mt-1">
          Estamos terminando de configurarlo. Escríbenos a{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">
            {SUPPORT_EMAIL}
          </a>{' '}
          y te ayudamos.
        </p>
      </div>
    );
  }

  const submitted = status === 'sent';

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} noValidate>
        <label
          htmlFor="checkout-email"
          className="mb-2 block text-sm font-semibold text-gray-900"
        >
          Tu correo electrónico (para enviarte la plantilla)
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="checkout-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError(null);
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'checkout-email-error' : undefined}
            placeholder="tu@email.com"
            disabled={submitted}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
          />

          <button
            type="submit"
            disabled={status === 'submitting' || submitted}
            className="shrink-0 rounded-md bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Comprar plantilla — COP 45.000
          </button>
        </div>

        {error && (
          <p id="checkout-email-error" role="alert" className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </form>

      {submitted && (
        <p role="status" className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800">
          Procesando tu compra… Serás redirigido a Mercado Pago.
          {captureFailed && (
            <>
              <br />
              <strong>No pudimos guardar tu correo</strong>, así que{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">
                escríbenos
              </a>{' '}
              en cuanto pagues y te enviamos la plantilla.
            </>
          )}
        </p>
      )}

      <p className="mt-4 text-xs text-gray-500">
        Serás redirigido a Mercado Pago para completar el pago de forma segura. Una vez confirmado,
        recibirás la plantilla en tu correo en menos de 24 horas hábiles. Si tienes problemas, escríbenos
        a <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">{SUPPORT_EMAIL}</a>.
      </p>

      <p className="mt-2 text-xs text-gray-500">
        {PRODUCT_CONFIG.disclaimer}
      </p>
    </div>
  );
}