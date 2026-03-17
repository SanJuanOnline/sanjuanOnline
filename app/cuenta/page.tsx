"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, Trash2, Store, ExternalLink, Rocket, Sparkles, Edit, Image as ImageIcon, MessageSquare } from "lucide-react";
import Swal from "sweetalert2";
import LayoutDirectorio from "../../layouts/LayoutDirectorio";
import { useAuth } from "../../context/AuthContext";
import { obtenerNegocioPorUID, actualizarPlan, guardarSolicitudPersonalizada, actualizarProductos, actualizarGaleria, actualizarTestimonios } from "../../database/serviciosFirestore";
import { Negocio } from "../../database/tiposNegocios";
import ModalPago from "../../componentes/ModalPago";
import FormularioSolicitudPersonalizada, { DatosSolicitud } from "../../componentes/FormularioSolicitudPersonalizada";
import EditorProductos from "../../componentes/editores/EditorProductos";
import EditorGaleria from "../../componentes/editores/EditorGaleria";
import EditorTestimonios from "../../componentes/editores/EditorTestimonios";

type Vista = "dashboard" | "productos" | "galeria" | "testimonios";

export default function CuentaPage() {
  const router = useRouter();
  const { usuario, cargando, cerrarSesion, eliminarCuenta } = useAuth();
  const [negocio, setNegocio] = useState<Negocio | null>(null);
  const [confirmandoEliminar, setConfirmandoEliminar] = useState(false);
  const [mostrarModalPago, setMostrarModalPago] = useState(false);
  const [mostrarSolicitudPersonalizada, setMostrarSolicitudPersonalizada] = useState(false);
  const [vistaActual, setVistaActual] = useState<Vista>("dashboard");

  useEffect(() => {
    if (!cargando && !usuario) router.push("/");
  }, [usuario, cargando, router]);

  useEffect(() => {
    if (usuario) {
      obtenerNegocioPorUID(usuario.uid).then(setNegocio);
    }
  }, [usuario]);

  const handleCerrarSesion = async () => {
    await cerrarSesion();
    router.push("/");
  };

  const handleEliminarCuenta = async () => {
    await eliminarCuenta();
    router.push("/");
  };

  const handleConfirmarPago = async () => {
    if (!negocio) return;
    
    try {
      await actualizarPlan(negocio.slug, "estandar");
      setMostrarModalPago(false);
      
      await Swal.fire({
        icon: "success",
        title: "¡Plan actualizado!",
        text: "Ahora puedes editar tu landing completa",
        confirmButtonColor: "#F59E0B",
        timer: 3000,
      });
      
      // Recargar negocio
      const actualizado = await obtenerNegocioPorUID(usuario!.uid);
      setNegocio(actualizado);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el plan",
        confirmButtonColor: "#F59E0B",
      });
    }
  };

  const handleEnviarSolicitud = async (datos: DatosSolicitud) => {
    if (!negocio || !usuario) return;
    
    try {
      await guardarSolicitudPersonalizada({
        negocioSlug: negocio.slug,
        nombreNegocio: negocio.nombre,
        uid: usuario.uid,
        ...datos,
      });
      
      setMostrarSolicitudPersonalizada(false);
      
      await Swal.fire({
        icon: "success",
        title: "¡Solicitud enviada!",
        text: "Te contactaremos pronto para darte una cotización",
        confirmButtonColor: "#F59E0B",
        timer: 3000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar la solicitud",
        confirmButtonColor: "#F59E0B",
      });
    }
  };

  const guardarProductos = async (productos: any[]) => {
    if (!negocio) return;
    await actualizarProductos(negocio.slug, productos);
    // Recargar negocio
    const actualizado = await obtenerNegocioPorUID(usuario!.uid);
    setNegocio(actualizado);
  };

  const guardarGaleria = async (galeria: any[]) => {
    if (!negocio) return;
    await actualizarGaleria(negocio.slug, galeria);
    // Recargar negocio
    const actualizado = await obtenerNegocioPorUID(usuario!.uid);
    setNegocio(actualizado);
  };

  const guardarTestimonios = async (testimonios: any[]) => {
    if (!negocio) return;
    await actualizarTestimonios(negocio.slug, testimonios);
    // Recargar negocio
    const actualizado = await obtenerNegocioPorUID(usuario!.uid);
    setNegocio(actualizado);
  };

  if (cargando || !usuario) return null;

  const nombreCorto = usuario.email?.split("@")[0] ?? "";
  const esPlanBasico = negocio?.planSuscripcion === "basico" || !negocio?.planSuscripcion;
  const tieneUrlExterna = (negocio as any)?.tipoLanding === "externa";
  const tienePlanEstandar = negocio?.planSuscripcion === "estandar" || negocio?.planSuscripcion === "vip";

  // Renderizar editores
  if (vistaActual === "productos" && negocio) {
    return (
      <LayoutDirectorio>
        <main className="flex-1 bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
          <EditorProductos
            productos={(negocio as any).productos || []}
            onGuardar={guardarProductos}
            onVolver={() => setVistaActual("dashboard")}
          />
        </main>
      </LayoutDirectorio>
    );
  }

  if (vistaActual === "galeria" && negocio) {
    return (
      <LayoutDirectorio>
        <main className="flex-1 bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
          <EditorGaleria
            galeria={(negocio as any).galeria || []}
            onGuardar={guardarGaleria}
            onVolver={() => setVistaActual("dashboard")}
          />
        </main>
      </LayoutDirectorio>
    );
  }

  if (vistaActual === "testimonios" && negocio) {
    return (
      <LayoutDirectorio>
        <main className="flex-1 bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
          <EditorTestimonios
            testimonios={(negocio as any).testimonios || []}
            onGuardar={guardarTestimonios}
            onVolver={() => setVistaActual("dashboard")}
          />
        </main>
      </LayoutDirectorio>
    );
  }

  return (
    <LayoutDirectorio>
      <main className="flex-1 bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
        <div className="max-w-xl mx-auto flex flex-col gap-6">

          {/* Perfil */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-400 rounded-full flex items-center justify-center shrink-0">
              <User className="w-7 h-7 text-slate-900" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xl font-black text-slate-800 dark:text-white truncate">{nombreCorto}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{usuario.email}</p>
            </div>
          </div>

          {/* Negocio */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Store className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Mi negocio</h2>
            </div>

            {negocio ? (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Nombre</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{negocio.nombre}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Categoría</span>
                  <span className="font-semibold text-slate-800 dark:text-white capitalize">{negocio.categoria}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Plan</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    negocio.planSuscripcion === "vip" ? "bg-amber-400 text-slate-900" :
                    negocio.planSuscripcion === "estandar" ? "bg-blue-500 text-white" :
                    "bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300"
                  }`}>
                    {negocio.planSuscripcion?.toUpperCase() ?? "BÁSICO"}
                  </span>
                </div>
                
                {!tieneUrlExterna && (
                  <a
                    href={`/${negocio.categoria}/${negocio.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 mt-2 py-2 border border-amber-400 text-amber-500 font-semibold rounded-xl hover:bg-amber-50 dark:hover:bg-slate-700 transition text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver mi landing
                  </a>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">Aún no tienes un negocio registrado.</p>
                <a href="/registro" className="inline-block px-5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl text-sm transition">
                  Registrar mi negocio
                </a>
              </div>
            )}
          </div>

          {/* Opciones de Upgrade - Solo si tiene landing interna y plan básico */}
          {negocio && !tieneUrlExterna && esPlanBasico && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-lg p-6 border-2 border-amber-200 dark:border-amber-900">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-amber-500" />
                Desbloquea tu landing
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Tu landing está bloqueada. Elige una opción para activarla:
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => setMostrarModalPago(true)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Rocket className="w-5 h-5" />
                  Desbloquear Editor ($300/año)
                </button>
                
                <button
                  onClick={() => setMostrarSolicitudPersonalizada(true)}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Necesito un sitio personalizado
                </button>
              </div>
            </div>
          )}

          {/* Editores - Solo si tiene plan estándar o VIP */}
          {negocio && !tieneUrlExterna && tienePlanEstandar && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <Edit className="w-5 h-5 text-amber-400" />
                Editar mi landing
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => setVistaActual("productos")}
                  className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4 flex flex-col items-center gap-2 transition-colors"
                >
                  <Edit className="w-8 h-8 text-blue-500" />
                  <span className="font-bold text-slate-800 dark:text-white">Productos</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {(negocio as any).productos?.length || 0} agregados
                  </span>
                </button>

                <button
                  onClick={() => setVistaActual("galeria")}
                  className="bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-4 flex flex-col items-center gap-2 transition-colors"
                >
                  <ImageIcon className="w-8 h-8 text-purple-500" />
                  <span className="font-bold text-slate-800 dark:text-white">Galería</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {(negocio as any).galeria?.length || 0} imágenes
                  </span>
                </button>

                <button
                  onClick={() => setVistaActual("testimonios")}
                  className="bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 border-2 border-green-200 dark:border-green-800 rounded-xl p-4 flex flex-col items-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-8 h-8 text-green-500" />
                  <span className="font-bold text-slate-800 dark:text-white">Testimonios</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {(negocio as any).testimonios?.length || 0} agregados
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Acciones de cuenta */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 flex flex-col gap-3">
            <button
              onClick={handleCerrarSesion}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition text-sm font-semibold"
            >
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>

            {!confirmandoEliminar ? (
              <button
                onClick={() => setConfirmandoEliminar(true)}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition text-sm font-semibold"
              >
                <Trash2 className="w-5 h-5" />
                Eliminar cuenta
              </button>
            ) : (
              <div className="border border-red-200 dark:border-red-800 rounded-xl p-4">
                <p className="text-sm text-red-600 dark:text-red-400 mb-3 font-semibold">¿Seguro? Esta acción no se puede deshacer.</p>
                <div className="flex gap-2">
                  <button onClick={handleEliminarCuenta} className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg text-sm transition">
                    Sí, eliminar
                  </button>
                  <button onClick={() => setConfirmandoEliminar(false)} className="flex-1 py-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-lg text-sm transition">
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Modales */}
      {mostrarModalPago && (
        <ModalPago
          onCerrar={() => setMostrarModalPago(false)}
          onConfirmar={handleConfirmarPago}
        />
      )}

      {mostrarSolicitudPersonalizada && negocio && (
        <FormularioSolicitudPersonalizada
          nombreNegocio={negocio.nombre}
          onCerrar={() => setMostrarSolicitudPersonalizada(false)}
          onEnviar={handleEnviarSolicitud}
        />
      )}
    </LayoutDirectorio>
  );
}
