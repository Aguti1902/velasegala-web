"use client";

import { useState, useEffect } from "react";
import { X, Cookie, Shield } from "lucide-react";
import Link from "next/link";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya ha aceptado/rechazado cookies
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Mostrar el popup después de un pequeño delay para mejor UX
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] p-4 md:p-6 animate-in slide-in-from-bottom duration-300">
      <div className="container-custom max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Icono */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <Cookie className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Contenido */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg md:text-xl font-bold text-black">
                Uso de Cookies
              </h3>
              <button
                onClick={handleReject}
                className="md:hidden text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">
              Utilizamos cookies para mejorar tu experiencia en nuestro sitio web, 
              analizar el tráfico y personalizar el contenido. Al hacer clic en 
              "Aceptar todas", consientes el uso de todas las cookies. También puedes 
              personalizar tus preferencias o{" "}
              <Link 
                href="/politica-cookies" 
                className="text-black font-semibold underline hover:text-gray-700"
              >
                leer más sobre nuestra política de cookies
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccept}
                className="px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all hover:scale-105"
              >
                Aceptar todas
              </button>
              <button
                onClick={handleReject}
                className="px-6 py-3 bg-gray-100 text-black rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Rechazar
              </button>
            </div>
          </div>

          {/* Botón cerrar desktop */}
          <button
            onClick={handleReject}
            className="hidden md:flex flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

