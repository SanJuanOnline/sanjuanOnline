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
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
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
| FASE 7 | Formulario de registro inteligente (8 pasos + Cloudinary) | ✅ |
| FASE 7 | Panel Admin con tabs (Directorio / Nuevos Registros) | ✅ |
| FASE 8 | Firebase/Firestore configurado y conectado | ✅ |
| FASE 8 | 12 negocios migrados al Firestore | ✅ |
| FASE 8 | Todas las páginas leen de Firestore | ✅ |
| FASE 8.1 | Integración Cloudinary para subida de imágenes | ✅ |
| FASE 8.2 | Soporte para URL externa (tipoEnlace: externo/landing) | ✅ |

**Archivos clave:**
- `lib/firebase.ts`
- `lib/cloudinary.ts` ← NUEVO
- `database/serviciosFirestore.ts`
- `database/negociosRegistrados.ts`
- `database/tiposRegistro.ts`
- `componentes/FormularioRegistro.tsx` ← ACTUALIZADO
- `componentes/uilanding/TarjetaNegocio.tsx` ← ACTUALIZADO
- `app/admin/page.tsx`

**Documentación:**
- Ver `manual de operaciones/Formulario-Registro.md` para detalles completos

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

### ✅ MÓDULO 7 — SISTEMA DE LANDING AUTOGESTIONABLE
*Estado: COMPLETO ✅*

**Objetivo:** Sistema donde los dueños construyen su propia landing sin intervención manual del administrador.

#### Modelo de Negocio Actualizado

**Plan Básico (Gratis):**
- Aparece en directorio con TarjetaNegocio pequeña
- Opción 1: Si tiene URL externa → redirige directamente
- Opción 2: Si no tiene sitio → landing con overlay bloqueado

**Plan Estándar ($300/año - pago único):**
- Desbloquea editor de landing
- Construye su propia landing con herramientas visuales
- Puede editar sin límite durante el año
- Plantilla genérica con opciones personalizables

**Plan Premium (Personalizado):**
- Botón "Necesito un sitio personalizado"
- Solicitud de cotización para maquetación manual
- Landing 100% personalizada fuera de la plantilla

---

#### ✅ FASE 12 — Formulario de Registro: Campo URL Externa (COMPLETO)

**Modificar `FormularioRegistro.tsx`:**
- ✅ Agregar Paso 8 (nuevo): "¿Ya tienes un sitio web?"
  - Opción A: "Sí, tengo sitio web" → campo input para URL
  - Opción B: "No, quiero crear mi landing aquí"
- ✅ Si elige opción A:
  - Guardar `urlExterna` en Firestore
  - TarjetaNegocio abre URL en nueva pestaña (target="_blank")
  - No genera landing interna
- ✅ Si elige opción B:
  - `urlExterna: null`
  - Genera landing con overlay bloqueado (plan básico)

**Campos nuevos en Firestore:**
```typescript
interface Negocio {
  // ... campos existentes
  urlExterna?: string | null;
  tipoLanding: "externa" | "interna";
}
```

---

#### ✅ FASE 13 — Dashboard `/cuenta`: Opciones de Upgrade (COMPLETO)

**Modificar `app/cuenta/page.tsx`:**

**Si `tipoLanding === "externa"`:**
- ✅ Mostrar URL actual
- ✅ Botón "Cambiar URL"
- ✅ Botón "Quiero crear mi landing aquí" → cambia a tipoLanding: "interna"

**Si `tipoLanding === "interna" && planSuscripcion === "basico"`:**
- ✅ Mostrar 2 opciones:
  1. **Botón "🚀 Desbloquear Editor ($300/año)"**
     - Activa plan Estándar
     - Acceso a editores de Productos, Galería, Testimonios
  2. **Botón "✨ Necesito un sitio personalizado"**
     - Abre formulario de solicitud
     - Envía notificación al admin
     - Cotización manual

**Si `planSuscripcion === "estandar"`:**
- ✅ Acceso a editores:
  - ✏️ Editar Productos
  - 🖼️ Editar Galería
  - 💬 Editar Testimonios

---

#### ✅ FASE 14 — Editor de Landing (Plan Estándar) (COMPLETO)

**Herramientas básicas incluidas:**

**14.1 — Editor de Productos ✅**
- ✅ Agregar/editar/eliminar productos
- ✅ Campos: nombre, descripción, precio, imagen
- ✅ Vista previa en tiempo real
- ✅ Guardado en Firestore

**14.2 — Editor de Galería ✅**
- ✅ Subir hasta 12 imágenes (por URL)
- ✅ Descripción opcional por imagen
- ✅ Guardado en Firestore

**14.3 — Editor de Testimonios ✅**
- ✅ Agregar testimonios de clientes
- ✅ Campos: nombre, comentario, calificación (1-5 estrellas)
- ✅ Máximo 10 testimonios
- ✅ Guardado en Firestore

**14.4 — Renderizado en Landing ✅**
- ✅ LandingNegocio.tsx lee datos de editores
- ✅ Prioridad: datos del editor > datos de landing.secciones
- ✅ Overlay desaparece cuando plan !== "basico"

**Plantilla Genérica Base:**
- ✅ Estructura fija: Banner → Info → Productos → Galería → Testimonios → Contacto
- ✅ Solo cambian: contenido (productos, galería, testimonios)
- ✅ Responsive automático
- ✅ Sin cambios de layout (mantiene coherencia visual del directorio)

---

#### ✅ FASE 15 — Solicitud de Landing Personalizada (COMPLETO)

**Componente `FormularioSolicitudPersonalizada.tsx`:**
- ✅ Campos:
  - Nombre del negocio (prellenado)
  - Descripción de lo que necesita
  - Referencia de sitios que le gustan (opcional)
  - Presupuesto estimado
  - Teléfono/email de contacto
- ✅ Guarda en Firestore colección `solicitudesPersonalizadas`
- ✅ Notificación al admin en panel `/admin`

**Panel Admin:**
- ✅ Nueva pestaña "Solicitudes Personalizadas"
- ✅ Lista de solicitudes pendientes
- ✅ Botones: Marcar en proceso, Marcar completada, Contactar

---

#### Estructura de Datos Actualizada

```typescript
// database/tiposNegocios.ts

interface ProductoEditor {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
}

interface ItemGaleriaEditor {
  id: string;
  url: string;
  descripcion?: string;
}

interface TestimonioEditor {
  id: string;
  nombre: string;
  comentario: string;
  calificacion: number;
}

interface Negocio {
  // Campos existentes...
  
  // NUEVOS CAMPOS:
  urlExterna?: string | null;
  tipoLanding: "externa" | "interna";
  productos?: ProductoEditor[];
  galeria?: ItemGaleriaEditor[];
  testimonios?: TestimonioEditor[];
  fechaUpgrade?: Date;
  fechaExpiracion?: Date;
}

interface SolicitudPersonalizada {
  id: string;
  negocioSlug: string;
  nombreNegocio: string;
  uid: string;
  descripcion: string;
  referenciaSitios?: string;
  presupuesto?: string;
  contacto: string;
  estado: "pendiente" | "en_proceso" | "completada";
  fechaSolicitud: Date;
}
```

---

#### Checklist MÓDULO 7

**FASE 12 — URL Externa:**
- [x] Agregar campo `urlExterna` y `tipoLanding` en `tiposRegistro.ts`
- [x] Modificar `FormularioRegistro.tsx` — Paso 8: "¿Ya tienes sitio web?"
- [x] Modificar `TarjetaNegocio.tsx` — si `urlExterna` existe, abrir en nueva pestaña
- [x] Modificar `negociosRegistrados.ts` — guardar nuevos campos

**FASE 13 — Dashboard Upgrade:**
- [x] Modificar `app/cuenta/page.tsx` — mostrar opciones según plan
- [x] Crear `ModalPago.tsx` — simular pago de $300/año
- [x] Crear `FormularioSolicitudPersonalizada.tsx`
- [x] Agregar función `actualizarPlan()` en `serviciosFirestore.ts`

**FASE 14 — Editores:**
- [x] Crear `componentes/editores/EditorProductos.tsx`
- [x] Crear `componentes/editores/EditorGaleria.tsx`
- [x] Crear `componentes/editores/EditorTestimonios.tsx`
- [x] Modificar `LandingNegocio.tsx` — renderizar datos de editores
- [x] Agregar funciones de guardado en `serviciosFirestore.ts`

**FASE 15 — Solicitudes Personalizadas:**
- [x] Crear colección `solicitudesPersonalizadas` en Firestore
- [x] Agregar pestaña en `/admin` para ver solicitudes
- [x] Funciones: obtener y actualizar estado de solicitudes

---

### 📋 MÓDULO 8 — MEJORAS Y OPTIMIZACIONES
*Estado: PENDIENTE*

**Objetivo:** Pulir el sistema, agregar funcionalidades avanzadas y preparar para producción real.

#### FASE 16 — Personalizador Visual (Opcional)
- [ ] Crear `componentes/editores/PersonalizadorVisual.tsx`
- [ ] Selector de colores (primario y secundario)
- [ ] Selector de tipografía (5 fuentes predefinidas)
- [ ] Cambiar imágenes de banner y secciones
- [ ] Preview en tiempo real
- [ ] Guardar en Firestore

#### FASE 17 — Firebase Storage para Imágenes
- [ ] Configurar Firebase Storage
- [ ] Función para subir logos (reemplazar base64)
- [ ] Función para subir imágenes de productos
- [ ] Función para subir imágenes de galería
- [ ] Optimización automática de imágenes
- [ ] URLs públicas persistentes

#### FASE 18 — Pasarela de Pago Real
- [ ] Integrar Stripe o Mercado Pago
- [ ] Webhook para confirmar pagos
- [ ] Actualizar plan automáticamente tras pago exitoso
- [ ] Enviar email de confirmación
- [ ] Manejo de renovaciones anuales

#### FASE 19 — Notificaciones y Emails
- [ ] Configurar servicio de email (SendGrid/Resend)
- [ ] Email al admin cuando hay nueva solicitud personalizada
- [ ] Email al usuario cuando se aprueba su negocio
- [ ] Email de recordatorio antes de vencimiento de plan
- [ ] Notificaciones in-app en panel admin

#### FASE 20 — Analytics y Métricas
- [ ] Tracking de visitas por negocio
- [ ] Contador de clics en WhatsApp
- [ ] Contador de clics en teléfono
- [ ] Dashboard de estadísticas en `/admin`
- [ ] Gráficas de crecimiento

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

*Última actualización: 17 Marzo 2026, 23:08*
