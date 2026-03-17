
import { Negocio } from './tiposNegocios';

export const negocios: Negocio[] = [
  // Ejemplo 1: Franquicia con Enlace Externo (Tipo VIP)
  {
    id: 1,
    nombre: "McDonald's Centro",
    descripcion: "La cadena de hamburguesas más famosa del mundo, ahora en el corazón de San Juan. Disfruta de tus clásicos favoritos.",
    categoria: "comida-rapida",
    slug: "mcdonalds-centro",
    imagen: "/imagenes/negocios/mcdonalds_logo.png",
    planSuscripcion: "vip",
    tipoEnlace: "externo",
    urlExterna: "https://www.mcdonalds.com.mx/",
  },
  
  // Ejemplo 2: Negocio Local con Landing Interna (Tipo Estándar)
  {
    id: 2,
    nombre: "Hamburguesas al Carbón 'El Leñador'",
    descripcion: "Auténticas hamburguesas al carbón con ingredientes frescos y un sabor inigualable. ¡Tienes que probarlas!",
    categoria: "comida-rapida",
    slug: "hamburguesas-el-lenador",
    imagen: "/imagenes/negocios/lenador_logo.png",
    planSuscripcion: "estandar",
    tipoEnlace: "landing",
    landing: {
      colores: {
        primario: "#8B4513",
        secundario: "#FFC107",
      },
      secciones: [
        {
          tipo: "banner",
          imagen: "/imagenes/landings/lenador_banner.jpg",
          titulo: "El Sabor del Carbón en cada Mordida",
          subtitulo: "Hamburguesas 100% de Res",
        },
        {
          tipo: "informacion",
          titulo: "Nuestra Pasión por el Sabor",
          contenido: "En 'El Leñador', cada hamburguesa se cocina a la perfección sobre brasas de carbón real, garantizando un sabor ahumado y jugoso que no encontrarás en otro lugar. Usamos solo carne de la más alta calidad e ingredientes locales.",
        },
        {
          tipo: "productos",
          titulo: "Nuestro Menú Estrella",
          productos: [
            {
              nombre: "Leñador Clásica",
              descripcion: "Carne de res 200g, queso manchego, tocino crujiente, y nuestra salsa secreta de la casa.",
              precio: 120,
              imagen: "/imagenes/landings/producto_clasica.jpg",
            },
            {
              nombre: "Hawaiana Ahumada",
              descripcion: "Carne de res 200g, piña asada al carbón, jamón de pavo y queso derretido.",
              precio: 130,
              imagen: "/imagenes/landings/producto_hawaiana.jpg",
            },
            {
              nombre: "Doble Dinamita",
              descripcion: "Doble carne (400g), doble queso, doble tocino. Solo para valientes.",
              precio: 180,
              imagen: "/imagenes/landings/producto_doble.jpg",
            },
          ],
        },
        {
          tipo: "galeria",
          titulo: "Un Vistazo a Nuestro Sabor",
          imagenes: [
            "/imagenes/landings/galeria_1.jpg",
            "/imagenes/landings/galeria_2.jpg",
            "/imagenes/landings/galeria_3.jpg",
            "/imagenes/landings/galeria_4.jpg",
          ],
        },
        {
          tipo: "testimonios",
          titulo: "Lo que dicen Nuestros Leñadores",
          testimonios: [
            {
              autor: "Carlos Mendoza",
              comentario: "¡Las mejores hamburguesas que he probado en años! El sabor del carbón es auténtico.",
            },
            {
              autor: "Sofía Vargas",
              comentario: "Excelente servicio y la comida deliciosa. La Doble Dinamita es un verdadero reto.",
            },
          ],
        },
        {
          tipo: "contacto",
          telefono: "4441234567",
          email: "contacto@lenadorburgers.com",
          ubicacion: "Av. Venustiano Carranza 123, Centro, San Juan",
        },
      ],
    },
  },

  {
    id: 3,
    nombre: "Burger King Plaza",
    descripcion: "Las hamburguesas a la parrilla que amas. Ven por tu Whopper favorito.",
    categoria: "comida-rapida",
    slug: "burger-king-plaza",
    imagen: "/imagenes/negocios/burgerking_logo.png",
    planSuscripcion: "vip",
    tipoEnlace: "externo",
    urlExterna: "https://www.burgerking.com.mx/",
  },

  {
    id: 4,
    nombre: "Tacos El Güero",
    descripcion: "Los mejores tacos de la ciudad. Carne asada, pastor, y más. ¡Ven a probarlos!",
    categoria: "comida-rapida",
    slug: "tacos-el-guero",
    imagen: "/imagenes/negocios/tacos_logo.png",
    planSuscripcion: "basico",
    tipoEnlace: "landing",
    landing: {
      colores: {
        primario: "#D32F2F",
        secundario: "#FFA726",
      },
      secciones: [
        {
          tipo: "banner",
          imagen: "/imagenes/landings/tacos_banner.jpg",
          titulo: "Tacos Auténticos",
          subtitulo: "Tradición y Sabor",
        },
        {
          tipo: "informacion",
          titulo: "Más de 20 años de tradición",
          contenido: "En Tacos El Güero preparamos cada taco con la receta familiar que nos ha distinguido por generaciones.",
        },
        {
          tipo: "productos",
          titulo: "Nuestros Tacos",
          productos: [
            {
              nombre: "Taco de Asada",
              descripcion: "Carne asada premium con cebolla y cilantro",
              precio: 25,
              imagen: "/imagenes/landings/taco_asada.jpg",
            },
            {
              nombre: "Taco de Pastor",
              descripcion: "Carne al pastor con piña y salsa especial",
              precio: 25,
              imagen: "/imagenes/landings/taco_pastor.jpg",
            },
          ],
        },
        {
          tipo: "contacto",
          telefono: "4449876543",
          email: "tacoselguero@gmail.com",
          ubicacion: "Calle Hidalgo 456, Centro, San Juan",
        },
      ],
    },
  },

  {
    id: 5,
    nombre: "KFC San Juan",
    descripcion: "El pollo frito más famoso del mundo. Receta secreta del Coronel Sanders.",
    categoria: "comida-rapida",
    slug: "kfc-san-juan",
    imagen: "/imagenes/negocios/kfc_logo.png",
    planSuscripcion: "vip",
    tipoEnlace: "externo",
    urlExterna: "https://www.kfc.com.mx/",
  },

  {
    id: 6,
    nombre: "Pizza Express",
    descripcion: "Pizzas artesanales al horno de leña. Entrega a domicilio en 30 minutos.",
    categoria: "comida-rapida",
    slug: "pizza-express",
    imagen: "/imagenes/negocios/pizza_logo.png",
    planSuscripcion: "estandar",
    tipoEnlace: "landing",
    landing: {
      colores: {
        primario: "#C62828",
        secundario: "#4CAF50",
      },
      secciones: [
        {
          tipo: "banner",
          imagen: "/imagenes/landings/pizza_banner.jpg",
          titulo: "Pizza Artesanal",
          subtitulo: "Horno de Leña Tradicional",
        },
        {
          tipo: "informacion",
          titulo: "Ingredientes Frescos",
          contenido: "Cada pizza se prepara con masa fresca del día e ingredientes importados de Italia.",
        },
        {
          tipo: "productos",
          titulo: "Nuestras Pizzas",
          productos: [
            {
              nombre: "Margarita",
              descripcion: "Tomate, mozzarella y albahaca fresca",
              precio: 150,
              imagen: "/imagenes/landings/pizza_margarita.jpg",
            },
            {
              nombre: "Pepperoni",
              descripcion: "Pepperoni premium y queso mozzarella",
              precio: 170,
              imagen: "/imagenes/landings/pizza_pepperoni.jpg",
            },
            {
              nombre: "Cuatro Quesos",
              descripcion: "Mozzarella, parmesano, gorgonzola y provolone",
              precio: 190,
              imagen: "/imagenes/landings/pizza_quesos.jpg",
            },
          ],
        },
        {
          tipo: "contacto",
          telefono: "4445556677",
          email: "pizzaexpress@hotmail.com",
          ubicacion: "Blvd. Constitución 789, San Juan",
        },
      ],
    },
  },

  {
    id: 7,
    nombre: "Subway Centro",
    descripcion: "Sándwiches frescos y saludables. Arma tu sub a tu gusto.",
    categoria: "comida-rapida",
    slug: "subway-centro",
    imagen: "/imagenes/negocios/subway_logo.png",
    planSuscripcion: "vip",
    tipoEnlace: "externo",
    urlExterna: "https://www.subway.com/es-MX",
  },

  {
    id: 8,
    nombre: "Hot Dogs El Chavo",
    descripcion: "Hot dogs estilo Sonora con tocino, cebolla y todos los aderezos.",
    categoria: "comida-rapida",
    slug: "hotdogs-el-chavo",
    imagen: "/imagenes/negocios/hotdog_logo.png",
    planSuscripcion: "basico",
    tipoEnlace: "landing",
    landing: {
      colores: {
        primario: "#FF6F00",
        secundario: "#FFD54F",
      },
      secciones: [
        {
          tipo: "banner",
          imagen: "/imagenes/landings/hotdog_banner.jpg",
          titulo: "Hot Dogs Estilo Sonora",
          subtitulo: "Con Tocino y Mucho Sabor",
        },
        {
          tipo: "informacion",
          titulo: "Tradición Sonorense",
          contenido: "Preparamos nuestros hot dogs con la auténtica receta de Sonora.",
        },
        {
          tipo: "productos",
          titulo: "Nuestros Hot Dogs",
          productos: [
            {
              nombre: "Hot Dog Sencillo",
              descripcion: "Salchicha, tocino, cebolla, tomate y aderezos",
              precio: 35,
              imagen: "/imagenes/landings/hotdog_sencillo.jpg",
            },
            {
              nombre: "Hot Dog Especial",
              descripcion: "Doble salchicha, doble tocino y queso",
              precio: 50,
              imagen: "/imagenes/landings/hotdog_especial.jpg",
            },
          ],
        },
        {
          tipo: "contacto",
          telefono: "4442223344",
          email: "hotdogselchavo@gmail.com",
          ubicacion: "Av. Juárez 321, San Juan",
        },
      ],
    },
  },

  {
    id: 9,
    nombre: "Tortas Ahogadas La Lupita",
    descripcion: "Auténticas tortas ahogadas estilo Guadalajara. Picantes y deliciosas.",
    categoria: "comida-rapida",
    slug: "tortas-ahogadas-lupita",
    imagen: "/imagenes/negocios/tortas_logo.png",
    planSuscripcion: "basico",
    tipoEnlace: "landing",
    estado: "construccion",
    landing: {
      colores: {
        primario: "#D84315",
        secundario: "#FFA726",
      },
      secciones: [
        {
          tipo: "contacto",
          telefono: "4443334455",
          email: "tortaslalupita@gmail.com",
          ubicacion: "Calle Morelos 567, San Juan",
        },
      ],
    },
  },

  {
    id: 10,
    nombre: "Quesadillas Doña Mary",
    descripcion: "Quesadillas hechas a mano con queso Oaxaca y guisados caseros.",
    categoria: "comida-rapida",
    slug: "quesadillas-dona-mary",
    imagen: "/imagenes/negocios/quesadillas_logo.png",
    planSuscripcion: "basico",
    tipoEnlace: "landing",
    estado: "construccion",
    landing: {
      colores: {
        primario: "#7B1FA2",
        secundario: "#FFB300",
      },
      secciones: [
        {
          tipo: "contacto",
          telefono: "4446667788",
          email: "quesadillasdonamary@gmail.com",
          ubicacion: "Av. Independencia 890, San Juan",
        },
      ],
    },
  },

  // ─── Negocio 11: Restaurante con landing completa ───────────────────────────
  {
    id: 11,
    nombre: "El Rincón de la Abuela",
    descripcion: "Cocina casera tradicional con los sabores de siempre. Comida corrida y platillos del día.",
    categoria: "restaurantes",
    slug: "el-rincon-de-la-abuela",
    imagen: "/imagenes/negocios/rincon_logo.png",
    planSuscripcion: "estandar",
    tipoEnlace: "landing",
    landing: {
      colores: {
        primario: "#7C3AED",
        secundario: "#F59E0B",
      },
      secciones: [
        {
          tipo: "banner",
          imagen: "/imagenes/landings/rincon_banner.jpg",
          titulo: "La Cocina de Siempre",
          subtitulo: "Sabores que te recuerdan a casa",
        },
        {
          tipo: "informacion",
          titulo: "Más de 15 años alimentando familias",
          contenido: "En El Rincón de la Abuela preparamos cada platillo con recetas heredadas de generación en generación. Ingredientes frescos del mercado local, sazón de verdad y el cariño de siempre.",
        },
        {
          tipo: "productos",
          titulo: "Menú del Día",
          productos: [
            {
              nombre: "Comida Corrida",
              descripcion: "Sopa, guisado, arroz, frijoles y agua fresca",
              precio: 80,
              imagen: "/imagenes/landings/corrida.jpg",
            },
            {
              nombre: "Pozole Rojo",
              descripcion: "Pozole de cerdo con todos los toppings, tostadas y limón",
              precio: 95,
              imagen: "/imagenes/landings/pozole.jpg",
            },
            {
              nombre: "Enchiladas Verdes",
              descripcion: "Enchiladas con pollo, crema, queso y cebolla",
              precio: 75,
              imagen: "/imagenes/landings/enchiladas.jpg",
            },
          ],
        },
        {
          tipo: "testimonios",
          titulo: "Lo que dicen nuestros clientes",
          testimonios: [
            {
              autor: "María González",
              comentario: "La mejor comida corrida de la zona. El pozole es increíble, siempre regreso.",
            },
            {
              autor: "Roberto Sánchez",
              comentario: "Como comer en casa de tu abuela. Precios justos y porciones generosas.",
            },
          ],
        },
        {
          tipo: "contacto",
          telefono: "4447778899",
          email: "rinconabuela@gmail.com",
          ubicacion: "Calle Allende #45, Colonia Centro, San Juan del Río",
        },
      ],
    },
  },

  // ─── Negocio 12: Salud con landing completa ─────────────────────────────────
  {
    id: 12,
    nombre: "Farmacia y Consultorio San Rafael",
    descripcion: "Farmacia con consultorio médico de bajo costo. Medicamentos genéricos y de patente.",
    categoria: "salud",
    slug: "farmacia-san-rafael",
    imagen: "/imagenes/negocios/sanrafael_logo.png",
    planSuscripcion: "estandar",
    tipoEnlace: "landing",
    landing: {
      colores: {
        primario: "#059669",
        secundario: "#3B82F6",
      },
      secciones: [
        {
          tipo: "banner",
          imagen: "/imagenes/landings/farmacia_banner.jpg",
          titulo: "Tu Salud, Nuestra Prioridad",
          subtitulo: "Consulta médica desde $50 · Medicamentos al mejor precio",
        },
        {
          tipo: "informacion",
          titulo: "Atención médica accesible para todos",
          contenido: "En Farmacia San Rafael contamos con médico general de lunes a sábado. Consulta de bajo costo, receta incluida. Surtimos toda clase de medicamentos genéricos y de patente con los mejores precios de la zona.",
        },
        {
          tipo: "productos",
          titulo: "Nuestros Servicios",
          productos: [
            {
              nombre: "Consulta Médica General",
              descripcion: "Atención médica con receta. Lunes a Sábado 9am - 7pm",
              precio: 50,
              imagen: "/imagenes/landings/consulta.jpg",
            },
            {
              nombre: "Toma de Presión y Glucosa",
              descripcion: "Medición rápida sin cita. Resultados inmediatos.",
              precio: 20,
              imagen: "/imagenes/landings/presion.jpg",
            },
            {
              nombre: "Inyecciones y Curaciones",
              descripcion: "Aplicación de inyecciones con o sin receta médica.",
              precio: 30,
              imagen: "/imagenes/landings/inyeccion.jpg",
            },
          ],
        },
        {
          tipo: "contacto",
          telefono: "4441122334",
          email: "farmaciasanrafael@hotmail.com",
          ubicacion: "Av. Constitución #210, Col. San Rafael, San Juan del Río",
        },
      ],
    },
  },
];
