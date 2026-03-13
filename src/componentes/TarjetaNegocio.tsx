"use client";

import { useRouter } from "next/navigation";
import { Negocio } from "../data/tipos.db";

interface Props {
  negocio: Negocio;
  size?: 'small' | 'medium' | 'large';
}

export default function TarjetaNegocio({ negocio, size = 'medium' }: Props) {
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

  const sizeClasses = {
    small: 'w-48',
    medium: 'w-64',
    large: 'w-80',
  }[size];

  const imgHeight = {
    small: 'h-32',
    medium: 'h-40',
    large: 'h-48',
  }[size];

  return (
    <div
      className={`${sizeClasses} tarjeta-negocio p-4 border rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 ${
        negocio.destacado ? "border-yellow-500 bg-yellow-50" : "border-gray-200"
      }`}
      onClick={manejarClick}
    >
      <img 
        src={negocio.logo} 
        alt={negocio.nombre} 
        className={`w-full ${imgHeight} object-cover rounded-md mb-4`}
      />

      <h3 className="text-xl font-bold mb-2">{negocio.nombre}</h3>

      <p className="text-gray-600 mb-4">{negocio.slogan}</p>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full">
        Ver negocio
      </button>
    </div>
  );
}