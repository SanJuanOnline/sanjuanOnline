# 🏪 San Juan Online

**Directorio digital freemium para negocios locales**

[![Estado](https://img.shields.io/badge/Estado-87.5%25%20Completo-success)](https://sanjuan-online.vercel.app)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black)](https://sanjuan-online.vercel.app)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2014-blue)](https://nextjs.org)
[![Database](https://img.shields.io/badge/Database-Firebase-orange)](https://firebase.google.com)

---

## 🎯 Visión del Proyecto

San Juan Online es un **directorio digital con sistema de landing pages autogestionables** diseñado para ayudar a comercios locales de las Secciones 1-7 y alrededores (incluye Conilas) a tener presencia digital sin conocimientos técnicos.

### Modelo de Negocio

- **Plan Básico (Gratis):** Aparece en directorio con landing bloqueada
- **Plan Estándar ($300/año):** Acceso a editores para construir su propia landing
- **Plan Premium:** Landing 100% personalizada (cotización)

---

## ✨ Características Principales

### Para el Usuario Final
- 🔍 Búsqueda por categorías (8 categorías disponibles)
- 📱 Responsive y PWA (funciona como app móvil)
- 🌙 Modo oscuro
- ⚡ Carga rápida con Next.js 14

### Para el Dueño del Negocio
- 📝 Registro en 60 segundos (8 pasos inteligentes)
- 🎨 3 editores completos:
  - Productos (CRUD ilimitado)
  - Galería (hasta 12 imágenes)
  - Testimonios (hasta 10)
- 💳 Sistema de pago integrado
- 📊 Dashboard personal
- 🔄 Actualizaciones en tiempo real

### Para el Administrador
- 🛠️ Panel de administración completo
- 📋 Gestión de solicitudes personalizadas
- 📈 Estadísticas (próximamente)
- 🔔 Sistema de notificaciones (próximamente)

---

## 🚀 Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Estilos:** Tailwind CSS
- **Base de datos:** Firebase Firestore
- **Autenticación:** Firebase Auth (Email + Google)
- **Hosting:** Vercel
- **Iconos:** Lucide React
- **Alertas:** SweetAlert2

---

## 📊 Estado del Proyecto

### Módulos Completados (7/8)
- ✅ Módulo 1: Infraestructura y Home
- ✅ Módulo 2: Landings de Negocio
- ✅ Módulo 3: Directorio y Tarjetas
- ✅ Módulo 4: Datos y Firebase
- ✅ Módulo 5: Autenticación y Cuenta
- ✅ Módulo 6: Producción y Calidad (parcial)
- ✅ Módulo 7: Sistema Autogestionable
- ⏳ Módulo 8: Mejoras y Optimizaciones (en progreso)

**Progreso general:** 87.5%

---

## 🏗️ Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta de Firebase

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/SanJuanOnline/sanjuanOnline.git
cd sanjuanOnline

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Firebase

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📁 Estructura del Proyecto

```
sanjuanOnline/
├── app/                    # Rutas de Next.js (App Router)
├── componentes/            # Componentes React
│   ├── editores/          # Editores de contenido
│   └── uilanding/         # Componentes de landing
├── context/               # Context API (Auth, Tema)
├── database/              # Tipos y servicios de Firestore
├── layouts/               # Layouts reutilizables
├── lib/                   # Configuración (Firebase)
├── manual de operaciones/ # Documentación del proyecto
├── paginas/               # Páginas principales
├── public/                # Assets estáticos
└── scripts/               # Scripts de utilidad
```

---

## 🔐 Variables de Entorno

Crea un archivo `.env.local` con:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
NEXT_PUBLIC_ADMIN_ENABLED=true
```

---

## 📚 Documentación

- [Flujo de Operaciones](manual%20de%20operaciones/Flujo.md)
- [Protocolo de Desarrollo](manual%20de%20operaciones/Protocolo-de-Desarrollo.md)
- [Registro de Desarrollo](manual%20de%20operaciones/Registro-Desarrollo.md)

---

## 🎯 Roadmap

### Corto plazo (1 mes)
- [ ] Firebase Storage para imágenes
- [ ] Pasarela de pago real (Stripe/Mercado Pago)
- [ ] Testing con 10 negocios piloto

### Mediano plazo (3 meses)
- [ ] 100 negocios registrados
- [ ] Personalizador visual
- [ ] Analytics y métricas

### Largo plazo (6 meses)
- [ ] 200+ negocios
- [ ] Plan VIP con beneficios premium
- [ ] Expansión a otras colonias

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es privado y propiedad de **Enrique Vargas**.

---

## 👤 Autor

**Enrique Vargas**
- GitHub: [@SanJuanOnline](https://github.com/SanJuanOnline)
- Proyecto: [San Juan Online](https://sanjuan-online.vercel.app)

---

## 🙏 Agradecimientos

- Comunidad de Next.js
- Firebase por su plataforma
- Vercel por el hosting
- Todos los comerciantes de San Juan que inspiraron este proyecto

---

**Última actualización:** 16 Marzo 2026
