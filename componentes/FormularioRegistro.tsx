"use client";

import { useState, useEffect } from "react";
import { generarSlug, detectarCategoria, formatearTelefono, obtenerIniciales, agregarNegocio } from "../database/negociosRegistrados";
import { TipoCategoria } from "../database/tiposNegocios";
import { DatosFormulario } from "../database/tiposRegistro";
import { Sparkles, Store, Phone, MapPin, Check, X, Plus, Trash2 } from "lucide-react";

// ─── Constantes ───────────────────────────────────────────────────────────────

const CATEGORIAS: { slug: TipoCategoria; nombre: string; icono: string }[] = [
  { slug: "comida-rapida",   nombre: "Comida Rápida",    icono: "🍔" },
  { slug: "restaurantes",    nombre: "Restaurantes",      icono: "🍽️" },
  { slug: "entretenimiento", nombre: "Entretenimiento",   icono: "🎭" },
  { slug: "mantenimiento",   nombre: "Mantenimiento",     icono: "🔧" },
  { slug: "salud",           nombre: "Salud",             icono: "❤️" },
  { slug: "mascotas",        nombre: "Mascotas",          icono: "🐾" },
  { slug: "hoteles",         nombre: "Hoteles",           icono: "🏨" },
  { slug: "servicios",       nombre: "Servicios",         icono: "🛠️" },
];

const COLORES_MARCA = ["#F59E0B", "#EF4444", "#3B82F6", "#10B981", "#8B5CF6", "#EC4899", "#F97316", "#14B8A6"];

const INPUT_BASE = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm";

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  contadorLugares: number;
  onExito?: (slug: string) => void;
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function FormularioRegistro({ contadorLugares, onExito }: Props) {
  const [datos, setDatos] = useState<DatosFormulario>({
    nombre: "", giro: "", descripcion: "", categoria: "servicios",
    usarLogoGenerado: true, colorMarca: COLORES_MARCA[0],
    telefonoPrincipal: "", telefonoExtra1: "", telefonoExtra2: "",
    whatsappMismoNumero: true, whatsapp: "", messenger: "", direccion: "",
  });

  const [slug, setSlug] = useState("");
  const [categoriaDetectada, setCategoriaDetectada] = useState<TipoCategoria | null>(null);
  const [categoriaConfirmada, setCategoriaConfirmada] = useState(false);
  const [mostrarSelectorManual, setMostrarSelectorManual] = useState(false);
  const [telefonosExtra, setTelefonosExtra] = useState(0); // 0, 1 o 2 extras
  const [enviando, setEnviando] = useState(false);
  const [registrado, setRegistrado] = useState(false);
  const [slugFinal, setSlugFinal] = useState("");

  // Generar slug en tiempo real
  useEffect(() => {
    setSlug(generarSlug(datos.nombre));
  }, [datos.nombre]);

  // Detectar categoría al escribir giro
  useEffect(() => {
    if (datos.giro.length < 5) return;
    const detectada = detectarCategoria(datos.giro);
    if (detectada && !categoriaConfirmada) {
      setCategoriaDetectada(detectada);
      setMostrarSelectorManual(false);
    }
  }, [datos.giro, categoriaConfirmada]);

  function set(campo: keyof DatosFormulario, valor: string | boolean) {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  }

  function confirmarCategoria(cat: TipoCategoria) {
    setDatos((prev) => ({ ...prev, categoria: cat }));
    setCategoriaConfirmada(true);
    setMostrarSelectorManual(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    const negocio = await agregarNegocio(datos);
    setSlugFinal(negocio.slug);
    setEnviando(false);
    setRegistrado(true);
    onExito?.(negocio.slug);
  }

  // ─── Pantalla de éxito ──────────────────────────────────────────────────────
  if (registrado) {
    return (
      <div className="text-center py-12 px-4">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">
          ¡Tu negocio está registrado!
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
          Está en revisión. Te avisamos cuando esté activo.
        </p>
        <div className="bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-slate-600 dark:text-slate-300 mb-6">
          sanjuanonline.com/{slugFinal}
        </div>
        <p className="text-xs text-slate-400">
          ✓ Sin tarjeta de crédito &nbsp;·&nbsp; ✓ Activo en 24h &nbsp;·&nbsp; ✓ 100% gratis
        </p>
      </div>
    );
  }

  const catInfo = CATEGORIAS.find((c) => c.slug === categoriaDetectada);

  // ─── Formulario ─────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Urgencia */}
      <div className="flex items-center justify-center gap-2 bg-amber-500/20 border border-amber-500 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-full mb-6 w-fit mx-auto text-sm font-bold">
        <Sparkles className="w-4 h-4" />
        🔥 Solo quedan {contadorLugares} lugares gratuitos disponibles
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ── PASO 1: Nombre + Slug ── */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Nombre de tu negocio
          </label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text" required
              value={datos.nombre}
              onChange={(e) => set("nombre", e.target.value)}
              placeholder="Ej: Tacos El Güero de la Esquina"
              className={`${INPUT_BASE} pl-10`}
            />
          </div>
          {slug && (
            <p className="mt-1 text-xs text-slate-400 font-mono">
              sanjuanonline.com/<span className="text-amber-500 font-bold">{slug}</span>
            </p>
          )}
        </div>

        {/* ── PASO 2: Giro + Detección de categoría ── */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            ¿A qué te dedicas? (Giro)
          </label>
          <input
            type="text" required
            value={datos.giro}
            onChange={(e) => { set("giro", e.target.value); setCategoriaConfirmada(false); }}
            placeholder="Ej: Vendo tacos de birria, carnitas y barbacoa"
            className={INPUT_BASE}
          />

          {/* Categoría detectada */}
          {categoriaDetectada && !categoriaConfirmada && !mostrarSelectorManual && (
            <div className="mt-2 flex items-center gap-3 bg-slate-50 dark:bg-slate-700 rounded-xl px-4 py-3">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Detectamos: <strong>{catInfo?.icono} {catInfo?.nombre}</strong>
              </span>
              <button type="button" onClick={() => confirmarCategoria(categoriaDetectada)}
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                <Check className="w-3 h-3" /> Sí
              </button>
              <button type="button" onClick={() => setMostrarSelectorManual(true)}
                className="flex items-center gap-1 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 text-slate-700 dark:text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                <X className="w-3 h-3" /> No
              </button>
            </div>
          )}

          {/* Selector manual */}
          {(mostrarSelectorManual || (!categoriaDetectada && datos.giro.length > 5)) && !categoriaConfirmada && (
            <div className="mt-2">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Selecciona tu categoría:</p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIAS.map((cat) => (
                  <button key={cat.slug} type="button"
                    onClick={() => confirmarCategoria(cat.slug)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-sm text-slate-700 dark:text-slate-200 transition-colors text-left">
                    <span>{cat.icono}</span> {cat.nombre}
                  </button>
                ))}
                <button type="button"
                  onClick={() => confirmarCategoria("servicios")}
                  className="col-span-2 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 text-xs text-slate-400 hover:border-amber-400 transition-colors">
                  No estoy seguro — lo clasificamos después
                </button>
              </div>
            </div>
          )}

          {categoriaConfirmada && (
            <p className="mt-1 text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
              <Check className="w-3 h-3" />
              Categoría: {CATEGORIAS.find((c) => c.slug === datos.categoria)?.icono} {CATEGORIAS.find((c) => c.slug === datos.categoria)?.nombre}
              <button type="button" onClick={() => { setCategoriaConfirmada(false); setMostrarSelectorManual(true); }}
                className="ml-2 underline text-slate-400 hover:text-slate-600">cambiar</button>
            </p>
          )}
        </div>

        {/* ── PASO 3: Color de marca (logo generado) ── */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Color de tu negocio
          </label>
          <div className="flex items-center gap-3">
            {/* Preview del placeholder */}
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
              style={{ backgroundColor: datos.colorMarca }}>
              {obtenerIniciales(datos.nombre) || "?"}
            </div>
            {/* Paleta */}
            <div className="flex gap-2 flex-wrap">
              {COLORES_MARCA.map((color) => (
                <button key={color} type="button"
                  onClick={() => set("colorMarca", color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${datos.colorMarca === color ? "border-slate-800 dark:border-white scale-110" : "border-transparent"}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-1">Este color aparecerá en tu tarjeta y página del directorio.</p>
        </div>

        {/* ── PASO 4: Teléfonos ── */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Teléfono principal <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="tel" required
              value={datos.telefonoPrincipal}
              onChange={(e) => set("telefonoPrincipal", formatearTelefono(e.target.value))}
              placeholder="(444) 123-4567"
              className={`${INPUT_BASE} pl-10`}
            />
          </div>

          {/* Teléfonos extra */}
          {telefonosExtra >= 1 && (
            <div className="relative mt-2">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="tel"
                value={datos.telefonoExtra1}
                onChange={(e) => set("telefonoExtra1", formatearTelefono(e.target.value))}
                placeholder="Teléfono 2 (opcional)"
                className={`${INPUT_BASE} pl-10 pr-10`}
              />
              <button type="button" onClick={() => { setTelefonosExtra(0); set("telefonoExtra1", ""); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
          {telefonosExtra >= 2 && (
            <div className="relative mt-2">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="tel"
                value={datos.telefonoExtra2}
                onChange={(e) => set("telefonoExtra2", formatearTelefono(e.target.value))}
                placeholder="Teléfono 3 (opcional)"
                className={`${INPUT_BASE} pl-10 pr-10`}
              />
              <button type="button" onClick={() => { setTelefonosExtra(1); set("telefonoExtra2", ""); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {telefonosExtra < 2 && (
            <button type="button" onClick={() => setTelefonosExtra((p) => p + 1)}
              className="mt-2 flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 hover:underline">
              <Plus className="w-3 h-3" /> Agregar otro teléfono
            </button>
          )}

          {/* WhatsApp */}
          <div className="mt-3 flex items-center gap-2">
            <input type="checkbox" id="wa-mismo"
              checked={datos.whatsappMismoNumero}
              onChange={(e) => set("whatsappMismoNumero", e.target.checked)}
              className="w-4 h-4 accent-amber-500"
            />
            <label htmlFor="wa-mismo" className="text-sm text-slate-600 dark:text-slate-300">
              💬 Usar el mismo número para WhatsApp
            </label>
          </div>
          {!datos.whatsappMismoNumero && (
            <div className="relative mt-2">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="tel"
                value={datos.whatsapp}
                onChange={(e) => set("whatsapp", formatearTelefono(e.target.value))}
                placeholder="Número de WhatsApp"
                className={`${INPUT_BASE} pl-10`}
              />
            </div>
          )}

          {/* Messenger */}
          <div className="mt-3">
            <input type="text"
              value={datos.messenger}
              onChange={(e) => set("messenger", e.target.value)}
              placeholder="📨 Facebook: @tunegocio o facebook.com/tunegocio (opcional)"
              className={INPUT_BASE}
            />
          </div>
        </div>

        {/* ── PASO 5: Dirección ── */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            ¿Dónde te encuentran?
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <textarea required rows={2}
              value={datos.direccion}
              onChange={(e) => set("direccion", e.target.value)}
              placeholder="Calle Hidalgo #123, Colonia Centro, San Juan del Río"
              className={`${INPUT_BASE} pl-10 resize-none`}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Escríbela como se la dirías a un cliente. Ej: "Atrás de la gasolinera Pemex"
          </p>
        </div>

        {/* ── PASO 6: Descripción ── */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Describe tu negocio en una frase
          </label>
          <textarea required rows={2}
            maxLength={150}
            value={datos.descripcion}
            onChange={(e) => set("descripcion", e.target.value)}
            placeholder="Los mejores tacos de birria de San Juan, con más de 10 años de tradición"
            className={`${INPUT_BASE} resize-none`}
          />
          <p className="text-xs text-slate-400 text-right">{datos.descripcion.length}/150</p>
        </div>

        {/* ── Submit ── */}
        <button type="submit" disabled={enviando || !categoriaConfirmada}
          className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-black py-4 rounded-xl text-lg transition-colors">
          {enviando ? "Creando tu página..." : "Crear mi página GRATIS →"}
        </button>

        <p className="text-center text-xs text-slate-400">
          ✓ Sin tarjeta de crédito &nbsp;·&nbsp; ✓ Activo inmediatamente &nbsp;·&nbsp; ✓ Cancelas cuando quieras
        </p>
      </form>
    </div>
  );
}
