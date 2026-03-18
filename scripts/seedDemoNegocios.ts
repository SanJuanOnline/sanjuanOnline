/**
 * Script para insertar negocios de demostración en Firestore.
 * Marcados con esDemostracion: true para excluirlos del contador.
 *
 * Ejecutar: npx ts-node -r tsconfig-paths/register scripts/seedDemoNegocios.ts
 */

import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

const base = {
  esDemostracion: true,
  visitas: 0,
  clicksTelefono: 0,
  clicksWhatsApp: 0,
  fechaRegistro: new Date().toISOString(),
  estado: "activo",
  planSuscripcion: "estandar",
  usarLogoGenerado: true,
  logo: null,
  colorMarca: "#3B82F6",
  telefonos: ["5555555555"],
  whatsapp: null,
  messenger: null,
  direccion: "Gustavo A. Madero, CDMX",
  plan: "estandar",
  tipoLanding: "interna",
  tieneSitioWeb: false,
  urlExterna: null,
};

const negocios = [
  // ── COMIDA RÁPIDA ─────────────────────────────────────────────────────────
  {
    nombre: "McDonald's Aragón",
    giro: "hamburguesas fast food",
    descripcion: "La cadena de hamburguesas más famosa del mundo. Menú completo, desayunos y postres.",
    categoria: "comida-rapida",
    slug: "mcdonalds-aragon-demo",
    planSuscripcion: "vip",
    plan: "vip",
    tieneSitioWeb: true,
    tipoLanding: "externa",
    urlExterna: "https://www.mcdonalds.com.mx",
    colorMarca: "#FFC72C",
  },
  {
    nombre: "Domino's Pizza Lindavista",
    giro: "pizza fast food",
    descripcion: "Pizzas recién horneadas con entrega a domicilio en 30 minutos o menos.",
    categoria: "comida-rapida",
    slug: "dominos-lindavista-demo",
    planSuscripcion: "vip",
    plan: "vip",
    tieneSitioWeb: true,
    tipoLanding: "externa",
    urlExterna: "https://www.dominos.com.mx",
    colorMarca: "#006491",
  },
  {
    nombre: "Tacos El Güero",
    giro: "taqueria antojitos",
    descripcion: "Tacos de canasta, quesadillas y gorditas. El sabor de siempre en Gustavo A. Madero.",
    categoria: "comida-rapida",
    slug: "tacos-el-guero-demo",
    colorMarca: "#EF4444",
  },

  // ── RESTAURANTES ──────────────────────────────────────────────────────────
  {
    nombre: "Vips Lindavista",
    giro: "restaurante familiar",
    descripcion: "Restaurante familiar con desayunos, comidas y cenas. Ambiente cómodo y familiar.",
    categoria: "restaurantes",
    slug: "vips-lindavista-demo",
    planSuscripcion: "vip",
    plan: "vip",
    tieneSitioWeb: true,
    tipoLanding: "externa",
    urlExterna: "https://www.vips.com.mx",
    colorMarca: "#DC2626",
  },
  {
    nombre: "Sanborns Aragón",
    giro: "restaurante cafeteria",
    descripcion: "Cafetería y tienda departamental. Desayunos, comidas y la mejor selección de revistas.",
    categoria: "restaurantes",
    slug: "sanborns-aragon-demo",
    planSuscripcion: "vip",
    plan: "vip",
    tieneSitioWeb: true,
    tipoLanding: "externa",
    urlExterna: "https://www.sanborns.com.mx",
    colorMarca: "#7C3AED",
  },
  {
    nombre: "Cocina Doña Lupita",
    giro: "comida corrida restaurante",
    descripcion: "Comida casera de lunes a sábado. Menú del día con sopa, guisado y postre.",
    categoria: "restaurantes",
    slug: "cocina-dona-lupita-demo",
    colorMarca: "#F59E0B",
  },

  // ── ENTRETENIMIENTO ───────────────────────────────────────────────────────
  {
    nombre: "Cinemex Lindavista",
    giro: "cine entretenimiento",
    descripcion: "Las mejores películas en pantalla grande. Salas XL, 3D y Macro XE.",
    categoria: "entretenimiento",
    slug: "cinemex-lindavista-demo",
    planSuscripcion: "vip",
    plan: "vip",
    tieneSitioWeb: true,
    tipoLanding: "externa",
    urlExterna: "https://www.cinemex.com",
    colorMarca: "#1D4ED8",
  },
  {
    nombre: "Boliche Aragón",
    giro: "boliche juegos diversión",
    descripcion: "Boliche, billar y videojuegos. El lugar ideal para salir con familia y amigos.",
    categoria: "entretenimiento",
    slug: "boliche-aragon-demo",
    planSuscripcion: "vip",
    plan: "vip",
    tieneSitioWeb: true,
    tipoLanding: "externa",
    urlExterna: "https://www.bolichearagon.com.mx",
    colorMarca: "#7C3AED",
  },
  {
    nombre: "Bar El Rincón Norteño",
    giro: "bar musica en vivo karaoke",
    descripcion: "Bar con música en vivo los fines de semana. Karaoke, botanas y ambiente familiar.",
    categoria: "entretenimiento",
    slug: "bar-rincon-norteno-demo",
    colorMarca: "#B45309",
  },

  // ── SERVICIOS ─────────────────────────────────────────────────────────────
  {
    nombre: "Notaría 45 GAM",
    giro: "notario servicios legales",
    descripcion: "Servicios notariales: escrituras, poderes, testamentos y trámites legales.",
    categoria: "servicios",
    slug: "notaria-45-gam-demo",
    colorMarca: "#1E3A5F",
  },
  {
    nombre: "Despacho Contable Ramírez",
    giro: "contador asesor fiscal",
    descripcion: "Contabilidad, declaraciones fiscales y asesoría empresarial para PyMEs.",
    categoria: "servicios",
    slug: "despacho-ramirez-demo",
    colorMarca: "#065F46",
  },
  {
    nombre: "Fotografía Estudio Luz",
    giro: "fotografo estudio fotografico",
    descripcion: "Fotografía profesional para eventos, bodas, XV años y sesiones de producto.",
    categoria: "servicios",
    slug: "fotografia-estudio-luz-demo",
    colorMarca: "#831843",
  },

  // ── MANTENIMIENTO ─────────────────────────────────────────────────────────
  {
    nombre: "Plomería Express GAM",
    giro: "plomero reparacion instalacion",
    descripcion: "Servicio de plomería 24/7. Fugas, instalaciones y reparaciones en el día.",
    categoria: "mantenimiento",
    slug: "plomeria-express-gam-demo",
    colorMarca: "#1D4ED8",
  },
  {
    nombre: "Electricista Don Memo",
    giro: "electricista instalacion reparacion",
    descripcion: "Instalaciones eléctricas, tableros, contactos y reparaciones residenciales.",
    categoria: "mantenimiento",
    slug: "electricista-don-memo-demo",
    colorMarca: "#D97706",
  },
  {
    nombre: "Pintura y Acabados Hernández",
    giro: "pintor mantenimiento acabados",
    descripcion: "Pintura interior y exterior, impermeabilización y acabados de calidad.",
    categoria: "mantenimiento",
    slug: "pintura-hernandez-demo",
    colorMarca: "#059669",
  },

  // ── SALUD ─────────────────────────────────────────────────────────────────
  {
    nombre: "Farmacias del Ahorro Aragón",
    giro: "farmacia salud medicamentos",
    descripcion: "Medicamentos, vitaminas y consulta médica a bajo costo. Abierto las 24 horas.",
    categoria: "salud",
    slug: "farmacias-ahorro-aragon-demo",
    planSuscripcion: "vip",
    plan: "vip",
    tieneSitioWeb: true,
    tipoLanding: "externa",
    urlExterna: "https://www.fahorro.com",
    colorMarca: "#DC2626",
  },
  {
    nombre: "Consultorio Dental Sonrisa",
    giro: "dentista clinica dental salud",
    descripcion: "Limpieza, ortodoncia, blanqueamiento y urgencias dentales. Precios accesibles.",
    categoria: "salud",
    slug: "dental-sonrisa-demo",
    colorMarca: "#0EA5E9",
  },
  {
    nombre: "Spa y Masajes Serenidad",
    giro: "spa masaje terapia bienestar",
    descripcion: "Masajes relajantes, faciales y tratamientos corporales. Tu momento de paz.",
    categoria: "salud",
    slug: "spa-serenidad-demo",
    colorMarca: "#7C3AED",
  },

  // ── MASCOTAS ──────────────────────────────────────────────────────────────
  {
    nombre: "Petco Lindavista",
    giro: "pet shop alimento mascotas",
    descripcion: "Todo para tu mascota: alimento, accesorios, juguetes y servicios veterinarios.",
    categoria: "mascotas",
    slug: "petco-lindavista-demo",
    planSuscripcion: "vip",
    plan: "vip",
    tieneSitioWeb: true,
    tipoLanding: "externa",
    urlExterna: "https://www.petco.com.mx",
    colorMarca: "#2563EB",
  },
  {
    nombre: "Veterinaria Dr. Paws",
    giro: "veterinaria clinica mascotas",
    descripcion: "Consultas, vacunas, cirugías y urgencias para perros y gatos.",
    categoria: "mascotas",
    slug: "veterinaria-dr-paws-demo",
    colorMarca: "#16A34A",
  },
  {
    nombre: "Peluquería Canina Peluchín",
    giro: "peluqueria canina mascota perro gato",
    descripcion: "Baño, corte y estética para tu mascota. Servicio a domicilio disponible.",
    categoria: "mascotas",
    slug: "peluqueria-peluchin-demo",
    colorMarca: "#EC4899",
  },

  // ── HOTELES ───────────────────────────────────────────────────────────────
  {
    nombre: "Hotel Lindavista",
    giro: "hotel hospedaje habitacion",
    descripcion: "Hotel céntrico con habitaciones confortables, WiFi y estacionamiento incluido.",
    categoria: "hoteles",
    slug: "hotel-lindavista-demo",
    colorMarca: "#1E40AF",
  },
  {
    nombre: "Fiesta Inn Insurgentes Norte",
    giro: "hotel hospedaje alojamiento",
    descripcion: "Hotel de negocios con todas las comodidades. Salones de eventos y restaurante.",
    categoria: "hoteles",
    slug: "fiesta-inn-norte-demo",
    planSuscripcion: "vip",
    plan: "vip",
    tieneSitioWeb: true,
    tipoLanding: "externa",
    urlExterna: "https://www.fiestainn.com",
    colorMarca: "#B91C1C",
  },
  {
    nombre: "Hostal Casa Aragón",
    giro: "hostal hospedaje cabana alojamiento",
    descripcion: "Hospedaje económico y cómodo. Habitaciones individuales y dobles con desayuno.",
    categoria: "hoteles",
    slug: "hostal-casa-aragon-demo",
    colorMarca: "#92400E",
  },

  // ── AUTOS ─────────────────────────────────────────────────────────────────
  {
    nombre: "Taller Mecánico El Pistón",
    giro: "taller mecanico reparacion auto",
    descripcion: "Servicio mecánico general, frenos, suspensión y afinaciones. Presupuesto sin costo.",
    categoria: "autos",
    slug: "taller-el-piston-demo",
    colorMarca: "#374151",
  },
  {
    nombre: "Autozone Lindavista",
    giro: "refacciones auto carro vehiculo",
    descripcion: "Refacciones, accesorios y lubricantes para todo tipo de vehículos.",
    categoria: "autos",
    slug: "autozone-lindavista-demo",
    planSuscripcion: "vip",
    plan: "vip",
    tieneSitioWeb: true,
    tipoLanding: "externa",
    urlExterna: "https://www.autozone.com.mx",
    colorMarca: "#DC2626",
  },
  {
    nombre: "Lavado Express Aragón",
    giro: "lavado auto carro vehiculo",
    descripcion: "Lavado de autos interior y exterior. Encerado, aspirado y aromatizado.",
    categoria: "autos",
    slug: "lavado-express-aragon-demo",
    colorMarca: "#0284C7",
  },
];

async function seed() {
  console.log(`Insertando ${negocios.length} negocios de demostración...`);
  for (const negocio of negocios) {
    const doc = {
      ...base,
      ...negocio,
      // Asegurar que los campos de franquicia no se sobreescriban con base
      tieneSitioWeb: negocio.tieneSitioWeb ?? false,
      tipoLanding: negocio.tipoLanding ?? "interna",
      urlExterna: negocio.urlExterna ?? null,
      planSuscripcion: negocio.planSuscripcion ?? "estandar",
      plan: negocio.plan ?? "estandar",
    };
    const ref = await addDoc(collection(db, "negocios"), doc);
    console.log(`✓ ${negocio.nombre} → ${ref.id}`);
  }
  console.log("¡Seed completado!");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
