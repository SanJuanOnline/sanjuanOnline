"use client";

import { MapPin, Phone, Mail } from "lucide-react";

interface LandingFooterProps {
  nombreNegocio: string;
  colores: {
    primario: string;
    secundario: string;
  };
  contacto?: {
    telefono?: string;
    email?: string;
    ubicacion?: string;
  };
}

export default function LandingFooter({ nombreNegocio, colores, contacto }: LandingFooterProps) {
  return (
    <footer 
      className="py-8 md:py-12 text-white mt-20"
      style={{ backgroundColor: colores.primario }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-black mb-6 text-center">{nombreNegocio}</h3>
          
          {contacto && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm md:text-base">
              {contacto.telefono && (
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${contacto.telefono}`} className="hover:opacity-80 transition">
                    {contacto.telefono}
                  </a>
                </div>
              )}
              {contacto.email && (
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${contacto.email}`} className="hover:opacity-80 transition">
                    {contacto.email}
                  </a>
                </div>
              )}
              {contacto.ubicacion && (
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-center">{contacto.ubicacion}</span>
                </div>
              )}
            </div>
          )}

          <div className="text-center border-t border-white/20 pt-6">
            <p className="text-sm opacity-90 mb-2">
              © {new Date().getFullYear()} Todos los derechos reservados
            </p>
            <p className="text-xs opacity-75">
              Powered by San Juan Online
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
