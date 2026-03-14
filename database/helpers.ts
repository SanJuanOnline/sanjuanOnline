import { Negocio } from "./tiposNegocios";

/**
 * Extrae los datos de contacto de un negocio
 */
export function extraerDatosContacto(negocio: Negocio) {
  if (!negocio.landing) return undefined;
  
  const seccionContacto = negocio.landing.secciones.find(s => s.tipo === "contacto");
  
  if (!seccionContacto) return undefined;
  
  return {
    telefono: seccionContacto.telefono,
    email: seccionContacto.email,
    ubicacion: seccionContacto.ubicacion,
  };
}

/**
 * Extrae los datos básicos para el layout de landing
 */
export function extraerDatosLanding(negocio: Negocio) {
  if (!negocio.landing) return null;
  
  const contacto = extraerDatosContacto(negocio);
  
  return {
    nombreNegocio: negocio.nombre,
    colores: negocio.landing.colores,
    telefono: contacto?.telefono,
    contacto,
  };
}
