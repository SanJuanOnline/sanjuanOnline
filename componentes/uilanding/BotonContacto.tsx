"use client";

import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface BotonContactoProps {
  telefono: string;
  colorPrimario: string;
}

export default function BotonContacto({ telefono, colorPrimario }: BotonContactoProps) {
  const telefonoLimpio = telefono.replace(/\D/g, "");

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
      {/* Botón Teléfono */}
      <a
        href={`tel:${telefono}`}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform"
        style={{ backgroundColor: colorPrimario }}
        title="Llamar"
      >
        <Phone className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
      </a>

      {/* Botón WhatsApp */}
      <a
        href={`https://wa.me/52${telefonoLimpio}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform bg-[#25D366]"
        title="WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8" />
      </a>
    </div>
  );
}
