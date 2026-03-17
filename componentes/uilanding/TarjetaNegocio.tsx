"use client";

import { Negocio } from "../../database/tiposNegocios";
import { ExternalLink, ArrowRight, Star } from "lucide-react";

interface TarjetaNegocioProps {
  negocio: Negocio;
}

export default function TarjetaNegocio({ negocio }: TarjetaNegocioProps) {
  const handleClick = () => {
    // Compatibilidad con ambos sistemas: nuevo (tipoLanding) y antiguo (tipoEnlace)
    const esExterno = (negocio as any).tipoLanding === "externa" || negocio.tipoEnlace === "externo";
    
    if (esExterno && negocio.urlExterna) {
      window.open(negocio.urlExterna, "_blank");
    } else {
      window.location.href = `/${negocio.categoria}/${negocio.slug}`;
    }
  };

  const getCardSize = () => {
    switch (negocio.planSuscripcion) {
      case "vip":
        return "md:col-span-2 md:row-span-2"; // Grande: 2x2
      case "estandar":
        return "md:col-span-2"; // Mediano: 2x1
      case "basico":
        return ""; // Pequeño: 1x1
    }
  };

  const getImageHeight = () => {
    switch (negocio.planSuscripcion) {
      case "vip":
        return "h-64 md:h-80";
      case "estandar":
        return "h-48 md:h-56";
      case "basico":
        return "h-40";
    }
  };

  const getBadgeColor = () => {
    switch (negocio.planSuscripcion) {
      case "vip":
        return "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900";
      case "estandar":
        return "bg-blue-600 text-white";
      case "basico":
        return "bg-slate-600 text-white";
    }
  };

  const getButtonText = () => {
    const esExterno = (negocio as any).tipoLanding === "externa" || negocio.tipoEnlace === "externo";
    return esExterno ? "Ir al Sitio" : "Ver Más";
  };

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${getCardSize()}`}>
      {/* Imagen */}
      <div className={`relative ${getImageHeight()} overflow-hidden`}>
        <img
          src={negocio.imagen}
          alt={negocio.nombre}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Badge Plan - Solo VIP */}
        {negocio.planSuscripcion === "vip" && (
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 ${getBadgeColor()}`}>
            <Star className="w-3 h-3" fill="currentColor" />
            VIP
          </div>
        )}
        {/* Icono Externo */}
        {((negocio as any).tipoLanding === "externa" || negocio.tipoEnlace === "externo") && (
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-800/90 p-2 rounded-full">
            <ExternalLink className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className={`font-black text-slate-800 dark:text-white mb-2 ${
          negocio.planSuscripcion === "vip" ? "text-2xl md:text-3xl" : 
          negocio.planSuscripcion === "estandar" ? "text-xl" : "text-lg"
        }`}>
          {negocio.nombre}
        </h3>
        <p className={`text-slate-600 dark:text-slate-400 mb-4 ${
          negocio.planSuscripcion === "vip" ? "text-base line-clamp-3" : 
          negocio.planSuscripcion === "estandar" ? "text-sm line-clamp-2" : "text-sm line-clamp-2"
        }`}>
          {negocio.descripcion}
        </p>
        
        {/* Botón */}
        <button
          onClick={handleClick}
          className={`w-full font-bold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${
            negocio.planSuscripcion === "vip" 
              ? "bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 py-4 text-lg" 
              : negocio.planSuscripcion === "estandar"
              ? "bg-blue-600 hover:bg-blue-700 text-white py-3"
              : "bg-slate-600 hover:bg-slate-700 text-white py-2 text-sm"
          }`}
        >
          {getButtonText()}
          <ArrowRight className={negocio.planSuscripcion === "vip" ? "w-5 h-5" : "w-4 h-4"} />
        </button>
      </div>
    </div>
  );
}
