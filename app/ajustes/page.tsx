"use client";

import { Settings, Moon, Sun, Download } from "lucide-react";
import { useTema } from "../../context/TemaContext";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import { useEffect, useState } from "react";

export default function AjustesPage() {
  const { modoOscuro, toggleModoOscuro } = useTema();
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
  }, []);

  if (!montado) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-slate-50 p-8">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <p>Cargando...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-slate-50 dark:bg-slate-900 p-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-slate-700 dark:bg-slate-600 rounded-full flex items-center justify-center">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800 dark:text-white">Ajustes</h1>
              <p className="text-slate-600 dark:text-slate-400">Configuración de la app</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Modo Oscuro */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center gap-3">
                {modoOscuro ? (
                  <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                ) : (
                  <Sun className="w-5 h-5 text-slate-600" />
                )}
                <span className="font-semibold dark:text-white">Modo Oscuro</span>
              </div>
              <button 
                onClick={toggleModoOscuro}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  modoOscuro 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-slate-200 text-slate-800'
                }`}
              >
                {modoOscuro ? 'Activado' : 'Desactivado'}
              </button>
            </div>

            {/* Descargar App */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                <span className="font-semibold dark:text-white">Descargar App</span>
              </div>
              <a 
                href="https://play.google.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
              >
                Google Play
              </a>
            </div>

            {/* Info */}
            <div className="mt-8 pt-8 border-t dark:border-slate-600 text-center text-slate-500 dark:text-slate-400">
              <p className="mb-2">
                Creado por <span className="font-bold text-slate-800 dark:text-white">Enrique Vargas</span>
              </p>
              <p className="text-sm">Versión 1.0.0</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
