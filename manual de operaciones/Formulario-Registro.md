# 📝 Formulario de Registro - Guía Completa

**Última actualización:** 18 Marzo 2026

---

## 🎯 Propósito

Sistema de registro inteligente en **8 pasos** que permite a comerciantes locales registrar su negocio en menos de 60 segundos, con dos modalidades:

1. **Landing Interna:** Negocio completo con editores (productos, galería, testimonios)
2. **URL Externa:** Solo aparece en directorio, redirige a sitio web propio

---

## 🔄 Flujo del Formulario

### Paso 1: Nombre del Negocio
- **Campo:** `nombre` (string, requerido)
- **Validación:** Mínimo 3 caracteres
- **Función:** Genera slug automático en tiempo real
- **Ejemplo:** "Tacos El Güero" → slug: `tacos-el-guero`

### Paso 2: Giro del Negocio
- **Campo:** `giro` (string, requerido)
- **Validación:** Mínimo 5 caracteres
- **Función:** Detecta categoría automáticamente usando palabras clave
- **Ejemplo:** "Venta de tacos y quesadillas" → detecta "comida-rapida"

### Paso 3: Confirmación de Categoría
- **Campo:** `categoria` (TipoCategoria, requerido)
- **Opciones:** 
  - comida-rapida
  - restaurantes
  - entretenimiento
  - servicios
  - mantenimiento
  - salud
  - mascotas
  - hoteles
  - autos
- **Función:** Usuario confirma o cambia categoría detectada
- **Estado:** `categoriaConfirmada` debe ser `true` para continuar

### Paso 4: Logo del Negocio
- **Opciones:**
  1. **Subir logo propio:**
     - Campo: `logoFile` (File)
     - Validación: Imagen válida, máximo 2MB
     - Proceso: Sube a Cloudinary → guarda URL en `logoBase64`
  2. **Usar logo generado:**
     - Campo: `usarLogoGenerado` = true
     - Usa iniciales del negocio con `colorMarca`
  3. **No tengo logo:**
     - Marca `noTengoLogo` = true
     - Usa logo generado por defecto

- **Color de marca:** `colorMarca` (string, hex)
  - Opciones predefinidas: Naranja, Azul, Verde, Rojo, Morado, Rosa

### Paso 5: ¿Tienes Sitio Web?
- **Campo:** `tieneSitioWeb` (boolean)
- **Bifurcación:**
  - **SÍ:** Ir a Paso 6 (URL Externa) → FIN
  - **NO:** Continuar a Paso 7 (Datos completos)

### Paso 6: URL Externa (Solo si tieneSitioWeb = true)
- **Campo:** `urlExterna` (string, requerido si tieneSitioWeb)
- **Validación:** URL válida (https://...)
- **Resultado:**
  - Guarda datos mínimos: nombre, giro, categoría, logo, urlExterna
  - `tipoLanding` = "externa"
  - `tipoEnlace` = "externo"
  - Aparece en directorio pero redirige a URL externa
  - **FIN DEL REGISTRO**

### Paso 7: Teléfonos (Solo si NO tiene sitio web)
- **Campos:**
  - `telefonoPrincipal` (string, requerido)
  - `telefonoExtra1` (string, opcional)
  - `telefonoExtra2` (string, opcional)
- **Validación:** 10 dígitos cada uno
- **Formato automático:** (XXX) XXX-XXXX
- **WhatsApp:**
  - `whatsappMismoNumero` (boolean)
  - Si true: usa `telefonoPrincipal`
  - Si false: campo `whatsapp` (string, 10 dígitos)
- **Messenger:** `messenger` (string, opcional)

### Paso 8: Dirección y Descripción (Solo si NO tiene sitio web)
- **Campos:**
  - `direccion` (string, requerido)
  - `descripcion` (string, requerido, mínimo 20 caracteres)
- **Resultado:**
  - Guarda datos completos
  - `tipoLanding` = "interna"
  - `tipoEnlace` = "landing"
  - Crea landing editable con acceso a editores
  - **FIN DEL REGISTRO**

---

## 💾 Datos Guardados en Firestore

### Colección: `negocios`

```typescript
{
  // Identificación
  slug: string,              // Generado automáticamente
  nombre: string,
  giro: string,
  descripcion: string,
  categoria: TipoCategoria,
  
  // Visual
  imagen: string,            // URL de Cloudinary o base64
  logo: string | null,       // Compatibilidad
  usarLogoGenerado: boolean,
  colorMarca: string,        // Hex color
  
  // Contacto (solo landing interna)
  telefonos: string[],       // Array de teléfonos
  whatsapp: string | null,
  messenger: string | null,
  direccion: string,
  
  // Plan y Estado
  plan: "gratis",            // Por defecto
  planSuscripcion: "basico", // Campo para tipo Negocio
  estado: "activo",          // Aparece inmediatamente
  
  // Sitio Web Externo
  tieneSitioWeb: boolean,
  urlExterna: string | null,
  tipoLanding: "externa" | "interna",
  tipoEnlace: "externo" | "landing",
  
  // Métricas
  visitas: 0,
  clicksTelefono: 0,
  clicksWhatsApp: 0,
  fechaRegistro: string,     // ISO string
  
  // Editores (solo landing interna, se agregan después)
  productos?: ProductoEditor[],
  galeria?: ItemGaleriaEditor[],
  testimonios?: TestimonioEditor[],
  landing?: LandingData
}
```

---

## 🔍 Detección Automática de Categoría

### Palabras Clave por Categoría

```typescript
"comida-rapida": [
  "taco", "hamburguesa", "hot dog", "pizza", "alitas", 
  "burrito", "torta", "antojito", "comida rapida", 
  "fast food", "papas", "snack"
]

"restaurantes": [
  "restaurante", "comida corrida", "cocina", "chef", 
  "platillo", "menu del dia", "buffet", "comedor", "familiar"
]

"entretenimiento": [
  "bar", "antro", "karaoke", "billar", "boliche", 
  "cine", "juego", "diversion", "evento", "fiesta", 
  "musica en vivo"
]

"servicios": [
  "abogado", "contador", "disenador", "fotografo", 
  "maestro", "tutor", "consultor", "asesor", 
  "servicio profesional", "notario", "arquitecto"
]

"mantenimiento": [
  "plomero", "electricista", "albanil", "pintor", 
  "carpintero", "cerrajero", "reparacion", 
  "mantenimiento", "arreglo", "instalacion"
]

"salud": [
  "doctor", "medico", "dentista", "farmacia", "spa", 
  "masaje", "terapia", "clinica", "hospital", 
  "salud", "bienestar"
]

"mascotas": [
  "veterinaria", "mascota", "perro", "gato", 
  "alimento para mascotas", "peluqueria canina", 
  "pet shop", "pet"
]

"hoteles": [
  "hotel", "motel", "hostal", "habitacion", 
  "hospedaje", "alojamiento", "cabana"
]

"autos": [
  "taller", "mecanico", "refacciones", "llantas", 
  "auto", "carro", "vehiculo", "lavado", 
  "hojalateria", "pintura automotriz"
]
```

---

## 🎨 Integración con Cloudinary

### Configuración
- **Archivo:** `lib/cloudinary.ts`
- **Función:** `subirImagenCloudinary(file: File): Promise<string>`
- **Límites:**
  - Tamaño máximo: 2MB
  - Formatos: JPG, PNG, GIF, WebP
- **Proceso:**
  1. Valida archivo
  2. Convierte a FormData
  3. Sube a Cloudinary (unsigned upload)
  4. Retorna URL pública
  5. Guarda URL en campo `imagen`

### Variables de Entorno Requeridas
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset
```

---

## 🔄 Renderización en Tarjetas

### Componente: `TarjetaNegocio.tsx`

**Lógica de enlace:**
```typescript
const esExterno = 
  (negocio as any).tipoLanding === "externa" || 
  negocio.tipoEnlace === "externo";

if (esExterno && negocio.urlExterna) {
  // Abre URL externa en nueva pestaña
  window.open(negocio.urlExterna, "_blank");
} else {
  // Navega a landing interna
  router.push(`/negocio/${negocio.slug}`);
}
```

**Indicador visual:**
- Muestra ícono de enlace externo si `tipoEnlace === "externo"`

---

## ✅ Validaciones Completas

### Validaciones Básicas (Ambos tipos)
- ✅ Nombre: mínimo 3 caracteres
- ✅ Giro: mínimo 5 caracteres
- ✅ Categoría: confirmada por usuario
- ✅ Logo: imagen válida o usar generado

### Validaciones URL Externa
- ✅ URL válida (formato https://...)
- ✅ Campo no vacío

### Validaciones Landing Interna
- ✅ Teléfono principal: 10 dígitos
- ✅ Teléfonos extra: 10 dígitos o vacío
- ✅ WhatsApp: 10 dígitos si no usa mismo número
- ✅ Dirección: no vacía
- ✅ Descripción: mínimo 20 caracteres

---

## 🎯 Estados del Formulario

```typescript
const [datos, setDatos] = useState<DatosFormulario>({...});
const [slug, setSlug] = useState("");
const [categoriaDetectada, setCategoriaDetectada] = useState<TipoCategoria | null>(null);
const [categoriaConfirmada, setCategoriaConfirmada] = useState(false);
const [mostrarSelectorManual, setMostrarSelectorManual] = useState(false);
const [telefonosExtra, setTelefonosExtra] = useState(0);
const [logoPreview, setLogoPreview] = useState<string | null>(null);
const [logoFile, setLogoFile] = useState<File | null>(null);
const [noTengoLogo, setNoTengoLogo] = useState(false);
const [enviando, setEnviando] = useState(false);
const [registrado, setRegistrado] = useState(false);
const [slugFinal, setSlugFinal] = useState("");
```

---

## 🚀 Proceso de Registro

### Landing Interna (Completa)
1. Usuario completa 8 pasos
2. Sube logo a Cloudinary (si aplica)
3. Guarda en Firestore con `estado: "activo"`
4. Aparece inmediatamente en directorio
5. Usuario puede acceder a dashboard y editores
6. Landing renderiza en `/negocio/[slug]`

### URL Externa (Rápida)
1. Usuario completa 5 pasos
2. Sube logo a Cloudinary (si aplica)
3. Guarda datos mínimos en Firestore
4. Aparece en directorio con ícono de enlace externo
5. Click redirige a URL externa
6. No tiene acceso a editores

---

## 📊 Diferencias entre Modalidades

| Característica | Landing Interna | URL Externa |
|----------------|-----------------|-------------|
| Pasos | 8 | 5 |
| Tiempo | ~60 segundos | ~30 segundos |
| Datos guardados | Completos | Mínimos |
| Editores | ✅ Sí | ❌ No |
| Dashboard | ✅ Sí | ❌ No |
| Aparece en directorio | ✅ Sí | ✅ Sí |
| Landing propia | ✅ Sí | ❌ Redirige |
| Métricas | ✅ Sí | ⚠️ Limitadas |

---

## 🔧 Funciones Auxiliares

### `generarSlug(nombre: string): string`
- Convierte nombre a slug URL-friendly
- Normaliza caracteres especiales
- Reemplaza espacios por guiones
- Ejemplo: "Café & Té" → "cafe-te"

### `formatearTelefono(valor: string): string`
- Formatea teléfono a (XXX) XXX-XXXX
- Limita a 10 dígitos
- Aplica formato en tiempo real

### `obtenerIniciales(nombre: string): string`
- Extrae primeras letras de primeras 2 palabras
- Ejemplo: "Tacos El Güero" → "TE"

### `slugUnico(base: string): string`
- Verifica que slug no exista
- Agrega sufijo numérico si duplicado
- Ejemplo: "tacos-el-guero-2"

---

## 🎨 Colores de Marca Predefinidos

```typescript
export const COLORES_MARCA = [
  "#F59E0B", // Naranja (por defecto)
  "#3B82F6", // Azul
  "#10B981", // Verde
  "#EF4444", // Rojo
  "#8B5CF6", // Morado
  "#EC4899", // Rosa
];
```

---

## 📱 Experiencia de Usuario

### Feedback Visual
- ✅ Slug generado en tiempo real
- ✅ Categoría detectada automáticamente
- ✅ Preview de logo al subir
- ✅ Formato de teléfono automático
- ✅ Validaciones con SweetAlert2
- ✅ Loading state durante envío
- ✅ Confirmación de registro exitoso

### Mensajes de Error
- Campos vacíos
- Formato inválido
- Imagen muy pesada
- URL inválida
- Error de conexión

---

## 🔄 Próximas Mejoras

- [ ] Validación de slug duplicado en tiempo real
- [ ] Autocompletado de dirección con Google Maps
- [ ] Crop de imagen antes de subir
- [ ] Compresión automática de imágenes
- [ ] Guardado de borrador (localStorage)
- [ ] Recuperación de sesión

---

**Archivo:** `componentes/FormularioRegistro.tsx`  
**Base de datos:** `database/negociosRegistrados.ts`  
**Tipos:** `database/tiposRegistro.ts`  
**Cloudinary:** `lib/cloudinary.ts`
