"use client";

import React, { useState, FormEvent } from "react";
import { useNegocios } from "../context/NegociosContext";
import { TipoCategoria } from "../tipos/negocios.tipos";
import { v4 as uuid } from "uuid";

const CATEGORIAS: TipoCategoria[] = [
  "restaurantes",
  "comida-rapida",
  "entretenimiento",
  "servicios",
  "salud",
  "mantenimiento",
  "mascotas",
];

export default function FormularioGratis({ onClose }: { onClose: () => void }) {
  const { agregarNegocio } = useNegocios();
  const [nombre, setNombre] = useState("");
  const [slug, setSlug] = useState("");
  const [categoria, setCategoria] = useState<TipoCategoria>("restaurantes");
  const [urlExterna, setUrlExterna] = useState("");
  const [logo, setLogo] = useState("");
  const [slogan, setSlogan] = useState("");
  const [tipoEnlace, setTipoEnlace] = useState<"landing" | "externo">("externo");

  const generarSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nuevo = {
      id: uuid(),
      slug: slug || generarSlug(nombre),
      nombre,
      logo: logo || "/logos/default.png",
      slogan,
      categoria,
      destacado: false,
      tipoEnlace,
      urlExterna: urlExterna || undefined,
    };
    agregarNegocio(nuevo as any);
    alert("Negocio agregado (temporal)");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">Registrar negocio gratis</h2>
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          required
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
            setSlug(generarSlug(e.target.value));
          }}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Slug</label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Categoría</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value as TipoCategoria)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Tipo de enlace</label>
        <select
          value={tipoEnlace}
          onChange={(e) => setTipoEnlace(e.target.value as "landing" | "externo")}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="externo">Externo</option>
          <option value="landing">Landing</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">URL externa</label>
        <input
          value={urlExterna}
          onChange={(e) => setUrlExterna(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Logo (URL)</label>
        <input
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Slogan</label>
        <input
          value={slogan}
          onChange={(e) => setSlogan(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}
