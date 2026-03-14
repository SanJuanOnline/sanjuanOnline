"use client";

import { useEffect, useState } from "react";
import { Negocio, TipoCategoria } from "../database/tiposNegocios";
import { obtenerNegociosPorCategoria } from "../database/serviciosFirestore";
import GridNegocios from "../componentes/uilanding/GridNegocios";
import LayoutDirectorio from "../layouts/LayoutDirectorio";

interface Props {
  categoria: TipoCategoria;
  titulo: string;
  descripcion: string;
}

export default function PaginaCategoria({ categoria, titulo, descripcion }: Props) {
  const [negocios, setNegocios] = useState<Negocio[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerNegociosPorCategoria(categoria)
      .then(setNegocios)
      .finally(() => setCargando(false));
  }, [categoria]);

  return (
    <LayoutDirectorio>
      <main className="flex-1 bg-slate-50 dark:bg-slate-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-slate-800 dark:text-white mb-4">{titulo}</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">{descripcion}</p>
          </div>
          {cargando
            ? <p className="text-center text-slate-400 py-20">Cargando negocios...</p>
            : <GridNegocios negocios={negocios} />
          }
        </div>
      </main>
    </LayoutDirectorio>
  );
}
