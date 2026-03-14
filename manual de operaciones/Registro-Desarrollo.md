# Registro de Desarrollo - San Juan Online

## 📅 Sesión: 13 Marzo 2026

---

## ✅ COMPLETADO

### FASE 1: Spinner de Carga ✅
- ✅ Componente `Spinner.tsx` con barra de progreso (0-100%)
- ✅ Logo de San Juan (`logosanjuan.png`)
- ✅ Slogan: "Directorio digital para negocios pequeños listos para entrar al mundo digital"
- ✅ Gradiente azul con barra amarilla
- ✅ Responsive: imagen 100% en móvil, proporcional en desktop
- ✅ Solo aparece en Home (primera carga o recarga)
- ✅ Usa `sessionStorage` para controlar visualización

### FASE 2: Layout Global, Header y Footer ✅

#### Header ✅
- ✅ Fondo slate-900 (igual que Footer)
- ✅ Logo icon-192x192.png
- ✅ Nombre "San Juan Online" en amber-400
- ✅ Categorías en segunda fila (desktop) centradas
- ✅ Menú hamburguesa responsive (mobile)
- ✅ Iconos: Buscar, Notificaciones (campanita con punto), Cuenta, Ajustes
- ✅ 8 Categorías: Comida Rápida, Restaurantes, Entretenimiento, Mantenimiento, Salud, Mascotas, Hoteles, Servicios

#### Footer ✅
- ✅ Fondo slate-900
- ✅ Información del proyecto
- ✅ Enlaces rápidos
- ✅ Redes sociales: Facebook, Instagram, X, YouTube, Threads
- ✅ Copyright y créditos a Enrique Vargas

#### Layout ✅
- ✅ `LayoutDirectorio.tsx` con Header + Footer
- ✅ Soporte para modo oscuro

### Sistema de Rutas ✅
```
/app
  /comida-rapida
    - page.tsx (lista)
    - [slug]/page.tsx (negocio individual)
  /restaurantes
    - page.tsx
    - [slug]/page.tsx
  /entretenimiento
    - page.tsx
    - [slug]/page.tsx
  /mantenimiento
    - page.tsx
    - [slug]/page.tsx
  /salud
    - page.tsx
    - [slug]/page.tsx
  /mascotas
    - page.tsx
    - [slug]/page.tsx
  /hoteles
    - page.tsx
    - [slug]/page.tsx
  /cuenta
    - page.tsx (con Header/Footer)
  /ajustes
    - page.tsx (con Header/Footer)
```

### Modo Oscuro ✅
- ✅ `TemaContext.tsx` funcional
- ✅ Toggle en `/ajustes`
- ✅ Guarda en localStorage
- ✅ Aplica clase `dark` al `<html>`
- ✅ Funciona en toda la app

### Páginas Creadas ✅
- ✅ Todas las categorías con mensaje: "Hola, soy la página de [Categoría]"
- ✅ Todas incluyen Header + Footer
- ✅ Cuenta: Perfil de usuario (en construcción)
- ✅ Ajustes: Modo oscuro + Descarga app + Versión

### Estructura Limpia ✅
- ✅ Eliminada carpeta `src/`
- ✅ Todo en raíz: `/componentes`, `/paginas`, `/layouts`, `/context`, `/data`
- ✅ Tailwind configurado correctamente
- ✅ Build exitoso

---

## 🚧 PENDIENTE (CONTINUAR AQUÍ)

### FASE 3: Página Principal (Home.tsx) 🔄
- [ ] Hero Banner con imagen sanjuan.jpg
- [ ] Grid de categorías con iconos
- [ ] Sección "Nuestra Misión"
- [ ] Sección de estadísticas (100+ negocios, 8 categorías, 24/7)
- [ ] Carta de presentación
- [ ] Enfoque: "Ayudar a comercios a tener un lugar en internet"

### FASE 4: Estructura de Rutas Dinámicas (SLUGs) ✅ (Ya creadas)
- ✅ Carpetas [slug] creadas
- [ ] Pendiente: Conectar con base de datos

### FASE 5: Componente LandingNegocio
- [ ] `LandingClientes.tsx` (recibe datos del negocio)
- [ ] `HeaderLanding.tsx` (navegación interna)
- [ ] `FooterLanding.tsx` (datos del negocio)
- [ ] `BotonesContacto.tsx` (flotantes: WhatsApp, Teléfono, Maps)
- [ ] Sub-componentes de secciones:
  - [ ] `SeccionBanner.tsx`
  - [ ] `SeccionInformacion.tsx`
  - [ ] `SeccionProductos.tsx`
  - [ ] `SeccionGaleria.tsx`
  - [ ] `SeccionTestimonios.tsx`
  - [ ] `SeccionContacto.tsx`

### FASE 6: TarjetaNegocios.tsx y Categorías
- [ ] Componente `TarjetaNegocio.tsx`
- [ ] 3 variantes: VIP (grande), Estándar (medio), Básico (pequeño)
- [ ] Grid responsive: `grid-cols-1 md:grid-cols-4 lg:grid-cols-6`
- [ ] Conexión con base de datos
- [ ] Componente `CategoriaGenerica.tsx` (filtra y muestra negocios)

### FASE 7: Modal de Registro y Formularios
- [ ] `ModalRegistro.tsx`
- [ ] Lógica de precios (100 gratis, 50% desc, 25% desc)
- [ ] Contador visual 0-100
- [ ] `FormularioGratis.tsx`
- [ ] `FormularioLanding.tsx`

### FASE 8: Preparación Base de Datos
- [ ] Migración de array local a BD real
- [ ] Integrar todos los negocios por categoría
- [ ] Lógica de autollenado

---

## 📂 Estructura Actual del Proyecto

```
/workspaces/sanjuanOnline/
├── app/
│   ├── layout.tsx (con TemaProvider)
│   ├── page.tsx (renderiza Home)
│   ├── globals.css
│   ├── comida-rapida/
│   ├── restaurantes/
│   ├── entretenimiento/
│   ├── mantenimiento/
│   ├── salud/
│   ├── mascotas/
│   ├── hoteles/
│   ├── cuenta/
│   └── ajustes/
├── componentes/
│   ├── Spinner.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── layouts/
│   └── LayoutDirectorio.tsx
├── paginas/
│   └── Home.tsx
├── context/
│   └── TemaContext.tsx
├── data/
│   ├── negocios.db.ts
│   └── tipos.db.ts
├── public/
│   ├── logosanjuan.png
│   ├── sanjuan.jpg
│   └── icon-192x192.png
└── tailwind.config.js (configurado con darkMode: 'class')
```

---

## 🎯 Próximos Pasos

1. **Completar FASE 3:** Home con banner, categorías y misión
2. **Crear TarjetaNegocio:** Con 3 variantes (VIP, Estándar, Básico)
3. **Crear CategoriaGenerica:** Para filtrar y mostrar negocios
4. **Crear LandingClientes:** Para páginas individuales de negocios
5. **Conectar con base de datos:** Migrar de array local a BD

---

## 📝 Notas Importantes

- **Spinner:** Solo aparece en Home, usa sessionStorage
- **Modo Oscuro:** Funcional, guarda en localStorage
- **Rutas:** Todas las categorías tienen [slug] para negocios individuales
- **Header:** Profesional, colores coherentes con Footer
- **Build:** Funciona en dev, error en build estático solo en /ajustes (normal para localStorage)

---

## 🔗 Repositorio

**GitHub:** https://github.com/SanJuanOnline/sanjuanOnline
**Último commit:** "Maquetación desde cero - FASE 1 y 2 completas"
**Fecha:** 13 Marzo 2026

---

**Última actualización:** 13 Marzo 2026, 18:32

---

## 📅 Sesión: 14 Marzo 2026

---

## ✅ COMPLETADO HOY

### MÓDULO 4 — FASE 7: Formulario de Registro Inteligente ✅

#### Nuevos archivos creados:

**`database/tiposRegistro.ts`**
- Interface `NegocioRegistrado` (estructura completa para Firebase-ready)
- Interface `DatosFormulario` (lo que captura el formulario)
- Tipos: `PlanRegistro`, `EstadoRegistro`

**`database/negociosRegistrados.ts`**
- `generarSlug(nombre)` — limpia texto para URL (sin acentos, sin especiales)
- `generarUUID()` — ID único simple
- `formatearTelefono(valor)` — formato (444) 123-4567
- `obtenerIniciales(nombre)` — primeras 2 letras para placeholder de logo
- `detectarCategoria(giro)` — detección por palabras clave (8 categorías)
- `agregarNegocio(datos)` — guarda en localStorage (reemplazar por `addDoc` de Firebase en Fase 2)
- `obtenerNegociosRegistrados()` — lee desde localStorage
- `slugUnico(base)` — verifica duplicados y agrega número si es necesario

**`componentes/FormularioRegistro.tsx`** (reemplazado completamente)
- Paso 1: Nombre → genera slug en tiempo real con preview de URL
- Paso 2: Giro → detecta categoría automáticamente con confirmación visual
- Paso 3: Color de marca → paleta de 8 colores + preview de placeholder con iniciales
- Paso 4: Teléfonos → hasta 3 teléfonos + WhatsApp (mismo número o diferente) + Messenger
- Paso 5: Dirección → textarea con helper text
- Paso 6: Descripción → 150 caracteres con contador
- Pantalla de éxito con slug generado

**`app/registro/page.tsx`** (actualizado)
- Pasa `contadorLugares` al formulario
- `onExito` redirige al slug del negocio registrado

#### Panel Admin actualizado (`app/admin/page.tsx`):
- Módulo Negocios ahora tiene 2 tabs:
  - **Directorio** — negocios del array estático (`dbNegocios.ts`)
  - **Nuevos Registros** — negocios del formulario (localStorage)
- Tab "Nuevos Registros" muestra: nombre, slug, giro, teléfono, estado (pendiente/activo/pausado)
- Botones de acción: Aprobar ✓, Pausar ✗, Eliminar 🗑

---

## 🔄 MIGRACIÓN A FIREBASE (Cuando estés listo)

Solo cambiar **una función** en `database/negociosRegistrados.ts`:

```typescript
// ANTES (localStorage):
export function agregarNegocio(datos: DatosFormulario): NegocioRegistrado {
  // ... guarda en localStorage
}

// DESPUÉS (Firebase):
import { collection, addDoc } from 'firebase/firestore';
export async function agregarNegocio(datos: DatosFormulario): Promise<NegocioRegistrado> {
  const docRef = await addDoc(collection(db, 'negocios'), { ...nuevo });
  return { ...nuevo, id: docRef.id };
}
```

El componente `FormularioRegistro.tsx` NO cambia. Solo la función utilitaria.

---

## 📂 Archivos Modificados Hoy

```
database/
  tiposRegistro.ts          ← NUEVO
  negociosRegistrados.ts    ← NUEVO
componentes/
  FormularioRegistro.tsx    ← REEMPLAZADO (formulario inteligente completo)
app/
  registro/page.tsx         ← ACTUALIZADO
  admin/page.tsx            ← ACTUALIZADO (tabs Directorio / Nuevos Registros)
```

---

## 🚧 PENDIENTE (PRÓXIMA SESIÓN)

- [ ] Conectar Firebase (Firestore) — reemplazar `agregarNegocio` en `negociosRegistrados.ts`
- [ ] Agregar 5 negocios por categoría al array `dbNegocios.ts` para análisis real
- [ ] Subir a Vercel para pruebas de comportamiento real
- [ ] Módulo Admin: implementar "Aprobar" y "Pausar" con cambio real de estado
- [ ] Módulo Admin: Usuarios, Estadísticas, Notificaciones, Planes (requieren Firebase)

---

**Última actualización:** 14 Marzo 2026, 00:42

---

## 📅 Sesión: 14 Marzo 2026 (continuación)

---

## ✅ COMPLETADO — MIGRACIÓN A FIREBASE COMPLETA

### Firebase configurado
- Proyecto: `sanjuanonline-3e042`
- Firestore habilitado en modo producción, región `us-central1`
- Reglas temporales en `allow read, write: if true` (cambiar antes de producción real)
- Credenciales en `.env.local` (nunca subir a GitHub)

### Archivos nuevos
```
lib/
  firebase.ts                  ← Inicialización de Firebase (lee de .env.local)
database/
  serviciosFirestore.ts        ← Funciones de lectura/escritura en Firestore
  tiposRegistro.ts             ← Interfaces NegocioRegistrado y DatosFormulario
  negociosRegistrados.ts       ← agregarNegocio() → guarda en Firestore
scripts/
  migrarNegocios.ts            ← Script one-time: subió los 12 negocios a Firestore
componentes/
  PaginaCategoria.tsx          ← Componente genérico para páginas de categoría
  LandingNegocio.tsx           ← Componente genérico para landings (lee de Firestore)
  AjustesContenido.tsx         ← Contenido de ajustes (separado para evitar SSR)
  FormularioRegistro.tsx       ← Formulario inteligente completo
```

### Migración completada
- Los 12 negocios del array local fueron subidos a Firestore con `scripts/migrarNegocios.ts`
- Cada negocio usa su `slug` como ID del documento en Firestore

### App 100% conectada a Firestore
- Páginas de categoría → `obtenerNegociosPorCategoria(categoria)`
- Landings `[slug]` → `obtenerNegocioPorSlug(slug)`
- Panel admin → `obtenerTodosLosNegocios()`
- Formulario de registro → `agregarNegocio(datos)` → `addDoc` a Firestore

### Páginas de categoría simplificadas (1 línea cada una)
Todas usan `<PaginaCategoria />` con sus props:
- `/comida-rapida`, `/restaurantes`, `/entretenimiento`, `/mantenimiento`
- `/salud`, `/mascotas`, `/hoteles`

### Landings `[slug]` simplificadas
Todas usan `<LandingNegocio />` que lee de Firestore dinámicamente.

### Build ✅
- `npm run build` exitoso sin errores
- `/ajustes` corregido con `dynamic({ ssr: false })` para evitar error de localStorage en build

---

## 🔜 PENDIENTE PRÓXIMA SESIÓN

- [ ] Verificar en navegador que categorías y landings cargan desde Firestore
- [ ] Borrar `database/dbNegocios.ts` (array local ya no se usa)
- [ ] Subir a Vercel para pruebas en producción real
- [ ] Agregar 5 negocios por categoría directamente en Firestore
- [ ] Firebase Storage para imágenes reales
- [ ] Cambiar reglas de Firestore antes de producción:
  ```
  allow read: if true;
  allow write: if false; // solo desde admin autenticado
  ```

---

**Última actualización:** 14 Marzo 2026, 01:55

---

## 📅 Sesión: 14 Marzo 2026 (tarde)

---

## 🎯 ESTRATEGIA — MÓDULO 5: AUTENTICACIÓN Y CUENTA DE USUARIO

### Objetivo
Implementar Firebase Auth para que los usuarios puedan registrarse, iniciar sesión, y gestionar su negocio desde `/cuenta`. El negocio registrado queda vinculado al usuario y aparece automáticamente en su categoría con plan Básico (free).

---

### Flujo completo definido

```
[Header] → Botón "Registrarse" → /registro (Firebase Auth + Formulario negocio)
[Header] → Botón "Iniciar Sesión" → ModalLogin (Firebase Auth)
         → Si autenticado → icono User lleva a /cuenta
[/cuenta] → Dashboard del dueño: ver su negocio, editar datos, escalar plan
```

---

### FASE 9: Firebase Auth — Registro e Inicio de Sesión

#### 9.1 — Activar Firebase Auth en consola
- Habilitar proveedor: Email/Contraseña en Firebase Console

#### 9.2 — Contexto de Autenticación (`context/AuthContext.tsx`)
- Provee `usuario` (FirebaseUser | null) a toda la app
- Funciones: `registrarse(email, password)`, `iniciarSesion(email, password)`, `cerrarSesion()`
- Envuelve la app en `app/layout.tsx`

#### 9.3 — Botones en Header
- Si `usuario === null`:
  - Botón **"Registrarse"** → navega a `/registro`
  - Botón **"Iniciar Sesión"** → abre `ModalLogin`
- Si `usuario !== null`:
  - Icono User → navega a `/cuenta`
  - Tooltip o badge con nombre/email del usuario

#### 9.4 — Modal de Login (`componentes/ModalLogin.tsx`)
- Email + Contraseña
- Botón "Iniciar Sesión" → `iniciarSesion()`
- Link "¿No tienes cuenta? Regístrate" → cierra modal y navega a `/registro`
- Manejo de errores (credenciales incorrectas, etc.)

#### 9.5 — Flujo de Registro en `/registro`
- Paso 0 (nuevo): Crear cuenta → email + contraseña → `registrarse()`
- Una vez autenticado → continúa con el formulario del negocio (pasos 1-6 ya existentes)
- Al guardar negocio en Firestore: incluir `uid` del usuario y `planSuscripcion: "basico"`

---

### FASE 10: Página `/cuenta` — Dashboard del Dueño

#### Lo que muestra `/cuenta`
- Si NO autenticado → redirige a `/registro`
- Si autenticado:
  - Datos del usuario (email, fecha registro)
  - Tarjeta con datos de su negocio (nombre, slug, categoría, plan actual)
  - Botón "Editar mi negocio" → formulario de edición (datos básicos)
  - Botón "Escalar mi plan" → muestra opciones Estándar / VIP con precios
  - Botón "Cerrar sesión"

#### Consulta Firestore
- `obtenerNegocioPorUID(uid)` → busca en Firestore donde `uid == usuario.uid`

---

### FASE 11: Plan Básico — Qué ofrece y cómo se ve

#### TarjetaNegocio (variante Básica)
- Ya existe, solo confirmar que `planSuscripcion: "basico"` activa la variante pequeña

#### LandingNegocio (plan Básico = free)
- Renderiza con **overlay oscuro semitransparente** sobre secciones premium
- Secciones visibles: Banner, Información, Contacto
- Secciones bloqueadas con overlay: Galería, Productos, Testimonios
- Mensaje en overlay: "Actualiza tu plan para mostrar esta sección"

---

### Archivos a crear/modificar

```
context/
  AuthContext.tsx              ← NUEVO — proveedor de autenticación global

componentes/
  ModalLogin.tsx               ← NUEVO — modal de inicio de sesión
  Header.tsx                   ← MODIFICAR — botones Login/Registro condicionales

app/
  registro/page.tsx            ← MODIFICAR — agregar Paso 0 (crear cuenta)
  cuenta/page.tsx              ← MODIFICAR — dashboard real del dueño
  layout.tsx                   ← MODIFICAR — envolver con AuthProvider

database/
  serviciosFirestore.ts        ← MODIFICAR — agregar obtenerNegocioPorUID()

componentes/
  LandingNegocio.tsx           ← MODIFICAR — overlay oscuro para plan básico
```

---

## 🚧 PENDIENTE — INICIAR AQUÍ (MÓDULO 5)

> Ver detalle completo en `Protocolo-de-Desarrollo.md` → Módulo 5

### FASE 9 — Firebase Auth
- [x] Activar Email/Contraseña en Firebase Console
- [x] Activar Google Sign-In en Firebase Console
- [x] Crear `context/AuthContext.tsx`
- [x] Modificar `app/layout.tsx` con AuthProvider
- [x] Modificar `componentes/Header.tsx` — botones "Registrarse" / "Iniciar Sesión" condicionales
- [x] Crear `componentes/ModalAuth.tsx` (email/contraseña + Google)
- [x] Modificar `app/registro/page.tsx` — protegido, pide auth antes del formulario

### FASE 10 — Dashboard `/cuenta`
- [x] Agregar `obtenerNegocioPorUID()` en `database/serviciosFirestore.ts`
- [x] Modificar `app/cuenta/page.tsx` — dashboard real (datos usuario, negocio, cerrar sesión, eliminar cuenta)

### FASE 11 — Overlay plan Básico
- [ ] Modificar `componentes/LandingNegocio.tsx` — overlay oscuro en secciones premium

---

## 🌐 PRODUCCIÓN

- **URL:** https://sanjuan-online.vercel.app
- **Deploy:** Vercel (conectado a GitHub, auto-deploy en push a main)
- **Dominio autorizado en Firebase:** `sanjuan-online.vercel.app`

---

### Próxima sesión (Módulo 6)
- [ ] Overlay plan Básico en `LandingNegocio.tsx`
- [ ] Verificar flujo completo: registro → negocio en directorio → landing
- [ ] Agregar más negocios por categoría en Firestore
- [ ] Facebook Sign-In (requiere app en Meta for Developers)
- [ ] Firebase Storage para imágenes reales

---

**Última actualización:** 14 Marzo 2026, 22:20
