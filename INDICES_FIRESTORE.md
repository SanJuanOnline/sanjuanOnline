# Índices de Firestore para San Juan Online

## 📋 Instrucciones

Para optimizar las consultas y soportar 10,000+ negocios, necesitas crear estos índices en Firebase Firestore.

### Cómo crear índices:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: **sanjuanonline-3e042**
3. En el menú lateral: **Firestore Database** → **Indexes**
4. Click en **Create Index**
5. Crea cada índice según las especificaciones abajo

---

## 🔍 Índices Requeridos

### Índice 1: Búsqueda por categoría ordenada
- **Collection ID:** `negocios`
- **Fields indexed:**
  - `categoria` → Ascending
  - `nombre` → Ascending
- **Query scope:** Collection

**Uso:** Listados de categorías con orden alfabético

---

### Índice 2: Negocios reales (sin demos)
- **Collection ID:** `negocios`
- **Fields indexed:**
  - `esDemostracion` → Ascending
  - `nombre` → Ascending
- **Query scope:** Collection

**Uso:** Filtrar negocios de demostración

---

### Índice 3: Por plan de suscripción
- **Collection ID:** `negocios`
- **Fields indexed:**
  - `planSuscripcion` → Ascending
  - `nombre` → Ascending
- **Query scope:** Collection

**Uso:** Filtrar por plan (básico, estándar, premium)

---

### Índice 4: Solicitudes personalizadas por estado
- **Collection ID:** `solicitudesPersonalizadas`
- **Fields indexed:**
  - `estado` → Ascending
  - `fechaSolicitud` → Descending
- **Query scope:** Collection

**Uso:** Panel de admin - gestión de solicitudes

---

## ⚡ Índices Automáticos

Firestore crea automáticamente índices de campo único. Ya tienes:
- `categoria`
- `nombre`
- `planSuscripcion`
- `uid`

---

## 🧪 Verificar Índices

Después de crear los índices, prueba estas consultas en tu app:

1. **Categorías:** Ve a cualquier categoría (ej: `/comida-rapida`)
2. **Búsqueda:** Usa el buscador en el Home
3. **Admin:** Accede al panel de administración

Si ves errores en la consola sobre índices faltantes, Firebase te dará un link directo para crearlos.

---

## 📊 Monitoreo

En Firebase Console → Firestore → Usage:
- Verifica lecturas/escrituras diarias
- Asegúrate de estar bajo el límite gratuito (50K lecturas/día)
- Con paginación, deberías estar muy por debajo

---

## 🚀 Optimizaciones Implementadas

✅ Paginación (20 negocios por página)
✅ `getCountFromServer()` para contadores (no descarga documentos)
✅ `limit()` en todas las consultas
✅ Búsqueda optimizada con filtrado en cliente
✅ Caché de sesión en Home

**Resultado:** Escalable hasta 100,000+ negocios sin problemas de rendimiento.
