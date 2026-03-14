# Protocolo de Desarrollo — San Juan Online

---

## 1. Información General del Proyecto

- **Nombre:** San Juan Online
- **Propietario:** Enrique Vargas
- **Descripción:** Directorio digital freemium para negocios locales de las secciones 1-7 y alrededores (incluye Conilas)
- **Modelo de negocio:** Registro gratuito (plan Básico) → upsell a planes Estándar y VIP
- **Alcance:** App Web PWA
- **Repositorio:** https://github.com/SanJuanOnline/sanjuanOnline
- **Firebase:** Proyecto `sanjuanonline-3e042`, Firestore región `us-central1`

---

## 2. Reglas de Oro

1. **Tipado estricto:** NUNCA usar `any`. Siempre interfaces/types.
2. **Metodología:** Desarrollo por Fases. No avanzar hasta completar la actual.
3. **Estructura:** NUNCA renombrar archivos o carpetas una vez creados.
4. **Control de calidad:** `npm run build` al finalizar cada fase crítica.
5. **Seguridad:** Nunca subir `.env.local` a GitHub. Nunca exponer credenciales.

---

## 3. Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Estilos:** Tailwind CSS (darkMode: 'class')
- **Base de datos:** Firebase Firestore
- **Autenticación:** Firebase Auth (Email/Contraseña)
- **Iconos:** lucide-react
- **Estado global:** React Context (Tema + Auth)
- **Deploy:** Vercel

---

## 4. Variables de Entorno (`.env.local`)

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_ADMIN_ENABLED=true
```

---

## 5. Planes de Suscripción

| Plan | Precio | Tarjeta | Landing |
|------|--------|---------|---------|
| **Básico** | Gratis | Variante pequeña (gris) | Banner + Info + Contacto. Resto con overlay oscuro bloqueado |
| **Estándar** | Por definir | Variante media (azul) | + Productos + Galería |
| **VIP** | Por definir | Variante grande (dorado) | Todas las secciones + posición destacada en directorio |

---

## 6. Módulos de Desarrollo

---

### ✅ MÓDULO 1 — INFRAESTRUCTURA Y HOME
*Estado: COMPLETO*

| Fase | Descripción | Estado |
|------|-------------|--------|
| FASE 1 | Spinner de carga con barra de progreso, logo, slogan | ✅ |
| FASE 2 | Header, Footer, LayoutDirectorio, modo oscuro | ✅ |
| FASE 3 | Home: Hero banner, grid categorías, misión, estadísticas | ✅ |

**Archivos clave:**
- `componentes/Spinner.tsx`
- `componentes/Header.tsx`
- `componentes/Footer.tsx`
- `layouts/LayoutDirectorio.tsx`
- `paginas/Home.tsx`
- `context/TemaContext.tsx`

---

### ✅ MÓDULO 2 — LANDINGS DE NEGOCIO
*Estado: COMPLETO*

| Fase | Descripción | Estado |
|------|-------------|--------|
| FASE 4 | Rutas dinámicas `[categoria]/[slug]` para todas las categorías | ✅ |
| FASE 5 | `LandingNegocio.tsx` genérico que lee de Firestore | ✅ |

**Archivos clave:**
- `componentes/LandingNegocio.tsx`
- `app/[categoria]/[slug]/page.tsx` (todas las categorías)

**Secciones disponibles en landing:**
- `SeccionBanner.tsx`
- `SeccionInformacion.tsx`
- `SeccionProductos.tsx`
- `SeccionGaleria.tsx`
- `SeccionTestimonios.tsx`
- `SeccionContacto.tsx`

---

### ✅ MÓDULO 3 — DIRECTORIO Y TARJETAS
*Estado: COMPLETO*

| Fase | Descripción | Estado |
|------|-------------|--------|
| FASE 6 | `TarjetaNegocio.tsx` con 3 variantes (VIP, Estándar, Básico) | ✅ |
| FASE 6 | `PaginaCategoria.tsx` genérico para todas las categorías | ✅ |
| FASE 6 | Páginas de categoría conectadas a Firestore | ✅ |

**Archivos clave:**
- `componentes/TarjetaNegocio.tsx`
- `componentes/PaginaCategoria.tsx`
- `app/[categoria]/page.tsx` (todas las categorías)

---

### ✅ MÓDULO 4 — DATOS Y FIREBASE
*Estado: COMPLETO*

| Fase | Descripción | Estado |
|------|-------------|--------|
| FASE 7 | Formulario de registro inteligente (6 pasos) | ✅ |
| FASE 7 | Panel Admin con tabs (Directorio / Nuevos Registros) | ✅ |
| FASE 8 | Firebase/Firestore configurado y conectado | ✅ |
| FASE 8 | 12 negocios migrados al Firestore | ✅ |
| FASE 8 | Todas las páginas leen de Firestore | ✅ |

**Archivos clave:**
- `lib/firebase.ts`
- `database/serviciosFirestore.ts`
- `database/negociosRegistrados.ts`
- `database/tiposRegistro.ts`
- `componentes/FormularioRegistro.tsx`
- `app/admin/page.tsx`

---

### 🔄 MÓDULO 5 — AUTENTICACIÓN Y CUENTA DE USUARIO
*Estado: EN DESARROLLO*

**Objetivo:** Implementar Firebase Auth para que los dueños puedan registrarse, iniciar sesión y gestionar su negocio desde `/cuenta`.

| Fase | Descripción | Estado |
|------|-------------|--------|
| FASE 9 | Firebase Auth — Registro e inicio de sesión | 🔄 |
| FASE 10 | `/cuenta` — Dashboard del dueño | 🔄 |
| FASE 11 | Overlay oscuro en landing para plan Básico | 🔄 |

#### FASE 9 — Firebase Auth

**9.1 — Activar en Firebase Console (manual)**
- Authentication → Sign-in method → Email/Contraseña → Habilitar

**9.2 — `context/AuthContext.tsx` (NUEVO)**
- Provee `usuario` (FirebaseUser | null) a toda la app
- Funciones: `registrarse()`, `iniciarSesion()`, `cerrarSesion()`
- Se envuelve en `app/layout.tsx`

**9.3 — `componentes/Header.tsx` (MODIFICAR)**
- Sin sesión: botón **"Registrarse"** → `/registro` | botón **"Iniciar Sesión"** → abre `ModalLogin`
- Con sesión: icono User → `/cuenta`

**9.4 — `componentes/ModalLogin.tsx` (NUEVO)**
- Email + Contraseña → `iniciarSesion()`
- Link "¿No tienes cuenta?" → cierra modal y navega a `/registro`
- Manejo de errores

**9.5 — `app/registro/page.tsx` (MODIFICAR)**
- Agregar Paso 0: crear cuenta (email + contraseña) antes del formulario
- Al guardar negocio en Firestore: incluir `uid` del usuario y `planSuscripcion: "basico"`

#### FASE 10 — Dashboard `/cuenta`

**`app/cuenta/page.tsx` (MODIFICAR)**
- Sin sesión → redirige a `/registro`
- Con sesión muestra:
  - Email y fecha de registro
  - Tarjeta con datos del negocio (nombre, slug, categoría, plan)
  - Botón "Editar mi negocio"
  - Botón "Escalar mi plan" (opciones Estándar / VIP)
  - Botón "Cerrar sesión"

**`database/serviciosFirestore.ts` (MODIFICAR)**
- Agregar `obtenerNegocioPorUID(uid)` → busca negocio donde `uid == usuario.uid`

#### FASE 11 — Overlay plan Básico

**`componentes/LandingNegocio.tsx` (MODIFICAR)**
- Si `planSuscripcion === "basico"`:
  - Secciones visibles: Banner, Información, Contacto
  - Secciones bloqueadas con overlay oscuro semitransparente: Galería, Productos, Testimonios
  - Mensaje en overlay: "Actualiza tu plan para mostrar esta sección"

**Checklist MÓDULO 5:**
- [ ] Activar Email/Contraseña en Firebase Console
- [ ] Crear `context/AuthContext.tsx`
- [ ] Modificar `app/layout.tsx` con AuthProvider
- [ ] Modificar `componentes/Header.tsx`
- [ ] Crear `componentes/ModalLogin.tsx`
- [ ] Modificar `app/registro/page.tsx` (Paso 0)
- [ ] Agregar `obtenerNegocioPorUID()` en `database/serviciosFirestore.ts`
- [ ] Modificar `app/cuenta/page.tsx`
- [ ] Modificar `componentes/LandingNegocio.tsx` (overlay)

---

### 📋 MÓDULO 6 — PRODUCCIÓN Y CALIDAD
*Estado: PENDIENTE*

| Tarea | Descripción | Estado |
|-------|-------------|--------|
| Deploy | Subir a Vercel y verificar en producción | ⬜ |
| Firestore rules | Cambiar a `allow write: if false` antes de producción real | ⬜ |
| Contenido | Agregar 5+ negocios por categoría en Firestore | ⬜ |
| Imágenes | Firebase Storage para imágenes reales de negocios | ⬜ |
| Limpieza | Borrar `database/dbNegocios.ts` (array local ya no se usa) | ⬜ |
| Verificación | Confirmar en navegador que categorías y landings cargan de Firestore | ⬜ |

---

### 📋 MÓDULO 7 — HERRAMIENTAS PREMIUM PARA LANDINGS
*Estado: DISEÑO PENDIENTE*

**Objetivo:** Definir y construir herramientas adicionales que los negocios pueden activar según su plan para enriquecer su landing.

> ⚠️ Este módulo requiere definición de producto antes de desarrollar. Pendiente de claridad sobre qué herramientas ofrecer y a qué precio.

---

## 7. Reglas de Firestore

**Desarrollo (actual):**
```
allow read, write: if true;
```

**Producción (cambiar antes de lanzar):**
```
allow read: if true;
allow write: if request.auth != null;
```

---

## 8. Notas Técnicas Importantes

- **Spinner:** Solo aparece en Home, controlado con `sessionStorage`
- **Modo oscuro:** Funcional, guarda en `localStorage`, aplica clase `dark` al `<html>`
- **`/ajustes`:** Usa `dynamic({ ssr: false })` para evitar error de localStorage en build
- **Slugs:** Generados automáticamente desde el nombre del negocio (sin acentos, sin especiales)
- **Slugs en Firestore:** El `slug` es el ID del documento en la colección `negocios`
- **Build:** Siempre correr `npm run build` antes de hacer deploy

---

*Última actualización: 14 Marzo 2026*
