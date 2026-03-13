Flujo de Operaciones - San Juan Online
1. Entrada y Carga

Usuario entra al sitio (URL raíz)      │      ▼Spinner.tsx (Progreso 0-100%)(Solo se renderiza en la carga inicial o recarga de App.tsx)      │      ▼Home.tsx (Landing Principal)(Contiene: Banner San Juan, Grid de Categorías)
2. Navegación por Categoría

Usuario selecciona una categoría (Ej: Comida Rápida)      │      ▼Ruta Dinámica: /comida-rapida (Archivo: app/comida-rapida/page.tsx)      │      ▼CategoriaGenerica.tsx (Recibe prop: categoria="comida-rapida")      │      ├─ Filtra negocios: negocios.filter(n => n.categoria === categoria)      ├─ Ordena por planSuscripcion (VIP → Estándar → Básico)      └─ Renderiza Grid Responsivo (1/4/6 columnas)      │      ▼Grid de Tarjetas (TarjetaNegocio.tsx)      ├─ VIP: Ocupa 4 cols (md) / 6 cols (lg) - Grande y destacada      ├─ Estándar: Ocupa 2 cols (md) / 3 cols (lg) - Tamaño medio      └─ Básico: Ocupa 2 cols (md) / 2 cols (lg) - Tamaño pequeño
3. Selección de Negocio (Lógica de Enlace)

Usuario da clic en una TarjetaNegocio      │      ├─── [CASO A: Negocio con Web Externa] ───────────────────┐      │                                                         │      │   (Si tipoEnlace === "externo" y tiene urlExterna)    │      │                                                         ▼      │                                            Abre URL externa en nueva pestaña      │                                            (window.open(urlExterna, "_blank"))      │      └─── [CASO B: Negocio con Landing Interna] ───────────────┐                                                                │          (Si tipoEnlace === "landing")                        │                                                                ▼      Ruta Dinámica: /negocio/[slug]      (Archivo: app/negocio/[slug]/page.tsx)                                                                │                                                                ▼      LandingClientes.tsx      ├─ Recibe slug desde useParams()      ├─ Busca negocio: negocios.find(n => n.slug === slug)      ├─ Valida que tenga negocio.landing      └─ Renderiza secciones dinámicas según landing.secciones[]                                                                │                                                                ▼      Componentes de Landing:      ├─ HeaderLanding (navegación interna del negocio)      ├─ SeccionBanner, SeccionInformacion, SeccionProductos, etc.      ├─ BotonesContacto (flotantes: WhatsApp, Teléfono, Maps)      └─ FooterLanding (datos del negocio)
4. Notas Técnicas de Navegación

    Layout: Tanto Home como las páginas de Categorías usan LayoutDirectorio.tsx (Header/Footer global).
    Aislamiento: LandingClientes.tsx usa sus propios componentes (HeaderLanding, FooterLanding) y no muestra el Header global.
    Datos: Todos los negocios provienen del array negocios.db.ts con la interface Negocio.
    Campos clave de Negocio:
      - categoria: TipoCategoria (para filtrado)
      - slug: string (para rutas dinámicas)
      - tipoEnlace: "landing" | "externo" (determina navegación)
      - planSuscripcion: "vip" | "estandar" | "basico" (determina tamaño de tarjeta)
      - landing?: LandingData (datos para renderizar landing interna)