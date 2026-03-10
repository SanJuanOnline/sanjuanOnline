import { useParams } from "react-router-dom";
import { NEGOCIOS } from "../data/negocios.db";

import SeccionBanner from "./SeccionBanner";
import SeccionInformacion from "./SeccionInformacion";
import SeccionProductos from "./SeccionProductos";
import SeccionGaleria from "./SeccionGaleria";
import SeccionTestimonios from "./SeccionTestimonios";
import SeccionContacto from "./SeccionContacto";

export default function LandingClientes() {
  const { slug } = useParams();

  const negocio = NEGOCIOS.find((n) => n.slug === slug);

  if (!negocio || !negocio.landing) {
    return <div>Negocio no encontrado</div>;
  }

  const landing = negocio.landing;

  return (
    <div>

      {landing.secciones.map((seccion) => {

        switch (seccion) {

          case "banner":
            return <SeccionBanner key="banner" data={landing.banner} />;

          case "informacion":
            return <SeccionInformacion key="info" data={landing.informacion} />;

          case "productos":
            return <SeccionProductos key="productos" data={landing.productos} />;

          case "galeria":
            return <SeccionGaleria key="galeria" data={landing.galeria} />;

          case "testimonios":
            return <SeccionTestimonios key="testimonios" data={landing.testimonios} />;

          case "contacto":
            return <SeccionContacto key="contacto" data={landing.contacto} />;

          default:
            return null;
        }

      })}
    </div>
  );
}