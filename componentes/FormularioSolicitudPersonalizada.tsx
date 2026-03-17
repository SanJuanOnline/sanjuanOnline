import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import Swal from "sweetalert2";

interface Props {
  nombreNegocio: string;
  onCerrar: () => void;
  onEnviar: (datos: DatosSolicitud) => void;
}

export interface DatosSolicitud {
  descripcion: string;
  referenciaSitios: string;
  presupuesto: string;
  contacto: string;
}

export default function FormularioSolicitudPersonalizada({ nombreNegocio, onCerrar, onEnviar }: Props) {
  const [datos, setDatos] = useState<DatosSolicitud>({
    descripcion: "",
    referenciaSitios: "",
    presupuesto: "",
    contacto: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!datos.descripcion.trim() || !datos.contacto.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Por favor completa la descripción y el contacto",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    onEnviar(datos);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative my-8">
        <button
          onClick={onCerrar}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-purple-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">
            Solicitud de Landing Personalizada
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Para <span className="font-bold text-amber-500">{nombreNegocio}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              ¿Qué necesitas? *
            </label>
            <textarea
              required
              rows={4}
              value={datos.descripcion}
              onChange={(e) => setDatos({ ...datos, descripcion: e.target.value })}
              placeholder="Describe lo que buscas para tu landing personalizada..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Sitios de referencia (opcional)
            </label>
            <input
              type="text"
              value={datos.referenciaSitios}
              onChange={(e) => setDatos({ ...datos, referenciaSitios: e.target.value })}
              placeholder="URLs de sitios que te gustan (separados por comas)"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Presupuesto estimado (opcional)
            </label>
            <select
              value={datos.presupuesto}
              onChange={(e) => setDatos({ ...datos, presupuesto: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            >
              <option value="">Selecciona un rango</option>
              <option value="500-1000">$500 - $1,000 MXN</option>
              <option value="1000-2000">$1,000 - $2,000 MXN</option>
              <option value="2000-5000">$2,000 - $5,000 MXN</option>
              <option value="5000+">Más de $5,000 MXN</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Teléfono o email de contacto *
            </label>
            <input
              type="text"
              required
              value={datos.contacto}
              onChange={(e) => setDatos({ ...datos, contacto: e.target.value })}
              placeholder="444-123-4567 o correo@ejemplo.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            />
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-400">
            <p className="font-semibold mb-1">📋 Proceso:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Recibiremos tu solicitud</li>
              <li>Te contactaremos para entender mejor tus necesidades</li>
              <li>Te enviaremos una cotización personalizada</li>
              <li>Una vez aprobada, comenzamos el desarrollo</li>
            </ol>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              Enviar Solicitud
            </button>
            <button
              type="button"
              onClick={onCerrar}
              className="px-6 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
