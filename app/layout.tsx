import type { Metadata } from "next";
import "./globals.css";
import { TemaProvider } from "../context/TemaContext";

export const metadata: Metadata = {
  title: "San Juan Online",
  description: "Directorio digital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-900 transition-colors">
        <TemaProvider>{children}</TemaProvider>
      </body>
    </html>
  );
}
