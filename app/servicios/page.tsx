import PaginaCategoria from "../../componentes/PaginaCategoria";

// Revalidar cada 10 segundos (desarrollo) o 60 segundos (producción)
export const revalidate = 10;


export default function ServiciosPage() {
  return (
    <PaginaCategoria 
      categoria="servicios"
      titulo="Servicios Profesionales"
      descripcion="Encuentra profesionales y servicios especializados en San Juan"
    />
  );
}
