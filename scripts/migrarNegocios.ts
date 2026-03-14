// Script de migración: sube todos los negocios de dbNegocios.ts a Firestore
// Uso: npx ts-node scripts/migrarNegocios.ts

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { negocios } from "../database/dbNegocios";

const firebaseConfig = {
  apiKey:            "AIzaSyBR3pTwL5p_xGwB9EJtjjIVlmnU8SVlql0",
  authDomain:        "sanjuanonline-3e042.firebaseapp.com",
  projectId:         "sanjuanonline-3e042",
  storageBucket:     "sanjuanonline-3e042.firebasestorage.app",
  messagingSenderId: "127744941699",
  appId:             "1:127744941699:web:72ca74aedfd8be98cd05b6",
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

async function migrar() {
  console.log(`Migrando ${negocios.length} negocios...`);

  for (const negocio of negocios) {
    // Usamos el slug como ID del documento para fácil lookup
    await setDoc(doc(collection(db, "negocios"), negocio.slug), negocio);
    console.log(`✅ ${negocio.nombre}`);
  }

  console.log("\n✅ Migración completa.");
  process.exit(0);
}

migrar().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
