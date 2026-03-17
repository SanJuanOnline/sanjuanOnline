import { SeccionProductos as SeccionProductosType } from "../../../database/tiposNegocios";

interface SeccionProductosProps {
  seccion: SeccionProductosType;
  colorPrimario: string;
  colorSecundario: string;
}

export default function SeccionProductos({ seccion, colorPrimario, colorSecundario }: SeccionProductosProps) {
  return (
    <section id="productos" className="py-16 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 
          className="text-3xl md:text-4xl font-black mb-12 text-center"
          style={{ color: colorPrimario }}
        >
          {seccion.titulo}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {seccion.productos.map((producto, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-black mb-2" style={{ color: colorPrimario }}>
                  {producto.nombre}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  {producto.descripcion}
                </p>
                <p 
                  className="text-2xl font-black"
                  style={{ color: colorSecundario }}
                >
                  ${producto.precio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
