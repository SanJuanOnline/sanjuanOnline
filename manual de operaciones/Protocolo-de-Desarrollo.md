Aquí tienes tu documento **Protocolo de Desarrollo** totalmente reorganizado, limpio y estructurado por Módulos para facilitar el trabajo del agente de desarrollo.

Simplemente copia y pega este contenido en tu archivo:

```markdown
# Protocolo de Desarrollo - San Juan Online

## 1. Información General del Proyecto
*   **Nombre del Proyecto:** San Juan Online.
*   **Propietario:** Enrique Vargas.
*   **Descripción:** Directorio digital para las secciones 1 a la 7 y sus alrededores (incluye Conilas). Plataforma para conectar negocios locales con usuarios.
*   **Alcance:** App Web PWA.

## 2. Reglas de Oro (Desarrollo)
1.  **Tipado Estricto:** NUNCA usar `any`. Siempre utilizar datos tipados (Interfaces/Types).
2.  **Metodología:** Desarrollo por Fases o Módulos. No pasar a la siguiente fase hasta completar la actual.
3.  **Estructura:** NUNCA cambiar nombres de archivos o carpetas una vez creados.
4.  **Control de Calidad:** Correr `npm run build` al finalizar las fases críticas antes de avanzar.

## 3. Tecnologías y Dependencias
Instalar las siguientes librerías al iniciar el proyecto:
*   **UI:** `lucide-react` (iconos), `@mui/material` (Material UI), `sweetalert2`.
*   **Estado/Formularios:** `react-hook-form`, `zustand` (manejo de estado global).
*   **PWA:** Configurar `react-pwa` y el archivo `manifest.json` con la metadata de San Juan Online.

---

## 🧱 MÓDULO 1: INFRAESTRUCTURA Y HOME (El Contenedor)
*Objetivo: Tener la base funcional, el layout global y la página principal.*

### FASE 1: Spinner de Carga y Root
1.  **Componente `Spinner.tsx`:**
    *   Crear una barra de incremento en la parte inferior que cambie de color de 0% a 100%.
    *   Agregar logo de San Juan (desde `/public`).
    *   Agregar slogan: "Directorio digital para negocios pequeños listos para entrar al mundo digital".
    *   **Comportamiento:** Renderiza `App.tsx`. `App.tsx` renderiza `Home.tsx`.
    *   **Lógica:** Solo aparece una vez al entrar o recargar la página. No en navegación interna.
    *   **Estilo:** Imagen a pantalla completa en móviles y proporcional en PC.
2.  **Verificación:** Correr `build`.

### FASE 2: Layout Global, Header y Footer
1.  **Layout Global (`LayoutDirectorio.tsx`):**
    *   Ubicado en `src/layouts`.
    *   Debe contener la lógica para el **Modo Oscuro**.
    *   Es único para `Home` y las páginas de categorías.
2.  **Header (`Header.tsx`):**
    *   **Versión Móvil:** Menú tipo hamburguesa.
    *   **Versión PC:** Barra estándar.
    *   Funcionalidades: Buscador, Campanita de notificaciones, Rutas correctas.
    *   Páginas con iconos (Lucide) sin texto: `Cuenta.tsx` y `Ajustes.tsx`.
        *   `Cuenta.tsx`: Renderizará datos del usuario (pendiente lógica registro).
        *   `Ajustes.tsx`: Modo oscuro (icono y nombre), botón descarga App (URL Google Play por defecto), "Creado por Enrique Vargas", versión de la app.
3.  **Footer (`Footer.tsx`):**
    *   Mantener datos existentes.
    *   Agregar iconos de redes sociales: X, YouTube, Instagram, Facebook, Threads, TikTok (URLs por defecto).
4.  **Componente Zona VIP:**
    *   Crear componente dentro de `Ajustes.tsx` (Grid de tarjetas globales para cupones). Dejar en construcción.
5.  **Verificación:** Correr `build`.

### FASE 3: Página Principal (Home.tsx)
1.  **Campaña Publicitaria:**
    *   Banner principal con overlay usando `sanjuan.jpg`.
    *   Título y slogan delante de la imagen.
    *   Crear secciones de presentación (Carta de presentación).
    *   Enfoque: "Ayudar a comercios a tener un lugar en internet, no importa el tamaño".
2.  **Navegación Categorías:**
    *   Grid o botones para navegar a las categorías.

---

## 🧱 MÓDULO 2: LANDINGS DE NEGOCIO (El Producto)
*Objetivo: Crear las páginas individuales de cada negocio aisladas del resto.*

### FASE 4: Estructura de Rutas Dinámicas (SLUGs)
1.  **Creación de Carpetas de Categorías:**
    *   Crear estructura en `app/` para las categorías principales: `comida-rapida`, `restaurantes`, `entretenimiento`, `servicios`, `mantenimiento`, `salud`, `hoteles`.
    *   Cada carpeta contiene `page.tsx` que renderiza `<CategoriaGenerica categoria="nombre" />`.
2.  **Ruta Unificada para Landings:**
    *   Crear carpeta `app/negocio/[slug]/page.tsx` para TODAS las landings de negocios.
    *   Esta ruta unificada recibe el slug y renderiza `<LandingClientes />`.
    *   URLs resultantes: `/negocio/tortas-juan`, `/negocio/hotel-paraiso`, etc.
    *   **Importante:** NO crear `[slug]` dentro de cada categoría. Usar ruta centralizada.

### FASE 5: Componente LandingNegocio (`LandingClientes.tsx`)
1.  **Arquitectura del Componente:**
    *   Debe recibir los datos del negocio (según estructura del array `negocios.db`).
    *   Estilos dinámicos: Configurar archivo para modificar colores (`HeaderLanding`, `FooterLanding`), tipografías, etc. Dejar comentado para principiantes.
2.  **Sub-componentes:**
    *   **HeaderLanding.tsx:** Navegación interna, responsivo (hamburguesa móvil), campana notificaciones propia.
    *   **FooterLanding.tsx:** Recibe valores del array.
    *   **BotonesContacto.tsx:** Integrar en el layout.
3.  **Contenido:**
    *   Renderizar secciones (Banner, Info, Productos, Galería, etc.) basándose en el JSON del negocio.

---

## 🧱 MÓDULO 3: CONEXIÓN Y TARJETAS (El Enlace)
*Objetivo: Conectar Home con las Landings a través de las tarjetas.*

### FASE 6: TarjetaNegocios.tsx y Categorías
1.  **Componente `TarjetaNegocio.tsx`:**
    *   Renderiza datos del array `negocios.db.ts` correctamente.
    *   Crear 3 variantes según `planSuscripcion`:
        *   **VIP:** Ocupa 4 cols (md) / 6 cols (lg). Grande, gradientes accent, badge destacado.
        *   **Estándar:** Ocupa 2 cols (md) / 3 cols (lg). Tamaño medio, colores primary.
        *   **Básica:** Ocupa 2 cols (md) / 2 cols (lg). Pequeña, colores neutros.
    *   Lógica de navegación:
        *   Si `tipoEnlace === "externo"` → `window.open(urlExterna, "_blank")`
        *   Si `tipoEnlace === "landing"` → `router.push(/negocio/${slug})`
2.  **Componente `CategoriaGenerica.tsx`:**
    *   Recibe prop `categoria` (string).
    *   Filtra negocios: `negocios.filter(n => n.categoria === categoria)`.
    *   Ordena por prioridad: VIP → Estándar → Básico.
    *   Grid responsivo: `grid-cols-1 md:grid-cols-4 lg:grid-cols-6` para que respete los `col-span` dinámicos.
    *   Renderiza header con icono, nombre de categoría y contador.
3.  **Páginas de Categorías:**
    *   Cada categoría (comida-rapida, restaurantes, etc.) tiene su `page.tsx` que renderiza `<CategoriaGenerica categoria="nombre-categoria" />`.
4.  **Verificación:** Correr `build`.

---

## 🧱 MÓDULO 4: LÓGICA DE DATOS Y USUARIO
*Objetivo: Funcionalidades de registro y administración de datos.*

### FASE 7: Modal de Registro y Formularios
1.  **Modal Registro:**
    *   Lógica de precios: Primeros 100 gratis, siguientes 50% descuento, siguientes 25% descuento.
    *   Contador visual 0-100.
    *   Inputs: Nombre negocio, Giro, Logo (con opción "No tengo logo").
    *   Botones: "Registro Gratis" y "Registro Premium".
2.  **Formularios:**
    *   `FormularioGratis.tsx`: Leer cuidadosamente `negocios.ts` para solicitar datos exactos.
    *   **Lógica:** Crear archivo local para guardar datos. Al rellenar, debe automatizarse en el array local para renderizado inmediato (simulación de BD).
    *   `FormularioLanding.tsx`: Para landing de precios personalizada.

### FASE 8: Preparación Base de Datos
1.  **Migración:**
    *   Crear archivo listo para recibir `negocios.db`.
    *   Dejar todo comentado y listo para migrar de array local a Base de Datos real.
    *   Integrar todos los negocios por categoría.

---

## 📋 Notas Finales y Pendientes
*   Verificar errores en el flujo de navegación (Home -> Categoría -> Negocio).
*   **Pendientes:**
    *   Lógica de búsqueda (Search Bar).
    *   Lógica de autollenado de páginas al registrar.
    *   Lógica de llenado automático del formulario.
```


---

# 🔴 LÍNEA DE CORTE - SESIÓN 13 MARZO 2026 🔴

## ✅ COMPLETADO HOY

### Sistema de Diseño
- ✅ Paleta de colores profesional (Primary azul, Accent dorado, Success verde)
- ✅ Spinner mejorado con gradientes y animaciones
- ✅ Home rediseñado completamente (Hero, Categorías, Misión, Stats)
- ✅ Header y Footer actualizados con nueva paleta
- ✅ TarjetaNegocio con 3 variantes (VIP, Estándar, Básica)

### Estructura de Rutas
- ✅ Carpetas [slug] creadas para todas las categorías
- ✅ CategoriaGenerica.tsx (componente reutilizable)
- ✅ Páginas de categorías funcionando

### Landing (Parcial)
- ✅ LandingClientes.tsx mejorado
- ✅ SeccionBanner.tsx con diseño profesional

## 🚧 CONTINUAR MAÑANA DESDE AQUÍ

### Prioridad 1: Completar Secciones de Landing
- [ ] SeccionInformacion.tsx
- [ ] SeccionProductos.tsx
- [ ] SeccionGaleria.tsx
- [ ] SeccionTestimonios.tsx
- [ ] SeccionContacto.tsx
- [ ] HeaderLanding.tsx
- [ ] FooterLanding.tsx
- [ ] BotonesContacto.tsx (flotantes)

### Prioridad 2: Modal de Registro (FASE 7)
- [ ] ModalRegistro.tsx mejorado
- [ ] FormularioGratis.tsx con contador 0-100

### Prioridad 3: Ajustes y Cuenta (FASE 8)
- [ ] Ajustes.tsx (modo oscuro, descarga app)
- [ ] Cuenta.tsx (perfil usuario)

**Archivos principales modificados hoy:**
- tailwind.config.js
- globals.css
- Spinner.tsx
- Home.tsx
- Header.tsx
- Footer.tsx
- TarjetaNegocio.tsx
- CategoriaGenerica.tsx (nuevo)
- LandingClientes.tsx
- SeccionBanner.tsx

**Última actualización:** 13 Marzo 2026, 05:46 AM
