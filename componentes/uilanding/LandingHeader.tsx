"use client";

import { Menu, X, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LandingHeaderProps {
  nombreNegocio: string;
  colores: {
    primario: string;
    secundario: string;
  };
}

export default function LandingHeader({ nombreNegocio, colores }: LandingHeaderProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const router = useRouter();

  return (
    <header 
      className="sticky top-0 z-50 shadow-md"
      style={{ backgroundColor: colores.primario }}
    >
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 md:gap-2 bg-white/20 hover:bg-white/30 px-2 md:px-3 py-1.5 md:py-2 rounded-lg transition text-white font-semibold text-sm md:text-base whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span>Volver</span>
          </button>
          <h1 className="text-base md:text-xl lg:text-2xl font-black text-white truncate">{nombreNegocio}</h1>
        </div>
        
        {/* Botón móvil */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden text-white"
        >
          {menuAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Navegación desktop */}
        <nav className="hidden md:flex gap-6 text-white font-semibold">
          <a href="#inicio" className="hover:opacity-80 transition">Inicio</a>
          <a href="#productos" className="hover:opacity-80 transition">Productos</a>
          <a href="#galeria" className="hover:opacity-80 transition">Galería</a>
          <a href="#contacto" className="hover:opacity-80 transition">Contacto</a>
        </nav>
      </div>

      {/* Menú móvil */}
      {menuAbierto && (
        <nav className="md:hidden bg-white/95 backdrop-blur-sm">
          <div className="flex flex-col gap-4 p-4">
            <a 
              href="#inicio" 
              onClick={() => setMenuAbierto(false)}
              className="font-semibold hover:opacity-80 transition" 
              style={{ color: colores.primario }}
            >
              Inicio
            </a>
            <a 
              href="#productos" 
              onClick={() => setMenuAbierto(false)}
              className="font-semibold hover:opacity-80 transition" 
              style={{ color: colores.primario }}
            >
              Productos
            </a>
            <a 
              href="#galeria" 
              onClick={() => setMenuAbierto(false)}
              className="font-semibold hover:opacity-80 transition" 
              style={{ color: colores.primario }}
            >
              Galería
            </a>
            <a 
              href="#contacto" 
              onClick={() => setMenuAbierto(false)}
              className="font-semibold hover:opacity-80 transition" 
              style={{ color: colores.primario }}
            >
              Contacto
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
