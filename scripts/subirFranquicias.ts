/**
 * Script para agregar franquicias conocidas como relleno
 * Plan: Básico (solo tarjeta visible, sin landing)
 * Tipo: Enlace externo a su sitio web oficial
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import * as dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config({ path: ".env.local" });

// Configurar Firebase
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

interface Franquicia {
  nombre: string;
  descripcion: string;
  categoria: string;
  imagen: string;
  urlExterna: string;
}

const franquicias: Franquicia[] = [
  // COMIDA RÁPIDA
  {
    nombre: "McDonald's",
    descripcion: "Hamburguesas, papas fritas y comida rápida",
    categoria: "comida-rapida",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
    urlExterna: "https://www.mcdonalds.com.mx"
  },
  {
    nombre: "Burger King",
    descripcion: "Hamburguesas a la parrilla",
    categoria: "comida-rapida",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Burger_King_logo_%281999%29.svg/1200px-Burger_King_logo_%281999%29.svg.png",
    urlExterna: "https://www.burgerking.com.mx"
  },
  {
    nombre: "KFC",
    descripcion: "Pollo frito estilo Kentucky",
    categoria: "comida-rapida",
    imagen: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png",
    urlExterna: "https://www.kfc.com.mx"
  },
  {
    nombre: "Subway",
    descripcion: "Sándwiches y ensaladas frescas",
    categoria: "comida-rapida",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Subway_2016_logo.svg/1200px-Subway_2016_logo.svg.png",
    urlExterna: "https://www.subway.com"
  },
  {
    nombre: "Domino's Pizza",
    descripcion: "Pizza a domicilio",
    categoria: "comida-rapida",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dominos_pizza_logo.svg/1200px-Dominos_pizza_logo.svg.png",
    urlExterna: "https://www.dominos.com.mx"
  },
  {
    nombre: "Little Caesars",
    descripcion: "Pizza lista para llevar",
    categoria: "comida-rapida",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Little_Caesars_logo.svg/1200px-Little_Caesars_logo.svg.png",
    urlExterna: "https://www.littlecaesars.com.mx"
  },

  // RESTAURANTES
  {
    nombre: "Chili's",
    descripcion: "Restaurante casual americano",
    categoria: "restaurantes",
    imagen: "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Chili%27s_logo.svg/1200px-Chili%27s_logo.svg.png",
    urlExterna: "https://www.chilis.com.mx"
  },
  {
    nombre: "Applebee's",
    descripcion: "Comida americana casual",
    categoria: "restaurantes",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Applebee%27s_logo.svg/1200px-Applebee%27s_logo.svg.png",
    urlExterna: "https://www.applebees.com.mx"
  },
  {
    nombre: "Vips",
    descripcion: "Restaurante familiar mexicano",
    categoria: "restaurantes",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Vips_logo.svg/1200px-Vips_logo.svg.png",
    urlExterna: "https://www.vips.com.mx"
  },
  {
    nombre: "Sanborns",
    descripcion: "Restaurante y tienda departamental",
    categoria: "restaurantes",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Sanborns_logo.svg/1200px-Sanborns_logo.svg.png",
    urlExterna: "https://www.sanborns.com.mx"
  },

  // ENTRETENIMIENTO
  {
    nombre: "Cinépolis",
    descripcion: "Cine y entretenimiento",
    categoria: "entretenimiento",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Cinepolis_logo.svg/1200px-Cinepolis_logo.svg.png",
    urlExterna: "https://www.cinepolis.com"
  },
  {
    nombre: "Cinemex",
    descripcion: "Complejos de cine",
    categoria: "entretenimiento",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Cinemex_logo.svg/1200px-Cinemex_logo.svg.png",
    urlExterna: "https://www.cinemex.com"
  },

  // SERVICIOS
  {
    nombre: "Starbucks",
    descripcion: "Café y bebidas especiales",
    categoria: "servicios",
    imagen: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png",
    urlExterna: "https://www.starbucks.com.mx"
  },
  {
    nombre: "7-Eleven",
    descripcion: "Tienda de conveniencia 24/7",
    categoria: "servicios",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/7-eleven_logo.svg/1200px-7-eleven_logo.svg.png",
    urlExterna: "https://www.7-eleven.com.mx"
  },
  {
    nombre: "Oxxo",
    descripcion: "Tienda de conveniencia",
    categoria: "servicios",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Oxxo_Logo.svg/1200px-Oxxo_Logo.svg.png",
    urlExterna: "https://www.oxxo.com"
  },

  // SALUD
  {
    nombre: "Farmacias del Ahorro",
    descripcion: "Farmacia y consultorios",
    categoria: "salud",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Farmacias_del_Ahorro_logo.svg/1200px-Farmacias_del_Ahorro_logo.svg.png",
    urlExterna: "https://www.fahorro.com"
  },
  {
    nombre: "Farmacias Guadalajara",
    descripcion: "Farmacia 24 horas",
    categoria: "salud",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Farmacias_Guadalajara_logo.svg/1200px-Farmacias_Guadalajara_logo.svg.png",
    urlExterna: "https://www.farmaciasguadalajara.com"
  },

  // MASCOTAS
  {
    nombre: "Petco",
    descripcion: "Tienda de mascotas y veterinaria",
    categoria: "mascotas",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Petco_logo.svg/1200px-Petco_logo.svg.png",
    urlExterna: "https://www.petco.com.mx"
  },

  // HOTELES
  {
    nombre: "City Express",
    descripcion: "Hoteles de negocios",
    categoria: "hoteles",
    imagen: "https://www.cityexpress.com/themes/custom/city/logo.svg",
    urlExterna: "https://www.cityexpress.com"
  },

  // AUTOS
  {
    nombre: "AutoZone",
    descripcion: "Refacciones y accesorios automotrices",
    categoria: "autos",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/AutoZone_logo.svg/1200px-AutoZone_logo.svg.png",
    urlExterna: "https://www.autozone.com.mx"
  },
];

async function subirFranquicias() {
  console.log("🚀 Iniciando carga de franquicias...\n");

  let exitosos = 0;
  let errores = 0;

  for (const franquicia of franquicias) {
    try {
      const slug = franquicia.nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const negocio = {
        id: slug,
        nombre: franquicia.nombre,
        descripcion: franquicia.descripcion,
        categoria: franquicia.categoria,
        slug: slug,
        imagen: franquicia.imagen,
        planSuscripcion: "basico",
        tipoEnlace: "externo",
        urlExterna: franquicia.urlExterna,
        estado: "activo",
        esDemostracion: true, // Marcar como demo para filtrar después
        fechaRegistro: new Date().toISOString(),
      };

      await setDoc(doc(db, "negocios", slug), negocio);
      console.log(`✅ ${franquicia.nombre} agregado`);
      exitosos++;
    } catch (error) {
      console.error(`❌ Error con ${franquicia.nombre}:`, error);
      errores++;
    }
  }

  console.log(`\n📊 Resumen:`);
  console.log(`   ✅ Exitosos: ${exitosos}`);
  console.log(`   ❌ Errores: ${errores}`);
  console.log(`   📦 Total: ${franquicias.length}`);
}

// Ejecutar
subirFranquicias()
  .then(() => {
    console.log("\n✨ Proceso completado");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Error fatal:", error);
    process.exit(1);
  });
