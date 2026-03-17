
// Tipos de Categoría
export type TipoCategoria = 
  | "comida-rapida"
  | "restaurantes"
  | "entretenimiento"
  | "servicios"
  | "mantenimiento"
  | "salud"
  | "hoteles"
  | "mascotas";

// Tipos de Plan de Suscripción
export type TipoPlanSuscripcion = "vip" | "estandar" | "basico";

// Tipos de Enlace
export type TipoEnlace = "landing" | "externo";

// Estado del negocio
export type EstadoNegocio = "activo" | "construccion";

// Producto del editor
export interface ProductoEditor {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
}

// Item de galería del editor
export interface ItemGaleriaEditor {
  id: string;
  url: string;
  descripcion?: string;
}

// Testimonio del editor
export interface TestimonioEditor {
  id: string;
  nombre: string;
  comentario: string;
  calificacion: number;
}

// Estructura de un Negocio
export interface Negocio {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: TipoCategoria;
  slug: string;
  imagen: string;
  planSuscripcion: TipoPlanSuscripcion;
  tipoEnlace: TipoEnlace;
  estado?: EstadoNegocio; // Por defecto "activo"
  urlExterna?: string;
  landing?: LandingData;
  
  // NUEVOS CAMPOS DEL EDITOR
  productos?: ProductoEditor[];
  galeria?: ItemGaleriaEditor[];
  testimonios?: TestimonioEditor[];
}

// Estructura de la Landing Interna
export interface LandingData {
  secciones: Seccion[];
  colores: {
    primario: string;
    secundario: string;

  };
}

// Tipos de Secciones de la Landing
export type Seccion = 
  | SeccionBanner
  | SeccionInformacion
  | SeccionProductos
  | SeccionGaleria
  | SeccionTestimonios
  | SeccionContacto;

// Estructura de la Sección de Banner
export interface SeccionBanner {
  tipo: "banner";
  imagen: string;
  titulo: string;
  subtitulo: string;
}

// Estructura de la Sección de Información
export interface SeccionInformacion {
  tipo: "informacion";
  titulo: string;
  contenido: string;
}

// Estructura de la Sección de Productos
export interface SeccionProductos {
  tipo: "productos";
  titulo: string;
  productos: Producto[];
}

// Estructura de un Producto
export interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

// Estructura de la Sección de Galería
export interface SeccionGaleria {
  tipo: "galeria";
  titulo: string;
  imagenes: string[];
}

// Estructura de la Sección de Testimonios
export interface SeccionTestimonios {
  tipo: "testimonios";
  titulo: string;
  testimonios: Testimonio[];
}

// Estructura de un Testimonio
export interface Testimonio {
  autor: string;
  comentario: string;
}

// Estructura de la Sección de Contacto
export interface SeccionContacto {
  tipo: "contacto";
  telefono: string;
  email: string;
  ubicacion: string;
}
