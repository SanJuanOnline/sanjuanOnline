import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";

export default function MascotasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-5xl font-black text-slate-800 mb-4">Mascotas</h1>
          <p className="text-xl text-slate-600">Hola, soy la página de Mascotas</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
