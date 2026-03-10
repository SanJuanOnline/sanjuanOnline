interface Props {
  data?: string[];
}

export default function SeccionGaleria({ data }: Props) {

  if (!data) return null;

  return (
    <section>

      <h2>Galería</h2>

      <div className="galeria">

        {data.map((img) => (
          <img key={img} src={img} />
        ))}

      </div>

    </section>
  );
}