import { SeccionBanner as SeccionBannerType } from "../../../database/tiposNegocios";

interface SeccionBannerProps {
  seccion: SeccionBannerType;
  colorSecundario: string;
}

export default function SeccionBanner({ seccion, colorSecundario }: SeccionBannerProps) {
  return (
    <section id="inicio" className="relative h-[500px] md:h-[600px] flex items-center justify-center">
      <img
        src={seccion.imagen}
        alt={seccion.titulo}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-black mb-4">{seccion.titulo}</h1>
        <p 
          className="text-xl md:text-2xl font-bold"
          style={{ color: colorSecundario }}
        >
          {seccion.subtitulo}
        </p>
      </div>
    </section>
  );
}
