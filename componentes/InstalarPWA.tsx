"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

export default function InstalarPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [mostrarBanner, setMostrarBanner] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
    
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Verificar si ya se mostró el banner
      const bannerMostrado = localStorage.getItem("pwa-banner-mostrado");
      if (!bannerMostrado) {
        setMostrarBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Para desarrollo: mostrar banner después de 3 segundos si no hay evento
    const timer = setTimeout(() => {
      const bannerMostrado = localStorage.getItem("pwa-banner-mostrado");
      if (!deferredPrompt && !bannerMostrado && process.env.NODE_ENV === 'development') {
        setMostrarBanner(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, [deferredPrompt]);

  const instalarApp = async () => {
    if (!deferredPrompt) {
      // Si no hay prompt nativo, mostrar instrucciones
      alert("Para instalar:\n\n• Chrome/Edge: Menú (⋮) → Instalar aplicación\n• Safari iOS: Compartir → Añadir a pantalla de inicio\n• Firefox: Menú → Instalar");
      setMostrarBanner(false);
      localStorage.setItem("pwa-banner-mostrado", "true");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      console.log("PWA instalada");
    }
    
    setDeferredPrompt(null);
    setMostrarBanner(false);
    localStorage.setItem("pwa-banner-mostrado", "true");
  };

  const cerrarBanner = () => {
    setMostrarBanner(false);
    localStorage.setItem("pwa-banner-mostrado", "true");
  };

  // Botón permanente en el header (siempre visible)
  if (montado && !mostrarBanner) {
    return (
      <button
        onClick={() => setMostrarBanner(true)}
        className="fixed top-20 right-4 w-12 h-12 md:w-14 md:h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-2xl flex items-center justify-center text-white z-40 transition-transform hover:scale-110"
        title="Instalar aplicación"
      >
        <Download className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    );
  }

  if (!montado || !mostrarBanner) return null;

  return (
    <div className="fixed top-24 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 z-50 border-2 border-blue-500 animate-slide-up">
      <button
        onClick={cerrarBanner}
        className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Download className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-slate-800 dark:text-white mb-1">
            Instalar San Juan Online
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            Accede más rápido y úsala sin conexión
          </p>
          
          <div className="flex gap-2">
            <button
              onClick={instalarApp}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition text-sm"
            >
              Instalar
            </button>
            <button
              onClick={cerrarBanner}
              className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition text-sm"
            >
              Ahora no
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
