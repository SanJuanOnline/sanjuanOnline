"use client";

import { useState, useEffect } from "react";
import Spinner from "../componentes/Spinner";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";

export default function Home() {
  const [cargando, setCargando] = useState(true);
  const [mostrarSpinner, setMostrarSpinner] = useState(true);

  useEffect(() => {
    // Verificar si ya se mostró el spinner en esta sesión
    const spinnerMostrado = sessionStorage.getItem("spinnerMostrado");
    
    if (spinnerMostrado) {
      // Ya se mostró, no mostrar spinner
      setMostrarSpinner(false);
      setCargando(false);
    } else {
      // Primera vez, mostrar spinner
      const timer = setTimeout(() => {
        setCargando(false);
        sessionStorage.setItem("spinnerMostrado", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (mostrarSpinner && cargando) return <Spinner />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-6xl font-black text-blue-600 mb-4">San Juan Online</h1>
          <p className="text-2xl text-slate-600">Directorio digital</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
