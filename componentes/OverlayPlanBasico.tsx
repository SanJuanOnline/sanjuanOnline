import { Lock } from "lucide-react";
import Link from "next/link";

interface Props {
  nombreSeccion: string;
}

export default function OverlayPlanBasico({ nombreSeccion }: Props) {
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
      <Lock className="w-16 h-16 text-amber-400 mb-4" />
      <h3 className="text-white text-xl font-bold mb-2">
        Sección Bloqueada
      </h3>
      <p className="text-slate-300 text-center mb-4 px-4">
        Actualiza tu plan para mostrar {nombreSeccion}
      </p>
      <Link href="/cuenta">
        <button className="bg-amber-400 text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-amber-500 transition-colors">
          Desbloquear Ahora
        </button>
      </Link>
    </div>
  );
}
