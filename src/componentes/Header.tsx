
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link href="/comida-rapida">Comida Rápida</Link></li>
          <li><Link href="/restaurantes">Restaurantes</Link></li>
          <li><Link href="/entretenimiento">Entretenimiento</Link></li>
          <li><Link href="/servicios">Servicios</Link></li>
          <li><Link href="/mantenimiento">Mantenimiento</Link></li>
          <li><Link href="/salud">Salud</Link></li>
          <li><Link href="/cuenta">Cuenta</Link></li>
          <li><Link href="/ajustes">Ajustes</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
