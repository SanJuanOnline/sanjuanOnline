# Flujo de Operaciones — San Juan Online

---

## 🧭 VISIÓN GENERAL DEL PRODUCTO

San Juan Online es un **directorio digital freemium** para negocios locales de las secciones 1-7 y alrededores (incluye Conilas).

**Modelo de negocio:**
- Registro gratuito con plan Básico → bajo fricción, muchos negocios entran
- Una vez registrados, se les vende mejoras a su landing (plan Estándar o VIP)
- El directorio crece solo, la monetización viene del upgrade

---

## 👤 FLUJO DEL USUARIO (Cliente que busca negocios)

```
1. Entra al sitio (URL raíz)
   └── Spinner de carga (solo en primera visita o recarga)
       └── Home.tsx
           ├── Hero Banner (sanjuan.jpg + slogan)
           ├── Grid de categorías (8 categorías)
           └── Sección Misión / Estadísticas

2. Selecciona una categoría
   └── /[categoria] (ej: /comida-rapida)
       └── PaginaCategoria.tsx
           ├── Lee negocios de Firestore por categoría
           ├── Ordena: VIP → Estándar → Básico
           └── Grid de TarjetaNegocio.tsx

3. Selecciona un negocio
   ├── [EXTERNO] → abre URL externa en nueva pestaña
   └── [LANDING] → /[categoria]/[slug]
       └── LandingNegocio.tsx
           ├── Lee datos del negocio desde Firestore
           ├── Plan Básico: Banner + Información + Contacto (resto con overlay oscuro)
           ├── Plan Estándar: + Productos + Galería
           └── Plan VIP: todas las secciones desbloqueadas
```

---

## 🏪 FLUJO DEL DUEÑO DE NEGOCIO (Registro y gestión)

```
1. Llega al sitio y ve el botón "Registrarse" en el Header

2. /registro — Paso 0: Crear cuenta
   └── Email + Contraseña → Firebase Auth
       └── Continúa al formulario del negocio

3. /registro — Pasos 1-6: Datos del negocio
   ├── Paso 1: Nombre → genera slug en tiempo real (preview de URL)
   ├── Paso 2: Giro → detecta categoría automáticamente
   ├── Paso 3: Color de marca → paleta + preview con iniciales
   ├── Paso 4: Teléfonos (hasta 3) + WhatsApp + Messenger
   ├── Paso 5: Dirección
   └── Paso 6: Descripción (150 caracteres)

4. Al enviar:
   ├── Negocio guardado en Firestore con:
   │   ├── uid del usuario (vinculado a su cuenta)
   │   ├── planSuscripcion: "basico"
   │   └── slug único generado automáticamente
   └── Aparece automáticamente en su categoría (TarjetaNegocio variante Básica)

5. El dueño inicia sesión → /cuenta (Dashboard)
   ├── Ve los datos de su negocio
   ├── Puede editar información básica
   ├── Puede escalar su plan (Estándar / VIP)
   └── Puede cerrar sesión
```

---

## 🔐 FLUJO DE AUTENTICACIÓN

```
Header (sin sesión):
├── Botón "Registrarse" → /registro
└── Botón "Iniciar Sesión" → ModalLogin
    ├── Email + Contraseña → Firebase Auth
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
│   │   ├── telefono, whatsapp, direccion, descripcion
│   │   └── colorMarca
│   └── Leído por:
│       ├── PaginaCategoria → filtra por categoría
│       ├── LandingNegocio → busca por slug
│       ├── /cuenta → busca por uid del usuario
│       └── Panel Admin → todos los negocios

Firebase Auth
└── Usuario autenticado
    ├── uid (vinculado al negocio en Firestore)
    ├── email
    └── Sesión persistente
```

---

## 📱 PLANES Y LO QUE OFRECEN

| Plan | Precio | Tarjeta en directorio | Landing |
|------|--------|----------------------|---------|
| **Básico** | Gratis | Variante pequeña (gris) | Banner + Info + Contacto (resto con overlay oscuro) |
| **Estándar** | Por definir | Variante media (azul) | + Productos + Galería |
| **VIP** | Por definir | Variante grande (dorado) | Todas las secciones + posición destacada |

---

## 🏗️ ESTRUCTURA DE RUTAS

```
/                          → Home
/[categoria]               → Lista de negocios (ej: /comida-rapida)
/[categoria]/[slug]        → Landing del negocio (ej: /comida-rapida/tacos-el-gordo)
/registro                  → Registro de cuenta + negocio
/cuenta                    → Dashboard del dueño (requiere sesión)
/ajustes                   → Modo oscuro, descarga app, versión
/admin                     → Panel de administración (protegido)
```

---

## 🔧 ESTRUCTURA TÉCNICA DE COMPONENTES

```
app/
  layout.tsx               → AuthProvider + TemaProvider
  page.tsx                 → Home
  [categoria]/
    page.tsx               → PaginaCategoria (lee Firestore)
    [slug]/
      layout.tsx           → Layout aislado (sin Header/Footer global)
      page.tsx             → LandingNegocio (lee Firestore)
  registro/page.tsx        → Paso 0 (Auth) + Formulario negocio
  cuenta/page.tsx          → Dashboard del dueño
  admin/page.tsx           → Panel admin

componentes/
  Header.tsx               → Botones Login/Registro condicionales
  Footer.tsx
  Spinner.tsx
  TarjetaNegocio.tsx       → 3 variantes: VIP, Estándar, Básico
  PaginaCategoria.tsx      → Genérico para todas las categorías
  LandingNegocio.tsx       → Landing con overlay según plan
  FormularioRegistro.tsx   → 6 pasos + Paso 0 (Auth)
  ModalLogin.tsx           → Modal de inicio de sesión

context/
  TemaContext.tsx          → Modo oscuro
  AuthContext.tsx          → Estado de autenticación global

database/
  serviciosFirestore.ts    → Todas las funciones de lectura/escritura
  tiposRegistro.ts         → Interfaces TypeScript
  negociosRegistrados.ts   → agregarNegocio() → Firestore

lib/
  firebase.ts              → Inicialización Firebase
```

---

*Última actualización: 14 Marzo 2026*
