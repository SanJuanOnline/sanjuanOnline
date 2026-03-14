"use client";

import { Negocio } from "../../database/tiposNegocios";
import TarjetaNegocio from "./TarjetaNegocio";

interface GridNegociosProps {
  negocios: Negocio[];
}

export default function GridNegocios({ negocios }: GridNegociosProps) {
  if (negocios.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-slate-500 dark:text-slate-400">
          No hay negocios disponibles en esta categoría
        </p>
      </div>
    );
  }

  // Separar negocios por plan
  const negociosDestacados = negocios.filter(n => n.planSuscripcion === "vip" || n.planSuscripcion === "estandar");
  const negociosBasicos = negocios.filter(n => n.planSuscripcion === "basico");

  return (
    <div className="space-y-12">
      {/* Sección Destacados (VIP + Estándar) */}
      {negociosDestacados.length > 0 && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-auto">
            {negociosDestacados.map((negocio) => (
              <TarjetaNegocio key={negocio.id} negocio={negocio} />
            ))}
          </div>
        </div>
      )}

      {/* Sección Básicos */}
      {negociosBasicos.length > 0 && (
        <div>
          <div className="border-t border-slate-300 dark:border-slate-700 pt-8">
            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-6">
              Más opciones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {negociosBasicos.map((negocio) => (
                <TarjetaNegocio key={negocio.id} negocio={negocio} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
