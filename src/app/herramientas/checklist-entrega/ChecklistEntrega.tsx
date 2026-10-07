'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ClipboardCheck,
  Home,
  MapPin,
  Calendar,
  Clock,
  User,
  Building2,
  DoorOpen,
  KeyRound,
  Loader2,
  Check,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  FileDown,
  ArchiveRestore,
  X,
} from 'lucide-react';
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

interface Elemento {
  id: string;
  nombre: string;
  cantidad: string;
  estado: 'bueno' | 'regular' | 'malo';
  observacion: string;
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

const PASOS = [
  'Tipo',
  'Datos',
  'Zonas',
  'Medidores',
  'Llaves',
  'Inventario',
  'Revisar',
] as const;

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
  const [elementos, setElementos] = useState<Elemento[]>([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoCantidad, setNuevoCantidad] = useState('1');
  const [nuevoEstado, setNuevoEstado] = useState<'bueno' | 'regular' | 'malo'>('bueno');
  const [nuevoObservacion, setNuevoObservacion] = useState('');

  const [pdfGenerado, setPdfGenerado] = useState(false);
  const [generando, setGenerando] = useState(false);
  const [confirmandoReinicio, setConfirmandoReinicio] = useState(false);
  const [mostrarPasos, setMostrarPasos] = useState(false);
  const dialogoRef = useRef<HTMLDivElement>(null);

  const totalLlaves =
    (parseInt(llavesPuertaPrincipal, 10) || 0) +
    (parseInt(llavesHabitaciones, 10) || 0) +
    (parseInt(llavesBuzon, 10) || 0) +
    (parseInt(llavesParqueadero, 10) || 0) +
    (parseInt(controlesGaraje, 10) || 0) +
    (parseInt(otrosCantidad, 10) || 0);

  // === Persistencia localStorage ===
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
      /* ignorar datos corruptos */
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
      /* ignorar */
    }
  }, [
    paso, tipoRegistro, datos, habitaciones, banos, comunes, zonas,
    aguaLectura, aguaFecha, energiaLectura, gasLectura,
    llavesPuertaPrincipal, llavesHabitaciones, llavesBuzon,
    llavesParqueadero, controlesGaraje, otrosNombre, otrosCantidad,
    elementos,
  ]);

  // Cerrar diálogo con Escape
  useEffect(() => {
    if (!mostrarPasos) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMostrarPasos(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mostrarPasos]);

  function reiniciar() {
    try {
      window.localStorage.removeItem('checklist-entrega-progreso');
    } catch {
      /* ignorar */
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
    setConfirmandoReinicio(false);
  }

  function eliminarElemento(id: string) {
    setElementos((prev) => prev.filter((e) => e.id !== id));
  }

  function agregarElemento() {
    if (!nuevoNombre.trim()) {
      setError('Escribe el nombre del elemento.');
      return;
    }
    setElementos((prev) => [
      ...prev,
      { id: `${Date.now()}`, nombre: nuevoNombre.trim(), cantidad: nuevoCantidad || '1', estado: nuevoEstado, observacion: nuevoObservacion },
    ]);
    setNuevoNombre('');
    setNuevoCantidad('1');
    setNuevoEstado('bueno');
    setNuevoObservacion('');
    setError('');
  }

  async function generarPDF() {
    setGenerando(true);
    try {
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

      linea('ArrendadorCO — Checklist de Entrega y Devolución', 14, true);
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
      zonas.forEach((z) => linea(`${z.nombre}: ${z.estado || 'Sin calificar'}${z.observaciones ? ` — ${z.observaciones}` : ''}`));
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
        elementos.forEach((el) => linea(`${el.nombre} × ${el.cantidad} — ${el.estado}${el.observacion ? ` (${el.observacion})` : ''}`));
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
      linea('Este documento es un registro generado a partir de la información introducida por el usuario. No constituye prueba legal automática ni soporte probatorio garantizado.', 8);
      doc.setTextColor(0);
      const tipo = tipoRegistro === 'devolucion' ? 'devolucion' : 'entrega';
      doc.save(`checklist-${tipo}-${datos.fecha || hoyISO()}.pdf`);
      setPdfGenerado(true);
    } finally {
      setGenerando(false);
    }
  }

  const inputClase = 'w-full rounded-lg border border-navy-100 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-colors';
  const botonPrimario = 'inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-3 font-semibold text-white shadow-sm transition-all hover:-translate-y-[1px] hover:bg-teal-700 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 motion-reduce:transition-none motion-reduce:hover:translate-y-0';
  const botonSecundario = 'inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-navy-200 bg-white px-8 py-3 font-semibold text-navy-700 transition-colors hover:bg-navy-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2';

  function generarZonas() {
    const nuevas: Zona[] = [];
    const nHab = Math.max(0, parseInt(habitaciones, 10) || 0);
    const nBanos = Math.max(0, parseInt(banos, 10) || 0);
    for (let i = 1; i <= nHab; i++) nuevas.push({ id: `hab-${i}`, nombre: `Habitación ${i}`, tipo: 'habitacion', estado: '', observaciones: '' });
    for (let i = 1; i <= nBanos; i++) nuevas.push({ id: `bano-${i}`, nombre: `Baño ${i}`, tipo: 'bano', estado: '', observaciones: '' });
    ZONAS_COMUNES.forEach((z) => {
      if (comunes[z.id]) nuevas.push({ id: z.id, nombre: z.nombre, tipo: 'comun', estado: '', observaciones: '' });
    });
    setZonas(nuevas);
  }

  function actualizarZona(id: string, cambios: Partial<Zona>) {
    setZonas((prev) => prev.map((z) => (z.id === id ? { ...z, ...cambios } : z)));
  }

  function continuarPaso1() {
    if (!tipoRegistro) return setError('Elige el tipo de registro para continuar.');
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

  const porcentaje = Math.round((paso / 7) * 100);
  const zonasCalificadas = zonas.filter((z) => z.estado !== '').length;
  const completo =
    datos.direccion && datos.arrendador && zonas.length > 0 && zonasCalificadas === zonas.length;

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-12 md:py-16">
      {/* HERO */}
      <header className="mb-10">
        <span className="mb-4 inline-block rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
          Gratis · Sin registro
        </span>
        <h1 className="mb-4 text-3xl md:text-4xl font-bold text-navy-900">
          Checklist de entrega y devolución de inmueble
        </h1>
        <p className="mb-4 max-w-2xl text-lg text-gray-600">
          Documenta el estado del inmueble, registra medidores, llaves e inventario y genera un PDF para guardar o compartir.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
          <span>7 pasos</span>
          <span>PDF generado en tu dispositivo</span>
          <span>Tu progreso se guarda en este dispositivo</span>
        </div>
        <p className="mt-3 text-xs text-gray-400">ArrendadorCO · Herramienta gratuita</p>
      </header>

      {/* STEPPER DESKTOP */}
      <nav aria-label="Pasos del checklist" className="mb-8 hidden sm:block">
        <ol className="flex items-center gap-2">
          {PASOS.map((nombre, i) => {
            const numero = (i + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7;
            const completado = numero < paso;
            const actual = numero === paso;
            return (
              <li key={nombre} className="flex flex-1 items-center gap-2">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    completado ? 'bg-teal-600 text-white' : actual ? 'bg-teal-100 text-teal-700 ring-2 ring-teal-500' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {completado ? <Check className="h-4 w-4" aria-hidden="true" /> : String(numero).padStart(2, '0')}
                </span>
                <span className={`hidden text-xs lg:inline ${actual ? 'font-semibold text-navy-900' : completado ? 'text-teal-700' : 'text-gray-400'}`}>
                  {nombre}
                </span>
                {i < PASOS.length - 1 && <span className="h-px flex-1 bg-gray-200" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* STEPPER MOBILE */}
      <div className="mb-8 sm:hidden">
        <p className="mb-2 text-sm font-semibold text-navy-900">
          Paso {paso} de 7 · {PASOS[paso - 1]}
        </p>
        <button type="button" onClick={() => setMostrarPasos(true)} className="text-xs font-semibold text-teal-600 hover:underline">
          Ver pasos
        </button>
      </div>

      {/* PROGRESO */}
      <div className="mb-10">
        <div className="mb-1 flex justify-between text-xs text-gray-500">
          <span>Paso {paso} de 7</span>
          <span aria-live="polite">{porcentaje}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-teal-500 transition-all duration-500 motion-reduce:transition-none" style={{ width: `${porcentaje}%` }} />
        </div>
        <p className="mt-2 text-xs text-gray-400" aria-live="polite">✓ Guardado en este dispositivo</p>
      </div>

      {error && (
        <p className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      {/* Diálogo mobile de pasos */}
      {mostrarPasos && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center" role="dialog" aria-modal="true" aria-label="Pasos del checklist" onClick={() => setMostrarPasos(false)}>
          <div ref={dialogoRef} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-navy-900">Pasos</h2>
              <button type="button" onClick={() => setMostrarPasos(false)} aria-label="Cerrar" className="rounded-lg p-1 text-gray-500 hover:bg-gray-100">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <ol className="space-y-2">
              {PASOS.map((nombre, i) => (
                <li key={nombre} className={`flex items-center gap-3 text-sm ${i + 1 === paso ? 'font-semibold text-navy-900' : 'text-gray-500'}`}>
                  <span className="font-mono text-xs text-teal-600">{String(i + 1).padStart(2, '0')}</span>
                  {nombre}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* PASO 1 */}
      {paso === 1 && (
        <section>
          <div className="mb-6 flex items-center gap-3">
            <ClipboardCheck className="h-6 w-6 text-teal-600" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-navy-900">¿Qué estás documentando?</h2>
          </div>
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            {([
              { valor: 'entrega', titulo: 'Entrega inicial', desc: 'Cuando el arrendatario recibe el inmueble.' },
              { valor: 'devolucion', titulo: 'Devolución', desc: 'Cuando el arrendatario entrega el inmueble al arrendador.' },
            ] as const).map((opcion) => (
              <label
                key={opcion.valor}
                className={`cursor-pointer rounded-2xl border-2 p-6 transition-all ${
                  tipoRegistro === opcion.valor ? 'border-teal-500 bg-teal-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input type="radio" name="tipoRegistro" value={opcion.valor} checked={tipoRegistro === opcion.valor} onChange={() => setTipoRegistro(opcion.valor)} className="sr-only" />
                <div className="flex items-start justify-between">
                  <span className="text-lg font-semibold text-navy-900">{opcion.titulo}</span>
                  {tipoRegistro === opcion.valor && <CheckCircle2 className="h-5 w-5 text-teal-600" aria-hidden="true" />}
                </div>
                <span className="mt-1 block text-sm text-gray-600">{opcion.desc}</span>
              </label>
            ))}
          </div>
          <button type="button" onClick={continuarPaso1} className={botonPrimario}>
            Continuar <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </section>
      )}

      {/* PASO 2 */}
      {paso === 2 && (
        <section>
          <div className="mb-6 flex items-center gap-3">
            <Home className="h-6 w-6 text-teal-600" aria-hidden="true" />
            <div>
              <h2 className="text-xl font-semibold text-navy-900">Datos del inmueble</h2>
              <p className="text-sm text-gray-500">Información básica de la inspección.</p>
            </div>
          </div>
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            {[
              { icon: MapPin, label: 'Dirección', value: datos.direccion, key: 'direccion', type: 'text' },
              { icon: Building2, label: 'Ciudad', value: datos.ciudad, key: 'ciudad', type: 'text' },
              { icon: Calendar, label: 'Fecha', value: datos.fecha, key: 'fecha', type: 'date' },
              { icon: Clock, label: 'Hora', value: datos.hora, key: 'hora', type: 'time' },
              { icon: User, label: 'Arrendador', value: datos.arrendador, key: 'arrendador', type: 'text' },
              { icon: User, label: 'Arrendatario', value: datos.arrendatario, key: 'arrendatario', type: 'text' },
            ].map((campo) => (
              <label key={campo.key} className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <campo.icon className="h-4 w-4 text-teal-600" aria-hidden="true" />
                  {campo.label}
                </span>
                <input type={campo.type} value={campo.value} onChange={(e) => setDatos({ ...datos, [campo.key]: e.target.value })} className={inputClase} />
              </label>
            ))}
          </div>
          <NavButtons
            onBack={() => setPaso(1)}
            onNext={continuarPaso2}
            labelBack="Atrás"
            labelNext="Continuar"
            botonPrimario={botonPrimario}
            botonSecundario={botonSecundario}
          />
        </section>
      )}

      {/* PASO 3 */}
      {paso === 3 && (
        <section>
          <h2 className="mb-6 text-xl font-semibold text-navy-900">¿Qué espacios quieres revisar?</h2>
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">Habitaciones</span>
              <input type="number" min="0" value={habitaciones} onChange={(e) => setHabitaciones(e.target.value)} className={inputClase} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">Baños</span>
              <input type="number" min="0" value={banos} onChange={(e) => setBanos(e.target.value)} className={inputClase} />
            </label>
          </div>

          <h3 className="mb-3 text-sm font-semibold text-gray-700">Zonas comunes</h3>
          <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {ZONAS_COMUNES.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => setComunes({ ...comunes, [z.id]: !comunes[z.id] })}
                aria-pressed={!!comunes[z.id]}
                className={`rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                  comunes[z.id] ? 'border-teal-500 bg-teal-50 text-teal-800 font-semibold' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                {z.nombre}
              </button>
            ))}
          </div>

          <button type="button" onClick={generarZonas} className={botonSecundario}>
            Generar zonas
          </button>

          {zonas.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-navy-900">Revisión de zonas</h3>
              <div className="space-y-4">
                {zonas.map((zona) => (
                  <article key={zona.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h4 className="mb-3 font-semibold text-navy-900">{zona.nombre}</h4>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {(['bueno', 'regular', 'malo'] as const).map((estado) => (
                        <label key={estado} className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                          zona.estado === estado
                            ? estado === 'bueno' ? 'border-teal-500 bg-teal-50 text-teal-800 font-semibold'
                              : estado === 'regular' ? 'border-amber-400 bg-amber-50 text-amber-800 font-semibold'
                              : 'border-red-400 bg-red-50 text-red-800 font-semibold'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}>
                          <input type="radio" name={`estado-${zona.id}`} value={estado} checked={zona.estado === estado} onChange={() => actualizarZona(zona.id, { estado })} className="sr-only" />
                          {estado === 'bueno' ? '✓ Bueno' : estado === 'regular' ? '! Regular' : '× Malo'}
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
            </div>
          )}

          <NavButtons
            onBack={() => setPaso(2)}
            onNext={continuarPaso3}
            labelBack="Atrás"
            labelNext="Continuar"
            botonPrimario={botonPrimario}
            botonSecundario={botonSecundario}
          />
        </section>
      )}

      {/* PASO 4 */}
      {paso === 4 && (
        <section>
          <h2 className="mb-6 text-xl font-semibold text-navy-900">Lecturas de medidores</h2>
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { nombre: 'Agua', value: aguaLectura, set: setAguaLectura, extra: aguaFecha, setExtra: setAguaFecha },
              { nombre: 'Energía', value: energiaLectura, set: setEnergiaLectura },
              { nombre: 'Gas', value: gasLectura, set: setGasLectura },
            ].map((m) => (
              <div key={m.nombre} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">{m.nombre}</h3>
                <input type="text" inputMode="numeric" value={m.value} onChange={(e) => m.set(e.target.value)} placeholder="Lectura" className={inputClase} />
                {m.setExtra && (
                  <input type="datetime-local" value={m.extra} onChange={(e) => m.setExtra?.(e.target.value)} aria-label="Fecha de lectura del agua" className={`${inputClase} mt-2`} />
                )}
                <p className="mt-2 text-xs text-slate-400">Campo opcional.</p>
              </div>
            ))}
          </div>
          <NavButtons onBack={() => setPaso(3)} onNext={() => setPaso(5)} labelBack="Atrás" labelNext="Continuar" botonPrimario={botonPrimario} botonSecundario={botonSecundario} />
        </section>
      )}

      {/* PASO 5 */}
      {paso === 5 && (
        <section>
          <h2 className="mb-6 text-xl font-semibold text-navy-900">Llaves y controles entregados</h2>
          <div className="mb-8 space-y-3">
            {[
              { icon: DoorOpen, label: 'Puerta principal', value: llavesPuertaPrincipal, set: setLlavesPuertaPrincipal },
              { icon: KeyRound, label: 'Puertas de habitaciones', value: llavesHabitaciones, set: setLlavesHabitaciones },
              { icon: KeyRound, label: 'Buzón', value: llavesBuzon, set: setLlavesBuzon },
              { icon: DoorOpen, label: 'Parqueadero', value: llavesParqueadero, set: setLlavesParqueadero },
              { icon: KeyRound, label: 'Control de garaje', value: controlesGaraje, set: setControlesGaraje },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
                <item.icon className="h-5 w-5 text-teal-600" aria-hidden="true" />
                <span className="flex-1 text-sm font-medium text-slate-700">{item.label}</span>
                <input type="number" min="0" value={item.value} onChange={(e) => item.set(e.target.value)} className="w-24 rounded-lg border border-navy-100 px-3 py-2 text-center" />
              </div>
            ))}
            <div className="grid gap-3 sm:grid-cols-2">
              <input type="text" value={otrosNombre} onChange={(e) => setOtrosNombre(e.target.value)} placeholder="Otros (nombre)" className={inputClase} />
              <input type="number" min="0" value={otrosCantidad} onChange={(e) => setOtrosCantidad(e.target.value)} placeholder="Otros (cantidad)" className={inputClase} />
            </div>
          </div>
          <div className="mb-8 rounded-xl bg-teal-50 p-5">
            <p className="text-sm font-medium text-teal-800">Total entregado</p>
            <p className="text-3xl font-bold text-teal-700">{totalLlaves} <span className="text-base font-medium">elementos</span></p>
          </div>
          <NavButtons onBack={() => setPaso(4)} onNext={() => setPaso(6)} labelBack="Atrás" labelNext="Continuar" botonPrimario={botonPrimario} botonSecundario={botonSecundario} />
        </section>
      )}

      {/* PASO 6 */}
      {paso === 6 && (
        <section>
          <h2 className="mb-6 text-xl font-semibold text-navy-900">Inventario de elementos</h2>
          <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <input type="text" value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} placeholder="Nombre (ej: Nevera)" className={inputClase} />
              <input type="number" min="1" value={nuevoCantidad} onChange={(e) => setNuevoCantidad(e.target.value)} placeholder="Cantidad" className={inputClase} />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {(['bueno', 'regular', 'malo'] as const).map((estado) => (
                <label key={estado} className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm ${nuevoEstado === estado ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-slate-200 text-slate-600'}`}>
                  <input type="radio" name="nuevo-estado" value={estado} checked={nuevoEstado === estado} onChange={() => setNuevoEstado(estado)} className="sr-only" />
                  {estado === 'bueno' ? 'Bueno' : estado === 'regular' ? 'Regular' : 'Malo'}
                </label>
              ))}
            </div>
            <input type="text" value={nuevoObservacion} onChange={(e) => setNuevoObservacion(e.target.value)} placeholder="Observación" className={`${inputClase} mt-4`} />
            <button type="button" onClick={agregarElemento} className={`${botonSecundario} mt-4`}>
              + Agregar elemento
            </button>
          </div>

          {elementos.length > 0 && (
            <div className="mb-8 space-y-3">
              {elementos.map((el) => (
                <article key={el.id} className="flex items-start justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm animate-in fade-in duration-300 motion-reduce:animate-none">
                  <div>
                    <h3 className="font-semibold text-navy-900">{el.nombre} · {el.cantidad} unidad(es)</h3>
                    <p className="text-sm capitalize text-slate-600">Estado: {el.estado}</p>
                    {el.observacion && <p className="text-sm text-slate-500">{el.observacion}</p>}
                  </div>
                  <button type="button" onClick={() => eliminarElemento(el.id)} className="text-sm font-semibold text-red-600 hover:underline">
                    Eliminar
                  </button>
                </article>
              ))}
            </div>
          )}
          <NavButtons onBack={() => setPaso(5)} onNext={() => setPaso(7)} labelBack="Atrás" labelNext="Continuar" botonPrimario={botonPrimario} botonSecundario={botonSecundario} />
        </section>
      )}

      {/* PASO 7 */}
      {paso === 7 && (
        <section>
          <h2 className="mb-6 text-2xl font-bold text-navy-900">Revisa antes de generar el PDF</h2>
          <div
            className={`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${
              completo ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {completo ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : <AlertTriangle className="h-4 w-4" aria-hidden="true" />}
            {completo ? 'Checklist completo' : 'Checklist parcialmente completo'}
          </div>

          <ul className="mb-8 grid gap-3 sm:grid-cols-2">
            <li className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Datos generales</p>
              <p className="font-semibold text-navy-900">{datos.direccion ? 'Completos' : 'Faltan datos'}</p>
            </li>
            <li className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Zonas</p>
              <p className="font-semibold text-navy-900">{zonasCalificadas} de {zonas.length} calificadas</p>
            </li>
            <li className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Medidores</p>
              <p className="font-semibold text-navy-900">{aguaLectura || energiaLectura || gasLectura ? 'Registrados' : 'No registrados'}</p>
            </li>
            <li className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Llaves</p>
              <p className="font-semibold text-navy-900">{totalLlaves} llaves/controles</p>
            </li>
            <li className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Inventario</p>
              <p className="font-semibold text-navy-900">{elementos.length} elementos</p>
            </li>
          </ul>

          <div className="mb-8 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5">
            <p className="text-amber-800">
              Este documento es un registro generado a partir de la información que tú introduces. No constituye prueba legal automática ni soporte probatorio garantizado. Para tu caso particular, consulta con un profesional.
            </p>
          </div>

          <div className="mb-8">
            {confirmandoReinicio ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                <p className="mb-4 text-sm text-red-800">Esto eliminará el progreso guardado en este dispositivo.</p>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setConfirmandoReinicio(false)} className={`${botonSecundario} flex-1 sm:flex-none`}>Cancelar</button>
                  <button type="button" onClick={reiniciar} className="inline-flex min-h-[48px] flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700">Sí, reiniciar</button>
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => setConfirmandoReinicio(true)} className="text-sm font-semibold text-red-600 hover:underline">
                Reiniciar checklist
              </button>
            )}
          </div>

          {!pdfGenerado && (
            <NavButtons onBack={() => setPaso(6)} onNext={generarPDF} labelBack="Atrás" labelNext={generando ? 'Generando...' : 'Generar PDF'} botonPrimario={botonPrimario} botonSecundario={botonSecundario} disabledNext={generando} />
          )}

          {generando && (
            <p className="mt-4 flex items-center gap-2 text-sm text-teal-700" role="status">
              <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
              Generando documento...
            </p>
          )}

          {pdfGenerado && (
            <div className="mt-8 space-y-6">
              <div className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center">
                <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-teal-600 animate-in zoom-in duration-300 motion-reduce:animate-none" aria-hidden="true" />
                <h3 className="mb-2 text-xl font-semibold text-navy-900">PDF generado correctamente</h3>
                <p className="mb-6 text-sm text-slate-600">
                  El documento se creó en tu dispositivo. Puedes descargarlo y guardarlo donde prefieras.
                </p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <button type="button" onClick={generarPDF} className={botonPrimario}>
                    <FileDown className="h-4 w-4" aria-hidden="true" /> Descargar PDF
                  </button>
                  <button type="button" onClick={reiniciar} className={botonSecundario}>
                    <ArchiveRestore className="h-4 w-4" aria-hidden="true" /> Crear nuevo checklist
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

function NavButtons({
  onBack,
  onNext,
  labelBack,
  labelNext,
  botonPrimario,
  botonSecundario,
  disabledNext,
}: {
  onBack: () => void;
  onNext: () => void;
  labelBack: string;
  labelNext: string;
  botonPrimario: string;
  botonSecundario: string;
  disabledNext?: boolean;
}) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:mt-8 sm:flex-row">
      <button type="button" onClick={onBack} className={botonSecundario}>
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {labelBack}
      </button>
      <button type="button" onClick={onNext} disabled={disabledNext} className={botonPrimario}>
        {labelNext} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
