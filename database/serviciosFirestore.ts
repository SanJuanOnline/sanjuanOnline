import { collection, doc, getDocs, getDoc, query, where, updateDoc, addDoc, limit, startAfter, orderBy, DocumentSnapshot, getCountFromServer } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Negocio, TipoCategoria, TipoPlanSuscripcion } from "./tiposNegocios";

const COL = "negocios";
const LIMITE_PAGINA = 20;

function mapearNegocio(d: any): Negocio {
  const data = d.data ? d.data() : d;
  return {
    ...data,
    id: d.id ?? data.id,
    planSuscripcion: data.planSuscripcion ?? data.plan ?? "basico",
    imagen: data.imagen ?? data.logo ?? "",
    tipoEnlace: data.tipoEnlace ?? (data.tieneSitioWeb ? "externo" : "landing"),
  } as Negocio;
}

// ─── CONSULTAS OPTIMIZADAS CON PAGINACIÓN ────────────────────────────────────

export async function obtenerNegociosPorCategoria(
  categoria: TipoCategoria,
  limitePagina: number = LIMITE_PAGINA
): Promise<Negocio[]> {
  const q = query(
    collection(db, COL),
    where("categoria", "==", categoria),
    orderBy("nombre"),
    limit(limitePagina)
  );
  const snap = await getDocs(q);
  return snap.docs.map(mapearNegocio);
}

export async function obtenerNegociosPaginados(
  limitePagina: number = LIMITE_PAGINA,
  ultimoDoc?: DocumentSnapshot
): Promise<{ negocios: Negocio[]; ultimoDoc: DocumentSnapshot | null }> {
  let q = query(
    collection(db, COL),
    orderBy("nombre"),
    limit(limitePagina)
  );

  if (ultimoDoc) {
    q = query(q, startAfter(ultimoDoc));
  }

  const snap = await getDocs(q);
  return {
    negocios: snap.docs.map(mapearNegocio),
    ultimoDoc: snap.docs[snap.docs.length - 1] || null,
  };
}

export async function buscarNegocios(termino: string): Promise<Negocio[]> {
  // Búsqueda simple por nombre (case-insensitive aproximado)
  const snap = await getDocs(collection(db, COL));
  const todos = snap.docs.map(mapearNegocio);
  
  const terminoLower = termino.toLowerCase();
  return todos.filter(n => 
    n.nombre.toLowerCase().includes(terminoLower) ||
    n.descripcion?.toLowerCase().includes(terminoLower) ||
    n.categoria.toLowerCase().includes(terminoLower)
  );
}

export async function obtenerNegocioPorSlug(slug: string): Promise<Negocio | null> {
  const snap = await getDoc(doc(db, COL, slug));
  return snap.exists() ? mapearNegocio(snap) : null;
}

// ⚠️ DEPRECADO - Solo usar en admin con precaución
export async function obtenerTodosLosNegocios(): Promise<Negocio[]> {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map(mapearNegocio);
}

export async function contarNegociosReales(): Promise<number> {
  const q = query(collection(db, COL), where("esDemostracion", "!=", true));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
}

export async function obtenerNegocioPorUID(uid: string): Promise<Negocio | null> {
  const q = query(collection(db, COL), where("uid", "==", uid));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return mapearNegocio(snap.docs[0]);
}

export async function actualizarPlan(slug: string, plan: TipoPlanSuscripcion): Promise<void> {
  const fechaUpgrade = new Date();
  const fechaExpiracion = new Date();
  fechaExpiracion.setFullYear(fechaExpiracion.getFullYear() + 1); // +1 año

  await updateDoc(doc(db, COL, slug), {
    planSuscripcion: plan,
    fechaUpgrade: fechaUpgrade.toISOString(),
    fechaExpiracion: fechaExpiracion.toISOString(),
  });
}

export async function guardarSolicitudPersonalizada(solicitud: any): Promise<void> {
  await addDoc(collection(db, "solicitudesPersonalizadas"), {
    ...solicitud,
    fechaSolicitud: new Date().toISOString(),
    estado: "pendiente",
  });
}

export async function obtenerSolicitudesPersonalizadas(): Promise<any[]> {
  const snap = await getDocs(collection(db, "solicitudesPersonalizadas"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function actualizarEstadoSolicitud(id: string, estado: string): Promise<void> {
  await updateDoc(doc(db, "solicitudesPersonalizadas", id), { estado });
}

export async function actualizarProductos(slug: string, productos: any[]): Promise<void> {
  await updateDoc(doc(db, COL, slug), { productos });
}

export async function actualizarGaleria(slug: string, galeria: any[]): Promise<void> {
  await updateDoc(doc(db, COL, slug), { galeria });
}

export async function actualizarTestimonios(slug: string, testimonios: any[]): Promise<void> {
  await updateDoc(doc(db, COL, slug), { testimonios });
}
