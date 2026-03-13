Flujo de Operaciones - San Juan Online
1. Entrada y Carga

Usuario entra al sitio (URL raíz)      │      ▼Spinner.tsx (Progreso 0-100%)(Solo se renderiza en la carga inicial o recarga de App.tsx)      │      ▼Home.tsx (Landing Principal)(Contiene: Banner San Juan, Grid de Categorías)
2. Navegación por Categoría

Usuario selecciona una categoría (Ej: Comida Rápida)      │      ▼Ruta Dinámica: /comida-rapida (Archivo: app/comida-rapida/page.tsx)      │      ▼Grid de Tarjetas (TarjetaNegocios.tsx)(Renderiza lista filtrada desde negocios.db)
3. Selección de Negocio (Lógica de Enlace)

Usuario da clic en una TarjetaNegocios      │      ├─── [CASO A: Negocio con Web Externa] ───────────────────┐      │                                                         │      │   (Si tipoEnlace == "externo" o tiene URL propia)     │      │                                                         ▼      │                                            Abre URL externa en nueva pestaña      │                                            (Target="_blank")      │      └─── [CASO B: Negocio con Landing Interna] ───────────────┐                                                                │          (Si tipoEnlace == "landing" o es plan Básico/Free)  │                                                                ▼      Ruta Dinámica: /comida-rapida/[slug]      (Archivo: app/comida-rapida/[slug]/page.tsx)                                                                │                                                                ▼      LandingClientes.tsx      (Renderiza HeaderLanding, Secciones, FooterLanding)                                                                │                                                                ▼      Interacción Final      Botones de contacto (WhatsApp, Maps, Teléfono) y redes sociales.
4. Notas Técnicas de Navegación

    Layout: Tanto Home como las páginas de Categorías usan LayoutDirectorio.tsx (Header/Footer global).
    Aislamiento: LandingClientes.tsx usa sus propios componentes (HeaderLanding, FooterLanding) y no muestra el Header global.