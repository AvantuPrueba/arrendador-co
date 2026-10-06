'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, ClipboardCheck, Building2 } from 'lucide-react';
import { PRODUCT_CONFIG, formatPrice } from '@/lib/product';

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

  // === Guardado de progreso en localStorage ===
  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem('checklist-entrega-progreso');
      if (guardado) {
        const s = JSON.parse(guardado);
        /* eslint-disable react-hooks/set-state-in-effect */
        if (s.paso) setPaso(s.paso);
        if (s.tipoRegistro !== undefined) setTipoRegistro(s.tipoRegistro);
        if (s.datos) setDatos(s.datos);
        if (s.habitaciones !== undefined) setHabitaciones(s.habitaciones);
        if (s.banos !== undefined) setBanos(s.banos);
        if (s.comunes) setComunes(s.comunes);
        if (s.zonas) setZonas(s.zonas);
        if (s.aguaLectura !== undefined) setAguaLectura(s.aguaLectura);
        if (s.aguaFecha !== undefined) setAguaFecha(s.aguaFecha);
        if (s.energiaLectura !== undefined) setEnergiaLectura(s.energiaLectura);
        if (s.gasLectura !== undefined) setGasLectura(s.gasLectura);
        if (s.llavesPuertaPrincipal !== undefined) setLlavesPuertaPrincipal(s.llavesPuertaPrincipal);
        if (s.llavesHabitaciones !== undefined) setLlavesHabitaciones(s.llavesHabitaciones);
        if (s.llavesBuzon !== undefined) setLlavesBuzon(s.llavesBuzon);
        if (s.llavesParqueadero !== undefined) setLlavesParqueadero(s.llavesParqueadero);
        if (s.controlesGaraje !== undefined) setControlesGaraje(s.controlesGaraje);
        if (s.otrosNombre !== undefined) setOtrosNombre(s.otrosNombre);
        if (s.otrosCantidad !== undefined) setOtrosCantidad(s.otrosCantidad);
        if (s.elementos) setElementos(s.elementos);
        /* eslint-enable react-hooks/set-state-in-effect */
      }
    } catch {
      // Si el dato guardado está corrupto, seguimos con el formulario vacío.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        'checklist-entrega-progreso',
        JSON.stringify({
          paso, tipoRegistro, datos, habitaciones, banos, comunes, zonas,
          aguaLectura, aguaFecha, energiaLectura, gasLectura,
          llavesPuertaPrincipal, llavesHabitaciones, llavesBuzon,
          llavesParqueadero, controlesGaraje, otrosNombre, otrosCantidad,
          elementos,
        }),
      );
    } catch {
      // localStorage puede no estar disponible (modo privado); no bloqueamos.
    }
  }, [
    paso, tipoRegistro, datos, habitaciones, banos, comunes, zonas,
    aguaLectura, aguaFecha, energiaLectura, gasLectura,
    llavesPuertaPrincipal, llavesHabitaciones, llavesBuzon,
    llavesParqueadero, controlesGaraje, otrosNombre, otrosCantidad,
    elementos,
  ]);

  function borrarDatos() {
    try {
      window.localStorage.removeItem('checklist-entrega-progreso');
    } catch {
      // Ignorar.
    }
    setPaso(1);
    setTipoRegistro(null);
    setDatos({ direccion: '', ciudad: '', fecha: hoyISO(), hora: ahoraHora(), arrendador: '', arrendatario: '' });
    setHabitaciones('0');
    setBanos('1');
    setComunes(Object.fromEntries(ZONAS_COMUNES.map((z) => [z.id, z.marcado])));
    setZonas([]);
    setAguaLectura('');
    setAguaFecha('');
    setEnergiaLectura('');
    setGasLectura('');
    setLlavesPuertaPrincipal('0');
    setLlavesHabitaciones('0');
    setLlavesBuzon('0');
    setLlavesParqueadero('0');
    setControlesGaraje('0');
    setOtrosNombre('');
    setOtrosCantidad('0');
    setElementos([]);
    setPdfGenerado(false);
    setError('');
  }

  const [pdfGenerado, setPdfGenerado] = useState(false);

  function eliminarElemento(id: string) {
    setElementos((prev) => prev.filter((e) => e.id !== id));
  }

  async function generarPDF() {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    const margen = 15;
    const ancho = doc.internal.pageSize.getWidth();
    let y = 20;

    const linea = (texto: string, tamano = 10, negrita = false) => {
      doc.setFont('helvetica', negrita ? 'bold' : 'normal');
      doc.setFontSize(tamano);
      const lineas = doc.splitTextToSize(texto, ancho - margen * 2);
      doc.text(lineas, margen, y);
      y += lineas.length * (tamano * 0.5) + 2;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    };

    linea('ArrendadorCO — Checklist de Entrega y Recepción', 14, true);
    linea(`Tipo de registro: ${tipoRegistro === 'devolucion' ? 'Devolución' : 'Entrega inicial'}`);
    linea('');

    linea('Datos generales', 12, true);
    linea(`Dirección: ${datos.direccion}`);
    linea(`Ciudad: ${datos.ciudad}`);
    linea(`Fecha: ${datos.fecha} · Hora: ${datos.hora}`);
    linea(`Arrendador: ${datos.arrendador}`);
    linea(`Arrendatario: ${datos.arrendatario}`);
    linea('');

    linea('Zonas', 12, true);
    zonas.forEach((z) => {
      linea(`${z.nombre}: ${z.estado ? z.estado : 'Sin calificar'}${z.observaciones ? ` — ${z.observaciones}` : ''}`);
    });
    linea('');

    if (aguaLectura || energiaLectura || gasLectura) {
      linea('Medidores', 12, true);
      if (aguaLectura) linea(`Agua: ${aguaLectura}${aguaFecha ? ` (${aguaFecha})` : ''}`);
      if (energiaLectura) linea(`Energía: ${energiaLectura}`);
      if (gasLectura) linea(`Gas: ${gasLectura}`);
      linea('');
    }

    if (totalLlaves > 0) {
      linea('Llaves y controles', 12, true);
      linea(`Total de elementos: ${totalLlaves}`);
      if (otrosNombre) linea(`Otros: ${otrosNombre} × ${otrosCantidad}`);
      linea('');
    }

    if (elementos.length > 0) {
      linea('Inventario', 12, true);
      elementos.forEach((el) => {
        linea(`${el.nombre} × ${el.cantidad} — ${el.estado}${el.observacion ? ` (${el.observacion})` : ''}`);
      });
      linea('');
    }

    linea('Firmas', 12, true);
    linea('_______________________________');
    linea('Arrendador');
    linea('_______________________________');
    linea('Arrendatario');
    linea('');

    const ahora = new Date();
    linea(`Documento generado desde arrendadorco.com el ${ahora.toLocaleDateString('es-CO')} ${ahora.toLocaleTimeString('es-CO')}`, 8);
    doc.setTextColor(120);
    linea(
      'Este documento es un registro generado a partir de la información introducida por el usuario. No constituye prueba legal automática ni soporte probatorio garantizado.',
      8,
    );
    doc.setTextColor(0);

    const tipo = tipoRegistro === 'devolucion' ? 'devolucion' : 'entrega';
    doc.save(`checklist-${tipo}-${datos.fecha || hoyISO()}.pdf`);
    setPdfGenerado(true);
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

          <div className="mb-6 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5">
            <p className="text-amber-800">
              Este documento es un registro generado a partir de la información que tú introduces. No constituye prueba legal automática ni soporte probatorio garantizado. Para tu caso particular, consulta con un profesional.
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            <button type="button" onClick={borrarDatos} className="text-sm font-semibold text-red-600 hover:underline self-center">
              Borrar datos
            </button>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button type="button" onClick={() => setPaso(6)} className={botonSecundario}>Volver</button>
            <button type="button" onClick={generarPDF} className={botonPrimario}>Generar PDF</button>
          </div>

          {pdfGenerado && (
            <div className="mt-8 space-y-6">
              <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                <p className="mb-2 font-semibold text-green-800">PDF generado.</p>
                <p className="mb-4 text-sm text-green-800">
                  Guarda este PDF en un lugar seguro. No se almacena en nuestros servidores.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button type="button" onClick={generarPDF} className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50 transition-colors">
                    Descargar PDF
                  </button>
                  <button type="button" onClick={borrarDatos} className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50 transition-colors">
                    Volver al inicio
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-navy-200 bg-navy-50 p-8">
                <h3 className="mb-2 text-xl font-semibold text-navy-900">¿Tu contrato está listo?</h3>
                <p className="mb-4 text-gray-600">
                  El checklist documenta el estado del inmueble, pero no reemplaza el contrato de arrendamiento.
                </p>
                <p className="mb-1 font-semibold text-navy-900">{PRODUCT_CONFIG.name}</p>
                <p className="mb-4 text-lg font-bold text-navy-900">{formatPrice()}</p>
                <Link href="/tienda" className="inline-flex items-center gap-2 rounded-xl bg-navy-600 px-6 py-3 font-semibold text-white hover:bg-navy-700 transition-colors">
                  Ver plantilla →
                </Link>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
