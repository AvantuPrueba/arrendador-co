'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Clock,
  Info,
} from 'lucide-react';
import { IPC_CONFIG, calcularReajuste } from '@/lib/ipc-config';

type Resultado = ReturnType<typeof calcularReajuste>;

function formatFecha(fecha: Date): string {
  return fecha.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatCOP(valor: number): string {
  return `$${valor.toLocaleString('es-CO')}`;
}

export default function CalculadoraCanon() {
  const [canon, setCanon] = useState('');
  const [fecha, setFecha] = useState('');
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [diasFaltantes, setDiasFaltantes] = useState(0);
  const [copiado, setCopiado] = useState(false);

  function calcular() {
    const canonNumero = Number(canon);
    const fechaInicio = new Date(`${fecha}T00:00:00`);
    if (!canonNumero || canonNumero <= 0 || Number.isNaN(fechaInicio.getTime())) {
      return;
    }
    const r = calcularReajuste(canonNumero, fechaInicio);
    setResultado(r);
    setDiasFaltantes(
      r.procede
        ? 0
        : Math.max(0, Math.ceil((r.fechaDisponible.getTime() - Date.now()) / 86400000)),
    );
    setCopiado(false);
  }

  async function copiarCalculo() {
    if (!resultado || !resultado.procede) return;
    const texto = [
      `Canon actual: ${formatCOP(Number(canon))}`,
      `IPC aplicable: ${resultado.ipcAplicable}%`,
      `Aumento por IPC: ${formatCOP(resultado.aumento)}`,
      `Canon resultante: ${formatCOP(resultado.nuevoCanon)}`,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
    } catch {
      setCopiado(false);
    }
  }

  const masDeUnAnio =
    resultado && resultado.procede && resultado.mesesTranscurridos >= 24;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      {/* Hero */}
      <header className="mb-12">
        <h1 className="mb-4 text-3xl md:text-4xl font-bold text-navy-900">
          Calculadora de reajuste del canon de arrendamiento
        </h1>
        <p className="max-w-2xl text-lg text-gray-600">
          Calcula cuándo puedes reajustar el canon y cuánto representa el incremento según el IPC aplicable.
        </p>
      </header>

      {/* Inputs */}
      <section className="mb-12 rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <Calculator className="w-6 h-6 text-navy-600" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-navy-900">Ingresa los datos</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Canon actual (COP)</span>
            <input
              type="number"
              min="0"
              value={canon}
              onChange={(e) => setCanon(e.target.value)}
              placeholder="1200000"
              className="w-full rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              ¿Desde cuándo cobras el canon actual?
            </span>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={calcular}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-navy-600 px-6 py-3 font-semibold text-white hover:bg-navy-700 transition-colors"
        >
          <Calendar className="w-5 h-5" aria-hidden="true" />
          Calcular reajuste
        </button>
      </section>

      {/* Resultado */}
      {resultado && (
        <section className="mb-12" aria-live="polite">
          {resultado.procede && !masDeUnAnio && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 border border-green-200">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Reajuste disponible
              </span>
              <p className="mb-4 text-gray-700">
                Cumpliste 12 meses el {formatFecha(calcularFecha12Meses(fecha))}.
              </p>
              <table className="mb-4 w-full text-left text-sm">
                <tbody>
                  <tr className="border-t border-green-200">
                    <td className="py-2 text-gray-600">Canon actual</td>
                    <td className="py-2 font-semibold text-navy-900">{formatCOP(Number(canon))}</td>
                  </tr>
                  <tr className="border-t border-green-200">
                    <td className="py-2 text-gray-600">IPC aplicable</td>
                    <td className="py-2 font-semibold text-navy-900">{resultado.ipcAplicable}%</td>
                  </tr>
                  <tr className="border-t border-green-200">
                    <td className="py-2 text-gray-600">Aumento por IPC</td>
                    <td className="py-2 font-semibold text-navy-900">{formatCOP(resultado.aumento)}</td>
                  </tr>
                  <tr className="border-t border-green-200">
                    <td className="py-2 text-gray-600">Canon resultante</td>
                    <td className="py-2 font-semibold text-navy-900">{formatCOP(resultado.nuevoCanon)}</td>
                  </tr>
                </tbody>
              </table>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={copiarCalculo}
                  className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50 transition-colors"
                >
                  {copiado ? 'Copiado' : 'Copiar cálculo'}
                </button>
                <Link href="/guias/contratos" className="text-sm font-semibold text-navy-600 hover:underline self-center">
                  Cómo notificar el reajuste →
                </Link>
              </div>
            </div>
          )}

          {resultado.procede && masDeUnAnio && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 border border-blue-200">
                <Info className="w-4 h-4" aria-hidden="true" />
                Más de un año sin reajustar
              </span>
              <p className="mb-4 text-gray-700">
                Han transcurrido más de 24 meses desde que cobraste el canon actual. Si no has reajustado en períodos anteriores, revisa con un contador cómo manejar esos reajustes acumulados: pueden tener reglas particulares y no es estándar cobrarlos todos juntos.
              </p>
              <table className="mb-4 w-full text-left text-sm">
                <tbody>
                  <tr className="border-t border-blue-200">
                    <td className="py-2 text-gray-600">Canon actual</td>
                    <td className="py-2 font-semibold text-navy-900">{formatCOP(Number(canon))}</td>
                  </tr>
                  <tr className="border-t border-blue-200">
                    <td className="py-2 text-gray-600">IPC aplicable</td>
                    <td className="py-2 font-semibold text-navy-900">{resultado.ipcAplicable}%</td>
                  </tr>
                  <tr className="border-t border-blue-200">
                    <td className="py-2 text-gray-600">Aumento por IPC</td>
                    <td className="py-2 font-semibold text-navy-900">{formatCOP(resultado.aumento)}</td>
                  </tr>
                  <tr className="border-t border-blue-200">
                    <td className="py-2 text-gray-600">Canon resultante</td>
                    <td className="py-2 font-semibold text-navy-900">{formatCOP(resultado.nuevoCanon)}</td>
                  </tr>
                </tbody>
              </table>
              <button
                type="button"
                onClick={copiarCalculo}
                className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50 transition-colors"
              >
                {copiado ? 'Copiado' : 'Copiar cálculo'}
              </button>
            </div>
          )}

          {!resultado.procede && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-200">
                <Clock className="w-4 h-4" aria-hidden="true" />
                Todavía no
              </span>
              <p className="mb-2 text-gray-700">
                Faltan {diasFaltantes} días para completar el período mínimo de 12 meses.
              </p>
              <p className="text-gray-700">
                Cumplirás los 12 meses el {formatFecha(resultado.fechaDisponible)}. A partir de esa fecha podrías aplicar el reajuste según corresponda.
              </p>
            </div>
          )}

          {/* Advertencias */}
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5">
              <p className="text-amber-800">
                Este cálculo es orientativo. El canon resultante debe respetar los demás límites legales aplicables.
              </p>
            </div>
            <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5">
              <p className="text-amber-800">{resultado.advertencia}</p>
            </div>
            <p className="text-sm text-gray-500">
              Fuente: Ley 820 de 2003, art. 20 · DANE · IPC {IPC_CONFIG.year}: {IPC_CONFIG.ipc}%
            </p>
          </div>
        </section>
      )}

      {/* Explicación */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-navy-900">¿Cómo se calcula?</h2>
        <ol className="list-decimal pl-6 text-gray-600 space-y-2">
          <li>Verifica cuántos meses completos han pasado desde que empezaste a cobrar el canon actual bajo el mismo precio.</li>
          <li>Si han pasado al menos 12 meses, identifica el IPC del año calendario inmediatamente anterior (hoy: {IPC_CONFIG.ipc}% según DANE).</li>
          <li>Calcula el aumento: canon actual × (IPC / 100).</li>
          <li>Suma el aumento al canon actual para obtener el canon resultante.</li>
        </ol>
        <p className="mt-4 text-sm text-gray-500">
          El reajuste nunca puede superar el IPC del año anterior (Ley 820 de 2003, art. 20).
        </p>
      </section>

      {/* CTA final */}
      <section className="rounded-xl border border-navy-100 bg-navy-50 p-6">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-6 h-6 text-navy-600" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-navy-900">
            ¿Necesitas comunicar el nuevo canon a tu arrendatario?
          </h2>
        </div>
        <p className="mb-4 text-gray-600">
          Revisa la guía de contratos para entender las formalidades de la notificación.
        </p>
        <Link href="/guias/contratos" className="font-semibold text-navy-600 hover:underline">
          Ver guía de contratos →
        </Link>
      </section>
    </div>
  );
}

function calcularFecha12Meses(fecha: string): Date {
  const d = new Date(`${fecha}T00:00:00`);
  d.setMonth(d.getMonth() + 12);
  return d;
}
