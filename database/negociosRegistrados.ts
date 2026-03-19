import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { TipoCategoria } from "./tiposNegocios";
import { NegocioRegistrado, DatosFormulario } from "./tiposRegistro";

// ─── Utilidades ──────────────────────────────────────────────────────────────

export function generarSlug(nombre: string): string {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function generarUUID(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function formatearTelefono(valor: string): string {
  const solo = valor.replace(/\D/g, "").slice(0, 10);
  if (solo.length <= 3) return solo;
  if (solo.length <= 6) return `(${solo.slice(0, 3)}) ${solo.slice(3)}`;
  return `(${solo.slice(0, 3)}) ${solo.slice(3, 6)}-${solo.slice(6)}`;
}

export function obtenerIniciales(nombre: string): string {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

// ─── Detección de categoría ───────────────────────────────────────────────────

const palabrasClave: Record<TipoCategoria, string[]> = {
  "comida-rapida": ["taco", "hamburguesa", "hot dog", "pizza", "alitas", "burrito", "torta", "antojito", "comida rapida", "fast food", "papas", "snack"],
  "restaurantes":  ["restaurante", "comida corrida", "cocina", "chef", "platillo", "menu del dia", "buffet", "comedor", "familiar"],
  "entretenimiento": ["bar", "antro", "karaoke", "billar", "boliche", "cine", "juego", "diversion", "evento", "fiesta", "musica en vivo"],
  "servicios": ["abogado", "contador", "disenador", "fotografo", "maestro", "tutor", "consultor", "asesor", "servicio profesional", "notario", "arquitecto"],
  "mantenimiento": ["plomero", "electricista", "albanil", "pintor", "carpintero", "cerrajero", "reparacion", "mantenimiento", "arreglo", "instalacion"],
  "salud":         ["doctor", "medico", "dentista", "farmacia", "spa", "masaje", "terapia", "clinica", "hospital", "salud", "bienestar"],
  "mascotas":      ["veterinaria", "mascota", "perro", "gato", "alimento para mascotas", "peluqueria canina", "pet shop", "pet"],
  "hoteles":       ["hotel", "motel", "hostal", "habitacion", "hospedaje", "alojamiento", "cabana"],
  "autos":         ["taller", "mecanico", "refacciones", "llantas", "auto", "carro", "vehiculo", "lavado", "hojalateria", "pintura automotriz"],
};

export function detectarCategoria(giro: string): TipoCategoria | null {
  const texto = giro
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  for (const [cat, palabras] of Object.entries(palabrasClave)) {
    if (palabras.some((p) => texto.includes(p))) {
      return cat as TipoCategoria;
    }
  }
  return null;
}

// ─── Persistencia (localStorage → reemplazar por Firebase en Fase 2) ─────────

const STORAGE_KEY = "negociosSanJuan";

function cargarDesdeStorage(): NegocioRegistrado[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function guardarEnStorage(lista: NegocioRegistrado[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

export function obtenerNegociosRegistrados(): NegocioRegistrado[] {
  return cargarDesdeStorage();
}

function slugUnico(base: string): string {
  const existentes = cargarDesdeStorage().map((n) => n.slug);
  let slug = base;
  let i = 2;
  while (existentes.includes(slug)) {
    slug = `${base}-${i}`;
    i++;
  }
  return slug;
}

// Fase 2 — Firestore
export async function agregarNegocio(datos: DatosFormulario): Promise<NegocioRegistrado> {
  const telefonos = [datos.telefonoPrincipal, datos.telefonoExtra1, datos.telefonoExtra2].filter(Boolean);

  const nuevo: any = {
    slug: slugUnico(generarSlug(datos.nombre)),
    nombre: datos.nombre,
    giro: datos.giro,
    descripcion: datos.descripcion,
    categoria: datos.categoria,
    imagen: datos.logoBase64 || "", // Campo correcto para Negocio
    logo: datos.logoBase64 || null, // Mantener compatibilidad
    usarLogoGenerado: datos.usarLogoGenerado,
    colorMarca: datos.colorMarca,
    telefonos,
    whatsapp: datos.whatsappMismoNumero ? datos.telefonoPrincipal : datos.whatsapp || null,
    messenger: datos.messenger || null,
    direccion: datos.direccion,
    plan: "gratis",
    planSuscripcion: "basico", // Campo correcto para Negocio
    estado: "activo", // Cambiar a activo para que aparezca inmediatamente
    fechaRegistro: new Date().toISOString(),
    visitas: 0,
    clicksTelefono: 0,
    clicksWhatsApp: 0,
    tieneSitioWeb: datos.tieneSitioWeb,
    urlExterna: datos.tieneSitioWeb ? (datos.urlExterna ?? null) : null,
    tipoLanding: datos.tieneSitioWeb ? "externa" : "interna",
    tipoEnlace: datos.tieneSitioWeb ? "externo" : "landing", // Campo correcto para Negocio
  };

  const docRef = await addDoc(collection(db, "negocios"), nuevo);
  return { ...nuevo, id: docRef.id };
}
