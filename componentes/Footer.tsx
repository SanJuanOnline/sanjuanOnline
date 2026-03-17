"use client";

import { Facebook, Instagram, Twitter, Youtube, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Mostrar footer solo cuando estamos cerca del final
      if (currentScrollY + windowHeight >= documentHeight - 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Verificar posición inicial
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const redesSociales = [
    { nombre: "Facebook", icono: Facebook, url: "https://facebook.com", color: "hover:bg-blue-600" },
    { nombre: "Instagram", icono: Instagram, url: "https://instagram.com", color: "hover:bg-pink-600" },
    { nombre: "X (Twitter)", icono: Twitter, url: "https://twitter.com", color: "hover:bg-slate-700" },
    { nombre: "YouTube", icono: Youtube, url: "https://youtube.com", color: "hover:bg-red-600" },
    { nombre: "Threads", icono: MessageCircle, url: "https://threads.net", color: "hover:bg-slate-800" },
  ];

  return (
    <footer 
      className={`bg-slate-900 text-white py-6 md:py-8 transition-opacity duration-300 mt-20 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6">
          {/* Info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-900">
                <img
                  src="/logo navbar.png"
                  alt="Logo"
                  className="w-full h-full object-cover scale-150"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-amber-400">San Juan Online</h3>
            </div>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Directorio digital para negocios locales de las secciones 1 a 7 y alrededores (incluye Conilas).
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="font-bold mb-2 md:mb-4 text-base md:text-lg">Enlaces Rápidos</h4>
            <ul className="space-y-1 md:space-y-2 text-slate-400 text-sm md:text-base">
              <li className="hover:text-white transition cursor-pointer">Inicio</li>
              <li className="hover:text-white transition cursor-pointer">Categorías</li>
              <li className="hover:text-white transition cursor-pointer">Registrar Negocio</li>
              <li className="hover:text-white transition cursor-pointer">Contacto</li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h4 className="font-bold mb-2 md:mb-4 text-base md:text-lg">Síguenos en Redes</h4>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {redesSociales.map((red) => {
                const Icono = red.icono;
                return (
                  <a
                    key={red.nombre}
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 md:w-10 md:h-10 bg-slate-800 rounded-full flex items-center justify-center ${red.color} transition-all duration-300`}
                    title={red.nombre}
                  >
                    <Icono className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-4 md:pt-6 text-center text-slate-400 text-xs md:text-sm">
          <p className="mb-1 md:mb-2">&copy; 2024 San Juan Online. Todos los derechos reservados.</p>
          <p>
            Creado por <span className="text-amber-400 font-semibold">Enrique Vargas</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
