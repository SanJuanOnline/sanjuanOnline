"use client";

import { Menu, Search, Bell, User, Settings, X, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ModalAuth from "./ModalAuth";

export default function Header() {
  const { usuario } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [modalAuth, setModalAuth] = useState<"login" | "registro" | null>(null);

  const nombreCorto = usuario?.email?.split("@")[0] ?? "";

  const categorias = [
    { nombre: "Comida Rápida", slug: "comida-rapida" },
    { nombre: "Restaurantes", slug: "restaurantes" },
    { nombre: "Entretenimiento", slug: "entretenimiento" },
    { nombre: "Mantenimiento", slug: "mantenimiento" },
    { nombre: "Salud", slug: "salud" },
    { nombre: "Mascotas", slug: "mascotas" },
    { nombre: "Hoteles", slug: "hoteles" },
  ];

  return (
    <>
      <header className="bg-slate-900 shadow-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          {/* Primera fila: Logo + Iconos */}
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg shadow-lg overflow-hidden bg-slate-900">
                <img
                  src="/logo navbar.png"
                  alt="Logo"
                  className="w-full h-full object-cover scale-150"
                />
              </div>
              <span className="text-2xl font-black text-amber-400">San Juan Online</span>
            </Link>

            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                <Search className="w-5 h-5 text-slate-300" />
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-lg transition relative">
                <Bell className="w-5 h-5 text-slate-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
              </button>

              {usuario ? (
                <Link href="/cuenta" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-800 rounded-lg transition">
                  <User className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-semibold text-amber-400 max-w-[100px] truncate">{nombreCorto}</span>
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setModalAuth("login")}
                    className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
                  >
                    Iniciar sesión
                  </button>
                  <button
                    onClick={() => setModalAuth("registro")}
                    className="px-4 py-2 text-sm font-bold bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-lg transition"
                  >
                    Registrarse
                  </button>
                </div>
              )}

              <Link href="/ajustes" className="p-2 hover:bg-slate-800 rounded-lg transition">
                <Settings className="w-5 h-5 text-slate-300" />
              </Link>
              {process.env.NEXT_PUBLIC_ADMIN_ENABLED === "true" && (
                <Link href="/admin" className="p-2 hover:bg-slate-800 rounded-lg transition" title="Admin">
                  <Shield className="w-5 h-5 text-amber-400" />
                </Link>
              )}
            </div>

            {/* Mobile hamburguesa */}
            <button className="lg:hidden p-2 text-white" onClick={() => setMenuAbierto(!menuAbierto)}>
              {menuAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Categorías Desktop */}
          <nav className="hidden lg:flex justify-center gap-6 pt-3 border-t border-slate-800">
            {categorias.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`} className="text-sm font-semibold text-slate-300 hover:text-amber-400 transition whitespace-nowrap">
                {cat.nombre}
              </Link>
            ))}
          </nav>

          {/* Menú Mobile */}
          {menuAbierto && (
            <div className="lg:hidden mt-4 pb-4 border-t border-slate-800 pt-4">
              <nav className="flex flex-col gap-3">
                <div className="border-b border-slate-800 pb-3 mb-3">
                  <p className="text-xs font-bold text-slate-500 mb-2 px-3">CATEGORÍAS</p>
                  {categorias.map((cat) => (
                    <Link key={cat.slug} href={`/${cat.slug}`} className="block px-3 py-2 hover:bg-slate-800 rounded-lg text-slate-300" onClick={() => setMenuAbierto(false)}>
                      {cat.nombre}
                    </Link>
                  ))}
                </div>

                <button className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg text-left text-slate-300">
                  <Search className="w-5 h-5" /><span>Buscar</span>
                </button>
                <button className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg text-left text-slate-300">
                  <Bell className="w-5 h-5" /><span>Notificaciones</span>
                </button>

                {usuario ? (
                  <Link href="/cuenta" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg text-amber-400" onClick={() => setMenuAbierto(false)}>
                    <User className="w-5 h-5" />
                    <span className="font-semibold truncate">{nombreCorto}</span>
                  </Link>
                ) : (
                  <>
                    <button onClick={() => { setMenuAbierto(false); setModalAuth("login"); }} className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg text-left text-slate-300">
                      <User className="w-5 h-5" /><span>Iniciar sesión</span>
                    </button>
                    <button onClick={() => { setMenuAbierto(false); setModalAuth("registro"); }} className="flex items-center gap-3 p-3 bg-amber-400 hover:bg-amber-500 rounded-lg text-left text-slate-900 font-bold">
                      <User className="w-5 h-5" /><span>Registrarse gratis</span>
                    </button>
                  </>
                )}

                <Link href="/ajustes" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg text-slate-300" onClick={() => setMenuAbierto(false)}>
                  <Settings className="w-5 h-5" /><span>Ajustes</span>
                </Link>
                {process.env.NEXT_PUBLIC_ADMIN_ENABLED === "true" && (
                  <Link href="/admin" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg text-amber-400 border-t border-slate-800 mt-2 pt-4" onClick={() => setMenuAbierto(false)}>
                    <Shield className="w-5 h-5" /><span className="font-bold">Admin</span>
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {modalAuth && <ModalAuth modoInicial={modalAuth} onCerrar={() => setModalAuth(null)} />}
    </>
  );
}
