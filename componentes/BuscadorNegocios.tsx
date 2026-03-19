"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { buscarNegocios } from "../database/serviciosFirestore";
import { Negocio } from "../database/tiposNegocios";
import Link from "next/link";

export default function BuscadorNegocios() {
  const [termino, setTermino] = useState("");
  const [resultados, setResultados] = useState<Negocio[]>([]);
  const [buscando, setBuscando] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const buscar = async (valor: string) => {
    setTermino(valor);
    
    if (valor.trim().length < 2) {
      setResultados([]);
      setMostrarResultados(false);
      return;
    }

    setBuscando(true);
    try {
      const res = await buscarNegocios(valor);
      setResultados(res);
      setMostrarResultados(true);
    } catch (error) {
      console.error("Error buscando:", error);
    } finally {
      setBuscando(false);
    }
  };

  const limpiar = () => {
    setTermino("");
    setResultados([]);
    setMostrarResultados(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Input de búsqueda */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={termino}
          onChange={(e) => buscar(e.target.value)}
          placeholder="Buscar negocios por nombre, giro o descripción..."
          className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:border-amber-400 text-base"
        />
        {termino && (
          <button
            onClick={limpiar}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Resultados */}
      {mostrarResultados && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 max-h-96 overflow-y-auto z-50">
          {buscando ? (
            <div className="p-8 text-center text-slate-500">
              Buscando...
            </div>
          ) : resultados.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No se encontraron negocios con "{termino}"
            </div>
          ) : (
            <div className="p-2">
              <p className="px-4 py-2 text-sm text-slate-500 dark:text-slate-400">
                {resultados.length} resultado{resultados.length !== 1 ? "s" : ""}
              </p>
              {resultados.map((negocio) => (
                <Link
                  key={negocio.id}
                  href={`/${negocio.categoria}/${negocio.id}`}
                  onClick={limpiar}
                  className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                  {negocio.imagen ? (
                    <img
                      src={negocio.imagen}
                      alt={negocio.nombre}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-amber-400 flex items-center justify-center text-white font-bold text-lg">
                      {negocio.nombre.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 dark:text-white truncate">
                      {negocio.nombre}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {negocio.descripcion}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {negocio.categoria}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Overlay para cerrar al hacer click fuera */}
      {mostrarResultados && (
        <div
          className="fixed inset-0 z-40"
          onClick={limpiar}
        />
      )}
    </div>
  );
}
