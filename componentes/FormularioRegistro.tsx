"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { generarSlug, detectarCategoria, formatearTelefono, obtenerIniciales, agregarNegocio } from "../database/negociosRegistrados";
import { TipoCategoria } from "../database/tiposNegocios";
import { DatosFormulario } from "../database/tiposRegistro";
import { Sparkles, Store, Phone, MapPin, Check, X, Plus, Trash2, Upload, Image as ImageIcon } from "lucide-react";

// ─── Constantes ───────────────────────────────────────────────────────────────

const CATEGORIAS: { slug: TipoCategoria; nombre: string; icono: string }[] = [
  { slug: "comida-rapida",   nombre: "Comida Rápida",    icono: "🍔" },
  { slug: "restaurantes",    nombre: "Restaurantes",      icono: "🍽️" },
  { slug: "entretenimiento", nombre: "Entretenimiento",   icono: "🎭" },
  { slug: "servicios",       nombre: "Servicios",         icono: "🛠️" },
  { slug: "mantenimiento",   nombre: "Mantenimiento",     icono: "🔧" },
  { slug: "salud",           nombre: "Salud",             icono: "❤️" },
  { slug: "mascotas",        nombre: "Mascotas",          icono: "🐾" },
  { slug: "hoteles",         nombre: "Hoteles",           icono: "🏨" },
  { slug: "autos",           nombre: "Autos",             icono: "🚗" },
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
    tieneSitioWeb: false, urlExterna: "",
  });

  const [slug, setSlug] = useState("");
  const [categoriaDetectada, setCategoriaDetectada] = useState<TipoCategoria | null>(null);
  const [categoriaConfirmada, setCategoriaConfirmada] = useState(false);
  const [mostrarSelectorManual, setMostrarSelectorManual] = useState(false);
  const [telefonosExtra, setTelefonosExtra] = useState(0); // 0, 1 o 2 extras
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [noTengoLogo, setNoTengoLogo] = useState(false);
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

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validar tipo
    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "Archivo inválido",
        text: "Por favor selecciona una imagen válida (JPG, PNG, etc.)",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }
    
    // Validar tamaño
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Imagen muy pesada",
        text: "La imagen debe pesar menos de 2MB",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    setLogoFile(file);
    set("usarLogoGenerado", false);
    setNoTengoLogo(false);

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function usarLogoGenerado() {
    setLogoFile(null);
    setLogoPreview(null);
    set("usarLogoGenerado", true);
    setNoTengoLogo(false);
  }

  function marcarNoTengoLogo() {
    setNoTengoLogo(true);
    setLogoFile(null);
    setLogoPreview(null);
    set("usarLogoGenerado", true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Validaciones básicas (siempre requeridas)
    if (!datos.nombre.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campo requerido",
        text: "El nombre del negocio es obligatorio",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    if (datos.nombre.trim().length < 3) {
      Swal.fire({
        icon: "warning",
        title: "Nombre muy corto",
        text: "El nombre debe tener al menos 3 caracteres",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    if (!datos.giro.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campo requerido",
        text: "Describe a qué te dedicas (giro del negocio)",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    if (!categoriaConfirmada) {
      Swal.fire({
        icon: "warning",
        title: "Categoría no confirmada",
        text: "Por favor confirma la categoría de tu negocio",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    // Si tiene URL externa, validar URL y terminar
    if (datos.tieneSitioWeb) {
      if (!datos.urlExterna || !datos.urlExterna.trim()) {
        Swal.fire({
          icon: "warning",
          title: "URL requerida",
          text: "Ingresa la URL de tu sitio web",
          confirmButtonColor: "#F59E0B",
        });
        return;
      }

      try {
        new URL(datos.urlExterna);
      } catch {
        Swal.fire({
          icon: "warning",
          title: "URL inválida",
          text: "Ingresa una URL válida (ej: https://mi-negocio.com)",
          confirmButtonColor: "#F59E0B",
        });
        return;
      }

      // Guardar con datos mínimos
      setEnviando(true);
      try {
        const datosMinimos = {
          nombre: datos.nombre,
          giro: datos.giro,
          categoria: datos.categoria,
          colorMarca: datos.colorMarca,
          logoBase64: logoPreview || undefined,
          usarLogoGenerado: datos.usarLogoGenerado,
          tieneSitioWeb: true,
          urlExterna: datos.urlExterna,
          telefonoPrincipal: "",
          direccion: "",
          descripcion: datos.giro,
          whatsappMismoNumero: true,
          whatsapp: "",
          messenger: "",
          telefonoExtra1: "",
          telefonoExtra2: "",
        };
        
        const negocio = await agregarNegocio(datosMinimos);
        setSlugFinal(negocio.slug);
        setEnviando(false);
        setRegistrado(true);
        
        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: "Tu negocio está en revisión. Te avisamos cuando esté activo.",
          confirmButtonColor: "#F59E0B",
          timer: 3000,
        });
        
        onExito?.(negocio.slug);
      } catch (error) {
        setEnviando(false);
        Swal.fire({
          icon: "error",
          title: "Error al registrar",
          text: "Hubo un problema. Por favor intenta de nuevo.",
          confirmButtonColor: "#F59E0B",
        });
      }
      return;
    }

    // Validaciones completas para landing interna
    if (!datos.telefonoPrincipal.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Teléfono requerido",
        text: "Necesitas al menos un número de contacto",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    if (datos.telefonoPrincipal.replace(/\D/g, "").length < 10) {
      Swal.fire({
        icon: "warning",
        title: "Teléfono inválido",
        text: "El teléfono debe tener 10 dígitos",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    if (datos.telefonoExtra1 && datos.telefonoExtra1.replace(/\D/g, "").length < 10) {
      Swal.fire({
        icon: "warning",
        title: "Teléfono 2 inválido",
        text: "El teléfono debe tener 10 dígitos o déjalo vacío",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    if (datos.telefonoExtra2 && datos.telefonoExtra2.replace(/\D/g, "").length < 10) {
      Swal.fire({
        icon: "warning",
        title: "Teléfono 3 inválido",
        text: "El teléfono debe tener 10 dígitos o déjalo vacío",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    if (!datos.whatsappMismoNumero && datos.whatsapp && datos.whatsapp.replace(/\D/g, "").length < 10) {
      Swal.fire({
        icon: "warning",
        title: "WhatsApp inválido",
        text: "El número de WhatsApp debe tener 10 dígitos",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    if (!datos.direccion.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Dirección requerida",
        text: "Indica dónde te encuentran tus clientes",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    if (!datos.descripcion.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Descripción requerida",
        text: "Describe tu negocio en una frase",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    if (datos.descripcion.trim().length < 20) {
      Swal.fire({
        icon: "warning",
        title: "Descripción muy corta",
        text: "La descripción debe tener al menos 20 caracteres",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    setEnviando(true);
    
    try {
      const datosConLogo = {
        ...datos,
        logoBase64: logoPreview || undefined,
      };
      
      const negocio = await agregarNegocio(datosConLogo);
      setSlugFinal(negocio.slug);
      setEnviando(false);
      setRegistrado(true);
      
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Tu negocio está en revisión. Te avisamos cuando esté activo.",
        confirmButtonColor: "#F59E0B",
        timer: 3000,
      });
      
      onExito?.(negocio.slug);
    } catch (error) {
      setEnviando(false);
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: "Hubo un problema. Por favor intenta de nuevo.",
        confirmButtonColor: "#F59E0B",
      });
    }
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

        {/* ── PASO 3: Logo ── */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Logo de tu negocio
          </label>
          
          <div className="flex items-start gap-4">
            {/* Preview */}
            <div className="flex-shrink-0">
              {datos.usarLogoGenerado ? (
                <div className="w-20 h-20 rounded-xl flex items-center justify-center text-white font-black text-2xl"
                  style={{ backgroundColor: datos.colorMarca }}>
                  {obtenerIniciales(datos.nombre) || "?"}
                </div>
              ) : logoPreview ? (
                <img src={logoPreview} alt="Logo preview" className="w-20 h-20 rounded-xl object-cover border-2 border-slate-200 dark:border-slate-600" />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-slate-400" />
                </div>
              )}
            </div>

            {/* Opciones */}
            <div className="flex-1 space-y-2">
              {/* Subir logo */}
              <label className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-lg cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                {logoFile ? "Cambiar logo" : "Subir mi logo"}
                <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
              </label>

              {/* Checkbox: No tengo logo */}
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="no-logo"
                  checked={noTengoLogo}
                  onChange={(e) => e.target.checked && marcarNoTengoLogo()}
                  className="w-4 h-4 accent-amber-500"
                />
                <label htmlFor="no-logo" className="text-sm text-slate-600 dark:text-slate-300">
                  No tengo logo (usar iniciales)
                </label>
              </div>

              {/* Usar logo generado */}
              {!datos.usarLogoGenerado && !noTengoLogo && (
                <button type="button" onClick={usarLogoGenerado}
                  className="w-full px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-white text-sm font-bold rounded-lg transition-colors">
                  Usar logo generado
                </button>
              )}

              <p className="text-xs text-slate-400">
                {datos.usarLogoGenerado 
                  ? "Usaremos tus iniciales con el color de tu marca" 
                  : "Formato: JPG, PNG. Máximo 2MB"}
              </p>
            </div>
          </div>
        </div>

        {/* ── PASO 4: ¿Ya tienes sitio web? ── */}
        <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border-2 border-amber-200 dark:border-amber-700">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            ¿Ya tienes un sitio web?
          </label>
          
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="tieneSitioWeb"
                checked={!datos.tieneSitioWeb}
                onChange={() => set("tieneSitioWeb", false)}
                className="mt-1"
              />
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">No, quiero crear mi landing aquí</p>
                <p className="text-xs text-slate-500">Crearemos una página para tu negocio (gratis)</p>
              </div>
            </label>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="tieneSitioWeb"
                checked={datos.tieneSitioWeb}
                onChange={() => set("tieneSitioWeb", true)}
                className="mt-1"
              />
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">Sí, ya tengo mi sitio web</p>
                <p className="text-xs text-slate-500">Solo apareceré en el directorio con mi URL</p>
              </div>
            </label>
          </div>
          
          {datos.tieneSitioWeb && (
            <div className="mt-4">
              <input
                type="url"
                required
                value={datos.urlExterna}
                onChange={(e) => set("urlExterna", e.target.value)}
                placeholder="https://mi-negocio.com"
                className={INPUT_BASE}
              />
              <p className="text-xs text-slate-400 mt-1">
                Tu tarjeta en el directorio abrirá esta URL en una nueva pestaña
              </p>
            </div>
          )}
        </div>

        {/* Si tiene URL externa, termina aquí */}
        {datos.tieneSitioWeb ? (
          <>
            <button type="submit" disabled={enviando || !categoriaConfirmada}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-black py-4 rounded-xl text-lg transition-colors">
              {enviando ? "Registrando..." : "Registrar mi negocio GRATIS →"}
            </button>
            <p className="text-center text-xs text-slate-400">
              ✓ Sin tarjeta de crédito &nbsp;·&nbsp; ✓ Activo inmediatamente &nbsp;·&nbsp; ✓ Cancelas cuando quieras
            </p>
          </>
        ) : (
          <>
            {/* ── PASO 5: Color de marca ── */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Color de tu negocio
              </label>
              <div className="flex items-center gap-3">
                {/* Preview del placeholder (solo si usa logo generado) */}
                {datos.usarLogoGenerado && (
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                    style={{ backgroundColor: datos.colorMarca }}>
                    {obtenerIniciales(datos.nombre) || "?"}
                  </div>
                )}
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
              <p className="text-xs text-slate-400 mt-1">
                {datos.usarLogoGenerado 
                  ? "Este color aparecerá en tu logo generado y tarjeta del directorio" 
                  : "Este color se usará en tu tarjeta del directorio"}
              </p>
            </div>

            {/* ── PASO 6: Teléfonos ── */}
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

            {/* ── PASO 7: Dirección ── */}
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

            {/* ── PASO 8: Descripción ── */}
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
          </>
        )}
      </form>
    </div>
  );
}
