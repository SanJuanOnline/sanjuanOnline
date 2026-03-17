"use client";

import { useState, useEffect } from "react";
import Spinner from "../componentes/Spinner";
import { ArrowRight, Ghost, HelpCircle, Trophy, Check, Star, Zap, Users, TrendingUp, Clock, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { obtenerTodosLosNegocios } from "../database/serviciosFirestore";

export default function Home() {
  const [cargando, setCargando] = useState(true);
  const [mostrarSpinner, setMostrarSpinner] = useState(true);
  const [contadorLugares, setContadorLugares] = useState(100);

  useEffect(() => {
    const spinnerMostrado = sessionStorage.getItem("spinnerMostrado");
    
    if (spinnerMostrado) {
      setMostrarSpinner(false);
      setCargando(false);
    } else {
      const timer = setTimeout(() => {
        setCargando(false);
        sessionStorage.setItem("spinnerMostrado", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Cargar contador real desde Firestore
  useEffect(() => {
    const cargarContador = async () => {
      const negocios = await obtenerTodosLosNegocios();
      const registrados = negocios.length;
      setContadorLugares(Math.max(0, 100 - registrados));
    };
    cargarContador();
  }, []);

  if (mostrarSpinner && cargando) return <Spinner />;

  const categorias = [
    { nombre: "Comida Rápida", slug: "comida-rapida", icon: "🍔", desc: "Antojos que satisfacen", count: 8 },
    { nombre: "Restaurantes", slug: "restaurantes", icon: "🍽️", desc: "Experiencias gastronómicas", count: 0 },
    { nombre: "Entretenimiento", slug: "entretenimiento", icon: "🎭", desc: "Diversión local", count: 0 },
    { nombre: "Servicios", slug: "servicios", icon: "🛠️", desc: "Profesionales a tu servicio", count: 0 },
    { nombre: "Mantenimiento", slug: "mantenimiento", icon: "🔧", desc: "Soluciones a tu alcance", count: 0 },
    { nombre: "Salud", slug: "salud", icon: "❤️", desc: "Bienestar cercano", count: 0 },
    { nombre: "Mascotas", slug: "mascotas", icon: "🐾", desc: "Para los peludos de la familia", count: 0 },
    { nombre: "Hoteles", slug: "hoteles", icon: "🏨", desc: "Descanso con sabor local", count: 0 },
    { nombre: "Autos", slug: "autos", icon: "🚗", desc: "Todo para tu vehículo", count: 0 },
  ];

  return (
    <div className="min-h-screen">
      {/* SECCIÓN 1: HERO BANNER */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background con overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/sanjuan.jpg" 
            alt="San Juan" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40"></div>
        </div>

        {/* Contenido */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Tu Negocio en el Mapa de<br />
              <span className="text-amber-400">San Juan Online</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-6">
              Las Secciónes 1-2-3-4-5-6-7 y Colonias  aledañas <br />
              ¿Te encuentran?
            </h2>
            
            <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-8">
              Miles de vecinos buscan cada día dónde comer, dónde comprar, a quién llamar para arreglar sus cosas... 
              <span className="text-white font-bold"> y tu negocio podría ser la respuesta.</span>
            </p>

            {/* Badge de urgencia */}
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-full mb-6 animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold">+50 negocios ya se unieron este mes</span>
            </div>

            {/* CTA Principal */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/registro"
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-lg px-8 py-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-2xl"
              >
                Quiero Aparecer Aquí
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-white rotate-90" />
        </div>
      </section>

      {/* SECCIÓN 2: EL PROBLEMA */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-slate-800 dark:text-white mb-12">
            ¿Te suena familiar?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tarjeta 1 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Ghost className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                El Fantasma Digital
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Tienes el mejor producto de la zona, pero cuando alguien busca "cerca de mí", 
                <span className="font-bold text-slate-800 dark:text-white"> aparecen todos menos tú.</span>
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                El Cliente Perdido
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Tu cliente feliz le dice a su primo dónde comprar, pero 
                <span className="font-bold text-slate-800 dark:text-white"> el primo olvida el nombre o no encuentra dirección.</span>
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                La Competencia Invisible
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                El negocio de al lado sí tiene página. 
                <span className="font-bold text-slate-800 dark:text-white"> Y no necesariamente es mejor que el tuyo.</span> Solo supo estar donde hay que estar.
              </p>
            </div>
          </div>

          {/* Flecha de transición */}
          <div className="flex justify-center mt-12">
            <div className="w-1 h-16 bg-gradient-to-b from-slate-300 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: LA SOLUCIÓN */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 mb-6">
                San Juan Online:<br />El Directorio que Necesitábamos
              </h2>
              
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
                Creamos el primer directorio digital exclusivo para las secciones 1 a la 7 y Colonias aledelañas. 
                Un solo lugar donde los vecinos encuentran TODO: desde la tortillería de la esquina hasta el hotel más bonito del pueblo.
              </p>

              {/* 3 Pilares */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white mb-1">Exclusividad Local</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      No competimos con cadenas nacionales. Aquí el protagonista eres TÚ, el negocio de la esquina.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white mb-1">Presencia Real</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Tu propia página profesional con fotos, horarios, productos y todo lo que hace único a tu negocio.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white mb-1">Comunidad Activa</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Miles de vecinos buscando activamente dónde gastar su dinero localmente.
                    </p>
                  </div>
                </div>
              </div>

              <Link 
                href="/comida-rapida/hamburguesas-el-lenador"
                className="inline-flex items-center gap-2 mt-8 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-bold px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-slate-900 transition"
              >
                Ver cómo me vería
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mockup */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform">
                <div className="bg-white rounded-lg p-4 shadow-xl">
                  <div className="h-48 bg-slate-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-slate-400 font-bold">Tu Negocio Aquí</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: CATEGORÍAS */}
      <section id="categorias" className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-4">
              Todos tienen lugar aquí
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Da igual si vendes hamburguesas, arreglas lavadoras o tienes un hotel boutique. 
              Hay una categoría esperándote.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {categorias.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{cat.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  {cat.nombre}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {cat.desc}
                </p>
                <div className="text-xs text-slate-500 dark:text-slate-500 font-semibold">
                  {cat.count > 0 ? `${cat.count} negocios registrados` : 'Sé el primero'}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
              ¿No ves tu giro? Te creamos la categoría →
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: SOCIAL PROOF + URGENCIA */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black mb-2">500+</div>
              <div className="text-sm md:text-base opacity-90">Negocios potenciales en la zona</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black mb-2">50+</div>
              <div className="text-sm md:text-base opacity-90">Ya están aquí</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black mb-2">10K+</div>
              <div className="text-sm md:text-base opacity-90">Búsquedas mensuales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black mb-2 text-amber-400">1</div>
              <div className="text-sm md:text-base opacity-90">Oportunidad única</div>
            </div>
          </div>

          {/* Banner de urgencia */}
          <div className="bg-amber-500 text-slate-900 rounded-2xl p-6 md:p-8 text-center mb-16 max-w-4xl mx-auto shadow-2xl">
            <div className="text-2xl md:text-3xl font-black mb-2">
              🎁 Lanzamiento Especial
            </div>
            <div className="text-lg md:text-xl font-bold mb-4">
              Los primeros 100 registros son GRATIS para siempre
            </div>
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full font-bold animate-pulse mb-6">
              <Clock className="w-5 h-5" />
              Quedan {contadorLugares} lugares disponibles
            </div>
            <div>
              <Link
                href="/registro"
                className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-black text-lg px-10 py-4 rounded-lg transition-all transform hover:scale-105 shadow-xl"
              >
                Quiero Registrarme Ahora
              </Link>
            </div>
          </div>

          {/* Testimonios */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mb-4 italic">
                "Antes dependía solo del tráfico peatonal. Ahora me llaman de otras secciones porque me encontraron aquí."
              </p>
              <div className="font-bold">Carlos</div>
              <div className="text-sm opacity-75">Hamburguesas El Leñador</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mb-4 italic">
                "La inversión se pagó sola con dos clientes nuevos. El resto es ganancia pura."
              </p>
              <div className="font-bold">María</div>
              <div className="text-sm opacity-75">Spa Conilas</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mb-4 italic">
                "Mi hijo me dijo que necesitaba estar en internet. No entendía por qué hasta que vi los resultados."
              </p>
              <div className="font-bold">Don José</div>
              <div className="text-sm opacity-75">Taller San Juan</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: CÓMO FUNCIONA */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-slate-800 dark:text-white mb-4">
            Estar online nunca fue tan fácil
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto">
            Sin costos de diseñador. Sin complicaciones técnicas. Sin excusas.
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Líneas conectoras (desktop) */}
              <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 dark:from-blue-800 dark:via-blue-600 dark:to-blue-800"></div>

              {/* Paso 1 */}
              <div className="relative text-center">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10">
                  <div className="text-white">
                    <div className="text-4xl font-black mb-1">1</div>
                    <div className="text-xs">Registras</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                  Llenas un formulario simple
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Con los datos de tu negocio. Te ayudamos si te atoras.
                </p>
              </div>

              {/* Paso 2 */}
              <div className="relative text-center">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10">
                  <div className="text-white">
                    <div className="text-4xl font-black mb-1">2</div>
                    <div className="text-xs">Creamos</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                  Nosotros diseñamos
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Tu landing con tus colores, fotos e información. Tú solo apruebas.
                </p>
              </div>

              {/* Paso 3 */}
              <div className="relative text-center">
                <div className="w-32 h-32 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10">
                  <div className="text-white">
                    <div className="text-4xl font-black mb-1">3</div>
                    <div className="text-xs">¡Listo!</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                  Apareces en el mapa
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Instantáneamente los vecinos pueden encontrarte y contactarte.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 7: COMPARATIVA */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-slate-800 dark:text-white mb-12">
            ¿Con o sin presencia digital?
          </h2>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                  <th className="p-6 text-left text-slate-500 dark:text-slate-400 font-bold">
                    Sin San Juan Online 😕
                  </th>
                  <th className="p-6 text-left bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-bold">
                    Con San Juan Online 🚀
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base">
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    ❌ Depender solo del paso peatonal
                  </td>
                  <td className="p-4 bg-green-50 dark:bg-green-900/10 text-slate-800 dark:text-white font-semibold">
                    ✅ Clientes te encuentran activamente
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    ❌ Competir solo por precio
                  </td>
                  <td className="p-4 bg-green-50 dark:bg-green-900/10 text-slate-800 dark:text-white font-semibold">
                    ✅ Competir por valor y experiencia
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    ❌ Horario limitado a puertas abiertas
                  </td>
                  <td className="p-4 bg-green-50 dark:bg-green-900/10 text-slate-800 dark:text-white font-semibold">
                    ✅ "Abierto" 24/7 en internet
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    ❌ Clientes locales únicamente
                  </td>
                  <td className="p-4 bg-green-50 dark:bg-green-900/10 text-slate-800 dark:text-white font-semibold">
                    ✅ Alcance a toda la zona (1-7 + Conilas)
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    ❌ Recomendaciones que se pierden
                  </td>
                  <td className="p-4 bg-green-50 dark:bg-green-900/10 text-slate-800 dark:text-white font-semibold">
                    ✅ Link directo para compartir en WhatsApp
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    ❌ Inversión en publicidad costosa
                  </td>
                  <td className="p-4 bg-green-50 dark:bg-green-900/10 text-slate-800 dark:text-white font-semibold">
                    ✅ Presencia permanente por una sola cuota
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/registro"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-lg px-10 py-4 rounded-lg transition-all transform hover:scale-105 shadow-xl inline-block"
            >
              Quiero la columna de la derecha →
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN 8: MISIÓN/PROPÓSITO */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/sanjuan.jpg" 
            alt="Comunidad" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-slate-900/85"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-8 max-w-3xl mx-auto">
            Más que un directorio:<br />
            <span className="text-amber-400">Una comunidad creciendo juntos</span>
          </h2>

          <p className="text-lg md:text-xl max-w-4xl mx-auto mb-8 leading-relaxed">
            San Juan Online nació porque creemos que los negocios locales son el corazón de nuestras secciones. 
            No queremos que ninguna tortillería, ningún taller, ninguna farmacia de barrio se quede atrás en la era digital.
          </p>

          <p className="text-lg md:text-xl max-w-4xl mx-auto mb-12 leading-relaxed">
            Cuando tú creces, tu familia crece. Cuando tu familia crece, el barrio prospera. 
            Y cuando el barrio prospera, todos ganamos.
          </p>

          <div className="text-2xl md:text-3xl font-black text-amber-400">
            "El futuro es digital. Pero el futuro también es local."
          </div>
        </div>
      </section>

      {/* SECCIÓN 9: CTA FINAL */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Tu negocio merece ser encontrado
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
            Únete a los comerciantes que ya no dependen solo de la suerte.
          </p>

          <Link 
            href="/registro"
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-xl px-12 py-5 rounded-lg transition-all transform hover:scale-105 shadow-2xl mb-8 animate-pulse inline-block"
          >
            Crear mi página ahora
          </Link>

          <div className="space-y-2 text-sm max-w-md mx-auto mb-8">
            <div className="flex items-center justify-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              <span>Sin costo para los primeros 100 negocios</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              <span>Configuración en menos de 48 horas</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              <span>Cancelas cuando quieras</span>
            </div>
            <p className="text-xs text-slate-300 text-center mt-4 opacity-75">
              * Aplican restricciones
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-red-600 px-6 py-3 rounded-full font-bold text-lg animate-pulse">
            <Zap className="w-5 h-5" />
            Quedan {contadorLugares} lugares gratuitos disponibles
          </div>
        </div>
      </section>
    </div>
  );
}
