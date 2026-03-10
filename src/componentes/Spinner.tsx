import React from 'react';

interface SpinnerProps {
  progreso: number;
}

const Spinner: React.FC<SpinnerProps> = ({ progreso }) => {
  // Función para determinar el color de la barra según el progreso
  const getProgressBarColor = (progress: number) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white p-4 h-screen w-full">
      <div className="flex flex-col items-center max-w-md w-full">
        {/* Logo */}
        <div className="mb-8 relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
          <img 
            src="/logosanjuan.png" 
            alt="Logo San Juan" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Slogan */}
        <p className="text-gray-700 text-lg md:text-xl font-medium text-center mb-8 italic">
          "Tu directorio digital para conectar con lo local"
        </p>

        {/* Contenedor de la barra de progreso */}
        <div className="w-full bg-gray-200 rounded-full h-3 md:h-4 overflow-hidden shadow-inner">
          <div
            className={`h-full transition-all duration-300 ease-out rounded-full ${getProgressBarColor(progreso)}`}
            style={{ width: `${progreso}%` }}
          />
        </div>

        {/* Porcentaje */}
        <span className="mt-2 text-sm font-semibold text-gray-500">
          {Math.round(progreso)}%
        </span>
      </div>
    </div>
  );
};

export default Spinner;