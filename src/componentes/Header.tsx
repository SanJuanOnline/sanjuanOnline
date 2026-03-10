
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold">
            Directorio
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/comida-rapida">Comida Rápida</Link>
          <Link href="/restaurantes">Restaurantes</Link>
          <Link href="/entretenimiento">Entretenimiento</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/mantenimiento">Mantenimiento</Link>
          <Link href="/salud">Salud</Link>
          <Link href="/cuenta">Cuenta</Link>
          <Link href="/ajustes">Ajustes</Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link href="/comida-rapida">Comida Rápida</Link>
            <Link href="/restaurantes">Restaurantes</Link>
            <Link href="/entretenimiento">Entretenimiento</Link>
            <Link href="/servicios">Servicios</Link>
            <Link href="/mantenimiento">Mantenimiento</Link>
            <Link href="/salud">Salud</Link>
            <Link href="/cuenta">Cuenta</Link>
            <Link href="/ajustes">Ajustes</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
