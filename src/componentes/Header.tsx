
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Bell, UserCircle, Store, Utensils, Coffee, HeartPulse, Hammer, PartyPopper, Settings } from 'lucide-react';

const NAV_LINKS = [
    { href: "/comida-rapida", label: "Comida Rápida", icon: <Coffee className="w-5 h-5" /> },
    { href: "/restaurantes", label: "Restaurantes", icon: <Utensils className="w-5 h-5" /> },
    { href: "/entretenimiento", label: "Entretenimiento", icon: <PartyPopper className="w-5 h-5" /> },
    { href: "/servicios", label: "Servicios", icon: <Store className="w-5 h-5" /> },
    { href: "/mantenimiento", label: "Mantenimiento", icon: <Hammer className="w-5 h-5" /> },
    { href: "/salud", label: "Salud", icon: <HeartPulse className="w-5 h-5" /> },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21V3M3 12h18" /></svg>
            <span className="text-xl font-bold text-gray-800 dark:text-white">SanJuanOnline</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium">
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Search, Actions and Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-32 md:w-48 lg:w-64 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-1">
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300"/>
                </button>
                <Link href="/cuenta" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <UserCircle className="w-6 h-6 text-gray-600 dark:text-gray-300"/>
                </Link>
                 <Link href="/ajustes" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Settings className="w-6 h-6 text-gray-600 dark:text-gray-300"/>
                </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md">
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800">
          <nav className="flex flex-col space-y-2 p-4">
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar negocios..."
                    className="w-full bg-gray-100 dark:bg-gray-800 border border-transparent rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 font-medium">
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
