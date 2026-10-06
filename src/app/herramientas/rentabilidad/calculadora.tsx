'use client';

import { useState } from 'react';
import { Home, DollarSign, AlertCircle } from 'lucide-react';

function formatMiles(valor: string): string {
  const digitos = valor.replace(/\D/g, '');
  if (!digitos) return '';
  return Number(digitos).toLocaleString('es-CO');
}

function aNumero(valor: string): number {
  const digitos = valor.replace(/\D/g, '');
  return digitos ? Number(digitos) : 0;
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
  const [calculado, setCalculado] = useState(false);

  function calcular() {
    const precioNum = aNumero(precio);
    const canonNum = aNumero(canon);
    if (precioNum === 0 || canonNum === 0) {
      setError('El precio del inmueble y el canon mensual son obligatorios y deben ser mayores que cero.');
      setCalculado(false);
      return;
    }
    setError('');
    setCalculado(true);
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
            <input
              type="text"
              inputMode="numeric"
              value={precio}
              onChange={(e) => setPrecio(formatMiles(e.target.value))}
              placeholder="250.000.000"
              className="w-full rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Canon mensual actual (COP)</span>
            <input
              type="text"
              inputMode="numeric"
              value={canon}
              onChange={(e) => setCanon(formatMiles(e.target.value))}
              placeholder="1.200.000"
              className="w-full rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Antigüedad del inmueble (años)</span>
            <input
              type="number"
              min="0"
              value={antiguedad}
              onChange={(e) => setAntiguedad(e.target.value)}
              placeholder="5"
              className="w-full rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none"
            />
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
            <input
              type="text"
              inputMode="numeric"
              value={administracion}
              onChange={(e) => setAdministracion(formatMiles(e.target.value))}
              placeholder="0"
              className="w-full rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Predial anual (COP)</span>
            <input
              type="text"
              inputMode="numeric"
              value={predial}
              onChange={(e) => setPredial(formatMiles(e.target.value))}
              placeholder="0"
              className="w-full rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none"
            />
            <span className="mt-1 block text-xs text-gray-500">Suele estar entre 0,4% y 1,0% del avalúo catastral</span>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Seguro anual (COP)</span>
            <input
              type="text"
              inputMode="numeric"
              value={seguro}
              onChange={(e) => setSeguro(formatMiles(e.target.value))}
              placeholder="0"
              className="w-full rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Mantenimiento anual (COP)</span>
            <input
              type="text"
              inputMode="numeric"
              value={mantenimientoCOP}
              onChange={(e) => setMantenimientoCOP(formatMiles(e.target.value))}
              placeholder="0"
              className="w-full rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none"
            />
            <span className="mt-1 block text-xs text-gray-500">Suele estar entre 0,5% y 1,5% del valor del inmueble</span>
          </label>
        </div>

        <div className="mt-6">
          <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={usaInmobiliaria}
              onChange={(e) => setUsaInmobiliaria(e.target.checked)}
              className="h-4 w-4 rounded border-navy-200 text-navy-600"
            />
            ¿Usas inmobiliaria para administrar?
          </label>
          {usaInmobiliaria && (
            <label className="mt-4 block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Comisión (% del canon)</span>
              <input
                type="number"
                min="0"
                max="100"
                value={comision}
                onChange={(e) => setComision(e.target.value)}
                className="w-40 rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none"
              />
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
            <input
              type="number"
              min="0"
              max="12"
              value={vacancia}
              onChange={(e) => setVacancia(e.target.value)}
              className="w-40 rounded-lg border border-navy-100 px-4 py-2 text-gray-900 focus:border-navy-400 focus:outline-none"
            />
            <span className="mt-1 block text-xs text-gray-500">Un inmueble suele estar vacío al menos 1 mes al año</span>
          </label>
          <label className="inline-flex items-start gap-2 pt-6 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={tieneSeguroArriendo}
              onChange={(e) => setTieneSeguroArriendo(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-navy-200 text-navy-600"
            />
            ¿Tienes seguro de arrendamiento?
          </label>
        </div>
      </section>

      {error && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={calcular}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-navy-600 px-8 py-3 font-semibold text-white hover:bg-navy-700 transition-colors"
      >
        Calcular rentabilidad
      </button>

      {!calculado && !error && (
        <p className="mt-6 text-gray-500">
          Completa los datos para ver la rentabilidad neta de tu inmueble.
        </p>
      )}
    </div>
  );
}
