"use client";

import { useState, useEffect } from "react";
import { obtenerTodosLosNegocios } from "../../database/serviciosFirestore";
import { Negocio } from "../../database/tiposNegocios";
import {
  Settings, Store, Users, BarChart2, Bell, Tag,
  CheckCircle, Construction, Check, X, ChevronRight,
  PlusCircle, Upload, Download, Trash2, Edit, Eye
} from "lucide-react";
import LayoutDirectorio from "../../layouts/LayoutDirectorio";
import { useRouter } from "next/navigation";

// ─── Tipos ───────────────────────────────────────────────────────────────────
type Modulo = "negocios" | "usuarios" | "estadisticas" | "notificaciones" | "planes";

// ─── Sub-componente: Tarjeta de módulo en el menú lateral ────────────────────
function NavItem({
  id, label, icon: Icon, activo, onClick,
}: {
  id: Modulo; label: string; icon: React.ElementType; activo: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors font-semibold text-sm ${
        activo
          ? "bg-amber-500 text-white"
          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
      }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {label}
    </button>
  );
}

// ─── Módulo: Negocios ─────────────────────────────────────────────────────────
function ModuloNegocios() {
  const [lista, setLista] = useState<Negocio[]>([]);
  const [registrados, setRegistrados] = useState<import("../../database/tiposRegistro").NegocioRegistrado[]>([]);
  const [tab, setTab] = useState<"directorio" | "registros">("directorio");

  useEffect(() => {
    obtenerTodosLosNegocios().then(setLista);
    if (typeof window !== "undefined") {
      const { obtenerNegociosRegistrados } = require("../../database/negociosRegistrados");
      setRegistrados(obtenerNegociosRegistrados());
    }
  }, []);

  const toggleEstado = (id: number) => {}; // TODO: actualizar estado en Firestore

  const planColor: Record<string, string> = {
    vip: "bg-amber-400 text-slate-900",
    estandar: "bg-blue-600 text-white",
    basico: "bg-slate-500 text-white",
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700">
        {(["directorio", "registros"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-3 px-1 text-sm font-bold capitalize transition-colors border-b-2 -mb-px ${
              tab === t
                ? "border-amber-500 text-amber-600 dark:text-amber-400"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}>
            {t === "directorio" ? `Directorio (${lista.length})` : `Nuevos Registros (${registrados.length})`}
          </button>
        ))}
      </div>

      {/* Acciones */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors">
          <PlusCircle className="w-4 h-4" /> Nuevo Negocio
        </button>
        <button className="flex items-center gap-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold px-4 py-2 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
          <Upload className="w-4 h-4" /> Importar CSV
        </button>
        <button className="flex items-center gap-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold px-4 py-2 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
          <Download className="w-4 h-4" /> Exportar
        </button>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-lg px-4 py-3 mb-6 text-sm text-amber-800 dark:text-amber-300">
        ⚠️ Los cambios son temporales hasta conectar Firebase.
      </div>

      {/* Tab: Directorio (array estático) */}
      {tab === "directorio" && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 uppercase text-xs">
              <tr>
                <th className="text-left px-4 py-3">Negocio</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Categoría</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Plan</th>
                <th className="text-left px-4 py-3">Estado</th>
                <th className="text-left px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {lista.map((n) => {
                const activo = (n.estado || "activo") === "activo";
                return (
                  <tr key={n.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-800 dark:text-white">{n.nombre}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 hidden md:table-cell capitalize">{n.categoria}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${planColor[n.planSuscripcion]}`}>
                        {n.planSuscripcion}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {activo
                        ? <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold text-xs"><CheckCircle className="w-4 h-4" /> Activo</span>
                        : <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold text-xs"><Construction className="w-4 h-4" /> Construcción</span>
                      }
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button title="Ver" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-400 transition-colors"><Eye className="w-4 h-4" /></button>
                        <button title="Editar" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-400 transition-colors"><Edit className="w-4 h-4" /></button>
                        <button title={activo ? "Poner en construcción" : "Activar"} onClick={() => toggleEstado(n.id)}
                          className={`p-1.5 rounded-lg transition-colors ${activo ? "hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-500" : "hover:bg-green-100 dark:hover:bg-green-900/30 text-green-500"}`}>
                          {activo ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        </button>
                        <button title="Eliminar" className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Nuevos registros (localStorage) */}
      {tab === "registros" && (
        registrados.length === 0
          ? <p className="text-center text-slate-400 py-12 text-sm">Aún no hay registros nuevos.</p>
          : (
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="text-left px-4 py-3">Negocio</th>
                    <th className="text-left px-4 py-3 hidden md:table-cell">Giro</th>
                    <th className="text-left px-4 py-3 hidden lg:table-cell">Teléfono</th>
                    <th className="text-left px-4 py-3">Estado</th>
                    <th className="text-left px-4 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {registrados.map((n) => (
                    <tr key={n.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-800 dark:text-white">{n.nombre}</p>
                        <p className="text-xs text-slate-400 font-mono">{n.slug}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 hidden md:table-cell">{n.giro}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 hidden lg:table-cell">{n.telefonos[0]}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          n.estado === "activo" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : n.estado === "pendiente" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                        }`}>
                          {n.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button title="Aprobar" className="p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 text-green-500 transition-colors"><Check className="w-4 h-4" /></button>
                          <button title="Pausar" className="p-1.5 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-500 transition-colors"><X className="w-4 h-4" /></button>
                          <button title="Eliminar" className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
      )}
    </div>
  );
}

// ─── Módulo: Placeholder genérico ────────────────────────────────────────────
function ModuloProximamente({ titulo, descripcion, icon: Icon }: {
  titulo: string; descripcion: string; icon: React.ElementType;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-slate-400" />
      </div>
      <h2 className="text-2xl font-black text-slate-700 dark:text-white mb-2">{titulo}</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-sm">{descripcion}</p>
      <span className="mt-6 inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-bold px-4 py-2 rounded-full">
        Próximamente — requiere Firebase
      </span>
    </div>
  );
}

// ─── Panel principal ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const [moduloActivo, setModuloActivo] = useState<Modulo>("negocios");

  const adminEnabled = process.env.NEXT_PUBLIC_ADMIN_ENABLED === "true";

  if (!adminEnabled) {
    return (
      <LayoutDirectorio>
        <main className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-8">
          <div className="text-center">
            <h1 className="text-4xl font-black text-slate-800 dark:text-white mb-4">Acceso Restringido</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">El panel de administración está desactivado.</p>
            <button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition">
              Volver al inicio
            </button>
          </div>
        </main>
      </LayoutDirectorio>
    );
  }

  const modulos: { id: Modulo; label: string; icon: React.ElementType }[] = [
    { id: "negocios",       label: "Negocios",        icon: Store },
    { id: "usuarios",       label: "Usuarios",         icon: Users },
    { id: "estadisticas",   label: "Estadísticas",     icon: BarChart2 },
    { id: "notificaciones", label: "Notificaciones",   icon: Bell },
    { id: "planes",         label: "Planes y Precios", icon: Tag },
  ];

  const renderModulo = () => {
    switch (moduloActivo) {
      case "negocios":     return <ModuloNegocios />;
      case "usuarios":     return <ModuloProximamente titulo="Usuarios" descripcion="Gestiona los dueños de negocios registrados, roles y accesos." icon={Users} />;
      case "estadisticas": return <ModuloProximamente titulo="Estadísticas" descripcion="Visitas por negocio, clics en WhatsApp, categorías más vistas." icon={BarChart2} />;
      case "notificaciones": return <ModuloProximamente titulo="Notificaciones" descripcion="Envía avisos a negocios sobre vencimiento de plan o actualizaciones." icon={Bell} />;
      case "planes":       return <ModuloProximamente titulo="Planes y Precios" descripcion="Administra los planes Básico, Estándar y VIP con sus precios y beneficios." icon={Tag} />;
    }
  };

  return (
    <LayoutDirectorio>
      <main className="flex-1 bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-slate-800 dark:bg-slate-600 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 dark:text-white">Panel de Administración</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">San Juan Online</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">

            {/* Sidebar de módulos */}
            <aside className="md:w-56 flex-shrink-0">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-3 space-y-1">
                {modulos.map((m) => (
                  <NavItem
                    key={m.id}
                    id={m.id}
                    label={m.label}
                    icon={m.icon}
                    activo={moduloActivo === m.id}
                    onClick={() => setModuloActivo(m.id)}
                  />
                ))}
              </div>
            </aside>

            {/* Contenido del módulo */}
            <section className="flex-1 min-w-0">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                  <span>Admin</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-semibold text-slate-700 dark:text-white capitalize">
                    {modulos.find((m) => m.id === moduloActivo)?.label}
                  </span>
                </div>

                {renderModulo()}
              </div>
            </section>

          </div>
        </div>
      </main>
    </LayoutDirectorio>
  );
}
