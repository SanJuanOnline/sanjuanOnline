"use client";

import dynamic from "next/dynamic";

const AjustesContenido = dynamic(() => import("../../componentes/AjustesContenido"), { ssr: false });

export default function AjustesPage() {
  return <AjustesContenido />;
}
