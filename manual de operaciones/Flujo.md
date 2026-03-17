# Flujo de Operaciones — San Juan Online

**Última actualización:** 16 Marzo 2026, 23:54

---

## 🧭 VISIÓN GENERAL DEL PRODUCTO

San Juan Online es un **directorio digital freemium** para negocios locales de las secciones 1-7 y alrededores (incluye Conilas).

**Modelo de negocio:**
- Registro gratuito con plan Básico → bajo fricción, muchos negocios entran
- Una vez registrados, se les vende mejoras a su landing (plan Estándar o VIP)
- El directorio crece solo, la monetización viene del upgrade

**Estado actual:** ✅ Sistema autogestionable 100% funcional

---

## 👤 FLUJO DEL USUARIO (Cliente que busca negocios)

```
1. Entra al sitio (URL raíz)
   └── Spinner de carga (solo en primera visita o recarga)
       └── Home.tsx
           ├── Hero Banner (sanjuan.jpg + slogan)
           ├── Grid de categorías (8 categorías)
           ├── Contador dinámico de lugares disponibles (100 - registrados)
           └── Sección Misión / Estadísticas

2. Selecciona una categoría
   └── /[categoria] (ej: /comida-rapida)
       └── PaginaCategoria.tsx
           ├── Lee negocios de Firestore por categoría
           ├── Ordena: VIP → Estándar → Básico
           └── Grid de TarjetaNegocio.tsx

3. Selecciona un negocio
   ├── [EXTERNO] → abre URL externa en nueva pestaña (si tiene urlExterna)
   └── [LANDING] → /[categoria]/[slug]
       └── LandingNegocio.tsx
           ├── Lee datos del negocio desde Firestore
           ├── Plan Básico: Banner + Información + Contacto (resto con overlay oscuro)
           ├── Plan Estándar: + Productos (del editor) + Galería (del editor) + Testimonios (del editor)
           └── Plan VIP: todas las secciones desbloqueadas
```

---

## 🏪 FLUJO DEL DUEÑO DE NEGOCIO (Registro y gestión)

```
1. Llega al sitio y ve el botón "Registrarse" en el Header

2. /registro — Paso 0: Crear cuenta
   └── Email + Contraseña → Firebase Auth
       └── Continúa al formulario del negocio

3. /registro — Pasos 1-8: Datos del negocio
   ├── Paso 1: Nombre → genera slug en tiempo real (preview de URL)
   ├── Paso 2: Giro → detecta categoría automáticamente
   ├── Paso 3: Logo → subir o usar generado con iniciales
   ├── Paso 4: Color de marca → paleta + preview con iniciales
   ├── Paso 5: Teléfonos (hasta 3) + WhatsApp + Messenger
   ├── Paso 6: Dirección
   ├── Paso 7: Descripción (150 caracteres)
   └── Paso 8: ¿Ya tienes sitio web?
       ├── Sí → Input URL → Solo aparece en directorio (sin landing interna)
       └── No → Genera landing con overlay bloqueado

4. Al enviar:
   ├── Negocio guardado en Firestore con:
   │   ├── uid del usuario (vinculado a su cuenta)
   │   ├── planSuscripcion: "basico"
   │   ├── tipoLanding: "externa" | "interna"
   │   └── slug único generado automáticamente
   └── Aparece automáticamente en su categoría (TarjetaNegocio variante Básica)

5. El dueño inicia sesión → /cuenta (Dashboard)
   
   ┌─────────────────────────────────────────────────────────────┐
   │ SI TIENE URL EXTERNA:                                       │
   │ ├── Ve su URL actual                                        │
   │ ├── Botón "Cambiar URL"                                     │
   │ └── Botón "Quiero crear mi landing aquí"                    │
   └─────────────────────────────────────────────────────────────┘
   
   ┌─────────────────────────────────────────────────────────────┐
   │ SI TIENE LANDING INTERNA + PLAN BÁSICO:                    │
   │ ├── Ve su landing con overlay bloqueado                     │
   │ └── 2 opciones:                                             │
   │     ├── A) 🚀 Desbloquear Editor ($300/año)                │
   │     │   └── Paga → Plan Estándar                           │
   │     │       └── Acceso a 3 editores:                        │
   │     │           ├── ✏️ Productos (CRUD completo)           │
   │     │           ├── 🖼️ Galería (hasta 12 imágenes)        │
   │     │           └── 💬 Testimonios (hasta 10)              │
   │     │       └── Al guardar → Firestore actualizado         │
   │     │       └── Landing renderiza datos reales             │
   │     │       └── Overlay desaparece                         │
   │     │                                                        │
   │     └── B) ✨ Necesito un sitio personalizado              │
   │         └── Formulario de solicitud                         │
   │             └── Guarda en Firestore                         │
   │                 └── Admin ve en panel /admin               │
   └─────────────────────────────────────────────────────────────┘
   
   ┌─────────────────────────────────────────────────────────────┐
   │ SI TIENE PLAN ESTÁNDAR O VIP:                              │
   │ ├── Ve dashboard con 3 botones de editores                 │
   │ ├── Puede editar sin límite durante el año                 │
   │ └── Su landing muestra contenido real                      │
   └─────────────────────────────────────────────────────────────┘
```

---

## 🔐 FLUJO DE AUTENTICACIÓN

```
Header (sin sesión):
├── Botón "Registrarse" → /registro
└── Botón "Iniciar Sesión" → ModalAuth
    ├── Email + Contraseña → Firebase Auth
    ├── Google Sign-In → Firebase Auth
    └── Si éxito → icono User activo → /cuenta

Header (con sesión):
└── Icono User → /cuenta (Dashboard del dueño)
```

---

## 🗂️ FLUJO DE DATOS

```
Firestore (base de datos)
├── Colección: negocios
│   ├── Documento por slug (ID = slug del negocio)
│   ├── Campos clave:
│   │   ├── uid (vinculado al usuario dueño)
│   │   ├── nombre, slug, categoria
│   │   ├── planSuscripcion: "basico" | "estandar" | "vip"
│   │   ├── tipoLanding: "externa" | "interna"
│   │   ├── urlExterna (si tiene sitio propio)
│   │   ├── telefono, whatsapp, direccion, descripcion
│   │   ├── colorMarca, logoBase64
│   │   ├── productos[] (del editor)
│   │   ├── galeria[] (del editor)
│   │   ├── testimonios[] (del editor)
│   │   └── fechaUpgrade, fechaExpiracion
│   └── Leído por:
│       ├── PaginaCategoria → filtra por categoría
│       ├── LandingNegocio → busca por slug
│       ├── /cuenta → busca por uid del usuario
│       └── Panel Admin → todos los negocios
│
└── Colección: solicitudesPersonalizadas
    ├── Documento por solicitud
    ├── Campos:
    │   ├── negocioSlug, nombreNegocio, uid
    │   ├── descripcion, referenciaSitios, presupuesto, contacto
    │   ├── estado: "pendiente" | "en_proceso" | "completada"
    │   └── fechaSolicitud
    └── Leído por:
        └── Panel Admin → módulo Solicitudes

Firebase Auth
└── Usuario autenticado
    ├── uid (vinculado al negocio en Firestore)
    ├── email
    └── Sesión persistente
```

---

## 📱 PLANES Y LO QUE OFRECEN

| Plan | Precio | Tarjeta en directorio | Landing | Editores |
|------|--------|----------------------|---------|----------|
| **Básico** | Gratis | Variante pequeña (gris) | Banner + Info + Contacto (resto con overlay oscuro) | ❌ No |
| **Estándar** | $300/año | Variante media (azul) | + Productos + Galería + Testimonios (datos reales del editor) | ✅ Sí (3 editores) |
| **VIP** | Por definir | Variante grande (dorado) | Todas las secciones + posición destacada | ✅ Sí + extras |

---

## 🏗️ ESTRUCTURA DE RUTAS

```
/                          → Home (con contador dinámico)
/[categoria]               → Lista de negocios (ej: /comida-rapida)
/[categoria]/[slug]        → Landing del negocio (ej: /comida-rapida/tacos-el-gordo)
/registro                  → Registro de cuenta + negocio (8 pasos)
/cuenta                    → Dashboard del dueño (requiere sesión)
                             ├── Si plan básico: opciones de upgrade
                             └── Si plan estándar: acceso a editores
/ajustes                   → Modo oscuro, descarga app, versión
/admin                     → Panel de administración (protegido)
                             ├── Módulo Negocios (directorio + nuevos registros)
                             └── Módulo Solicitudes (personalizadas)
```

---

## 🔧 ESTRUCTURA TÉCNICA DE COMPONENTES

```
app/
  layout.tsx               → AuthProvider + TemaProvider
  page.tsx                 → Home (con contador dinámico desde Firestore)
  [categoria]/
    page.tsx               → PaginaCategoria (lee Firestore)
    [slug]/
      layout.tsx           → Layout aislado (sin Header/Footer global)
      page.tsx             → LandingNegocio (lee Firestore + renderiza datos de editores)
  registro/page.tsx        → Paso 0 (Auth) + Formulario negocio (8 pasos)
  cuenta/page.tsx          → Dashboard del dueño + navegación a editores
  admin/page.tsx           → Panel admin (Negocios + Solicitudes)

componentes/
  Header.tsx               → Botones Login/Registro condicionales
  Footer.tsx
  Spinner.tsx              → Con contador dinámico
  TarjetaNegocio.tsx       → 3 variantes + manejo de URLs externas
  PaginaCategoria.tsx      → Genérico para todas las categorías
  LandingNegocio.tsx       → Landing con overlay + renderizado de editores
  OverlayPlanBasico.tsx    → Overlay con candado para secciones bloqueadas
  FormularioRegistro.tsx   → 8 pasos + validaciones + SweetAlert2
  ModalAuth.tsx            → Email/contraseña + Google Sign-In
  ModalPago.tsx            → Simulación de pago ($300/año)
  FormularioSolicitudPersonalizada.tsx → Solicitud de landing personalizada
  editores/                → CARPETA DE EDITORES
    EditorProductos.tsx    → CRUD de productos
    EditorGaleria.tsx      → Hasta 12 imágenes
    EditorTestimonios.tsx  → Hasta 10 testimonios

context/
  TemaContext.tsx          → Modo oscuro
  AuthContext.tsx          → Estado de autenticación global

database/
  serviciosFirestore.ts    → Todas las funciones de lectura/escritura
                             ├── CRUD de negocios
                             ├── CRUD de productos/galería/testimonios
                             └── CRUD de solicitudes personalizadas
  tiposNegocios.ts         → Interfaces TypeScript (con tipos de editores)
  tiposRegistro.ts         → Interfaces de registro
  negociosRegistrados.ts   → agregarNegocio() → Firestore

lib/
  firebase.ts              → Inicialización Firebase
```

---

## 🎯 PRÓXIMOS PASOS (MÓDULO 8)

### Mejoras pendientes:
1. **PersonalizadorVisual** - Colores, tipografía, imágenes de secciones
2. **Firebase Storage** - Subir imágenes reales (reemplazar URLs y base64)
3. **Pasarela de pago real** - Stripe/PayPal/Mercado Pago
4. **Notificaciones** - Email al admin cuando hay nueva solicitud
5. **Analytics** - Tracking de visitas, clics, conversiones

---

*Última actualización: 16 Marzo 2026, 23:54*
