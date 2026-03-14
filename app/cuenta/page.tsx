"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, Trash2, Store, ExternalLink } from "lucide-react";
import LayoutDirectorio from "../../layouts/LayoutDirectorio";
import { useAuth } from "../../context/AuthContext";
import { obtenerNegocioPorUID } from "../../database/serviciosFirestore";
import { Negocio } from "../../database/tiposNegocios";

export default function CuentaPage() {
  const router = useRouter();
  const { usuario, cargando, cerrarSesion, eliminarCuenta } = useAuth();
  const [negocio, setNegocio] = useState<Negocio | null>(null);
  const [confirmandoEliminar, setConfirmandoEliminar] = useState(false);

  useEffect(() => {
    if (!cargando && !usuario) router.push("/");
  }, [usuario, cargando, router]);

  useEffect(() => {
    if (usuario) {
      obtenerNegocioPorUID(usuario.uid).then(setNegocio);
    }
  }, [usuario]);

  const handleCerrarSesion = async () => {
    await cerrarSesion();
    router.push("/");
  };

  const handleEliminarCuenta = async () => {
    await eliminarCuenta();
    router.push("/");
  };

  if (cargando || !usuario) return null;

  const nombreCorto = usuario.email?.split("@")[0] ?? "";

  return (
    <LayoutDirectorio>
      <main className="flex-1 bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
        <div className="max-w-xl mx-auto flex flex-col gap-6">

          {/* Perfil */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-400 rounded-full flex items-center justify-center shrink-0">
              <User className="w-7 h-7 text-slate-900" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xl font-black text-slate-800 dark:text-white truncate">{nombreCorto}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{usuario.email}</p>
            </div>
          </div>

          {/* Negocio */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Store className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Mi negocio</h2>
            </div>

            {negocio ? (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Nombre</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{negocio.nombre}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Categoría</span>
                  <span className="font-semibold text-slate-800 dark:text-white capitalize">{negocio.categoria}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Plan</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    negocio.planSuscripcion === "vip" ? "bg-amber-400 text-slate-900" :
                    negocio.planSuscripcion === "estandar" ? "bg-blue-500 text-white" :
                    "bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300"
                  }`}>
                    {negocio.planSuscripcion?.toUpperCase() ?? "BÁSICO"}
                  </span>
                </div>
                <a
                  href={`/${negocio.categoria}/${negocio.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 mt-2 py-2 border border-amber-400 text-amber-500 font-semibold rounded-xl hover:bg-amber-50 dark:hover:bg-slate-700 transition text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ver mi landing
                </a>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">Aún no tienes un negocio registrado.</p>
                <a href="/registro" className="inline-block px-5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl text-sm transition">
                  Registrar mi negocio
                </a>
              </div>
            )}
          </div>

          {/* Acciones de cuenta */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 flex flex-col gap-3">
            <button
              onClick={handleCerrarSesion}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition text-sm font-semibold"
            >
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>

            {!confirmandoEliminar ? (
              <button
                onClick={() => setConfirmandoEliminar(true)}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition text-sm font-semibold"
              >
                <Trash2 className="w-5 h-5" />
                Eliminar cuenta
              </button>
            ) : (
              <div className="border border-red-200 dark:border-red-800 rounded-xl p-4">
                <p className="text-sm text-red-600 dark:text-red-400 mb-3 font-semibold">¿Seguro? Esta acción no se puede deshacer.</p>
                <div className="flex gap-2">
                  <button onClick={handleEliminarCuenta} className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg text-sm transition">
                    Sí, eliminar
                  </button>
                  <button onClick={() => setConfirmandoEliminar(false)} className="flex-1 py-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-lg text-sm transition">
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </LayoutDirectorio>
  );
}
