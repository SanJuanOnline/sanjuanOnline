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
        return "bg-gradient-to-r from-[#1e5ba8] to-[#2563eb] text-white";
      case "basico":
        return "bg-gradient-to-r from-slate-600 to-slate-700 text-white";
    }
  };

  const getButtonText = () => {
    const esExterno = (negocio as any).tipoLanding === "externa" || negocio.tipoEnlace === "externo";
    return esExterno ? "Ir al Sitio" : "Ver Más";
  };

  return (
    <div 
      className={`bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group border-4 hover:border-[#2563eb] ${getCardSize()} transform hover:-translate-y-2 hover:rotate-1 cursor-pointer`}
      style={{
        borderColor: negocio.planSuscripcion === "vip" ? "#fbbf24" : 
                     negocio.planSuscripcion === "estandar" ? "#2563eb" : "#64748b",
        boxShadow: negocio.planSuscripcion === "vip" 
          ? "0 10px 30px rgba(251, 191, 36, 0.3), 0 0 20px rgba(251, 191, 36, 0.2)" 
          : negocio.planSuscripcion === "estandar"
          ? "0 10px 30px rgba(37, 99, 235, 0.3), 0 0 20px rgba(37, 99, 235, 0.2)"
          : "0 8px 20px rgba(100, 116, 139, 0.2)"
      }}
    >
      {/* Imagen */}
      <div className={`relative ${getImageHeight()} overflow-hidden bg-gradient-to-br from-blue-100 to-amber-100 dark:from-slate-700 dark:to-slate-600`}>
        <img
          src={negocio.imagen}
          alt={negocio.nombre}
          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-500"
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
          className={`w-full font-bold rounded-lg transition-all duration-500 flex items-center justify-center gap-2 transform group-hover:scale-105 ${
            negocio.planSuscripcion === "vip" 
              ? "bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 py-4 text-lg shadow-lg hover:shadow-2xl" 
              : negocio.planSuscripcion === "estandar"
              ? "bg-gradient-to-r from-[#1e5ba8] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1e5ba8] text-white py-3 shadow-md hover:shadow-xl"
              : "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white py-2 text-sm"
          }`}
          style={
            negocio.planSuscripcion === "estandar" 
              ? { boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)' }
              : {}
          }
        >
          {getButtonText()}
          <ArrowRight className={`${negocio.planSuscripcion === "vip" ? "w-5 h-5" : "w-4 h-4"} group-hover:translate-x-1 transition-transform duration-300`} />
        </button>
      </div>
    </div>
  );
}
