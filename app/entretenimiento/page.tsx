import PaginaCategoria from "../../componentes/PaginaCategoria";

// Revalidar cada 10 segundos (desarrollo) o 60 segundos (producción)
export const revalidate = 10;

export default function Page() {
  return <PaginaCategoria categoria="entretenimiento" titulo="Entretenimiento" descripcion="Diversión y ocio en San Juan del Río" />;
}
