import { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, Star } from "lucide-react";
import Swal from "sweetalert2";

interface Testimonio {
  id: string;
  nombre: string;
  comentario: string;
  calificacion: number;
}

interface Props {
  testimonios: Testimonio[];
  onGuardar: (testimonios: Testimonio[]) => Promise<void>;
  onVolver: () => void;
}

const MAX_TESTIMONIOS = 10;

export default function EditorTestimonios({ testimonios: testimoniosIniciales, onGuardar, onVolver }: Props) {
  const [testimonios, setTestimonios] = useState<Testimonio[]>(testimoniosIniciales || []);
  const [editando, setEditando] = useState<Testimonio | null>(null);
  const [guardando, setGuardando] = useState(false);

  const agregarTestimonio = () => {
    if (testimonios.length >= MAX_TESTIMONIOS) {
      Swal.fire({
        icon: "warning",
        title: "Límite alcanzado",
        text: `Solo puedes agregar hasta ${MAX_TESTIMONIOS} testimonios`,
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    setEditando({
      id: Date.now().toString(),
      nombre: "",
      comentario: "",
      calificacion: 5,
    });
  };

  const guardarTestimonio = () => {
    if (!editando) return;
    
    if (!editando.nombre.trim() || !editando.comentario.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Completa el nombre y comentario",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    const existe = testimonios.find(t => t.id === editando.id);
    if (existe) {
      setTestimonios(testimonios.map(t => t.id === editando.id ? editando : t));
    } else {
      setTestimonios([...testimonios, editando]);
    }
    
    setEditando(null);
  };

  const eliminarTestimonio = (id: string) => {
    Swal.fire({
      title: "¿Eliminar testimonio?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setTestimonios(testimonios.filter(t => t.id !== id));
      }
    });
  };

  const handleGuardar = async () => {
    setGuardando(true);
    try {
      await onGuardar(testimonios);
      await Swal.fire({
        icon: "success",
        title: "¡Guardado!",
        text: "Tus testimonios se actualizaron correctamente",
        confirmButtonColor: "#F59E0B",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron guardar los cambios",
        confirmButtonColor: "#F59E0B",
      });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={onVolver}
            className="text-amber-500 hover:text-amber-600 font-semibold mb-2 flex items-center gap-2"
          >
            ← Volver
          </button>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">
            Editor de Testimonios
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {testimonios.length} de {MAX_TESTIMONIOS} testimonios
          </p>
        </div>
        <button
          onClick={handleGuardar}
          disabled={guardando}
          className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
        >
          <Save className="w-5 h-5" />
          {guardando ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>

      {/* Lista de testimonios */}
      <div className="space-y-4 mb-6">
        {testimonios.map(testimonio => (
          <div key={testimonio.id} className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 dark:text-white">{testimonio.nombre}</h3>
                <div className="flex gap-1 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonio.calificacion ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditando(testimonio)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => eliminarTestimonio(testimonio.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{testimonio.comentario}</p>
          </div>
        ))}
      </div>

      {/* Botón agregar */}
      {testimonios.length < MAX_TESTIMONIOS && (
        <button
          onClick={agregarTestimonio}
          className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-amber-400 dark:hover:border-amber-400 rounded-xl py-8 flex flex-col items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:text-amber-500 transition-colors"
        >
          <Plus className="w-8 h-8" />
          <span className="font-semibold">Agregar Testimonio</span>
        </button>
      )}

      {/* Modal de edición */}
      {editando && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                {testimonios.find(t => t.id === editando.id) ? "Editar" : "Nuevo"} Testimonio
              </h3>
              <button onClick={() => setEditando(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre del cliente *
                </label>
                <input
                  type="text"
                  value={editando.nombre}
                  onChange={(e) => setEditando({ ...editando, nombre: e.target.value })}
                  placeholder="Ej: María González"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Comentario *
                </label>
                <textarea
                  rows={4}
                  value={editando.comentario}
                  onChange={(e) => setEditando({ ...editando, comentario: e.target.value })}
                  placeholder="¿Qué dijo el cliente sobre tu negocio?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Calificación
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setEditando({ ...editando, calificacion: num })}
                      className="p-2 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 ${num <= editando.calificacion ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={guardarTestimonio}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditando(null)}
                  className="px-6 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
