import { useState } from "react";
import { Plus, Trash2, Save, Image as ImageIcon, Upload } from "lucide-react";
import Swal from "sweetalert2";
import { subirImagenCloudinary } from "../../lib/cloudinary";

interface ItemGaleria {
  id: string;
  url: string;
  descripcion?: string;
}

interface Props {
  galeria: ItemGaleria[];
  onGuardar: (galeria: ItemGaleria[]) => Promise<void>;
  onVolver: () => void;
}

const MAX_IMAGENES = 12;

export default function EditorGaleria({ galeria: galeriaInicial, onGuardar, onVolver }: Props) {
  const [galeria, setGaleria] = useState<ItemGaleria[]>(galeriaInicial || []);
  const [guardando, setGuardando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);

  const subirArchivo = async () => {
    if (galeria.length >= MAX_IMAGENES) {
      Swal.fire({
        icon: "warning",
        title: "Límite alcanzado",
        text: `Solo puedes agregar hasta ${MAX_IMAGENES} imágenes`,
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setSubiendo(true);
      try {
        const url = await subirImagenCloudinary(file);
        setGaleria([...galeria, { id: Date.now().toString(), url }]);
        Swal.fire({
          icon: "success",
          title: "¡Imagen subida!",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error al subir",
          text: error.message,
          confirmButtonColor: "#F59E0B",
        });
      } finally {
        setSubiendo(false);
      }
    };
    input.click();
  };

  const agregarImagen = () => {
    if (galeria.length >= MAX_IMAGENES) {
      Swal.fire({
        icon: "warning",
        title: "Límite alcanzado",
        text: `Solo puedes agregar hasta ${MAX_IMAGENES} imágenes`,
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    Swal.fire({
      title: "Agregar imagen",
      html: `
        <input id="url-input" type="url" placeholder="https://ejemplo.com/imagen.jpg" class="swal2-input">
        <input id="desc-input" type="text" placeholder="Descripción (opcional)" class="swal2-input">
      `,
      confirmButtonText: "Agregar",
      confirmButtonColor: "#F59E0B",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const url = (document.getElementById("url-input") as HTMLInputElement).value;
        const descripcion = (document.getElementById("desc-input") as HTMLInputElement).value;
        
        if (!url) {
          Swal.showValidationMessage("La URL es requerida");
          return false;
        }
        
        return { url, descripcion };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        setGaleria([
          ...galeria,
          {
            id: Date.now().toString(),
            url: result.value.url,
            descripcion: result.value.descripcion || undefined,
          },
        ]);
      }
    });
  };

  const eliminarImagen = (id: string) => {
    Swal.fire({
      title: "¿Eliminar imagen?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setGaleria(galeria.filter(img => img.id !== id));
      }
    });
  };

  const handleGuardar = async () => {
    setGuardando(true);
    try {
      await onGuardar(galeria);
      await Swal.fire({
        icon: "success",
        title: "¡Guardado!",
        text: "Tu galería se actualizó correctamente",
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
            Editor de Galería
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {galeria.length} de {MAX_IMAGENES} imágenes
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

      {/* Botones de acción */}
      {galeria.length < MAX_IMAGENES && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={subirArchivo}
            disabled={subiendo}
            className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            {subiendo ? "Subiendo..." : "Subir Archivo"}
          </button>
          <button
            onClick={agregarImagen}
            className="flex-1 border-2 border-amber-500 text-amber-500 hover:bg-amber-50 dark:hover:bg-slate-800 font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Agregar URL
          </button>
        </div>
      )}

      {/* Grid de imágenes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {galeria.map((item) => (
          <div key={item.id} className="relative group">
            <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={item.url}
                alt={item.descripcion || "Imagen de galería"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3E?%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            <button
              onClick={() => eliminarImagen(item.id)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            {item.descripcion && (
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 truncate">
                {item.descripcion}
              </p>
            )}
          </div>
        ))}
      </div>

      {galeria.length === 0 && (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <ImageIcon className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Aún no has agregado imágenes a tu galería
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={subirArchivo}
              disabled={subiendo}
              className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl inline-flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              {subiendo ? "Subiendo..." : "Subir Archivo"}
            </button>
            <button
              onClick={agregarImagen}
              className="border-2 border-amber-500 text-amber-500 hover:bg-amber-50 dark:hover:bg-slate-800 font-bold px-6 py-3 rounded-xl inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Agregar URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
