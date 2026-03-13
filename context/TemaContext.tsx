"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface TemaContexto {
  modoOscuro: boolean;
  toggleModoOscuro: () => void;
}

const TemaContext = createContext<TemaContexto | undefined>(undefined);

export function TemaProvider({ children }: { children: ReactNode }) {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
    const guardado = localStorage.getItem("modoOscuro");
    if (guardado) {
      const valor = JSON.parse(guardado);
      setModoOscuro(valor);
      if (valor) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleModoOscuro = () => {
    const nuevoValor = !modoOscuro;
    setModoOscuro(nuevoValor);
    localStorage.setItem("modoOscuro", JSON.stringify(nuevoValor));
    
    if (nuevoValor) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!montado) {
    return <>{children}</>;
  }

  return (
    <TemaContext.Provider value={{ modoOscuro, toggleModoOscuro }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  const context = useContext(TemaContext);
  if (!context) throw new Error("useTema debe usarse dentro de TemaProvider");
  return context;
}
