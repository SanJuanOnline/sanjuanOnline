interface Props {
  data?: {
    portada: string;
    slogan: string;
  };
}

export default function SeccionBanner({ data }: Props) {
  if (!data) return null;

  return (
    <section className="banner">

      <img src={data.portada} alt="portada" />

      <h1>{data.slogan}</h1>

    </section>
  );
}