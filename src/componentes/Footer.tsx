
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer
      className={`fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/privacy-policy" className="mr-4">Política de Privacidad</Link>
          <Link href="/hook-policy" className="mr-4">Política de Hook</Link>
          <Link href="#" className="mr-4">Link 3</Link>
          <Link href="#" className="mr-4">Link 4</Link>
          <Link href="#" className="mr-4">Link 5</Link>
          <Link href="#" className="mr-4">Link 6</Link>
          <Link href="#">Link 7</Link>
        </div>
        <div>
          <p>
            &copy; 2024 <a href="https://enriquevargas.vercel.app" target="_blank" rel="noopener noreferrer">
              <span className="text-cyan-400">Enrique</span> <span className="text-green-400">Vargas</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
