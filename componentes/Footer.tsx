"use client";

import { Facebook, Instagram, Twitter, Youtube, MessageCircle } from "lucide-react";

export default function Footer() {
  const redesSociales = [
    { nombre: "Facebook", icono: Facebook, url: "https://facebook.com", color: "hover:bg-blue-600" },
    { nombre: "Instagram", icono: Instagram, url: "https://instagram.com", color: "hover:bg-pink-600" },
    { nombre: "X (Twitter)", icono: Twitter, url: "https://twitter.com", color: "hover:bg-slate-700" },
    { nombre: "YouTube", icono: Youtube, url: "https://youtube.com", color: "hover:bg-red-600" },
    { nombre: "Threads", icono: MessageCircle, url: "https://threads.net", color: "hover:bg-slate-800" },
  ];

  return (
    <footer className="bg-slate-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Info */}
          <div>
            <h3 className="text-2xl font-black mb-4 text-amber-400">San Juan Online</h3>
            <p className="text-slate-400 leading-relaxed">
              Directorio digital para negocios locales de las secciones 1 a 7 y alrededores (incluye Conilas).
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-white transition cursor-pointer">Inicio</li>
              <li className="hover:text-white transition cursor-pointer">Categorías</li>
              <li className="hover:text-white transition cursor-pointer">Registrar Negocio</li>
              <li className="hover:text-white transition cursor-pointer">Contacto</li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Síguenos en Redes</h4>
            <div className="flex flex-wrap gap-3">
              {redesSociales.map((red) => {
                const Icono = red.icono;
                return (
                  <a
                    key={red.nombre}
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center ${red.color} transition-all duration-300`}
                    title={red.nombre}
                  >
                    <Icono className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
          <p className="mb-2">&copy; 2024 San Juan Online. Todos los derechos reservados.</p>
          <p className="text-sm">
            Creado por <span className="text-amber-400 font-semibold">Enrique Vargas</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
