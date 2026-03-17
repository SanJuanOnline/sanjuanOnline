import { useState } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import Swal from "sweetalert2";

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
}

interface Props {
  productos: Producto[];
  onGuardar: (productos: Producto[]) => Promise<void>;
  onVolver: () => void;
}

export default function EditorProductos({ productos: productosIniciales, onGuardar, onVolver }: Props) {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales || []);
  const [editando, setEditando] = useState<Producto | null>(null);
  const [guardando, setGuardando] = useState(false);

  const agregarProducto = () => {
    setEditando({
      id: Date.now().toString(),
      nombre: "",
      descripcion: "",
      precio: 0,
    });
  };

  const guardarProducto = () => {
    if (!editando) return;
    
    if (!editando.nombre.trim() || editando.precio <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Completa el nombre y precio del producto",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    const existe = productos.find(p => p.id === editando.id);
    if (existe) {
      setProductos(productos.map(p => p.id === editando.id ? editando : p));
    } else {
      setProductos([...productos, editando]);
    }
    
    setEditando(null);
  };

  const eliminarProducto = (id: string) => {
    Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setProductos(productos.filter(p => p.id !== id));
      }
    });
  };

  const handleGuardar = async () => {
    setGuardando(true);
    try {
      await onGuardar(productos);
      await Swal.fire({
        icon: "success",
        title: "¡Guardado!",
        text: "Tus productos se actualizaron correctamente",
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
            Editor de Productos
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {productos.length} producto{productos.length !== 1 ? 's' : ''} agregado{productos.length !== 1 ? 's' : ''}
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

      {/* Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {productos.map(producto => (
          <div key={producto.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
            <h3 className="font-bold text-slate-800 dark:text-white mb-1">{producto.nombre}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 line-clamp-2">{producto.descripcion}</p>
            <p className="text-lg font-black text-amber-500 mb-3">${producto.precio}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setEditando(producto)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1"
              >
                <Edit2 className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={() => eliminarProducto(producto.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Botón agregar */}
      <button
        onClick={agregarProducto}
        className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-amber-400 dark:hover:border-amber-400 rounded-xl py-8 flex flex-col items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:text-amber-500 transition-colors"
      >
        <Plus className="w-8 h-8" />
        <span className="font-semibold">Agregar Producto</span>
      </button>

      {/* Modal de edición */}
      {editando && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                {productos.find(p => p.id === editando.id) ? "Editar" : "Nuevo"} Producto
              </h3>
              <button onClick={() => setEditando(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={editando.nombre}
                  onChange={(e) => setEditando({ ...editando, nombre: e.target.value })}
                  placeholder="Ej: Tacos de birria"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  value={editando.descripcion}
                  onChange={(e) => setEditando({ ...editando, descripcion: e.target.value })}
                  placeholder="Describe tu producto..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Precio *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={editando.precio}
                  onChange={(e) => setEditando({ ...editando, precio: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={guardarProducto}
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
