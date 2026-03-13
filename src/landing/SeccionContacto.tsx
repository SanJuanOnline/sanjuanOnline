// Soy la sección: SeccionContacto

import { Contacto, Direccion, Horarios, RedesSociales } from "../data/tipos.db";

interface Props {
  data?: {
    direccion: Direccion;
    horarios: Horarios;
    contacto: Contacto;
    redes: RedesSociales;
  };
}

export default function SeccionContacto({ data }: Props) {
  if (!data) return null;

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contacto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Dirección</h3>
            <p>{data.direccion.calle} {data.direccion.numero}, {data.direccion.colonia}, {data.direccion.alcaldia}, {data.direccion.cp}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Horarios</h3>
            {/* Aquí puedes mapear los horarios */}
            <p>Horarios disponibles</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Redes Sociales</h3>
          <div className="flex space-x-4">
            {data.redes.facebook && <a href={data.redes.facebook} className="text-blue-600">Facebook</a>}
            {data.redes.instagram && <a href={data.redes.instagram} className="text-pink-600">Instagram</a>}
            {/* Agregar más redes */}
          </div>
        </div>
      </div>
    </section>
  );
}
