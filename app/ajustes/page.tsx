
"use client";
import { useTheme } from "next-themes";
import { Sun, Moon, Download, Star } from 'lucide-react';

const AjustesPage = () => {
  const { theme, setTheme } = useTheme();

  const handleDownload = () => {
    window.open('https://play.google.com/store', '_blank');
  };

  const handleZonaVip = () => {
    alert('Acceso a Zona VIP - ¡Próximamente!');
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 border-b pb-4 dark:border-gray-700">Ajustes</h1>
        
        <div className="space-y-6">
          {/* Modo Oscuro */}
          <div 
            className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <div className="flex items-center">
              <Sun className="w-6 h-6 mr-3 text-yellow-500" />
              <span className="font-medium">Modo Claro / Oscuro</span>
            </div>
            <div className="relative">
               {theme === 'dark' ? <Moon className="w-6 h-6 text-blue-500" /> : <Sun className="w-6 h-6 text-yellow-500" />} 
            </div>
          </div>

          {/* Descargar App */}
          <div 
            className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={handleDownload}
          >
            <div className="flex items-center">
              <Download className="w-6 h-6 mr-3 text-green-500" />
              <span className="font-medium">Descargar la App</span>
            </div>
          </div>

          {/* Zona VIP */}
          <div 
            className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={handleZonaVip}
          >
            <div className="flex items-center">
              <Star className="w-6 h-6 mr-3 text-purple-500" />
              <span className="font-medium">Zona VIP</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
          <p>Creado por Enrique Vargas</p>
          <p>Versión 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default AjustesPage;
