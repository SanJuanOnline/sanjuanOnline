"use client";

import { User } from "lucide-react";
import LayoutDirectorio from "../../layouts/LayoutDirectorio";

export default function CuentaPage() {
  return (
    <LayoutDirectorio>
      <main className="flex-1 bg-slate-50 dark:bg-slate-900 p-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800 dark:text-white">Mi Cuenta</h1>
              <p className="text-slate-600 dark:text-slate-400">Gestiona tu perfil</p>
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400">Funcionalidad en construcción...</p>
        </div>
      </main>
    </LayoutDirectorio>
  );
}
