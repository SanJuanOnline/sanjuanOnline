import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TemaProvider } from "../context/TemaContext";
import { AuthProvider } from "../context/AuthContext";
import InstalarPWA from "../componentes/InstalarPWA";
import ActualizacionPWA from "../componentes/ActualizacionPWA";

export const metadata: Metadata = {
  title: "San Juan Online - Directorio Digital Local",
  description: "El primer directorio digital exclusivo para las secciones 1-7 y Conilas. Encuentra negocios locales: comida, servicios, entretenimiento y más.",
  keywords: ["San Juan", "directorio", "negocios locales", "Conilas", "comida rápida", "servicios"],
  authors: [{ name: "San Juan Online" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "San Juan Online",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "San Juan Online",
    title: "San Juan Online - Directorio Digital Local",
    description: "Encuentra los mejores negocios locales en San Juan",
  },
  twitter: {
    card: "summary",
    title: "San Juan Online",
    description: "Directorio digital de negocios locales",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e40af",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="bg-white dark:bg-slate-900 transition-colors">
        <TemaProvider>
          <AuthProvider>
            {children}
            <InstalarPWA />
            <ActualizacionPWA />
          </AuthProvider>
        </TemaProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Service Worker registrado con éxito:', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker falló:', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
