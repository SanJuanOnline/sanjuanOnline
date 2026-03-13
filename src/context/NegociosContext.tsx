"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { NEGOCIOS as INITIAL_NEGOCIOS } from "../data/negocios.db";
import { Negocio } from "../data/tipos.db";

interface NegociosContextType {
  negocios: Negocio[];
  agregarNegocio: (n: Negocio) => void;
}

const NegociosContext = createContext<NegociosContextType | undefined>(undefined);

export const useNegocios = () => {
  const ctx = useContext(NegociosContext);
  if (!ctx) {
    throw new Error("useNegocios debe usarse dentro de un NegociosProvider");
  }
  return ctx;
};

export const NegociosProvider = ({ children }: { children: ReactNode }) => {
  const [negocios, setNegocios] = useState<Negocio[]>([...INITIAL_NEGOCIOS]);

  const agregarNegocio = (n: Negocio) => {
    setNegocios((prev) => [...prev, n]);
  };

  return (
    <NegociosContext.Provider value={{ negocios, agregarNegocio }}>
      {children}
    </NegociosContext.Provider>
  );
};
