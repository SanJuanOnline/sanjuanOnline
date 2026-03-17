'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ActualizacionPWA() {
  const [actualizacionDisponible, setActualizacionDisponible] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleServiceWorkerUpdate = async (reg: ServiceWorkerRegistration) => {
      const newWorker = reg.installing || reg.waiting;
      
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setActualizacionDisponible(true);
            setRegistration(reg);
          }
        });
      }
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);

        // Verificar actualizaciones cada 60 segundos
        const interval = setInterval(() => {
          reg.update();
        }, 60000);

        // Escuchar cambios
        reg.addEventListener('updatefound', () => {
          handleServiceWorkerUpdate(reg);
        });

        return () => clearInterval(interval);
      });
    }
  }, []);

  useEffect(() => {
    if (actualizacionDisponible) {
      Swal.fire({
        title: '¡Nueva versión disponible!',
        text: 'Se ha actualizado San Juan Online. Recarga para ver los cambios.',
        icon: 'info',
        confirmButtonText: 'Actualizar ahora',
        cancelButtonText: 'Después',
        showCancelButton: true,
        confirmButtonColor: '#1e40af',
      }).then((result) => {
        if (result.isConfirmed) {
          if (registration?.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
          }
        }
      });
    }
  }, [actualizacionDisponible, registration]);

  return null;
}
