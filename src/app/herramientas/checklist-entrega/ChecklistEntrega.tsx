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
  const [paso, setPaso] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
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

  // Medidores
  const [aguaLectura, setAguaLectura] = useState('');
  const [aguaFecha, setAguaFecha] = useState('');
  const [energiaLectura, setEnergiaLectura] = useState('');
  const [gasLectura, setGasLectura] = useState('');

  // Llaves
  const [llavesPuertaPrincipal, setLlavesPuertaPrincipal] = useState('0');
  const [llavesHabitaciones, setLlavesHabitaciones] = useState('0');
  const [llavesBuzon, setLlavesBuzon] = useState('0');
  const [llavesParqueadero, setLlavesParqueadero] = useState('0');
  const [controlesGaraje, setControlesGaraje] = useState('0');
  const [otrosNombre, setOtrosNombre] = useState('');
  const [otrosCantidad, setOtrosCantidad] = useState('0');

  // Inventario
  interface Elemento {
    id: string;
    nombre: string;
    cantidad: string;
    estado: 'bueno' | 'regular' | 'malo';
    observacion: string;
  }
  const [elementos, setElementos] = useState<Elemento[]>([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoCantidad, setNuevoCantidad] = useState('1');
  const [nuevoEstado, setNuevoEstado] = useState<'bueno' | 'regular' | 'malo'>('bueno');
  const [nuevoObservacion, setNuevoObservacion] = useState('');

  const totalLlaves =
    (parseInt(llavesPuertaPrincipal, 10) || 0) +
    (parseInt(llavesHabitaciones, 10) || 0) +
    (parseInt(llavesBuzon, 10) || 0) +
    (parseInt(llavesParqueadero, 10) || 0) +
    (parseInt(controlesGaraje, 10) || 0) +
    (parseInt(otrosCantidad, 10) || 0);

  function agregarElemento() {
    if (!nuevoNombre.trim()) {
      setError('Escribe el nombre del elemento.');
      return;
    }
    setElementos((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        nombre: nuevoNombre.trim(),
        cantidad: nuevoCantidad || '1',
        estado: nuevoEstado,
        observacion: nuevoObservacion,
      },
    ]);
    setNuevoNombre('');
    setNuevoCantidad('1');
    setNuevoEstado('bueno');
    setNuevoObservacion('');
    setError('');
  }

  function eliminarElemento(id: string) {
    setElementos((prev) => prev.filter((e) => e.id !== id));
  }

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

      {/* PASO 4: Medidores y servicios */}
      {paso === 4 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-navy-900">Lecturas de medidores</h2>
          <p className="mb-6 text-gray-600">Todos los campos son opcionales. Si un servicio no aplica, déjalo vacío.</p>
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Agua: lectura</span>
              <input type="text" inputMode="numeric" value={aguaLectura} onChange={(e) => setAguaLectura(e.target.value)} className={inputClase} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Fecha/hora de lectura del agua (opcional)</span>
              <input type="datetime-local" value={aguaFecha} onChange={(e) => setAguaFecha(e.target.value)} className={inputClase} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Energía: lectura</span>
              <input type="text" inputMode="numeric" value={energiaLectura} onChange={(e) => setEnergiaLectura(e.target.value)} className={inputClase} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Gas: lectura</span>
              <input type="text" inputMode="numeric" value={gasLectura} onChange={(e) => setGasLectura(e.target.value)} className={inputClase} />
            </label>
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button type="button" onClick={() => setPaso(3)} className={botonSecundario}>Volver</button>
            <button type="button" onClick={() => setPaso(5)} className={botonPrimario}>Continuar</button>
          </div>
        </section>
      )}

      {/* PASO 5: Llaves y controles */}
      {paso === 5 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-navy-900">Llaves y controles entregados</h2>
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            {[
              { label: 'Puerta principal', value: llavesPuertaPrincipal, set: setLlavesPuertaPrincipal },
              { label: 'Puerta de habitaciones', value: llavesHabitaciones, set: setLlavesHabitaciones },
              { label: 'Buzón', value: llavesBuzon, set: setLlavesBuzon },
              { label: 'Parqueadero', value: llavesParqueadero, set: setLlavesParqueadero },
              { label: 'Control de garaje', value: controlesGaraje, set: setControlesGaraje },
            ].map((item) => (
              <label key={item.label} className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700">{item.label}</span>
                <input type="number" min="0" value={item.value} onChange={(e) => item.set(e.target.value)} className={inputClase} />
              </label>
            ))}
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Otros (nombre)</span>
              <input type="text" value={otrosNombre} onChange={(e) => setOtrosNombre(e.target.value)} placeholder="Ej: llave de depósito" className={inputClase} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Otros (cantidad)</span>
              <input type="number" min="0" value={otrosCantidad} onChange={(e) => setOtrosCantidad(e.target.value)} className={inputClase} />
            </label>
          </div>
          <p className="mb-6 text-lg font-semibold text-navy-900">Total de elementos: {totalLlaves}</p>
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button type="button" onClick={() => setPaso(4)} className={botonSecundario}>Volver</button>
            <button type="button" onClick={() => setPaso(6)} className={botonPrimario}>Continuar</button>
          </div>
        </section>
      )}

      {/* PASO 6: Inventario */}
      {paso === 6 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-navy-900">Inventario de elementos</h2>
          <p className="mb-6 text-gray-600">
            Si el inmueble incluye muebles o electrodomésticos, regístralos aquí. Si no, puedes dejar esta sección vacía.
          </p>
          <div className="mb-6 rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700">Nombre</span>
                <input type="text" value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} placeholder="Nevera" className={inputClase} />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700">Cantidad</span>
                <input type="number" min="1" value={nuevoCantidad} onChange={(e) => setNuevoCantidad(e.target.value)} className={inputClase} />
              </label>
            </div>
            <fieldset className="mt-4">
              <legend className="mb-2 text-sm font-medium text-gray-700">Estado</legend>
              <div className="flex gap-4">
                {(['bueno', 'regular', 'malo'] as const).map((estado) => (
                  <label key={estado} className="inline-flex items-center gap-2 text-sm text-gray-700">
                    <input type="radio" name="nuevo-estado" value={estado} checked={nuevoEstado === estado} onChange={() => setNuevoEstado(estado)} className="h-4 w-4 border-navy-200 text-navy-600" />
                    {estado === 'bueno' ? 'Bueno' : estado === 'regular' ? 'Regular' : 'Malo'}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="mt-4 block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Observación</span>
              <input type="text" value={nuevoObservacion} onChange={(e) => setNuevoObservacion(e.target.value)} className={inputClase} />
            </label>
            <button type="button" onClick={agregarElemento} className={`${botonSecundario} mt-4`}>
              Agregar elemento
            </button>
          </div>

          {elementos.length > 0 && (
            <div className="mb-6 space-y-3">
              {elementos.map((el) => (
                <article key={el.id} className="flex items-start justify-between rounded-xl border border-navy-100 bg-white p-4 shadow-sm">
                  <div>
                    <h3 className="font-semibold text-navy-900">{el.nombre} × {el.cantidad}</h3>
                    <p className="text-sm text-gray-600 capitalize">{el.estado}</p>
                    {el.observacion && <p className="text-sm text-gray-500">{el.observacion}</p>}
                  </div>
                  <button type="button" onClick={() => eliminarElemento(el.id)} className="text-sm font-semibold text-red-600 hover:underline">
                    Eliminar
                  </button>
                </article>
              ))}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button type="button" onClick={() => setPaso(5)} className={botonSecundario}>Volver</button>
            <button type="button" onClick={() => setPaso(7)} className={botonPrimario}>Continuar</button>
          </div>
        </section>
      )}

      {/* PASO 7: Revisión final */}
      {paso === 7 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-navy-900">Revisa antes de generar el documento</h2>
          <ul className="mb-6 space-y-2 text-gray-700">
            <li>Datos generales: {datos.direccion && datos.arrendador ? '✅ Completos' : '❌ Faltan datos'}</li>
            <li>
              Zonas revisadas: {zonas.filter((z) => z.estado !== '').length} de {zonas.length} con estado asignado
            </li>
            <li>Medidores: {aguaLectura || energiaLectura || gasLectura ? '✅ Registrados' : '⚠️ No registrados'}</li>
            <li>Llaves: {totalLlaves > 0 ? `✅ ${totalLlaves} registrados` : '⚠️ No registradas'}</li>
            <li>Inventario: {elementos.length > 0 ? `✅ ${elementos.length} elementos` : 'Sin elementos'}</li>
          </ul>
          <p className="mb-6 text-sm text-gray-500">Algunos campos están vacíos. Puedes continuar de todas formas.</p>
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button type="button" onClick={() => setPaso(6)} className={botonSecundario}>Volver</button>
            <button type="button" onClick={() => {}} className={botonPrimario}>Generar PDF</button>
          </div>
        </section>
      )}
    </div>
  );
}
