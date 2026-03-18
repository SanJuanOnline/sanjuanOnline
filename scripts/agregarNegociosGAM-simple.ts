import { config } from "dotenv";
config({ path: ".env.local" });

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const negocios = [
  // COMIDA RÁPIDA (3)
  {
    slug: "subway-gam",
    nombre: "Subway GAM",
    giro: "Comida rápida",
    categoria: "comida-rapida",
    telefono: "5555551001",
    whatsapp: "5555551001",
    direccion: "Av. Insurgentes Norte 1234, Gustavo A. Madero, CDMX",
    descripcion: "Sándwiches frescos y saludables. Franquicia internacional con ingredientes de calidad.",
    colorMarca: "#008C15",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "dominos-pizza-gam",
    nombre: "Domino's Pizza GAM",
    giro: "Pizzería",
    categoria: "comida-rapida",
    telefono: "5555551002",
    whatsapp: "5555551002",
    direccion: "Calz. San Juan de Aragón 456, Gustavo A. Madero, CDMX",
    descripcion: "Las mejores pizzas a domicilio. Promociones todos los días.",
    colorMarca: "#0B648F",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "little-caesars-gam",
    nombre: "Little Caesars GAM",
    giro: "Pizzería",
    categoria: "comida-rapida",
    telefono: "5555551003",
    whatsapp: "5555551003",
    direccion: "Av. 608 No. 789, Gustavo A. Madero, CDMX",
    descripcion: "Pizza lista para llevar. La mejor relación calidad-precio.",
    colorMarca: "#E95B0C",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },

  // RESTAURANTES (3)
  {
    slug: "vips-gam",
    nombre: "Vips GAM",
    giro: "Restaurante familiar",
    categoria: "restaurantes",
    telefono: "5555552001",
    whatsapp: "5555552001",
    direccion: "Av. Insurgentes Norte 2345, Gustavo A. Madero, CDMX",
    descripcion: "Restaurante familiar con menú variado. Desayunos, comidas y cenas.",
    colorMarca: "#D4002A",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "wings-gam",
    nombre: "Wings GAM",
    giro: "Restaurante de alitas",
    categoria: "restaurantes",
    telefono: "5555552002",
    whatsapp: "5555552002",
    direccion: "Av. Montevideo 567, Gustavo A. Madero, CDMX",
    descripcion: "Las mejores alitas de la zona. Más de 20 sabores diferentes.",
    colorMarca: "#FF6B00",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "chilis-gam",
    nombre: "Chili's GAM",
    giro: "Restaurante casual",
    categoria: "restaurantes",
    telefono: "5555552003",
    whatsapp: "5555552003",
    direccion: "Calz. Ticomán 890, Gustavo A. Madero, CDMX",
    descripcion: "Comida tex-mex y parrilladas. Ambiente familiar y casual.",
    colorMarca: "#C8102E",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },

  // ENTRETENIMIENTO (3)
  {
    slug: "cinepolis-gam",
    nombre: "Cinépolis GAM",
    giro: "Cine",
    categoria: "entretenimiento",
    telefono: "5555553001",
    whatsapp: "5555553001",
    direccion: "Av. Insurgentes Norte 3456, Gustavo A. Madero, CDMX",
    descripcion: "La mejor experiencia cinematográfica. Salas VIP y 4DX disponibles.",
    colorMarca: "#003DA5",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "boliche-gam",
    nombre: "Boliche AMF GAM",
    giro: "Boliche",
    categoria: "entretenimiento",
    telefono: "5555553002",
    whatsapp: "5555553002",
    direccion: "Av. 608 No. 1234, Gustavo A. Madero, CDMX",
    descripcion: "Diversión para toda la familia. Pistas automáticas y área de juegos.",
    colorMarca: "#E31E24",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "chuck-e-cheese-gam",
    nombre: "Chuck E. Cheese GAM",
    giro: "Centro de entretenimiento infantil",
    categoria: "entretenimiento",
    telefono: "5555553003",
    whatsapp: "5555553003",
    direccion: "Calz. San Juan de Aragón 2345, Gustavo A. Madero, CDMX",
    descripcion: "Fiestas infantiles y diversión sin límites. Pizza, juegos y shows en vivo.",
    colorMarca: "#E4002B",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },

  // SERVICIOS (3)
  {
    slug: "office-depot-gam",
    nombre: "Office Depot GAM",
    giro: "Papelería y oficina",
    categoria: "servicios",
    telefono: "5555554001",
    whatsapp: "5555554001",
    direccion: "Av. Insurgentes Norte 4567, Gustavo A. Madero, CDMX",
    descripcion: "Todo para tu oficina y escuela. Impresiones, copiado y más.",
    colorMarca: "#CC0000",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "fedex-gam",
    nombre: "FedEx Office GAM",
    giro: "Paquetería y mensajería",
    categoria: "servicios",
    telefono: "5555554002",
    whatsapp: "5555554002",
    direccion: "Av. Montevideo 678, Gustavo A. Madero, CDMX",
    descripcion: "Envíos nacionales e internacionales. Impresiones y copiado.",
    colorMarca: "#4D148C",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "supercuts-gam",
    nombre: "Supercuts GAM",
    giro: "Estética y barbería",
    categoria: "servicios",
    telefono: "5555554003",
    whatsapp: "5555554003",
    direccion: "Calz. Ticomán 1234, Gustavo A. Madero, CDMX",
    descripcion: "Cortes de cabello para toda la familia. Sin cita previa.",
    colorMarca: "#E31E24",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },

  // MANTENIMIENTO (3)
  {
    slug: "autozone-gam",
    nombre: "AutoZone GAM",
    giro: "Refacciones automotrices",
    categoria: "mantenimiento",
    telefono: "5555555001",
    whatsapp: "5555555001",
    direccion: "Av. Insurgentes Norte 5678, Gustavo A. Madero, CDMX",
    descripcion: "Refacciones y accesorios para tu auto. Asesoría especializada.",
    colorMarca: "#FF6600",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "home-depot-gam",
    nombre: "The Home Depot GAM",
    giro: "Mejoramiento del hogar",
    categoria: "mantenimiento",
    telefono: "5555555002",
    whatsapp: "5555555002",
    direccion: "Av. 608 No. 2345, Gustavo A. Madero, CDMX",
    descripcion: "Todo para construir y remodelar. Herramientas, materiales y más.",
    colorMarca: "#F96302",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "truper-gam",
    nombre: "Truper GAM",
    giro: "Ferretería",
    categoria: "mantenimiento",
    telefono: "5555555003",
    whatsapp: "5555555003",
    direccion: "Calz. San Juan de Aragón 3456, Gustavo A. Madero, CDMX",
    descripcion: "Herramientas profesionales y para el hogar. Calidad garantizada.",
    colorMarca: "#ED1C24",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },

  // SALUD (3)
  {
    slug: "farmacias-guadalajara-gam",
    nombre: "Farmacias Guadalajara GAM",
    giro: "Farmacia",
    categoria: "salud",
    telefono: "5555556001",
    whatsapp: "5555556001",
    direccion: "Av. Insurgentes Norte 6789, Gustavo A. Madero, CDMX",
    descripcion: "Medicamentos y productos de salud. Servicio 24 horas.",
    colorMarca: "#E30613",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "farmacias-del-ahorro-gam",
    nombre: "Farmacias del Ahorro GAM",
    giro: "Farmacia",
    categoria: "salud",
    telefono: "5555556002",
    whatsapp: "5555556002",
    direccion: "Av. Montevideo 789, Gustavo A. Madero, CDMX",
    descripcion: "Los mejores precios en medicamentos. Consultorios médicos disponibles.",
    colorMarca: "#00A651",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "salud-digna-gam",
    nombre: "Salud Digna GAM",
    giro: "Laboratorio clínico",
    categoria: "salud",
    telefono: "5555556003",
    whatsapp: "5555556003",
    direccion: "Calz. Ticomán 2345, Gustavo A. Madero, CDMX",
    descripcion: "Estudios de laboratorio y gabinete a precios accesibles.",
    colorMarca: "#00A99D",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },

  // HOTELES (3)
  {
    slug: "city-express-gam",
    nombre: "City Express GAM",
    giro: "Hotel",
    categoria: "hoteles",
    telefono: "5555557001",
    whatsapp: "5555557001",
    direccion: "Av. Insurgentes Norte 7890, Gustavo A. Madero, CDMX",
    descripcion: "Hotel de negocios con todas las comodidades. Desayuno incluido.",
    colorMarca: "#E31E24",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "hotel-fiesta-inn-gam",
    nombre: "Fiesta Inn GAM",
    giro: "Hotel",
    categoria: "hoteles",
    telefono: "5555557002",
    whatsapp: "5555557002",
    direccion: "Av. 608 No. 3456, Gustavo A. Madero, CDMX",
    descripcion: "Confort y estilo para viajeros de negocios y placer.",
    colorMarca: "#D4145A",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "one-hotels-gam",
    nombre: "One Hotels GAM",
    giro: "Hotel",
    categoria: "hoteles",
    telefono: "5555557003",
    whatsapp: "5555557003",
    direccion: "Calz. San Juan de Aragón 4567, Gustavo A. Madero, CDMX",
    descripcion: "Hospedaje económico y cómodo. Ideal para estancias cortas.",
    colorMarca: "#00A3E0",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },

  // MASCOTAS (3)
  {
    slug: "petco-gam",
    nombre: "Petco GAM",
    giro: "Tienda de mascotas",
    categoria: "mascotas",
    telefono: "5555558001",
    whatsapp: "5555558001",
    direccion: "Av. Insurgentes Norte 8901, Gustavo A. Madero, CDMX",
    descripcion: "Todo para tu mascota. Alimento, accesorios y servicios veterinarios.",
    colorMarca: "#001489",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "maskota-gam",
    nombre: "Maskota GAM",
    giro: "Tienda de mascotas",
    categoria: "mascotas",
    telefono: "5555558002",
    whatsapp: "5555558002",
    direccion: "Av. Montevideo 890, Gustavo A. Madero, CDMX",
    descripcion: "Alimento y accesorios para perros y gatos. Precios accesibles.",
    colorMarca: "#FF6B00",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "veterinaria-banfield-gam",
    nombre: "Banfield Pet Hospital GAM",
    giro: "Veterinaria",
    categoria: "mascotas",
    telefono: "5555558003",
    whatsapp: "5555558003",
    direccion: "Calz. Ticomán 3456, Gustavo A. Madero, CDMX",
    descripcion: "Atención veterinaria de calidad. Consultas, vacunas y cirugías.",
    colorMarca: "#00A3E0",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },

  // AUTOS (3)
  {
    slug: "nissan-gam",
    nombre: "Nissan GAM",
    giro: "Agencia automotriz",
    categoria: "autos",
    telefono: "5555559001",
    whatsapp: "5555559001",
    direccion: "Av. Insurgentes Norte 9012, Gustavo A. Madero, CDMX",
    descripcion: "Venta de autos nuevos y seminuevos. Servicio y refacciones.",
    colorMarca: "#C3002F",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "chevrolet-gam",
    nombre: "Chevrolet GAM",
    giro: "Agencia automotriz",
    categoria: "autos",
    telefono: "5555559002",
    whatsapp: "5555559002",
    direccion: "Av. 608 No. 4567, Gustavo A. Madero, CDMX",
    descripcion: "Autos nuevos con las mejores promociones. Financiamiento disponible.",
    colorMarca: "#FFC72C",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  {
    slug: "volkswagen-gam",
    nombre: "Volkswagen GAM",
    giro: "Agencia automotriz",
    categoria: "autos",
    telefono: "5555559003",
    whatsapp: "5555559003",
    direccion: "Calz. San Juan de Aragón 5678, Gustavo A. Madero, CDMX",
    descripcion: "Calidad alemana al alcance de todos. Servicio postventa certificado.",
    colorMarca: "#001E50",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },

  // EFÍMEROS PARA PRUEBAS (2)
  {
    slug: "negocio-prueba-1",
    nombre: "Negocio Prueba 1",
    giro: "Prueba",
    categoria: "comida-rapida",
    telefono: "5559999001",
    whatsapp: "5559999001",
    direccion: "Dirección de prueba 1",
    descripcion: "Este es un negocio de prueba para verificar el renderizado de landings.",
    colorMarca: "#FF0000",
    logoBase64: null,
    planSuscripcion: "estandar",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-prueba",
    esDemostracion: true,
    productos: [
      { id: "p1", nombre: "Producto 1", descripcion: "Descripción del producto 1", precio: 100 },
      { id: "p2", nombre: "Producto 2", descripcion: "Descripción del producto 2", precio: 200 }
    ],
    galeria: [
      { id: "g1", url: "https://via.placeholder.com/400x300/FF0000/FFFFFF?text=Imagen+1", descripcion: "Imagen 1" },
      { id: "g2", url: "https://via.placeholder.com/400x300/00FF00/FFFFFF?text=Imagen+2", descripcion: "Imagen 2" }
    ],
    testimonios: [
      { id: "t1", nombre: "Cliente 1", comentario: "Excelente servicio", calificacion: 5 },
      { id: "t2", nombre: "Cliente 2", comentario: "Muy recomendable", calificacion: 4 }
    ]
  },
  {
    slug: "negocio-prueba-2",
    nombre: "Negocio Prueba 2",
    giro: "Prueba",
    categoria: "servicios",
    telefono: "5559999002",
    whatsapp: "5559999002",
    direccion: "Dirección de prueba 2",
    descripcion: "Segundo negocio de prueba con plan estándar y contenido completo.",
    colorMarca: "#0000FF",
    logoBase64: null,
    planSuscripcion: "estandar",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-prueba",
    esDemostracion: true,
    productos: [
      { id: "p3", nombre: "Servicio A", descripcion: "Descripción del servicio A", precio: 500 },
      { id: "p4", nombre: "Servicio B", descripcion: "Descripción del servicio B", precio: 750 }
    ],
    galeria: [
      { id: "g3", url: "https://via.placeholder.com/400x300/0000FF/FFFFFF?text=Foto+1", descripcion: "Foto 1" },
      { id: "g4", url: "https://via.placeholder.com/400x300/FFFF00/000000?text=Foto+2", descripcion: "Foto 2" }
    ],
    testimonios: [
      { id: "t3", nombre: "Usuario 1", comentario: "Muy profesionales", calificacion: 5 },
      { id: "t4", nombre: "Usuario 2", comentario: "Buen precio", calificacion: 4 }
    ]
  }
];

async function agregarNegocios() {
  console.log("🚀 Iniciando carga de negocios GAM...\n");
  
  let exitosos = 0;
  let errores = 0;

  for (const negocio of negocios) {
    try {
      await setDoc(doc(db, "negocios", negocio.slug), negocio);
      console.log(`✅ ${negocio.nombre} (${negocio.categoria})`);
      exitosos++;
    } catch (error) {
      console.error(`❌ Error en ${negocio.nombre}:`, error);
      errores++;
    }
  }

  console.log(`\n📊 Resumen:`);
  console.log(`   ✅ Exitosos: ${exitosos}`);
  console.log(`   ❌ Errores: ${errores}`);
  console.log(`   📦 Total: ${negocios.length}`);
  console.log(`\n🎉 ¡Proceso completado!`);
}

agregarNegocios().catch(console.error);
