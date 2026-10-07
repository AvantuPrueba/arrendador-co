'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Clock, XCircle, Loader2 } from 'lucide-react';

type Estado = 'cargando' | 'approved' | 'pending' | 'rejected' | 'error';

function Contenido() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const [estado, setEstado] = useState<Estado>('cargando');

  useEffect(() => {
    if (!paymentId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEstado('error');
      return;
    }
    let cancelado = false;
    fetch(`/api/payments/verify?payment_id=${encodeURIComponent(paymentId)}`)
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (cancelado) return;
        if (!ok) {
          setEstado('error');
          return;
        }
        if (data.status === 'approved') setEstado('approved');
        else if (data.status === 'pending' || data.status === 'in_process') setEstado('pending');
        else if (data.status === 'rejected' || data.status === 'cancelled') setEstado('rejected');
        else setEstado('error');
      })
      .catch(() => {
        if (!cancelado) setEstado('error');
      });
    return () => {
      cancelado = true;
    };
  }, [paymentId]);

  if (estado === 'cargando') {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <Loader2 className="h-10 w-10 animate-spin text-teal-600 motion-reduce:animate-none" aria-hidden="true" />
        <p className="text-slate-600">Estamos comprobando tu compra...</p>
      </div>
    );
  }

  if (estado === 'approved') {
    return (
      <div className="py-20 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-teal-600" aria-hidden="true" />
        <h1 className="mb-3 text-3xl font-bold text-slate-900">¡Pago confirmado!</h1>
        <p className="mb-8 text-slate-600">Recibirás la plantilla en tu correo tras la verificación.</p>
        <Link href="/" className="rounded-xl bg-slate-900 px-8 py-3.5 font-semibold text-white hover:bg-slate-800">
          Ir al inicio
        </Link>
      </div>
    );
  }

  if (estado === 'pending') {
    return (
      <div className="py-20 text-center">
        <Clock className="mx-auto mb-4 h-14 w-14 text-amber-500" aria-hidden="true" />
        <h1 className="mb-3 text-3xl font-bold text-slate-900">Pago pendiente</h1>
        <p className="mb-8 text-slate-600">Tu pago está siendo procesado. Te notificaremos cuando se confirme.</p>
        <Link href="/" className="rounded-xl bg-slate-900 px-8 py-3.5 font-semibold text-white hover:bg-slate-800">
          Ir al inicio
        </Link>
      </div>
    );
  }

  if (estado === 'rejected') {
    return (
      <div className="py-20 text-center">
        <XCircle className="mx-auto mb-4 h-14 w-14 text-red-500" aria-hidden="true" />
        <h1 className="mb-3 text-3xl font-bold text-slate-900">No se completó el pago</h1>
        <p className="mb-8 text-slate-600">El pago fue rechazado o cancelado. Puedes intentarlo de nuevo.</p>
        <Link href="/tienda" className="rounded-xl bg-slate-900 px-8 py-3.5 font-semibold text-white hover:bg-slate-800">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="py-20 text-center">
      <XCircle className="mx-auto mb-4 h-14 w-14 text-slate-400" aria-hidden="true" />
      <h1 className="mb-3 text-3xl font-bold text-slate-900">No pudimos verificar tu compra</h1>
      <p className="mb-8 text-slate-600">Si realizaste el pago, contacta a soporte con tu comprobante.</p>
      <Link href="/contacto" className="rounded-xl bg-slate-900 px-8 py-3.5 font-semibold text-white hover:bg-slate-800">
        Contacto
      </Link>
    </div>
  );
}

export default function CompraResultado() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <Suspense
        fallback={
          <div className="flex flex-col items-center gap-4 py-20">
            <Loader2 className="h-10 w-10 animate-spin text-teal-600 motion-reduce:animate-none" aria-hidden="true" />
            <p className="text-slate-600">Estamos comprobando tu compra...</p>
          </div>
        }
      >
        <Contenido />
      </Suspense>
    </div>
  );
}
