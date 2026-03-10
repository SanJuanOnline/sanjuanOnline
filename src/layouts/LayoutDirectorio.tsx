
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';

const LayoutDirectorio = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutDirectorio;
