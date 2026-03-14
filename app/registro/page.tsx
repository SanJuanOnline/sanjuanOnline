"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LayoutDirectorio from "../../layouts/LayoutDirectorio";
import FormularioRegistro from "../../componentes/FormularioRegistro";

export default function RegistroPage() {
  const router = useRouter();
  const [contadorLugares, setContadorLugares] = useState(87);

  useEffect(() => {
    const interval = setInterval(() => {
      setContadorLugares((prev) => (prev > 50 ? prev - 1 : 50));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <LayoutDirectorio>
      <main className="flex-1 bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-3">
              Registra tu negocio en 60 segundos
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Únete a los comerciantes que ya no dependen solo del paso peatonal
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
            <FormularioRegistro
              contadorLugares={contadorLugares}
              onExito={(slug) => router.push(`/${slug}`)}
            />
          </div>
        </div>
      </main>
    </LayoutDirectorio>
  );
}
