"use client";

import Header from "../componentes/Header";
import Footer from "../componentes/Footer";

interface Props {
  children: React.ReactNode;
}

export default function LayoutDirectorio({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
