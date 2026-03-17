"use client";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Send } from "lucide-react";

interface FormularioContactoProps {
  colorPrimario: string;
}

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}

export default function FormularioContacto({ colorPrimario }: FormularioContactoProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      // Aquí puedes agregar la lógica para enviar el formulario
      console.log("Datos del formulario:", data);
      
      await Swal.fire({
        icon: "success",
        title: "¡Mensaje enviado!",
        text: "Nos pondremos en contacto contigo pronto.",
        confirmButtonColor: colorPrimario,
      });
      
      reset();
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al enviar el mensaje. Intenta de nuevo.",
        confirmButtonColor: colorPrimario,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register("nombre", { 
            required: "El nombre es obligatorio",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
            maxLength: { value: 50, message: "Máximo 50 caracteres" }
          })}
          type="text"
          placeholder="Nombre completo *"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.nombre ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
          } bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 transition`}
          style={{ '--tw-ring-color': colorPrimario } as React.CSSProperties}
        />
        {errors.nombre && (
          <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email", { 
            required: "El email es obligatorio",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido"
            }
          })}
          type="email"
          placeholder="Correo electrónico *"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
          } bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 transition`}
          style={{ '--tw-ring-color': colorPrimario } as React.CSSProperties}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("telefono", { 
            required: "El teléfono es obligatorio",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Debe ser un teléfono válido de 10 dígitos"
            }
          })}
          type="tel"
          placeholder="Teléfono (10 dígitos) *"
          maxLength={10}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.telefono ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
          } bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 transition`}
          style={{ '--tw-ring-color': colorPrimario } as React.CSSProperties}
        />
        {errors.telefono && (
          <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("mensaje", { 
            required: "El mensaje es obligatorio",
            minLength: { value: 10, message: "Mínimo 10 caracteres" },
            maxLength: { value: 500, message: "Máximo 500 caracteres" }
          })}
          placeholder="Escribe tu mensaje... *"
          rows={5}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.mensaje ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
          } bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 transition resize-none`}
          style={{ '--tw-ring-color': colorPrimario } as React.CSSProperties}
        />
        {errors.mensaje && (
          <p className="text-red-500 text-sm mt-1">{errors.mensaje.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
        style={{ backgroundColor: colorPrimario }}
      >
        <Send className="w-5 h-5" />
        Enviar mensaje
      </button>
      
      <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
        * Campos obligatorios
      </p>
    </form>
  );
}
