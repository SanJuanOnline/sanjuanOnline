import { collection, doc, getDocs, getDoc, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Negocio, TipoCategoria } from "./tiposNegocios";

const COL = "negocios";

export async function obtenerNegociosPorCategoria(categoria: TipoCategoria): Promise<Negocio[]> {
  const q = query(collection(db, COL), where("categoria", "==", categoria));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as Negocio);
}

export async function obtenerNegocioPorSlug(slug: string): Promise<Negocio | null> {
  const snap = await getDoc(doc(db, COL, slug));
  return snap.exists() ? (snap.data() as Negocio) : null;
}

export async function obtenerTodosLosNegocios(): Promise<Negocio[]> {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => d.data() as Negocio);
}
