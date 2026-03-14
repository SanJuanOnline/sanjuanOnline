"use client";

import { Menu, Search, Bell, User, Settings, X, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

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
    <header className="bg-slate-900 shadow-xl sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        {/* Primera fila: Logo + Iconos */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/icon-192x192.png" 
              alt="Logo" 
              className="w-12 h-12 rounded-lg shadow-lg"
              onError={(e) => {
                e.currentTarget.src = '/logosanjuan.png';
              }}
            />
            <span className="text-2xl font-black text-amber-400">
              San Juan Online
            </span>
          </Link>

          {/* Desktop - Iconos */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
              <Search className="w-5 h-5 text-slate-300" />
            </button>
            <button className="p-2 hover:bg-slate-800 rounded-lg transition relative">
              <Bell className="w-5 h-5 text-slate-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
            </button>
            <Link href="/cuenta" className="p-2 hover:bg-slate-800 rounded-lg transition">
              <User className="w-5 h-5 text-slate-300" />
            </Link>
            <Link href="/ajustes" className="p-2 hover:bg-slate-800 rounded-lg transition">
              <Settings className="w-5 h-5 text-slate-300" />
            </Link>
            {process.env.NEXT_PUBLIC_ADMIN_ENABLED === 'true' && (
              <Link href="/admin" className="p-2 hover:bg-slate-800 rounded-lg transition" title="Admin">
                <Shield className="w-5 h-5 text-amber-400" />
              </Link>
            )}
          </div>

          {/* Mobile - Hamburguesa */}
          <button 
            className="lg:hidden p-2 text-white"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {menuAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Segunda fila: Categorías Desktop */}
        <nav className="hidden lg:flex justify-center gap-6 pt-3 border-t border-slate-800">
          {categorias.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="text-sm font-semibold text-slate-300 hover:text-amber-400 transition whitespace-nowrap"
            >
              {cat.nombre}
            </Link>
          ))}
        </nav>

        {/* Menu Mobile */}
        {menuAbierto && (
          <div className="lg:hidden mt-4 pb-4 border-t border-slate-800 pt-4">
            <nav className="flex flex-col gap-3">
              {/* Categorías Mobile */}
              <div className="border-b border-slate-800 pb-3 mb-3">
                <p className="text-xs font-bold text-slate-500 mb-2 px-3">CATEGORÍAS</p>
                {categorias.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    className="block px-3 py-2 hover:bg-slate-800 rounded-lg text-slate-300"
                    onClick={() => setMenuAbierto(false)}
                  >
                    {cat.nombre}
                  </Link>
                ))}
              </div>

              {/* Iconos Mobile */}
              <button className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg text-left text-slate-300">
                <Search className="w-5 h-5" />
                <span>Buscar</span>
              </button>
              <button className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg text-left text-slate-300">
                <Bell className="w-5 h-5" />
                <span>Notificaciones</span>
              </button>
              <Link href="/cuenta" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg text-slate-300">
                <User className="w-5 h-5" />
                <span>Mi Cuenta</span>
              </Link>
              <Link href="/ajustes" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg text-slate-300">
                <Settings className="w-5 h-5" />
                <span>Ajustes</span>
              </Link>
              {process.env.NEXT_PUBLIC_ADMIN_ENABLED === 'true' && (
                <Link href="/admin" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg text-amber-400 border-t border-slate-800 mt-2 pt-4">
                  <Shield className="w-5 h-5" />
                  <span className="font-bold">Admin</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
