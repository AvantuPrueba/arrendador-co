'use client';

import { useState, FormEvent } from 'react';
import { CreditCard, LockKeyhole, Loader2 } from 'lucide-react';
import { isValidEmail, normalizeEmail } from '@/lib/email';
import { PRODUCT_CONFIG } from '@/lib/product';

export const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'spaceyisusshop@gmail.com';

type Status = 'idle' | 'submitting' | 'sent';

export default function CheckoutForm({ paymentLink }: { paymentLink: string | null }) {
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captureFailed, setCaptureFailed] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!paymentLink || status === 'submitting') return;

    const normalized = normalizeEmail(email);
    if (!isValidEmail(normalized)) {
      setError('Escribe un correo electrónico válido.');
      return;
    }
    if (!accepted) {
      setError('Debes aceptar los Términos y Condiciones para continuar.');
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
      if (!response.ok) throw new Error('error');
      captured = body?.captured === true;
    } catch {
      captured = false;
    }

    setStatus('sent');
    if (!captured) setCaptureFailed(true);
    window.location.href = paymentLink;
  }

  if (!paymentLink) {
    return (
      <div className="mt-6">
        <button type="button" disabled className="w-full rounded-xl bg-slate-300 px-8 py-3.5 font-semibold text-white cursor-not-allowed">
          Compra próximamente disponible
        </button>
        <p className="mt-3 text-sm text-slate-500">Estamos terminando de configurar los pagos.</p>
      </div>
    );
  }

  const submitting = status === 'submitting' || status === 'sent';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="checkout-email" className="mb-1.5 block text-sm font-semibold text-slate-900">
          Correo electrónico
        </label>
        <input
          id="checkout-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="nombre@correo.com"
          required
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }}
          disabled={submitting}
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-slate-50"
        />
      </div>

      <label className="flex items-start gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          disabled={submitting}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600"
        />
        <span>
          Leí y acepto los <a href="/terminos-y-condiciones" className="text-teal-600 hover:underline">Términos y Condiciones</a>.
          Consulta nuestra <a href="/politica-de-datos" className="text-teal-600 hover:underline">Política de Datos</a>.
        </span>
      </label>

      {error && (
        <p role="alert" className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-3.5 font-semibold text-white transition-all hover:bg-teal-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Preparando pago...
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5" aria-hidden="true" />
            Continuar con Mercado Pago
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
        <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
        Pago procesado de forma segura por Mercado Pago.
      </p>

      {status === 'sent' && (
        <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
          Procesando tu compra… Serás redirigido a Mercado Pago.
          {captureFailed && (
            <>
              <br />
              <strong>No pudimos guardar tu correo</strong>, así que{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">escríbenos</a> en cuanto pagues y te enviamos la plantilla.
            </>
          )}
        </p>
      )}

      <p className="text-xs text-slate-500">
        Serás redirigido a Mercado Pago para completar el pago. Una vez confirmado, recibirás la
        plantilla en tu correo. Si tienes problemas, escríbenos a{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">{SUPPORT_EMAIL}</a>.
      </p>
      <p className="text-xs text-slate-500">{PRODUCT_CONFIG.disclaimer}</p>
    </form>
  );
}
