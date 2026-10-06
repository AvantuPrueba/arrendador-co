'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  DollarSign,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Info,
} from 'lucide-react';
import {
  RENTABILIDAD_DEFAULTS,
  calcularRentabilidad,
  type ResultadoRentabilidad,
} from '@/lib/rentabilidad-config';

function formatMiles(valor: string): string {
  const digitos = valor.replace(/\D/g, '');
  if (!digitos) return '';
  return Number(digitos).toLocaleString('es-CO');
}

function aNumero(valor: string): number {
  const digitos = valor.replace(/\D/g, '');
  return digitos ? Number(digitos) : 0;
}

function formatCOP(valor: number): string {
  return `$${Math.round(valor).toLocaleString('es-CO')}`;
}

function formatPct(valor: number): string {
  return `${valor.toFixed(2)}%`;
}

export default function CalculadoraRentabilidad() {
  const [precio, setPrecio] = useState('');
  const [canon, setCanon] = useState('');
  const [antiguedad, setAntiguedad] = useState('');
  const [administracion, setAdministracion] = useState('');
  const [predial, setPredial] = useState('');
  const [seguro, setSeguro] = useState('');
  const [mantenimientoCOP, setMantenimientoCOP] = useState('');
  const [usaInmobiliaria, setUsaInmobiliaria] = useState(false);
  const [comision, setComision] = useState('8');
  const [vacancia, setVacancia] = useState('1');
  const [tieneSeguroArriendo, setTieneSeguroArriendo] = useState(false);
  const [error, setError] = useState('');
  const [resultado, setResultado] = useState<ResultadoRentabilidad | null>(null);

  function calcular() {
    const precioNum = aNumero(precio);
    const canonNum = aNumero(canon);
    if (precioNum === 0 || canonNum === 0) {
      setError('El precio del inmueble y el canon mensual son obligatorios y deben ser mayores que cero.');
      setResultado(null);
      return;
    }
    const mantenimientoPct = (aNumero(mantenimientoCOP) / precioNum) * 100;
    const r = calcularRentabilidad(
      precioNum,
      canonNum,
      Number(antiguedad) || 0,
      {
        administracionMensual: aNumero(administracion),
        comisionInmobiliaria: usaInmobiliaria ? Number(comision) || 0 : 0,
        predialAnual: aNumero(predial),
        seguroAnual: aNumero(seguro),
        mantenimientoAnual: mantenimientoPct,
      },
      Number(vacancia) || 0,
    );
    setResultado(r);
    setError('');
  }

  function recalcular() {
    setResultado(null);
    setError('');
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      {/* Hero */}
      <header className="mb-12">
        <h1 className="mb-4 text-3xl md:text-4xl font-bold text-navy-900">
          Calculadora de rentabilidad de inmuebles
        </h1>
        <p className="max-w-2xl text-lg text-gray-600">
          Calcula la rentabilidad neta real de tu inmueble, incluyendo gastos, vacancia y comparación con un CDT.
        </p>
      </header>

      {/* Sección 1: Datos del inmueble */}
      <section className="mb-8 rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <Home className="w-6 h-6 text-navy-600" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-navy-900">Datos del inmueble</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Precio de compra o avalúo (COP)</span>
            <input type="text" inputMode="numeric" value={precio} onChange={(e) => setPrecio(formatMiles(e.target.value))} placeholder="250.000.000" className="w-full rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Canon mensual actual (COP)</span>
            <input type="text" inputMode="numeric" value={canon} onChange={(e) => setCanon(formatMiles(e.target.value))} placeholder="1.200.000" className="w-full rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Antigüedad del inmueble (años)</span>
            <input type="number" min="0" value={antiguedad} onChange={(e) => setAntiguedad(e.target.value)} placeholder="5" className="w-full rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none" />
          </label>
        </div>
      </section>

      {/* Sección 2: Costos anuales */}
      <section className="mb-8 rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <DollarSign className="w-6 h-6 text-navy-600" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-navy-900">Costos anuales</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Administración mensual (COP)</span>
            <input type="text" inputMode="numeric" value={administracion} onChange={(e) => setAdministracion(formatMiles(e.target.value))} placeholder="0" className="w-full rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Predial anual (COP)</span>
            <input type="text" inputMode="numeric" value={predial} onChange={(e) => setPredial(formatMiles(e.target.value))} placeholder="0" className="w-full rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none" />
            <span className="mt-1 block text-xs text-gray-500">Suele estar entre 0,4% y 1,0% del avalúo catastral</span>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Seguro anual (COP)</span>
            <input type="text" inputMode="numeric" value={seguro} onChange={(e) => setSeguro(formatMiles(e.target.value))} placeholder="0" className="w-full rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Mantenimiento anual (COP)</span>
            <input type="text" inputMode="numeric" value={mantenimientoCOP} onChange={(e) => setMantenimientoCOP(formatMiles(e.target.value))} placeholder="0" className="w-full rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none" />
            <span className="mt-1 block text-xs text-gray-500">Suele estar entre 0,5% y 1,5% del valor del inmueble</span>
          </label>
        </div>

        <div className="mt-6">
          <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
            <input type="checkbox" checked={usaInmobiliaria} onChange={(e) => setUsaInmobiliaria(e.target.checked)} className="h-4 w-4 rounded border-navy-200 text-navy-600" />
            ¿Usas inmobiliaria para administrar?
          </label>
          {usaInmobiliaria && (
            <label className="mt-4 block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Comisión (% del canon)</span>
              <input type="number" min="0" max="100" value={comision} onChange={(e) => setComision(e.target.value)} className="w-40 rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none" />
              <span className="mt-1 block text-xs text-gray-500">Comisión típica de administración: 8% - 12% del canon</span>
            </label>
          )}
        </div>
      </section>

      {/* Sección 3: Riesgo */}
      <section className="mb-8 rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-navy-600" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-navy-900">Riesgo</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Meses de vacancia al año</span>
            <input type="number" min="0" max="12" value={vacancia} onChange={(e) => setVacancia(e.target.value)} className="w-40 rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none" />
            <span className="mt-1 block text-xs text-gray-500">Un inmueble suele estar vacío al menos 1 mes al año</span>
          </label>
          <label className="inline-flex items-start gap-2 pt-6 text-sm font-medium text-gray-700">
            <input type="checkbox" checked={tieneSeguroArriendo} onChange={(e) => setTieneSeguroArriendo(e.target.checked)} className="mt-1 h-4 w-4 rounded border-navy-200 text-navy-600" />
            ¿Tienes seguro de arrendamiento?
          </label>
        </div>
      </section>

      {error && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button type="button" onClick={calcular} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-navy-600 px-8 py-3 font-semibold text-white hover:bg-navy-700 transition-colors">
        Calcular rentabilidad
      </button>

      {!resultado && !error && (
        <p className="mt-6 text-gray-500">
          Completa los datos para ver la rentabilidad neta de tu inmueble.
        </p>
      )}

      {/* Resultados */}
      {resultado && (
        <div className="mt-12">
          {/* Diagnóstico */}
          <div
            className={`mb-8 rounded-xl border p-6 ${
              resultado.diagnostico === 'supera_cdt'
                ? 'border-green-200 bg-green-50'
                : resultado.diagnostico === 'similar_cdt'
                  ? 'border-amber-200 bg-amber-50'
                  : 'border-red-200 bg-red-50'
            }`}
          >
            <div className="mb-2 flex items-center gap-2">
              {resultado.diagnostico === 'supera_cdt' ? (
                <TrendingUp className="w-6 h-6 text-green-700" aria-hidden="true" />
              ) : resultado.diagnostico === 'por_debajo_cdt' ? (
                <TrendingDown className="w-6 h-6 text-red-700" aria-hidden="true" />
              ) : (
                <Info className="w-6 h-6 text-amber-700" aria-hidden="true" />
              )}
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${
                  resultado.diagnostico === 'supera_cdt'
                    ? 'bg-green-100 text-green-800'
                    : resultado.diagnostico === 'similar_cdt'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                }`}
              >
                {resultado.diagnostico === 'supera_cdt'
                  ? 'Por encima del CDT'
                  : resultado.diagnostico === 'similar_cdt'
                    ? 'Similar al CDT'
                    : 'Por debajo del CDT'}
              </span>
            </div>
            <p className="text-gray-700">
              {resultado.diagnostico === 'supera_cdt'
                ? 'Tu inmueble tiene una rentabilidad por encima del promedio del mercado. Recuerda que la valorización no está incluida en este cálculo.'
                : resultado.diagnostico === 'similar_cdt'
                  ? 'La rentabilidad está en línea con un CDT. Considera si la valorización esperada justifica la inversión.'
                  : 'Tu inmueble renta menos que un CDT. Esto no significa que sea una mala inversión —la valorización no está incluida—, pero el flujo de caja mensual no es eficiente.'}
            </p>
          </div>

          {/* Bloque 1: Resumen del cálculo */}
          <section className="mb-8 rounded-xl bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-navy-900">Resumen del cálculo</h2>
            <dl className="space-y-2 text-gray-700">
              <div className="flex justify-between"><dt>Ingreso bruto anual</dt><dd className="font-semibold text-navy-900">{formatCOP(resultado.ingresoBruto)}</dd></div>
              <div className="flex justify-between"><dt>Costos totales anuales</dt><dd className="font-semibold text-navy-900">{formatCOP(resultado.costosTotales)}</dd></div>
              <div className="flex justify-between"><dt>Pérdida por vacancia</dt><dd className="font-semibold text-navy-900">{formatCOP(resultado.perdidaVacancia)}</dd></div>
              <div className="flex justify-between border-t border-gray-200 pt-2"><dt>Ingreso neto anual</dt><dd className="font-semibold text-navy-900">{formatCOP(resultado.ingresoNeto)}</dd></div>
            </dl>
          </section>

          {/* Bloque 2: Rentabilidad */}
          <section className="mb-8 rounded-xl bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-navy-900">Rentabilidad</h2>
            <dl className="space-y-2 text-gray-700">
              <div className="flex justify-between"><dt>Rentabilidad bruta</dt><dd className="font-semibold text-navy-900">{formatPct(resultado.rentabilidadBruta)}</dd></div>
              <div className="flex justify-between">
                <dt>Rentabilidad neta real</dt>
                <dd className="text-2xl font-bold text-navy-900">{formatPct(resultado.rentabilidadNeta)}</dd>
              </div>
              <div className="flex justify-between"><dt>Diferencia bruta vs neta</dt><dd className="font-semibold text-navy-900">{formatPct(resultado.rentabilidadBruta - resultado.rentabilidadNeta)} puntos</dd></div>
            </dl>
          </section>

          {/* Bloque 3: Comparación con CDT */}
          <section className="mb-8 rounded-xl bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-navy-900">Comparación con CDT</h2>
            <dl className="space-y-2 text-gray-700">
              <div className="flex justify-between"><dt>Tasa CDT de referencia</dt><dd className="font-semibold text-navy-900">{RENTABILIDAD_DEFAULTS.tasaCDT}% E.A.</dd></div>
              <div className="flex justify-between"><dt>Rentabilidad neta real del inmueble</dt><dd className="font-semibold text-navy-900">{formatPct(resultado.rentabilidadNeta)}</dd></div>
              <div className="flex justify-between"><dt>Diferencia</dt><dd className="font-semibold text-navy-900">{resultado.diferenciaConCDT >= 0 ? '+' : ''}{resultado.diferenciaConCDT.toFixed(2)} puntos porcentuales</dd></div>
            </dl>
          </section>

          {/* ¿Cómo se calcula? */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-navy-900">¿Cómo se calcula?</h2>
            <p className="mb-2 text-gray-600">
              Ingreso bruto anual = canon × 12. Costos totales = administración × 12 + comisión (% del canon) × 12 + predial + seguro + mantenimiento. Pérdida por vacancia = canon × meses de vacancia. Ingreso neto = bruto − costos − vacancia. Rentabilidad neta = ingreso neto ÷ precio × 100.
            </p>
            <p className="text-sm text-gray-500">
              Tus datos: canon {formatCOP(aNumero(canon))}, precio {formatCOP(aNumero(precio))}, vacancia {Number(vacancia) || 0} meses, comisión {usaInmobiliaria ? comision : 0}% {usaInmobiliaria ? '(inmobiliaria)' : '(sin inmobiliaria)'}.
            </p>
          </section>

          {/* Advertencia */}
          <div className="mb-8 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5">
            <p className="text-amber-800">
              Esta calculadora es orientativa. No incluye valorización, efectos tributarios individuales ni condiciones de mercado local. No es asesoría financiera ni de inversión. Para decisiones importantes, consulta con un profesional.
            </p>
          </div>

          {/* CTA final */}
          <section className="mb-8 rounded-xl border border-navy-100 bg-navy-50 p-6">
            <h2 className="mb-2 text-xl font-semibold text-navy-900">¿Quieres estimar mejor los costos?</h2>
            <p className="mb-4 text-gray-600">Consulta nuestra guía de fiscalidad para arrendadores.</p>
            <div className="flex flex-wrap gap-6">
              <Link href="/guias/fiscalidad" className="font-semibold text-navy-600 hover:underline">
                Guía de fiscalidad →
              </Link>
              <Link href="/herramientas/reajuste-canon" className="font-semibold text-navy-600 hover:underline">
                ¿Ya tienes claro el canon? Revisa si puedes reajustarlo →
              </Link>
            </div>
          </section>

          <button type="button" onClick={recalcular} className="rounded-xl border border-navy-200 px-6 py-3 font-semibold text-navy-700 hover:bg-navy-50 transition-colors">
            Recalcular
          </button>
        </div>
      )}
    </div>
  );
}
