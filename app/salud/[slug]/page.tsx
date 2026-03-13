export default function NegocioPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Negocio: {params.slug}</h1>
        <p className="text-slate-600">Categoría: Salud</p>
      </div>
    </div>
  );
}
