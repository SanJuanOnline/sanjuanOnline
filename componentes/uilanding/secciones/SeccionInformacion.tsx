import { SeccionInformacion as SeccionInformacionType } from "../../../database/tiposNegocios";

interface SeccionInformacionProps {
  seccion: SeccionInformacionType;
  colorPrimario: string;
}

export default function SeccionInformacion({ seccion, colorPrimario }: SeccionInformacionProps) {
  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 
          className="text-3xl md:text-4xl font-black mb-6 text-center"
          style={{ color: colorPrimario }}
        >
          {seccion.titulo}
        </h2>
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-center">
          {seccion.contenido}
        </p>
      </div>
    </section>
  );
}
