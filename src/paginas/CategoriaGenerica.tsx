import { NEGOCIOS } from "../data/negocios.db";
import TarjetaNegocio from "../componentes/TarjetaNegocio";
import { TipoCategoria } from "../tipos/negocios.tipos";

interface Props {
  categoria: TipoCategoria;
}

export default function CategoriaGenerica({ categoria }: Props) {

  const negocios = NEGOCIOS.filter(
    (n) => n.categoria === categoria
  );

  return (
    <div className="grid-negocios">

      {negocios.map((negocio) => (
        <TarjetaNegocio
          key={negocio.id}
          negocio={negocio}
        />
      ))}

    </div>
  );
}