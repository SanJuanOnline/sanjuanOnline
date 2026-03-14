import { SeccionGaleria as SeccionGaleriaType } from "../../../database/tiposNegocios";

interface SeccionGaleriaProps {
  seccion: SeccionGaleriaType;
  colorPrimario: string;
}

export default function SeccionGaleria({ seccion, colorPrimario }: SeccionGaleriaProps) {
  return (
    <section id="galeria" className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 
          className="text-3xl md:text-4xl font-black mb-12 text-center"
          style={{ color: colorPrimario }}
        >
          {seccion.titulo}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {seccion.imagenes.map((imagen, index) => (
            <div 
              key={index}
              className="aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform"
            >
              <img
                src={imagen}
                alt={`Galería ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
