import React from 'react';
import LayoutDirectorio from '../layouts/LayoutDirectorio';
import { Store, Utensils, Coffee, HeartPulse, Hammer, PartyPopper } from 'lucide-react';

const CATEGORIAS_PREVIEW = [
  { nombre: 'Comida Rápida', icono: <Coffee className="w-6 h-6" />, color: 'bg-orange-500' },
  { nombre: 'Restaurantes', icono: <Utensils className="w-6 h-6" />, color: 'bg-red-500' },
  { nombre: 'Entretenimiento', icono: <PartyPopper className="w-6 h-6" />, color: 'bg-purple-500' },
  { nombre: 'Servicios', icono: <Store className="w-6 h-6" />, color: 'bg-blue-500' },
  { nombre: 'Mantenimiento', icono: <Hammer className="w-6 h-6" />, color: 'bg-gray-600' },
  { nombre: 'Salud', icono: <HeartPulse className="w-6 h-6" />, color: 'bg-emerald-500' },
];

const Home = () => {
  return (
    <LayoutDirectorio>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden bg-slate-900">
          <div className="absolute inset-0 z-0 opacity-40">
            <img 
              src="/sanjuan.jpg" 
              alt="San Juan Online Background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg tracking-tight">
              San Juan Online
              <span className="block text-blue-400 text-3xl md:text-4xl mt-2 font-semibold">Directorio Digital</span>
            </h1>
            <p className="text-xl md:text-2xl font-light mb-10 opacity-90 drop-shadow-md">
              Conectando negocios locales con el mundo digital
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl">
                Explorar Negocios
              </button>
              <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold transition-all">
                Registrar mi Negocio
              </button>
            </div>
          </div>
        </section>

        {/* Categories Section Preview (Fase 2 Ready) */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">¿Qué estás buscando hoy?</h2>
              <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {CATEGORIAS_PREVIEW.map((cat, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group cursor-pointer border border-gray-100"
                >
                  <div className={`${cat.color} p-4 rounded-full text-white mb-4 transform group-hover:scale-110 transition-transform`}>
                    {cat.icono}
                  </div>
                  <span className="font-semibold text-gray-700 text-sm md:text-base">{cat.nombre}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Misión Corta */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Impulsando el Comercio Local</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              San Juan Online es la plataforma diseñada para dar visibilidad a todos los comercios, desde los más pequeños hasta los más consolidados, facilitando que los clientes encuentren lo que necesitan en un solo lugar.
            </p>
          </div>
        </section>
      </div>
    </LayoutDirectorio>
  );
};

export default Home;