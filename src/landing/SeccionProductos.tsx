import { Producto } from "../tipos/negocios.tipos";

interface Props {
  data?: Producto[];
}

export default function SeccionProductos({ data }: Props) {

  if (!data) return null;

  return (
    <section>

      <h2>Productos</h2>

      <div className="grid-productos">

        {data.map((p) => (
          <div key={p.nombre}>

            <img src={p.imagen} />

            <h3>{p.nombre}</h3>

            <p>{p.descripcion}</p>

            <strong>{p.precio}</strong>

          </div>
        ))}

      </div>

    </section>
  );
}