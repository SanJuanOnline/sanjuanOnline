// Tipos para el sistema de registro inteligente
import { TipoCategoria } from "./tiposNegocios";

export type PlanRegistro = "gratis" | "basico" | "estandar" | "vip";
export type EstadoRegistro = "pendiente" | "activo" | "pausado";

export interface NegocioRegistrado {
  id: string;
  slug: string;
  nombre: string;
  giro: string;
  descripcion: string;
  categoria: TipoCategoria;
  logo: string | null;
  usarLogoGenerado: boolean;
  colorMarca: string;
  telefonos: string[];
  whatsapp: string | null;
  messenger: string | null;
  direccion: string;
  plan: PlanRegistro;
  estado: EstadoRegistro;
  fechaRegistro: string; // ISO string (serializable en localStorage)
  visitas: number;
  clicksTelefono: number;
  clicksWhatsApp: number;
}

export interface DatosFormulario {
  nombre: string;
  giro: string;
  descripcion: string;
  categoria: TipoCategoria;
  usarLogoGenerado: boolean;
  colorMarca: string;
  telefonoPrincipal: string;
  telefonoExtra1: string;
  telefonoExtra2: string;
  whatsappMismoNumero: boolean;
  whatsapp: string;
  messenger: string;
  direccion: string;
}
