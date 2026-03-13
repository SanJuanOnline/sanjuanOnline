"use client";

import React from "react";
import { useNegocios } from "../context/NegociosContext";
import LandingClientes from "../landing/LandingClientes";

interface Props {
  slug: string;
}

export default function NegocioDetalle({ slug }: Props) {
  const { negocios } = useNegocios();
  const negocio = negocios.find((n) => n.slug === slug);

  if (!negocio) {
    return <p className="p-4">Negocio no encontrado</p>;
  }

  // Si tiene landing, renderizar la landing completa
  if (negocio.landing) {
    return <LandingClientes />;
  }

  // Si no tiene landing, mostrar solo la tarjeta
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{negocio.nombre}</h1>
      <p>Este negocio no tiene landing page configurada.</p>
    </div>
  );
}
