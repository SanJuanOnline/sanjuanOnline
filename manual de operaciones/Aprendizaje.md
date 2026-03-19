# 📚 Aprendizaje - San Juan Online

**Guía educativa para entender y replicar procesos del proyecto**

---

## 🎯 Propósito de este documento

Este documento es tu **profesor personal**. Aquí encontrarás explicaciones detalladas de cómo funcionan los scripts y procesos del proyecto, para que puedas:

1. Entender qué hace cada línea de código
2. Modificar scripts según tus necesidades
3. Crear tus propios scripts similares
4. Resolver problemas cuando algo falle

---

## 📝 LECCIÓN 1: Cómo agregar negocios a Firestore con un script

### ¿Qué problema resolvemos?

Necesitamos agregar múltiples negocios a Firestore de forma rápida y sin errores. Hacerlo manualmente desde la consola de Firebase sería tedioso y propenso a errores.

### Solución: Script automatizado

Creamos un script TypeScript que:
1. Se conecta a Firestore
2. Lee un array de negocios
3. Los guarda uno por uno en la base de datos

---

## 🔧 Anatomía del script: `agregarNegociosGAM-simple.ts`

### Parte 1: Importaciones y configuración

```typescript
import { config } from "dotenv";
config({ path: ".env.local" });
```

**¿Qué hace?**
- `dotenv` es una librería que lee archivos `.env` y carga las variables de entorno
- `config({ path: ".env.local" })` le dice que lea específicamente el archivo `.env.local`
- Esto es necesario porque Node.js no lee automáticamente archivos `.env` como lo hace Next.js

**¿Por qué es importante?**
- Sin esto, el script no tendría acceso a las credenciales de Firebase
- Las credenciales están en `.env.local` y NUNCA deben estar en el código

---

```typescript
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
```

**¿Qué hace?**
- Importa las funciones necesarias de Firebase
- `initializeApp`: inicializa la conexión con Firebase
- `getFirestore`: obtiene la instancia de Firestore
- `collection`, `doc`, `setDoc`: funciones para trabajar con documentos

**Diferencia clave:**
- En `lib/firebase.ts` también importamos `getAuth` (autenticación)
- En este script NO lo importamos porque causa errores en Node.js
- Solo necesitamos Firestore, no Auth

---

```typescript
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
```

**¿Qué hace?**
- `firebaseConfig`: objeto con las credenciales de Firebase
- `process.env.VARIABLE`: lee variables de entorno cargadas por dotenv
- `initializeApp(firebaseConfig)`: conecta con tu proyecto de Firebase
- `getFirestore(app)`: obtiene acceso a la base de datos Firestore

**Nota importante:**
- Estas credenciales son las mismas que están en `.env.local`
- Son públicas (empiezan con `NEXT_PUBLIC_`) porque se usan en el navegador
- La seguridad real está en las reglas de Firestore, no en ocultar estas claves

---

### Parte 2: Estructura de datos

```typescript
const negocios = [
  {
    slug: "subway-gam",
    nombre: "Subway GAM",
    giro: "Comida rápida",
    categoria: "comida-rapida",
    telefono: "5555551001",
    whatsapp: "5555551001",
    direccion: "Av. Insurgentes Norte 1234, Gustavo A. Madero, CDMX",
    descripcion: "Sándwiches frescos y saludables...",
    colorMarca: "#008C15",
    logoBase64: null,
    planSuscripcion: "basico",
    tipoLanding: "interna",
    urlExterna: null,
    uid: "demo-gam",
    esDemostracion: true
  },
  // ... más negocios
];
```

**¿Qué hace?**
- Define un array (lista) de objetos
- Cada objeto representa un negocio con todos sus datos
- La estructura debe coincidir con la interface `Negocio` en `database/tiposNegocios.ts`

**Campos importantes:**
- `slug`: ID único del negocio, se usa como ID del documento en Firestore
- `categoria`: debe ser una de las 9 categorías válidas
- `planSuscripcion`: "basico", "estandar" o "vip"
- `tipoLanding`: "interna" o "externa"
- `esDemostracion`: true para negocios de prueba

**¿Cómo agregar más negocios?**
1. Copia un objeto existente
2. Cambia el `slug` (debe ser único)
3. Cambia los demás campos según el negocio
4. Asegúrate de que la `categoria` sea válida

---

### Parte 3: Función principal

```typescript
async function agregarNegocios() {
  console.log("🚀 Iniciando carga de negocios GAM...\n");
  
  let exitosos = 0;
  let errores = 0;

  for (const negocio of negocios) {
    try {
      await setDoc(doc(db, "negocios", negocio.slug), negocio);
      console.log(`✅ ${negocio.nombre} (${negocio.categoria})`);
      exitosos++;
    } catch (error) {
      console.error(`❌ Error en ${negocio.nombre}:`, error);
      errores++;
    }
  }

  console.log(`\n📊 Resumen:`);
  console.log(`   ✅ Exitosos: ${exitosos}`);
  console.log(`   ❌ Errores: ${errores}`);
  console.log(`   📦 Total: ${negocios.length}`);
  console.log(`\n🎉 ¡Proceso completado!`);
}

agregarNegocios().catch(console.error);
```

**Desglose línea por línea:**

1. `async function agregarNegocios()`: función asíncrona (puede esperar operaciones)

2. `let exitosos = 0; let errores = 0;`: contadores para el resumen final

3. `for (const negocio of negocios)`: recorre cada negocio del array

4. `try { ... } catch (error) { ... }`: manejo de errores
   - Si algo falla, no detiene todo el script
   - Solo marca ese negocio como error y continúa

5. `await setDoc(doc(db, "negocios", negocio.slug), negocio)`:
   - `doc(db, "negocios", negocio.slug)`: referencia al documento
     - `db`: base de datos
     - `"negocios"`: nombre de la colección
     - `negocio.slug`: ID del documento
   - `setDoc(...)`: guarda el documento
   - `await`: espera a que termine antes de continuar

6. `console.log(...)`: imprime en consola para ver el progreso

7. `agregarNegocios().catch(console.error)`: ejecuta la función y captura errores globales

---

## 🚀 Cómo usar el script

### Paso 1: Asegúrate de tener las dependencias

```bash
npm install dotenv
```

### Paso 2: Verifica que `.env.local` existe y tiene las credenciales

```bash
ls -la .env.local
```

Debe contener:
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### Paso 3: Ejecuta el script

```bash
npx tsx scripts/agregarNegociosGAM-simple.ts
```

**¿Qué hace `npx tsx`?**
- `npx`: ejecuta paquetes de npm sin instalarlos globalmente
- `tsx`: ejecutor de TypeScript (como `ts-node` pero más rápido)
- Permite ejecutar archivos `.ts` directamente sin compilar

### Paso 4: Verifica en Firebase Console

1. Ve a https://console.firebase.google.com
2. Selecciona tu proyecto
3. Ve a Firestore Database
4. Verifica que los documentos se crearon en la colección `negocios`

---

## 🎓 Ejercicio práctico: Crea tu propio script

### Objetivo: Agregar 3 negocios de tu colonia

1. **Copia el script:**
   ```bash
   cp scripts/agregarNegociosGAM-simple.ts scripts/agregarNegociosMiColonia.ts
   ```

2. **Modifica el array `negocios`:**
   - Borra los negocios existentes
   - Agrega 3 negocios reales de tu colonia
   - Usa slugs únicos (ej: `tacos-don-pepe`, `farmacia-lupita`)

3. **Ejecuta tu script:**
   ```bash
   npx tsx scripts/agregarNegociosMiColonia.ts
   ```

4. **Verifica en la app:**
   - Ve a la categoría correspondiente
   - Busca tus negocios
   - Verifica que aparezcan correctamente

---

## ⚠️ Errores comunes y soluciones

### Error: "Firebase: Error (auth/invalid-api-key)"

**Causa:** El script está importando `getAuth` de Firebase Auth

**Solución:** Usa `agregarNegociosGAM-simple.ts` que NO importa Auth

---

### Error: "Cannot find module 'dotenv'"

**Causa:** No tienes instalado dotenv

**Solución:**
```bash
npm install dotenv
```

---

### Error: "Document already exists"

**Causa:** Ya existe un negocio con ese `slug`

**Solución:**
- Cambia el `slug` a uno único
- O elimina el documento existente desde Firebase Console

---

### Error: "Permission denied"

**Causa:** Las reglas de Firestore no permiten escritura

**Solución temporal (solo desarrollo):**
```
allow read, write: if true;
```

**Solución producción:**
```
allow read: if true;
allow write: if request.auth != null;
```

---

## 📖 Conceptos clave para entender

### 1. ¿Qué es Firestore?

Base de datos NoSQL de Firebase que almacena datos en:
- **Colecciones**: carpetas que contienen documentos (ej: `negocios`)
- **Documentos**: objetos JSON con un ID único (ej: `subway-gam`)

### 2. ¿Qué es un slug?

Identificador único amigable para URLs:
- ✅ Bueno: `tacos-el-gordo`
- ❌ Malo: `Tacos El Gordo!!!`

Características:
- Solo letras minúsculas, números y guiones
- Sin espacios, acentos ni caracteres especiales
- Único en toda la colección

### 3. ¿Qué es async/await?

Forma moderna de manejar operaciones asíncronas:
- `async`: marca una función como asíncrona
- `await`: espera a que una promesa se resuelva
- Permite escribir código asíncrono como si fuera síncrono

Ejemplo:
```typescript
// Sin await (difícil de leer)
setDoc(doc(db, "negocios", slug), data)
  .then(() => console.log("Guardado"))
  .catch(error => console.error(error));

// Con await (más claro)
try {
  await setDoc(doc(db, "negocios", slug), data);
  console.log("Guardado");
} catch (error) {
  console.error(error);
}
```

### 4. ¿Qué es try/catch?

Manejo de errores:
- `try { ... }`: intenta ejecutar el código
- `catch (error) { ... }`: si falla, ejecuta esto
- Evita que un error detenga todo el programa

---

## 🔍 Debugging: Cómo encontrar problemas

### 1. Agrega console.log estratégicos

```typescript
console.log("1. Iniciando script...");
console.log("2. Conectando a Firebase...");
console.log("3. Procesando negocio:", negocio.nombre);
console.log("4. Guardado exitoso");
```

### 2. Verifica las variables

```typescript
console.log("Slug:", negocio.slug);
console.log("Categoría:", negocio.categoria);
console.log("Datos completos:", JSON.stringify(negocio, null, 2));
```

### 3. Captura errores específicos

```typescript
try {
  await setDoc(doc(db, "negocios", negocio.slug), negocio);
} catch (error) {
  console.error("Error completo:", error);
  console.error("Mensaje:", error.message);
  console.error("Código:", error.code);
}
```

---

## 📚 Recursos adicionales

### Documentación oficial

- **Firebase Firestore:** https://firebase.google.com/docs/firestore
- **TypeScript:** https://www.typescriptlang.org/docs
- **Node.js:** https://nodejs.org/docs

### Comandos útiles

```bash
# Ver estructura de Firestore
firebase firestore:indexes

# Exportar datos de Firestore
firebase firestore:export backup/

# Importar datos a Firestore
firebase firestore:import backup/

# Ver logs de Firebase
firebase functions:log
```

---

## 🎯 Próximos pasos de aprendizaje

1. **Modifica el script para:**
   - Leer negocios desde un archivo CSV
   - Generar slugs automáticamente desde el nombre
   - Validar datos antes de guardar

2. **Crea scripts para:**
   - Actualizar negocios existentes
   - Eliminar negocios de prueba
   - Migrar datos entre colecciones

3. **Aprende sobre:**
   - Queries complejas en Firestore
   - Índices compuestos
   - Transacciones y batch writes

---

**Última actualización:** 17 Marzo 2026, 23:08
**Autor:** Kiro (tu asistente de IA)
**Para:** Enrique Vargas (desarrollador de San Juan Online)
