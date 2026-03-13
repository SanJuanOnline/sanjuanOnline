
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import { NegociosProvider } from '../context/NegociosContext';

const LayoutDirectorio = ({ children }: { children: React.ReactNode }) => {
  return (
    <NegociosProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>
        <Footer />
      </div>
    </NegociosProvider>
  );
};

export default LayoutDirectorio;
