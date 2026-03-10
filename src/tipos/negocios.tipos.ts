export interface Contacto {
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  telefono?: string;
}

export interface Negocio {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  contacto: Contacto;
  slogan?: string;
}