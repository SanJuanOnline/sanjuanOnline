import { X, Check } from "lucide-react";

interface Props {
  onCerrar: () => void;
  onConfirmar: () => void;
}

export default function ModalPago({ onCerrar, onConfirmar }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onCerrar}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🚀</span>
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">
            Plan Estándar
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Desbloquea todas las herramientas para construir tu landing
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 mb-6">
          <div className="text-center mb-4">
            <span className="text-4xl font-black text-slate-800 dark:text-white">$300</span>
            <span className="text-slate-500 dark:text-slate-400 text-sm ml-2">MXN / año</span>
          </div>
          
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-slate-700 dark:text-slate-300">Editor de Productos (ilimitados)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-slate-700 dark:text-slate-300">Galería de imágenes (hasta 12)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-slate-700 dark:text-slate-300">Testimonios de clientes (hasta 10)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-slate-700 dark:text-slate-300">Personalización de colores y tipografía</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-slate-700 dark:text-slate-300">Ediciones ilimitadas durante el año</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={onConfirmar}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors"
          >
            Confirmar Pago (Simulado)
          </button>
          <button
            onClick={onCerrar}
            className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-3 rounded-xl transition-colors"
          >
            Cancelar
          </button>
        </div>

        <p className="text-xs text-center text-slate-400 mt-4">
          💳 En producción se integrará pasarela de pago real
        </p>
      </div>
    </div>
  );
}
