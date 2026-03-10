"use client";

import { useRouter } from "next/navigation";

// Interfaz básica para evitar errores de importación si el archivo no existe
export interface Negocio {
  id: string;
  nombre: string;
  slug: string;
  slogan: string;
  logo: string;
  tipoEnlace: "landing" | "externo";
  urlExterna?: string;
  destacado?: boolean;
}

interface Props {
  negocio: Negocio;
}

export default function TarjetaNegocio({ negocio }: Props) {
  const router = useRouter();

  const manejarClick = () => {
    if (negocio.tipoEnlace === "externo" && negocio.urlExterna) {
      window.open(negocio.urlExterna, "_blank");
      return;
    }

    if (negocio.tipoEnlace === "landing") {
      router.push(`/negocio/${negocio.slug}`);
    }
  };

  return (
    <div
      className={`tarjeta-negocio p-4 border rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 ${
        negocio.destacado ? "border-yellow-500 bg-yellow-50" : "border-gray-200"
      }`}
      onClick={manejarClick}
    >
      <img 
        src={negocio.logo} 
        alt={negocio.nombre} 
        className="w-full h-40 object-cover rounded-md mb-4"
      />

      <h3 className="text-xl font-bold mb-2">{negocio.nombre}</h3>

      <p className="text-gray-600 mb-4">{negocio.slogan}</p>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full">
        Ver negocio
      </button>
    </div>
  );
}