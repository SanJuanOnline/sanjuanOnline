"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LayoutDirectorio from "../../layouts/LayoutDirectorio";
import FormularioRegistro from "../../componentes/FormularioRegistro";
import ModalAuth from "../../componentes/ModalAuth";
import { useAuth } from "../../context/AuthContext";
import { obtenerTodosLosNegocios, contarNegociosReales } from "../../database/serviciosFirestore";

export default function RegistroPage() {
  const router = useRouter();
  const { usuario, cargando } = useAuth();
  const [contadorLugares, setContadorLugares] = useState(100);
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const cargarContador = async () => {
    const registrados = await contarNegociosReales();
    setContadorLugares(Math.max(0, 100 - registrados));
  };

  useEffect(() => {
    cargarContador();
  }, []);

  const handleExito = async (slug: string) => {
    setRegistroExitoso(true);
    await cargarContador(); // Actualizar contador
    setTimeout(() => {
      router.push(`/cuenta`);
    }, 2000);
  };

  if (cargando) return null;

  return (
    <LayoutDirectorio>
      <main className="flex-1 bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {!registroExitoso && (
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-3">
                Registra tu negocio en 60 segundos
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Únete a los comerciantes que ya no dependen solo del paso peatonal
              </p>
            </div>
          )}

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
            <FormularioRegistro
              contadorLugares={contadorLugares}
              onExito={handleExito}
            />
          </div>
        </div>
      </main>

      {/* Si no hay sesión, bloquea con modal de auth */}
      {!usuario && (
        <ModalAuth
          modoInicial="registro"
          onCerrar={() => router.push("/")}
        />
      )}
    </LayoutDirectorio>
  );
}
