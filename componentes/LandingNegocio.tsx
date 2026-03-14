"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Negocio } from "../database/tiposNegocios";
import { obtenerNegocioPorSlug } from "../database/serviciosFirestore";
import { extraerDatosLanding } from "../database/helpers";
import LayoutLanding from "../layouts/LayoutLanding";
import OverlayEnConstruccion from "./OverlayEnConstruccion";
import SeccionBanner from "./uilanding/secciones/SeccionBanner";
import SeccionInformacion from "./uilanding/secciones/SeccionInformacion";
import SeccionProductos from "./uilanding/secciones/SeccionProductos";
import SeccionGaleria from "./uilanding/secciones/SeccionGaleria";
import SeccionTestimonios from "./uilanding/secciones/SeccionTestimonios";
import SeccionContacto from "./uilanding/secciones/SeccionContacto";

function RenderSecciones({ negocio }: { negocio: Negocio }) {
  const { landing } = negocio;
  if (!landing) return null;
  return (
    <>
      {landing.secciones.map((seccion, i) => {
        switch (seccion.tipo) {
          case "banner":      return <SeccionBanner      key={i} seccion={seccion} colorSecundario={landing.colores.secundario} />;
          case "informacion": return <SeccionInformacion key={i} seccion={seccion} colorPrimario={landing.colores.primario} />;
          case "productos":   return <SeccionProductos   key={i} seccion={seccion} colorPrimario={landing.colores.primario} colorSecundario={landing.colores.secundario} />;
          case "galeria":     return <SeccionGaleria     key={i} seccion={seccion} colorPrimario={landing.colores.primario} />;
          case "testimonios": return <SeccionTestimonios key={i} seccion={seccion} colorPrimario={landing.colores.primario} colorSecundario={landing.colores.secundario} />;
          case "contacto":    return <SeccionContacto    key={i} seccion={seccion} colorPrimario={landing.colores.primario} />;
          default:            return null;
        }
      })}
    </>
  );
}

export default function LandingPage() {
  const { slug } = useParams() as { slug: string };
  const [negocio, setNegocio] = useState<Negocio | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerNegocioPorSlug(slug)
      .then(setNegocio)
      .finally(() => setCargando(false));
  }, [slug]);

  if (cargando) return <div className="min-h-screen flex items-center justify-center"><p className="text-slate-400">Cargando...</p></div>;
  if (!negocio?.landing) return <div className="min-h-screen flex items-center justify-center"><p className="text-2xl text-slate-600">Negocio no encontrado</p></div>;

  const datosLanding = extraerDatosLanding(negocio)!;

  return (
    <>
      <LayoutLanding {...datosLanding}>
        <RenderSecciones negocio={negocio} />
      </LayoutLanding>
      {negocio.estado === "construccion" && (
        <OverlayEnConstruccion nombreNegocio={negocio.nombre} telefono={datosLanding.telefono} />
      )}
    </>
  );
}
