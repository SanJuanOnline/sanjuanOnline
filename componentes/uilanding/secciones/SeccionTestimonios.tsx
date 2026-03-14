import { SeccionTestimonios as SeccionTestimoniosType } from "../../../database/tiposNegocios";
import { Quote } from "lucide-react";

interface SeccionTestimoniosProps {
  seccion: SeccionTestimoniosType;
  colorPrimario: string;
  colorSecundario: string;
}

export default function SeccionTestimonios({ seccion, colorPrimario, colorSecundario }: SeccionTestimoniosProps) {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 
          className="text-3xl md:text-4xl font-black mb-12 text-center"
          style={{ color: colorPrimario }}
        >
          {seccion.titulo}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {seccion.testimonios.map((testimonio, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 relative"
            >
              <Quote 
                className="absolute top-4 right-4 w-8 h-8 opacity-20"
                style={{ color: colorSecundario }}
              />
              <p className="text-slate-700 dark:text-slate-300 mb-4 italic">
                "{testimonio.comentario}"
              </p>
              <p 
                className="font-bold"
                style={{ color: colorPrimario }}
              >
                - {testimonio.autor}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
