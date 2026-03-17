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
    <div className="fixed inset-0 z-50 flex flex-col bg-[#1e5ba8]">
      {/* Imagen con efecto 3D neón */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="relative">
          <img
            src="/nuevo-logosanjuan.png"
            alt="San Juan Online"
            className="w-full h-auto max-w-md object-contain rounded-3xl border-4 border-blue-400/50"
            style={{ 
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(59, 130, 246, 0.4), 0 0 120px rgba(59, 130, 246, 0.2)',
              filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.6))'
            }}
          />
        </div>
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
