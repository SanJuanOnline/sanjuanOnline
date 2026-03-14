"use client";

import LandingHeader from "../componentes/uilanding/LandingHeader";
import LandingFooter from "../componentes/uilanding/LandingFooter";
import BotonContacto from "../componentes/uilanding/BotonContacto";

interface Props {
  children: React.ReactNode;
  nombreNegocio: string;
  colores: { primario: string; secundario: string };
  telefono?: string;
  contacto?: {
    telefono?: string;
    email?: string;
    ubicacion?: string;
  };
}

export default function LayoutLanding({ children, nombreNegocio, colores, telefono, contacto }: Props) {
  return (
    <div className="min-h-screen">
      <LandingHeader nombreNegocio={nombreNegocio} colores={colores} />
      <main>{children}</main>
      {telefono && <BotonContacto telefono={telefono} colorPrimario={colores.primario} />}
      <LandingFooter nombreNegocio={nombreNegocio} colores={colores} contacto={contacto} />
    </div>
  );
}
