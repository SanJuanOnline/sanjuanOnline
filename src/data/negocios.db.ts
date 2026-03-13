import {  Negocio } from "./tipos.db";

export const NEGOCIOS: Negocio[] = [

  {
    id: "cr-001",
    slug: "mcdonalds-aragon",
    nombre: "McDonald's Aragón",
    logo: "/logos/mcdonalds.png",
    slogan: "Me encanta",
    categoria: "comida-rapida",
    destacado: false,
    tipoEnlace: "externo",
    urlExterna: "https://www.mcdonalds.com.mx"
  },

  {
    id: "cr-002",
    slug: "kfc-aragon",
    nombre: "KFC Aragón",
    logo: "/logos/kfc.png",
    slogan: "Para chuparse los dedos",
    categoria: "comida-rapida",
    destacado: false,
    tipoEnlace: "externo",
    urlExterna: "https://www.kfc.com.mx"
  },

  {
    id: "cr-003",
    slug: "starbucks-aragon",
    nombre: "Starbucks Aragón",
    logo: "/logos/starbucks.png",
    slogan: "Inspirando el espíritu humano",
    categoria: "comida-rapida",
    destacado: true,
    tipoEnlace: "landing",

    landing: {

      estilo: {
        colorPrimario: "#00704A",
        colorSecundario: "#CBA258",
        fondo: "#ffffff",
        tipografia: "Poppins"
      },

      secciones: [
        "banner",
        "informacion",
        "productos",
        "galeria",
        "testimonios",
        "contacto"
      ],

      banner: {
        portada: "/portadas/starbucks.jpg",
        slogan: "Tu café favorito en Aragón"
      },

      informacion: {
        descripcion:
          "Disfruta café premium, bebidas frías, postres y un ambiente perfecto para trabajar o relajarte."
      },

      productos: [
        {
          nombre: "Frappuccino",
          descripcion: "Bebida fría con café y crema",
          precio: "$85",
          imagen: "/productos/frappuccino.jpg"
        },
        {
          nombre: "Latte",
          descripcion: "Café con leche espumosa",
          precio: "$65",
          imagen: "/productos/latte.jpg"
        }
      ],

      galeria: [
        "/galeria/starbucks1.jpg",
        "/galeria/starbucks2.jpg",
        "/galeria/starbucks3.jpg"
      ],

      testimonios: [
        {
          nombre: "Carlos",
          comentario: "Excelente lugar para trabajar.",
          calificacion: 5
        },
        {
          nombre: "Ana",
          comentario: "El frappuccino es delicioso.",
          calificacion: 5
        }
      ],

      contacto: {
        direccion: {
          calle: "Av 412",
          numero: "215",
          colonia: "San Juan de Aragón",
          alcaldia: "Gustavo A Madero",
          cp: "07979",
          mapa: "https://maps.google.com"
        },

        horarios: {
          lunes: { abre: "07:00", cierra: "22:00" },
          martes: { abre: "07:00", cierra: "22:00" },
          viernes: { abre: "07:00", cierra: "23:00" }
        },

        contacto: {
          telefonos: ["5587654321"],
          whatsapp: "5587654321",
          web: "https://www.starbucks.com.mx"
        },

        redes: {
          facebook: "https://facebook.com/starbucks",
          instagram: "https://instagram.com/starbucks"
        }
      }
    }
  },

  {
    id: "cr-004",
    slug: "tacos-don-pepe",
    nombre: "Tacos Don Pepe",
    logo: "/logos/tacos.png",
    slogan: "Los mejores tacos de Aragón",
    categoria: "comida-rapida",
    destacado: false,
    tipoEnlace: "landing",

    landing: {
      estilo: {
        colorPrimario: "#C62828",
        colorSecundario: "#FFB300",
        fondo: "#fff8e1",
        tipografia: "Montserrat"
      },

      secciones: [
        "banner",
        "informacion",
        "galeria",
        "contacto"
      ],

      banner: {
        portada: "/portadas/tacos.jpg",
        slogan: "Tacos auténticos mexicanos"
      },

      informacion: {
        descripcion:
          "Tacos al pastor, suadero y campechanos preparados al momento con tortillas recién hechas."
      },

      galeria: [
        "/galeria/tacos1.jpg",
        "/galeria/tacos2.jpg"
      ],

      contacto: {
        direccion: {
          calle: "Av Central",
          numero: "120",
          colonia: "Aragón",
          alcaldia: "GAM",
          cp: "07979"
        },

        horarios: {
          lunes: { abre: "18:00", cierra: "02:00" }
        },

        contacto: {
          telefonos: ["5611001627"],
          whatsapp: "5611001627"
        },

        redes: {}
      }
    }
  },

  {
    id: "cr-005",
    slug: "burger-express",
    nombre: "Burger Express",
    logo: "/logos/burger.png",
    slogan: "Hamburguesas gigantes",
    categoria: "comida-rapida",
    destacado: false,
    tipoEnlace: "landing",

    landing: {
      estilo: {
        colorPrimario: "#212121",
        colorSecundario: "#FF5722",
        fondo: "#fafafa",
        tipografia: "Roboto"
      },

      secciones: [
        "banner",
        "productos",
        "contacto"
      ],

      banner: {
        portada: "/portadas/burger.jpg",
        slogan: "Hamburguesas artesanales"
      },

      productos: [
        {
          nombre: "Burger Doble",
          descripcion: "Carne doble con queso",
          precio: "$120",
          imagen: "/productos/burger.jpg"
        }
      ],

      contacto: {
        direccion: {
          calle: "Av 604",
          numero: "88",
          colonia: "Aragón",
          alcaldia: "GAM",
          cp: "07979"
        },

        horarios: {
          viernes: { abre: "17:00", cierra: "01:00" }
        },

        contacto: {
          telefonos: ["5611001627"]
        },

        redes: {}
      }
    }
  }

];