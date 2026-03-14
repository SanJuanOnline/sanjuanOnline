"use client";

import { Construction, Phone, ArrowLeft } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface OverlayEnConstruccionProps {
  nombreNegocio: string;
  telefono?: string;
}

export default function OverlayEnConstruccion({ nombreNegocio, telefono }: OverlayEnConstruccionProps) {
  const router = useRouter();
  const telefonoLimpio = telefono?.replace(/\D/g, "") || "";

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 text-center relative">
        {/* Botón Volver */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg transition text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        {/* Ícono */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-amber-500/20 rounded-full flex items-center justify-center">
            <Construction className="w-10 h-10 md:w-12 md:h-12 text-amber-500" />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
          {nombreNegocio}
        </h1>

        {/* Mensaje */}
        <div className="space-y-3 mb-8">
          <p className="text-xl md:text-2xl font-bold text-amber-500">
            🚧 En Construcción 🚧
          </p>
          <p className="text-slate-300 text-base md:text-lg">
            Estamos trabajando en la landing de este negocio.
          </p>
          <p className="text-slate-400 text-sm md:text-base">
            El costo de producción aún no ha sido cubierto.
          </p>
        </div>

        {/* Botones de contacto */}
        {telefono && (
          <div className="space-y-4">
            <p className="text-slate-300 font-semibold mb-4">
              ¿Interesado? Contáctanos:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${telefono}`}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                <Phone className="w-5 h-5" />
                Llamar
              </a>
              <a
                href={`https://wa.me/52${telefonoLimpio}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-3 px-6 rounded-lg transition"
              >
                <FaWhatsapp className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Nota */}
        <p className="text-slate-500 text-xs md:text-sm mt-8">
          Una vez cubierto el costo, la landing estará disponible en 24-48 horas.
        </p>
      </div>
    </div>
  );
}
