export type TipoCategoria =
  | "restaurantes"
  | "comida-rapida"
  | "entretenimiento"
  | "servicios"
  | "salud"
  | "mantenimiento"
  | "mascotas";

export type TipoSeccionLanding =
  | "banner"
  | "informacion"
  | "productos"
  | "galeria"
  | "testimonios"
  | "contacto";

export interface EstiloLanding {
  colorPrimario: string;
  colorSecundario: string;
  fondo: string;
  tipografia: string;
}

export interface Producto {
  nombre: string;
  descripcion: string;
  precio: string;
  imagen: string;
}

export interface Testimonio {
  nombre: string;
  comentario: string;
  calificacion: number;
}

export interface HorarioDia {
  abre: string;
  cierra: string;
}

export interface Horarios {
  lunes?: HorarioDia;
  martes?: HorarioDia;
  miercoles?: HorarioDia;
  jueves?: HorarioDia;
  viernes?: HorarioDia;
  sabado?: HorarioDia;
  domingo?: HorarioDia;
}

export interface Contacto {
  telefonos?: string[];
  whatsapp?: string;
  messenger?: string;
  email?: string;
  web?: string;
}

export interface Direccion {
  calle: string;
  numero: string;
  colonia: string;
  alcaldia: string;
  cp: string;
  mapa?: string;
}

export interface RedesSociales {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
}

export interface LandingData {
  estilo: EstiloLanding;
  secciones: TipoSeccionLanding[];

  banner?: {
    portada: string;
    slogan: string;
  };

  informacion?: {
    descripcion: string;
  };

  productos?: Producto[];

  galeria?: string[];

  testimonios?: Testimonio[];

  contacto?: {
    direccion: Direccion;
    horarios: Horarios;
    contacto: Contacto;
    redes: RedesSociales;
  };
}

export interface Negocio {
  id: string;
  slug: string;

  nombre: string;
  logo: string;
  slogan: string;

  categoria: TipoCategoria;

  destacado: boolean;

  tipoEnlace: "landing" | "externo";

  urlExterna?: string;

  landing?: LandingData;
}