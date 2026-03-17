"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Negocio } from "../database/tiposNegocios";
import { obtenerNegocioPorSlug } from "../database/serviciosFirestore";
import { extraerDatosLanding } from "../database/helpers";
import LayoutLanding from "../layouts/LayoutLanding";
import OverlayEnConstruccion from "./OverlayEnConstruccion";
import OverlayPlanBasico from "./OverlayPlanBasico";
import SeccionBanner from "./uilanding/secciones/SeccionBanner";
import SeccionInformacion from "./uilanding/secciones/SeccionInformacion";
import SeccionProductos from "./uilanding/secciones/SeccionProductos";
import SeccionGaleria from "./uilanding/secciones/SeccionGaleria";
import SeccionTestimonios from "./uilanding/secciones/SeccionTestimonios";
import SeccionContacto from "./uilanding/secciones/SeccionContacto";

function RenderSecciones({ negocio }: { negocio: Negocio }) {
  const { landing, planSuscripcion } = negocio;
  if (!landing) return null;
  
  const esPlanBasico = planSuscripcion === "basico";
  
  // Usar datos del editor si existen, sino usar los de landing.secciones
  const productosEditor = (negocio as any).productos;
  const galeriaEditor = (negocio as any).galeria;
  const testimoniosEditor = (negocio as any).testimonios;
  
  return (
    <>
      {landing.secciones.map((seccion, i) => {
        switch (seccion.tipo) {
          case "banner":
            return <SeccionBanner key={i} seccion={seccion} colorSecundario={landing.colores.secundario} />;
          
          case "informacion":
            return <SeccionInformacion key={i} seccion={seccion} colorPrimario={landing.colores.primario} />;
          
          case "productos":
            // Si hay productos del editor, crear seccion con esos datos
            const seccionProductos = productosEditor && productosEditor.length > 0
              ? {
                  tipo: "productos" as const,
                  titulo: seccion.titulo,
                  productos: productosEditor.map((p: any) => ({
                    nombre: p.nombre,
                    descripcion: p.descripcion,
                    precio: p.precio,
                    imagen: p.imagen || seccion.productos[0]?.imagen || "/placeholder.jpg",
                  })),
                }
              : seccion;
            
            return (
              <div key={i} className="relative">
                <SeccionProductos seccion={seccionProductos} colorPrimario={landing.colores.primario} colorSecundario={landing.colores.secundario} />
                {esPlanBasico && <OverlayPlanBasico nombreSeccion="Productos" />}
              </div>
            );
          
          case "galeria":
            // Si hay galería del editor, crear seccion con esas URLs
            const seccionGaleria = galeriaEditor && galeriaEditor.length > 0
              ? {
                  tipo: "galeria" as const,
                  titulo: seccion.titulo,
                  imagenes: galeriaEditor.map((g: any) => g.url),
                }
              : seccion;
            
            return (
              <div key={i} className="relative">
                <SeccionGaleria seccion={seccionGaleria} colorPrimario={landing.colores.primario} />
                {esPlanBasico && <OverlayPlanBasico nombreSeccion="Galería" />}
              </div>
            );
          
          case "testimonios":
            // Si hay testimonios del editor, crear seccion con esos datos
            const seccionTestimonios = testimoniosEditor && testimoniosEditor.length > 0
              ? {
                  tipo: "testimonios" as const,
                  titulo: seccion.titulo,
                  testimonios: testimoniosEditor.map((t: any) => ({
                    autor: t.nombre,
                    comentario: t.comentario,
                  })),
                }
              : seccion;
            
            return (
              <div key={i} className="relative">
                <SeccionTestimonios seccion={seccionTestimonios} colorPrimario={landing.colores.primario} colorSecundario={landing.colores.secundario} />
                {esPlanBasico && <OverlayPlanBasico nombreSeccion="Testimonios" />}
              </div>
            );
          
          case "contacto":
            return <SeccionContacto key={i} seccion={seccion} colorPrimario={landing.colores.primario} />;
          
          default:
            return null;
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
