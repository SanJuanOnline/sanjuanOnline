"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  deleteUser,
  User,
} from "firebase/auth";
import { auth } from "../lib/firebase";

interface AuthContextType {
  usuario: User | null;
  cargando: boolean;
  registrarse: (email: string, password: string) => Promise<void>;
  iniciarSesion: (email: string, password: string) => Promise<void>;
  iniciarSesionGoogle: () => Promise<void>;
  cerrarSesion: () => Promise<void>;
  eliminarCuenta: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);
const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUsuario(u);
      setCargando(false);
    });
    return unsub;
  }, []);

  const registrarse = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const iniciarSesion = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const iniciarSesionGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const cerrarSesion = async () => {
    await signOut(auth);
  };

  const eliminarCuenta = async () => {
    if (auth.currentUser) await deleteUser(auth.currentUser);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, registrarse, iniciarSesion, iniciarSesionGoogle, cerrarSesion, eliminarCuenta }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
