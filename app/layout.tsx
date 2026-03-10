"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";
import Spinner from "@/src/componentes/Spinner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    const duracionTotal = 3000; // 3 segundos
    const intervalo = 30; // Actualización cada 30ms
    const incremento = 100 / (duracionTotal / intervalo);

    const timer = setInterval(() => {
      setProgreso((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 200);
          return 100;
        }
        return prev + incremento;
      });
    }, intervalo);

    return () => clearInterval(timer);
  }, []);

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {loading ? (
          <Spinner progreso={Math.min(progreso, 100)} />
        ) : (
          children
        )}
      </body>
    </html>
  );
}