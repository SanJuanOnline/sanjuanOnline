// Soy la sección: SeccionTestimonios

import { Testimonio } from "../data/tipos.db";

interface Props {
  data?: Testimonio[];
}

export default function SeccionTestimonios({ data }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((testimonio, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">"{testimonio.comentario}"</p>
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(testimonio.calificacion)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="ml-2 font-semibold">{testimonio.nombre}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
