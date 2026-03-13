
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/src/componentes/ThemeProvider";
import { NegociosProvider } from "@/src/context/NegociosContext";

export const metadata: Metadata = {
  title: "San Juan Online",
  description: "Tu guía de confianza para explorar y disfrutar de la Ciudad de San Juan.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NegociosProvider>
            {children}
          </NegociosProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
