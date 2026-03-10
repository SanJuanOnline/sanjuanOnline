
import React from 'react';
import HeaderLanding from '../componentes/HeaderLanding';
import FooterLanding from '../componentes/FooterLanding';

const LayoutLanding = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderLanding />
      <main className="flex-grow">{children}</main>
      <FooterLanding />
    </div>
  );
};

export default LayoutLanding;
