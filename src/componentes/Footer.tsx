
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const linkSections = [
    {
      title: 'Categorías',
      links: [
        { href: '/comida-rapida', label: 'Comida Rápida' },
        { href: '/restaurantes', label: 'Restaurantes' },
        { href: '/entretenimiento', label: 'Entretenimiento' },
        { href: '/servicios', label: 'Servicios' },
      ],
    },
    {
      title: 'Sobre Nosotros',
      links: [
        { href: '/acerca-de', label: '¿Quiénes somos?' },
        { href: '/contacto', label: 'Contacto' },
        { href: '/unete', label: 'Únete al Directorio' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { href: '/terminos', label: 'Términos y Condiciones' },
        { href: '/privacidad', label: 'Política de Privacidad' },
      ],
    },
  ];

  const socialLinks = [
    { href: 'https://facebook.com', icon: <Facebook /> },
    { href: 'https://twitter.com', icon: <Twitter /> },
    { href: 'https://instagram.com', icon: <Instagram /> },
    { href: 'https://linkedin.com', icon: <Linkedin /> },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and mission */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
             <Link href="/" className="flex items-center space-x-2">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21V3M3 12h18" /></svg>
                <span className="text-xl font-bold text-gray-800 dark:text-white">SanJuanOnline</span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xs">
              Conectando negocios locales con el mundo digital en San Juan de la Maguana.
            </p>
          </div>

          {/* Link sections */}
          {linkSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} SanJuanOnline. Creado por Enrique Vargas.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {socialLinks.map((social) => (
              <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
