'use client';

import { useState } from 'react';
import { Home, ClipboardCheck, Building2 } from 'lucide-react';

type TipoRegistro = 'entrega' | 'devolucion' | null;

interface DatosGenerales {
  direccion: string;
  ciudad: string;
  fecha: string;
  hora: string;
  arrendador: string;
  arrendatario: string;
}

interface Zona {
  id: string;
  nombre: string;
  tipo: string;
  estado: '' | 'bueno' | 'regular' | 'malo';
  observaciones: string;
}

const ZONAS_COMUNES = [
  { id: 'cocina', nombre: 'Cocina', marcado: true },
  { id: 'sala', nombre: 'Sala', marcado: true },
  { id: 'comedor', nombre: 'Comedor', marcado: true },
  { id: 'balcon', nombre: 'Balcón o patio', marcado: false },
  { id: 'parqueadero', nombre: 'Parqueadero', marcado: false },
  { id: 'deposito', nombre: 'Depósito', marcado: false },
  { id: 'zonas-comunes', nombre: 'Zonas comunes', marcado: false },
];

function hoyISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function ahoraHora(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export default function ChecklistEntrega() {
  const [paso, setPaso] = useState<1 | 2 | 3 | 4>(1);
  const [tipoRegistro, setTipoRegistro] = useState<TipoRegistro>(null);
  const [datos, setDatos] = useState<DatosGenerales>({
    direccion: '',
    ciudad: '',
    fecha: hoyISO(),
    hora: ahoraHora(),
    arrendador: '',
    arrendatario: '',
  });
  const [habitaciones, setHabitaciones] = useState('0');
  const [banos, setBanos] = useState('1');
  const [comunes, setComunes] = useState<Record<string, boolean>>(
    Object.fromEntries(ZONAS_COMUNES.map((z) => [z.id, z.marcado])),
  );
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [error, setError] = useState('');

  const inputClase =
    'w-full rounded-lg border border-navy-100 px-4 py-3 text-gray-900 focus:border-navy-400 focus:outline-none';
  const botonPrimario =
    'inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-navy-600 px-8 py-3 font-semibold text-white hover:bg-navy-700 transition-colors';
  const botonSecundario =
    'inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-navy-200 px-8 py-3 font-semibold text-navy-700 hover:bg-navy-50 transition-colors';

  function generarZonas() {
    const nuevas: Zona[] = [];
    const nHab = Math.max(0, parseInt(habitaciones, 10) || 0);
    const nBanos = Math.max(0, parseInt(banos, 10) || 0);
    for (let i = 1; i <= nHab; i++) {
      nuevas.push({ id: `hab-${i}`, nombre: `Habitación ${i}`, tipo: 'habitacion', estado: '', observaciones: '' });
    }
    for (let i = 1; i <= nBanos; i++) {
      nuevas.push({ id: `bano-${i}`, nombre: `Baño ${i}`, tipo: 'bano', estado: '', observaciones: '' });
    }
    ZONAS_COMUNES.forEach((z) => {
      if (comunes[z.id]) {
        nuevas.push({ id: z.id, nombre: z.nombre, tipo: 'comun', estado: '', observaciones: '' });
      }
    });
    setZonas(nuevas);
  }

  function actualizarZona(id: string, cambios: Partial<Zona>) {
    setZonas((prev) => prev.map((z) => (z.id === id ? { ...z, ...cambios } : z)));
  }

  function continuarPaso1() {
    if (!tipoRegistro) {
      setError('Elige el tipo de registro para continuar.');
      return;
    }
    setError('');
    setPaso(2);
  }

  function continuarPaso2() {
    if (!datos.direccion || !datos.ciudad || !datos.fecha || !datos.arrendador || !datos.arrendatario) {
      setError('Completa los campos obligatorios: dirección, ciudad, fecha, arrendador y arrendatario.');
      return;
    }
    setError('');
    setPaso(3);
  }

  function continuarPaso3() {
    if (zonas.length > 0 && zonas.some((z) => z.estado === '')) {
      setError('Califica el estado de todas las zonas (Bueno, Regular o Malo).');
      return;
    }
    setError('');
    setPaso(4);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      {/* Hero */}
      <header className="mb-12">
        <h1 className="mb-4 text-3xl md:text-4xl font-bold text-navy-900">
          Checklist de entrega y recepción de inmueble
        </h1>
        <p className="mb-4 max-w-2xl text-lg text-gray-600">
          Completa el estado del inmueble desde tu celular y genera un PDF para guardar o compartir.
        </p>
        <p className="text-sm text-gray-500">Gratis · Sin registro · Funciona sin conexión</p>
      </header>

      {error && (
        <p className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      {/* PASO 1 */}
      {paso === 1 && (
        <section>
          <div className="mb-4 flex items-center gap-3">
            <ClipboardCheck className="w-6 h-6 text-navy-600" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-navy-900">¿Qué estás documentando?</h2>
          </div>
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            {(
              [
                { valor: 'entrega', titulo: 'Entrega inicial', desc: 'Cuando el arrendatario recibe el inmueble.' },
                { valor: 'devolucion', titulo: 'Devolución', desc: 'Cuando el arrendatario devuelve el inmueble al arrendador.' },
              ] as const
            ).map((opcion) => (
              <label
                key={opcion.valor}
                className={`cursor-pointer rounded-xl border p-6 shadow-sm transition-colors ${
                  tipoRegistro === opcion.valor ? 'border-navy-400 bg-navy-50' : 'border-navy-100 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="tipoRegistro"
                  value={opcion.valor}
                  checked={tipoRegistro === opcion.valor}
                  onChange={() => setTipoRegistro(opcion.valor)}
                  className="sr-only"
                />
                <span className="mb-1 block text-lg font-semibold text-navy-900">{opcion.titulo}</span>
                <span className="text-sm text-gray-600">{opcion.desc}</span>
              </label>
            ))}
          </div>
          <button type="button" onClick={continuarPaso1} className={botonPrimario}>
            Continuar
          </button>
        </section>
      )}

      {/* PASO 2 */}
      {paso === 2 && (
        <section>
          <div className="mb-4 flex items-center gap-3">
            <Home className="w-6 h-6 text-navy-600" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-navy-900">Datos generales</h2>
          </div>
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Dirección del inmueble</span>
              <input type="text" value={datos.direccion} onChange={(e) => setDatos({ ...datos, direccion: e.target.value })} className={inputClase} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Ciudad</span>
              <input type="text" value={datos.ciudad} onChange={(e) => setDatos({ ...datos, ciudad: e.target.value })} className={inputClase} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Fecha</span>
              <input type="date" value={datos.fecha} onChange={(e) => setDatos({ ...datos, fecha: e.target.value })} className={inputClase} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Hora</span>
              <input type="time" value={datos.hora} onChange={(e) => setDatos({ ...datos, hora: e.target.value })} className={inputClase} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Nombre del arrendador</span>
              <input type="text" value={datos.arrendador} onChange={(e) => setDatos({ ...datos, arrendador: e.target.value })} className={inputClase} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Nombre del arrendatario</span>
              <input type="text" value={datos.arrendatario} onChange={(e) => setDatos({ ...datos, arrendatario: e.target.value })} className={inputClase} />
            </label>
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button type="button" onClick={() => setPaso(1)} className={botonSecundario}>Volver</button>
            <button type="button" onClick={continuarPaso2} className={botonPrimario}>Continuar</button>
          </div>
        </section>
      )}

      {/* PASO 3 */}
      {paso === 3 && (
        <section>
          <div className="mb-4 flex items-center gap-3">
            <Building2 className="w-6 h-6 text-navy-600" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-navy-900">Zonas del inmueble</h2>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">¿Cuántas habitaciones quieres revisar?</span>
              <input type="number" min="0" value={habitaciones} onChange={(e) => setHabitaciones(e.target.value)} className={inputClase} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">¿Cuántos baños?</span>
              <input type="number" min="0" value={banos} onChange={(e) => setBanos(e.target.value)} className={inputClase} />
            </label>
          </div>

          <fieldset className="mb-6">
            <legend className="mb-2 text-sm font-medium text-gray-700">Zonas comunes a incluir</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {ZONAS_COMUNES.map((z) => (
                <label key={z.id} className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" checked={!!comunes[z.id]} onChange={(e) => setComunes({ ...comunes, [z.id]: e.target.checked })} className="h-4 w-4 rounded border-navy-200 text-navy-600" />
                  {z.nombre}
                </label>
              ))}
            </div>
          </fieldset>

          <button type="button" onClick={generarZonas} className={botonSecundario}>
            Generar zonas
          </button>

          {zonas.length > 0 && (
            <div className="mt-8 space-y-4">
              {zonas.map((zona) => (
                <article key={zona.id} className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-3 text-lg font-semibold text-navy-900">{zona.nombre}</h3>
                  <div className="mb-3 flex flex-wrap gap-4">
                    {(['bueno', 'regular', 'malo'] as const).map((estado) => (
                      <label key={estado} className="inline-flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="radio"
                          name={`estado-${zona.id}`}
                          value={estado}
                          checked={zona.estado === estado}
                          onChange={() => actualizarZona(zona.id, { estado })}
                          className="h-4 w-4 border-navy-200 text-navy-600"
                        />
                        {estado === 'bueno' ? 'Bueno' : estado === 'regular' ? 'Regular' : 'Malo'}
                      </label>
                    ))}
                  </div>
                  <textarea
                    rows={2}
                    value={zona.observaciones}
                    onChange={(e) => actualizarZona(zona.id, { observaciones: e.target.value })}
                    placeholder="Observaciones"
                    className={inputClase}
                  />
                </article>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
            <button type="button" onClick={() => setPaso(2)} className={botonSecundario}>Volver</button>
            <button type="button" onClick={continuarPaso3} className={botonPrimario}>Continuar</button>
          </div>
        </section>
      )}

      {/* PASO 4 (placeholder, se completará en la PARTE 2) */}
      {paso === 4 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-navy-900">Medidores, llaves e inventario</h2>
          <p className="mb-6 text-gray-600">Esta sección se implementará en la siguiente parte.</p>
          <button type="button" onClick={() => setPaso(3)} className={botonSecundario}>Volver</button>
        </section>
      )}
    </div>
  );
}
