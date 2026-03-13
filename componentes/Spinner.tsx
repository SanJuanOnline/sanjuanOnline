"use client";

import { useEffect, useState } from "react";

export default function Spinner() {
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setProgreso((prev) => (prev >= 100 ? 100 : prev + 2));
    }, 30);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-blue-600 to-blue-800">
      {/* Imagen - 100% en móvil, proporcional en desktop */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <img
          src="/logosanjuan.png"
          alt="San Juan Online"
          className="w-full h-auto max-w-md object-contain"
        />
      </div>

      {/* Texto y barra siempre abajo */}
      <div className="p-8 pb-12">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3">
            San Juan Online
          </h1>
          <p className="text-white/90 text-sm md:text-lg px-4">
            Directorio digital para negocios pequeños listos para entrar al mundo digital
          </p>
        </div>

        <div className="w-full max-w-md mx-auto h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300"
            style={{ width: `${progreso}%` }}
          />
        </div>
        <p className="text-white/80 mt-3 text-center text-sm font-semibold">{progreso}%</p>
      </div>
    </div>
  );
}
