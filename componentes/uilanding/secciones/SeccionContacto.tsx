import { SeccionContacto as SeccionContactoType } from "../../../database/tiposNegocios";
import { Phone, Mail, MapPin } from "lucide-react";
import FormularioContacto from "../FormularioContacto";

interface SeccionContactoProps {
  seccion: SeccionContactoType;
  colorPrimario: string;
}

export default function SeccionContacto({ seccion, colorPrimario }: SeccionContactoProps) {
  return (
    <section id="contacto" className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 
          className="text-3xl md:text-4xl font-black mb-12 text-center"
          style={{ color: colorPrimario }}
        >
          Contáctanos
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Información de contacto */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <Phone className="w-6 h-6" style={{ color: colorPrimario }} />
              <div>
                <p className="font-bold text-slate-800 dark:text-white">Teléfono</p>
                <a href={`tel:${seccion.telefono}`} className="text-slate-600 dark:text-slate-400 hover:underline">
                  {seccion.telefono}
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <Mail className="w-6 h-6" style={{ color: colorPrimario }} />
              <div>
                <p className="font-bold text-slate-800 dark:text-white">Email</p>
                <a href={`mailto:${seccion.email}`} className="text-slate-600 dark:text-slate-400 hover:underline">
                  {seccion.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <MapPin className="w-6 h-6" style={{ color: colorPrimario }} />
              <div>
                <p className="font-bold text-slate-800 dark:text-white">Ubicación</p>
                <p className="text-slate-600 dark:text-slate-400">{seccion.ubicacion}</p>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div>
            <FormularioContacto colorPrimario={colorPrimario} />
          </div>
        </div>
      </div>
    </section>
  );
}
