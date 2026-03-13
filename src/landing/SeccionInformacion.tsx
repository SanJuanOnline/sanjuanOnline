// Soy la sección: SeccionInformacion

interface Props {
  data?: {
    descripcion: string;
  };
}

export default function SeccionInformacion({ data }: Props) {
  if (!data) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Sobre Nosotros</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center">
          {data.descripcion}
        </p>
      </div>
    </section>
  );
}
