Flujo de Operaciones - San Juan Online
1. Entrada y Carga

Usuario entra al sitio (URL raíz)      │      ▼Spinner.tsx (Progreso 0-100%)(Solo se renderiza en la carga inicial o recarga de App.tsx)      │      ▼Home.tsx (Landing Principal)(Contiene: Banner San Juan, Grid de Categorías)
2. Navegación por Categoría

Usuario selecciona una categoría (Ej: Comida Rápida)      │      ▼Ruta Dinámica: /comida-rapida (Archivo: app/comida-rapida/page.tsx)      │      ▼GridNegocios.tsx (Recibe array de negocios filtrados)      │      ├─ Filtra negocios: negocios.filter(n => n.categoria === categoria)      ├─ Ordena por planSuscripcion (VIP → Estándar → Básico)      └─ Renderiza Grid Responsivo (1/2/3 columnas)      │      ▼Grid de Tarjetas (TarjetaNegocio.tsx)      ├─ VIP: Badge dorado con gradiente      ├─ Estándar: Badge azul      └─ Básico: Badge gris      ├─ Botón "Ir al Sitio" (externos)      └─ Botón "Ver Más" (landing)
3. Selección de Negocio (Lógica de Enlace)

Usuario da clic en botón de TarjetaNegocio      │      ├─── [CASO A: Negocio con Web Externa] ───────────────────┐      │                                                         │      │   (Si tipoEnlace === "externo" y tiene urlExterna)    │      │                                                         ▼      │                                            Abre URL externa en nueva pestaña      │                                            (window.open(urlExterna, "_blank"))      │      └─── [CASO B: Negocio con Landing Interna] ───────────────┐                                                                │          (Si tipoEnlace === "landing")                        │                                                                ▼      Ruta Dinámica: /[categoria]/[slug]      (Archivo: app/[categoria]/[slug]/page.tsx)                                                                │                                                                ▼      LandingNegocio.tsx      ├─ Recibe slug desde params      ├─ Busca negocio: negocios.find(n => n.slug === slug)      ├─ Valida que tenga negocio.landing      ├─ Aplica colores personalizados (landing.colores)      └─ Renderiza secciones dinámicas según landing.secciones[]                                                                │                                                                ▼      Componentes de Landing:      ├─ LandingHeader (navegación con colores del negocio)      ├─ SeccionBanner, SeccionInformacion, SeccionProductos, etc.      ├─ BotonContacto (flotante con colores personalizados)      └─ LandingFooter (datos del negocio con colores personalizados)
4. Estructura de Carpetas Landing

app/
  └── [categoria]/
      └── [slug]/
          ├── layout.tsx          (Layout específico para landings, NO usa Header/Footer global)
          └── page.tsx            (Renderiza la landing del negocio)

componentes/
  └── uilanding/
      ├── TarjetaNegocio.tsx     (Tarjeta de negocio con botón)
      ├── GridNegocios.tsx       (Grid de tarjetas)
      ├── LandingHeader.tsx      (Header personalizado con colores del negocio)
      ├── LandingFooter.tsx      (Footer personalizado)
      ├── BotonContacto.tsx      (Botón flotante de acción)
      └── secciones/             (Componentes para cada tipo de sección)
          ├── SeccionBanner.tsx
          ├── SeccionInformacion.tsx
          ├── SeccionProductos.tsx
          ├── SeccionGaleria.tsx
          ├── SeccionTestimonios.tsx
          └── SeccionContacto.tsx

5. Notas Técnicas de Navegación

    Layout: Home y páginas de Categorías usan layout.tsx global (Header/Footer).
    Aislamiento: Landings de negocios usan layout.tsx propio (LandingHeader/LandingFooter).
    Datos: Todos los negocios provienen de database/dbNegocios.ts con tipos de database/tiposNegocios.ts.
    Campos clave de Negocio:
      - categoria: TipoCategoria (para filtrado)
      - slug: string (para rutas dinámicas)
      - tipoEnlace: "landing" | "externo" (determina navegación)
      - planSuscripcion: "vip" | "estandar" | "basico" (determina badge)
      - landing?: LandingData (datos para renderizar landing interna)
      - landing.colores: { primario, secundario } (colores personalizados)
      - landing.secciones: Seccion[] (array de secciones a renderizar)