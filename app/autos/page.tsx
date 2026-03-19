import PaginaCategoria from "../../componentes/PaginaCategoria";

// Revalidar cada 10 segundos (desarrollo) o 60 segundos (producción)
export const revalidate = 10;


export default function AutosPage() {
  return (
    <PaginaCategoria 
      categoria="autos"
      titulo="Autos y Talleres"
      descripcion="Todo para tu vehículo: talleres, refacciones y servicios automotrices"
    />
  );
}
